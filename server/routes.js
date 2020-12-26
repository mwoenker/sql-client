import express from 'express';
import {connect, listSchemas, listTables, DatabaseError} from './queries.js';
import credentialFormat from '../validators/credentials.js';
import validate from 'validate.js';

const router = express.Router();

router.post('/get-tables', async (req, res) => {
    const errors = validate(req.body, credentialFormat);
    if (errors) {
        return res.status(400).json({formErrors: errors});
    }
    
    const credentials = validate.cleanAttributes(req.body, credentialFormat);

    let client;
    try {
        client = await connect(credentials)
    } catch (e) {
        return res.status(500).json({error: e.message});
    }

    const schemaTables = {};
    
    try {
        const schemas = await listSchemas(client);
        for (const schema of schemas) {
            schemaTables[schema] = await listTables(client, schema);
        };
    } catch (e) {
        if (e instanceof DatabaseError) {
            return res.status(500).json({error: e.message});
        } else {
            console.error(e);
            return res.status(500).json({});
        }
    }
    
    return res.status(200).json({schemas: schemaTables});
});

export default router;


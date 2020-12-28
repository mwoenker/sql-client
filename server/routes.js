const express = require('express');
const {
    connect,
    listSchemas,
    listTables,
    DatabaseError,
    runQuery
} = require('./queries.js');
const credentialFormat = require('../validators/credentials.js');
const validate = require('validate.js');

const router = express.Router();

function apiHandler(func) {
    return (req, res, next) => {
        try {
            return func(req, res, next);
        } catch (e) {
            console.log(e);
            return res.status(500).json(null);
        }
    };
}

router.post('/get-tables', apiHandler(async (req, res) => {
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
}));

router.post('/run-query', apiHandler(async (req, res) => {
    const errors = validate(req.body, credentialFormat);
    if (errors) {
        return res.status(400).json({formErrors: errors});
    }

    const sql = req.body.sql;
    if (! validate.isString(sql)) {
        return res.status(400).json({formErrors: {sql: 'sql is required'}});
    }
    
    const credentials = validate.cleanAttributes(req.body, credentialFormat);

    let client;
    try {
        client = await connect(credentials)
    } catch (e) {
        return res.status(500).json({error: e.message});
    }

    let result;
    try {
        result = await runQuery(client, sql);
    } catch (e) {
        if (e instanceof DatabaseError) {
            return res.status(500).json({error: e.message});
        } else {
            console.error(e);
            return res.status(500).json({});
        }
    } finally {
        client.end();
    }
    
    return res.status(200).json(result);
}));

module.exports = router;


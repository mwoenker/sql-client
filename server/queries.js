const pg = require('pg');

class DatabaseError extends Error {}

class ConnectionError extends DatabaseError {
    constructor(cause) {
        super(`Connection error: ${cause}`);
    }
}

class QueryError extends DatabaseError {
    constructor(cause) {
        super(`Query error: ${cause}`);
    }
}

async function connect(params) {
    let client;
    try {
        client = new pg.Client(params);
        await client.connect();
    } catch (e) {
        throw new ConnectionError(e);
    }
    return client;
}

async function query(client, ...args) {
    try {
        return await client.query(...args);
    } catch (e) {
        throw new QueryError(e);
    }
}

async function listSchemas(client) {
    const result = await query(client, {
        text: 'select schema_name ' +
            'from information_schema.schemata ' +
            'order by schema_name'
    });
    return result.rows.map(row => row.schema_name);
}

async function listTables(client, schemaName) {
    const result = await query(client, {
        client,
        text: 'select table_name ' +
            'from information_schema.tables ' +
            'where table_schema = $1 ' +
            'order by table_name',
        values: [schemaName]
    });
    return result.rows.map(row => row.table_name);
}

async function runQuery(client, text) {
    const result = await query(client, {text, rowMode: 'array'});
    return {
        columns: result.fields.map(field => field.name),
        rows: result.rows,
    };
}

module.exports = {
    DatabaseError,
    ConnectionError,
    QueryError,
    connect,
    listSchemas,
    listTables,
    runQuery,
};

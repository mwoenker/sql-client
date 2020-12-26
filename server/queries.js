import pg from 'pg';

export class DatabaseError extends Error {}

export class ConnectionError extends DatabaseError {
    constructor(cause) {
        super(`Connection error: ${cause}`);
    }
}

export class QueryError extends DatabaseError {
    constructor(cause) {
        super(`Query error: ${cause}`);
    }
}

export async function connect(params) {
    let client;
    try {
        client = new pg.Client(params);
        await client.connect();
    } catch (e) {
        throw new ConnectionError(e);
    }
    return client;
}

async function query(client, sql, values=[]) {
    try {
        return await client.query(sql, values)
    } catch (e) {
        throw new QueryError(e);
    }
}

export async function listSchemas(client) {
    const result = await query(
        client,
        'select schema_name ' +
            'from information_schema.schemata ' +
            'order by schema_name'
    );
    return result.rows.map(row => row.schema_name);
}

export async function listTables(client, schemaName) {
    const result = await query(
        client,
        'select table_name ' +
            'from information_schema.tables ' +
            'where table_schema = $1 ' +
            'order by table_name',
        [schemaName])
    return result.rows.map(row => row.table_name);
}

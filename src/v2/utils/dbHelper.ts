
import { Pool } from 'pg';
require('dotenv').config();

// const pool = new Pool({
//     user: 'postgres',
//     password: '',
//     host:'localhost',
//     port: 5432,
//     database: 'payroll',

// });
// pool.on('connect', () => { console.log('connection with postgreSQL is Sucessfull!') });


// const connection ={
//     user: 'smartsoftstudios', // postgres previously
//     password: 'abcd1234',
//     host:'localhost',
//     port: 5432,
//     // database: 'payroll',
//     database: 'loan_tracker2',
// }

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

export const insert = async (schemaName: string, tableName: string, param: any) => {
    try {
        let paramKeys = Object.keys(param); // get only keys from object
        const text = `
        INSERT INTO "${schemaName}"."${tableName}"  ("${paramKeys.join('", "')}")
        VALUES (${paramKeys.map((i, ind) => `$${ind + 1}`).join(', ')})
        RETURNING *`;
        const values = paramKeys.map(i => param[i])
        // const pool = new Pool(connection);
        const pool=new Pool({connectionString:connectionString})
        const { rows } = await pool.query(text, values);
        await pool.end();
        return Promise.resolve(rows[0]);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const update = async (schemaName: string, tableName: string, queryParam: any, updateParam: any) => {
    try {
        let queryKeys = Object.keys(queryParam);
        let updateKeys = Object.keys(updateParam);
        let tableToUpdate = [];
        let colTOUpdate: any = [];
        let colToQuery: any = [];
        tableToUpdate.push(`UPDATE "${schemaName}"."${tableName}" SET`);
        updateKeys.map((item) => {
            const value = updateParam[item];
            const isNull = value === null || value === undefined || value.length === 0;
            const isString = typeof value === 'string';
            const q = `"${item}"=${isString
                ? `'${isString ? value.replace(/'/g, "''") : value}'`
                : (isNull ? null : value)
                }`;
            colTOUpdate.push(q);
        });
        queryKeys.map((item) => {
            const isNull = item === null;
            const q = `"${item}" = ${isNull ? null : `'${queryParam[item]}'`}`;
            colToQuery.push(q);
        });
        const query = tableToUpdate.concat(colTOUpdate.join(', '), "where", colToQuery.join(' and '), "RETURNING *").join(" ");
        // const pool = new Pool(connection);
        const pool=new Pool({connectionString:connectionString})
        const { rows } = await pool.query(query);
        await pool.end();
        return Promise.resolve(rows[0]);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const executeOne = async (query: string) => {
    try {
        // const pool = new Pool(connection);
        const pool=new Pool({connectionString:connectionString})
        const { rows } = await pool.query(query);
        await pool.end();
        return Promise.resolve(rows.length > 0 ? rows[0] : null)
    } catch (error) {
        return Promise.reject(error);
    }
}

export const execute = async (query: string) => {
    // const pool = new Pool(connection);
    const pool=new Pool({connectionString:connectionString})
    const { rows } = await pool.query(query);
    await pool.end();
    return rows;
}

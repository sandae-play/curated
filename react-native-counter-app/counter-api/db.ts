import { Pool } from 'pg';

const DATABASE_URL = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: DATABASE_URL
});

export const query = (sql: String, values: any[] = undefined) =>
    new Promise((resolve, reject) =>
        pool.query(sql, values)
            .then(res => resolve(res.rows[0]))
            .catch(reject))

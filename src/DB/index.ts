import { Pool } from 'pg';
import { Config } from '../Structures/Interfaces/Config';

const config: Config = require('../../config.json');

const pool = new Pool({
    user: config.PostgreSQL.user,
    host: config.PostgreSQL.host,
    database: config.PostgreSQL.database,
    password: config.PostgreSQL.password,
    port: config.PostgreSQL.port
});

const query = async (text: string, params?: string[]) => {
    return await pool.query(text, params);
}

interface Channels {
    voice_id: string,
    text_id: string,
    set_to_purge: number
}

export { query, Channels };
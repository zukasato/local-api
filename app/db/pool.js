const { Pool } = require("pg");

// DB情報をもったプールを生成
const pool = new Pool({
    host: 'ec2-52-86-2-228.compute-1.amazonaws.com',
    database: 'd3o5ckfajj3onj',
    port: 5432,
    user: 'vjxgyvusahzhsp',
    password: '60e6088f436769bdb2616a08fb255d5dbe86c3517e6a151ed10d54a1febf0505',
    ssl: { 
        sslmode: 'require',
        rejectUnauthorized: false
    }
});

module.exports = pool;
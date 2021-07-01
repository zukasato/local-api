const { Pool } = require("pg");

// DB情報をもったプールを生成
const pool = new Pool({
    host: 'ec2-52-86-2-228.compute-1.amazonaws.com',
    database: 'd773chgdtejja',
    port: 5432,
    user: 'sxgxfdhxgwltaw',
    password: '4c44e7da2b5b5b50c007c93aa4c591318f5cf7c68105f8819ef839f5a97de5ac',
    ssl: { 
        sslmode: 'require',
        rejectUnauthorized: false
    }
});

module.exports = pool;
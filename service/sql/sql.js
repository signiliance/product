const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'nuli1234',
    database: 'licaibao'
});

const DBhandle = module.exports = {};

DBhandle.query = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err);
            }
            connection.query(sql, params, (err, result) => {
                connection.release();
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    });
};

const mysql = require('mysql');

const connection = mysql.createConnection({
    connectionLimit : 10,
    host: '127.0.0.1',
    user: 'root',
    password: '123',
    database: 'licaibao'
})

connection.connect();

export async function set(sql){

        connection.query(sql,(error,result,fields) => {
            if(error) throw error;
            return
        });

}
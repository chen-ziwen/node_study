const mysql = require('mysql');
const dbParams = require('./db_params');

// 创建对应的数据库
const createDB = mysql.createPool(dbParams);

// 封装一个sql查询
const connect = (sql, param) => {
    return new Promise((reslove, reject) => {
        // 建立数据库连接
        createDB.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, param, (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        reslove(result)
                    }
                    // 结束连接
                    connection.release();
                })
            }
        })
    })
}

module.exports = { connect };
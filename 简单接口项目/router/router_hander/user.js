// const db = require('../db/index');
const db = require('../../db/config');
const bcrypt = require('bcryptjs');

// 注册账户
const regUser = async (req, res) => {
    // 接受表单数据
    const userinfo = req.body;
    // 判断数据是否合法
    if (!userinfo.username || !userinfo.password) {
        return res.send({
            status: 1,
            message: '用户名或密码不能为空',
        });
    }

    // 检测用户名是否已经被占用
    const checkname = 'SELECT * FROM `user_message` WHERE username = ?';
    const result = await db.connect(checkname, [userinfo.username])
    if (result.length > 0) {
        return res.send({
            status: 1,
            message: '用户名被占用，请更换其他用户名'
        })
    }

    // 对密码进行加密
    // 因为注册的接口并不需要验证密码
    userinfo.password = bcrypt.hashSync(userinfo.password, 10);

    // 插入新用户
    const insertuser = 'INSERT INTO `user_message` SET ?';
    const insertResult = await db.connect(insertuser, {
        username: userinfo.username, password: userinfo.password
    })
    if (insertResult.affectedRows != 1) {
        return res.send({
            status: 1,
            message: '注册用户失败，请稍后再试！',
        })
    }
    // 注册成功
    res.send({
        status: 0, // 成功为0
        message: '注册成功！',
    })
};

// 登陆账号
const login = (req, res) => {
    res.send('login OK')
};

const test = async (req, res) => {
    const sql = "SELECT * FROM article_cate WHERE name = ? ";
    const name = req.query.name;
    // 将数据库读取变为同步操作
    const result = await db.connect(sql, name);
    if (result.length == 0) {
        res.send({
            message: '暂无数据',
            code: 200,
            result: [],
        })
    } else {
        res.send(JSON.stringify({
            message: '请求成功',
            code: 200,
            result,
        }))
    }
}

module.exports = {
    regUser,
    login,
    test,
};

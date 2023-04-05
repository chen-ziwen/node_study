// 封装的简易数据库操作
const db = require('../../db/config');
// 密码加密
const bcrypt = require('bcryptjs');
// Token
const jwt = require('jsonwebtoken');
// token加密密钥
const config = require('./config');

// 注册账户
const regUser = async (req, res) => {
    // 接受表单数据
    const userinfo = req.body;
    // 判断数据是否合法
    if (!userinfo.username || !userinfo.password) {
        return res.cc('用户名或密码不能为空');
    }

    // 检测用户名是否已经被占用
    const checkname = 'SELECT * FROM `user_message` WHERE username = ?';
    const result = await db.connect(checkname, [userinfo.username])
    if (result.length > 0) {
        return res.cc('用户名被占用，请更换其他用户名')
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
        return res.cc('注册用户失败，请稍后再试！');
    }
    // 注册成功
    res.send({
        status: 0, // 成功为0
        message: '注册成功！',
    })
};

// 登陆账号 实现步骤
// 检测表单数据是否合法
// 根据用户名查询用户的数据
// 判断用户输入的密码是否正确
// 生成 JWT 的 Token 字符串
const login = async (req, res) => {
    const userinfo = req.body;
    const loginSql = 'SELECT * FROM `user_message` WHERE username = ?';
    // try...catch 不能捕获到异步的错误，也就是说它没办法捕获promise错误
    // 但是async...await 将promise变为了同步操作，所以try...catch可以捕获到
    try {
        const result = await db.connect(loginSql, [userinfo.username]);
        // 执行sql语句成功，但是获取的长度不等于1
        if (result.length !== 1) {
            return res.cc('登录失败');
        }
        // 解析密码 判断登录密码和注册密码是否一样
        const compareResult = bcrypt.compareSync(userinfo.password, result[0].password);
        if (!compareResult) {
            return res.cc('密码错误，登录失败！')
        }
        const user = { ...result[0], password: '', user_pic: '' };
        // 生成token字符串
        const tokenStr = jwt.sign(user, config.jwtSecreKey, {
            expiresIn: '10h',// token 有效期为10小时
        });
        res.send({
            status: 0,
            message: '登录成功！',
            // 因为请求必须拼接Bearer，当然客户端去拼接也ok
            // 为了方便客户端使用Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr,
        })

    } catch (err) {
        // 执行sql语句失败
        if (err) {
            return res.cc(err);
        }
    }
};


module.exports = {
    regUser,
    login,
};

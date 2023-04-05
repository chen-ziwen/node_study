const express = require('express');
const db = require('../db/config');
const { update_userinfo } = require('../schema/userinfo');
const expressJoi = require('@escook/express-joi')

const router = express.Router();

// 获取登陆用户的基本信息
router.get('/userinfo', async (req, res) => {
    const userinfoSql = 'SELECT username,nickname,email,phone FROM user_message WHERE username = ?'
    // express-jwt 中间件会将用户信息auth对象挂载在req上。
    try {
        const reslut = await db.connect(userinfoSql, req.auth.username);
        if (reslut.length !== 1) {
            return res.cc('获取用户信息失败');
        }
        res.send({
            status: 0,
            message: '获取用户基本信息成功！',
            data: reslut,
        })
    } catch (error) {
        return res.cc(error)
    }
});

// 获取任意用户的基本信息
router.get('/userinfo/everyone', async (req, res) => {
    const username = req.query.username;
    const userinfoSql = 'SELECT username,nickname,email,phone FROM user_message WHERE username = ?'
    // express-jwt 中间件会将用户信息auth对象挂载在req上。
    try {
        const reslut = await db.connect(userinfoSql, username);
        if (reslut.length !== 1) {
            return res.cc('获取用户信息失败');
        }
        res.send({
            status: 0,
            message: '获取用户基本信息成功！',
            data: reslut,
        })
    } catch (error) {
        return res.cc(error)
    }
});

// 更新登陆用户的信息
router.post('/userinfo', expressJoi(update_userinfo), async (req, res) => {
    const updateinfoSql = 'UPDATE user_message SET ? WHERE username = ?'
    try {
        const result = await db.connect(updateinfoSql, [req.body, req.auth.username]);
        if (result.affectedRows !== 1) {
            return res.cc('修改用户信息失败');
        }
        return res.cc('修改用户信息成功！', 0);
    } catch (error) {
        return res.cc(error)
    }
})


module.exports = router;
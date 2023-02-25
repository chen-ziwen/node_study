const express = require('express');

const router = express.Router();

// session登陆
router.post('/login', (res, req) => {
    if (req.body.username !== 'admin' || req.body.password != '000') {
        return res.send({ status: 1, msg: '登录失败' })
    }

    req.session.user = req.body // 将用户信息，存储到Session中。
    req.session.isLogin = true; // 将用户的登陆状态，存储到Session中。

    res.send({ status: 0, msg: '登陆成功' })
})

// 退出登陆
router.post('/logout', (req, res) => {
    // 清空客户端对应的session信息
    req.session.destroy();
    res.send({
        status: 0,
        msg: '退出登陆',
    })
})


module.exports = router;
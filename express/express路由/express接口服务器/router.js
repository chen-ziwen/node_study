const express = require('express');

const router = express.Router();

router.get('/user', (req, res) => {
    const query = req.query;
    res.send({
        status: 0, // 0表示成功 1表示失败
        msg: 'GET 请求成功', // 提示信息
        data: query,
    })
    console.log('GET Method Tigger');
})

router.post('/user', (req, res) => {
    // 获取客户端通过请求体，发送到服务器的URL-encoded 数据
    const body = req.body;
    res.send({
        status: 0, // 0表示成功 1表示失败
        msg: 'POST 请求成功', // 提示信息
        data: body,
    })
    console.log('POST Method Tigger');
})

module.exports = router;
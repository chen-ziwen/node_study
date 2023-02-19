const express = require('express');

const router = express.Router();

const time = (req, res, next) => {
    const time = Date.now();
    res.time = time;
    next();
}
const count = (req, res, next) => {
    next();
}
// 这个time就属于局部中间件 。
// 多个局部中间件可以像下面这么写，也可以写成数组形式 [time,count]。
router.get('/user', time, count, (req, res) => {
    // 中间件中的req,res对象与其他中间件和路由都是共享的
    console.log('Get Method Tigger', res.time + '我是中间件添加的时间');
    res.send('请求成功')
})

router.post('/user', (req, res) => {
    console.log('Post Method Tigger');
    res.send('请求成功')
})

module.exports = router;
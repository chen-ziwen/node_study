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

// 这个die中间件就类似于官方提供的那些中间件
const die = (obj) => {
    let a = 0;
    if (obj.encode) {
        a = 100;
    }
    return (req, res, next) => {
        res.a = a;
        next();
    }
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

router.post('/son', [die({ encode: false }), express.json(), express.urlencoded({ extended: false })], (req, res) => {
    // nodejs接收表单数据格式请求参数时，如果不解析，默认返回undefiend，express.json() 可以解析表单格式请求数据
    // 中间件中的req,res对象与其他中间件和路由都是共享的
    console.log(res.a, req.body);
    res.send('请求成功')
})

module.exports = router;
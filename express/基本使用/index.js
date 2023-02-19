// 使用express.static() 快速托管静态资源
// 使用express路由精简项目结构
// 使用常见的express中间件
// 使用express创建API接口
// 使用express启用cors跨域资源请求

// express和官方的http模块比较类似，用来创建服务器的，express使用起来更方便，功能也更强

// 对于前端程序员来说，最常见的两种服务器，分别是：
// Web网站服务器: 专门对外提供Web网页资源的服务器
// API接口服务器: 专门对外提供API接口的服务器 
const express = require('express');

const hello = (name = '暂无', age = 0) => {
    return `你好,${name}先生，根据您提供的消息，我知道了您的年龄是${age}`
}

const app = express();


// req.query和req.param默认都为空对象。
// req.param需要用:冒号占位。例如，:id代表动态参数。
app.get('/music', (req, res) => {
    res.send({ code: 200, message: `你好,${req.query.name}先生，根据您提供的消息，我知道了您的年龄是${req.query.age}` })
})

app.get('/user/:id', (req, res) => {
    res.send({ code: 200, userId: req.params.id })
    console.log('id', req.params.id);
})


app.post('/music/:id', (req, res) => {
    console.log('id', req.params.id)
})

app.listen(80, () => {
    console.log('web runing at http://127.0.0.1');
})


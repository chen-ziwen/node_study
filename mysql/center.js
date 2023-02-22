// 写在路由上叫做路由级别中间件，写在app上做全局级别中间件
const test = (req, res, next) => {
    res.time = Date.now(); // 这个中间件 会给res加上一个time，在下游中间件或者路由中都可以访问到
    console.log('你好我是中间件');
    next();
}

// 错误级别中间件 // 当程序抛出错误时，会进入到这个中间件中，需要写在所有路由的下面
const err = (error, req, res, next) => {
    res.send(error.message);
}

module.exports = {
    test,
    err,
}
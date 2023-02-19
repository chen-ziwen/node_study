// 导入express
const express = require('express');
// 创建路由对象
const router = express.Router();

// express 建议不要把路由直接添加在app实例上，通过创建一个路由对象，将路由挂载在router对象上，然后暴露出去
// 想要使用路由，只需要app.use(router)挂载路由即可。
router.get('/user', (req, res) => {
    console.log('触发成功');
});

// 将路由对象暴露出去
module.exports = router;
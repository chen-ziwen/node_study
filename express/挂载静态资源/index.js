const express = require('express');

const app = express();

app.use(express.static('这里面写上需要挂载的静态资源的路径'))
app.use('/public', express.static('这里面写上需要挂载的静态资源的路径')) // 可以加前缀

app.listen(80, () => {
    console.log('web running at http://127.0.0.1');
})
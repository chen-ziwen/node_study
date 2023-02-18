const http = require('http');

const serve = http.createServer();

serve.on('request', (req, res) => {
    // req 是请求对象，它包含与客户端相关的数据和属性，例如：
    // req.url 是客户端的请求的 url 地址
    // req.method 是客户端的method 请求类型
    console.log(req.url, req.method, '触发了');
    let content = ''
    if (req.url == '/' || req.url == '/index.html') {
        content = '<h1>内容正常响应</h1>'
    } else {
        content = '<h1>404 Not Found</h1>'
    }
    // 设置响应头 防止中文乱码
    res.setHeader('Content-Type', 'text/html;charset=utf-8');

    // 将内容响应给客户端
    res.end(content)
})

serve.listen('8080', () => {
    console.log('http://127.0.0.1:8080', '服务器已启动');
})
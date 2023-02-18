const fs = require('fs');
const path = require('path');

// __dirname 表示当前的文件夹路径  一个从盘符开始算起的路径
// 路径最好不要用+号拼接 用path.join() 拼接会更好 因为path.join(__dirname,'/a','b','./c')可以这样拼接 等同于/a/b/c ，而../是回到上一级目录

// path.join 拼接路径
// path.basename 拿到路径最后一部分 也就是文件名
function judegScore() {
    fs.readFile(path.join(__dirname, '1.txt'), 'utf8', (err, data) => {
        return new Promise((reslove, reject) => {
            if (err) {
                reject(err);
            } else {
                reslove(data)
            }
        }).then((data) => {
            const nstr = data.split(' ');
            console.log(nstr);
        }).catch((e) => {
            console.log(e, '操作失败');
        })
    })
}

judegScore();
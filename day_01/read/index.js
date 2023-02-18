const fs = require('fs');

fs.readFile('./1.txt', 'utf8', (err, data) => {
    return new Promise((reslove, reject) => {
        if (err) {
            // 使用err来判断是否成功
            reject(err) // err 成功返回null 失败返回错误对象
        } else {
            reslove(data) // data 成功返回值 错误返回undefined
        }
    }).then((current) => {
        console.log(current);
    }).catch((err) => {
        console.log(err, '读取失败');
    }).finally(() => {
        console.log('执行完毕');
    })
});
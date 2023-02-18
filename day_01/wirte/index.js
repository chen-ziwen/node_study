const fs = require('fs');
const texts = '你长的非常的好看 我喜欢你 喜欢的不得了 但是你也有缺点 那就是不够喜欢我'
fs.writeFile('./2.txt', texts, 'utf8', (err) => {
    return new Promise((reslove, reject) => {
        if (err) {
            reject(err)
        } else {
            reslove('写入成功')
        }
    }).then((current) => {
        console.log(current);
    }).catch((err) => {
        console.log(err, '写入失败');
    }).finally(() => {
        console.log('执行完成');
    })
})
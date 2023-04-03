// 引入crawler模块
const Crawler = require("crawler");

// 创建一个爬虫实例
const c = new Crawler({
    // 最大并发数
    maxConnections: 10,
    // 每次请求间隔时间
    rateLimit: 1000,
    // 请求选项
    options: {
        // 设置请求头
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
        },
        // 设置编码格式
        encoding: null,
    },
    // jQuery: false,
});

// 定义一个函数，用于获取视频的aid和评论页数
function getVideoInfo(url) {
    return new Promise((resolve, reject) => {
        c.queue({
            uri: url,
            callback: (error, res, done) => {
                if (error) {
                    reject(error);
                } else {
                    // 获取响应体的json数据
                    console.log('===========>', res.body);
                    const data = JSON.parse(res.body);
                    // 获取视频列表数组
                    const vlist = data.data.list?.vlist;
                    // 遍历视频列表，获取每个视频的aid和评论页数，并存入数组中
                    const videoInfo = [];
                    for (let v of vlist) {
                        videoInfo.push({
                            aid: v.aid,
                            page: Math.ceil(v.comment / 20),
                        });
                    }
                    resolve(videoInfo);
                }
                done();
            },
        });
    });
}

// 定义一个函数，用于获取评论数据，并保存到文件中
function getComments(aid, page) {
    return new Promise((resolve, reject) => {
        c.queue({
            uri: `https://api.bilibili.com/x/v2/reply?&jsonp=jsonp&pn=${page}&type=1&oid=${aid}&sort=2`,
            callback: (error, res, done) => {
                if (error) {
                    reject(error);
                } else {
                    // 获取响应体的json数据
                    const data = JSON.parse(res.body);
                    console.log(data);
                    // 获取评论列表数组
                    const replies = data.data.replies;
                    // 遍历评论列表，获取每条评论的内容，并存入数组中
                    const comments = [];
                    for (let r of replies) {
                        comments.push(r.content.message);
                    }
                    resolve(comments);
                }
                done();
            },
        });
    });
}

// 定义一个函数，用于保存数据到文件中
const fs = require("fs");
function saveToFile(data, filename) {
    return new Promise((resolve, reject) => {
        fs.appendFile(filename, data.join("\n") + "\n", "utf8", (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// 定义一个异步函数，用于执行爬虫任务
async function crawlBilibiliComments(url, filename) {
    try {
        // 获取视频信息数组（包含aid和page）
        const videoInfo = await getVideoInfo(url);
        console.log(`共有${videoInfo.length}个视频`);
        // 遍历视频信息数组，对每个视频进行爬取评论操作，并保存到文件中（每个视频一行）
        for (let i = 0; i < videoInfo.length; i++) {
            console.log(`正在爬取第${i + 1}个视频的评论`);
            let comments = [];
            for (let j = 1; j <= videoInfo[i].page; j++) {
                // 对每个视频分页爬取评论，并拼接成一个数组 
                console.log(`正在爬取第${j}页`);
                const result = await getComments(videoInfo[i].aid, j);
                comments.push(...result);
            }
            // 将评论数组保存到文件中（每个视频一行）
            await saveToFile(comments, filename);
        }
        console.log("爬取完成");
    } catch (err) {
        console.error(err);
    }
}

// 调用爬虫函数，传入UP主主页的url和要保存的文件名
crawlBilibiliComments(
    "https://space.bilibili.com/261543088",
    "comments.txt"
);
const fs = require('fs')
const path = require('path')
//获取tableContent
const fn_getTableContent = async (ctx) => {
    let data = ctx.request.body.tableID
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, `./formData/${data}.JSON`), (err, data) => {
            if (err) {
                reject(err)
            } else {
                ctx.body = {
                    "succ": true,
                    "content": JSON.parse(data.toString()),
                    "msg": "数据获取成功！"
                }
                resolve(ctx.body)
            }
        })
    })
}
//修改tableContent
const fn_sentTableContent = async (ctx) => {
    let data = ctx.request.body
    return new Promise((resolve, reject) => {
        fs.writeFile(path.resolve(__dirname, `./formData/${data.tableId}.JSON`), JSON.stringify(data), function (err) {
            if (err) {
                reject(err)
            }
            ctx.body = {
                "succ": true,
                "content": data,
                "msg": "数据写入成功！"
            }
            resolve(ctx.body)
        })
    })
}
//获取配置URl
const fn_getConfigUrl = async (ctx) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, `./config.JSON`), (err, data) => {
            console.log(`data`);
            console.log(data);
            if (err) {
                reject(err)
            } else {
                ctx.body = {
                    "succ": true,
                    "content": JSON.parse(data.toString()),
                    "msg": "数据获取成功！"
                }
                resolve(ctx.body)
            }
        })
    })
}
//存取配置URL
const fn_setConfigUrl = async (ctx) => {
    let data = ctx.request.body
    return new Promise((resolve, reject) => {
        fs.writeFile(path.resolve(__dirname, `./config.JSON`), JSON.stringify(data), function (err) {
            if (err) {
                reject(err)
            }
            ctx.body = {
                "succ": true,
                "content": data,
                "msg": "数据写入成功！"
            }
            resolve(ctx.body)
        })
    })
}

module.exports = {
    'POST /get/table/content': fn_getTableContent,  //获取tableContent
    'POST /sent/table/content': fn_sentTableContent, //获取tableContent
    'POST /set/config/url': fn_setConfigUrl, //存取配置URl
    'POST /get/config/url': fn_getConfigUrl, //获取配置URl
};

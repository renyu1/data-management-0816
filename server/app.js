require("babel-polyfill");
const
    Koa = require('koa')
    , path = require('path')
    , controller = require('./controller/index')
    , onError = require('koa-onerror')
    , bodyParser = require('koa-body')
    , serve = require('koa-static')
    , logger = require('koa-logger')
    , views = require('koa-views')
    , app = new Koa()


onError(app)
app
    .use(logger())
    .use(views(path.resolve(__dirname, '../views')))
    .use(serve(path.resolve(__dirname, '../dist')))
    .use(bodyParser({
        multipart: true,
        formLimit: "10mb",
        jsonLimit: "10mb",
        textLimit: "10mb",
        enableTypes: ['json', 'form', 'text']
    }))
    .use(controller())
    .listen(3001, () => {
        console.log(`app server listen in 3001`)
    })

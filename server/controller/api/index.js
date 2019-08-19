let
    fn_index = async ctx => {
        await ctx.render('index')
    }
module.exports = {
    'GET /': fn_index
}
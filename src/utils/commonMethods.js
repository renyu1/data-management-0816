/* eslint-disable no-bitwise,curly */
import Vue from 'vue'
const common = {
    install(Vue) {
        //格式化时间戳
        Vue.prototype.conversionTime = d => {
            if (d > 0) {
                let date = new Date(d)
                return fmt => {         //author: meizz
                    let o = {
                        'M+': date.getMonth() + 1, //月份
                        'd+': date.getDate(), //日
                        'h+': date.getHours(), //小时
                        'm+': date.getMinutes(), //分
                        's+': date.getSeconds(), //秒
                        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
                        'S': date.getMilliseconds() //毫秒
                    }
                    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + ``).substr(4 - RegExp.$1.length))
                    for (let k in o)
                        if (new RegExp(`(` + k + `)`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00` + o[k]).substr((`` + o[k]).length)))
                    return fmt
                }
            } else {
                return () => {
                    return ``
                }
            }
        }
        //剔除字符串首尾空格
        Vue.prototype.TRIM = (str) => {
            return str.replace(/(^\s*)|(\s*$)/g, ``)
        }
        //存session
        Vue.prototype.setSession = (name, content) => {
            if (!name) return;
            if (typeof content !== `string`) {
                content = JSON.stringify(content);
            }
            window.sessionStorage.setItem(name, content);
        }
        //取session
        Vue.prototype.getSession = (name) => {
            if (!name) return;
            return window.sessionStorage.getItem(name);
        }
        //删session
        Vue.prototype.removeSession = () => {
            return window.sessionStorage.clear();
        }
    }
}
Vue.use(common)
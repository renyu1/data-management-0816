//接口引入
import axios from 'axios'

const fnRes = (res) => JSON.parse(res.request.response)
export const getTableContent = data => axios.post(`/get/table/content`, data).then(fnRes)
export const sentTableContent = data => axios.post(`/sent/table/content`, data).then(fnRes)
export const setConfigUrl = data => axios.post(`/set/config/url`, data).then(fnRes)
export const getConfigUrl = data => axios.post(`/get/config/url`, data).then(fnRes)

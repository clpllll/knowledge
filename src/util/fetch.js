import Axios from 'axios'
import { getToken } from './token';
import { Message } from 'element-ui';
import store from '../srote'
const serve = Axios.create({
  baseURL: '/api',
  timeout: 1000 * 60 * 3,
})
const reqs = (conf) => {
  if (getToken()) {
    store.commit("setTime", new Date().getTime())
    conf.headers = { 'X-Auth-token': getToken() }
  }
  return conf
}
const reqe = (err) => {
  console.log('err', err)
  Message.error(err.response.statusText)
  return false
}
const ress = (conf) => {
  if (conf.data.code === 200) return conf.data
  Message.error(conf.data.message)
  return false
}
const rese = (err) => {
  // console.log(err.response.statusText)
  // time = new Date().getTime();
  console.log('rese',err)
  Message.error(err.response.statusText)
  return false
}
serve.interceptors.request.use(reqs,reqe)
serve.interceptors.response.use(ress, rese)
export default serve
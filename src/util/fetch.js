import Axios from 'axios'
const serve = Axios.create({
  baseURL: '/api',
  timeout: 1000 * 60 * 3,
})
const reqs = (conf) => {
  return conf
}
const reqe = (err) => {
  console.log('err',err)
}
const ress = (conf) => {
  return conf
}
const rese = (err) => {
  console.log('err',err)
}
serve.interceptors.request.use(reqs,reqe)
serve.interceptors.response.use(ress, rese)
export default serve
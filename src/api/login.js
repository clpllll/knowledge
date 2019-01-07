import Fetch from '@/util/fetch.js'
export const login = (params) => {
  return Fetch({
    url: "/login",
    method: 'post',
    data:params
  })
}
export const register = (params) => {
  return Fetch({
    url: "/register",
    method: 'post',
    data:params
  })
}
export const getInfo = () => {
  return Fetch({
    url: "/info",
    method: 'get',
  })
}
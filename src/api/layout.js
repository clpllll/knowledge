import Fetch from '@/util/fetch.js'
// console.log(Fetch)
export const getCategory = () => {
  return Fetch({
    url: "/category",
    method: 'get'
  })
}
export const setArticle = (params) => {
  return Fetch({
    url: "/article",
    method: 'post',
    data:params
  })
}
export const getArticle = (params) => {
  return Fetch({
    url: "/article",
    method: 'get',
    params
  })
}
export const getTitle = () => {
  return Fetch({
    url: "/title",
    method: 'get'
  })
}
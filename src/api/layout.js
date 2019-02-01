import Fetch from '@/util/fetch.js'
export const getCategory = (params) => {
  return Fetch({
    url: "/category",
    method: 'get',
    params
  })
}
export const setArticle = (params) => {
  return Fetch({
    url: "/article",
    method: 'post',
    data:params
  })
}
export const patchArticle = (params) => {
  return Fetch({
    url: "/article",
    method: 'patch',
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
    method: 'get',
  })
}
export const getGeneralities = () => {
  return Fetch({
    url: "/generalities",
    method: 'get',
  })
}
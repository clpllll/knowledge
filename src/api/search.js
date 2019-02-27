import Fetch from '@/util/fetch.js'
export const getSearch = (params) => {
  return Fetch({
    url: "/search",
    method: 'get',
    params
  })
}
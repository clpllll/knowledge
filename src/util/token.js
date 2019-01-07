export const getToken = () => {
  return localStorage.getItem('a-token')
}
export const setToken = (token) => {
  localStorage.setItem('a-token',token)
}
export const removeToken = () => {
  localStorage.removeItem('a-token')
}
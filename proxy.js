module.exports = {
  '/api': {
    target: "http://127.0.0.1:3006",
    pathRewrite:{'/api':""}
  }
}
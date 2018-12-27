
const cryptoJS = require('crypto-js')
export default (password) => {
  return cryptoJS.AES.encrypt(password, 'sddecegfrcdethyrd23sqasj7j5').toString();
}
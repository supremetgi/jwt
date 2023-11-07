const crypto = require('crypto')


const key1 = crypto.randomBytes(32)


console.log('hi')
console.log((key1).toString('hex'))
console.log(typeof(key1))
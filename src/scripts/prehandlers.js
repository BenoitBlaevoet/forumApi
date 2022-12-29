const slugify = require('slugify')
const { hashPassword } = require('./hashPw')

const cryptPW = async (request, reply, done) => {
  if (!request.body.password) return
  request.body.password = await hashPassword(request.body.password)
}

const slugField = async (request, reply, done) => {
  if (!request.body.username) return
  request.body.slug = slugify(request.body.username, { lower: true, strict: true })
}

module.exports = {
  cryptPW,
  slugField
}

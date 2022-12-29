
const User = new (require('../models/Users'))()
const slugify = require('slugify')
const { v4: uuidv4 } = require('uuid')
const { generateTokens } = require('../scripts/jwt')
const { hashPassword } = require('../scripts/hashPw')
const {
  addRefreshTokenToWhitelist
} = require('../scripts/auth.services')

const cryptPW = async (request, reply, done) => {
  request.body.password = await hashPassword(request.body.password)
}

// Fastify schema to validate data
const schema = {
  body: {
    type: 'object',
    properties: {
      username: { type: 'string' },
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
      userRoleId: { type: 'number' }
    }
  }
}

module.exports = (fastify) => {
  fastify.post('/user/register', {
    preHandler: [cryptPW],
    schema
  }, async (request, reply) => {
    try {
      const { username } = request.body
      const slug = slugify(username, { lower: true, strict: true })

      const newUser = Object.assign({ slug }, request.body)
      const user = await User.createUser(newUser)
      const requestFeedback = { message: `L'utilisateur ${user.username} a bien été ajouter dans la base de donnée` }

      const jti = uuidv4()
      const { accessToken, refreshToken } = generateTokens(user, jti)
      await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id })
      const token = { accessToken, refreshToken }
      reply.status(200).send(Object.assign(user, requestFeedback, token))
    } catch (e) {
      // TODO handle this error
      console.log(e)
    }
  })
}

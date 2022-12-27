
const User = new (require('../models/Users'))()
const slugify = require('slugify')
const { v4: uuidv4 } = require('uuid')
const { generateTokens } = require('../scripts/jwt')
const {
  addRefreshTokenToWhitelist
} = require('../scripts/auth.services')

module.exports = (fastify) => {
  fastify.post('/adduser', async (request, reply) => {
    try {
      const { username } = request.body
      const slug = slugify(username, { lower: true, strict: true })

      const newUser = Object.assign(slug, request.body)
      const user = User.createUser(newUser)
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

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const slugify = require('slugify')
const { v4: uuidv4 } = require('uuid')
const { generateTokens } = require('../scripts/jwt')
const {
  addRefreshTokenToWhitelist
} = require('../scripts/auth.services')

module.exports = (fastify) => {
  fastify.post('/adduser', async (request, reply) => {
    try {
      const { username, email, password, userRoleId } = request.body
      const slug = slugify(username, { lower: true, strict: true })
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password,
          userRoleId,
          slug
        }
      })
      const requestFeedback = { message: `L'utilisateur ${user.username} a bien été ajouter dans la base de donnée` }

      const jti = uuidv4()
      const { accessToken, refreshToken } = generateTokens(user, jti)
      await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id })
      console.log(accessToken, refreshToken)
      const token = { accessToken, refreshToken }
      reply.status(200).send(Object.assign(user, requestFeedback, token))
    } catch (e) {
      // TODO handle this error
      console.log(e)
    }
  })
}

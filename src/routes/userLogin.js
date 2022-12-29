const bcrypt = require('bcrypt')
const { hashPassword } = require('../scripts/hashPw')
const { v4: uuidv4 } = require('uuid')
const { generateTokens } = require('../scripts/jwt')
const {
  addRefreshTokenToWhitelist
} = require('../scripts/auth.services')
const userModel = new (require('../models/Users'))()

module.exports = (fastify) => {
  fastify.post('/user/login', async (request, reply) => {
    const errorFb = "L'email ou le mot de passe est incorrect"
    const { email, password } = request.body
    try {
      const user = await userModel.getUserByEmail(email)

      if (bcrypt.compare(password, user.password)) {
        const returnUser = await userModel.getUserByIdSafe(user.id)
        const jti = uuidv4()
        const { accessToken, refreshToken } = generateTokens(user, jti)
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id })
        const token = { accessToken, refreshToken }
        reply.status(200).send({ ok: 1, user: returnUser, message: `L'utilisateur ${user.username} a bien été trouver dans la base de donnée`, token })
      } else {
        console.log(user.password + ' ' + await hashPassword(password))
        reply.status(404).send({ ok: 0, message: errorFb })
      }
      // TODO Logging the loggin here
    } catch (e) {
      // TODO check how to handle this error the best way possible, may not be always a 404 duh
      reply.status(404).send({ ok: 0, message: errorFb, error: e })
    }
  })
}

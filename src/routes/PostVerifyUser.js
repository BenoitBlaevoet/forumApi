const bcrypt = require('bcrypt')
async function hashPassword (password) {
  const pw = await new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err)
      } else {
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) {
            reject(err)
          } else {
            resolve(hash)
          }
        })
      }
    })
  })
  return pw
}
module.exports = (fastify) => {
  fastify.post('/userloggin', async (request, reply) => {
    const errorFb = "L'email ou le mot de passe est incorrect"
    const { email, password } = request.body
    try {
      const user = await new (require('../models/Users'))().getUserByEmail(email)

      if (bcrypt.compare(password, user.password)) {
        const { password: _, ...returnUser } = user
        reply.status(200).send({ ok: 1, user: returnUser, message: `L'utilisateur ${user.username} a bien été trouver dans la base de donnée` })
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


const writeLog = require('../scripts/logfile')

module.exports = (fastify) => {
  fastify.get('/users', async (request, reply) => {
    try {
      // Require and initiate new Object in one line
      const users = await new (require('../models/Users'))().getAllUsers()
      // const allUsersAndPosts = await Users.getAllUsers()
      await reply.status(200).send(Object.assign({ ok: 1 }, { users }))
      // TODO build better log here
      writeLog('request /posts succeed 3', 'request')
    } catch (e) {
      // TODO Verify how to send better error message here
      const codeError = 500
      console.log(e)
      reply.status(codeError).send(Object.assign({ ok: 0 }, { message: "Impossible d'accéder à la database" }, { e }))
    }
  })
}

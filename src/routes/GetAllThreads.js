module.exports = (fastify) => {
  fastify.get('/threads', async (request, reply) => {
    try {
      // Require and initiate new Object in one line
      const threads = await new (require('../models/Threads'))().getAllThreads()
      // const allUsersAndPosts = await Users.getAllUsers()
      await reply.status(200).send(Object.assign({ ok: 1 }, { threads }))
      // TODO build better log here
    } catch (e) {
      // TODO Verify how to send better error message here
      const codeError = 500
      console.log(e)
      reply.status(codeError).send(Object.assign({ ok: 0 }, { message: "Impossible d'accéder à la database" }, { e }))
    }
  })
}

module.exports = (fastify) => {
  fastify.get('/user/:uid', async (request, reply) => {
    try {
      const { uid } = request.params
      const user = await new (require('../models/Users'))().getUserById(parseInt(uid))
      if (user) {
        reply.status(200).send(user)
      } else {
        reply.status(404).send({ ok: 0, message: "L'utilisateur demander n'existe pas" })
      }
      // TODO build log here
    } catch (e) {
      // TODO check when we end up here and try to send the best message
      console.log(e)
      reply.status(500).send(e)
    }
  })
}

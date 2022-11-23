module.exports = (fastify) => {
  fastify.get('/userbyslug/:slug', async (request, reply) => {
    try {
      const { slug } = request.params
      const user = await new (require('../models/Users'))().getUserBySlug(slug)
      if (user) {
        reply.status(200).send({ ok: 1, user })
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

module.exports = (fastify) => {
  fastify.get('/thread/:slug', async (request, reply) => {
    try {
      // Require and initiate new Object in one line
      const slug = request.params.slug
      console.log(slug)
      const thread = await new (require('../models/Threads'))().getThreadBySlug(slug)
      await reply.status(200).send(Object.assign({ ok: 1 }, { thread }))
      // TODO build better log here
    } catch (e) {
      // TODO Verify how to send better error message here
      const codeError = 500
      console.log(e)
      reply.status(codeError).send(Object.assign({ ok: 0 }, { message: "Impossible d'accéder à la database" }, { e }))
    }
  })
}

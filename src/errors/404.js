const Fastify = require('fastify')
const fastify = Fastify({
  logger: true
})
module.exports = () => {
  fastify.setNotFoundHandler(function (error, request, reply) {
    this.log.error(error)
    // Send error response
    reply.status(404).send({ ok: 0, error: { code: 404, message: "Erreur 404, Le chemin d'accés spécifié n'existe pas" } })
  })
}

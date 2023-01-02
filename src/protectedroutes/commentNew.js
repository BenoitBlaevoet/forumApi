
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
module.exports = (fastify) => {
  fastify.route({
    method: 'POST',
    url: '/comment/new',
    preHandler: fastify.auth([
      fastify.verifyJWT
    ]),
    handler: async (req, reply) => {
      try {
        console.log(req.body)
        const post = await prisma.comments.create({
          data: req.body
        })
        const requestFeedback = { message: `La publication : ${post.title}. à bien été enregistrée` }
        reply.status(200).send(Object.assign(post, requestFeedback))
      } catch (e) {
        console.error(e)
      }
    }
  })
}

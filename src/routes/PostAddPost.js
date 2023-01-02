const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { postSchema } = require('../schema')
const { slugField } = require('../scripts/prehandlers')

module.exports = (fastify) => {
  fastify.post('/addpost', {
    preHandler: [slugField],
    postSchema
  }, async (request, reply) => {
    try {
      const { title, content, authorId } = request.body
      const post = await prisma.post.create({
        data: {
          title,
          content,
          authorId
        }
      })
      const requestFeedback = { message: `La publication : ${post.title}. à bien été enregistrée` }
      reply.status(200).send(Object.assign(post, requestFeedback))
    } catch (e) {
      // TODO handle this error
      console.log(e)
    }
  })
}

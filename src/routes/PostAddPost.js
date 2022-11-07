const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = (fastify) => {
  fastify.post('/addpost', async (request, reply) => {
    const { title, content, authorId } = request.body
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId
      }
    })
    const requestFeedback = { request_feedback: `La publication : ${post.title}. à bien été enregistrée` }
    reply.status(200).send(Object.assign(post, requestFeedback))
  })
}

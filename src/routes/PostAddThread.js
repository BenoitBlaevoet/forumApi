const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const slugify = require('slugify')

module.exports = (fastify) => {
  fastify.post('/addthread', async (request, reply) => {
    const { title, authorId, categoryId, forumId } = request.body
    const slug = slugify(title, { lower: true, strict: true })
    const thread = await prisma.thread.create({
      data: {
        title,
        authorId,
        categoryId,
        forumId,
        slug
      }
    })
    const requestFeedback = { request_feedback: `Le thread : ${thread.name}. à bien été enregistrée` }
    reply.status(200).send(Object.assign(thread, requestFeedback))
  })
}

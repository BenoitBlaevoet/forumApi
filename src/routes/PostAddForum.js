const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const slugify = require('slugify')

module.exports = (fastify) => {
  fastify.post('/addforum', async (request, reply) => {
    const { name } = request.body
    const slug = slugify(name, { lower: true, strict: true })
    const forum = await prisma.forum.create({
      data: {
        name,
        slug
      }
    })
    const newforum = await prisma.forum.findFirst()
    const requestFeedback = { request_feedback: `Le forum : ${forum.name}. à bien été enregistrée`, new: newforum }
    reply.status(200).send(Object.assign(forum, requestFeedback))
  })
}

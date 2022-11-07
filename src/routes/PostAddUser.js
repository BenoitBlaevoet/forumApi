const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = (fastify) => {
  fastify.post('/adduser', async (request, reply) => {
    const { name, email } = request.body
    const user = await prisma.user.create({
      data: {
        name,
        email
      }
    })
    const requestFeedback = { request_feedback: `L'utilisateur ${user.name} a bien été ajouter dans la base de donnée` }
    reply.status(200).send(Object.assign(user, requestFeedback))
  })
}

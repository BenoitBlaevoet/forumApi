const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = (fastify) => {
  fastify.post('/addprofile', async (request, reply) => {
    const { bio, userId } = request.body
    const profile = await prisma.profile.create({
      data: {
        bio,
        userId
      }
    })
    const requestFeedback = { request_feedback: `Le profile à bien été ajoutée : ${profile.bio}` }
    reply.status(200).send(Object.assign(profile, requestFeedback))
  })
}

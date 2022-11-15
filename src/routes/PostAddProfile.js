const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = (fastify) => {
  fastify.post('/addprofile', async (request, reply) => {
    try {
      const { bio, userId } = request.body
      const profile = await prisma.profile.create({
        data: {
          bio,
          userId
        }
      })
      const requestFeedback = { message: `Le profile à bien été ajoutée : ${profile.bio}` }
      reply.status(200).send(Object.assign(profile, requestFeedback))
    } catch (e) {
      // TODO handle this error
      console.log(e)
    }
  })
}

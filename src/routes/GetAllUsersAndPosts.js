const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = (fastify) => {
  fastify.get('/users', async (request, reply) => {
    const allUsersAndPosts = await prisma.user.findMany({
      include: {
        threads: true,
        Profile: true
      }
    })
    reply.send(allUsersAndPosts)
  })
}

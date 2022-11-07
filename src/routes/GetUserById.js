const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = (fastify) => {
  fastify.get('/user/:uid', async (request, reply) => {
    const { uid } = request.params
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(uid)
      },
      include: {
        threads: true,
        Comments: true,
        Profile: true
      }
    })
    reply.send(user)
  })
}

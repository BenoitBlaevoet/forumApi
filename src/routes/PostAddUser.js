const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const slugify = require('slugify')

module.exports = (fastify) => {
  fastify.post('/adduser', async (request, reply) => {
    try {
      const { username, email, password, userRoleId } = request.body
      const slug = slugify(username, { lower: true, strict: true })
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password,
          userRoleId,
          slug
        }
      })
      const requestFeedback = { message: `L'utilisateur ${user.username} a bien été ajouter dans la base de donnée` }
      reply.status(200).send(Object.assign(user, requestFeedback))
    } catch (e) {
      // TODO handle this error
      console.log(e)
    }
  })
}

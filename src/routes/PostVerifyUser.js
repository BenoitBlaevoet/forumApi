const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = (fastify) => {
  fastify.post('/userloggin', async (request, reply) => {
    const errorFb = "L'email ou le mot de passe est incorrect"
    const { email, password } = request.body
    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          email
        },
        include: {
          userRole: true
        }
      })
      if (user.password === password) {
        const { password: _, ...returnUser } = user
        reply.status(200).send({ ok: 1, user: returnUser, request_feedback: `L'utilisateur ${user.username} a bien été trouver dans la base de donnée` })
      } else {
        reply.status(404).send({ ok: 0, request_feedback: errorFb })
      }
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log('oups')
      }
      reply.status(404).send({ ok: 0, request_feedback: errorFb, error: e })
    }
  })

  // if (user.password === password) {
  //   const { password: _, ...returnUser } = user
  //   reply.status(200).send({ ok: 1, user: returnUser, request_feedback: `L'utilisateur ${user.username} a bien été trouver dans la base de donnée` })
  // } else {
  //   reply.status(404).send({ ok: 0, request_feedback: `L'utilisateur ${user.username} a bien été trouver dans la base de donnée` })
  // }

  // const requestFeedback = { request_feedback: `L'utilisateur ${user.username} a bien été ajouter dans la base de donnée` }
  // { reply.status(200).send(Object.assign(user)) }
  // })
}

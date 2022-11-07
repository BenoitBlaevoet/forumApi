const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = (fastify) => {
  // fastify.var bodyParser = require('body-parser');
  // app.use(bodyParser.json());

  fastify.put('/user', async (req, res) => {
    const { id, name, email } = req.body
    const updateUser = await prisma.user.update({
      where: {
        id
      },
      data: {
        name,
        email
      }
    })

    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    const message = `User ${user.name} has been updated successfully.`
    res.send(Object.assign({ message }, { updateUser }, { user }))
  })
}

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const slugify = require('slugify')
module.exports = (fastify) => {
  // fastify.var bodyParser = require('body-parser');
  // app.use(bodyParser.json());

  fastify.put('/user', async (req, res) => {
    const { id, username, email, password } = req.body
    const slug = slugify(username, { lower: true, strict: true })
    const currentUserRoleId = async () => {
      const userrole = await prisma.user.findUnique({
        where: {
          id
        },
        data: {
          userRoleId
        }
      })
      return userrole
    }
    const userRoleId = req.body.userRoleId
      ? req.body.userRoleId
      : currentUserRoleId
    // const updateUser = await prisma.user.update({
    //   where: {
    //     id
    //   },
    //   data: {
    //     username,
    //     email,
    //     password,
    //     userRoleId,
    //     slug
    //   }
    // })

    // const user = await prisma.user.findUnique({
    //   where: {
    //     id
    //   }
    // })
    // const message = `User ${user.name} has been updated successfully.`
    // res.send(Object.assign({ message }, { updateUser }, { user }))
    res.send(userRoleId)
  })
}

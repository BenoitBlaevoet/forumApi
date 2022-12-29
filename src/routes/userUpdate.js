const User = new (require('../models/Users'))()
const { cryptPW, slugField } = require('../scripts/prehandlers')
const schema = {
  body: {
    type: 'object',
    properties: {
      id: { type: 'number' },
      username: { type: 'string' },
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
      userRoleId: { type: 'number' }
    },
    required: ['id']
  }
}

module.exports = (fastify) => {
  fastify.put('/user', {
    preHandler: [cryptPW, slugField],
    schema
  }, async (request, res) => {
    try {
      const updateUser = await User.updateUser(request.body)

      // remove the password in case it has been updated
      // const { password: _, ...returnUser } = updateUser
      if (updateUser.password) {
        updateUser.password = 'Updated!'
      }

      const message = `User ${updateUser.username} has been updated successfully.`
      res.send(Object.assign({ message }, { data: updateUser }))
    } catch (e) {
      // TODO handle this error
      console.log(e)
    }
  })
}

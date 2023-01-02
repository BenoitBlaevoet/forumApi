const User = new (require('../models/Users'))()
const { cryptPW, slugField } = require('../scripts/prehandlers')
const { userSchema } = require('../schema')
userSchema.body.required.push('id')
module.exports = (fastify) => {
  fastify.put('/user', {
    preHandler: [cryptPW, slugField],
    userSchema
  }, async (request, res) => {
    try {
      const updateUser = await User.updateUser(request.body)
      if (updateUser.password) {
        updateUser.password = 'Updated!'
      }
      const message = `User ${updateUser.username} has been updated successfully.`
      res.send(Object.assign({ message }, { data: updateUser }))
    } catch (e) {
      console.error(e)
    }
  })
}

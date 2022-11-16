const slugify = require('slugify')
const User = new (require('../models/Users'))()
module.exports = (fastify) => {
  fastify.put('/user', async (req, res) => {
    try {
      const { id, username, email, password } = req.body
      const slug = slugify(username, { lower: true, strict: true })
      const uid = parseInt(id)
      const uRoleId =
        req.body.userRoleId
          ? req.body.userRoleId
          : await User.getUserRoleIdById(parseInt(uid))
      const updateUser = await User.updateUser(uid, username, password, email, slug, uRoleId)

      const { password: _, ...returnUser } = updateUser

      const message = `User ${updateUser.username} has been updated successfully.`
      res.send(Object.assign({ message }, { returnUser }))
    } catch (e) {
      // TODO handle this error
      console.log(e)
    }
  })
}

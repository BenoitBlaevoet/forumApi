const slugify = require('slugify')
module.exports = (fastify) => {
  fastify.put('/user', async (req, res) => {
    try {
      const { id, username, email, password } = req.body
      const slug = slugify(username, { lower: true, strict: true })
      const uid = parseInt(id)
      let uRoleId
      if (req.body.userRoleId) {
        uRoleId = req.body.userRoleId
      } else {
        uRoleId = await new (require('../models/Users'))().getUserRoleIdById(parseInt(uid))
      }
      const updateUser = await new (require('../models/Users'))().updateUser(uid, username, password, email, slug, uRoleId)

      const { password: _, ...returnUser } = updateUser

      const message = `User ${updateUser.username} has been updated successfully.`
      res.send(Object.assign({ message }, { returnUser }))
    } catch (e) {
      // TODO handle this error
      console.log(e)
    }
  })
}

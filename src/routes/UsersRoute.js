const slugify = require('slugify')
const User = new (require('../models/Users'))()
const { v4: uuidv4 } = require('uuid')
const { generateTokens } = require('../scripts/jwt')
const {
  addRefreshTokenToWhitelist
} = require('../scripts/auth.services')
module.exports = (fastify) => {
  fastify.register((instance, opts, next) => {
    //
    // Get the user by id
    //
    fastify.get('/:uid', async (request, reply) => {
      try {
        const { uid } = request.params
        const user = await User.getUserById(parseInt(uid))
        if (user) {
          reply.status(200).send(user)
        } else {
          reply.status(404).send({ ok: 0, message: "L'utilisateur demander n'existe pas" })
        }
      } catch (e) {
        // TODO check when we end up here and try to send the best message
        console.log(e)
        reply.status(500).send(e)
      }
    })

    // Register a new user
    fastify.post('/register', async (request, reply) => {
      try {
        const { username } = request.body
        const slug = slugify(username, { lower: true, strict: true })
        const newUser = Object.assign(slug, request.body)
        const user = User.createUser(newUser)
        const requestFeedback = { message: `L'utilisateur ${user.username} a bien été ajouter dans la base de donnée` }

        const jti = uuidv4()
        const { accessToken, refreshToken } = generateTokens(user, jti)
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id })
        const token = { accessToken, refreshToken }
        reply.status(200).send(Object.assign(user, requestFeedback, token))
      } catch (e) {
        // TODO handle this error
        console.log(e)
      }
    })
    //
    // Update the user
    //
    fastify.put('/', async (req, res) => {
      try {
        const { id, username, email, password } = req.body
        const slug = slugify(username, { lower: true, strict: true })
        const uid = parseInt(id)
        const uRoleId =
          req.body.userRoleId
            ? req.body.userRoleId
            : await User.getUserRoleIdById(parseInt(uid))
        const updateUser = await User.updateUser(uid, username, password, email, slug, uRoleId)
        // remove the password from the object
        const { password: _, ...returnUser } = updateUser
        const message = `User ${updateUser.username} has been updated successfully.`
        res.send(Object.assign({ message }, { returnUser }))
      } catch (e) {
        // TODO handle this error
        console.log(e)
      }
    })
  }, { prefix: 'user' })
}

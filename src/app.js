require('dotenv').config()
const fastify = require('fastify')({ logger: true })
const middie = require('@fastify/middie')
const cors = require('@fastify/cors')
const moment = require('moment')
const diffForHumans = require('./scripts/diffForHumans')

const fs = require('fs')
const path = require('path')

fastify.register(middie)
fastify.register(cors)

// Routes
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})
fastify.get('/test', async (request, reply) => {
  moment.locale('fr')
  return { diff: diffForHumans('2022-11-05T18:12:33.411Z'), diffMoment: moment('2022-11-05T18:12:33.411Z').fromNow() }
})

const routesPath = path.join(__dirname, './routes')
const routesDir = fs.readdirSync(routesPath)
routesDir.forEach(route => {
  require(path.join(routesPath, route))(fastify)
})

// require('./routes/GetAllUsersAndPosts')(fastify)
// require('./routes/GetUserById')(fastify)
// require('./routes/PostAddUser')(fastify)
// require('./routes/PostAddPost')(fastify)
// require('./routes/PostAddProfile')(fastify)
// require('./routes/PutUpdateUser')(fastify)

// start server
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()

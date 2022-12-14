require('dotenv').config()
const fastify = require('fastify')({ logger: true })
const middie = require('@fastify/middie')
const jwt = require('jsonwebtoken')
const moment = require('moment')

require('dotenv').config()
const diffForHumans = require('./scripts/diffForHumans')

const fs = require('fs')
const path = require('path')

fastify.register(middie)
fastify.register(require('@fastify/cors'), (instance) => {
  return (req, callback) => {
    const corsOptions = {
      // This is NOT recommended for production as it enables reflection exploits
      origin: true
    }

    // do not include CORS headers for requests from localhost
    if (/^localhost$/m.test(req.headers.origin)) {
      corsOptions.origin = false
    }
    if (/^127.0.0.1$/m.test(req.headers.origin)) {
      corsOptions.origin = false
    }

    // callback expects two parameters: error and options
    callback(null, corsOptions)
  }
})

// Protected routes
fastify
  .decorate('verifyJWT', (request, reply, done) => {
    try {
      if (!request.headers.authorization) {
        throw new Error('No token was sent')
      }
      const token = request.headers.authorization.replace('Bearer ', '')
      const isValid = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      if (!isValid) {
        throw new Error('Token is invalid')
      }
    } catch (e) {
      reply.code(401).send(e)
    }
    done()
  })
  .register(require('@fastify/auth'))
  .after(() => {
    require('./protectedroutes/commentNew')(fastify)
  })

// Routes
fastify.get('/', async (request, reply) => {
  console.log('Access to root route.')
  return { hello: 'world' }
})
fastify.get('/test', async (request, reply) => {
  moment.locale('fr')
  return { diff: diffForHumans('2022-11-05T18:12:33.411Z'), diffMoment: moment('2022-11-05T18:12:33.411Z').fromNow() }
})
// Build path to route and require every file
const routesPath = path.join(__dirname, './routes')
const routesDir = fs.readdirSync(routesPath)
routesDir.forEach(route => {
  require(path.join(routesPath, route))(fastify)
})
// Require error handling routes
const errorPath = path.join(__dirname, '/errors')
const errorDir = fs.readdirSync(errorPath)
errorDir.forEach(route => {
  require(path.join(errorPath, route))
})

// start server
const serverPort = process.env.PORT || 3000
const serverHost = process.env.HOST || '0.0.0.0'
const start = async () => {
  try {
    await fastify.listen({ port: serverPort, host: serverHost })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()

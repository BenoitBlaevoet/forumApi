require('dotenv').config()
const fastify = require('fastify')({ logger: true })
const middie = require('@fastify/middie')
const cors = require('@fastify/cors')
const moment = require('moment')
require('dotenv').config()
const diffForHumans = require('./scripts/diffForHumans')

const fs = require('fs')
const path = require('path')

fastify.register(middie)
fastify.register(cors)

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

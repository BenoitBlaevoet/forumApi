const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const slugify = require('slugify')

module.exports = (fastify) => {
  fastify.post('/addcategory', async (request, reply) => {
    try {
      const { name } = request.body
      const slug = slugify(name, { lower: true, strict: true })
      const category = await prisma.category.create({
        data: {
          name,
          slug
        }
      })
      const requestFeedback = { message: `La categorie : ${category.name}. à bien été enregistrée` }
      reply.status(200).send(Object.assign(category, requestFeedback))
    } catch (e) {
      // TODO handle this error
      console.log(e)
    }
  })
}

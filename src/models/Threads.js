
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const authorOption = {
  username: true,
  slug: true,
  email: false,
  password: false,
  banned: false,
  desactivated: false,
  userRole: true
}

module.exports = class Threads {
  async getAllThreads () {
    return await prisma.thread.findMany({
      include: {
        _count: true,
        Forum: true,
        author: {
          select: authorOption
        }
      }
    })
  }

  async getThreadBySlug (slug) {
    return await prisma.thread.findUniqueOrThrow({
      where: {
        slug
      },
      include: {
        author: { select: authorOption },
        Comments: {
          where: {
            quoteMessageId: null
          },

          include: {
            quotedMessage: {
              include: {
                quotedMessage: { include: { quotedMessage: { include: { quotedMessage: { include: { quotedMessage: true } } } } } }
              }
            }
          }
        }
      }
    })
  }
}

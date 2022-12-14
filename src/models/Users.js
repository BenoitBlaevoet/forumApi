// TODO Ajouter setter & getter pour chaque champ du model
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = class Users {
  async getAllUsers () {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        slug: true,
        email: false,
        userRole: true,
        FavoriteForum: true,
        banned: true,
        desactivated: true,
        password: false,
        threads: true,
        Profile: true,
        createdAt: true,
        updateAt: true
      }
    })
    return users
  }

  async getUserById (id) {
    return await prisma.user.findUniqueOrThrow({
      where: {
        id
      },
      include: {
        threads: {
          include: {
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
        },
        Profile: true
      }
    })
  }

  async getUserBySlug (slug) {
    console.log(slug)
    return await prisma.user.findUniqueOrThrow({
      where: {
        slug
      },
      include: {
        threads: true,
        _count: true
      }
    })
  }

  // safe mean without password and other sensible informations
  async getUserByIdSafe (id) {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id
      },
      select: {
        id: false,
        username: true,
        slug: true,
        email: false,
        userRole: true,
        FavoriteForum: true,
        banned: true,
        desactivated: true,
        password: false,
        threads: false,
        Profile: false,
        createdAt: false,
        updateAt: false,
        RefreshToken: true
      }
    })
    return user
  }

  async getUserByEmail (email) {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email
      },
      include: {
        userRole: true,
        RefreshToken: true
      }
    })
    return user
  }

  async getUserRoleIdById (id) {
    const user = await prisma.user.findUnique({
      select: {
        userRoleId: true
      },
      where: {
        id
      }
    })
    return user.userRoleId
  }

  async createUser (user) {
    return await prisma.user.create({
      data: user
    })
  }

  async updateUser (data) {
    const user = await prisma.user.update({
      where: {
        id: data.id
      },
      data
    })
    return user
  }

  async banToggleUser (id, banned = true) {
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        banned
      }
    })
    return user
  }

  async update (id, object) {
    const user = await prisma.user.update({
      where: {
        id
      },
      data: object
    })
    return user
  }
}

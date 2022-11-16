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
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id
      },
      include: {
        threads: true,
        Comments: true,
        Profile: true
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
        userRole: true
      }
    })
    console.log('in model request')
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

  async updateUser (id, username, password, email, slug, userRoleId) {
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        username,
        email,
        password,
        userRoleId,
        slug
      }
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

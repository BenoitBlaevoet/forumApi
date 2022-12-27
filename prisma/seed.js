const { faker } = require('@faker-js/faker')
const slugify = require('slugify')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const user = []
const userRole = []
const userRights = []
const profile = []
const forum = []
const thread = []
const comments = []
const category = []

for (let i = 0; i < 10; i++) {
  const value = i + 1
  const username = faker.internet.userName()
  user.push({
    username,
    slug: slugify(username),
    email: faker.internet.email(),
    password: faker.internet.password(),
    banned: faker.datatype.boolean(),
    desactivated: faker.datatype.boolean(),
    userRoleId: 2
  })
  profile.push({
    name: faker.name.firstName(),
    firstname: faker.name.lastName(),
    bio: faker.lorem.sentences(),
    avatar: faker.image.avatar(),
    userId: value
  })
  const categoryname = faker.lorem.word()
  category.push({
    name: categoryname,
    slug: slugify(categoryname)
  })
}

for (let i = 0; i < 5; i++) {
  const forumname = faker.random.word()
  forum.push({
    name: forumname,
    slug: slugify(forumname),
    categoryId: faker.datatype.number({ min: 1, max: 5 })
  })
}

for (let i = 0; i < 50; i++) {
  const threadTitle = faker.lorem.sentence()
  thread.push({
    title: threadTitle,
    slug: slugify(threadTitle),
    content: faker.lorem.text(),
    authorId: faker.datatype.number({ min: 1, max: 10 }),
    categoryId: faker.datatype.number({ min: 1, max: 10 }),
    forumId: faker.datatype.number({ min: 1, max: 5 })
  })
}

for (let i = 0; i < 450; i++) {
  comments.push({
    content: faker.lorem.text(),
    threadId: faker.datatype.number({ min: 1, max: 50 }),
    userId: faker.datatype.number({ min: 1, max: 10 })
  })
}
// User

userRights.push({
  id: 1,
  createThread: true,
  readThread: true,
  deleteOwnThread: true,
  editOwnThread: true,
  editThread: false,
  deleteThread: false,
  commentThread: true,
  deleteOwnComment: true,
  deleteComment: false,
  sendPrivateMessage: true,
  banUsers: false
})

userRole.push({
  name: 'User',
  slug: 'user',
  userRightsId: 1
})
// Admin
userRights.push({
  id: 2,
  createThread: true,
  readThread: true,
  deleteOwnThread: true,
  editOwnThread: true,
  editThread: true,
  deleteThread: true,
  commentThread: true,
  deleteOwnComment: true,
  deleteComment: true,
  sendPrivateMessage: true,
  banUsers: true
})
userRole.push({
  name: 'Admin',
  slug: 'admin',
  userRightsId: 2
})

const seedData = async () => {
  // Seed userRights data
  await Promise.all(
    userRights.map(async (ur) => {
      await prisma.userRights.create({
        data: ur
      })
    })
  )
  // Seed userRole data
  await Promise.all(
    userRole.map(async (ur) => {
      await prisma.userRole.create({
        data: ur
      })
    })
  )
  // Seed user data
  await Promise.all(
    user.map(async (u) => {
      await prisma.user.create({
        data: u
      })
    })
  )

  // Seed profile data
  await Promise.all(
    profile.map(async (p) => {
      await prisma.profile.create({
        data: p
      })
    })
  )
  // Seed category data
  await Promise.all(
    category.map(async (c) => {
      await prisma.category.create({
        data: c
      })
    })
  )
  // Seed forum data
  await Promise.all(
    forum.map(async (f) => {
      await prisma.forum.create({
        data: f
      })
    })
  )

  // Seed thread data
  await Promise.all(
    thread.map(async (t) => {
      await prisma.thread.create({
        data: t
      })
    })
  )

  // Seed comment data
  await Promise.all(
    comments.map(async (c) => {
      await prisma.comments.create({
        data: c
      })
    })
  )
}
seedData()
// module.exports = {
//   user,
//   userRole,
//   userRights,
//   profile,
//   forum,
//   thread,
//   comments,
//   category
// }

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const slugify = require('slugify')

async function hashPassword (password) {
  const pw = await new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err)
      } else {
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) {
            reject(err)
          } else {
            resolve(hash)
          }
        })
      }
    })
  })
  return pw
}

async function seed () {
  const mailBenoit = 'benoit@email.test'
  const password = await hashPassword('benoitPassword')
  await prisma.user.upsert({
    where: { email: mailBenoit },
    update: {},
    create: {
      email: mailBenoit,
      username: 'benoit',
      slug: 'benoit',
      userRole: {
        create: {
          name: 'admin',
          slug: 'admin',
          userRights: {
            create: {
              createThread: true,
              readThread: true,
              deleteOwnThread: true,
              editOwnThread: true,
              deleteThread: true,
              commentThread: true,
              deleteOwnComment: true,
              deleteComment: true,
              sendPrivateMessage: true,
              banUsers: true
            }
          }
        }
      },
      password

    }
  })

  const firstForum = 'Global'
  const firstForumSlug = slugify(firstForum)
  const firstCategory = 'General'
  const firstCategorySlug = slugify(firstCategory)

  await prisma.forum.upsert({
    where: { slug: firstForumSlug },
    update: {},
    create: {
      name: firstForum,
      slug: firstForumSlug,
      category: {
        create: {
          name: firstCategory,
          slug: firstCategorySlug
        }
      },
      Thread: {
        create: {
          title: 'Hello World',
          slug: 'hello-world',
          authorId: 1,
          categoryId: 1,
          Comments: {
            create: {
              content: 'Lorem Ipsum Dolor Sit Amet, this is the first thread created on the forum via Prisma seed',
              userId: 1,
              isOG: true,
              quotedMessage: {
                create: {
                  threadId: 1,
                  content: 'Lorem Ipsum Dolor Sit Amet, this is the first thread created on the forum via Prisma seed',
                  userId: 1,
                  isOG: false
                }
              }
            }
          }
        }
      }
    }
  })
}

async function seed2 () {
  const firstForum = 'Global'
  const firstForumSlug = slugify(firstForum)
  const firstCategory = 'General'
  const firstCategorySlug = slugify(firstCategory)

  await prisma.forum.upsert({
    where: { slug: firstForumSlug },
    update: {},
    create: {
      name: firstForum,
      slug: firstForumSlug,
      category: {
        create: {
          name: firstCategory,
          slug: firstCategorySlug
        }
      },
      Thread: {
        create: {
          title: 'Hello World',
          slug: 'hello-world',
          authorId: 1,
          categoryId: 1,
          Comments: {
            create: {
              content: 'Lorem Ipsum Dolor Sit Amet, this is the first thread created on the forum via Prisma seed',
              userId: 1
            }
          }
        }
      }
    }
  })
}

async function main () {
  await seed()
  await seed2()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

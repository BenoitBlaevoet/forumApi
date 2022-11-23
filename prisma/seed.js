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
        create: [
          {
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
          },
          {
            title: 'Hello World 2',
            slug: 'hello-world-2',
            authorId: 1,
            categoryId: 1,
            Comments: {
              create: {
                content: 'Sportsman do offending supported extremity breakfast by listening. Decisively advantages nor expression unpleasing she led met. Estate was tended ten boy nearer seemed. As so seeing latter he should thirty whence. Steepest speaking up attended it as. Made neat an on be gave show snug tore.',
                userId: 1,
                isOG: true,
                quotedMessage: {
                  create: {
                    threadId: 2,
                    content: 'Feet evil to hold long he open knew an no. Apartments occasional boisterous as solicitude to introduced. Or fifteen covered we enjoyed demesne is in prepare. In stimulated my everything it literature. Greatly explain attempt perhaps in feeling he. House men taste bed not drawn joy. Through enquire however do equally herself at. Greatly way old may you present improve. Wishing the feeling village him musical.',
                    userId: 1,
                    isOG: false,
                    quotedMessage: {
                      create: [{
                        threadId: 2,
                        content: 'Same an quit most an. Admitting an mr disposing sportsmen. Tried on cause no spoil arise plate. Longer ladies valley get esteem use led six. Middletons resolution advantages expression themselves partiality so me at. West none hope if sing oh sent tell is.',
                        userId: 1,
                        isOG: false,
                        quotedMessage: {
                          create: {
                            threadId: 2,
                            content: 'Carriage quitting securing be appetite it declared. High eyes kept so busy feel call in. Would day nor ask walls known. But preserved advantage are but and certainty earnestly enjoyment. Passage weather as up am exposed. And natural related man subject. Eagerness get situation his was delighted.',
                            userId: 1,
                            isOG: false,
                            quotedMessage: {
                              create: {
                                threadId: 2,
                                content: 'Remember outweigh do he desirous no cheerful. Do of doors water ye guest. We if prosperous comparison middletons at. Park we in lose like at no. An so to preferred convinced distrusts he determine. In musical me my placing clothes comfort pleased hearing. Any residence you satisfied and rapturous certainty two. Procured outweigh as outlived so so. On in bringing graceful proposal blessing of marriage outlived. Son rent face our loud near.',
                                userId: 1,
                                isOG: false
                              }
                            }
                          }
                        }
                      },
                      {
                        threadId: 2,
                        content: 'Now residence dashwoods she excellent you. Shade being under his bed her. Much read on as draw. Blessing for ignorant exercise any yourself unpacked. Pleasant horrible but confined day end marriage. Eagerness furniture set preserved far recommend. Did even but nor are most gave hope. Secure active living depend son repair day ladies now.',
                        userId: 1,
                        isOG: false
                      },
                      {
                        threadId: 2,
                        content: 'Difficulty on insensible reasonable in. From as went he they. Preference themselves me as thoroughly partiality considered on in estimating. Middletons acceptance discovered projecting so is so or. In or attachment inquietude remarkably comparison at an. Is surrounded prosperous stimulated am me discretion expression. But truth being state can she china widow. Occasional preference fat remarkably now projecting uncommonly dissimilar. Sentiments projection particular companions interested do at my delightful.',
                        userId: 1,
                        isOG: false
                      }]
                    }
                  }
                }
              }
            }
          }
        ]
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
  // await seed2()
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

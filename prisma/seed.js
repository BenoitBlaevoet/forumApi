const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')

async function hashPassword (password) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      throw err
    } else {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          throw err
        } else {
          return hash
        }
      })
    }
  })
}

async function seed ({ benoitpassword, dodopassword }) {
  const mailBenoit = 'benoit@email.test'
  const benoit = await prisma.user.upsert({
    where: { email: mailBenoit },
    update: {},
    create: {
      email: mailBenoit,
      name: 'benoit',
      password: 'passwordBenoit',
      posts: {
        create: [
          {
            title: 'Check out Prisma with Next.js',
            content: 'https://www.prisma.io/nextjs',
            published: true
          },
          {
            title: 'Benoit second Post',
            content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet.."',
            published: true
          },
          {
            title: 'Benoit third post',
            content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet.."',
            published: true
          },
          {
            title: 'Benoit fourth post',
            content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet.."',
            published: true
          }
        ]
      }
    }
  })
  const mailDodo = 'dodo@email.test'
  const dodo = await prisma.user.upsert({
    where: { email: mailDodo },
    update: {},
    create: {
      email: mailDodo,
      name: 'dodo',
      password: 'passwordDodo',
      posts: {
        create: [
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma',
            published: true
          },
          {
            title: 'Follow Nexus on Twitter',
            content: 'https://twitter.com/nexusgql',
            published: true
          }
        ]
      }
    }
  })
}

async function CreatePW () {
  const passwordBenoit = await hashPassword('benoit')
  const passwordDodo = await hashPassword('dodo')
  await passwordBenoit
  await passwordDodo
  console.log({ passwordBenoit, passwordDodo })
  return { passwordBenoit, passwordDodo }
}

async function main () {
  CreatePW()
    .then((password) => {
      seed(password)
      console.log(password)
    })
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

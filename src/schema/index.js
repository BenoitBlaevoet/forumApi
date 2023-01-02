const userSchema = {
  body: {
    type: 'object',
    properties: {
      id: { type: 'number' },
      username: { type: 'string' },
      slug: { type: 'string' },
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
      userRoleId: { type: 'number' },
      banned: { type: 'boolean' },
      desactivated: { type: 'boolean' }
    },
    required: []
  }
}

const postSchema = {
  body: {
    type: 'object',
    properties: {
      id: { type: 'number' },
      title: { type: 'string' },
      slug: { type: 'string' },
      content: { type: 'string' },
      authorId: { type: 'number' },
      categoryId: { type: 'number' },
      forumId: { type: 'number' }
    }
  }
}

module.exports = {
  userSchema,
  postSchema
}

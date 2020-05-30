const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
require('express-async-errors')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (request, response) => {
    logger.info('GET')
    const blogs = await Blog.find({})
        .populate('user', { userName: 1, name: 1 })

    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
    if (request.body.title === undefined || request.body.url === undefined ||
        request.body.title === '' || request.body.url === '' ) {
        return response.status(400).json({ error: 'Bad request' })
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = request.body.likes ? request.body : { ...request.body, user: user._id, likes: 0 }
    const blogToSubmit = new Blog(blog)

    await blogToSubmit.save()
    user.blogs = user.blogs.concat(blogToSubmit._id)
    await user.save()

    response.status(200).json(blogToSubmit.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === user.id) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        response.status(400).json({ error: 'User not allowed to delete blog from other user' })
    }

})

blogsRouter.put('/:id', async (request, response) => {
    const blog = {
        title: request.body.title,
        author: request.body.author,
        likes: request.body.likes,
        url: request.body.url
    }

    const resBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(resBlog.toJSON())
})


module.exports = blogsRouter
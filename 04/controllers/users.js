const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')
require('express-async-errors')

usersRouter.post('/', async (request, response) => {
    if (request.body.password.length < 3) {
        return response.status(400).json({ error: {
            name: 'ValidationError',
            message: 'Minimum length for password is 3.'
        } })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(request.body.password, saltRounds)

    const user = new User({
        userName: request.body.userName,
        name: request.body.name,
        passwordHash
    })

    const savedUser = await user.save()
    response.json(savedUser)
})

usersRouter.get('/', async (request, response ) => {
    const users = await User.find({}).populate('blogs', { title: 1, url: 1, id: 1, author: 1 })
    response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter
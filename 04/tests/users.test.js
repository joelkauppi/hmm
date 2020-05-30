const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const userHelper = require('../utils/user_helper')
const bcrypt = require('bcrypt')

describe('users', () => {
    const testDataFalse = {
        userName: 'test',
        name: 'test',
        password: 'te'
    }
    const testDataCorrect = {
        userName: 'testi',
        name: 'test',
        password: 'test'
    }
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('passw', 10)
        const user = new User({ userName: 'testi', passwordHash })

        await user.save()
    })

    test('User with invalid password added', async () => {
        const usersAtStart = await userHelper.usersInDb()
        const newUser = testDataFalse
        const res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(res.body.error.message).toContain('Minimum length for password is 3')

        const usersAtEnd = await userHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('User with non-unique name added', async () => {
        const usersAtStart = await userHelper.usersInDb()
        expect(usersAtStart).toHaveLength(1)
        const newUser1 = testDataCorrect

        const res2 = await api
            .post('/api/users')
            .send(newUser1)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(res2.body.error).toContain('expected `userName` to be unique')

        const usersAtEnd = await userHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    afterAll(() => {
        mongoose.connection.close()
    })

})
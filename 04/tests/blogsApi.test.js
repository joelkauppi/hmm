const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const initialBlogs = require('../utils/list_helper').initialBlogs
const credentials = { userName: 'testi', password: 'passw' }

fdescribe('blog testing', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(initialBlogs)
    })
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('passw', 10)
        const user = new User({ userName: 'testi', passwordHash })
        await user.save()

    })

    test('correct number of blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('id field in object', async() => {
        const response = await api.get('/api/blogs')
        for (let note of response.body) {
            expect(note.id).toBeDefined()
        }
    })

    test('adding blog', async() => {
        const newBlog ={
            title: 'Testing',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
            likes: 1,
        }
        const loggedInUser = await api.post('/api/login').send(credentials)
        const blogsBefore = await api.get('/api/blogs')
        await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + loggedInUser.body.token)
            .send(newBlog)

        const blogsAfter = await api.get('/api/blogs')
        expect(blogsAfter.body.length).toEqual(blogsBefore.body.length + 1)
    })

    test('likes set to 0', async () => {
        const newBlog = {
            title: 'Testing',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        }
        const loggedInUser = await api.post('/api/login').send(credentials)
        const response = await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + loggedInUser.body.token)
            .send(newBlog)
            .expect(200)

        expect(response.body.likes).toEqual(0)
    })

    test('invalid POST', async () => {
        const newBlog = {
            title: '',
            author: 'Robert C. Martin',
            url:'',
        }
        const loggedInUser = await api.post('/api/login').send(credentials)
        const response = await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + loggedInUser.body.token)
            .send(newBlog)
            .expect(400)

        expect(response.body.error).toEqual('Bad request')
    })

    test('delete blog', async () => {
        const newBlog = {
            title: 'Testing',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        }
        const loggedInUser = await api.post('/api/login').send(credentials)
        const res1 = await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + loggedInUser.body.token)
            .send(newBlog)
            .expect(200)

        const blogsBefore = await api.get('/api/blogs')
        const deleteId = res1.body.id
        await api
            .delete(`/api/blogs/${deleteId}`)
            .set('Authorization', 'Bearer ' + loggedInUser.body.token)
            .expect(204)

        const blogsAfter = await api.get('/api/blogs')
        expect(blogsAfter.body.length).toEqual(blogsBefore.body.length - 1)
    })

    test('edit post', async () => {
        const res1 = await api.get('/api/blogs')
        const blogToEdit = res1.body[0]
        blogToEdit.likes += 1
        await api
            .put(`/api/blogs/${blogToEdit.id}`)
            .send(blogToEdit)
            .expect(200)
        const res2 = await api.get('/api/blogs')
        expect(res2.body.filter(b => b.id === blogToEdit.id)[0].likes).toEqual(blogToEdit.likes)
    })

    test('Fail adding a blog when no when no token', async () => {
        const newBlog ={
            title: 'Testing',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
            likes: 1,
        }
        const loggedInUser = await api.post('/api/login').send({ userName: '2aaa', password: 'eee' })
        const blogsBefore = await api.get('/api/blogs')
        await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + loggedInUser.body.token)
            .send(newBlog)

        const blogsAfter = await api.get('/api/blogs')
        expect(blogsAfter.body.length).toEqual(blogsBefore.body.length)

    })
    afterAll(() => {
        mongoose.connection.close()
    })
})

const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
    }
    return (blogs.length === 0
        ? 0
        : blogs.map(b => b.likes).reduce(reducer, 0)
    )
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((a, b) => a.likes > b.likes ? a : b).likes
}

const mostBlogs = (blogs) => {
    if (blogs.length > 0) {
        const most = Object.entries(lodash.countBy(blogs, 'author')).reduce((a,b) => a > b ? a : b)
        const res = {
            author: most[0],
            blogs: most[1]
        }
        return res
    } else {
        const res =  {
            author: '',
            blogs: null
        }
        return res
    }

}

const mostLiked = (blogs) => {

    if (blogs.length > 0 ) {
        const first = lodash.groupBy(blogs, 'author')
        const most = Object.entries(lodash.mapValues(first, a =>  lodash.sumBy(a, b =>  b.likes)))
            .reduce((a,b) => a > b ? a : b)
        const res = {
            author: most[0],
            likes: most[1]
        }
        return res
    } else {
        const res = {
            author: '',
            likes: null
        }
        return res
    }
}

const initialBlogs =
    [
        {   _id: '5a422a851b54a676234d17f7',
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 7,
            __v: 0 },
        {   _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0 },
        {   _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0 },
        {   _id: '5a422b891b54a676234d17fa',
            title: 'First class tests',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
            likes: 10,
            __v: 0 },
        {   _id: '5a422ba71b54a676234d17fb',
            title: 'TDD harms architecture',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
            likes: 0,
            __v: 0
        }]


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLiked,
    initialBlogs
}
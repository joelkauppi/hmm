import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postBlog = async (blog) => {
  const user = window.localStorage.getItem('loggedBlogappUser')
  if (user) {
    token = 'Bearer ' + JSON.parse(user).token
  }
  const res = await axios.post(baseUrl, 
    blog, 
    {
      headers: {
        Authorization: token
      }
    })
  return res.data
}

const updateBlog = async (blog) => {
  const user = window.localStorage.getItem('loggedBlogappUser')
  if (user) {
    token = 'Bearer ' + JSON.parse(user).token
  } 
  const res = await axios.put(baseUrl + `/${blog.id}`, 
    blog, 
    {
      headers: {
        Authorization: token
      }
    }
  )
  return res.data
}

const removeBlog = (blog) => {
  const user = window.localStorage.getItem('loggedBlogappUser')
  if (user) {
    token = 'Bearer ' + JSON.parse(user).token
  }
  return axios.delete(baseUrl + `/${blog.id}`,
    {
      headers: {
        Authorization: token
      }
    }
  )
    .then(response => response.data)
    .catch((error) => {
      throw error.response.data
    })
 
}

export default { getAll, postBlog, updateBlog, removeBlog }
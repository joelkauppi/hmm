import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import PropTypes from 'prop-types'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: '', type: '' })

  useEffect(() => {
    
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    } 
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }

    return (
      <div className={type}>
        {message}
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        userName, password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user)) 
      setNotification({
        type: 'success',
        message: `Logged in user ${user.userName}`
      }
      )
      setTimeout(() => {
        setNotification({ type:null, message:null })
      }, 5000)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({
        type: 'error',
        message: 'Wrong username or password'
      }
      )
      setTimeout(() => {
        setNotification({ type:null, message:null })
      }, 5000)
    }
  }
  
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setNotification({
      type: 'success',
      message: 'Logged out successfully'
    }
    )
    setTimeout(() => {
      setNotification({ type:null, message:null })
    }, 5000)
  }
  
  const loginForm = () => (
    <Togglable buttonShowLabel='login' buttonHideLabel='cancel'>
      <LoginForm handleLogin={handleLogin}
        username={userName}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    </Togglable>
  )
  const blogFormRef = React.createRef()
  const blogForm = () => (
    <Togglable buttonShowLabel='New blog post' buttonHideLabel='Cancel' ref={blogFormRef}>
      <BlogForm 
        createBlog={createBlog}
      />
    </Togglable>
  )

  blogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
  }

  Togglable.propTypes = {
    buttonShowLabel: PropTypes.string.isRequired,
    buttonHideLabel: PropTypes.string.isRequired
  }

  const handleRemoveEvent = (blog) => {
    
    blogService.removeBlog(blog).then(response => {
      setBlogs(blogs.filter((b) => b.id !== blog.id).sort((a, b) => a.likes < b.likes ))
      setNotification({
        type: 'success',
        message: `Blog ${blog.title} removed`
      })
      setTimeout(() => {
        setNotification({ type:null, message:null })
      }, 5000)
    })
      .catch(error => {
        setNotification({
          type: 'error',
          message: error.error
        })
        setTimeout(() => {
          setNotification({ type:null, message:null })
        }, 5000)
      })
  }
  
  const handleLikeEvent = async (blog) => {
    const res = await blogService.updateBlog(blog)
    try {
      setBlogs(blogs.filter((b) => b.id !== blog.id).concat(res).sort((a, b) => a.likes < b.likes ))
      setNotification({
        type: 'success',
        message: `Updated blog. ${res.title} has now ${res.likes} likes`
      })
      setTimeout(() => {
        setNotification({ type:null, message:null })
      }, 5000)
      
    } catch (exception) {
      console.log('exception',exception)
      setNotification({
        type: 'error',
        message: 'Adding a blog post failed'
      })
      setTimeout(() => {
        setNotification({ type:null, message:null })
      }, 5000)
    }
  }

  const createBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    const submittedBlog = await blogService.postBlog(blog)
    try {
      setBlogs(blogs.concat(submittedBlog))
      setNotification({
        type: 'success',
        message: `Added blog ${submittedBlog.title}`
      })
      setTimeout(() => {
        setNotification({ type:null, message:null })
      }, 5000)
      
    } catch (exception) {
      console.log('exception',exception)
      setNotification({
        type: 'error',
        message: 'Adding a blog post failed'
      })
      setTimeout(() => {
        setNotification({ type:null, message:null })
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={notification.message} type={notification.type}></Notification>
        {loginForm()}
      </div>
    )
  }

  return (
    <div> 
      <Notification message={notification.message} type={notification.type}></Notification>
      <button onClick={handleLogout}>Log out</button>
      {blogForm()}
      <h2>blogs</h2>
      {blogs.sort((a, b) => a.likes < b.likes).map(blog =>
        <div className='blogi' key={blog.id}>
          <Blog key={blog.id}  blog={blog} 
            buttonShowLabel='Show details' 
            buttonHideLabel='Hide details' 
            addLike={handleLikeEvent}
            deleteBlog={handleRemoveEvent}/>
        </div>
      )}
      
    </div>
  )
}

export default App
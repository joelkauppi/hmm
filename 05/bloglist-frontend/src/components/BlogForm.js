import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setURL(event.target.value)
  }

  const postBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url
    }
    createBlog(blog)

    setTitle('')
    setAuthor('')
    setURL('') 
  }
  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={postBlog}>
        <div>
          title:
          <input type="text"
            value={title}
            name="Title"
            id="title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input type="text"
            value={author}
            name="Author"
            id="author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input type="text"
            value={url}
            id="url"
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <button id="create-blog" type="submit">Create</button>

      </form>
    </div>
  )
}

export default BlogForm

import React, { useState } from 'react'


const BlogDetail = ( {blog, addLike} ) => {
    console.log(blog)
    if (!blog) {  
        return null  
    }

    const handleLike = (event) => {
        event.preventDefault()
        const newBlog = {
          ...blog,
          likes: blog.likes + 1,
        }
        addLike(newBlog)
      }


  return(  
    <div>
        <h2>
          {blog.title} 
        </h2>
        <div>
          {blog.author} 
        </div>
        <div>
          {blog.likes}
          <button onClick={handleLike}>Like</button>
        </div>
        <div>
          {blog.url} 
        </div>
    </div>
  )
  
}

export default BlogDetail

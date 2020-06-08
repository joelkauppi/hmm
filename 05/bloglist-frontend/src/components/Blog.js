import React, { useState } from 'react'


const Blog = ( props ) => {

  const [visibleDetails, setVisibleDetails] = useState(false)

  const hideDetails = { display: visibleDetails ? 'none' : '' }
  const showDetails = { display: visibleDetails ? '' : 'none' }
  const showRemove = { display: props.blog.user ? '' : 'none' }

  const toggleVisibility = () => {
    setVisibleDetails(!visibleDetails)
  }

  const handleLike = (event) => {
    event.preventDefault()
    const blog = {
      ...props.blog,
      likes: props.blog.likes + 1,
    }
    props.addLike(blog)
  }
  
  const handleRemove = (event) => {
    event.preventDefault()
    if (window.confirm(`Are you sure you want to remove blog ${props.blog.title}`)) {
      props.deleteBlog(props.blog)
    }
    
  }

  return(  
    <div>
      <div style={hideDetails}>
        <div>
          {props.blog.title} {props.blog.author}
        </div>
        <button onClick={toggleVisibility}>{props.buttonShowLabel}</button>
      </div>
      <div style={showDetails}>
        <div>
          {props.blog.title} 
        </div>
        <div>
          {props.blog.author} 
        </div>
        <div>
          {props.blog.likes}
          <button onClick={handleLike}>Like</button>
        </div>
        <div>
          {props.blog.url} 
        </div>
        <div>
          <button onClick={handleRemove} style={showRemove}>Remove</button>
        </div>
        <button onClick={toggleVisibility}>{props.buttonHideLabel}</button>
      </div>
    </div>
  )
  
}

export default Blog

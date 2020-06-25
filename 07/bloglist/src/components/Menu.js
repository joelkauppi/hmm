import React from 'react'
import {
    Link
  } from "react-router-dom"

  
const Menu = () => {
    return(
        <div>
            <Link to="/">Home</Link>
            <Link to="/users">Users</Link>
            <Link to="/blogs">Blogs</Link>
        </div>
    )
}

export default Menu
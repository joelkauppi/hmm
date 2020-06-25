import React from 'react'
import {
    Link
  } from "react-router-dom"

const User = ( { user } ) => {

  return(  
    <div>
          <span>
          <Link to={`/users/${user.id}`}>
             {user.userName}
          </Link>
        </span> 
        <span>
            {user.name}
        </span>
        <span>
            {user.blogs.length} blogs written
        </span>
    </div>
    )
  
}

export default User
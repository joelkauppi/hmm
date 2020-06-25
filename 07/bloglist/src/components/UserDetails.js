import React from 'react'
import Blog from './Blog'

const UserDetails = ({ userDetail }) => {
        if (!userDetail) {  
            return null  
        }
        return(  
            <div>
                  <h3>
                  {userDetail.userName}
                </h3> 
                <h3>
                    {userDetail.name}
                </h3>
                <h4>User blogs: </h4>
                <ul>
                {userDetail.blogs.map(blog =>
                    <div className='blogi' key={blog.id}>
                    <li>
                        {blog.title}
                    </li>
                    </div>
                )}
                </ul>
                
            </div>
            )
    }
 
export default UserDetails

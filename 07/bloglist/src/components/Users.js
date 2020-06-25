import React, { useState } from 'react'
import User from './User'

const Users = ({ users }) => {
    return ( 
        <div>
            {users.map(user => 
                <div key={user.id}>
                    <User key={user.id} user={user}/>
                </div>
            
            )}
        </div>
    )
}

export default Users
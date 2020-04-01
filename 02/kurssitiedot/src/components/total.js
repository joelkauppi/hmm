import React from 'react'

const Total = ({parts}) => {
    const tot = parts.reduce ((a,b) => ({exercises: a.exercises + b.exercises}))
    return(
        <div>
            <b>Number of exercises {tot.exercises}</b>
        </div>
    )
}
export default Total
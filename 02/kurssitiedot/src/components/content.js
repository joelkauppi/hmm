import React from 'react'
import Part from './part'

const Content = (props) => {
    return (
        <div>
            {props.parts.map((part, i) => <Part key={i} part={part}/>)}
        </div>
    )
    
}
export default Content
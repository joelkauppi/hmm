import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnectode } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    const filterValue = useSelector(state => state.filter)
    const dispatch = useDispatch()
    
    const vote = (anecdote) => {
        dispatch(voteAnectode(anecdote))
        const message = `Voted anecdote ${anecdote.content}`
        dispatch(setNotification(message, 5))
        /**dispatch(showNotification(message))
        setTimeout(() => {
            dispatch(hideNotification())}, 5000
        )*/

    }
    return (
        <div>
            {anecdotes.filter(a => a.content.toUpperCase().includes(filterValue.toUpperCase())).sort((a, b) => a.votes < b.votes ? 1 : -1).map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )

}

export default AnecdoteList
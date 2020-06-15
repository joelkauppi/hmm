import React from 'react'
import { useDispatch, connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
const AnecdoteForm = (props) => {

     const dispatch = useDispatch()

     const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        const message = `Added anecdote ${content}`
        dispatch(setNotification(message, 5))
      }
     return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="anecdote"/>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
     )

}


const ConnectedForm = connect(null, {createAnecdote})(AnecdoteForm)

export default ConnectedForm

import anecdoteService from '../services/anecdotes'
import setNotification from './notificationReducer'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const addedVoteAnecdote = action.data
      
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : addedVoteAnecdote
      )
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export const voteAnectode = (anecdote) => {
  return async dispatch => {
    const res = await anecdoteService.addVote(anecdote)
    dispatch({
      type: 'VOTE',
      data: res
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const res = await anecdoteService.newAnecdote(content)    
    dispatch({
      type: 'NEW_ANECDOTE',
      data: res
    })
    
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
    
  }
}

const generateId = () =>
Number((Math.random() * 1000000).toFixed(0))


export default anecdoteReducer
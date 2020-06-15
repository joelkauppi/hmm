import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const newAnecdote = async (data) => {
    const object = {
        content: data,
        votes: 0
    }
    const res = await axios.post(baseUrl, object)
    return res.data
}

const addVote = async (anecdote) => {
    const object = {
        ...anecdote,
        votes: anecdote.votes + 1
    }
    const res = await axios.put(baseUrl + '/' + anecdote.id, object)
    return res.data
}



export default { getAll, newAnecdote, addVote }
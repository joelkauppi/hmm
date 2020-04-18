import axios from 'axios'
const baseUrl = '/api/persons'

const getPersons = () => {
    return (
        axios.get(baseUrl)
            .then(response => {
                return response.data
                })
    )
}

const addPerson = (newPerson) => {
    return(
    axios.post(baseUrl, newPerson) 
     .then((response) => {
                console.log('response', response)
                return response.data
            })
    )}


const deletePerson = (personId) => {
    return (
        axios.delete(`${baseUrl}/${personId}`)
            .then(response => {
                console.log(response)
                return response.data
            })
    )
}

const updatePerson = (id, newPerson) => {
    console.log('new person', id, newPerson)
    return (
        axios.put(`${baseUrl}/${id}`, newPerson)
            .then(response => {
                return response.data
            })
    )
}

export default {
    getPersons,
    addPerson,
    deletePerson,
    updatePerson
}
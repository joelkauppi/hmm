import React, { useState, useEffect } from 'react'
import personService from './services/puhelinluettelo'

const Persons = ({persons, filterValue, deletePerson, setPersons}) => {

  return (
    <div>
      <ul>
        {persons.filter(person => person.name.toUpperCase().includes(filterValue.toUpperCase()))
          .map(person => <li key={person.name}>
            <div>{person.name} {person.number}</div>
            <button onClick={() => deletePerson(person)}>Remove</button>
          </li>)}
          
      </ul>
     </div>
  )
}


const Form = ({newPerson, submitForm, handleNameChange, handleNumberChange}) => {
  return (
    <div>
      <form>
        <div>
          <div>Name: <input value={newPerson.name} onChange={handleNameChange}/></div>
          <div>Number <input value={newPerson.number} onChange={handleNumberChange}/></div>
        </div>
        <div>
          <button type="submit" onClick={submitForm}>add</button>
        </div>
      </form>
    </div>
  )
}

const Filter = ({newFilter, filterChange}) => {
  return(
    <div>
      Filter with <input value={newFilter} onChange={filterChange}/>
    </div>
  )
}

const Notification = ({message, type}) => {
  if (message === null) {
    return null
  }

  return(
    <div className={type}>
      {message}
    </div>
  )
}


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newPerson, setNewPerson ] = useState({name: '', number: ''})
  const [ newFilter, setNewFilterValue ] = useState('')
  const [ message, setSuccessMessage] = useState({type:true, message:null })

  const handleNameChange = (event) => setNewPerson({...newPerson, name: event.target.value})
  const handleNumberChange = (event) => setNewPerson({...newPerson, number: event.target.value})
  const handleDeleteTrigger = (person) => {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      personService.deletePerson(person.id)
      .then(response => {  
        setPersons(persons.filter(p => p.id !== person.id))
        setSuccessMessage({
          type: 'success',
          message: `${person.name} deleted successfully.`
        }
        )
        setTimeout(() => {
          setSuccessMessage({type:null, message:null})
        }, 5000)
      })
     
    }
    }
  
  

  useEffect (() => {
    personService
      .getPersons()
        .then(persons => {
          setPersons(persons)
        })
  }, [])
    

  const handleFilterChange = (event) => {
    setNewFilterValue(event.target.value)
    setPersons(persons)
  }

  const addPerson = (event) => {
    event.preventDefault()
    
    if (!persons.map(p => p.name).includes(newPerson.name)) { 
      personService.addPerson(newPerson)
        .then(response => {
          console.log("response", response)
            setPersons(persons.concat({name: response.name, number: response.number}))
            setNewPerson({name: '', number: ''})
            setSuccessMessage(
              {
                type: 'success',
                message:`${response.name} added.`
              }
            )
          setTimeout(() => {
            setSuccessMessage({type:null, message:null})
          }, 5000)
        })
      .catch(error => {
        setSuccessMessage(
          {
            type: 'error',
            message: `${error.response.data.error}`
          }
        )
        setTimeout(() => {
          setSuccessMessage({type:null, message:null})
        }, 5000)
        })
        
    }
    else {
      if(window.confirm(`Are you sure you want to change number for ${newPerson.name}?`)) {
        const id = persons.find(person => person.name === newPerson.name).id
        personService.updatePerson(id, newPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== id ? person : response))
            setSuccessMessage(
              {
                type: 'success',
                message: `Number changed to ${newPerson.number}`
              }
              
            )
            setTimeout(() => {
              setSuccessMessage(
                {type:null, message:null }
                )
            }, 5000)
            setNewPerson({name: '', number: ''})
        })
        .catch(error => {
          setSuccessMessage(
            {
              type: 'error',
              message: `${error.response.data.error}`
            }
          )
          setTimeout(() => {
            setSuccessMessage({type:null, message:null})
          }, 5000)
          })
      }
      
    }
    
  }

 
  return (
    <div>
      <h2>Phonebook</h2>      
      <Notification message={message.message} type={message.type}/>
      <Filter filterChange={handleFilterChange} newFilter={newFilter}/>
      <h3>Add new</h3>
      <Form newPerson={newPerson} submitForm={addPerson} 
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} 
        filterValue={newFilter} deletePerson={handleDeleteTrigger}/>
    </div>
  )

}

export default App
require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server runnin on port ${PORT}`)
})


//app.use(morgan('tiny'))
morgan.token('data', function(req, res) {
    if (req.method === 'POST') {
        return `- request body: ${JSON.stringify(req.body)}`
    } else {
        return ''
    }
	
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))



app.get('/', (req, res) => {
    res.send('<h1>hello</h1>')
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(ps => {
        res.json(ps.map(p => p.toJSON()))
    })
})

app.get('/info', (req, res) => {
    console.log(Person.find({}).count())
    Person.count({}).then(numDocs => 
        res.send(`<div>Phonebook has info for ${numDocs} people</div><div>${Date()}</div>`))
    
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            console.log('person', person)

            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))

})

app.post('/api/persons', (req, res, next) => {
    const body = req.body
    if(!body.name || !body.number) {
        if(!body.name) {
            return res.status(400).json({
                error:'Missing name.'
            })
        } if (!body.number ){
            return res.status(400).json({
                error:'Missing number.'
            })
        }
        
    }
    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
        res.json(savedPerson.toJSON())
        })
        .catch(error => next(error))
    
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id).then(result => {
        res.status(204).end()
    })
    .catch(error => next(error))

})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    const person = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(req.params.id, person, {new: true})
        .then(updatedPerson => {
            res.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
      console.log(error)
      return response.status(400).json({error: error.message})
  }

  next(error)
}

app.use(errorHandler)
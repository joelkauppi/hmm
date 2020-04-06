const express = require('express')
var morgan = require('morgan')
const cors = require('cors')



const app = express()
app.use(cors())
app.use(express.json())
//app.use(morgan('tiny'))
morgan.token('data', function(req, res) {
    if (req.method === 'POST') {
        return `- request body: ${JSON.stringify(req.body)}`
    } else {
        return ''
    }
	
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let persons = [
    {
    "name": "Paavo",
    "number": "32423432432",
    "id": 1
    },
    {
    "name": "Pekka",
    "number": "32432432432",
    "id": 2
    },
    {
    "name": "Jukka",
    "number": "34234345",
    "id": 3
    },
    {
    "name": "Pentti",
    "number": "22456346456",
    "id": 4
    }
]

app.get('/', (req, res) => {
    res.send('<h1>hello</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(`<div>Phonebook has info for ${persons.length} people</div><div>${Date()}</div>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => persons.find(p => p.id === id))
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.post('/api/persons', (req, res) => {
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
    if (persons.map(p => p.name).includes(body.name)) {
        return res.status(400).json({
            error:'Person name must be unique'
        })
    }
    const id = Math.floor(Math.random()*100000000000)
    const newPerson = {
        name: body.name,
        number: body.number,
        id: id
    }

    
    persons = persons.concat(newPerson)
    res.json(newPerson)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server runnin on port ${PORT}`)
})
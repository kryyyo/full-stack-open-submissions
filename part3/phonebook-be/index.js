const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const getDateTimeNow = () => {
  const timestamp = Date.now();
  const date = new Date(timestamp);
  return date.toString();
}

const generateRandomId = () => {
  const min = Math.ceil(5); // first n+1 from our data
  const max = Math.floor(2147483647); // max integer
  return Math.floor(Math.random() * (max - min + 1) + min); // inclusive
}

app.get('/api/persons', (req, res) => res.json(persons))

app.get('/info', (req, res) => {
  const html = `<p>Phonebook has info for ${persons.length} people</p>
                <p>${getDateTimeNow()}</p>`
  res.send(html);
})

app.get('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const person = persons.find(person => person.id === id);

  if (person) res.json(person);
  else {
    res.statusMessage = 'No person found for that id!'
    res.status(404).end();
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end();
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  const hasNameAndNumber = body.name && body.number;
  const existingPerson = persons.find(person => person.name === body.name);

  if (!hasNameAndNumber) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  if (existingPerson) {
    return res.status(409).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: generateRandomId(),
    name: body.name,
    number: body.number,
  }

  persons = [...persons, person];

  res.json(persons);
})


const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
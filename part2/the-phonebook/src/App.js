import { useEffect, useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchVal, setSearchVal] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([]); 

  useEffect(() => {
    const trimmedSearch = searchVal.trim();

    if (trimmedSearch !== '') {
      const filtered = persons.filter(person => person.name.toLowerCase().includes(trimmedSearch));
      setFilteredPersons(filtered);
    } else {
      setFilteredPersons(persons);
    }
  }, [searchVal])

  const addPerson = (e) => {
    e.preventDefault();
    const trimmedName = newName.trim();
    const trimmedPhone = newPhone.trim();

    const hasExisting = persons.some(person => person.name === trimmedName);
    if (hasExisting) {
      alert(`${trimmedName} is already added to the phonebook`);
      setNewName(trimmedName);
      setNewPhone(trimmedPhone);
    } else {
      if (trimmedName !== '') {
        setPersons([...persons, { id: persons.length + 1, name: trimmedName, phone: trimmedPhone }]);
      }
      setNewName('');
      setNewPhone('');
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={searchVal} onChange={(e) => setSearchVal(e.target.value)}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map(person => <div key={person.id}>{person.name} {person.phone}</div>)}
    </div>
  )
}

export default App
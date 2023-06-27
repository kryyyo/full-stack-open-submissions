import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

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
    const trimmedSearch = searchVal.toLowerCase().trim();

    if (trimmedSearch !== '') {
      const filtered = persons.filter(person => person.name.toLowerCase().includes(trimmedSearch));
      setFilteredPersons(filtered);
    } else {
      setFilteredPersons(persons);
    }
  }, [persons, searchVal])

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

  const handleSearch = (e) => setSearchVal(e.target.value);
  const handleInputName = (e) => setNewName(e.target.value);
  const handleInputPhone = (e) => setNewPhone(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchVal={searchVal}
        handleSearch={handleSearch}
      />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newPhone={newPhone}
        handleInputName={handleInputName}
        handleInputPhone={handleInputPhone}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App
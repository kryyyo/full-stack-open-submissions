import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personSrvc from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchVal, setSearchVal] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    personSrvc
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

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

    const newPerson = { name: trimmedName, number: trimmedPhone };

    const hasExisting = persons.some(person => person.name === trimmedName);
    if (hasExisting) {
      alert(`${newPerson.name} is already added to the phonebook`);
      setNewName(newPerson.name);
      setNewPhone(newPerson.number);
    } else {
      if (trimmedName !== '') {
        personSrvc
          .create(newPerson)
          .then(added => setPersons([...persons, added]))
      }
      setNewName('');
      setNewPhone('');
    }
  };

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personSrvc
        .del(person.id)
        .then(deleted => setPersons(persons.filter(curr => curr.id !== person.id)))
    }
  }

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
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
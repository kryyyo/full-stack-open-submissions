import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import './index.css'
import personSrvc from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchVal, setSearchVal] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState(null);

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

    const existingPerson = persons.find(person => person.name === trimmedName);
    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
        personSrvc
          .update(existingPerson.id, newPerson)
          .then(updated => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : updated))
            setMessage(`Updated ${updated.name}`)
            setSeverity('success')
          })
          .catch(error => {
            setMessage(`Failed to update ${existingPerson.name}`)
            setSeverity('error')
          })
          .finally(() => setTimeout(() => {
            setMessage(null)
            setSeverity(null)
          }, 3000))
      } else {
        // trim the current input
        setNewName(newPerson.name);
        setNewPhone(newPerson.number);
      }
    } else {
      if (trimmedName !== '') {
        personSrvc
          .create(newPerson)
          .then(added => {
            setPersons([...persons, added])
            setMessage(`Added ${added.name}`)
            setSeverity('success')
          })
          .catch(error => {
            setMessage(`Failed to add ${newPerson.name}`)
            setSeverity('error')
          })
          .finally(() => setTimeout(() => {
            setMessage(null)
            setSeverity(null)
          }, 3000))
      }
      setNewName('');
      setNewPhone('');
    }
  };

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personSrvc
        .del(person.id)
        .then(deleted => {
          setPersons(persons.filter(curr => curr.id !== person.id))
          setMessage(`Deleted ${person.name}`)
          setSeverity('success')
        })
        .catch(error => {
          setPersons(persons.filter(curr => curr.id !== person.id))
          setMessage(`Information of ${person.name} has already been deleted`)
          setSeverity('error')
        })
        .finally(() => setTimeout(() => {
          setMessage(null)
          setSeverity(null)
        }, 3000))
    }
  }

  const handleSearch = (e) => setSearchVal(e.target.value);
  const handleInputName = (e) => setNewName(e.target.value);
  const handleInputPhone = (e) => setNewPhone(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} severity={severity} />

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
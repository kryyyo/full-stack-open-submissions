const Persons = ({ filteredPersons }) => {
  return (
    <>
      {filteredPersons.map(person => <div key={person.id}>{person.name} {person.phone}</div>)}
    </>
  )
}

export default Persons;
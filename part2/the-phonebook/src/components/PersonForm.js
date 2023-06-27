const PersonForm = ({ newName, newPhone, handleInputName, handleInputPhone, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleInputName} />
      </div>
      <div>
        number: <input value={newPhone} onChange={handleInputPhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;
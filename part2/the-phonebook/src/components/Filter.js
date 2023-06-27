const Filter = ({ searchVal, handleSearch }) => {
  return (
    <div>
      filter shown with <input value={searchVal} onChange={handleSearch} />
    </div>
  )
}

export default Filter;
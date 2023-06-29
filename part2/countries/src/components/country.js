const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital.length ? country.capital.join(',') : null}</div>
      <div>area {country.area}</div>

      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>

      <img alt={country.flags.alt} src={country.flags.png} />
    </div>
  )
}

export default Country;
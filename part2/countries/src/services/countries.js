import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then(response => response.data)
}

const getName = name => {
  const request = axios.get(`${baseUrl}/name/${name}`)
  return request.then(response => response.data)
}

const countriesSrvc = { getAll, getName };

export default countriesSrvc;
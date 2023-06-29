import Country from "./country";
import { useState } from "react";

const CountryRow = ({ country }) => {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  return (
    <div>
      {country.name.common}
      <button onClick={toggleShow}>show</button>
      {show && <Country country={country} />}
    </div>
  )
}

export default CountryRow
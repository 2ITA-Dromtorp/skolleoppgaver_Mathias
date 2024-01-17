import { useState } from "react";
import axios from "axios";
import './table_style.css';

export default function Insert() {
  const [elev, setElev] = useState({})
  const save = event => {
    console.debug("Save called");    
    event.preventDefault();

    axios
    .post("http://localhost:3001", elev)
    .then(response => {
      console.log("Ny elev lagret", response)
    })
    .catch(error => {
      console.log(error);
      event.preventDefault();
    });
  };

  const handleChange = event => {
    setElev({
      ...elev,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form onSubmit={save}>
      <label>
        Fornavn:
        <input type="text" name="Fornavn" onChange={handleChange} />
        {elev.Fornavn}
      </label>
      <br />
      <label>
        Etternavn:
        <input type="text" name="Etternavn" onChange={handleChange} />
        {elev.Etternavn}
      </label>
      <br />
      <label>
        DatamaskinID:
        <input type="text" name="DatamaskinID" onChange={handleChange} />
        {elev.DatamaskinID}
        </label>
      <br />
      <label>
        Hobby:
        <input type="text" name="Hobby" onChange={handleChange} />
        {elev.Hobby}
        </label>
      <br />
      <label>
        Klasse:
        <input type="text" name="Klasse" onChange={handleChange} />
        {elev.Klasse}
        </label>
      <br />
      <label>
        Kjønn:
        <input type="text" name="Kjonn" onChange={handleChange} />
        {elev.Kjonn}
        </label>
      <br />

      <input type="submit" value="Save" />
    </form>
  );
}

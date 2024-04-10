import { useState } from "react";
import axios from "axios";
import './table_style.css'; // Du har en stilarkfil her, så det ser ut til at du har CSS-stiler for tabellen din

export default function Insert() {
  const [elev, setElev] = useState({}); // State for å lagre elevdataene fra skjemaet

  // Funksjon for å lagre elevdataene ved innsending av skjemaet
  const save = event => {
    event.preventDefault(); // Forhindrer standardoppførselen til skjemaet (sideomlasting)

    axios
      .post("http://localhost:3001", elev) // Sender POST-forespørsel til backend-serveren med elevdataene
      .then(response => {
        console.log("Ny elev lagret", response.data); // Logger responsen fra serveren
      })
      .catch(error => {
        console.log(error); // Logger eventuelle feil som oppstår underveis
      });
  };

  // Funksjon for å oppdatere state når inputverdiene endres
  const handleChange = event => {
    setElev({
      ...elev,
      [event.target.name]: event.target.value
    });
  };

  // Returnerer et skjema for å legge til en ny elev
  return (
    <form onSubmit={save}>
      <label>
        Fornavn:
        <input type="text" name="Fornavn" onChange={handleChange} />
      </label>
      <br />
      <label>
        Etternavn:
        <input type="text" name="Etternavn" onChange={handleChange} />
      </label>
      <br />
      <label>
        DatamaskinID:
        <input type="text" name="DatamaskinID" onChange={handleChange} />
      </label>
      <br />
      <label>
        Hobby:
        <input type="text" name="Hobby" onChange={handleChange} />
      </label>
      <br />
      <label>
        Klasse:
        <input type="text" name="Klasse" onChange={handleChange} />
      </label>
      <br />
      <label>
        Kjønn:
        <input type="text" name="Kjonn" onChange={handleChange} />
      </label>
      <br />

      <input type="submit" value="Lagre" /> {/* Knapp for å sende skjemaet */}
    </form>
  );
}

import React, { useState } from 'react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    brukernavn: '',
    passord: '',
    navn: '',
    klasse: '',
    pårørende: '',
    telefonnummer: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          brukernavn: formData.brukernavn,
          passord: formData.passord,
          navn: formData.navn,
          klasse: formData.klasse,
          pårørende: formData.pårørende,
          telefonnummer: formData.telefonnummer
        })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="brukernavn" placeholder="brukernavn" value={formData.brukernavn} onChange={handleChange} />
      <input type="password" name="passord" placeholder="passord" value={formData.passord} onChange={handleChange} />
      <input type="text" name="navn" placeholder="Name" value={formData.navn} onChange={handleChange} />
      <input type="text" name="klasse" placeholder="klasse" value={formData.klasse} onChange={handleChange} />
      <input type="text" name="pårørende" placeholder="pårørende" value={formData.pårørende} onChange={handleChange} />
      <input type="text" name="telefonnummer" placeholder="telefonnummer" value={formData.telefonnummer} onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;

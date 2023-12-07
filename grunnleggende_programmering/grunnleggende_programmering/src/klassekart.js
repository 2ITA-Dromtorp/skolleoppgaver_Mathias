import React, { useState } from 'react';
import Elev from './Elev';

const initialStudentNames = ["Martin", "Mathias", "Kevin", "Andreas", "Falk","Ylva", "Vanessa", "Chen", "Fridtjof", "Luz"];

export default function Klassekart() {
  const [studentNames, setStudentNames] = useState(initialStudentNames);

  const shuffleStudents = () => {
    const shuffledNames = [...initialStudentNames].sort(() => Math.random() - 0.5);
    setStudentNames(shuffledNames);
  };

  return (
    <div className='container'>
      <div className='teacher'>
        <Elev name="Lærer" />
      </div>
      <div className='forste_rad'>
        {studentNames.slice(0, 4).map((name, index) => (
          <Elev key={index} name={name} />
        ))}
      </div>
      <div className='andre_rad'>
        {studentNames.slice(4, 9).map((name, index) => (
          <Elev key={index} name={name} />
        ))}
      </div>
      <div className='tredje_rad'>
        {studentNames.slice(9).map((name, index) => (
          <Elev key={index} name={name} />
        ))}
        <button onClick={shuffleStudents}>Shuffle Positions</button>
      </div>
    </div>
  );
}

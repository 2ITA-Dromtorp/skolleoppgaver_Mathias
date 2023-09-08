import arrowup from './images/arrow_up.png';
import arrowdown from './images/arrow_down.png';
import { useState } from 'react';

// En komponent som heter Pil. Den eksporteres.
export default function Pil() {

    const [count, setCount] = useState(5);

    return (

        <div className='box'>
            <button type="button"> <img src={arrowup} alt="arrow up" /></button>
            <p> {count} </p>
            <button type="button"> <img src={arrowdown} alt="arrow down"/> </button>
        </div>
    )

}

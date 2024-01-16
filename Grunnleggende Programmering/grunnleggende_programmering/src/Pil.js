import arrowup from './images/arrow_up.png';
import arrowdown from './images/arrow_down.png';
import { useState } from 'react';

// En komponent som heter Pil. Den eksporteres.
export default function Pil() {

    const [count, setCount] = useState(5);

    function countUp() {
        console.log('count up')
        setCount(count + 1)
    }

    function countDown() {
        console.log('count down')
        setCount(count + 1)
    }

    return (

        <div className='box'>
            <button type="button" onClick={countUp}> <img src={arrowup} alt="arrow up" /></button>
            <p> {count} </p>
            <button type="button" onClick={countDown}> <img src={arrowdown} alt="arrow down"/> </button>
        </div>
    )

}

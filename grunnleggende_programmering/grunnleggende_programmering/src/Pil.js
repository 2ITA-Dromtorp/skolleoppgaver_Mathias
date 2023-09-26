import React, { useState } from 'react';
import arrowup from './images/arrow_up.png';
import arrowdown from './images/arrow_down.png';


export default function Pil() {
    const [count, setCount] = useState(5);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleIncrement10= () => {
        setCount(count + 10);
    };

    const handleDecrement = () => {
        setCount(count - 1);
    };

    const handleReset = () => {
        setCount(0);
    };

}

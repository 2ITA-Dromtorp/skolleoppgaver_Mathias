import { useState } from "react";

export default function Klokke() {


    let time = new Date();
    let timeString = time.toTimeString();

    const [curentTime, setCurentTime] = useState (new Date)

    setInterval(() => {
        console.log ('utvikeling er *** ')
        setCurentTime(new Date);
    }, 1000);

    return (
        <>
            <h1> digital Klokke</h1>
            <h2> {timeString} </h2>
        </>
    )
}
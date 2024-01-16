
import { useState, useEffect } from "react";


export default function Klokke() {

    const [currentTime, setCurrentTime] = useState(new Date)


    useEffect(() => {

    const myInterval = setInterval(() => {
            setCurrentTime(new Date);
        }, 1000);

        return () => clearInterval(myInterval);
    })
    


    return (
        <>
            <h1> Digital klokke </h1>
            <h2> {currentTime.toTimeString()} </h2>
        </>
    )
}
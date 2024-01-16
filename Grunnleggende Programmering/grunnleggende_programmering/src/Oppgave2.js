import { useState } from 'react';

function DeloppgaveA() {

    return (
        <div className="deloppgave">
            <h2> Deloppgave a</h2>
            <p> Hva skriver du i javascript dersom du vil gi variabelen test verdien 8? Hvilken datatype er dette? </p>
            <p> Svar: let test = 8 </p>
            <p> Svar: Se console loggen nå {console.log(typeof(8))} </p>
        </div>
    )
}

function DeloppgaveB() {

    // Vi skal lage funksjon som regner ut areal av en trekant og et rektangel.

    let lengde = 8;
    let bredde = 8;

    return (
        <>
            <h1> DeloppgaveB: </h1>
            <h2> Arealet av et rektangel: {lengde * bredde} </h2>
            <h2> Arealet av et trekant: {(lengde * bredde)/2} </h2>

        </>
    )
}

function DeloppgaveC() {

    const [bredde, setBredde] = useState(5)
    const [lengde, setLengde] = useState(10)


    function updateBredde(event) {
        console.log('update field');
        console.log(event.target.value);
        setBredde(event.target.value);
    }

    function updateLengde(event) {
        console.log('update field');
        console.log(event.target.value);
        setLengde(event.target.value);
    }

    return (
        <>
            <h1> Deloppgave C. </h1>
            <h2> Areal av en trekant:  </h2>
            <input type="number" value={bredde} onChange={updateBredde}/>
            <input type="number" value={lengde} onChange={updateLengde}/>

            <h3> Arealet for rektangel: {bredde * lengde} </h3>
            <h3> Arealet for trekant: {(bredde * lengde)/2} </h3>
        </>
    )
}

function Oppgave2() {

    return (
        <>
            <h1> Dette er oppgave 1 </h1>
            <DeloppgaveA />
            <DeloppgaveB />
            <DeloppgaveC />
        </>
    )

}

export default Oppgave2;
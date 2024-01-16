import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import profileIMG from './images/profile-image.jpg'
import json from './profiles'
import { useState, useEffect } from 'react'

export default function Profile() {

    const { profile } = useParams();
    const navigate = useNavigate();
    console.log(profile);


    const [student, setStudent] = useState({});

useEffect(() => {

    json.elever.map((elev) => {
        if (profile == elev.navn) {
            setStudent(elev)
        }
    })
    
}, [])
    

    return (
        <>
            <div className="profile">
                <div className="profilecard">
                    <h1> {profile} </h1>
                    <img src={profileIMG}></img>
                        <p>Klasse: {student.klasse}</p>
                        <p>E-mail: {student.email}</p>
                        <p>Tlf.: {student.tlf}</p>
                    <button onClick={() => navigate("/")}>Til hovedmeny</button>
                </div>
            </div>
        </>
    )
}
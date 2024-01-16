import { useNavigate } from "react-router-dom";

export default function Elev(props) {

    const navigate = useNavigate()

    let name = props.name;
    console.log(name);

    function handleClick() {
        navigate(name)
    }

    return (

        <div onClick={handleClick} className='person'>
          {name}
        </div>
        
    )
} 
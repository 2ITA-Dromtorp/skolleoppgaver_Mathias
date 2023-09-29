export default function Elev(props) {

let name = props.name
console.log(name);


    return (

        <div className='person'>
            {name}
        </div>

    )
}
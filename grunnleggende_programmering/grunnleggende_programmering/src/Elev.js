export default function Elev(props) {
    const names = ["Martin", "Mathias", "Kevin", "Andreas", "Falk","Sander","Ylva","Vanessa","Chen","Fridtjof","Luz" ];
    const randomName = names[Math.floor(Math.random() * names.length)];
    
  
    function handleClick() {
      console.log('Elev clicked');
    }
  
    return (
      <div onClick={handleClick} className='person'>
        {randomName}
      </div>
    );
  }
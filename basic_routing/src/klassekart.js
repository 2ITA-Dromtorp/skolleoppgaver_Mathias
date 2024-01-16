import Elev from './Elev';

export default function Klassekart() {

    return (
        <div className='container'>

      <div className='learer'>

        <Elev name="Lærer"/>

      </div>
      
      <div className='forste_rad'>

      <Elev name="Martin"/>
      <Elev name="Mathias"/>
      <Elev name="Kevin"/>
      <Elev name="Andreas"/>

      </div>

      <div className='andre_rad'>

      <Elev name="Falk"/>
      <Elev name="Sander"/>
      <Elev name="Ylva"/>
      <Elev name="Vanessa"/>
      <Elev name="Chen"/>

      </div>

      <div className='tredje_rad'>

      <Elev name="Fridtjof"/>
      <Elev name="Luz"/>
        
      </div>



    </div>
    )
}
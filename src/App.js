import ColdWeather from './Assets/ColdWeather.jpg'
import HotWeather from './Assets/HotWeather.jpg'
import CloudyDay from './Assets/CloudyDay.png'
import Descriptions from './Components/Descriptions';
import {RiFahrenheitLine ,RiCelsiusLine} from 'react-icons/ri';
import {WiDegrees} from 'react-icons/wi'
import { getFormattedWeatherData } from './Components/weatherService';
import { useEffect } from 'react';
import { useState } from 'react';
function App() {
  const[city,setCity]=useState('Pairs')
  const [weather,setWeather]=useState(null);
  const [units,setUnits]=useState('metric');
  const [bg,setBg]=useState(HotWeather)
  useEffect(()=>{
    const fetchWeatherData=async()=>{
    const data=await getFormattedWeatherData(city,units);
    setWeather(data);

    const threshold=units==='metric'?20:60;
    if(data.temp<=threshold)setBg(ColdWeather)
    else setBg(HotWeather)
    }
    fetchWeatherData();
  },[units,city])
  const handleUnitsClick=(e)=>{
    const button=e.currentTarget;
    const currentUnit=button.innerText.slice(0);

    const isCelsius=currentUnit==='C';
    button.innerText=isCelsius?'F':'C';
    setUnits(isCelsius ? 'metric':'imperial')
    console.log(currentUnit);

  }

  const enterKeyPressed=(e)=>{
    if(e.keyCode===13){
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  }
  return (
    <div className='App' style={{backgroundImage:`url(${bg})`}}>
      <div className='overlay'>
          {
            weather && (
              <div className='container'>
              <div className='section section__inputs'>
                <input onKeyDown={enterKeyPressed} type='text' name='city' placeholder='Enter City...'/>
                <button onClick={(e)=>handleUnitsClick(e)}><WiDegrees style={{strokewidth: '2'}}/>F</button>
              </div>
              <div className='section section__temperature'>
                <div className='icon'>
                  <h3>{`${weather.name},${weather.country}`}</h3>
                  <img src={weather.iconUrl} alt='weatherIcon'/>
                  <h3>{weather.description}</h3>
                </div>
                <div className='temperature'>
                  <h3>{`${weather.temp.toFixed()} `}{<WiDegrees style={{strokewidth: '2'}}/>}{`${units==='metric'? 
                  'C':'F'}`}
                  </h3>
                </div>
              </div>
    
              {/* bottom description  */}
              <Descriptions weather={weather} units={units}/>
            </div>
            )
          }
          
        
       
      </div>

    </div>
  );
}

export default App;

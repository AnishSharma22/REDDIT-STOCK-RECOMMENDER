import React from 'react';
import axios from 'axios'; 
import '../assets/slider.css'


const Slider = ({ setStockData }) => { // Destructure setStockData from props

  const backend_url = process.env.REACT_APP_BACKEND_URL || localhost;

  const fetchData = async (timeFrame) => {
    try {
      const dataRec = await axios.get(`http://${backend_url}:3000/backend/api?timeFrame=${timeFrame}`);
      // Handle the received data here, e.g., set it to state or perform actions
      console.log(dataRec);
      setStockData(dataRec.data); // Assuming the data to set is in dataRec.data
    } catch (error) {
      // Handle errors here
      console.error(error);
    }
  };

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>

      <button onClick={() => fetchData('daily')} className=' button hover:bg-customColor hover:underline'> Day</button>
      <button onClick={() => fetchData('weekly')} className=' button hover:bg-customColor hover:underline'> Week</button>
      <button onClick={() => fetchData('monthly')} className=' button hover:bg-customColor hover:underline'> Month</button>
      <button onClick={() => fetchData('yearly')} className=' button hover:bg-customColor hover:underline'> Year</button>
    </div>
  );
};

export default Slider;

import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import axios from 'axios'; 
import './slider.css'


const Slider = ({ setStockData }) => { // Destructure setStockData from props
  const fetchData = async (timeFrame) => {
    try {
      const dataRec = await axios.get(`http://localhost:3000/backend/api?timeFrame=${timeFrame}`);
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
      {/* <ButtonGroup  size="large" variant="outlined">
        <Button onClick={() => fetchData('daily')}>Day</Button>
        <Button onClick={() => fetchData('weekly')}>Week</Button>
        <Button onClick={() => fetchData('monthly')}>Month</Button>
        <Button onClick={() => fetchData('yearly')}>Year</Button>
        
      </ButtonGroup> */}

      <button onClick={() => fetchData('daily')} className=' button hover:bg-customColor hover:underline'> Day</button>
      <button onClick={() => fetchData('weekly')} className=' button hover:bg-customColor hover:underline'> Week</button>
      <button onClick={() => fetchData('monthly')} className=' button hover:bg-customColor hover:underline'> Month</button>
      <button onClick={() => fetchData('yearly')} className=' button hover:bg-customColor hover:underline'> Year</button>
    </div>
  );
};

export default Slider;

import React, { useEffect } from 'react';
import axios from 'axios'; 
import "../App.css";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { buttonState, stockDataState } from '../store/atoms';


const Slider = () => { 

  const backend_url = import.meta.env.VITE_APP_BACKEND_URL || 'localhost:3000';
  const setClicked = useSetRecoilState(buttonState);
  const [clicked] = useRecoilState(buttonState);
  const setStockData = useSetRecoilState(stockDataState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRec = await axios.get(`https://${backend_url}/backend/api?timeFrame=daily`);
        console.log(dataRec);
        setStockData(dataRec.data); 
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData(); // Call the fetchData function to initiate the data retrieval
  
  }, []);



  const fetchData = async (timeFrame) => {
    try {
      const dataRec = await axios.get(`https://${backend_url}/backend/api?timeFrame=${timeFrame}`);
      console.log(dataRec);
      setStockData(dataRec.data); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
        <div className="container w-auto">
      <button
        className={`button${clicked === 'daily' ? ' clicked-button' : ''}`}
        onClick={() => {
          fetchData('daily');
          setClicked('daily');
        }}
      >
        Day
      </button>
      <button
        className={`button${clicked === 'weekly' ? ' clicked-button' : ''}`}
        onClick={() => {
          fetchData('weekly');
          setClicked('weekly');
        }}
      >
        Week
      </button>
      <button
        className={`button${clicked === 'monthly' ? ' clicked-button' : ''}`}
        onClick={() => {
          fetchData('monthly');
          setClicked('monthly');
        }}
      >
        Month
      </button>
      <button
        className={`button${clicked === 'yearly' ? ' clicked-button' : ''}`}
        onClick={() => {
          fetchData('yearly');
          setClicked('yearly');
        }}
      >
        Year
      </button>
    </div>
    </>
  );
};

export default Slider;

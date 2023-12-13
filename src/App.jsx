import React, { useState } from 'react'
import Heading from './components/Heading'
import Slider from './components/Slider'
import Data from './components/Data'



const App = () => {
  const [stockData,setStockData] = useState([]);
  return (
    <div >

      <Heading/>
      <Slider setStockData={setStockData}/>
      <Data stockData={stockData}/>
    </div>
  )
}

export default App
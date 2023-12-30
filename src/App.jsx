import React from 'react'
import Heading from './components/Heading'
import Slider from './components/Slider'
import Data from './components/Data'
import './App.css';
import githubImage from './assets/github.svg';
import { RecoilRoot } from 'recoil';



const App = () => {

  return (
    <RecoilRoot>
      <div >
      <Heading/>
      <Slider/>
      <br />
      <br />
      <div className='flex justify-center item-center m-2 mb-8'>
        <hr className='w-11/12 bg-white h-0.5'/>
      </div>
      <Data/>
      <a href="https://github.com/AnishSharma22/REDDIT-STOCK-RECOMMENDER" target='_blank'>
      <div className='flex justify-center items-center my-6 hover:underline'>
          <span>View on Github</span>
          <img src={githubImage} alt="github" className='w-6 ml-3'  />
      </div>
      </a>
    </div>
    </RecoilRoot>
  )
}

export default App
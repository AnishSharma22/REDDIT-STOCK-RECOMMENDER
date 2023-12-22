import React from 'react';
import GithubImage from '../assets/github.png';

const Heading = () => {

  return (
    <div style={{ margin: '10px', fontWeight: 'bolder', fontSize: '30px', opacity: '1', fontFamily: 'Inter', display: 'flex', alignItems: 'center', flexDirection: 'column', position: 'relative' }}>
      <div>
        <span className='underline' style={{ margin: '10px', color: '#374151', fontSize: '60px', fontWeight: 400, letterSpacing: '-0.05em' }}>
          Reddit
        </span>
        <span className='underline' style={{ margin: '10px', color: '#a9792b', fontSize: '60px', fontWeight: 400, letterSpacing: '-0.05em' }}>
          Based
        </span>
        <a href="https://github.com/AnishSharma22/REDDIT-STOCK-RECOMMENDER"><img  style={{ width: '5%', position: 'absolute', top: 0, right: 0 }} src={GithubImage} alt='Your Image' /></a>
        
      </div>

      <div>
        <span className='underline' style={{ margin: '10px', color: '#a9792b', fontSize: '60px', fontWeight: 400, letterSpacing: '-0.05em' }}>
          Stock
        </span>
        <span className='underline' style={{ margin: '10px', color: '#374151', fontSize: '60px', fontWeight: 400, letterSpacing: '-0.05em' }}>
          Recommender
        </span>
      </div>
    </div>
  )
}

export default Heading;

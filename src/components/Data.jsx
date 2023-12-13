import React from 'react';
import { Sheet, Table, Button } from '@mui/joy';
import { OpenInNew } from '@mui/icons-material';


const Data = ({ stockData }) => {
  if (!Array.isArray(stockData) || stockData.length === 0) {
    return <div></div>;
  } else {
    return (
      <div style={{display:'flex',justifyContent:'center',alignItems:'center', marginTop:'30px'}}>
        {/* <Sheet >
          <Table borderAxis="xBetween" color="warning" size="md" stickyHeader variant="soft">
            <thead>
              <tr>
                <th style={{ width: '20%' }}>Shares</th>
                <th>Remark</th>
                <th>Daily Gain&nbsp;(%)</th>
                <th>Monthly Gain&nbsp;(%)</th>
                <th>Yearly Gain&nbsp;(%)</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((val, index) => (
                <tr key={index}>
                  <td>{val.ShareName}</td>
                  <td>{val.remark}</td>
                  <td>{val.dailyGain}</td>
                  <td>{val.monthlyGain}</td>
                  <td>{val.yearlyGain}</td>
                  <td>
                    <Button
                      component="a"
                      href={val.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      startDecorator={<OpenInNew />}
                    >
                      Posts
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet> */}



          

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Shares
                </th>
                <th scope="col" class="px-6 py-3">
                    Remark
                </th>
                <th scope="col" class="px-6 py-3">
                    Daily Gain(%)
                </th>
                <th scope="col" class="px-6 py-3">
                    Monthly Gain(%)
                </th>
                <th scope="col" class="px-6 py-3">
                    Yearly Gain(%)
                </th>
                <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Link</span>
                </th>
            </tr>
        </thead>
        <tbody>
            {stockData.map((val, index) => (
              <tr
                key={index}
                className={
                  val.remark == "positive"
                    ? 'bg-posRowColor hover:bg-posHoverColor'
                    : 'bg-negRowColor hover:bg-negHoverColor'
                }
              >
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {val.ShareName}
                </th>
                <td className="px-6 py-4">{val.remark}</td>
                <td className="px-6 py-4">{val.dailyGain}</td>
                <td className="px-6 py-4">{val.monthlyGain}</td>
                <td className="px-6 py-4">{val.yearlyGain}</td>
                <td className="px-6 py-4 text-right">
                  <a href={val.link} className="font-medium text-blue-600 hover:underline">POSTS</a>
                </td>
              </tr>
            ))}
        </tbody>

    </table>
</div>


      </div>
    );
  }
};

export default Data;

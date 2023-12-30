import React from "react";
import imageSrc from '../assets/1.png'
import "../App.css";
import { useRecoilState} from "recoil";
import { stockDataState } from "../store/atoms";

const Data =()=>{
  const [stockData] = useRecoilState(stockDataState);
  return(
     <div className="overflow-x-auto dataTable flex justify-center items-center">
       <table className="w-full">
      <thead className="underline">
        <tr >
          <th className=" px-4 pt-2 pb-6 text-2xl">Name</th>
          <th className=" px-4 pt-2 pb-6 text-2xl">Outlook</th>
          <th className=" px-4 pt-2 pb-6 text-2xl">Daily Gain</th>
          <th className=" px-4 pt-2 pb-6 text-2xl">Monthly Gain</th>
          <th className=" px-4 pt-2 pb-6 text-2xl">Yearly Gain</th>
          <th className=" px-4 pt-2 pb-6 text-2xl">Post Link</th>
        </tr>
      </thead>
      <tbody>
  {stockData.map((val, index) => (
    <tr
      key={index}
      className={`bg-transparent text-white hover:bg-hoverColor custom`}
    >
      <td className="px-4 py-6 text-center font-bold">{val.ShareName}</td>
      <td className="px-4 py-6 text-center font-bold">
      <span className={
        val.Remark === 'Positive' ? 'remark-pos' :
        val.Remark === 'Negative' ? 'remark-neg' :
        val.Remark === 'Neutral' ? 'remark-neutral' : ''
      }>
        {val.Remark}
      </span>

      </td>
      <td className="px-4 py-6 text-center font-bold">{val.dailyGain.toFixed(2)} %</td>
      <td className="px-4 py-6 text-center font-bold">{val.monthlyGain.toFixed(2)} %</td>
      <td className="px-4 py-6 text-center font-bold">{val.yearlyGain.toFixed(2)} %</td>
      <td className="px-4 py-6 text-center font-bold">
        <a href={val.Post_URL} target="_blank" className="image-link">
          <img src={imageSrc} alt="image" className="mx-auto image hover-effect" />
        </a>
      </td>
    </tr>
  ))}
</tbody>


    </table>
     </div>
  );
}

export default Data;

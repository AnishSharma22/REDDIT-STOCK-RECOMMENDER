import React from "react";


const Data = ({ stockData }) => {
  if (!Array.isArray(stockData) || stockData.length === 0) {
    return <div></div>;
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
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
                    val.Remark == "Positive"
                      ? "bg-posRowColor hover:bg-posHoverColor"
                      : "bg-negRowColor hover:bg-negHoverColor"
                  }
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {val.ShareName}
                  </th>
                  <td className="px-6 py-4">{val.Remark}</td>
                  <td className="px-6 py-4">{val.dailyGain.toFixed(2)} %</td>
                  <td className="px-6 py-4">{val.monthlyGain.toFixed(2)} %</td>
                  <td className="px-6 py-4">{val.yearlyGain.toFixed(2)} %</td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href={val.Post_URL}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      POSTS
                    </a>
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

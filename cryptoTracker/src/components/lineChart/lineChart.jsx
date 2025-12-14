import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  const options = {
    title: "Price Trend",
    hAxis: { title: "Date" },
    vAxis: { title: "Price" },
    legend: { position: "bottom" },
    areaOpacity: 0.2,
    colors: ["#1f77b4"],
  };

  useEffect(() => {
    if (!historicalData?.prices) return;

    const dataCopy = [["Date", "Prices"]];
    historicalData.prices.forEach(item => {
      const date = new Date(item[0]).toLocaleDateString().slice(0, -5);
      dataCopy.push([date, item[1]]);
    });
    setData(dataCopy);
  }, [historicalData]);

  if (data.length <= 1) return null; 
  return (
    <Chart
      chartType="AreaChart"
      data={data}
      options={options}
      width="100%"
      height="40vw"
      legendToggle
    />
  );
};

export default LineChart;

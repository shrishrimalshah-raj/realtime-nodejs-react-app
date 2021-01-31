import React from "react";
import Chart from "react-google-charts";

const returnBankNiftyFutureData = (data) => {
  const tempData = [["timestamp", "openInterest", "underlyingValue"]];
  data.forEach((item) => {
    const { openInterest, underlyingValue, timestamp } = item;
    let date = new Date(timestamp);
    let time = `${date.getHours()}:${date.getMinutes()}`;
    tempData.push([time, openInterest, underlyingValue]);
  });

  return tempData;
};

const returnBankNiftyOptionChainData = (data) => {
  const tempData = [
    ["timestamp", "diffChangeInOpenInterest", "underlyingValue"],
  ];
  data.forEach((item) => {
    const { diffChangeInOpenInterest, underlyingValue, timestamp } = item;
    let date = new Date(timestamp);
    let time = `${date.getHours()}:${date.getMinutes()}`;
    tempData.push([time, diffChangeInOpenInterest, underlyingValue]);
  });

  return tempData;
};

const BankNiftyChart = (props) => {
  const { bankNiftyoptionChainData, bankNiftyFutureData } = props;
  return (
    <div>
            <h1>Bank Nifty Future Chart</h1>
      {bankNiftyFutureData.length > 0 ? (
        <>
          <Chart
            width={"100%"}
            height={"500"}
            chartType="Line"
            loader={<div>Loading Chart</div>}
            data={returnBankNiftyFutureData(bankNiftyFutureData)}
            options={{
              chart: {
                title: "Bank Nifty and Open Interest Chart For Future Data",
              },
              width: 1600,
              height: 500,
              series: {
                // Gives each series an axis name that matches the Y-axis below.
                0: { axis: "openInterest" },
                1: { axis: "underlyingValue" },
              },
              axes: {
                // Adds labels to each axis; they don't have to match the axis names.
                y: {
                  openInterest: { label: "openInterest" },
                  lastPrice: { label: "underlyingValue" },
                },
              },
            }}
            rootProps={{ "data-testid": "4" }}
          />
        </>
      ) : null}
      <br />
      <br />
      <h1>Bank Nifty Option Chain Chart</h1>
      {bankNiftyoptionChainData.length > 0 ? (
        <>
          <Chart
            width={"100%"}
            height={"500"}
            chartType="Line"
            loader={<div>Loading Chart</div>}
            data={returnBankNiftyOptionChainData(bankNiftyoptionChainData)}
            options={{
              chart: {
                title: "Bank Nifty and Open Interest Chart For Option Chain Data",
              },
              width: 1600,
              height: 500,
              series: {
                // Gives each series an axis name that matches the Y-axis below.
                0: { axis: "diffChangeInOpenInterest" },
                1: { axis: "underlyingValue" },
              },
              axes: {
                // Adds labels to each axis; they don't have to match the axis names.
                y: {
                  openInterest: { label: "diffChangeInOpenInterest" },
                  lastPrice: { label: "underlyingValue" },
                },
              },
            }}
            rootProps={{ "data-testid": "4" }}
          />
        </>
      ) : null}
    </div>
  );
};

export default BankNiftyChart;

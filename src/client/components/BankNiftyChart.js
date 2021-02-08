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
  const tempData = [["timestamp", "diffOpenInterest", "underlyingValue"]];
  data.forEach((item) => {
    const { diffOpenInterest, underlyingValue, timestamp } = item;
    let date = new Date(timestamp);
    let time = `${date.getHours()}:${date.getMinutes()}`;
    tempData.push([time, diffOpenInterest, underlyingValue]);
  });

  return tempData;
};

const returnPCRData = (data) => {
  const tempData = [["timestamp", "pcr", "underlyingValue"]];
  data.forEach((item) => {
    const { pcr, underlyingValue, timestamp } = item;
    let date = new Date(timestamp);
    let time = `${date.getHours()}:${date.getMinutes()}`;
    tempData.push([time, pcr, underlyingValue]);
  });

  return tempData;
};

const BankNiftyChart = (props) => {
  const { bankNiftyoptionChainData, bankNiftyFutureData } = props;
  console.log(bankNiftyoptionChainData);
  return (
    <div>
      <h1 style={{ marginLeft: "200px" }}>Bank Nifty Future Chart</h1>
      {bankNiftyFutureData.length > 0 ? (
        <>
          <div style={{ marginLeft: "200px" }}>
            <Chart
              width={"80%"}
              height={"500"}
              chartType="Line"
              loader={<div>Loading Chart</div>}
              data={returnBankNiftyFutureData(bankNiftyFutureData)}
              options={{
                chart: {
                  title: "Bank Nifty and Open Interest Chart For Future Data",
                },
                width: 1200,
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
                    underlyingValue: { label: "underlyingValue" },
                  },
                },
              }}
              rootProps={{ "data-testid": "4" }}
            />
          </div>
        </>
      ) : null}
      <br />
      <br />
      <h1 style={{ marginLeft: "200px" }}>Bank Nifty Option Chain Chart</h1>
      {bankNiftyoptionChainData.length > 0 ? (
        <>
          <div style={{ marginLeft: "200px" }}>
            <Chart
              width={"80%"}
              height={"500"}
              chartType="Line"
              loader={<div>Loading Chart</div>}
              data={returnBankNiftyOptionChainData(bankNiftyoptionChainData)}
              options={{
                chart: {
                  title: "Bank Nifty and Open Interest Chart For Future Data",
                },
                width: 1200,
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
                    underlyingValue: { label: "underlyingValue" },
                  },
                },
              }}
              rootProps={{ "data-testid": "4" }}
            />
          </div>
        </>
      ) : null}
      <br />
      <br />
      <h1 style={{ marginLeft: "200px" }}>PCR Chart Data</h1>
      {bankNiftyoptionChainData.length > 0 ? (
        <>
          <div style={{ marginLeft: "200px" }}>
            <Chart
              width={"80%"}
              height={"500"}
              chartType="Line"
              loader={<div>Loading Chart</div>}
              data={returnPCRData(bankNiftyoptionChainData)}
              options={{
                chart: {
                  title: "PCR Chart Data",
                },
                width: 1200,
                height: 500,
                series: {
                  // Gives each series an axis name that matches the Y-axis below.
                  0: { axis: "pcr" },
                  1: { axis: "underlyingValue" },
                },
                axes: {
                  // Adds labels to each axis; they don't have to match the axis names.
                  y: {
                    openInterest: { label: "pcr" },
                    underlyingValue: { label: "underlyingValue" },
                  },
                },
              }}
              rootProps={{ "data-testid": "4" }}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default BankNiftyChart;

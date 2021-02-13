import React from "react";
import Chart from "react-google-charts";
import { makeStyles } from "@material-ui/core/styles";

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

const returnPriceChangeData = (data) => {
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

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
  greenColor: {
    backgroundColor: "green",
    color: "white",
    fontSize: "1.7rem",
    // fontWeight: "bold",
  },
  redColor: {
    backgroundColor: "red",
    color: "white",
    fontSize: "1.7rem",
    // fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
  fontSize: {
    fontSize: "1rem",
  },
  yellowColor: {
    backgroundColor: "yellow",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "red",
  },
});

const BankNiftyChart = (props) => {
  const classes = useStyles();
  const { bankNiftyoptionChainData, bankNiftyFutureData } = props;
  // console.log(bankNiftyoptionChainData);
  return (
    <div>
      {bankNiftyFutureData.length > 0 ? (
        <>
          <h1 style={{ marginLeft: "200px" }}>Bank Nifty Future Chart</h1>
          <div style={{ marginLeft: "200px" }}>
            <Chart
              width={"70%"}
              height={"500"}
              chartType="Line"
              loader={<div>Loading Chart</div>}
              data={returnBankNiftyFutureData(bankNiftyFutureData)}
              options={{
                chart: {
                  title: "",
                },
                width: 1100,
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
      {bankNiftyoptionChainData.length > 0 ? (
        <>
          <h1 style={{ marginLeft: "200px" }}>
            Bank Nifty Option Chain Chart{" "}
            <span
              className={
                bankNiftyoptionChainData[bankNiftyoptionChainData.length - 1]
                  .diffOpenInterest < 0
                  ? `${classes.redColor}`
                  : `${classes.greenColor}`
              }
            >
              {bankNiftyoptionChainData[bankNiftyoptionChainData.length - 1]
                .diffOpenInterest < 0
                ? "CALL WRITING IS GREATER ==> BUY PUT"
                : "PUT WRITING IS GREATER ==> Action BUY CALL"}
            </span>
          </h1>
          <div style={{ marginLeft: "200px" }}>
            <Chart
              width={"70%"}
              height={"500"}
              chartType="Line"
              loader={<div>Loading Chart</div>}
              data={returnBankNiftyOptionChainData(bankNiftyoptionChainData)}
              options={{
                chart: {
                  title: "",
                },
                width: 1100,
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
      {bankNiftyoptionChainData.length > 0 ? (
        <>
          <h1 style={{ marginLeft: "200px" }}>
            Bank Nifty ChangeInOI Chain Chart{" "}
            <span
              className={
                bankNiftyoptionChainData[bankNiftyoptionChainData.length - 1]
                  .diffChangeInOpenInterest < 0
                  ? `${classes.redColor}`
                  : `${classes.greenColor}`
              }
            >
              {bankNiftyoptionChainData[bankNiftyoptionChainData.length - 1]
                .diffChangeInOpenInterest < 0
                ? "CALL WRITING IS GREATER ==> BUY PUT"
                : "PUT WRITING IS GREATER ==> Action BUY CALL"}
            </span>
          </h1>
          <div style={{ marginLeft: "200px" }}>
            <Chart
              width={"70%"}
              height={"500"}
              chartType="Line"
              loader={<div>Loading Chart</div>}
              data={returnPriceChangeData(bankNiftyoptionChainData)}
              options={{
                chart: {
                  title: "",
                },
                width: 1100,
                height: 500,
                series: {
                  // Gives each series an axis name that matches the Y-axis below.
                  0: { axis: "diffChangeInOI" },
                  1: { axis: "underlyingValue" },
                },
                axes: {
                  // Adds labels to each axis; they don't have to match the axis names.
                  y: {
                    openInterest: { label: "diffChangeInOI" },
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

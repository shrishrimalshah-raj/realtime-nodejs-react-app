import React, { useState, useEffect } from "react";
import "./app.css";
import socketIOClient from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import BankNiftyOptionChainData from "./components/BankNiftyOptionChainData";
import BankNiftyFutureData from "./components/BankNiftyFutureData";
import BankNiftyChart from "./components/BankNiftyChart";

import Switch from "@material-ui/core/Switch";

const endpoint =
  process.env.REACT_APP_NODE_ENV === "dev"
    ? "http://localhost:8080/"
    : "http://shrishrimalraj.online:8080/";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  bold: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginTop: 50,
  },
}));

const App = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    bankNiftyoptionChainData: [],
    bankNiftyFutureData: [],
  });

  const [switchState, setSwitchState] = useState({
    isDisplayOptionChainData: false,
  });

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleChange = (event) => {
    setSwitchState({
      ...switchState,
      [event.target.name]: event.target.checked,
    });
  };

  const { bankNiftyoptionChainData = [], bankNiftyFutureData = [] } =
    state || {};

  const { isDisplayOptionChainData = false } = switchState || {};

  useEffect(() => {
    const socket = socketIOClient(endpoint, {
      query: `date=${selectedDate}`,
    });

    socket.on("FromAPI", (data) => {
      if (
        data.bankNiftyoptionChainData.length !== bankNiftyoptionChainData.length
      ) {
        console.log("!!! state updated !!!");

        setState({
          ...state,
          bankNiftyoptionChainData: data.bankNiftyoptionChainData,
        });
      } else {
        console.log("!!! same data !!!");
      }

      if (data.bankNiftyFutureData.length !== bankNiftyFutureData.length) {
        console.log("!!! state updated !!!");

        setState({
          ...state,
          bankNiftyFutureData: data.bankNiftyFutureData,
        });
      } else {
        console.log("!!! same data !!!");
      }
    });
  }, [bankNiftyoptionChainData, bankNiftyFutureData, selectedDate]);

  const descendingOrderArray = (data = []) => {
    if (data.length === 0) {
      return [];
    } else {
      return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  };

  return (
    <div>
      <form className={classes.container} noValidate>
        <TextField
          id="date"
          label="Date"
          type="date"
          value={selectedDate}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleDateChange}
        />
      </form>
      {bankNiftyoptionChainData.length === 0 ||
      bankNiftyFutureData.length === 0 ? (
        <div style={{ textAlign: "center" }} className={classes.bold}>
          Please wait for 5 seconds :)
        </div>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <BankNiftyChart
              {...{ bankNiftyoptionChainData, bankNiftyFutureData }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3>Bank Nifty Option Chain Data</h3>
            <div style={{ marginTop: "10px" }}>
              <Switch
                checked={isDisplayOptionChainData}
                onChange={handleChange}
                color="primary"
                name={"isDisplayOptionChainData"}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
            <h3>Bank Nifty Future Chain Data</h3>
          </div>

          {isDisplayOptionChainData === false ? (
            <BankNiftyOptionChainData
              rows={descendingOrderArray(bankNiftyoptionChainData)}
            />
          ) : (
            <BankNiftyFutureData
              rows={descendingOrderArray(bankNiftyFutureData)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;

// export default App;

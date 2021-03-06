import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
  greenColor: {
    backgroundColor: "green",
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  redColor: {
    backgroundColor: "red",
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  bold: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  fontSize: {
    fontSize: "1rem",
  },
  lightRedColor: {
    backgroundColor: "#ff6666",
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  lightGreenColor: {
    backgroundColor: "#98e698",
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
});

const columns = [
  "TIME",
  "LTP",
  "openInterest",
  "openInterestSignal",
];

export default function BankNiftyFutureData(props) {
  const classes = useStyles();
  const { rows = [] } = props;

  const returnOISignalClassName = (signal) => {
    if (signal === "LONG BUILDUP") {
      return classes.greenColor;
    } else if (signal === "SHORT BUILDUP") {
      return classes.redColor;
    } else if (signal === "LONG UNWINDING") {
      return classes.lightGreenColor;
    } else if (signal === "SHORT COVERING") {
      return classes.lightRedColor;
    } else {
      return "";
    }
  };

  const descendingOrderArray = (data = []) => {
    if (data.length === 0) {
      return [];
    } else {
      return data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
  };


  return (
    <>
      {rows.length === 0 ? (
        <div style={{ textAlign: "center" }} className={classes.bold}>
          Loading ...
        </div>
      ) : (
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  align="center"
                  key={col}
                  className={classes.fontSize}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {descendingOrderArray(rows).map((row) => (
              <TableRow key={row.timestamp}>
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  className={classes.fontSize}
                >
                  {new Date(row.timestamp).toLocaleTimeString()}
                </TableCell>
                <TableCell align="center" className={classes.bold}>
                  {row.underlyingValue}
                </TableCell>
                <TableCell align="center" className={classes.bold}>
                  {row.openInterest}
                </TableCell>
                <TableCell
                  align="center"
                  className={`${classes.fontSize} ${returnOISignalClassName(
                    row.openInterestSignal
                  )}`}
                >
                  {row.openInterestSignal}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}

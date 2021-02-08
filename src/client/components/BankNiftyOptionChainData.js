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
    color: "white",
    fontWeight: "bold",
  },
  redColor: {
    backgroundColor: "red",
    color: "white",
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
  fontSize: {
    fontSize: "1rem",
  },
});

const columns = [
  "TIME",
  "LTP",
  "CALLOI",
  "PUTOI",
  "DIFFOI",
  "OISIGNAL",
  "PCR",
  "callChangeInOI",
  "putChangeInOI",
  "diffChangeInOI",
  "changeInOISignal",
];

export default function BankNiftyOptionChainData(props) {
  const classes = useStyles();
  const { rows = [] } = props;

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
                <TableCell align="center" className={classes.fontSize}>
                  {row.callOpenInterest}
                </TableCell>
                <TableCell align="center" className={classes.fontSize}>
                  {row.putOpenInterest}
                </TableCell>
                <TableCell align="center" className={classes.bold}>
                  {row.diffOpenInterest}
                </TableCell>
                <TableCell
                  align="center"
                  className={
                    row.openInterestSignal === "BUY"
                      ? `${classes.greenColor} ${classes.bold}`
                      : `${classes.redColor} ${classes.bold}`
                  }
                >
                  {row.openInterestSignal}
                </TableCell>
                <TableCell align="center" className={classes.bold}>
                  {row.pcr}
                </TableCell>
                <TableCell align="center" className={classes.fontSize}>
                  {row.callChangeInOpenInterest}
                </TableCell>
                <TableCell align="center" className={classes.fontSize}>
                  {row.putChangeInOpenInterest}
                </TableCell>
                <TableCell align="center" className={classes.bold}>
                  {row.diffChangeInOpenInterest}
                </TableCell>
                <TableCell
                  align="center"
                  className={
                    row.changeInOpenInterestSignal === "BUY"
                      ? `${classes.greenColor} ${classes.bold}`
                      : `${classes.redColor} ${classes.bold}`
                  }
                >
                  {row.changeInOpenInterestSignal}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}

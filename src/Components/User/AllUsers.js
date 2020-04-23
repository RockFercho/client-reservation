import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

let initalState = {
  users: []
}
export default function AllUser() {

  let [state, setState] = useState(initalState);
  
  const classes = useStyles();

  useEffect(fetchUserData, []);

  function fetchUserData() {
    fetch(
      "http://localhost:8082/api/user"
    )
    .then((res) => {
      return res.json();
    })
    .then((resUsers) => {
      setState({
        ...state,
        users: resUsers
      })
    });
  }

  return(
    <div>
      <h2>All Users</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Lastname</TableCell>
              <TableCell align="center">Moderslastname</TableCell>
              <TableCell align="center">Birthdate</TableCell>
              <TableCell align="center">Sex</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Celphone</TableCell>
              <TableCell align="center">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.users.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.lastname}</TableCell>
                <TableCell align="right">{row.moderslastname}</TableCell>
                <TableCell align="right">{row.birthdate}</TableCell>
                <TableCell align="right">{row.sex}</TableCell>
                <TableCell align="right">{row.address}</TableCell>
                <TableCell align="right">{row.celphone}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
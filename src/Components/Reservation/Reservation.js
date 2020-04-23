//import 'date-fns';
import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

let initialState = {
  user: "",
  startDate: new Date(),
  endDate: new Date(),
  note: "",
  msg: "",
  errors: [],
  users: []
}
 
export default function Reservation() {

  const [state, setState] = useState(initialState);
  
  const classes = useStyles();
  
  const defaultProps = {
    options: state.users,
    getOptionLabel: (option) => option.title,
  };


  function handleFormChange(val) {
    let newValue = val.target.value;
    let name = val.target.name;

    setState({
      ...state,
      [name]: newValue,
    });
  }

  useEffect(fetchUserData, []);

  const handleDateChange = (date) => {
    setState({
      ...state,
      startDate: date,
      endDate: date
    });
  };
  const handleHourChange = (date) => {
    setState({
      ...state,
      startDate: date,
    });
  };
  const handleEndDateChange = (date) => {
    setState({
      ...state,
      endDate: date,
    });
  };
  const handleAutoComplete = (event, value) => {
    setState({
      ...state,
      user: value.value,
    });
  };

  function fetchUserData() {
    fetch(
      "http://localhost:8082/api/user"
    )
      .then((res) => {
        return res.json();
      })
      .then((resUsers) => {
        let users = [];
        resUsers.forEach(user =>
          users.push({
            title: `${user.name} ${user.lastname} ${user.moderslastname}`,
            value: user._id
          })
        );
        setState({
          ...state,
          users
        })
      });
  }

  function handleFormSubmit() {
    let reservation = {
      user: state.user,
      startDate: state.startDate,
      endDate: state.endDate,
      notes: state.note,
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservation)
  };
    fetch(
      "http://localhost:8082/api/reservation",
      requestOptions
    )
    .then((res) => {
      if (res.status === 200) {
        setState({ ...state, msg: "successful!!!" });
      } else {
        setState({ ...state, errors: res.message });
      }
      return res;
    });
  }

  function handleFormReset() {
    setState({ ...state, ...initialState });
  }

  if (state.msg)
    return (
      <>
        <div style={{"text-align":"center", color:"red"}} className="msgContainer">
          <h1>{state.msg}</h1>
        </div>
        <div style={{"text-align":"center" }}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleFormReset}
          >
            Back
          </Button>
        </div>
      </>
    );

  let errs = state.errors.map((item) => {
    return <div className="error">{item.msg}</div>;
  });

  return (
    <div>
      <h2>Reservation</h2>
      {errs}
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <Autocomplete
                {...defaultProps}
                onChange={handleAutoComplete}
                id="user"
                debug
                renderInput={
                  (params) => 
                    <TextField 
                      {...params}
                      label="User"
                      margin="normal"
                    />
                }
              />
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date"
                value={state.startDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Start"
                value={state.startDate}
                onChange={handleHourChange}
                name= "startDate"
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
                />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="End"
                value={state.endDate}
                onChange={handleEndDateChange}
                name= "endDate"
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
              <TextField 
                name="note" 
                label="Note"
                value={state.note}
                onChange={handleFormChange}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={handleFormSubmit}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

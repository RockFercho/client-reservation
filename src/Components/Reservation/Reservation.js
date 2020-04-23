//import 'date-fns';
import React from "react";
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

let top100Films = [
  { title: "aaa" },
  { title: "bbb" },
  { title: "ccc" },
];
 
export default function Reservation() {

  const classes = useStyles();
  
  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.title,
  };

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const [selectedDate2, setSelectedDate2] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
  };

  return (
    <div>
      <h2>Reservation</h2>
      
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <Autocomplete
                {...defaultProps}
                id="user"
                debug
                renderInput={(params) => <TextField {...params} label="User" margin="normal" />}
              />
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardTimePicker
                disableToolbar
                margin="normal"
                id="time-picker"
                label="Start"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
                />
              <KeyboardTimePicker
                disableToolbar
                margin="normal"
                id="time-picker"
                label="End"
                value={selectedDate2}
                onChange={handleDateChange2}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
              <TextField id="reservation-note" label="note"/>
            </Grid>
          </MuiPickersUtilsProvider>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

import React, { useState, useReducer, useRef, useEffect } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

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
  name: "",
  lastname: "",
  moderslastname: "",
  birthdate: "",
  sex: "",
  address: "",
  celphone: "",
  email: "",
  msg: "",
  errors: [],
  hasLoaded: false,
};
 
export default function User() {

  const classes = useStyles();

  let [state, setState] = useState(initialState);
  
  //useEffect(fetchUserData, []);

  function handleFormChange(val) {
    let newValue = val.target.value;
    let name = val.target.name;

    setState({
      ...state,
      [name]: newValue,
    });
  }

  function handleFormSubmit() {
    let user = {
      name: state.name,
      lastname: state.lastname,
      moderslastname: state.moderslastname,
      birthdate: state.birthdate,
      sex: state.sex,
      address: state.address,
      celphone: state.celphone,
      email: state.email
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
  };
    fetch(
      "http://localhost:8082/api/user",
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
    //fetchUserData();
  }

  //if (!state.hasLoaded) return "Loading...";

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
      <h2>User</h2>
      {errs}
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField 
            required
            name="name"
            label="Name"
            value={state.name}
            onChange={handleFormChange}
          />
          <TextField 
            name="lastname"
            label="Lastname"
            value={state.lastname}
            onChange={handleFormChange}
          />
          <TextField 
            name="moderslastname"
            label="Moderslastname"
            value={state.moderslastname}
            onChange={handleFormChange}  
          />
          <TextField 
            name="birthdate"
            label="birthdate"
            value={state.birthdate}
            onChange={handleFormChange}
          />
          <TextField 
            name="sex"
            label="Sex"
            defaultValue="M"
            value={state.sex}
            onChange={handleFormChange}
            />
          <TextField 
            name="address"
            label="Address"
            value={state.address}
            onChange={handleFormChange}
          />
          <TextField 
            name="celphone"
            label="Celphone"
            value={state.celphone}
            onChange={handleFormChange}
          />
          <TextField 
            name="email"
            label="Email"
            value={state.email}
            placeholder="user@gmail.com"
            onChange={handleFormChange}
          />
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

import React from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Components/Home/Home";
import User from "./Components/User/User";
import AllUsers from "./Components/User/AllUsers";
import Reservation from "./Components/Reservation/Reservation";
import Calendar from "./Components/CalendarAppoitment/CalendarAppoitment";
 
export default function App() {
//class Main extends Component {
 // render() {
    return (
      <HashRouter>
        <div>
          <h1>Appointment Reservation</h1>
          <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/user">User</NavLink></li>
            <li><NavLink to="/allusers">AllUsers</NavLink></li>
            <li><NavLink to="/reservation">Reservation</NavLink></li>
            <li><NavLink to="/calendar">Calendar</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/user" component={User}/>
            <Route path="/allusers" component={AllUsers}/>
            <Route path="/reservation" component={Reservation}/>
            <Route path="/calendar" component={Calendar}/>
          </div>
        </div>
      </HashRouter>
    );
 // }
}
 
//export default Main;
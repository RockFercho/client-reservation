import React, {useState, useEffect} from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

let initialState = {
  events: []
};
export default function CalendarAppoitment() {
  
  const[state, setState] = useState(initialState);

  useEffect(fetchUserData, []);

  function fetchUserData() {
    fetch(
      "http://localhost:8082/api/reservation"
    )
      .then((res) => {
        return res.json();
      })
      .then((reservations) => {
        let events = [];
        reservations.forEach(item =>
          events.push({
            title: `${item.user.name} ${item.user.lastname} ${item.user.moderslastname}`,
            start: item.start,
            end: item.end
          })
        );
        setState({
          ...state,
          events
        })
      });
  }

  return (
    <div>
      <h2>Appointments</h2>
      <div style={{height:`${400}px`}} className="bigCalendar-container">
        <Calendar
          localizer={localizer}
          events={state.events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 400 }}
        />
      </div>
    </div>
  );
}
 
import React, { useState } from "react";
import Scheduler from "./scheduler/Scheduler.jsx";
import Schedule from "./scheduler/Schedule.jsx";
// import DYKAdmin from './DYKAdmin';
import "./App.css";

const App = () => {
  const [visible, setVisible] = useState(false);
  const [cronExpression, setCronExpression] = useState([
    "0",
    "0",
    "0",
    "?",
    "*",
    "*",
    "*",
  ]);
  return (
    <React.Fragment>
      <Schedule {...{ setVisible, cronExpression }} />
      {visible && <Scheduler
        {...{ setVisible, cronExpression, setCronExpression }}
      />}
    </React.Fragment>
  );
};
export default App;

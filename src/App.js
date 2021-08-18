import React, { useState } from 'react';
import { Button } from 'antd';
import Scheduler from './scheduler/Scheduler.jsx';
// import DYKAdmin from './DYKAdmin';
import './App.css';

const App = () => {
  const [visible, setVisible] = useState(true);
  const handleVisible = () => {
    setVisible(bool => !bool);
  }
  return (
    <>
      <Button onClick={handleVisible}>Call Scheduler</Button>
      <Scheduler {...{ visible, setVisible }}/>
      {/* <DYKAdmin {...{ visible, setVisible }}/> */}
    </>
  );
}
export default App;

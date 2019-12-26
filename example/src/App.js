import React, { useState } from 'react'
import { Progress, Button } from 'reactstrap'

import useAutoProgress from 'use-auto-progress'

const App = () => {
  const [running, setRunning] = useState(false);
  const [value, setStart] = useAutoProgress(running);

  const toggle = () => {
    const s = !running;
    setRunning(s);
    setStart(s);
  };

  return (
    <div>
      <Button onClick={toggle}>{running ? 'Stop' : 'Start'}</Button>
      <Progress value={value}>{value}%</Progress>
    </div>
  )
}
export default App

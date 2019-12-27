import React from 'react'
import { Progress, Button } from 'reactstrap'

import useAutoProgress from 'use-auto-progress'

const App = () => {
  const [value, setStart, running] = useAutoProgress(false);

  const toggle = () => {
    const s = !running;
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

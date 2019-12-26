import React from 'react'

import useAutoProgress from 'use-auto-progress'

const App = () => {
  const [value] = useAutoProgress(true);
  return (
    <div>
      {value}
    </div>
  )
}
export default App

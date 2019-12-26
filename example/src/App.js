import React from 'react'

import useAutoProgressEffect from 'use-auto-progress'

const App = () => {
  const [value] = useAutoProgressEffect(true);
  return (
    <div>
      {value}
    </div>
  )
}
export default App

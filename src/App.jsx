import { useState } from 'react'
import { Button } from '../lib/components';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button onClick={() => setCount(count + 1)}>Click me</Button>
    </>
  )
}

export default App

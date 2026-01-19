import React, { useState } from 'react';

const CountButton = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  }
  return (
    <div>
        <button onClick={handleClick}>Click me</button>
        <p>Count: {count}</p>
    </div>
  )
}

export default CountButton
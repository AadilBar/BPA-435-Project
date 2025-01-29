import React, { useState } from 'react';
const Counter: React.FC = () => {
  
  const [count, setCount] = useState<number>(1);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 1) {
    setCount(count - 1);
    }
    else {
        alert('You can you not have less than 1')
    }
  }

  return (
    <div style={{ width: "100%" }}>
        <button onClick={decreaseCount} >-</button>
      <h1>{count}</h1>
      <button onClick={increaseCount}>+</button>
      
    </div>

    
  );
};

export default Counter;
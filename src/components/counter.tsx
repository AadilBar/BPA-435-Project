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
    <div className="counter_container">
        <button onClick={decreaseCount} className="minus">-</button>
      <h1 id="counter">{count}</h1>
      <button onClick={increaseCount} className="plus">+</button>
      
    </div>

    
  );
};

export default Counter;
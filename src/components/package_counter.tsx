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
      <div className="package_counter_container">
          <button onClick={decreaseCount} className="minus_button">-</button>
          <h1 style={{ color: 'black' }}>{count}</h1>
        <button onClick={increaseCount} className="plus_button">+</button>
        
      </div>
  
      
    );
  };
  
  export default Counter;
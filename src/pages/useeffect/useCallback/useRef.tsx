import React, { useEffect, useRef, useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  const countRef = useRef();

  function handleAlertClick() {
    setTimeout(() => {
      alert(`You clicked on: ${count}`);
    }, 3000);
  }

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button type="button" onClick={handleAlertClick}>
        Show alert
      </button>
    </div>
  );
}

export default Example;

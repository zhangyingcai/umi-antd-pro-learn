import React, { useLayoutEffect, useState } from 'react';

const Page = () => {
  const [list, setList] = useState([1, 2, 3]);

  const onclick = () => {
    setList([...list, 4]);
  };
  useLayoutEffect(() => {
    console.log('123');
  });
  return (
    <div>
      <button type="button" onClick={onclick}>
        copy
      </button>
      {list.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
};

export default Page;

import React, { useEffect, useState } from 'react';
//  组件 函数 是否是缓存的，每次都是新的
const Child = ({ callback }) => {
  useEffect(() => {
    console.log('子组件');
    callback();
  }, [callback]);
  return <div>1</div>;
};

const Page = () => {
  const [count, setCount] = useState(0);
  const callback = () => {
    console.log('123');
  };

  useEffect(() => {
    console.log('依赖函数');
    callback();
  }, [callback]);

  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        add
      </button>
      <Child callback={callback} />
    </div>
  );
};

export default Page;

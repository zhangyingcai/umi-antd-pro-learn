import React, { useEffect, useState } from 'react';

// 因为useEffect 只会运行一次
// 产生一个闭包，count 的值被保存到该闭包中
const Page = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + 1); // 这个 effect 依赖于 `count` state
      // 函数式更新  setState 更新， 接受之前的 state, 返回更新后的值
    }, 1000);
    return () => clearInterval(id);
  }, []); // Bug: `count` 没有被指定为依赖
  return <span>{count}</span>;
};

export default Page;

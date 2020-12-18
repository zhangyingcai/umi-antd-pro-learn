import React, { useEffect, useLayoutEffect } from 'react';
// 执行顺序
const Page = () => {
  useEffect(() => {
    console.log('useEffect');
  });
  useLayoutEffect(() => {
    console.log('useLayoutEffect');
  });
  return <h1>1</h1>;
};

export default Page;

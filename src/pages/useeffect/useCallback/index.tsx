import React, { useCallback, useEffect, useState } from 'react';
import { Input } from 'antd';
// hooks 理解

const Child = (val: any, getData: Function) => {
  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div>
      <p>child</p>
      <span>{val}</span>
    </div>
  );
};

const Page = () => {
  const [title, setTitle] = useState('我是page1');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  //  useDocumentTitle hook 实现
  //  在销毁是时再次给一个默认的标题即可
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = '前端精读';
    };
  }, [title]);

  // useCallback 返回一个 memoized 函数  可以缓存当前快照的函数
  // fn 返回的函数
  // deps 参数， 传入的参数不会传入到函数中
  // useCallback(fn, deps) 相当于 useMemo(() => fn, deps)
  // 推荐 所有回调函数中引用的值都应该出现在依赖项数组中

  const [callBackChangeTitle, setCallBackChangeTitle] = useState('');
  const callbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCallBackChangeTitle(e.target.value);
  };
  // 此时依赖callbackClick无法缓存callBackChangeTitle的初始值
  const callbackClick = useCallback(() => {
    console.log(callBackChangeTitle);
  }, [callBackChangeTitle]);
  // 因为函数组件没有this，react建议使用useRef来存放会发生变化的值

  /**
   * callback 应用场景
   */
  const [count, setCount] = useState(0);
  const getData = useCallback(() => {
    setTimeout(() => {
      setCount(count + 1);
    }, 1000);
  }, []); // 如果依赖count

  return (
    <React.Fragment>
      <React.Fragment>
        <Input type="text" onChange={handleChange} />
        <span>{title}</span>
      </React.Fragment>
      <React.Fragment>
        <h1>useCallback</h1>
        <Input type="text" onChange={callbackChange} />
        <span>{callBackChangeTitle}</span>
        <button type="button" onClick={callbackClick}>
          callbackbutton
        </button>
      </React.Fragment>
      <React.Fragment>
        <h1>useCallback</h1>
        <Child val={count} getData={getData} />
      </React.Fragment>
    </React.Fragment>
  );
};

export default Page;

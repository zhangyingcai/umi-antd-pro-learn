import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';

//  useState 实现

const memoizedState: any[] = [];
let memoCount = 0; // 下标

function useState(initialValue) {
  // 获取缓存的值
  const state = memoizedState[memoCount] || initialValue;
  const currentmemocount = memoCount;
  function setState(newState) {
    // 缓存改变的值
    memoizedState[currentmemocount] = newState;
    render(); // 模拟 reRender，这一行不需要关心
  }
  // 每次执行 下标加一
  memoCount += 1;
  return [state, setState];
}

// useEffect
const useEffect = (callback, deps) => {
  //  deps 没有
  const hasnoDeps = !deps;
  // 获取缓存的值
  const depsArray = memoizedEffect[memoCount];
  // deps有参数时参数改变才运行
  const depsChange = depsArray
    ? Array.isArray(deps) && !deps.every((item, index) => item === depsArray[index])
    : true;
  if (hasnoDeps || depsChange) {
    callback();
    // 参数列表改变时缓存列表
    memoizedState[memoCount] = deps;
  }
  memoCount += 1;
};

function App() {
  const [count, setCount] = useState(0);
  const [name, setname] = useState(0);

  useEffect(() => {
    console.log('effect count', count);
  }, [count]);

  useEffect(() => {
    console.log('effect name', name);
  }, [name]);

  useEffect(() => {
    console.log('每次都执行');
  });

  useEffect(() => {
    console.log('只会执行一次');
  }, []);

  return (
    <div>
      <div>{count}</div>

      <Button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        点击
      </Button>
      <div>{name}</div>
      <Button
        onClick={() => {
          setname(name + 2);
        }}
      >
        点击
      </Button>
    </div>
  );
}

const rootElement = document.getElementById('root');

function render() {
  memoCount = 0;
  ReactDOM.render(<App />, rootElement);
}
render();

export default App;

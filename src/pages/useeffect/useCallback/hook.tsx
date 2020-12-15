import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';

//  useState 实现

const memoizedState: any[] = [];
let memocount = 0; // 下标

function useState(initialValue) {
  // 获取缓存的值
  const state = memoizedState[memocount] || initialValue;
  const currentmemocount = memocount;
  function setState(newState) {
    // console.log(currentmemocount, '新数据', memoizedState )
    memoizedState[currentmemocount] = newState;
    render(); // 模拟 reRender，这一行不需要关心
  }
  // 每次执行 下标加一
  memocount += 1;
  return [state, setState];
}

// useEffect
const memoizedEffect = [];
let effectcount = 0; // 下标
const useEffect = (callback, deps) => {
  const hasnoDeps = !deps;
  // callback 运行条件 deps没有参数时每次都运行， deps有参数时参数改变才运行
  // 获取缓存的值
  const depsArray = memoizedEffect[effectcount];
  // depsArray
  const depsChange = depsArray
    ? Array.isArray(deps) && !deps.every((item, index) => item === depsArray[index])
    : true;
  if (hasnoDeps || depsChange) {
    callback();
    memoizedEffect[effectcount] = deps;
  }
  effectcount += 1;
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
  memocount = 0;
  effectcount = 0;
  ReactDOM.render(<App />, rootElement);
}
render();

export default App;

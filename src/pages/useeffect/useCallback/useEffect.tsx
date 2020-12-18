import React, { useEffect, useState, useReducer } from 'react';

// 解释useEffect 快照的示例
// 实现步骤 先点击 show alert 再计数
const Child = () => {
  const [count, setCount] = useState(0);
  let name = 'child';
  const handleAlertClick = () => {
    // 代表异步操作
    setTimeout(() => {
      alert(count);
    }, 3000);

    name = `${count}`;
  };
  return (
    <div>
      <span>{count}</span>
      <span>{name}</span>
      <button type="button" onClick={() => setCount(count + 1)}>
        count
      </button>
      <button type="button" onClick={handleAlertClick}>
        show alert
      </button>
    </div>
  );
};
const initialState = {
  count: 0,
  step: 1,
};
// 计时器进阶写法
// 将更新与动作解耦
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <>
      <h1>{count}</h1>
      <input
        value={step}
        onChange={(e) => {
          dispatch({
            type: 'step',
            step: Number(e.target.value),
          });
        }}
      />
      <button
        type="button"
        onClick={() => {
          dispatch({
            type: 'stop',
          });
        }}
      >
        stop
      </button>
    </>
  );
}

function reducer(state, action) {
  const { count, step } = state;

  let data = null;
  if (action.type === 'tick') {
    data = { count: count + step, step };
  } else if (action.type === 'step') {
    data = { count, step: action.step };
  }
  return data;
}

// 因为useEffect 只会运行一次
// 产生一个闭包，count 的值被保存到该闭包中
const Page = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log('render');
    const id = setInterval(() => {
      console.log('计时器', count, id);
      setCount((c) => c + 1); // 这个 effect 依赖于 `count` state
      // 函数式更新  setState 更新， 接受之前的 state, 返回更新后的值
    }, 1000);
    return () => clearInterval(id);
  }, []); // Bug: `count` 没有被指定为依赖
  return (
    <React.Fragment>
      <span>{count}</span>
      <Child />
      <Counter />
    </React.Fragment>
  );
};

export default Page;

import React, { useCallback, useReducer, useState, useRef } from 'react';
import { Input, Button } from 'antd';

const Item = ({ item, onDele }) => {
  const { name, id } = item || {};
  return (
    <div>
      <span>{name}</span>
      <Button type="default" onClick={() => onDele(id)}>
        x
      </Button>
    </div>
  );
};

const Todo = ({ list = [], onAdd, onDele }) => {
  const [value, setValue] = useState('');
  const handleAdd = () => {
    onAdd(value);
  };
  return (
    <React.Fragment>
      <div>
        <Input
          value={value}
          onChange={({ target }) => {
            setValue(target.value);
          }}
        />
        <Button type="default" onClick={handleAdd}>
          add
        </Button>
      </div>
      <div>
        {list.map((item) => (
          <Item onDele={onDele} item={item} key={item.id} />
        ))}
      </div>
    </React.Fragment>
  );
};

const initialState = { count: 0 };

const reducer1 = (state, action) => {
  console.log(123);
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error();
  }
};

// 实现一个计时器
// interface Action {
//     type: 'start' | 'stop' | 'reset' | undefined,
//     playload?: {
//         startTime?: number // seconend
//     }
// }
// interface State {
//     timerId: number | undefined,
//     second: number,
//     string: String,
// }
// 计时器 localstring
const twoChar = (n: number) => `${n || 0}`.padStart(2, '0');
// 秒 to Date
const secondToDate = (sec: number) => {
  const letSec = sec || 0;
  const h = parseInt(String(letSec / (60 * 60)), 10);
  const m = parseInt(String((letSec % (60 * 60)) / 60), 10);
  const s = parseInt(String((letSec % (60 * 60)) % 60), 10);
  return { h, m, s, string: `${twoChar(h)}:${twoChar(m)}:${twoChar(s)}` };
};

const timerState = { second: 0, string: '00:00:00' };

const TimerCounter = () => {
  const [time, setTime] = useState(timerState);
  const timerRef = useRef();
  // 停止计时器
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [timerRef.current]);
  // 开启计时器
  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(function () {
      setTime(({ second = 0 }) => {
        const { string } = secondToDate(second + 1);
        return {
          second: second + 1,
          string,
        };
      });
    }, 1000);
  };

  const resetAction = () => {
    stopTimer();
    setTime(timerState);
  };

  // const reducer = (state: State, action: Action) => {

  //     const { type, playload = {} } = action;
  //     const { startTime = 0 } = playload;

  //     switch (type) {
  //         case 'start':
  //             if (startTime) {
  //                 setTime({ ...time, second: startTime });
  //             }
  //             startTimer();
  //             break;
  //         case 'stop':
  //             stopTimer();
  //             break;
  //         case 'reset':
  //             setTime(timerState);
  //             startTimer();
  //             break;
  //         default:
  //             throw TypeError("should has a type 'start' | 'stop' | 'reset'")
  //     }

  // }
  return (
    <div>
      <span>{time.string}</span>
      <button type="button" onClick={resetAction}>
        reset
      </button>
      <button type="button" onClick={stopTimer}>
        stop
      </button>
      <button type="button" onClick={startTimer}>
        start
      </button>
    </div>
  );
};

const Counter = () => {
  const [state1, dispatch] = useReducer(reducer1, initialState);
  return (
    <>
      Count: {state1.count}
      <button type="button" onClick={() => dispatch({ type: 'decrement' })}>
        -
      </button>
      <button type="button" onClick={() => dispatch({ type: 'increment' })}>
        +
      </button>
      <button type="button" onClick={() => dispatch({ type: 'reset' })}>
        r
      </button>
    </>
  );
};
// reducer  函数应该写在组件外， 否则会渲染两次
const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [...state, { name: action.val, id: action.num }];
    case 'del':
      return state.filter((item) => item.id !== action.val);
    default:
      return [];
  }
};

const Page = () => {
  const [num, setNum] = useState(0);
  // const [list, setList] = useState([])
  // const onAdd = (val) => {
  //     const newList = [...list];
  //     newList.push({ name: val, id: num });
  //     setNum(num + 1)
  //     setList(newList);
  // }
  // const onDele = (id) => {
  //     console.log(id, list)
  //     const newList = list.filter(item => item.id !== id);
  //     setList(newList);
  // }

  const [listReducer, dispatch] = useReducer(reducer, []);
  console.log(listReducer);

  return (
    <div>
      <Todo
        list={listReducer}
        onAdd={(val) => {
          dispatch({ type: 'add', val, num });
          setNum(num + 1);
        }}
        onDele={(val) => dispatch({ type: 'del', val })}
      />
      <Counter />
      <h1>计时器</h1>
      <TimerCounter />
      <TimerCounter />
    </div>
  );
};

export default Page;

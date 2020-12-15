import React, { useReducer, useRef } from 'react';

// 实现一个计时器
interface Action {
  type: 'tick' | 'stop' | 'reset' | 'step' | undefined;
  payload?: {
    startTime?: number; // seconend
    step: number;
  };
}
interface State {
  second: number;
  string: String;
  step: number;
}
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

const initialState = {
  second: 0,
  string: '00:00:00',
  step: 1,
};

const reducer = (state: State, action: Action) => {
  const { second, step, string } = state;
  const { type, payload } = action;

  const count = second + step;
  const newData = secondToDate(count);
  const newString = newData.string;

  let data = null;
  if (type === 'tick') {
    data = { second: count, step, string: newString };
  } else if (type === 'step') {
    data = { second, step: payload?.step, string };
  } else if (type === 'reset') {
    data = initialState;
  }
  return data;
};

const TimerCounter = () => {
  const [timerData, disPatch] = useReducer(reducer, initialState);
  const { string } = timerData;
  const timerRef = useRef();
  // 停止计时器
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };
  // 开启计时器
  const startTimer = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(function () {
      disPatch({ type: 'tick' });
    }, 1000);
  };
  // 重置计时器
  const resetTimer = () => {
    stopTimer();
    disPatch({
      type: 'reset',
    });
  };

  return (
    <div>
      <span>{string}</span>
      <button type="button" onClick={resetTimer}>
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
  return <TimerCounter />;
};

export default Counter;

import { Select } from 'antd';
import React, { useContext, useEffect, useState } from 'react';

const { Option } = Select;
const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};
//  默认 light
const myContext = React.createContext(themes.light);

const Child = () => {
  useEffect(() => {
    console.log('child 被渲染了');
  });
  const { foreground, background } = useContext(myContext) || {};
  return <div style={{ background, color: foreground }}>child</div>;
};

const UseContextFn = () => {
  useEffect(() => {
    console.log('useContextFn 被渲染了');
  });
  const [theme, setTheme] = useState('light');
  // 主题切换

  return (
    <myContext.Provider value={themes[theme || 'light']}>
      <Child />
      <Select value={theme} onChange={(val) => setTheme(val || 'light')}>
        {Object.keys(themes).map((item) => (
          <Option value={item}>{item}</Option>
        ))}
      </Select>
    </myContext.Provider>
  );
};

// 用途 很多不同层级的组件需要访问不同的数据
// 劣势 组件的可复用行差，
// 有的时候可以传递一个组件 通过使用

// Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。
// 多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。

export default UseContextFn;

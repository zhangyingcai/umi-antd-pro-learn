import React, { useReducer, useState } from 'react';
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
    </div>
  );
};

export default Page;

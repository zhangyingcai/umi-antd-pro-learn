import React, { useEffect, useState } from 'react';
import { Input } from 'antd';

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

  return (
    <React.Fragment>
      <Input type="text" onChange={handleChange} />
      <span>{title}</span>
    </React.Fragment>
  );
};

export default Page;

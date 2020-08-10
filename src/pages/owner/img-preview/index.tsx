import React, { useState } from 'react';
import { Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ImgPreview from '@/components/ImgPreview';
import logo from '@/assets/logo.svg';

const ImgPreviewView: React.FC = () => {
  const [previewSrc, setPreviewSrc] = useState<string>('');

  const handleClose = () => {
    setPreviewSrc('');
  };

  const handleShow = () => {
    setPreviewSrc(logo);
  };

  return (
    <PageHeaderWrapper>
      <p>图片弹框组件</p>
      <Button onClick={handleShow}>显示</Button>
      {previewSrc && <ImgPreview src={previewSrc} handleClose={handleClose} />}
    </PageHeaderWrapper>
  );
};

export default ImgPreviewView;

import React, { useState } from 'react';
import { Button, Form, InputNumber } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const NumberForm: React.FC = () => {
  const [form] = Form.useForm();
  const [formatterSwitch, setFormatterSwitch] = useState(false);
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 10 },
    },
  };

  const submitFormLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 10, offset: 7 },
    },
  };

  const onFinish = (values: { [key: string]: any }) => {
    console.log(values);
  };

  const onBlur = () => {
    setFormatterSwitch(true);
  };

  const onFocus = () => {
    setFormatterSwitch(false);
  };

  const onformatter = (value) => {
    if (formatterSwitch) {
      return `${value}袋米扛几楼`;
    }
    return value;
  };

  return (
    <PageHeaderWrapper>
      <Form form={form} onFinish={onFinish}>
        <p>应用场景：数字输入框含有特定字符。</p>
        <Form.Item {...formItemLayout} label="test" name="test">
          <InputNumber
            // style={{ width: '100%' }}
            formatter={(value) => `${value}袋米扛几楼`}
            // parser={(value) => value.replace('袋米扛几楼', '')}
          />
        </Form.Item>
        <Form.Item {...formItemLayout} label="test" name="test">
          <InputNumber
            onBlur={onBlur}
            onFocus={onFocus}
            formatter={onformatter}
            // parser={(value) => value.replace('袋米扛几楼', '')}
          />
        </Form.Item>
        <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
          <Button style={{ marginLeft: 8 }}>取消</Button>
        </Form.Item>
      </Form>
    </PageHeaderWrapper>
  );
};

export default NumberForm;

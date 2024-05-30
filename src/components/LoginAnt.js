import React from "react";
import { Button, Form, Input } from "antd";

const LoginAnt = ({ onSubmit, onError, loading }) => (
  <Form
    name="login"
    className="w-full"
    layout="vertical"
    labelCol={{
      span: 24,
    }}
    wrapperCol={{
      span: 24,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onSubmit}
    onFinishFailed={onError}
    autoComplete="off"
  >
    <Form.Item
      label="E-Mail"
      name="email"
      type="email"
      rules={[
        { type: "email" },
        {
          required: true,
          message: "Please input your email!",
        },
      ]}
    >
      <Input size="large" />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: "Please input your password!",
        },
      ]}
    >
      <Input.Password size="large" />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        span: 24,
      }}
    >
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        className="w-full"
        loading={loading}
      >
        Login
      </Button>
    </Form.Item>
  </Form>
);
export default LoginAnt;

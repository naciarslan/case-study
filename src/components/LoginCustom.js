import React from "react";
import { Button, Input } from "antd";
import useFormValidation from "../hooks/useFormValidation";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const LoginCustom = ({ onSubmit, loading }) => {
  const initialState = {
    email: "",
    password: "",
  };

  const validationRules = {
    email: [
      {
        validate: (value) => value.trim() !== "",
        message: "Email is required",
      },
      {
        validate: (value) => /\S+@\S+\.\S+/.test(value),
        message: "Email is invalid",
      },
    ],
    password: [
      {
        validate: (value) => value.trim() !== "",
        message: "Password is required",
      },
    ],
  };

  const { values, errors, handleChange, validate } = useFormValidation(
    initialState,
    validationRules
  );

  const first = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      onSubmit(event);
    }
  };

  return (
    <form onSubmit={first}>
      <div className="mb-6">
        <label htmlFor="email" className="block mb-2">
          Email
        </label>
        <Input
          id="email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          className="w-full"
          size="large"
        />
        {errors.email && (
          <div className="text-red-500 mt-1">{errors.email}</div>
        )}
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block mb-2">
          Password
        </label>
        <Input.Password
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          className="w-full"
          size="large"
        />
        {errors.password && (
          <div className="text-red-500 mt-1">{errors.password}</div>
        )}
      </div>

      <Button
        type="primary"
        className="w-full"
        htmlType="submit"
        size="large"
        loading={loading}
      >
        {loading ? "Loading..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginCustom;

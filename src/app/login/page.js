"use client";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useFormValidation from "../../hooks/useFormValidation";
import LoginAnt from "@/components/LoginAnt";
import LoginCustom from "@/components/LoginCustom";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const antSubmit = ({ email, password }) => {
    signInAction(email, password);
  };

  const onCustomSubmit = async (event) => {
    signInAction(event.target.email.value, event.target.password.value);
  };

  const signInAction = async (email, password) => {
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);
    if (result.error) {
      message.error("Invalid email or password!");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="md:flex items-center justify-center h-screen bg-gray-100 gap-4">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-3xl font-bold mb-6">Login Custom </h2>
        <LoginCustom onSubmit={onCustomSubmit} loading={loading} />
      </div>

      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-3xl font-bold mb-6">Login Ant </h2>
        <LoginAnt onSubmit={antSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default Login;

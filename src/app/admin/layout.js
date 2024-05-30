"use client";
import { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Avatar, Button, ConfigProvider, Flex } from "antd";
import Link from "next/link";
import DashboardMenu from "../../components/DashboardMenu";
import { signOut, useSession } from "next-auth/react";
import {
  CloseOutlined,
  MenuOutlined,
  PoweroffOutlined,
  RightCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { usePathname } from "next/navigation";

const AdminLayout = ({ children }) => {
  const pathname = usePathname();
  const [width] = useWindowSize();
  const { data: session } = useSession();
  const [isMenuOpened, setIsMenuOpened] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  useEffect(() => {
    setIsMenuOpened(width > 1024);
  }, [width]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    if (width < 1024) setIsMenuOpened(false);
  }, [pathname]);

  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          token: {
            activeBarBorderWidth: 0,
          },
        }}
      >
        <div className="w-full h-screen bg-gray-100 pt-20 pb-6">
          <header className="bg-white p-4 fixed top-0 w-full h-16 z-10 shadow-md md:shadow-none">
            <Flex wrap gap="small" align="center" justify="space-between">
              <Flex wrap gap="small" align="center">
                <span className="md:hidden">
                  <Button
                    icon={isMenuOpened ? <CloseOutlined /> : <MenuOutlined />}
                    onClick={toggleMenu}
                  />
                </span>
                <Link href="/admin" className="text-black">
                  <h1 className="font-bold">LOGO</h1>
                </Link>
              </Flex>

              <Flex wrap gap="small" align="center">
                <Avatar size={32} icon={<UserOutlined />} />
                <span>Hi, {session?.user?.name}</span>
                <Button
                  shape="circle"
                  type="primary"
                  icon={<PoweroffOutlined />}
                  onClick={handleLogout}
                  danger
                />
              </Flex>
            </Flex>
          </header>
          <div className="md:flex items-start gap-4 justify-between md:h-full">
            <div
              className={`bg-white md:h-full md:rounded-tr-lg md:rounded-br-lg relative transition-all ease-in-out ${
                isMenuOpened ? "lg:w-1/6 w-full p-4" : "lg:w-0 h-0 p-0 md:p-4"
              }`}
            >
              <button
                className={`hidden md:block absolute top-8 right-0 -mr-2 rounded-full text-xl w-5 h-5 p-0 bg-white leading-none ease-in-out transition-all ${
                  !isMenuOpened && "rotate-180"
                }`}
                onClick={toggleMenu}
              >
                <RightCircleOutlined />
              </button>
              <div className="h-full overflow-scroll">
                <DashboardMenu />
              </div>
            </div>
            <div className="content bg-white h-full overflow-scroll p-4 md:rounded-tl-lg md:rounded-bl-lg transition-all ease-in-out w-full">
              {children}
            </div>
          </div>
          <footer className="text-center md:fixed bottom-0 w-full left-0 text-xs">
            © All rights reserverd. {new Date().getFullYear()}
          </footer>
        </div>
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default AdminLayout;

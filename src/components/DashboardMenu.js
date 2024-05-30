import { PieChartOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardMenu = () => {
  const pathName = usePathname();

  const items = [
    {
      key: "/admin",
      label: <Link href="/admin">Charts</Link>,
      icon: <PieChartOutlined />,
    },
    {
      key: "/admin/list",
      label: <Link href="/admin/list">List</Link>,
      icon: <UnorderedListOutlined />,
    },
  ];
  return (
    <Menu
      selectedKeys={[pathName]}
      mode="vertical"
      theme="light"
      items={items}
    />
  );
};

export default DashboardMenu;

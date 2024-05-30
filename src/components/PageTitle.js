import { ArrowLeftOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import Link from "next/link";

const PageTitle = ({ title, backTo }) => {
  return (
    <div className="flex gap-2 items-center justify-start">
      {backTo && (
        <Link href={backTo} className="mb-3">
          <ArrowLeftOutlined />
        </Link>
      )}
      <Title level={4}>{title}</Title>
    </div>
  );
};

export default PageTitle;

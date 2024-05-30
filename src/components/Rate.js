import { Card, Tag } from "antd";
import Title from "antd/es/typography/Title";

const Rate = ({ percent, value, title, direction }) => {
  return (
    <Card title={title}>
      <Title>{value}</Title>
      <Tag color={direction == 1 ? "red" : direction == 2 ? "green" : "blue"}>
        {percent}
      </Tag>
    </Card>
  );
};

export default Rate;

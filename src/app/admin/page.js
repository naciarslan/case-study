"use client";
import PageTitle from "@/components/PageTitle";
import { Bar, Line, Pie } from "@ant-design/charts";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Space, Statistic, Tag } from "antd";

const mockData = [
  { title: "Total User Count", value: 1100 },
  { title: "Daily Visitor Count", value: 400 },
  { title: "Sales Amount", value: 10000 },
];

const Dashboard = () => {
  return (
    <div>
      <PageTitle title="Charts" />

      <Row gutter={[16, 16]}>
        {mockData.map((item, index) => {
          let change = 0;
          switch (index) {
            case 0:
              change = 10;
              break;
            case 1:
              change = -20;
              break;
            default:
              change = 0;
          }
          return (
            <Col xs={24} sm={24} md={8} key={index}>
              <Card>
                <Statistic title={item.title} value={item.value} />
                <Space>
                  {change > 0 ? (
                    <Tag color="green">
                      <ArrowUpOutlined />
                      {change.toFixed(2)}%
                    </Tag>
                  ) : change < 0 ? (
                    <Tag color="red">
                      <ArrowDownOutlined />
                      {Math.abs(change).toFixed(2)}%
                    </Tag>
                  ) : (
                    <Tag color="blue">Stable</Tag>
                  )}
                </Space>
              </Card>
            </Col>
          );
        })}
        <Col xs={24} sm={24} md={8}>
          <Card>
            <Line
              data={[
                { year: "1991", value: 3 },
                { year: "1992", value: 4 },
                { year: "1993", value: 3.5 },
                { year: "1994", value: 5 },
                { year: "1995", value: 4.9 },
                { year: "1996", value: 6 },
                { year: "1997", value: 7 },
                { year: "1998", value: 9 },
                { year: "1999", value: 13 },
              ]}
              xField="year"
              yField="value"
              width={400}
              height={300}
              autoFit
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card>
            <Pie
              data={[
                { type: "A", value: 27 },
                { type: "B", value: 25 },
                { type: "C", value: 18 },
                { type: "D", value: 15 },
                { type: "E", value: 10 },
              ]}
              angleField="value"
              colorField="type"
              width={400}
              height={300}
              autoFit
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card>
            <Bar
              data={[
                { year: "1991", value: 4 },
                { year: "1992", value: 3 },
                { year: "1993", value: 2.5 },
                { year: "1994", value: 4 },
                { year: "1995", value: 3.9 },
                { year: "1996", value: 5 },
                { year: "1997", value: 6 },
                { year: "1998", value: 8 },
                { year: "1999", value: 12 },
              ]}
              xField="year"
              yField="value"
              width={400}
              height={300}
              autoFit
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

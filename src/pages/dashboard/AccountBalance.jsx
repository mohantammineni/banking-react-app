import React from "react";
import { Card, Select, Typography, Row, Col } from "antd";
import "./AccountBalance.css";

const { Text, Title } = Typography;
const { Option } = Select;

const AccountBalance = ({ userData, balance }) => {
  console.log(balance)
  return (
    <Card title="Account Balance & Clearing" className="dashboard-card">
      <Row className="balance-row" align="middle" justify="space-between">
        <Col span={6} className="balance-column">
          <Select disabled defaultValue={userData.account_number} className="dashboard-select" >
            <Option value={userData.account_number}>
              {userData.account_number}
            </Option>
          </Select>
        </Col>
        <Col span={6} className="balance-column">
          <Text className="balance-label">Total Balance</Text>
          <Title level={4} className="balance-value positive-balance">
          ${balance?.total_balance || "Loading..."}
          </Title>
        </Col>
        <Col span={6} className="balance-column">
          <Text className="balance-label">Available Balance</Text>
          <Title level={4} className="balance-value positive-balance">
          ${balance?.available_balance || "Loading..."}
          </Title>
        </Col>
        <Col span={6} className="balance-column">
          <Text className="balance-label">Reserved for Cheques</Text>
          <Title level={4} className="balance-value neutral-balance">
            $0.00
          </Title>
        </Col>
      </Row>
    </Card>
  );
};

export default AccountBalance;

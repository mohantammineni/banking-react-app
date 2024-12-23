import React from "react";
import { Card, Col, Row, Typography } from "antd";

const { Text } = Typography;

const AccountDetails = ({ data }) => {
  return (
    <Card title="Account Details" className="profile-card">
      <Row gutter={16}>
        <Col span={12} className="profile-col">
          <Text className="profile-label">Account Holder Name:</Text>
          <Text>{data.user_name}</Text>
        </Col>
        <Col span={12} className="profile-col">
          <Text className="profile-label">Account No:</Text>
          <Text>{data.account_number}</Text>
        </Col>
        <Col span={12} className="profile-col">
          <Text className="profile-label">Branch:</Text>
          <Text>GENEVA</Text> {/* Static since not in provided data */}
        </Col>
        <Col span={12} className="profile-col">
          <Text className="profile-label">Account Type:</Text>
          <Text>Corporate</Text> {/* Static since not in provided data */}
        </Col>
        <Col span={12} className="profile-col">
          <Text className="profile-label">SWIFT Code:</Text>
          <Text>DUBACHGG</Text> {/* Static since not in provided data */}
        </Col>
      </Row>
    </Card>
  );
};

export default AccountDetails;

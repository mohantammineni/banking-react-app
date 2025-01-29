import React from "react";
import { Card, Col, Row, Typography } from "antd";

const { Text } = Typography;

const AccountDetails = ({ data }) => {
  return (
    <Card title="Account Details" className="profile-card">
      <Row gutter={16}>
        <Col span={12} className="profile-col">
          <Text className="profile-label">Account Holder Name:</Text>
          <Text className="font-bold">{data?.user_name}</Text>
        </Col>
        <Col span={12} className="profile-col">
          <Text className="profile-label">Account No:</Text>
          <Text className="font-bold">{data?.account_number}</Text>
        </Col>
        <Col span={12} className="profile-col">
          <Text className="profile-label">Branch:</Text>
          <Text className="font-bold">{data?.branch}</Text> 
        </Col>
        <Col span={12} className="profile-col">
          <Text className="profile-label">Account Type:</Text>
          <Text className="font-bold">{data?.account_type}</Text> 
        </Col>
        <Col span={12} className="profile-col">
          <Text className="profile-label">SWIFT Code:</Text>
          <Text className="font-bold">{data?.swift_code}</Text> 
        </Col>
        <Col span={12} className="profile-col">
          <Text className="profile-label">Bank:</Text>
          <Text className="font-bold">{data?.bank}</Text> 
        </Col>
        <Col span={12} className="profile-col">
          <Text className="profile-label">Card No:</Text>
          <Text className="font-bold">{data?.cardno}</Text> 
        </Col>
      </Row>
    </Card>
  );
};

export default AccountDetails;

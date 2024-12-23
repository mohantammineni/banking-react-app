import React from "react";
import { Card, Col, Row, Typography } from "antd";

const { Text } = Typography;

const UserProfile = ({ data }) => {
  return (
    <Card title="User Profile" className="profile-card">
      <Row gutter={16}>
        <Col span={12} className="profile-col">
          <Text className="profile-label">User ID:</Text>
          <Text>{data.user_id}</Text>
        </Col>
        <Col span={12} className="profile-col">
          <Text className="profile-label">Application No:</Text>
          <Text>{data.application_no}</Text>
        </Col>
        <Col span={12} className="profile-col">
          <Text className="profile-label">User Type:</Text>
          <Text>{data.user_type}</Text>
        </Col>
        <Col span={12} className="profile-col">
          <Text className="profile-label">Password:</Text>
          <Text>***</Text>
        </Col>
        <Col span={12} className="profile-col">
          <Text className="profile-label">Joining Date:</Text>
          <Text>{data.joining_date}</Text>
        </Col>
        <Col span={12} className="profile-col">
          <Text className="profile-label">DOB:</Text>
          <Text>{data.dob}</Text>
        </Col>
        <Col span={12} className="profile-col">
          <Text className="profile-label">Name:</Text>
          <Text>{data.user_name}</Text>
        </Col>
        <Col span={12} className="profile-col">
          <Text className="profile-label">Mobile No:</Text>
          <Text>{data.mobile_no}</Text>
        </Col>
      </Row>
    </Card>
  );
};

export default UserProfile;

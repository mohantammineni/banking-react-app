import React from "react";
import { Card, Col, Row, Typography, Avatar } from "antd";

const { Text } = Typography;

const PhotoDetails = () => {
  return (
    <Card title="Photo Details" className="profile-card">
      <Row gutter={16}>
        <Col span={12} className="profile-col">
          <Text className="profile-label">Profile Photo:</Text>
          <Avatar size={64} src="https://via.placeholder.com/150" />
        </Col>
        <Col span={12} className="profile-col">
          <Text className="profile-label">Approval Status:</Text>
          <Text strong style={{ color: "green" }}>
            Approved
          </Text>
        </Col>
      </Row>
    </Card>
  );
};

export default PhotoDetails;

import React from "react";
import { Card, Col, Row, Typography } from "antd";

const { Text } = Typography;

const NomineeDetails = () => {
  return (
    <Card title="Nominee Details" className="profile-card">
      <Row gutter={16}>
        <Col span={12} className="profile-col">
          <Text className="profile-label">Nominee Name:</Text>
          <Text>John Doe</Text>
        </Col>
        <Col span={12} className="profile-col">
          <Text className="profile-label">Relation:</Text>
          <Text>Brother</Text>
        </Col>
        <Col span={12} className="profile-col">
          <Text className="profile-label">DOB:</Text>
          <Text>01/01/1990</Text>
        </Col>
      </Row>
    </Card>
  );
};

export default NomineeDetails;

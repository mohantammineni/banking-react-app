import React from "react";
import { Card, Col, Row, Typography } from "antd";

const { Text } = Typography;

const NomineeDetails = ({data}) => {
  return (
    <Card title="Nominee Details" className="profile-card">
      <Row gutter={16}>
        <Col span={8} className="profile-col">
          <Text className="profile-label">Nominee Name:</Text>
          <Text className="font-bold">{data?.nominee_name}</Text>
        </Col>
        <Col span={8} className="profile-col">
          <Text className="profile-label">Relation:</Text>
          <Text className="font-bold">{data?.nominee_relation}</Text>
        </Col>
        <Col span={8} className="profile-col">
          <Text className="profile-label">DOB:</Text>
          <Text className="font-bold">{data?.nominee_dob}</Text>
        </Col>
      </Row>
    </Card>
  );
};

export default NomineeDetails;

import React from "react";
import { Card, Col, Row, Typography } from "antd";

const { Text } = Typography;

const UserProfile = ({ data }) => {
  console.log(data)
  return (
    <Card title="User Profile" className="profile-card">
      <Row gutter={16}>
        <Col span={8} className="profile-col">
          <Text className="profile-label">User ID:</Text>
          <Text className="font-bold">{data.user_id}</Text>
        </Col>
        <Col span={8} className="profile-col">
          <Text className="profile-label">Application No:</Text>
          <Text className="font-bold">{data.application_no}</Text>
        </Col>
        
        <Col span={8} className="profile-col">
          <Text className="profile-label">Password:</Text>
          <Text className="font-bold">***</Text>
        </Col>
        <Col span={8} className="profile-col">
          <Text className="profile-label">User Type:</Text>
          <Text className="font-bold">{data.user_type}</Text>
        </Col>
        
        <Col span={8} className="profile-col">
          <Text className="profile-label">DOB:</Text>
          <Text className="font-bold">{data.dob}</Text>
        </Col>
        <Col span={8} className="profile-col">
          <Text className="profile-label">Email Id:</Text>
          <Text className="font-bold">{data?.email}</Text>
        </Col>
        <Col span={8} className="profile-col">
          <Text className="profile-label">Joining Date:</Text>
          <Text className="font-bold">{data.joining_date}</Text>
        </Col>
        <Col span={8} className="profile-col">
          <Text className="profile-label">Id Proof:</Text>
          <Text className="font-bold">{data?.idproof}</Text>
        </Col>
        <Col span={8} className="profile-col">
          <Text className="profile-label">Address Proof:</Text>
          <Text className="font-bold">{data?.addressproof}</Text>
        </Col>
        <Col span={8} className="profile-col">
          <Text className="profile-label">Name:</Text>
          <Text className="font-bold">{data.user_name}</Text>
        </Col>
        <Col span={8} className="profile-col">
          <Text className="profile-label">Address:</Text>
          <Text className="font-bold">{data?.address}</Text>
        </Col>
        <Col span={8} className="profile-col">
          <Text className="profile-label">Address Proof No:</Text>
          <Text className="font-bold">{data?.addressproofno}</Text>
        </Col>
        <Col span={8} className="profile-col">
          <Text className="profile-label">Gender:</Text>
          <Text className="font-bold">{data?.gender}</Text>
        </Col>
        <Col span={8} className="profile-col">
          <Text className="profile-label">Country Name:</Text>
          <Text className="font-bold">{data?.country}</Text>
        </Col>
        <Col span={8} className="profile-col">
          <Text className="profile-label">Pan No:</Text>
          <Text className="font-bold">{data?.panno}</Text>
        </Col>
        <Col span={8} className="profile-col">
          <Text className="profile-label">Mobile No:</Text>
          <Text className="font-bold">{data.mobileno}</Text>
        </Col>
        <Col span={8} className="profile-col">
          <Text className="profile-label">City Name:</Text>
          <Text className="font-bold">{data?.city}</Text>
        </Col>
        <Col span={8} className="profile-col">
          <Text className="profile-label">Landmark:</Text>
          <Text className="font-bold">{data?.landmark}</Text>
        </Col>
        <Col span={8} className="profile-col">
          <Text className="profile-label">State:</Text>
          <Text className="font-bold">{data?.state}</Text>
        </Col>
        <Col span={8} className="profile-col">
          <Text className="profile-label">Pincode:</Text>
          <Text className="font-bold">{data?.pincode}</Text>
        </Col>
      </Row>
    </Card>
  );
};

export default UserProfile;

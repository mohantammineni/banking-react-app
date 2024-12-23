import React from "react";
import { Card, Typography } from "antd";

const { Text } = Typography;

const Approvals = () => {
  return (
    <Card title="Approvals" className="dashboard-card">
      <div>
        <Text>Tax / CMS Approvals: </Text>
        <Text strong>(0)</Text>
      </div>
      <div>
        <Text>Pending Transactions: </Text>
        <Text strong>(0.00)</Text>
      </div>
      <div>
        <Text>Rejected Transactions: </Text>
        <Text strong>(0.00)</Text>
      </div>
      <div>
        <Text>Approved Transactions: </Text>
        <Text strong>(0.00)</Text>
      </div>
    </Card>
  );
};

export default Approvals;

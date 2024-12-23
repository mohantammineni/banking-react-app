import React from "react";
import { Tabs } from "antd";
import AddBeneficiary from "./AddBeneficiary";
import ViewBeneficiary from "./ViewBeneficiary";

const { TabPane } = Tabs;

const ManagePayee = () => {
  return (
    <div>
        <h1>Manage Payee</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Add Beneficiary" key="1">
          <AddBeneficiary />
        </TabPane>
        <TabPane tab="View Beneficiary" key="2">
          <ViewBeneficiary />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ManagePayee;

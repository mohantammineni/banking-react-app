import React, { useState, useEffect } from "react";
import { Table, Button, Space, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const ViewBeneficiary = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBeneficiaries = async () => {
    try {
      const loginId = JSON.parse(localStorage.getItem("userData"))?.id;
      if (!loginId) {
        message.error("Login ID not found. Please login again.");
        return;
      }

      const response = await axios.get(
        `https://avinashdevineni.in/bank/getAllBeneficiaries.php?login_id=${loginId}`
      );
      if (response.data.code === 200) {
        const formattedData = response.data.beneficiaries.map((item) => ({
          key: item.id,
          name: item.beneficiary_name,
          accountNumber: item.beneficiary_account_no,
          ifscCode: item.beneficiary_ifsc,
          swiftCode: item.beneficiary_swift,
          accountType: item.beneficiary_account_type,
        }));
        setBeneficiaries(formattedData);
      } else {
        message.error("Failed to fetch beneficiaries.");
      }
    } catch (error) {
      console.error("Error fetching beneficiaries:", error);
      message.error("An error occurred while fetching beneficiaries.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBeneficiary = async (key) => {
    Modal.confirm({
      title: "Are you sure you want to delete this beneficiary?",
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        try {
          const response = await axios.post(
            "https://avinashdevineni.in/bank/deleteBeneficiary.php",
            { id: key }
          );
  
          if (response.data.code === 200) {
            setBeneficiaries((prev) => prev.filter((item) => item.key !== key));
            message.success("Beneficiary Deleted Successfully");
          } else {
            message.error(response.data.message || "Failed to delete beneficiary.");
          }
        } catch (error) {
          console.error("Error deleting beneficiary:", error);
          message.error("An error occurred while deleting the beneficiary.");
        }
      },
      onCancel: () => {
        message.info("Deletion cancelled.");
      },
    });
  };
  

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Account No", dataIndex: "accountNumber", key: "accountNumber" },
    { title: "IFSC Code", dataIndex: "ifscCode", key: "ifscCode" },
    { title: "SWIFT Code", dataIndex: "swiftCode", key: "swiftCode" },
    { title: "A/c Type", dataIndex: "accountType", key: "accountType" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            danger
            onClick={() => handleDeleteBeneficiary(record.key)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={beneficiaries}
      columns={columns}
      bordered
      pagination={{ pageSize: 5 }}
      size="small"
      loading={loading}
    />
  );
};

export default ViewBeneficiary;

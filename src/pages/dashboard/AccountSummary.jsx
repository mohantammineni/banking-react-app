import React, { useState, useEffect } from "react";
import { Card, Button, Select, Input, Space, Table, message } from "antd";
import axios from "axios";

const { Option } = Select;

const AccountSummary = ({ userData, fetchBalance }) => {
  const [transactions, setTransactions] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showTransactions, setShowTransactions] = useState(false);

  // Fetch Beneficiaries
  const fetchBeneficiaries = async () => {
    try {
      const loginId = userData?.id || JSON.parse(localStorage.getItem("userData")).id;

      const response = await axios.get(
        `https://avinashdevineni.in/bank/getAllBeneficiaries.php?login_id=${loginId}`
      );

      if (response.data.code === 200) {
        setBeneficiaries(response.data.beneficiaries || []);
      } else {
        message.error("Failed to fetch beneficiaries.");
      }
    } catch (error) {
      console.error("Error fetching beneficiaries:", error);
      message.error("An error occurred while fetching beneficiaries.");
    }
  };

  // Fetch Transactions
  const fetchTransactions = async () => {
    if (!fromDate || !toDate) {
      message.error("Please select both from and to dates.");
      return;
    }

    try {
      setLoading(true);
      const loginId = userData?.id || JSON.parse(localStorage.getItem("userData")).id;

      const response = await axios.get(
        `https://avinashdevineni.in/bank/getAllTransactions.php?login_id=${loginId}&from_date=${fromDate}&to_date=${toDate}`
      );

      if (response.data.code === 200) {
        const enrichedTransactions = response.data.transactions.map((transaction) => {
          const beneficiary = beneficiaries.find(
            (ben) => ben.id === transaction.beneficiary_id
          );
          return {
            ...transaction,
            beneficiary_name: beneficiary ? beneficiary.beneficiary_name : "Unknown",
          };
        });
        setTransactions(enrichedTransactions);
        setShowTransactions(true);
      } else {
        message.error(response.data.message || "Failed to fetch transactions.");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      message.error("An error occurred while fetching transactions.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Status Update
  const handleStatusUpdate = async (transactionId, status) => {
    try {
      const response = await axios.post(
        "https://avinashdevineni.in/bank/changeStatus.php",
        { transactionId: parseInt(transactionId, 10), status }
      );

      if (response.data.code === 200) {
        message.success("Status updated successfully!");
        // Update transaction status in the table
        setTransactions((prevTransactions) =>
          prevTransactions.map((transaction) =>
            transaction.id === transactionId
              ? { ...transaction, status } // Dynamically update status
              : transaction
          )
        );

        // Fetch updated balance
        fetchBalance();
      } else {
        message.error(response.data.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("An error occurred while updating status.");
    }
  };

  useEffect(() => {
    fetchBeneficiaries(); // Fetch beneficiaries on component mount
  }, []);

  const columns = [
    { title: "Transaction ID", dataIndex: "id", key: "id" },
    { title: "Transaction Posted Date", dataIndex: "created_at", key: "created_at" },
    { title: "Check No / Ref No", dataIndex: "check_ref_no", key: "check_ref_no" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Beneficiary", dataIndex: "beneficiary_name", key: "beneficiary_name" },
    { title: "Transaction Remarks", dataIndex: "remark", key: "remark" },
    {
      title: "Status",
      key: "status",
      render: (_, record) => {
        if (record.status === "0") {
          return <span style={{ color: "red" }}>Rejected</span>;
        } else if (record.status === "1") {
          return (
            <Select
              defaultValue="Pending"
              style={{ width: 120 }}
              onChange={(value) => {
                if (value === "Approve") {
                  handleStatusUpdate(record.id, "2"); // Approve (status = "2")
                } else if (value === "Reject") {
                  handleStatusUpdate(record.id, "0"); // Reject (status = "0")
                }
              }}
            >
              <Option value="Approve">Approve</Option>
              <Option value="Reject">Reject</Option>
            </Select>
          );
        } else if (record.status === "2") {
          return <span style={{ color: "green" }}>Settled</span>;
        }
        return null;
      },
    },
  ];

  return (
    <Card title="Account Summary" className="dashboard-card">
      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          flexWrap: "wrap",
        }}
        size="middle"
      >
        <Select
          defaultValue={userData.account_number}
          className="dashboard-select"
          style={{
            flex: "1 1 auto",
            minWidth: "180px",
          }}
          disabled
        >
          <Option value={userData.account_number}>
            {userData.account_number}
          </Option>
        </Select>

        <Input
          type="date"
          className="date-input"
          style={{ flex: "1 1 auto", minWidth: "160px" }}
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <Input
          type="date"
          className="date-input"
          style={{ flex: "1 1 auto", minWidth: "160px" }}
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <Button
          type="primary"
          className="view-statement-btn"
          style={{ flex: "0 1 auto", minWidth: "140px" }}
          onClick={fetchTransactions}
          loading={loading}
        >
          View Statement
        </Button>
      </Space>

      {showTransactions && (
        <div
          style={{
            marginTop: "20px",
            overflow: "hidden",
            transition: "max-height 0.3s ease-out",
          }}
        >
          <Table
            dataSource={transactions}
            columns={columns}
            rowKey="transaction_id"
            bordered
            pagination={{ pageSize: 5 }}
          />
        </div>
      )}
    </Card>
  );
};

export default AccountSummary;

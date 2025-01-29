import React, { useEffect, useState } from "react";
import { Row, Col, message } from "antd";
import AccountSummary from "./AccountSummary";
import AccountBalance from "./AccountBalance";
import Approvals from "./Approvals";
import CurrencyConverter from "./CurrencyConverter";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [balance, setBalance] = useState({ total_balance: "Loading...", available_balance: "Loading..." });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (storedData) {
      setUserData(storedData);
    } else {
      console.error("User data not found in localStorage");
    }
  }, []);

  const fetchBalance = async () => {
    if (!userData) return;

    try {
      const response = await axios.post(
        "https://avinashdevineni.in/bank/getBalance.php",
        { login_id: userData.id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.code === 200) {
        console.log("API Response:", response.data);
        setBalance({
          total_balance: response.data.total_balance,
          available_balance: response.data.available_balance,
        });
      } else {
        message.error(response.data.message || "Failed to fetch account balance.");
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
      message.error("An error occurred while fetching the account balance.");
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [userData]);

  console.log("Balance in Dashboard:", balance);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
        <Col xs={24}>
          <AccountBalance userData={userData} balance={balance} />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
        <Col xs={24}>
          <AccountSummary userData={userData} fetchBalance={fetchBalance} />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
        <Col xs={24}>
          <CurrencyConverter userData={userData} />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
        <Col xs={24}>
          <Approvals userData={userData} />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;


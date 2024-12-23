import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";
import axios from "axios";

const { Content } = Layout;

const AppLayout = () => {
  const [balance, setBalance] = useState({ total_balance: "0.00", available_balance: "0.00" });

  const fetchBalance = async (loginId) => {
    try {
      const response = await axios.post(
        "https://avinashdevineni.in/bank/getBalance.php",
        { login_id: loginId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.code === 200) {
        setBalance({
          total_balance: response.data.total_balance,
          available_balance: response.data.available_balance,
        });
      } else {
        console.error("Failed to fetch balance");
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.id) {
      fetchBalance(storedData.id);
    }
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <TopBar balance={balance} /> {/* Pass balance as a prop */}
        <Content style={{ margin: "16px" }}>
          <Outlet context={{ fetchBalance }} /> {/* Pass fetchBalance via context */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;

import React, { useEffect, useState } from "react";
import { Layout, Input, Dropdown, Menu, Avatar, Typography } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  DollarCircleOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import { useBalance } from "../context/BalanceContext";
import { useNavigate } from "react-router-dom";
import "./TopBar.css";

const { Header } = Layout;
const { Text } = Typography;

const TopBar = ({ balance }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
 
  const [userData, setUserData] = useState(null);

  console.log("Balance in TopBar:", balance);
  useEffect(() => {
    // Fetch user data from localStorage
    const storedData = JSON.parse(localStorage.getItem("userData"));
    setUserData(storedData);
  }, []);

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      logout();
    } else if (key === "profile") {
      navigate("/profile"); // Navigate to profile page
    } else if (key === "change-password") {
      navigate("/change-password"); // Navigate to change-password page
    }
  };

  const profileMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item
        key="account-balance"
        icon={<DollarCircleOutlined />}
        style={{ cursor: "default" }}
      >
        Account Balance:{" "}
        <strong>${balance?.total_balance || "0.00"}</strong> 
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="change-password" icon={<SettingOutlined />}>
        Change Password
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="topbar">
      {/* Search Bar */}
      <div className="topbar-search">
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          className="search-input"
        />
      </div>

      {/* Notification and Profile Actions */}
      <div className="topbar-actions">
        <BellOutlined className="topbar-icon" />

        <Dropdown overlay={profileMenu} placement="bottomRight">
          <div className="profile-container">
            <Avatar size="large" icon={<UserOutlined />} />
            <Text className="username">
              {userData?.user_name || "Guest"} {/* Display username dynamically */}
            </Text>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default TopBar;

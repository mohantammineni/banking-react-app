import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useNavigate, useLocation } from "react-router-dom";
import menuItems from "../config/menuConfig";
import "./Sidebar.css";
import LOGO from "../assets/logo.png";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentMenuKey = location.pathname;

  const handleMenuClick = ({ key }) => {
    navigate(`/${key}`);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={250}
      collapsedWidth={55}
      style={{
        backgroundColor: "#fff", // White Background
        borderRight: "1px solid #f0f0f0", // Subtle Border
        overflow: "hidden", // Prevent default scroll behavior
      }}
    >
     <div className="sidebar-logo">
          <img src={LOGO} alt="Logo" />
        </div>

      {/* Scrollable Menu */}
      
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          style={{ height: "calc(100vh - 64px)" }} // Adjust height to exclude top bar
        >
          <Menu
            mode="inline"
            selectedKeys={[currentMenuKey]}
            onClick={handleMenuClick}
            style={{
              border: "none",
              backgroundColor: "transparent",
            }}
          >
            {menuItems.map((item) =>
              item.subMenu ? (
                <Menu.SubMenu
                  key={item.key}
                  icon={item.icon && item.icon()}
                  title={item.label}
                >
                  {item.subMenu.map((subItem) => (
                    <Menu.Item key={`${item.key}/${subItem.key}`}>
                      {subItem.label}
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ) : (
                <Menu.Item key={item.key} icon={item.icon && item.icon()}>
                  {item.label}
                </Menu.Item>
              )
            )}
          </Menu>
        </Scrollbars>
   
    </Sider>
  );
};

export default Sidebar;

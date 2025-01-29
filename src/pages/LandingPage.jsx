import React from "react";
import { Button, Typography } from "antd";
import LOGO from "../assets/logo.png";
import CHIP from "../assets/chip.webp";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const LandingPage = () => {
    const navigate = useNavigate();
    const handleNavigateToLogin = () => {
        navigate("/login");
      };
    
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <img
          src={LOGO} 
          alt="Pictet Logo"
          style={styles.logo}
        />
      </header>
      <div style={styles.content}>
        <div style={styles.imageContainer}>
          <img
            src={CHIP}
            alt="Chip"
            style={styles.image}
          />
        </div>
        <div style={styles.textContainer}>
          <Title level={3} style={styles.title}>
            Select your portal
          </Title>
          <Button type="primary" style={styles.button} onClick={handleNavigateToLogin}>
        PICTET CONNECT
      </Button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  header: {
    padding: "10px 70px",
    borderBottom: "1px solid #eaeaea",
  },
  logo: {
    height: 40,
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    padding: "0 50px",
  },
  imageContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
  },
  image: {
    maxWidth: "300px",
    height: "auto",
  },
  textContainer: {
    flex: 1,
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginBottom: 20,
    fontSize: "24px",
    color: "#333",
  },
  button: {
    backgroundColor: "#8B5B53",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    height:60,
  },
};

export default LandingPage;

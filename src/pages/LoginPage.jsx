import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { useAuth } from "../context/AuthContext";

const { Title } = Typography;

const LoginPage = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    const payload = {
      user_name: values.loginId,
      password: values.password,
    };
  
    setLoading(true);
  
    try {
      const response = await fetch("https://avinashdevineni.in/bank/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (response.ok && data.code === 200 && data.message) {
        const user = data.message; // The user data from the response
        const token = user.user_id; // Extract token from `user_id`
  
        // Store the token and user data explicitly
        localStorage.setItem("authToken", token);
        localStorage.setItem("userData", JSON.stringify(user));
  
        message.success("Login successful! Redirecting...");
        login(); // Redirect to the dashboard
      } else {
        message.error(data.message || "Invalid login credentials.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      message.error("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  
  

  return (
    <div style={styles.container}>
      <Card style={styles.card} bordered={true}>
        <Title level={2} style={styles.title}>
          Welcome
        </Title>
        <Form layout="vertical" onFinish={handleLogin} style={styles.form}>
          <Form.Item
            label="Login ID"
            name="loginId"
            rules={[{ required: true, message: "Please enter your Login ID!" }]}
          >
            <Input placeholder="Enter your Login ID" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              shape="round"
              htmlType="submit"
              block
              loading={loading}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eff4fb",
  },
  card: {
    width: 400,
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    marginTop: "10px",
  },
};

export default LoginPage;

import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { useAuth } from "../context/AuthContext";

const { Title } = Typography;

const LoginPage = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // Step state (1 for Login ID, 2 for Password, 3 for Auth Code)
  const [loginId, setLoginId] = useState(""); // State to store loginId
  const [form] = Form.useForm(); // Ant Design form instance

  const handleNext = async () => {
    try {
      const values = await form.validateFields(["loginId"]);
      setLoginId(values.loginId); // Save loginId to state
      setStep(2); // Move to step 2
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const values = await form.validateFields(["password"]);
      const payload = {
        user_name: loginId, // Use loginId from state
        password: values.password,
      };

      setLoading(true);

      const response = await fetch("https://avinashdevineni.in/bank/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (response.ok && data.code === 200 && data.message) {
        message.success("Password validated! Enter the authentication code.");
        const user = data.message;
        const token = data.message.id;
        console.log(user);
        console.log("token"+token);
        
        
        localStorage.setItem("authToken", token);
        localStorage.setItem("userData", JSON.stringify(user));

        setStep(3); // Move to step 3 for authentication code
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

  const handleAuthCode = async () => {
    try {
      const values = await form.validateFields(["authCode"]);
      if (values.authCode === "123456") {
        message.success("Authentication successful! Redirecting to the dashboard...");
        login(); // Redirect to the dashboard
      } else {
        message.error("Invalid authentication code.");
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <div style={styles.container}>
      
      <Card style={styles.card} bordered={true}>
      
      <Title level={2} style={styles.title}>
  <img src="/logo.png" alt="Logo" />
  <div style={{ fontFamily: 'Lardy Serif Regular", Georgia' }}>
    {step === 1 ? "Please Login" : `Welcome, ${loginId}`}
  </div>
</Title>
        <Form form={form} layout="vertical" style={styles.form}>
          {step === 1 && (
            <>
              <Form.Item
                name="loginId"
                rules={[{ required: true, message: "Please enter your Login ID!" }]}
              >
                <Input placeholder="Enter your Login ID" style={styles.input} />
              </Form.Item>
              <Form.Item shouldUpdate>
                {() => (
                  <Button
                    type="primary"
                    shape="round"
                    block
                    disabled={!form.getFieldValue("loginId")}
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                )}
              </Form.Item>
            </>
          )}

          {step === 2 && (
            <>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Please enter your password!" }]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  style={styles.input}
                />
              </Form.Item>
              <div style={styles.buttonRow}>
                <Button
                  type="default"
                  shape="round"
                  style={styles.button}
                  onClick={() => setStep(1)} // Move back to step 1
                >
                  Back
                </Button>
                <Button
                  type="primary"
                  shape="round"
                  htmlType="button"
                  style={styles.button}
                  loading={loading}
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <Form.Item
                name="authCode"
                rules={[{ required: true, message: "Please enter the authentication code!" }]}
              >
                <Input placeholder="Enter authentication code" style={styles.input} />
              </Form.Item>
              <div style={styles.buttonRow}>
                <Button
                  type="default"
                  shape="round"
                  style={styles.button}
                  onClick={() => setStep(2)} // Move back to step 2
                >
                  Back
                </Button>
                <Button
                  type="primary"
                  shape="round"
                  htmlType="button"
                  style={styles.button}
                  onClick={handleAuthCode}
                >
                  Submit
                </Button>
              </div>
            </>
          )}
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
    backgroundImage: "url('bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  button: {
    flex: 1,
  },
  card: {
    width: 400,
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#f5f3eb",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    marginTop: "10px",
  },
  input: {
    border: "none",
    borderBottom: "1px solid #d9d9d9",
    borderRadius: "0",
    boxShadow: "none",
    borderTop:".84375em solid transparent",
    background:"#f5f3eb"
  },
};

export default LoginPage;

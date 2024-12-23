import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import axios from "axios";
import "./index.css";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (values) => {
    setLoading(true);

    try {
      // API Request
      const response = await axios.post("http://127.0.0.1:8000/changepassword", {
        login_id: 1, // Hardcoded login_id, replace with dynamic user ID if available
        password: values.newPassword,
        old_password: values.currentPassword,
      });

      // Handle Success
      if (response.data.code === 200) {
        message.success(response.data.message || "Password updated successfully!");
        form.resetFields(); // Clear form fields after successful password reset
      } else {
        message.error(response.data.message || "Failed to update password.");
      }
    } catch (error) {
      // Handle Failure
      const errorMessage =
        error.response?.data?.message || "Failed to update password. Please try again.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFields = () => {
    form.resetFields();
  };

  return (
    <div className="change-password-container">
      <Card title="Change Password" className="change-password-card">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleResetPassword}
          className="change-password-form"
        >
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[
              { required: true, message: "Please enter your current password!" },
            ]}
          >
            <Input.Password placeholder="Enter current password" />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please enter your new password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>

          <Form.Item>
            <div className="button-group">
              <Button type="primary" htmlType="submit" loading={loading}>
                Reset Password
              </Button>
              <Button htmlType="button" onClick={handleClearFields} disabled={loading}>
                Clear
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ChangePassword;

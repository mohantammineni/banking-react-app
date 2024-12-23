import React from "react";
import { Form, Input, Button, Select, Row, Col, message } from "antd";
import axios from "axios";

const { Option } = Select;

const AddBeneficiary = () => {
  const [form] = Form.useForm();

  const handleAddBeneficiary = async (values) => {
    try {
      // Fetch login_id from localStorage
      const user = JSON.parse(localStorage.getItem("userData"));
      const loginId = user?.id || "defaultLoginId"; 
      console.log(loginId)

      // Send data to the API
      const response = await axios.post("https://avinashdevineni.in/bank/addBeneficiary.php", {
        beneficiary_name: values.name,
        beneficiary_account_no: values.accountNumber,
        beneficiary_ifsc: values.ifscCode,
        beneficiary_swift: values.swiftCode,
        beneficiary_account_type: values.accountType,
        login_id: loginId,
      });

      if (response.data.code === 200) {
        message.success(response.data.message || "Beneficiary Added Successfully!");
        form.resetFields(); // Clear the form on success
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to add beneficiary. Please try again.";
      message.error(errorMessage);
    }
  };

  const handleClearFields = () => {
    form.resetFields(); // Clear all form fields
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleAddBeneficiary}
      style={{ maxWidth: "800px", margin: "0 auto" }}
    >
      {/* First Row */}
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item
            label="Beneficiary Name"
            name="name"
            rules={[{ required: true, message: "Please enter name!" }]}
          >
            <Input placeholder="Beneficiary Name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Beneficiary A/c No."
            name="accountNumber"
            rules={[{ required: true, message: "Please enter account number!" }]}
          >
            <Input placeholder="Beneficiary Account Number" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Confirm Beneficiary A/c No."
            name="confirmAccountNumber"
            dependencies={["accountNumber"]}
            rules={[
              { required: true, message: "Please confirm account number!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("accountNumber") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Account numbers do not match!"));
                },
              }),
            ]}
          >
            <Input placeholder="Confirm Beneficiary Account Number" />
          </Form.Item>
        </Col>
      </Row>

      {/* Second Row */}
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item
            label="Beneficiary Bank IFSC Code"
            name="ifscCode"
            rules={[{ required: true, message: "Please enter IFSC code!" }]}
          >
            <Input placeholder="Beneficiary Bank IFSC Code" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Beneficiary Bank SWIFT Code"
            name="swiftCode"
            rules={[{ required: true, message: "Please enter SWIFT code!" }]}
          >
            <Input placeholder="Beneficiary Bank SWIFT Code" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Beneficiary Account Type"
            name="accountType"
            rules={[{ required: true, message: "Please select account type!" }]}
          >
            <Select placeholder="Select Account Type">
              <Option value="Savings">Savings</Option>
              <Option value="Current">Current</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* Buttons */}
      <Row justify="center" gutter={16}>
        <Col span={4}>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Col>
        <Col span={4}>
          <Button htmlType="button" onClick={handleClearFields} block danger>
            Reset
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddBeneficiary;

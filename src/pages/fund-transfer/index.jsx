import React, { useState, useEffect } from "react";
import { Card, Button, Select, Input, Typography, Space, Radio, Form, Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FundTransfer.css";

const { Option } = Select;
const { Text } = Typography;

const FundTransfer = () => {
  const navigate = useNavigate();
  const [paymentMode, setPaymentMode] = useState("SWIFT");
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Fetch Beneficiaries
  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("userData"));
        const loginId = user?.id;
        if (!loginId) {
          message.error("Login ID not found. Please log in again.");
          return;
        }

        const response = await axios.get(
          `https://avinashdevineni.in/bank/getAllBeneficiaries.php?login_id=${loginId}`
        );

        if (response.data.code === 200) {
          setBeneficiaries(response.data.beneficiaries);
        } else {
          message.error(response.data.message || "Failed to fetch beneficiaries.");
        }
      } catch (error) {
        console.error("Error fetching beneficiaries:", error);
        message.error("An error occurred while fetching beneficiaries.");
      }
    };

    fetchBeneficiaries();
  }, []);

  // Handle Fund Transfer
  const handleFundTransfer = async (values) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("userData"));
      const loginId = user?.id;
      if (!loginId) {
        message.error("Login ID not found. Please log in again.");
        return;
      }

      const payload = {
        login_id: String(loginId),
        beneficiary_id: values.beneficiary,
        amount: values.amount,
        remark: values.remarks,
        payment_mode: paymentMode,
      };

      const response = await axios.post("https://avinashdevineni.in/bank/createdTransaction.php", payload);

      if (response.data.code === 200) {
        message.success(response.data.message || "Transfer Successful!");
        form.resetFields(); // Clear form on success
      } else {
        message.error(response.data.message || "Failed to complete transfer.");
      }
    } catch (error) {
      console.error("Error processing transfer:", error);
      message.error("An error occurred while processing the transfer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Fund Transfer</h1>
      <Card className="fund-transfer-card">
        {/* Add Beneficiary Button */}
        <div className="add-beneficiary-section">
          <Button
            type="primary"
            style={{
              width: "150px",
              float: "right",
            }}
            onClick={() => navigate("/transfer-bill-pay/manage-payee")}
          >
            Add Beneficiary
          </Button>
        </div>

        {/* Account Details Section */}
        <Card className="account-details-card">
          <Space
            direction="horizontal"
            size="large"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Text strong>Corporate Account</Text>
              <br />
              <Text>911040830012</Text>
            </div>
            <div>
              <Text strong>Current Balance</Text>
              <br />
              <Text>$15,000,899,999.00</Text>
            </div>
          </Space>
        </Card>

        {/* Payment Mode Section */}
        <div className="payment-mode-section">
          <Radio.Group
            defaultValue="SWIFT"
            buttonStyle="solid"
            onChange={(e) => setPaymentMode(e.target.value)}
          >
            <Radio.Button value="SWIFT" className="payment-radio">
              Swift
            </Radio.Button>
            <Radio.Button value="WIRE" className="payment-radio">
              Wire
            </Radio.Button>
          </Radio.Group>
        </div>

        {/* Payment Details Section */}
        <Form layout="vertical" style={{ marginTop: "20px" }} form={form} onFinish={handleFundTransfer}>
          {/* Row for Select Beneficiary and Transfer Amount */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="beneficiary"
                label="Select Beneficiary"
                rules={[{ required: true, message: "Please select a beneficiary" }]}
              >
                <Select placeholder="Select Beneficiary" loading={loading}>
                  {beneficiaries.map((beneficiary) => (
                    <Option key={beneficiary.id} value={beneficiary.id}>
                      {beneficiary.beneficiary_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="amount"
                label="Transfer Amount ($)"
                rules={[{ required: true, message: "Please enter transfer amount" }]}
              >
                <Input placeholder="Enter amount" type="number" />
              </Form.Item>
            </Col>
          </Row>

          {/* Full-width Row for Remarks */}
          <Form.Item
            name="remarks"
            label="Remark"
            rules={[{ required: true, message: "Please enter a remark" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter remark" />
          </Form.Item>

          {/* Buttons Section */}
          <div className="button-section">
            <Space>
              <Button type="primary" htmlType="submit" className="transfer-btn" loading={loading}>
                Transfer Now
              </Button>
              <Button
                type="default"
                danger
                className="reset-btn"
                onClick={() => form.resetFields()}
              >
                Reset
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default FundTransfer;

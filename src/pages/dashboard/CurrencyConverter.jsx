import React, { useState, useEffect } from "react";
import { Card, Select, Input, Space, Typography, message } from "antd";
import { SwapOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Text } = Typography;

const countries = [
  { code: "USD", name: "United States Dollar", country: "United States" },
  { code: "EUR", name: "Euro", country: "European Union" },
  { code: "INR", name: "Indian Rupee", country: "India" },
  { code: "GBP", name: "British Pound", country: "United Kingdom" },
  { code: "AUD", name: "Australian Dollar", country: "Australia" },
  { code: "CAD", name: "Canadian Dollar", country: "Canada" },
  { code: "JPY", name: "Japanese Yen", country: "Japan" },
  { code: "CNY", name: "Chinese Yuan", country: "China" },
  { code: "CHF", name: "Swiss Franc", country: "Switzerland" },
  { code: "SGD", name: "Singapore Dollar", country: "Singapore" },
];

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [fromAmount, setFromAmount] = useState(1000);
  const [toAmount, setToAmount] = useState("");
  const [rates, setRates] = useState({});

  // Fetch real-time rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );
        const data = await response.json();
        setRates(data.rates);
        setToAmount((fromAmount * data.rates[toCurrency]).toFixed(2));
      } catch (error) {
        message.error("Failed to fetch exchange rates. Try again later.");
      }
    };

    fetchRates();
  }, [fromCurrency, toCurrency, fromAmount]);

  // Swap currencies
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <Card title="Currency Converter" className="currency-converter-card" style={{ borderRadius: "10px" }}>
      <Space
        direction="horizontal"
        size="middle"
        style={{ width: "100%", justifyContent: "space-between" }}
      >
        {/* From Currency */}
        <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <Input
            addonAfter={
              <Select
                value={fromCurrency}
                onChange={(value) => setFromCurrency(value)}
                style={{ border: "none", backgroundColor: "transparent" }}
                dropdownStyle={{ borderRadius: "8px" }}
              >
                {countries.map((country) => (
                  <Option key={country.code} value={country.code}>
                    {country.name}
                  </Option>
                ))}
              </Select>
            }
            placeholder="You Send"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            style={{
              borderRadius: "8px",
              border: "1px solid #d9d9d9",
              padding: "8px 12px",
              flex: 1,
            }}
          />
        </div>

        {/* Swap Icon */}
        <div>
          <SwapOutlined
            style={{
              fontSize: "24px",
              color: "#1890ff",
              cursor: "pointer",
            }}
            onClick={handleSwap}
          />
        </div>

        {/* To Currency */}
        <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <Input
            addonAfter={
              <Select
                value={toCurrency}
                onChange={(value) => setToCurrency(value)}
                style={{ border: "none", backgroundColor: "transparent" }}
                dropdownStyle={{ borderRadius: "8px" }}
              >
                {countries.map((country) => (
                  <Option key={country.code} value={country.code}>
                    {country.name}
                  </Option>
                ))}
              </Select>
            }
            placeholder="Recipient Gets"
            value={toAmount}
            readOnly
            style={{
              borderRadius: "8px",
              border: "1px solid #d9d9d9",
              padding: "8px 12px",
              flex: 1,
            }}
          />
        </div>
      </Space>
    </Card>
  );
};

export default CurrencyConverter;

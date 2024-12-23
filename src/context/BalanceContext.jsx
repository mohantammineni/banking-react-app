import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
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
  
      console.log("API Response in fetchBalance:", response.data); // Debug API response
  
      if (response.data.code === 200) {
        setBalance({
          total_balance: response.data.total_balance,
          available_balance: response.data.available_balance,
        });
        console.log("Updated Balance:", {
          total_balance: response.data.total_balance,
          available_balance: response.data.available_balance,
        }); // Debug updated balance
      } else {
        message.error(response.data.message || "Failed to fetch account balance.");
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
      message.error("An error occurred while fetching the account balance.");
    }
  };
  
  useEffect(() => {
    console.log("Balance State Updated in Provider:", balance); // Debug balance state
  }, [balance]);
  return (
    <BalanceContext.Provider value={{ balance, fetchBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => useContext(BalanceContext);

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "../context/AuthContext";
import AppLayout from "../pages/AppLayout";
import Accounts from "../pages/Accounts";



import Dashboard from "../pages/dashboard";
import Profile from "../pages/profile";
import ChangePassword from "../pages/change-password";
import CountryRestriction from "../pages/restriction/CountryRestriction";
import ManagePayee from "../pages/transfer-billpay/MangePayee";
import FundTransfer from "../pages/fund-transfer";

const submenuRoutes = [

  //Acounts
  { path: "accounts/loan", component: CountryRestriction },
  { path: "accounts/export-credit", component: CountryRestriction },
  { path: "accounts/account-statement", component: CountryRestriction },
  { path: "accounts/expected-payment", component: CountryRestriction },

  {path :"fund-transfer", component: FundTransfer },

  // Transfer & Bill Pay Submenus
  { path: "transfer-bill-pay/initiate-payment", component: CountryRestriction },
  { path: "transfer-bill-pay/biz360", component: CountryRestriction }, 
  { path: "transfer-bill-pay/cash-withdrawal-request", component: CountryRestriction },
  { path: "transfer-bill-pay/deposit-request", component: CountryRestriction },
  { path: "transfer-bill-pay/transaction-approvals", component: CountryRestriction },
  { path: "transfer-bill-pay/reports", component: CountryRestriction },

  // Credit Submenus
  { path: "credit/od-against-fd", component: CountryRestriction },

  // Trade Submenus
  { path: "trade/oneview-dashboard", component: CountryRestriction },
  { path: "trade/trade-services", component: CountryRestriction },
  { path: "trade/foreign-inward-remittance", component: CountryRestriction },
  { path: "trade/trade-emerge", component: CountryRestriction },
  { path: "trade/trade-mis", component: CountryRestriction },
  { path: "trade/trade-related-complaints", component: CountryRestriction },

  // Tax Submenus
  { path: "tax/tax-payment", component: CountryRestriction },
  { path: "tax/gstn-related", component: CountryRestriction },
  { path: "tax/state-tax", component: CountryRestriction },

  // CMS Submenus
  { path: "cms/icms", component: CountryRestriction },
  { path: "cms/collection-payment", component: CountryRestriction },
  { path: "cms/activation", component: CountryRestriction },
  { path: "cms/cash-management-services", component: CountryRestriction },

  // Treasury Submenus
  { path: "treasury/i-treasury", component: CountryRestriction },
  { path: "treasury/insta-forward", component: CountryRestriction },
  { path: "treasury/insta-limit-bullion", component: CountryRestriction },
  { path: "treasury/bank-idealrz", component: CountryRestriction },
  { path: "treasury/sovereign-gold-bonds", component: CountryRestriction },
  { path: "treasury/treasury-onboarding", component: CountryRestriction },
  { path: "treasury/fx-onboarding", component: CountryRestriction },

  // Service Request Submenus
  { path: "service-request/general-banking", component: CountryRestriction },
  { path: "service-request/debit-inquiry-cards", component: CountryRestriction },
  { path: "service-request/document-related", component: CountryRestriction },
  { path: "service-request/status-of-requests", component: CountryRestriction },
  { path: "service-request/status-of-approvals", component: CountryRestriction },
  { path: "service-request/i-safe-related", component: CountryRestriction },

  // Executive Offering Submenus
  { path: "executive-offering/business-essentials", component: CountryRestriction },
  { path: "executive-offering/easypay", component: CountryRestriction },
  { path: "executive-offering/other-services", component: CountryRestriction },

  // Connected Banking Submenus
  { path: "connected-banking/explore-connected-world", component: CountryRestriction },
  { path: "connected-banking/connected-banking-approvals", component: CountryRestriction },
  { path: "connected-banking/my-connected-profile", component: CountryRestriction },
  { path: "connected-banking/bankconnect2", component: CountryRestriction },
  { path: "connected-banking/favorite-workflow", component: CountryRestriction },

  // Product Lab Submenus
  { path: "product-lab/new-onboarding", component: CountryRestriction },
  { path: "product-lab/track-status", component: CountryRestriction },
  { path: "product-lab/pending-on-me", component: CountryRestriction },
];

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Private Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <AppLayout />
              </PrivateRoute>
            }
          >
            {/* Main Routes */}
            <Route path="dashboard" element={<Dashboard />} />           
            <Route path="accounts" element={<Accounts />} />
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="transfer-bill-pay/manage-payee" element={<ManagePayee />} />
            <Route path="fund-transfer" element={<FundTransfer />} />

            {/* Submenu Routes */}
            {submenuRoutes.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component page={path} />} />
            ))}
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;

import React from "react";
import { Alert } from "antd";
import "./CountryRestriction.css";

const CountryRestriction = ({ message, page }) => {
  const messages = {
    "accounts/loan": "Loan services is not available in your country.",
    "accounts/export-credit": "Export Credit services is not available in your country.",
    "accounts/account-statement": "Account Statement is not available in your country.",
    "accounts/expected-payment": "Expected Payment is not available in your country.",
    "transfer-bill-pay": "Transfer & Bill Pay is not available in your country.",
    "transfer-bill-pay/initiate-payment": "Initiate Payment is not available in your country",
    "transfer-bill-pay/biz360": "Biz360 is not available in your country.",
    "transfer-bill-pay/manage-payee": "Manage Payee is not available in your country",
    "transfer-bill-pay/cash-withdrawal-request": "Cash Withdrawal is not available in your country",
    "transfer-bill-pay/deposit-request": "Deposit Request is not available in your country",
    "transfer-bill-pay/transaction-approvals": "Transaction Approvals is not available in your country.",
    "transfer-bill-pay/reports": "Reports feature is not available in your country",
    "credit": "Credit services is not available in your country.",
    "credit/od-against-fd": "OD Against FD is not available in your country",
    "trade": "Trade services is not available in your country",
    "trade/oneview-dashboard": "OneView Dashboard is not available in your country",
    "trade/trade-services": "Trade Services is not available in your country",
    "trade/foreign-inward-remittance": "Foreign Inward Remittance is not available in your country",
    "trade/trade-emerge": "Trade Emerge is not available in your country",
    "trade/trade-mis": "Trade MIS is not available in your country",
    "trade/trade-related-complaints": "Trade Related Complaints is not available in your country",
    "tax": "Tax services is not available in your country",
    "tax/tax-payment": "Tax Payment is not available in your country",
    "tax/gstn-related": "GSTN Related services is not available in your country",
    "tax/state-tax": "State Tax services is not available in your country.",
    "cms": "CMS services is not available in your country",
    "cms/icms": "ICMS is not available in your country",
    "cms/collection-payment": "Collection & Payment is not available in your country",
    "cms/activation": "Activation services is not available in your country.",
    "cms/cash-management-services": "Cash Management Services is not available in your country",
    "treasury": "Treasury services is not available in your country",
    "treasury/i-treasury": "i-Treasury is not available in your country",
    "treasury/insta-forward": "Insta Forward is not available in your country",
    "treasury/insta-limit-bullion": "Insta Limit for Bullion is not available in your country",
    "treasury/bank-idealrz": "Bank Idealrz is not available in your country",
    "treasury/sovereign-gold-bonds": "Sovereign Gold Bonds is not available in your country.",
    "treasury/treasury-onboarding": "Treasury Onboarding is not available in your country",
    "treasury/fx-onboarding": "FX Onboarding services is not available in your country.",
    "service-request": "Service Requests is not available in your country.",
    "service-request/general-banking": "General Banking is not available in your country",
    "service-request/debit-inquiry-cards": "Debit/Inquiry Cards is not available in your country",
    "service-request/document-related": "Document Related services is not available in your country.",
    "service-request/status-of-requests": "Status of Requests is not available in your country",
    "service-request/status-of-approvals": "Status of Approvals is not available in your country",
    "service-request/i-safe-related": "i-Safe Related services is not available in your country",
    "executive-offering": "Executive Offerings is not available in your country.",
    "executive-offering/business-essentials": "Business Essentials is not available in your country",
    "executive-offering/easypay": "Easypay services is not available in your country.",
    "executive-offering/other-services": "Other Services is not available in your country",
    "connected-banking": "Connected Banking is not available in your country.",
    "connected-banking/explore-connected-world": "Explore Connected World is not available in your country",
    "connected-banking/connected-banking-approvals": "Connected Banking Approvals is not available in your country",
    "connected-banking/my-connected-profile": "My Connected Banking Profile is not available in your country",
    "connected-banking/bankconnect2": "BankConnect 2.0 is not available in your country",
    "connected-banking/favorite-workflow": "Favorite Workflow is not available in your country",
    "product-lab": "Product Lab services is not available in your country",
    "product-lab/new-onboarding": "New Onboarding is not available in your country",
    "product-lab/track-status": "Track Status services is not available in your country",
    "product-lab/pending-on-me": "Pending on Me services is not available in your country.",
  };

  return (
    <div className="country-restriction-container">
      <Alert
        message="Not Available"
        description={
          message || messages[page] || "The selected option is not available in your country."
        }
        type="info"
        showIcon
        className="country-restriction-alert"
      />
    </div>
  );
};

export default CountryRestriction;

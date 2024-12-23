import React from "react";
import { Alert } from "antd";
import "./CountryRestriction.css";

const CountryRestriction = ({ message, page }) => {
  const messages = {
    "accounts/loan": "Loan services are restricted in your region.",
    "accounts/export-credit": "Export Credit services are unavailable.",
    "accounts/account-statement": "Account Statement is restricted in your country.",
    "accounts/expected-payment": "Expected Payment is not available in your region.",
    "transfer-bill-pay": "Transfer & Bill Pay is unavailable in your country.",
    "transfer-bill-pay/initiate-payment": "Initiate Payment is not available.",
    "transfer-bill-pay/biz360": "Biz360 is unavailable in your region.",
    "transfer-bill-pay/manage-payee": "Manage Payee is restricted.",
    "transfer-bill-pay/cash-withdrawal-request": "Cash Withdrawal Request is unavailable.",
    "transfer-bill-pay/deposit-request": "Deposit Request is restricted.",
    "transfer-bill-pay/transaction-approvals": "Transaction Approvals are unavailable.",
    "transfer-bill-pay/reports": "Reports feature is restricted.",
    "credit": "Credit services are restricted in your region.",
    "credit/od-against-fd": "OD Against FD is unavailable.",
    "trade": "Trade services are restricted in your country.",
    "trade/oneview-dashboard": "OneView Dashboard is unavailable.",
    "trade/trade-services": "Trade Services are restricted.",
    "trade/foreign-inward-remittance": "Foreign Inward Remittance is unavailable.",
    "trade/trade-emerge": "Trade Emerge is restricted in your region.",
    "trade/trade-mis": "Trade MIS is unavailable.",
    "trade/trade-related-complaints": "Trade Related Complaints are restricted.",
    "tax": "Tax services are restricted in your country.",
    "tax/tax-payment": "Tax Payment is unavailable.",
    "tax/gstn-related": "GSTN Related services are restricted.",
    "tax/state-tax": "State Tax services are unavailable.",
    "cms": "CMS services are restricted.",
    "cms/icms": "ICMS is unavailable.",
    "cms/collection-payment": "Collection & Payment is restricted.",
    "cms/activation": "Activation services are unavailable.",
    "cms/cash-management-services": "Cash Management Services are restricted.",
    "treasury": "Treasury services are restricted in your country.",
    "treasury/i-treasury": "i-Treasury is unavailable.",
    "treasury/insta-forward": "Insta Forward is restricted.",
    "treasury/insta-limit-bullion": "Insta Limit for Bullion is unavailable.",
    "treasury/bank-idealrz": "Bank Idealrz is restricted.",
    "treasury/sovereign-gold-bonds": "Sovereign Gold Bonds are unavailable.",
    "treasury/treasury-onboarding": "Treasury Onboarding is restricted.",
    "treasury/fx-onboarding": "FX Onboarding services are unavailable.",
    "service-request": "Service Requests are restricted in your region.",
    "service-request/general-banking": "General Banking is unavailable.",
    "service-request/debit-inquiry-cards": "Debit/Inquiry Cards are restricted.",
    "service-request/document-related": "Document Related services are unavailable.",
    "service-request/status-of-requests": "Status of Requests is restricted.",
    "service-request/status-of-approvals": "Status of Approvals is unavailable.",
    "service-request/i-safe-related": "i-Safe Related services are restricted.",
    "executive-offering": "Executive Offerings are unavailable.",
    "executive-offering/business-essentials": "Business Essentials are restricted.",
    "executive-offering/easypay": "Easypay services are unavailable.",
    "executive-offering/other-services": "Other Services are restricted.",
    "connected-banking": "Connected Banking is restricted in your country.",
    "connected-banking/explore-connected-world": "Explore Connected World is unavailable.",
    "connected-banking/connected-banking-approvals": "Connected Banking Approvals are restricted.",
    "connected-banking/my-connected-profile": "My Connected Banking Profile is unavailable.",
    "connected-banking/bankconnect2": "BankConnect 2.0 is restricted.",
    "connected-banking/favorite-workflow": "Favorite Workflow is unavailable.",
    "product-lab": "Product Lab services are restricted.",
    "product-lab/new-onboarding": "New Onboarding is unavailable.",
    "product-lab/track-status": "Track Status services are restricted.",
    "product-lab/pending-on-me": "Pending on Me services are unavailable.",
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

import {
  DashboardOutlined,
  UserOutlined,
  BankOutlined,
  SwapOutlined,
  CreditCardOutlined,
  FundOutlined,
  FileProtectOutlined,
  ClusterOutlined,
  DollarCircleOutlined,
  FormOutlined,
  CrownOutlined,
  ApiOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";

const menuItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: () => <DashboardOutlined />,
  },
  {
    key: "fund-transfer",
    label: "Fund Transfer",
    icon: () => <SwapOutlined />,
  },
  {
    key: "accounts",
    label: "Accounts",
    icon: () => <BankOutlined />,
    subMenu: [
      { key: "loan", label: "Loan" },
      { key: "export-credit", label: "Export Credit" },
      { key: "account-statement", label: "Account Statement" },
      { key: "expected-payment", label: "Expected Payment" },
    ],
  },
  {
    key: "transfer-bill-pay",
    label: "Transfer & Bill Pay",
    icon: () => <SwapOutlined />,
    subMenu: [
      { key: "initiate-payment", label: "Initiate Payment" },
      { key: "biz360", label: "Biz360" },
      { key: "manage-payee", label: "Manage Payee" },
      { key: "cash-withdrawal-request", label: "Cash Withdrawal Request" },
      { key: "deposit-request", label: "Deposit Request" },
      { key: "transaction-approvals", label: "Transaction Approvals" },
      { key: "reports", label: "Reports" },
    ],
  },
  {
    key: "credit",
    label: "Credit",
    icon: () => <CreditCardOutlined />,
    subMenu: [{ key: "od-against-fd", label: "OD Against FD" }],
  },
  {
    key: "trade",
    label: "Trade",
    icon: () => <FundOutlined />,
    subMenu: [
      { key: "oneview-dashboard", label: "OneView Dashboard" },
      { key: "trade-services", label: "Trade Services" },
      { key: "foreign-inward-remittance", label: "Foreign Inward Remittance" },
      { key: "trade-emerge", label: "Trade Emerge" },
      { key: "trade-mis", label: "Trade MIS" },
      { key: "trade-related-complaints", label: "Trade Related Complaints" },
    ],
  },
  {
    key: "tax",
    label: "Tax/EPFO/ESIC",
    icon: () => <FileProtectOutlined />,
    subMenu: [
      { key: "tax-payment", label: "Tax Payment" },
      { key: "gstn-related", label: "GSTN Related" },
      { key: "state-tax", label: "State Tax" },
    ],
  },
  {
    key: "cms",
    label: "CMS",
    icon: () => <ClusterOutlined />,
    subMenu: [
      { key: "icms", label: "ICMS" },
      { key: "collection-payment", label: "Collection & Payment" },
      { key: "activation", label: "Activation" },
      { key: "cash-management-services", label: "Cash Management Services" },
    ],
  },
  {
    key: "treasury",
    label: "Treasury",
    icon: () => <DollarCircleOutlined />,
    subMenu: [
      { key: "i-treasury", label: "i-Treasury" },
      { key: "insta-forward", label: "Insta Forward" },
      { key: "insta-limit-bullion", label: "Insta Limit for Bullion" },
      { key: "bank-idealrz", label: "Bank Idealrz" },
      { key: "sovereign-gold-bonds", label: "Sovereign Gold Bonds" },
      { key: "treasury-onboarding", label: "Treasury Onboarding" },
      { key: "fx-onboarding", label: "FX Onboarding" },
    ],
  },
  {
    key: "service-request",
    label: "Service Request",
    icon: () => <FormOutlined />,
    subMenu: [
      { key: "general-banking", label: "General Banking" },
      { key: "debit-inquiry-cards", label: "Debit/Inquiry Cards" },
      { key: "document-related", label: "Document Related" },
      { key: "status-of-requests", label: "Status of Requests" },
      { key: "status-of-approvals", label: "Status of Approvals" },
      { key: "i-safe-related", label: "i-Safe Related" },
    ],
  },
  {
    key: "executive-offering",
    label: "Executive Offering",
    icon: () => <CrownOutlined />,
    subMenu: [
      { key: "business-essentials", label: "Business Essentials" },
      { key: "easypay", label: "Easypay" },
      { key: "other-services", label: "Other Services" },
    ],
  },
  {
    key: "connected-banking",
    label: "Connected Banking",
    icon: () => <ApiOutlined />,
    subMenu: [
      { key: "explore-connected-world", label: "Explore Connected World" },
      { key: "connected-banking-approvals", label: "Connected Banking Approvals" },
      { key: "my-connected-profile", label: "My Connected Banking Profile" },
      { key: "bankconnect-2", label: "BankConnect 2.0" },
      { key: "favorite-workflow", label: "Favorite Workflow" },
    ],
  },
  {
    key: "product-lab",
    label: "Product Lab",
    icon: () => <ExperimentOutlined />,
    subMenu: [
      { key: "new-onboarding", label: "New Onboarding" },
      { key: "track-status", label: "Track Status" },
      { key: "pending-on-me", label: "Pending on Me" },
    ],
  },
];

export default menuItems;

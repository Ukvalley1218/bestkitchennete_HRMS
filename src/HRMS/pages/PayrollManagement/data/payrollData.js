// ─── Payroll Mock Data ───────────────────────────────────────────────────────────

// Department-wise payroll data
export const departmentPayroll = [
  { department: "Production", employees: 145, totalSalary: 1245000, avgSalary: 8586, overtime: 45000, deductions: 65000, netAmount: 1225000 },
  { department: "Sales", employees: 42, totalSalary: 892000, avgSalary: 21238, overtime: 12000, deductions: 42000, netAmount: 862000 },
  { department: "IT", employees: 28, totalSalary: 1456000, avgSalary: 52000, overtime: 8000, deductions: 68000, netAmount: 1396000 },
  { department: "Finance", employees: 15, totalSalary: 678000, avgSalary: 45200, overtime: 0, deductions: 32000, netAmount: 646000 },
  { department: "Admin", employees: 18, totalSalary: 456000, avgSalary: 25333, overtime: 0, deductions: 21000, netAmount: 435000 },
];

// Employee salary records
export const employeeSalaryData = [
  {
    id: "EMP001",
    name: "Rahul Sharma",
    designation: "Senior Developer",
    department: "IT",
    dateOfJoining: "2022-03-15",
    modeOfPayment: "Bank Transfer",
    accountNumber: "XXXX1234",
    workingDays: 26,
    presentDays: 24,
    absentDays: 2,
    perDaySalary: 1731,
    earnings: {
      basic: 32000,
      hra: 8000,
      conveyance: 2000,
      attendancePay: 1500,
      otherAllowances: 3500,
    },
    deductions: {
      providentFund: 3840,
      esic: 240,
      professionalTax: 200,
      loan: 0,
      other: 0,
    },
    status: "processed",
  },
  {
    id: "EMP002",
    name: "Priya Patel",
    designation: "Sales Manager",
    department: "Sales",
    dateOfJoining: "2021-06-20",
    modeOfPayment: "Bank Transfer",
    accountNumber: "XXXX5678",
    workingDays: 26,
    presentDays: 26,
    absentDays: 0,
    perDaySalary: 1923,
    earnings: {
      basic: 40000,
      hra: 10000,
      conveyance: 2500,
      attendancePay: 2500,
      otherAllowances: 5000,
    },
    deductions: {
      providentFund: 4800,
      esic: 300,
      professionalTax: 200,
      loan: 5000,
      other: 0,
    },
    status: "processed",
  },
  {
    id: "EMP003",
    name: "Amit Kumar",
    designation: "Accountant",
    department: "Finance",
    dateOfJoining: "2023-01-10",
    modeOfPayment: "Bank Transfer",
    accountNumber: "XXXX9012",
    workingDays: 26,
    presentDays: 25,
    absentDays: 1,
    perDaySalary: 1346,
    earnings: {
      basic: 28000,
      hra: 7000,
      conveyance: 1750,
      attendancePay: 0,
      otherAllowances: 2500,
    },
    deductions: {
      providentFund: 3360,
      esic: 210,
      professionalTax: 200,
      loan: 0,
      other: 500,
    },
    status: "pending",
  },
  {
    id: "EMP004",
    name: "Sneha Reddy",
    designation: "HR Executive",
    department: "Admin",
    dateOfJoining: "2022-08-05",
    modeOfPayment: "Bank Transfer",
    accountNumber: "XXXX3456",
    workingDays: 26,
    presentDays: 26,
    absentDays: 0,
    perDaySalary: 1154,
    earnings: {
      basic: 24000,
      hra: 6000,
      conveyance: 1500,
      attendancePay: 2000,
      otherAllowances: 2000,
    },
    deductions: {
      providentFund: 2880,
      esic: 180,
      professionalTax: 200,
      loan: 0,
      other: 0,
    },
    status: "processed",
  },
  {
    id: "EMP005",
    name: "Vikram Singh",
    designation: "Production Manager",
    department: "Production",
    dateOfJoining: "2020-11-15",
    modeOfPayment: "Bank Transfer",
    accountNumber: "XXXX7890",
    workingDays: 26,
    presentDays: 24,
    absentDays: 2,
    perDaySalary: 2115,
    earnings: {
      basic: 45000,
      hra: 11250,
      conveyance: 2800,
      attendancePay: 0,
      otherAllowances: 6000,
    },
    deductions: {
      providentFund: 5400,
      esic: 338,
      professionalTax: 200,
      loan: 10000,
      other: 0,
    },
    status: "pending",
  },
];

// Sales incentive data
export const salesIncentiveData = [
  { id: 1, clientName: "ABC Corporation", date: "2024-02-01", estimate: 150000, dealAmount: 145000, receipt: 145000, remarks: "Full payment received" },
  { id: 2, clientName: "XYZ Industries", date: "2024-02-05", estimate: 280000, dealAmount: 275000, receipt: 200000, remarks: "Partial payment" },
  { id: 3, clientName: "Tech Solutions Ltd", date: "2024-02-10", estimate: 500000, dealAmount: 485000, receipt: 485000, remarks: "Bulk order" },
  { id: 4, clientName: "Global Traders", date: "2024-02-12", estimate: 120000, dealAmount: 118000, receipt: 118000, remarks: "New client" },
  { id: 5, clientName: "Metro Services", date: "2024-02-15", estimate: 350000, dealAmount: 340000, receipt: 170000, remarks: "50% advance" },
  { id: 6, clientName: "Prime Enterprises", date: "2024-02-18", estimate: 200000, dealAmount: 195000, receipt: 195000, remarks: "Repeat client" },
  { id: 7, clientName: "Sunrise Ltd", date: "2024-02-20", estimate: 180000, dealAmount: 175000, receipt: 175000, remarks: "Full payment" },
  { id: 8, clientName: "Ocean Exports", date: "2024-02-22", estimate: 420000, dealAmount: 410000, receipt: 205000, remarks: "50% advance" },
];

// Incentive slab structure
export const incentiveSlabs = [
  { min: 10000, max: 300000, percentage: 2 },
  { min: 310000, max: 600000, percentage: 2.5 },
  { min: 610000, max: 900000, percentage: 3 },
  { min: 910000, max: 1200000, percentage: 3.5 },
  { min: 1210000, max: 1500000, percentage: 4 },
  { min: 1510000, max: 2000000, percentage: 4.5 },
  { min: 2150000, max: Infinity, percentage: 5 },
];

// Payroll processing steps
export const payrollProcessingSteps = [
  { step: 1, title: "Import Attendance", subtitle: "Import attendance data", status: "completed" },
  { step: 2, title: "Calculate Salary", subtitle: "Calculate basic salary", status: "completed" },
  { step: 3, title: "Add Incentives", subtitle: "Add sales incentives", status: "inProgress" },
  { step: 4, title: "Apply Deductions", subtitle: "Apply PF, ESIC, PT", status: "pending" },
  { step: 5, title: "Generate Payslips", subtitle: "Generate employee payslips", status: "pending" },
  { step: 6, title: "Approve Payroll", subtitle: "HR & Finance approval", status: "pending" },
  { step: 7, title: "Release Salary", subtitle: "Transfer to bank accounts", status: "pending" },
];

// Dashboard KPI data
export const dashboardKPIs = {
  totalEmployeesPaid: { value: 120, label: "Employees", sublabel: "Processed This Month", trend: "+5" },
  totalPayrollAmount: { value: "₹28,50,000", label: "Total Payroll", sublabel: "This Month", trend: "+12%" },
  totalIncentivePaid: { value: "₹3,25,000", label: "Incentive Paid", sublabel: "Sales Incentives", trend: "+8%" },
  pendingPayroll: { value: 12, label: "Employees", sublabel: "Pending Approval", trend: "-3" },
  averageSalary: { value: "₹32,500", label: "Average Salary", sublabel: "Per Employee", trend: "+2%" },
  processingStatus: { value: "Processing", label: "Due Date: 28 Feb", sublabel: "5 of 7 steps completed", progress: 71 },
};

// Payroll trend data (for charts)
export const payrollTrendData = [
  { month: "Aug", amount: 2450000, incentive: 280000 },
  { month: "Sep", amount: 2580000, incentive: 295000 },
  { month: "Oct", amount: 2650000, incentive: 310000 },
  { month: "Nov", amount: 2720000, incentive: 298000 },
  { month: "Dec", amount: 2780000, incentive: 320000 },
  { month: "Jan", amount: 2810000, incentive: 315000 },
  { month: "Feb", amount: 2850000, incentive: 325000 },
];

// Department cost distribution
export const departmentCostDistribution = [
  { department: "Production", percentage: 35, color: "#ef4444" },
  { department: "IT", percentage: 28, color: "#2b7fff" },
  { department: "Sales", percentage: 18, color: "#22c55e" },
  { department: "Finance", percentage: 12, color: "#f59e0b" },
  { department: "Admin", percentage: 7, color: "#8b5cf6" },
];

// Top incentive earners
export const topIncentiveEarners = [
  { rank: 1, name: "Priya Patel", department: "Sales", incentive: "₹45,000", target: "150%" },
  { rank: 2, name: "Rahul Sharma", department: "Sales", incentive: "₹38,500", target: "135%" },
  { rank: 3, name: "Amit Kumar", department: "Sales", incentive: "₹32,000", target: "125%" },
  { rank: 4, name: "Sneha Reddy", department: "Sales", incentive: "₹28,500", target: "118%" },
  { rank: 5, name: "Vikram Singh", department: "Production", incentive: "₹22,000", target: "110%" },
];

// Payroll settings defaults
export const payrollSettings = {
  pfPercentage: 12,
  esicPercentage: 0.75,
  professionalTax: 200,
  workingDays: 26,
  salaryCycle: "26th - 25th",
  paymentMode: "Bank Transfer",
  paymentDate: 28,
};
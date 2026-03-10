// ─── Payroll Calculation Utilities ──────────────────────────────────────────────

/**
 * Calculate gross salary from earnings
 */
export const calculateGrossSalary = (earnings) => {
  return Object.values(earnings).reduce((sum, value) => sum + value, 0);
};

/**
 * Calculate total deductions
 */
export const calculateTotalDeductions = (deductions) => {
  return Object.values(deductions).reduce((sum, value) => sum + value, 0);
};

/**
 * Calculate net salary
 */
export const calculateNetSalary = (earnings, deductions) => {
  const gross = calculateGrossSalary(earnings);
  const totalDeductions = calculateTotalDeductions(deductions);
  return gross - totalDeductions;
};

/**
 * Calculate per day salary
 */
export const calculatePerDaySalary = (basicSalary, workingDays = 26) => {
  return Math.round(basicSalary / workingDays);
};

/**
 * Calculate PF amount (12% of basic)
 */
export const calculatePF = (basicSalary, pfPercentage = 12) => {
  return Math.round((basicSalary * pfPercentage) / 100);
};

/**
 * Calculate ESIC amount (0.75% of gross)
 */
export const calculateESIC = (grossSalary, esicPercentage = 0.75) => {
  // ESIC is applicable only if gross salary is <= ₹21,000
  if (grossSalary > 21000) return 0;
  return Math.round((grossSalary * esicPercentage) / 100);
};

/**
 * Calculate incentive based on sales amount
 */
export const calculateIncentive = (salesAmount, slabs) => {
  for (const slab of slabs) {
    if (salesAmount >= slab.min && salesAmount <= slab.max) {
      return Math.round((salesAmount * slab.percentage) / 100);
    }
  }
  return 0;
};

/**
 * Get incentive percentage based on sales amount
 */
export const getIncentivePercentage = (salesAmount, slabs) => {
  for (const slab of slabs) {
    if (salesAmount >= slab.min && salesAmount <= slab.max) {
      return slab.percentage;
    }
  }
  return 0;
};

/**
 * Calculate over-achieved target
 */
export const calculateOverAchievedTarget = (totalSales, monthlyTarget) => {
  return Math.max(0, totalSales - monthlyTarget);
};

/**
 * Calculate 3D deduction (0.10% of incentive)
 */
export const calculate3DDeduction = (incentive) => {
  return Math.round(incentive * 0.001);
};

/**
 * Calculate actual incentive payable
 */
export const calculateActualIncentive = (incentive, deduction3D) => {
  return incentive - deduction3D;
};

/**
 * Format currency to Indian format
 */
export const formatCurrency = (amount) => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(amount);
};

/**
 * Format number with commas (Indian format)
 */
export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-IN').format(num);
};

/**
 * Calculate attendance pay
 */
export const calculateAttendancePay = (presentDays, perDaySalary) => {
  return presentDays * perDaySalary;
};

/**
 * Calculate salary based on attendance
 */
export const calculateSalaryWithAttendance = (basicSalary, presentDays, workingDays) => {
  return Math.round((basicSalary / workingDays) * presentDays);
};

/**
 * Validate salary data
 */
export const validateSalaryData = (data) => {
  const errors = [];

  if (!data.name) errors.push("Employee name is required");
  if (!data.earnings.basic || data.earnings.basic <= 0) errors.push("Basic salary must be greater than 0");
  if (data.workingDays < data.presentDays) errors.push("Present days cannot exceed working days");

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Calculate yearly CTC from monthly salary
 */
export const calculateYearlyCTC = (monthlyGross) => {
  return monthlyGross * 12;
};

/**
 * Calculate monthly CTC from yearly package
 */
export const calculateMonthlyFromCTC = (yearlyCTC) => {
  return Math.round(yearlyCTC / 12);
};

/**
 * Get payroll status color
 */
export const getPayrollStatusColor = (status) => {
  const colors = {
    processed: { bg: "#dcfce7", text: "#15803d", border: "#bbf7d0" },
    pending: { bg: "#fef9c3", text: "#a16207", border: "#fde047" },
    approved: { bg: "#dbeafe", text: "#1d4ed8", border: "#bfdbfe" },
    rejected: { bg: "#fee2e2", text: "#dc2626", border: "#fecaca" },
  };
  return colors[status] || colors.pending;
};

/**
 * Calculate tax slab for income tax
 */
export const calculateIncomeTaxSlab = (yearlyIncome) => {
  // New tax regime slabs (FY 2024-25)
  if (yearlyIncome <= 300000) return 0;
  if (yearlyIncome <= 700000) return 0.05;
  if (yearlyIncome <= 1000000) return 0.10;
  if (yearlyIncome <= 1200000) return 0.15;
  if (yearlyIncome <= 1500000) return 0.20;
  return 0.30;
};

/**
 * Generate payslip ID
 */
export const generatePayslipId = (employeeId, month, year) => {
  return `PS-${employeeId}-${month}${year}`;
};

/**
 * Calculate gratuity (4.81% of basic)
 */
export const calculateGratuity = (basicSalary) => {
  return Math.round(basicSalary * 0.0481);
};

/**
 * Calculate bonus (8.33% of basic, max ₹2,100)
 */
export const calculateBonus = (basicSalary) => {
  const bonus = Math.round(basicSalary * 0.0833);
  return Math.min(bonus, 2100);
};

export default {
  calculateGrossSalary,
  calculateTotalDeductions,
  calculateNetSalary,
  calculatePerDaySalary,
  calculatePF,
  calculateESIC,
  calculateIncentive,
  getIncentivePercentage,
  calculateOverAchievedTarget,
  calculate3DDeduction,
  calculateActualIncentive,
  formatCurrency,
  formatNumber,
  calculateAttendancePay,
  calculateSalaryWithAttendance,
  validateSalaryData,
  calculateYearlyCTC,
  calculateMonthlyFromCTC,
  getPayrollStatusColor,
  calculateIncomeTaxSlab,
  generatePayslipId,
  calculateGratuity,
  calculateBonus,
};
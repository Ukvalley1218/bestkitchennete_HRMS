import React, { useState } from "react";
import {
  SearchIcon,
  DownloadIcon,
  PrintIcon,
  EmailIcon,
  CheckCircleIcon,
} from "./components/Icons";
import { employeeSalaryData } from "./data/payrollData";
import {
  formatCurrency,
  calculateGrossSalary,
  calculateTotalDeductions,
  calculateNetSalary,
} from "./utils/payrollCalculations";

// ─── Payslip Generator Component ─────────────────────────────────────────────────
const PayslipGenerator = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [payslipMonth, setPayslipMonth] = useState("February 2026");

  const filteredEmployees = employeeSalaryData.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGeneratePayslip = (employee) => {
    setSelectedEmployee(employee);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payslip Generator</h1>
            <p className="text-sm text-gray-500 mt-0.5">Generate and download employee payslips</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={payslipMonth}
              onChange={(e) => setPayslipMonth(e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
            >
              <option>February 2026</option>
              <option>January 2026</option>
              <option>December 2025</option>
              <option>November 2025</option>
            </select>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-all hover:shadow-lg">
              <DownloadIcon />
              Bulk Download
            </button>
          </div>
        </div>

        {/* Employee Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Employee List */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                />
              </div>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              {filteredEmployees.map((employee) => {
                const net = calculateNetSalary(employee.earnings, employee.deductions);
                const isSelected = selectedEmployee?.id === employee.id;

                return (
                  <div
                    key={employee.id}
                    onClick={() => handleGeneratePayslip(employee)}
                    className={`p-4 border-b border-gray-50 cursor-pointer transition-all ${
                      isSelected
                        ? "bg-red-50 border-l-4 border-l-red-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-sm font-bold">
                        {employee.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                        <p className="text-xs text-gray-500">{employee.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">{formatCurrency(net)}</p>
                        <p className="text-xs text-gray-500">Net Pay</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payslip Preview */}
          <div className="lg:col-span-2">
            {selectedEmployee ? (
              <PayslipPreview
                employee={selectedEmployee}
                month={payslipMonth}
              />
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-medium">Select an employee to preview payslip</p>
                  <p className="text-sm text-gray-400 mt-1">Click on any employee from the list</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Payslip Preview Component ───────────────────────────────────────────────────
const PayslipPreview = ({ employee, month }) => {
  const gross = calculateGrossSalary(employee.earnings);
  const deductions = calculateTotalDeductions(employee.deductions);
  const net = calculateNetSalary(employee.earnings, employee.deductions);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
      {/* Action Buttons */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">Payslip Preview</h3>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
            <PrintIcon />
            Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
            <EmailIcon />
            Email
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-all">
            <DownloadIcon />
            Download PDF
          </button>
        </div>
      </div>

      {/* Payslip Content */}
      <div className="p-6" id="payslip-content">
        {/* Company Header */}
        <div className="text-center border-b-2 border-gray-200 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-red-600">BEST KITCHEN NETE</h1>
          <p className="text-sm text-gray-500">Manufacturing Excellence Since 2010</p>
          <p className="text-xs text-gray-400 mt-1">GSTIN: 27AABCU9603R1ZM | Pune, Maharashtra</p>
        </div>

        {/* Payslip Title */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase">Salary Slip</h2>
          <p className="text-sm text-gray-500">{month}</p>
        </div>

        {/* Employee Details */}
        <div className="grid grid-cols-2 gap-6 mb-6 bg-gray-50 rounded-xl p-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Employee Name</span>
              <span className="text-sm font-medium text-gray-900">{employee.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Employee ID</span>
              <span className="text-sm font-medium text-gray-900">{employee.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Designation</span>
              <span className="text-sm font-medium text-gray-900">{employee.designation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Department</span>
              <span className="text-sm font-medium text-gray-900">{employee.department}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Date of Joining</span>
              <span className="text-sm font-medium text-gray-900">{employee.dateOfJoining}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Working Days</span>
              <span className="text-sm font-medium text-gray-900">{employee.workingDays}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Present Days</span>
              <span className="text-sm font-medium text-gray-900">{employee.presentDays}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Absent Days</span>
              <span className="text-sm font-medium text-red-600">{employee.absentDays}</span>
            </div>
          </div>
        </div>

        {/* Earnings & Deductions */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Earnings */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-green-50 px-4 py-2 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-green-700">EARNINGS</h3>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Basic Salary</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(employee.earnings.basic)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">HRA</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(employee.earnings.hra)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Conveyance</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(employee.earnings.conveyance)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Attendance Pay</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(employee.earnings.attendancePay)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Other Allowances</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(employee.earnings.otherAllowances)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-sm font-semibold text-green-700">Gross Salary</span>
                <span className="text-sm font-bold text-green-700">{formatCurrency(gross)}</span>
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-red-50 px-4 py-2 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-red-700">DEDUCTIONS</h3>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Provident Fund (12%)</span>
                <span className="text-sm font-medium text-red-600">{formatCurrency(employee.deductions.providentFund)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">ESIC (0.75%)</span>
                <span className="text-sm font-medium text-red-600">{formatCurrency(employee.deductions.esic)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Professional Tax</span>
                <span className="text-sm font-medium text-red-600">{formatCurrency(employee.deductions.professionalTax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Loan / Advance</span>
                <span className="text-sm font-medium text-red-600">{formatCurrency(employee.deductions.loan)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Other Deductions</span>
                <span className="text-sm font-medium text-red-600">{formatCurrency(employee.deductions.other)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-sm font-semibold text-red-700">Total Deductions</span>
                <span className="text-sm font-bold text-red-700">{formatCurrency(deductions)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Net Salary */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-4 text-white flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">NET SALARY PAID</p>
            <p className="text-3xl font-bold">{formatCurrency(net)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-80">Payment Mode</p>
            <p className="text-lg font-semibold">{employee.modeOfPayment}</p>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <div className="border-t border-gray-400 pt-2 mt-16">
              <p className="text-sm text-gray-500">Authorized Signatory</p>
            </div>
          </div>
          <div className="text-center">
            <div className="border-t border-gray-400 pt-2 mt-16">
              <p className="text-sm text-gray-500">Employee Signature</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayslipGenerator;
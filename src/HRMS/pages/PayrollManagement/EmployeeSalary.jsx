import React, { useState } from "react";
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  EyeIcon,
  EditIcon,
  DeleteIcon,
  PrintIcon,
  EmailIcon,
} from "./components/Icons";
import { employeeSalaryData } from "./data/payrollData";
import {
  formatCurrency,
  calculateGrossSalary,
  calculateTotalDeductions,
  calculateNetSalary,
  getPayrollStatusColor,
} from "./utils/payrollCalculations";

// ─── Employee Salary Component ──────────────────────────────────────────────────
const EmployeeSalary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Filter employees based on search and tab
  const filteredEmployees = employeeSalaryData.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "processed") return matchesSearch && emp.status === "processed";
    if (activeTab === "pending") return matchesSearch && emp.status === "pending";
    return matchesSearch;
  });

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Employee Salary Records</h1>
            <p className="text-sm text-gray-500 mt-0.5">Manage employee salary profiles and calculations</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 bg-white text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all duration-200">
              <DownloadIcon />
              Export
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-all duration-200 hover:shadow-lg">
              <PlusIcon />
              Add Employee Salary
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <p className="text-2xl font-bold text-gray-900">{employeeSalaryData.length}</p>
            <p className="text-sm text-gray-500">Total Employees</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <p className="text-2xl font-bold text-green-600">
              {employeeSalaryData.filter((e) => e.status === "processed").length}
            </p>
            <p className="text-sm text-gray-500">Processed</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <p className="text-2xl font-bold text-yellow-600">
              {employeeSalaryData.filter((e) => e.status === "pending").length}
            </p>
            <p className="text-sm text-gray-500">Pending</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(
                employeeSalaryData.reduce((sum, e) => sum + calculateNetSalary(e.earnings, e.deductions), 0)
              )}
            </p>
            <p className="text-sm text-gray-500">Total Net Pay</p>
          </div>
        </div>

        {/* Filter Tabs & Search */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              {["all", "processed", "pending"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all w-64"
              />
            </div>
          </div>

          {/* Employee Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Gross Salary</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Deductions</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Net Salary</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredEmployees.map((employee) => {
                  const gross = calculateGrossSalary(employee.earnings);
                  const deductions = calculateTotalDeductions(employee.deductions);
                  const net = calculateNetSalary(employee.earnings, employee.deductions);
                  const statusColor = getPayrollStatusColor(employee.status);

                  return (
                    <tr key={employee.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-sm font-bold">
                            {employee.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                              {employee.name}
                            </p>
                            <p className="text-xs text-gray-500">{employee.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm text-gray-700">{employee.department}</p>
                          <p className="text-xs text-gray-500">{employee.designation}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatCurrency(gross)}</td>
                      <td className="px-6 py-4 text-sm text-red-600">{formatCurrency(deductions)}</td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">{formatCurrency(net)}</td>
                      <td className="px-6 py-4">
                        <span
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: statusColor.bg,
                            color: statusColor.text,
                            border: `1px solid ${statusColor.border}`,
                          }}
                        >
                          {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleViewEmployee(employee)}
                            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-600 transition-all"
                            title="View Details"
                          >
                            <EyeIcon />
                          </button>
                          <button
                            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-all"
                            title="Edit"
                          >
                            <EditIcon />
                          </button>
                          <button
                            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-green-600 transition-all"
                            title="Print Payslip"
                          >
                            <PrintIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-700">{filteredEmployees.length}</span> of{" "}
              <span className="font-medium text-gray-700">{employeeSalaryData.length}</span> employees
            </p>
          </div>
        </div>
      </div>

      {/* Employee Detail Modal */}
      {showModal && selectedEmployee && (
        <EmployeeSalaryModal
          employee={selectedEmployee}
          onClose={() => {
            setShowModal(false);
            setSelectedEmployee(null);
          }}
        />
      )}
    </div>
  );
};

// ─── Employee Salary Modal Component ─────────────────────────────────────────────
const EmployeeSalaryModal = ({ employee, onClose }) => {
  const gross = calculateGrossSalary(employee.earnings);
  const deductions = calculateTotalDeductions(employee.deductions);
  const net = calculateNetSalary(employee.earnings, employee.deductions);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-xl font-bold">
              {employee.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{employee.name}</h2>
              <p className="text-sm text-gray-500">{employee.designation} • {employee.department}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Employee Details */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Employee Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-400">Employee ID</p>
                <p className="text-sm font-medium text-gray-900">{employee.id}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Date of Joining</p>
                <p className="text-sm font-medium text-gray-900">{employee.dateOfJoining}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Payment Mode</p>
                <p className="text-sm font-medium text-gray-900">{employee.modeOfPayment}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Working Days</p>
                <p className="text-sm font-medium text-gray-900">{employee.workingDays}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Present Days</p>
                <p className="text-sm font-medium text-gray-900">{employee.presentDays}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Absent Days</p>
                <p className="text-sm font-medium text-red-600">{employee.absentDays}</p>
              </div>
            </div>
          </div>

          {/* Earnings & Deductions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Earnings */}
            <div className="bg-green-50 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-green-700 mb-4">Earnings</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">Basic Salary</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(employee.earnings.basic)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">HRA</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(employee.earnings.hra)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">Conveyance</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(employee.earnings.conveyance)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">Attendance Pay</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(employee.earnings.attendancePay)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">Other Allowances</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(employee.earnings.otherAllowances)}</span>
                </div>
                <div className="border-t border-green-200 pt-3 flex justify-between">
                  <span className="text-sm font-semibold text-green-700">Gross Salary</span>
                  <span className="text-sm font-bold text-green-700">{formatCurrency(gross)}</span>
                </div>
              </div>
            </div>

            {/* Deductions */}
            <div className="bg-red-50 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-red-700 mb-4">Deductions</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">Provident Fund (12%)</span>
                  <span className="text-sm font-medium text-red-600">{formatCurrency(employee.deductions.providentFund)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">ESIC (0.75%)</span>
                  <span className="text-sm font-medium text-red-600">{formatCurrency(employee.deductions.esic)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">Professional Tax</span>
                  <span className="text-sm font-medium text-red-600">{formatCurrency(employee.deductions.professionalTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">Loan / Advance</span>
                  <span className="text-sm font-medium text-red-600">{formatCurrency(employee.deductions.loan)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">Other Deductions</span>
                  <span className="text-sm font-medium text-red-600">{formatCurrency(employee.deductions.other)}</span>
                </div>
                <div className="border-t border-red-200 pt-3 flex justify-between">
                  <span className="text-sm font-semibold text-red-700">Total Deductions</span>
                  <span className="text-sm font-bold text-red-700">{formatCurrency(deductions)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Net Salary */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Net Salary Paid</p>
                <p className="text-3xl font-bold">{formatCurrency(net)}</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 transition-all">
                  <PrintIcon />
                  Print
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-red-600 text-sm font-medium hover:bg-gray-100 transition-all">
                  <DownloadIcon />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSalary;
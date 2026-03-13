import { useState } from "react";
import LeaveStatCard from "../components/StatCard";

export default function Compilance() {
  // ==========================================
  // MOCK DATA
  // ==========================================

  // Dashboard Summary Stats
  const complianceStats = {
    totalItems: 48,
    pending: 12,
    completed: 28,
    expiringSoon: 8,
  };

  // Employee Document Compliance Data
  const [employeeDocuments] = useState([
    { id: 1, empName: "Rajesh Kumar", empId: "EMP001", documentName: "Aadhaar Card", status: "Verified", expiryDate: "2028-05-15" },
    { id: 2, empName: "Priya Sharma", empId: "EMP002", documentName: "PAN Card", status: "Verified", expiryDate: "2027-08-20" },
    { id: 3, empName: "Amit Patel", empId: "EMP003", documentName: "Employment Contract", status: "Pending", expiryDate: "2026-03-31" },
    { id: 4, empName: "Sneha Gupta", empId: "EMP004", documentName: "NDA Agreement", status: "Verified", expiryDate: "2027-12-01" },
    { id: 5, empName: "Vikram Singh", empId: "EMP005", documentName: "Address Proof", status: "Pending", expiryDate: "2026-04-15" },
    { id: 6, empName: "Neha Joshi", empId: "EMP006", documentName: "Aadhaar Card", status: "Verified", expiryDate: "2029-01-10" },
    { id: 7, empName: "Rohan Mehta", empId: "EMP007", documentName: "Employment Contract", status: "Pending", expiryDate: "2026-06-30" },
    { id: 8, empName: "Anita Desai", empId: "EMP008", documentName: "PAN Card", status: "Verified", expiryDate: "2028-11-25" },
  ]);

  // Policy Compliance Data
  const [policyCompliance] = useState([
    { id: 1, policyName: "HR Policy", lastUpdated: "2026-01-15", status: "Active", department: "All" },
    { id: 2, policyName: "Leave Policy", lastUpdated: "2026-02-01", status: "Active", department: "All" },
    { id: 3, policyName: "Code of Conduct", lastUpdated: "2025-12-10", status: "Active", department: "All" },
    { id: 4, policyName: "Data Security Policy", lastUpdated: "2026-01-20", status: "Active", department: "All" },
    { id: 5, policyName: "POSH Policy", lastUpdated: "2025-11-30", status: "Under Review", department: "All" },
    { id: 6, policyName: "Remote Work Policy", lastUpdated: "2026-02-28", status: "Active", department: "All" },
  ]);

  // Training Compliance Data
  const [trainingCompliance] = useState([
    { id: 1, trainingName: "POSH Training", department: "All Departments", status: "Completed", completionDate: "2026-02-15" },
    { id: 2, trainingName: "Workplace Safety Training", department: "Production", status: "In Progress", completionDate: "2026-03-20" },
    { id: 3, trainingName: "Data Privacy Training", department: "IT", status: "Completed", completionDate: "2026-01-30" },
    { id: 4, trainingName: "Employee Onboarding Training", department: "HR", status: "Pending", completionDate: "2026-04-10" },
    { id: 5, trainingName: "Fire Safety Training", department: "All Departments", status: "Completed", completionDate: "2026-02-28" },
    { id: 6, trainingName: "Anti-Harassment Training", department: "All Departments", status: "In Progress", completionDate: "2026-03-25" },
  ]);

  // Compliance Checklist Data
  const [complianceChecklist] = useState([
    { id: 1, task: "Employee Background Verification", status: "Completed", priority: "High" },
    { id: 2, task: "Payroll Compliance", status: "Completed", priority: "High" },
    { id: 3, task: "Tax Compliance (TDS & GST)", status: "In Progress", priority: "High" },
    { id: 4, task: "Benefits Compliance (PF, ESI)", status: "Completed", priority: "High" },
    { id: 5, task: "Employee Contract Signing", status: "Pending", priority: "Medium" },
    { id: 6, task: "Labour Law Compliance", status: "In Review", priority: "High" },
    { id: 7, task: "Statutory License Renewal", status: "Pending", priority: "Medium" },
    { id: 8, task: "Insurance Policy Update", status: "Completed", priority: "Low" },
  ]);

  // New Compliance Items (added via modal)
  const [complianceItems, setComplianceItems] = useState([]);

  // ==========================================
  // ICONS
  // ==========================================

  const TotalIcon = () => (
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="35" height="35" rx="10" fill="#E8F5E9"/>
      <path d="M17.5 8C12.3 8 8 12.3 8 17.5C8 22.7 12.3 27 17.5 27C22.7 27 27 22.7 27 17.5C27 12.3 22.7 8 17.5 8ZM21.5 19.5H13.5C12.95 19.5 12.5 19.05 12.5 18.5C12.5 17.95 12.95 17.5 13.5 17.5H21.5C22.05 17.5 22.5 17.95 22.5 18.5C22.5 19.05 22.05 19.5 21.5 19.5Z" fill="#2E7D32"/>
    </svg>
  );

  const PendingIcon = () => (
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="35" height="35" rx="10" fill="#FFF3E0"/>
      <path d="M17.5 8C12.3 8 8 12.3 8 17.5C8 22.7 12.3 27 17.5 27C22.7 27 27 22.7 27 17.5C27 12.3 22.7 8 17.5 8ZM17.5 24.5C13.65 24.5 10.5 21.35 10.5 17.5C10.5 13.65 13.65 10.5 17.5 10.5C21.35 10.5 24.5 13.65 24.5 17.5C24.5 21.35 21.35 24.5 17.5 24.5ZM18.75 12.5H16.25V18.25L21.05 21.1L22.25 19.15L18.75 17.05V12.5Z" fill="#F57C00"/>
    </svg>
  );

  const CompletedIcon = () => (
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="35" height="35" rx="10" fill="#E3F2FD"/>
      <path d="M17.5 8C12.3 8 8 12.3 8 17.5C8 22.7 12.3 27 17.5 27C22.7 27 27 22.7 27 17.5C27 12.3 22.7 8 17.5 8ZM21.95 14.05L16.25 22.05C16.05 22.35 15.75 22.5 15.4 22.5C15.05 22.5 14.75 22.35 14.55 22.05L12.05 18.55C11.75 18.15 11.85 17.6 12.25 17.3C12.65 17 13.2 17.1 13.5 17.5L15.4 20.25L20.5 13.95C20.8 13.55 21.35 13.45 21.75 13.75C22.15 14.05 22.25 14.6 21.95 15.05V14.05Z" fill="#1976D2"/>
    </svg>
  );

  const ExpiringIcon = () => (
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="35" height="35" rx="10" fill="#FFEBEE"/>
      <path d="M17.5 8C12.3 8 8 12.3 8 17.5C8 22.7 12.3 27 17.5 27C22.7 27 27 22.7 27 17.5C27 12.3 22.7 8 17.5 8ZM17.5 24.5C13.65 24.5 10.5 21.35 10.5 17.5C10.5 13.65 13.65 10.5 17.5 10.5C21.35 10.5 24.5 13.65 24.5 17.5C24.5 21.35 21.35 24.5 17.5 24.5ZM17.5 13C15.4 13 13.65 14.75 13.65 16.85C13.65 18.95 15.4 20.7 17.5 20.7C19.6 20.7 21.35 18.95 21.35 16.85C21.35 14.75 19.6 13 17.5 13Z" fill="#D32F2F"/>
      <circle cx="17.5" cy="16.5" r="3" fill="#D32F2F"/>
    </svg>
  );

  const DocumentIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z" fill="#A60000"/>
    </svg>
  );

  // ==========================================
  // ALERTS DATA BY TAB
  // ==========================================

  const documentAlerts = [
    { id: 1, title: "Contract Expiry - 3 Employees", due: "Due: Mar 31, 2026", bg: "bg-red-50", border: "border-red-100" },
    { id: 2, title: "PF Compliance Document Pending", due: "Due: Mar 20, 2026", bg: "bg-yellow-50", border: "border-yellow-100" },
  ];

  const policyAlerts = [
    { id: 1, title: "Labor Law Audit Due", due: "Due: Apr 15, 2026", bg: "bg-blue-50", border: "border-blue-100" },
  ];

  const trainingAlerts = [
    { id: 1, title: "Training Deadline Approaching", due: "Due: Mar 25, 2026", bg: "bg-blue-50", border: "border-blue-100" },
  ];

  const checklistAlerts = [
    { id: 1, title: "Labour Law Compliance Review Required", due: "Due: Mar 30, 2026", bg: "bg-yellow-50", border: "border-yellow-100" },
    { id: 2, title: "Statutory License Renewal Pending", due: "Due: Apr 05, 2026", bg: "bg-red-50", border: "border-red-100" },
  ];

  // ==========================================
  // MODAL STATE
  // ==========================================

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCompliance, setNewCompliance] = useState({
    title: "",
    type: "Document",
    department: "All",
    dueDate: "",
    status: "Pending",
  });

  // ==========================================
  // STATUS BADGE COMPONENT
  // ==========================================

  const StatusBadge = ({ status }) => {
    const styles = {
      Verified: "bg-green-100 text-green-600",
      Completed: "bg-green-100 text-green-600",
      Active: "bg-green-100 text-green-600",
      Pending: "bg-yellow-100 text-yellow-600",
      "In Progress": "bg-blue-100 text-blue-600",
      "In Review": "bg-purple-100 text-purple-600",
      "Under Review": "bg-orange-100 text-orange-600",
      Expired: "bg-red-100 text-red-600",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || "bg-gray-100 text-gray-600"}`}>
        {status}
      </span>
    );
  };

  // ==========================================
  // PRIORITY BADGE COMPONENT
  // ==========================================

  const PriorityBadge = ({ priority }) => {
    const styles = {
      High: "bg-red-100 text-red-600",
      Medium: "bg-yellow-100 text-yellow-600",
      Low: "bg-green-100 text-green-600",
    };
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[priority] || "bg-gray-100 text-gray-600"}`}>
        {priority}
      </span>
    );
  };

  // ==========================================
  // ALERT CARD COMPONENT
  // ==========================================

  const AlertCard = ({ alert }) => (
    <div className={`flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl border ${alert.bg} ${alert.border}`}>
      <div>
        <p className="text-sm font-semibold text-gray-800">{alert.title}</p>
        <p className="text-xs text-gray-400 mt-0.5">{alert.due}</p>
      </div>
      <button className="text-sm font-semibold text-red-500 hover:text-red-600 whitespace-nowrap transition-colors">
        Action <span dangerouslySetInnerHTML={{ __html: "&rarr;" }} />
      </button>
    </div>
  );

  // ==========================================
  // HANDLERS
  // ==========================================

  const handleAddCompliance = () => {
    const newItem = {
      id: Date.now(),
      ...newCompliance,
    };
    setComplianceItems((prev) => [...prev, newItem]);
    setNewCompliance({
      title: "",
      type: "Document",
      department: "All",
      dueDate: "",
      status: "Pending",
    });
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewCompliance({
      title: "",
      type: "Document",
      department: "All",
      dueDate: "",
      status: "Pending",
    });
  };

  // ==========================================
  // TAB STATE
  // ==========================================

  const [activeTab, setActiveTab] = useState("documents");

  const tabs = [
    { id: "documents", label: "Documents" },
    { id: "policies", label: "Policies" },
    { id: "trainings", label: "Trainings" },
    { id: "checklist", label: "Checklist" },
  ];

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="p-6 sm:p-10 flex items-start justify-center">
      <div className="w-full max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Compliance & Documentation
            </h1>
            <p className="text-sm text-[#757575] mt-1">
              Manage legal compliance and documentation
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors duration-200 shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z" fill="white"/>
            </svg>
            Add Compliance
          </button>
        </div>

        {/* Dashboard Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <LeaveStatCard
            icon={TotalIcon}
            trend="+5"
            value={complianceStats.totalItems.toString()}
            label="Total Items"
            sub="All Compliance"
          />
          <LeaveStatCard
            icon={PendingIcon}
            trend="+2"
            value={complianceStats.pending.toString()}
            label="Pending"
            sub="Requires Action"
          />
          <LeaveStatCard
            icon={CompletedIcon}
            trend="+8"
            value={complianceStats.completed.toString()}
            label="Completed"
            sub="This Month"
          />
          <LeaveStatCard
            icon={ExpiringIcon}
            trend="+3"
            value={complianceStats.expiringSoon.toString()}
            label="Expiring Soon"
            sub="Within 30 Days"
          />
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-100 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-red-600 text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="space-y-6">
              {/* Alerts */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-gray-900">Compliance Alerts</h3>
                {documentAlerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
              {/* Table */}
              <div className="overflow-x-auto">
                <h3 className="text-base font-bold text-gray-900 mb-4">Employee Document Compliance</h3>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Document</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Expiry Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeDocuments.map((doc) => (
                      <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <p className="text-sm font-semibold text-gray-800">{doc.empName}</p>
                          <p className="text-xs text-gray-400">{doc.empId}</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <DocumentIcon />
                            <span className="text-sm text-gray-600">{doc.documentName}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={doc.status} />
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{doc.expiryDate}</td>
                        <td className="px-4 py-3">
                          <button className="text-sm text-red-600 hover:text-red-700 font-medium">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Policies Tab */}
          {activeTab === "policies" && (
            <div className="space-y-6">
              {/* Alerts */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-gray-900">Compliance Alerts</h3>
                {policyAlerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
              {/* Table */}
              <div className="overflow-x-auto">
                <h3 className="text-base font-bold text-gray-900 mb-4">Policy Compliance</h3>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Policy Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Updated</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {policyCompliance.map((policy) => (
                      <tr key={policy.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <p className="text-sm font-semibold text-gray-800">{policy.policyName}</p>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{policy.department}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{policy.lastUpdated}</td>
                        <td className="px-4 py-3">
                          <StatusBadge status={policy.status} />
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-sm text-red-600 hover:text-red-700 font-medium">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Trainings Tab */}
          {activeTab === "trainings" && (
            <div className="space-y-6">
              {/* Alerts */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-gray-900">Compliance Alerts</h3>
                {trainingAlerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
              {/* Table */}
              <div className="overflow-x-auto">
                <h3 className="text-base font-bold text-gray-900 mb-4">Training Compliance</h3>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Training Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Completion Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainingCompliance.map((training) => (
                      <tr key={training.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <p className="text-sm font-semibold text-gray-800">{training.trainingName}</p>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{training.department}</td>
                        <td className="px-4 py-3">
                          <StatusBadge status={training.status} />
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{training.completionDate}</td>
                        <td className="px-4 py-3">
                          <button className="text-sm text-red-600 hover:text-red-700 font-medium">Track</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Checklist Tab */}
          {activeTab === "checklist" && (
            <div className="space-y-6">
              {/* Alerts */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-gray-900">Compliance Alerts</h3>
                {checklistAlerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
              {/* Checklist */}
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-4">Compliance Checklist</h3>
                <div className="space-y-3">
                  {complianceChecklist.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${item.status === "Completed" ? "bg-green-500" : "bg-gray-300"}`}>
                          {item.status === "Completed" && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                              <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="white"/>
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{item.task}</p>
                          <PriorityBadge priority={item.priority} />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusBadge status={item.status} />
                        <button className="text-sm text-gray-500 hover:text-gray-700">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z" fill="#6B7280"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Added Compliance Items */}
          {complianceItems.length > 0 && (
            <div className="mt-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Recently Added Items</h3>
              <div className="space-y-3">
                {complianceItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.type} - {item.department} - Due: {item.dueDate}</p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Compliance Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center z-50 justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Add Compliance Item</h2>
              <button
                onClick={handleModalClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
                <input
                  type="text"
                  value={newCompliance.title}
                  onChange={(e) => setNewCompliance({ ...newCompliance, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter compliance title"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Type</label>
                <select
                  value={newCompliance.type}
                  onChange={(e) => setNewCompliance({ ...newCompliance, type: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                >
                  <option value="Document">Document</option>
                  <option value="Policy">Policy</option>
                  <option value="Training">Training</option>
                  <option value="Audit">Audit</option>
                </select>
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Assigned Department</label>
                <select
                  value={newCompliance.department}
                  onChange={(e) => setNewCompliance({ ...newCompliance, department: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                >
                  <option value="All">All Departments</option>
                  <option value="HR">HR</option>
                  <option value="IT">IT</option>
                  <option value="Finance">Finance</option>
                  <option value="Sales">Sales</option>
                  <option value="Production">Production</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Due Date</label>
                <input
                  type="date"
                  value={newCompliance.dueDate}
                  onChange={(e) => setNewCompliance({ ...newCompliance, dueDate: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                <select
                  value={newCompliance.status}
                  onChange={(e) => setNewCompliance({ ...newCompliance, status: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="In Review">In Review</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 p-5 border-t border-gray-100">
              <button
                onClick={handleModalClose}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCompliance}
                disabled={!newCompliance.title || !newCompliance.dueDate}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
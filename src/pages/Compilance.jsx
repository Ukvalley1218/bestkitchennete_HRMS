import { useState } from "react";
import LeaveStatCard from "../components/StatCard";

export default function LeaveManagement() {

  // ✅ Icons must be COMPONENTS (which yours already are)
  const TotalPayrollIcon = () => (
  <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="35" height="35" rx="10" fill="#FFE3E3"/>
<path d="M23.625 11.8125H12.375C12.0766 11.8125 11.7905 11.931 11.5795 12.142C11.3685 12.353 11.25 12.6391 11.25 12.9375V16.875C11.25 20.5819 13.0444 22.8284 14.5498 24.0602C16.1712 25.3863 17.7841 25.837 17.8545 25.8553C17.9511 25.8816 18.0531 25.8816 18.1498 25.8553C18.2201 25.837 19.8309 25.3863 21.4545 24.0602C22.9556 22.8284 24.75 20.5819 24.75 16.875V12.9375C24.75 12.6391 24.6315 12.353 24.4205 12.142C24.2095 11.931 23.9234 11.8125 23.625 11.8125ZM23.625 16.875C23.625 19.4815 22.6645 21.5972 20.7703 23.1623C19.9457 23.8414 19.008 24.3698 18 24.7233C17.0052 24.3759 16.079 23.8569 15.2634 23.1898C13.3467 21.6218 12.375 19.4977 12.375 16.875V12.9375H23.625V16.875Z" fill="#A60000"/>
</svg>

  );
const initialRequests = [
  {
    id: 1,
    name: "Rajesh Kumar",
    empId: "EMP001",
    leaveType: "Casual Leave",
    from: "2026-02-15",
    to: "2026-02-16",
    days: 2,
    reason: "Personal work",
    status: "Pending",
  },
  {
    id: 2,
    name: "Priya Sharma",
    empId: "EMP002",
    leaveType: "Sick Leave",
    from: "2026-02-18",
    to: "2026-02-18",
    days: 1,
    reason: "Medical appointment",
    status: "Approved",
  },
  {
    id: 3,
    name: "Amit Patel",
    empId: "EMP003",
    leaveType: "Earned Leave",
    from: "2026-02-20",
    to: "2026-02-24",
    days: 5,
    reason: "Family vacation",
    status: "Pending",
  },
];
  const ProcessedIcon = () => (
   <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="35" height="35" rx="10" fill="#FFE3E3"/>
<path d="M25.6508 22.2251L19.5019 11.5468C19.3483 11.2851 19.1289 11.0682 18.8656 10.9175C18.6023 10.7668 18.3042 10.6875 18.0008 10.6875C17.6974 10.6875 17.3992 10.7668 17.1359 10.9175C16.8726 11.0682 16.6532 11.2851 16.4996 11.5468L10.3508 22.2251C10.2029 22.4782 10.125 22.766 10.125 23.059C10.125 23.3521 10.2029 23.6399 10.3508 23.8929C10.5024 24.1561 10.7214 24.3742 10.9852 24.5249C11.249 24.6755 11.5482 24.7532 11.8519 24.75H24.1496C24.4531 24.753 24.7519 24.6751 25.0155 24.5245C25.279 24.3739 25.4978 24.1559 25.6493 23.8929C25.7974 23.64 25.8756 23.3523 25.8758 23.0592C25.8761 22.7662 25.7984 22.4783 25.6508 22.2251ZM24.6755 23.3297C24.6219 23.4212 24.545 23.4967 24.4525 23.5486C24.3601 23.6005 24.2556 23.6269 24.1496 23.625H11.8519C11.7459 23.6269 11.6414 23.6005 11.549 23.5486C11.4565 23.4967 11.3796 23.4212 11.326 23.3297C11.2774 23.2475 11.2518 23.1538 11.2518 23.0583C11.2518 22.9629 11.2774 22.8691 11.326 22.7869L17.4748 12.1086C17.5295 12.0176 17.6068 11.9423 17.6992 11.89C17.7916 11.8377 17.896 11.8102 18.0022 11.8102C18.1083 11.8102 18.2127 11.8377 18.3051 11.89C18.3975 11.9423 18.4748 12.0176 18.5295 12.1086L24.6783 22.7869C24.7265 22.8694 24.7516 22.9632 24.7511 23.0587C24.7506 23.1542 24.7245 23.2478 24.6755 23.3297ZM17.4383 19.125V16.3125C17.4383 16.1634 17.4975 16.0203 17.603 15.9148C17.7085 15.8093 17.8516 15.75 18.0008 15.75C18.1499 15.75 18.293 15.8093 18.3985 15.9148C18.504 16.0203 18.5633 16.1634 18.5633 16.3125V19.125C18.5633 19.2742 18.504 19.4173 18.3985 19.5228C18.293 19.6283 18.1499 19.6875 18.0008 19.6875C17.8516 19.6875 17.7085 19.6283 17.603 19.5228C17.4975 19.4173 17.4383 19.2742 17.4383 19.125ZM18.8445 21.6563C18.8445 21.8232 18.795 21.9863 18.7023 22.1251C18.6096 22.2638 18.4778 22.372 18.3236 22.4358C18.1695 22.4997 17.9998 22.5164 17.8361 22.4838C17.6725 22.4513 17.5221 22.3709 17.4041 22.2529C17.2861 22.1349 17.2058 21.9846 17.1732 21.8209C17.1407 21.6572 17.1574 21.4876 17.2212 21.3334C17.2851 21.1792 17.3932 21.0475 17.532 20.9547C17.6707 20.862 17.8339 20.8125 18.0008 20.8125C18.2245 20.8125 18.4391 20.9014 18.5974 21.0597C18.7556 21.2179 18.8445 21.4325 18.8445 21.6563Z" fill="#A60000"/>
</svg>


  );
const ALERTS = [
  {
    title: "Contract Expiry - 3 Employees",
    due: "Due: Feb 28, 2026",
    bg: "bg-red-50",
    border: "border-red-100",
  },
  {
    title: "PF Compliance Document Pending",
    due: "Due: Feb 20, 2026",
    bg: "bg-yellow-50",
    border: "border-yellow-100",
  },
  {
    title: "Labor Law Audit Due",
    due: "Due: Mar 15, 2026",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
];
  const PendingIcon = () => (
  <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="35" height="35" rx="10" fill="#FFE3E3"/>
<path d="M17 10.6875C15.5537 10.6875 14.1399 11.1164 12.9374 11.9199C11.7349 12.7234 10.7976 13.8654 10.2441 15.2016C9.69067 16.5378 9.54586 18.0081 9.82801 19.4266C10.1102 20.8451 10.8066 22.148 11.8293 23.1707C12.852 24.1934 14.1549 24.8898 15.5734 25.172C16.9919 25.4541 18.4622 25.3093 19.7984 24.7559C21.1346 24.2024 22.2766 23.2651 23.0801 22.0626C23.8836 20.8601 24.3125 19.4463 24.3125 18C24.3105 16.0612 23.5394 14.2025 22.1685 12.8315C20.7975 11.4606 18.9388 10.6895 17 10.6875ZM17 24.1875C15.7762 24.1875 14.5799 23.8246 13.5624 23.1447C12.5449 22.4648 11.7518 21.4985 11.2835 20.3679C10.8152 19.2372 10.6926 17.9931 10.9314 16.7929C11.1701 15.5926 11.7594 14.4901 12.6248 13.6248C13.4901 12.7594 14.5926 12.1701 15.7929 11.9314C16.9931 11.6926 18.2372 11.8152 19.3679 12.2835C20.4985 12.7518 21.4648 13.5449 22.1447 14.5624C22.8246 15.5799 23.1875 16.7762 23.1875 18C23.1856 19.6405 22.5331 21.2132 21.3732 22.3732C20.2132 23.5331 18.6405 24.1856 17 24.1875ZM21.5 18C21.5 18.1492 21.4407 18.2923 21.3353 18.3977C21.2298 18.5032 21.0867 18.5625 20.9375 18.5625H18.3577L20.2105 20.4145C20.2627 20.4668 20.3042 20.5288 20.3325 20.5971C20.3608 20.6654 20.3753 20.7386 20.3753 20.8125C20.3753 20.8864 20.3608 20.9596 20.3325 21.0279C20.3042 21.0962 20.2627 21.1582 20.2105 21.2105C20.1582 21.2627 20.0962 21.3042 20.0279 21.3325C19.9596 21.3608 19.8864 21.3753 19.8125 21.3753C19.7386 21.3753 19.6654 21.3608 19.5971 21.3325C19.5288 21.3042 19.4668 21.2627 19.4145 21.2105L16.602 18.398C16.5233 18.3193 16.4696 18.219 16.4479 18.1099C16.4262 18.0007 16.4373 17.8875 16.4799 17.7847C16.5225 17.6818 16.5947 17.594 16.6873 17.5322C16.7798 17.4704 16.8887 17.4374 17 17.4375H20.9375C21.0867 17.4375 21.2298 17.4968 21.3353 17.6023C21.4407 17.7077 21.5 17.8508 21.5 18Z" fill="#A60000"/>
</svg>


  );

  const AvgCtcIcon = () => (
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="35" height="35" rx="10" fill="#FFE3E3"/>
<path d="M23.625 11.25H21.9375V10.6875C21.9375 10.5383 21.8782 10.3952 21.7727 10.2898C21.6673 10.1843 21.5242 10.125 21.375 10.125C21.2258 10.125 21.0827 10.1843 20.9773 10.2898C20.8718 10.3952 20.8125 10.5383 20.8125 10.6875V11.25H15.1875V10.6875C15.1875 10.5383 15.1282 10.3952 15.0227 10.2898C14.9173 10.1843 14.7742 10.125 14.625 10.125C14.4758 10.125 14.3327 10.1843 14.2273 10.2898C14.1218 10.3952 14.0625 10.5383 14.0625 10.6875V11.25H12.375C12.0766 11.25 11.7905 11.3685 11.5795 11.5795C11.3685 11.7905 11.25 12.0766 11.25 12.375V23.625C11.25 23.9234 11.3685 24.2095 11.5795 24.4205C11.7905 24.6315 12.0766 24.75 12.375 24.75H23.625C23.9234 24.75 24.2095 24.6315 24.4205 24.4205C24.6315 24.2095 24.75 23.9234 24.75 23.625V12.375C24.75 12.0766 24.6315 11.7905 24.4205 11.5795C24.2095 11.3685 23.9234 11.25 23.625 11.25ZM14.0625 12.375V12.9375C14.0625 13.0867 14.1218 13.2298 14.2273 13.3352C14.3327 13.4407 14.4758 13.5 14.625 13.5C14.7742 13.5 14.9173 13.4407 15.0227 13.3352C15.1282 13.2298 15.1875 13.0867 15.1875 12.9375V12.375H20.8125V12.9375C20.8125 13.0867 20.8718 13.2298 20.9773 13.3352C21.0827 13.4407 21.2258 13.5 21.375 13.5C21.5242 13.5 21.6673 13.4407 21.7727 13.3352C21.8782 13.2298 21.9375 13.0867 21.9375 12.9375V12.375H23.625V14.625H12.375V12.375H14.0625ZM23.625 23.625H12.375V15.75H23.625V23.625ZM16.875 17.4375V21.9375C16.875 22.0867 16.8157 22.2298 16.7102 22.3352C16.6048 22.4407 16.4617 22.5 16.3125 22.5C16.1633 22.5 16.0202 22.4407 15.9148 22.3352C15.8093 22.2298 15.75 22.0867 15.75 21.9375V18.3473L15.4392 18.5034C15.3057 18.5702 15.1511 18.5812 15.0095 18.534C14.8679 18.4868 14.7508 18.3852 14.6841 18.2517C14.6173 18.1182 14.6063 17.9636 14.6535 17.822C14.7007 17.6804 14.8023 17.5633 14.9358 17.4966L16.0608 16.9341C16.1466 16.8911 16.2419 16.8709 16.3377 16.8752C16.4336 16.8795 16.5267 16.9082 16.6083 16.9587C16.6899 17.0091 16.7572 17.0796 16.8039 17.1634C16.8506 17.2472 16.8751 17.3416 16.875 17.4375ZM21.0347 19.5785L19.6875 21.375H20.8125C20.9617 21.375 21.1048 21.4343 21.2102 21.5398C21.3157 21.6452 21.375 21.7883 21.375 21.9375C21.375 22.0867 21.3157 22.2298 21.2102 22.3352C21.1048 22.4407 20.9617 22.5 20.8125 22.5H18.5625C18.458 22.5 18.3556 22.4709 18.2668 22.416C18.1779 22.3611 18.1061 22.2825 18.0594 22.1891C18.0127 22.0956 17.9929 21.991 18.0023 21.887C18.0117 21.7829 18.0498 21.6836 18.1125 21.6L20.1361 18.9021C20.1821 18.8408 20.2151 18.7708 20.2331 18.6963C20.2511 18.6218 20.2537 18.5444 20.2407 18.4689C20.2277 18.3934 20.1994 18.3213 20.1576 18.2571C20.1157 18.1929 20.0612 18.1379 19.9973 18.0955C19.9334 18.0532 19.8616 18.0243 19.7862 18.0107C19.7108 17.9971 19.6333 17.9991 19.5587 18.0164C19.4841 18.0338 19.4138 18.0663 19.3521 18.1118C19.2905 18.1574 19.2388 18.215 19.2002 18.2812C19.1644 18.3473 19.1157 18.4054 19.057 18.4523C18.9983 18.4992 18.9308 18.5338 18.8585 18.5542C18.7862 18.5746 18.7106 18.5803 18.6361 18.571C18.5615 18.5616 18.4896 18.5375 18.4246 18.4999C18.3595 18.4623 18.3027 18.4121 18.2573 18.3522C18.212 18.2923 18.1792 18.2239 18.1607 18.1511C18.1422 18.0783 18.1385 18.0026 18.1498 17.9283C18.1611 17.854 18.1871 17.7828 18.2264 17.7188C18.4122 17.3972 18.6989 17.1459 19.042 17.0039C19.3852 16.8618 19.7656 16.8369 20.1243 16.9331C20.483 17.0292 20.8 17.241 21.0261 17.5356C21.2522 17.8302 21.3749 18.1911 21.375 18.5625C21.3762 18.9294 21.2566 19.2864 21.0347 19.5785Z" fill="#A60000"/>
</svg>

  );

  const [activeTab, setActiveTab] = useState("thisMonth");

  const TabButton = ({ label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`px-5 py-2 text-sm font-medium rounded-xl border border-gray-300 transition-colors ${
        active
          ? "bg-gray-100 text-gray-800"
          : "bg-white text-gray-500 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
   const [requests, setRequests] = useState(initialRequests);

  const handleApprove = (id) =>
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Approved" } : r))
    );

  const handleReject = (id) =>
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Rejected" } : r))
    );

  const columns = [
    "EMPLOYEE",
    "LEAVE TYPE",
    "FROM",
    "TO",
    "DAYS",
    "REASON",
    "STATUS",
    "ACTIONS",
  ];
const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-yellow-100 text-yellow-600",
    Approved: "bg-green-100 text-green-600",
    Rejected: "bg-red-100 text-red-500",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] ?? styles.Pending}`}
    >
      {status}
    </span>
  );
};
const LeaveRequestRow = ({ request, onApprove, onReject }) => {
  const isPending = request.status === "Pending";

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-100">
      {/* Employee */}
      <td className="px-6 py-5">
        <p className="text-sm font-bold text-gray-800">{request.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{request.empId}</p>
      </td>

      {/* Leave Type */}
      <td className="px-6 py-5">
        <p className="text-sm text-gray-600 whitespace-pre-line">{request.leaveType}</p>
      </td>

      {/* From */}
      <td className="px-6 py-5 text-sm text-gray-600">{request.from}</td>

      {/* To */}
      <td className="px-6 py-5 text-sm text-gray-600">{request.to}</td>

      {/* Days */}
      <td className="px-6 py-5 text-sm text-gray-600">{request.days}</td>

      {/* Reason */}
      <td className="px-6 py-5 text-sm text-gray-600">{request.reason}</td>

      {/* Status */}
      <td className="px-6 py-5">
        <StatusBadge status={request.status} />
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        {isPending ? (
          <div className="flex gap-2">
            <button
              onClick={() => onApprove(request.id)}
              className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg transition-colors duration-150"
            >
              Approve
            </button>
            <button
              onClick={() => onReject(request.id)}
              className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition-colors duration-150"
            >
              Reject
            </button>
          </div>
        ) : null}
      </td>
    </tr>
  );
};

  return (
    <div className=" p-6 sm:p-10 flex items-start justify-center">
      <div className="w-full max-w-7xl space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Compliance & Documentation
          </h1>
          <p className="text-sm text-[#757575] mt-1">
                    Manage legal compliance and documentation
          </p>
        </div>

        {/* Tabs */}
       

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">

          <LeaveStatCard
            icon={TotalPayrollIcon}  
            trend="+12"
            value="4.2/5"
            label="Active Program"
            sub="This Month"
          />

          <LeaveStatCard
            icon={ProcessedIcon}     
            trend="+5"
            value="08"
            label="Alert"
            sub="Employees"
          />

          <LeaveStatCard
            icon={PendingIcon}       
            trend="+5"
            value="12"
            label="Pending Docs"
            sub="Employees"
          />

          {/* <LeaveStatCard
            icon={AvgCtcIcon}       
            trend="+5"
            value="08"
            label="On Leave Today"
            sub="Per Annum"
          /> */}

        </div>
        <div className=" flex items-start justify-center p-2">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 w-full max-w-7xl">

        {/* Header */}
        <h2 className="text-base font-bold text-gray-900 mb-4">
          Compliance Alerts
        </h2>

        {/* Alert rows */}
        <div className="space-y-3">
          {ALERTS.map((alert, i) => (
            <div
              key={i}
              className={`flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl border ${alert.bg} ${alert.border}`}
            >
              {/* Left: title + due */}
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {alert.title}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{alert.due}</p>
              </div>

              {/* Right: Action link */}
              <button className="text-sm font-semibold text-red-500 hover:text-red-600 whitespace-nowrap transition-colors">
                Action →
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
      </div>
      
      
    </div>
  );
}
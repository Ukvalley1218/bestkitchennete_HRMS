import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Megaphone,
  Phone,
  ShoppingCart,
  Wallet,
  Users,
  Settings,
  Package,
  ClipboardList,
  User,
  Menu,
  X,
  Search,
  ChevronDown,
  LogOut,
  SofaIcon,
} from "lucide-react";
import logo from "../assets/image 31.png";
import { PiCheckCircle, PiFactory } from "react-icons/pi";

const menuItems = [
  // { name: "CEO Dashboard", icon: LayoutDashboard, path: "/ceodashboard" },
  // {
  //   name: "Marketing",
  //   icon: Megaphone,
  //   path: "/marketing",
  //   submenu: [
  //     { name: "Dashboard", path: "/marketing/dashboard" },
  //     { name: "Campaigns", path: "/marketing/campaigns" },
  //     { name: "Leads", path: "/marketing/leads" },
  //     { name: "Analytics", path: "/marketing/analytics" },
  //   ],
  // },
  // { name: "Telecommunication", icon: Phone, path: "/tele/dashboard" },
  // { name: "Interior", icon: SofaIcon, path: "/interior" },
  // { name: "Sales", icon: ShoppingCart, path: "/sales/dashboard" },
  // {
  //   name: "Accounts/Finance",
  //   icon: Wallet,
  //   path: "/finance",
  //   submenu: [
  //     { name: "Finance Dashboard", path: "/finance/dashboard" },
  //     { name: "Party Master", path: "/finance/party_dashboard" },
  //     { name: "Sales Invoice", path: "/finance/sales_dashboard" },
  //     { name: "GST Invoice", path: "/finance/gst_dashboard" },
  //   ],
  // },
  {
    name: "HRMS",
    icon: Users,
    path: "/hrms/dashboard",
    submenu: [
      { name: "Dashboard", path: "/hrms/dashboard" },
      { name: "Recruitment", path: "/hrms/recruitment" },
      { name: "Employees", path: "/hrms/employees" },
      { name: "Attendance & Shift Management", path: "/hrms/attendance" },
      { name: "Leave Management", path: "/hrms/leave" },
      { name: "Performance Management", path: "/hrms/performance" },
      { name: "Payroll", path: "/hrms/payroll" },
      { name: "Incentives", path: "/hrms/incentives" },
      { name: "Calender & Training", path: "/hrms/calender" },
      { name: "Compilance", path: "/hrms/compilance" },
    ],
  },
  // { name: "Production", icon: PiFactory, path: "/production/dashboard" },
  // { name: "Operations", icon: PiCheckCircle, path: "/operations/dashboard" },
  // {
  //   name: "CRM",
  //   icon: Users,
  //   path: "/crm",
  //   submenu: [
  //     { name: "Dashboard", path: "/crm/dashboard" },
  //     { name: "Customer History", path: "/crm/history" },
  //   ],
  // },
  // { name: "Administration", icon: Settings, path: "/admin" },
  // { name: "Inventory", icon: Package, path: "/inventory" },
  // { name: "Project Tasks", icon: ClipboardList, path: "/tasks" },
  // {
  //   name: "Profile",
  //   icon: User,
  //   path: "/profile",
  // submenu: [
  //   { name: "Basic Info", path: "/finance/dashboard" },
  //   { name: "Company Info", path: "/finance/party_dashboard" },
  //   { name: "System", path: "/finance/sales_dashboard" },
  //   { name: "Payroll", path: "/finance/gst_dashboard" },
  //   { name: "Performance", path: "/finance/gst_dashboard" },
  //   { name: "Docs", path: "/finance/gst_dashboard" },
  //   { name: "Device Info", path: "/finance/gst_dashboard" },
  //   { name: "Education", path: "/finance/gst_dashboard" },
  //   { name: "System Tracking", path: "/finance/gst_dashboard" },
  // ],
  // },
];

const SidebarLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const location = useLocation();

  const toggleSubmenu = (menuName) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  /* ✅ AUTO OPEN SUBMENU WHEN ROUTE MATCHES */
  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.submenu) {
        const isSubmenuActive = item.submenu.some(
          (sub) => sub.path === location.pathname,
        );

        if (isSubmenuActive) {
          setExpandedMenu(item.name);
        }
      }
    });
  }, [location.pathname]);

  return (
    <div className="flex w-full overflow-x-hidden">
      {/* ================= MOBILE HEADER ================= */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b z-50 flex items-center px-4">
        <button onClick={() => setOpen(true)}>
          <Menu className="text-gray-700" />
        </button>
        <img src={logo} alt="logo" className="h-12 ml-4" />
      </div>

      {/* ================= OVERLAY ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-red-600 text-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 overflow-y-auto scrollbar-hide
        `}
      >
        {/* Logo */}
        <div className="bg-white border border-[#EC1313] px-6 py-4 flex items-center justify-between border-b sticky top-0">
          <img src={logo} alt="logo" className="h-20" />
          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <X className="text-gray-700" />
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-4 space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedMenu === item.name;
            const hasSubmenu = item.submenu && item.submenu.length > 0;

            return (
              <div key={item.name}>
                {hasSubmenu ? (
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors
                      ${
                        isExpanded
                          ? "bg-white/40 text-white"
                          : "hover:bg-red-500"
                      }`}
                  >
                    <Icon size={18} />
                    <span className="flex-1 text-left">{item.name}</span>
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors
                      ${
                        isActive ? "bg-white/40 text-white" : "hover:bg-red-500"
                      }`
                    }
                  >
                    <Icon size={18} />
                    {item.name}
                  </NavLink>
                )}

                {/* Submenu */}
                {hasSubmenu && isExpanded && (
                  <div className="mt-1 ml-4 space-y-1 border-l-2 border-white/20 pl-3">
                    {item.submenu.map((subitem) => (
                      <NavLink
                        key={subitem.path}
                        to={subitem.path}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-lg text-sm transition-colors
                          ${
                            isActive
                              ? "bg-white/40 text-white font-medium"
                              : "hover:bg-red-500/50"
                          }`
                        }
                      >
                        {subitem.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <button className="bg-white flex items-center gap-2 w-full justify-center text-black px-6 py-2 my-5 rounded-xl">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </nav>
      </aside>
      {/* ================= MAIN CONTENT ================= */}
      <div className="w-full lg:ml-64 min-h-screen bg-gray-50 overflow-x-hidden">
        {/* ===== DESKTOP HEADER ===== */}
        <header className="hidden lg:flex h-20 bg-white border-b border-[#E2E2E2] px-6 items-center justify-between">
          {/* Search */}
          <div className="flex items-center gap-3">
            <div className="relative lg:w-195 mx-5">
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Global Search..."
                className="w-full pl-9 pr-4 py-2 border border-[#E2E2E2] rounded-lg text-sm focus:outline-none"
              />
            </div>
            <div className="flex gap-3">
              <div className="bg-[#E2E2E2] p-3 cursor-pointer rounded-full">
                <svg
                  width="17"
                  height="15"
                  viewBox="0 0 17 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.1382 0.744551C16.042 0.522294 15.8826 0.33322 15.6798 0.200844C15.477 0.0684681 15.2397 -0.00136842 14.9975 2.03161e-05H1.24754C1.00561 0.000497003 0.769017 0.0711689 0.566464 0.203463C0.36391 0.335757 0.204099 0.523988 0.106418 0.74532C0.00873761 0.966653 -0.0226154 1.21158 0.0161627 1.45038C0.0549408 1.68918 0.162184 1.91159 0.324882 2.09065L0.331132 2.09768L5.62254 7.74768V13.75C5.62249 13.9763 5.68383 14.1983 5.80003 14.3924C5.91624 14.5865 6.08294 14.7454 6.28237 14.8522C6.4818 14.959 6.70648 15.0097 6.93245 14.9989C7.15843 14.988 7.37722 14.9161 7.56551 14.7906L10.0655 13.1235C10.2369 13.0093 10.3774 12.8546 10.4746 12.673C10.5718 12.4915 10.6226 12.2887 10.6225 12.0828V7.74768L15.9147 2.09768L15.921 2.09065C16.0854 1.91241 16.1937 1.6897 16.2323 1.45031C16.2709 1.21092 16.2382 0.965451 16.1382 0.744551ZM9.54285 7.07658C9.43473 7.19121 9.3739 7.34245 9.37254 7.50002V12.0828L6.87254 13.75V7.50002C6.87259 7.34131 6.81225 7.18853 6.70379 7.07268L1.24754 1.25002H14.9975L9.54285 7.07658Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="bg-[#E2E2E2] p-3 cursor-pointer rounded-full">
                <svg
                  width="15"
                  height="17"
                  viewBox="0 0 15 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.8272 11.8703C14.3936 11.1234 13.7491 9.01016 13.7491 6.25C13.7491 4.5924 13.0906 3.00269 11.9185 1.83058C10.7464 0.65848 9.1567 0 7.49909 0C5.84149 0 4.25178 0.65848 3.07968 1.83058C1.90757 3.00269 1.24909 4.5924 1.24909 6.25C1.24909 9.01094 0.603782 11.1234 0.170188 11.8703C0.0594621 12.0602 0.000761949 12.2759 7.36794e-06 12.4957C-0.000747213 12.7155 0.0564706 12.9316 0.16589 13.1223C0.27531 13.3129 0.433063 13.4713 0.623239 13.5815C0.813416 13.6917 1.02929 13.7498 1.24909 13.75H4.43738C4.58157 14.4556 4.96505 15.0897 5.52295 15.5451C6.08085 16.0006 6.77892 16.2493 7.49909 16.2493C8.21927 16.2493 8.91734 16.0006 9.47524 15.5451C10.0331 15.0897 10.4166 14.4556 10.5608 13.75H13.7491C13.9688 13.7497 14.1846 13.6915 14.3747 13.5812C14.5647 13.471 14.7224 13.3125 14.8317 13.1219C14.941 12.9313 14.9982 12.7153 14.9974 12.4955C14.9966 12.2758 14.9379 12.0601 14.8272 11.8703ZM7.49909 15C7.11145 14.9999 6.73338 14.8796 6.41691 14.6558C6.10043 14.4319 5.86112 14.1155 5.73191 13.75H9.26628C9.13707 14.1155 8.89776 14.4319 8.58128 14.6558C8.26481 14.8796 7.88674 14.9999 7.49909 15ZM1.24909 12.5C1.85066 11.4656 2.49909 9.06875 2.49909 6.25C2.49909 4.92392 3.02588 3.65215 3.96356 2.71447C4.90124 1.77678 6.17301 1.25 7.49909 1.25C8.82518 1.25 10.0969 1.77678 11.0346 2.71447C11.9723 3.65215 12.4991 4.92392 12.4991 6.25C12.4991 9.06641 13.146 11.4633 13.7491 12.5H1.24909Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="bg-[#E2E2E2] p-3 cursor-pointer rounded-full">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.17509 4.42509C7.43341 4.42509 6.70838 4.64502 6.0917 5.05707C5.47501 5.46913 4.99437 6.0548 4.71054 6.74002C4.42671 7.42525 4.35245 8.17924 4.49714 8.90667C4.64184 9.6341 4.99899 10.3023 5.52343 10.8267C6.04788 11.3512 6.71607 11.7083 7.4435 11.853C8.17093 11.9977 8.92493 11.9235 9.61015 11.6396C10.2954 11.3558 10.881 10.8752 11.2931 10.2585C11.7052 9.64179 11.9251 8.91677 11.9251 8.17509C11.9241 7.18084 11.5286 6.22761 10.8256 5.52458C10.1226 4.82154 9.16933 4.42612 8.17509 4.42509ZM8.17509 10.6751C7.68063 10.6751 7.19728 10.5285 6.78616 10.2538C6.37504 9.97906 6.05461 9.58861 5.86539 9.13179C5.67617 8.67498 5.62666 8.17231 5.72312 7.68736C5.81958 7.20241 6.05769 6.75695 6.40732 6.40732C6.75695 6.05769 7.20241 5.81958 7.68736 5.72312C8.17231 5.62666 8.67498 5.67617 9.13179 5.86539C9.58861 6.05461 9.97906 6.37504 10.2538 6.78616C10.5285 7.19728 10.6751 7.68063 10.6751 8.17509C10.6751 8.83813 10.4117 9.47401 9.94285 9.94285C9.47401 10.4117 8.83813 10.6751 8.17509 10.6751ZM15.0501 8.34384C15.0532 8.23134 15.0532 8.11884 15.0501 8.00634L16.2157 6.55009C16.2768 6.47363 16.3191 6.38388 16.3392 6.28808C16.3593 6.19227 16.3566 6.09309 16.3313 5.99852C16.1399 5.28036 15.8541 4.59075 15.4813 3.94774C15.4325 3.86361 15.3647 3.79205 15.2833 3.73875C15.2019 3.68545 15.1092 3.65188 15.0126 3.64071L13.1595 3.43446C13.0824 3.35321 13.0043 3.27508 12.9251 3.20008L12.7063 1.34227C12.6951 1.24556 12.6614 1.15282 12.608 1.07144C12.5545 0.990053 12.4828 0.922281 12.3985 0.873522C11.7556 0.50106 11.0659 0.215747 10.3477 0.0250845C10.2532 -0.000180991 10.154 -0.00288084 10.0582 0.0172025C9.96239 0.0372859 9.87264 0.079591 9.79618 0.140709L8.34384 1.30008C8.23134 1.30008 8.11884 1.30008 8.00634 1.30008L6.55009 0.136803C6.47363 0.0756848 6.38388 0.0333797 6.28808 0.0132964C6.19227 -0.00678703 6.09309 -0.00408733 5.99852 0.0211782C5.28036 0.212606 4.59075 0.498431 3.94774 0.871178C3.86361 0.920027 3.79205 0.987839 3.73875 1.06922C3.68545 1.15059 3.65188 1.24329 3.64071 1.33993L3.43446 3.19618C3.35321 3.27378 3.27508 3.35191 3.20008 3.43055L1.34227 3.64383C1.24556 3.65509 1.15282 3.68878 1.07144 3.74222C0.990053 3.79566 0.922281 3.86738 0.873522 3.95165C0.501137 4.59474 0.21558 5.28434 0.0243032 6.00243C-0.000855418 6.09706 -0.00342863 6.19627 0.016791 6.29208C0.0370106 6.38788 0.0794573 6.4776 0.140709 6.55399L1.30008 8.00634C1.30008 8.11884 1.30008 8.23134 1.30008 8.34384L0.136803 9.80009C0.0756848 9.87655 0.0333797 9.96629 0.0132964 10.0621C-0.00678703 10.1579 -0.00408733 10.2571 0.0211782 10.3516C0.212606 11.0698 0.498431 11.7594 0.871178 12.4024C0.920027 12.4866 0.987839 12.5581 1.06922 12.6114C1.15059 12.6647 1.24329 12.6983 1.33993 12.7095L3.19305 12.9157C3.27066 12.997 3.34878 13.0751 3.42743 13.1501L3.64383 15.0079C3.65509 15.1046 3.68878 15.1974 3.74222 15.2787C3.79566 15.3601 3.86738 15.4279 3.95165 15.4766C4.59474 15.849 5.28434 16.1346 6.00243 16.3259C6.09706 16.351 6.19627 16.3536 6.29208 16.3334C6.38788 16.3132 6.4776 16.2707 6.55399 16.2095L8.00634 15.0501C8.11884 15.0532 8.23134 15.0532 8.34384 15.0501L9.80009 16.2157C9.87655 16.2768 9.96629 16.3191 10.0621 16.3392C10.1579 16.3593 10.2571 16.3566 10.3516 16.3313C11.0699 16.1402 11.7596 15.8544 12.4024 15.4813C12.4866 15.4325 12.5581 15.3647 12.6114 15.2833C12.6647 15.2019 12.6983 15.1092 12.7095 15.0126L12.9157 13.1595C12.997 13.0824 13.0751 13.0043 13.1501 12.9251L15.0079 12.7063C15.1046 12.6951 15.1974 12.6614 15.2787 12.608C15.3601 12.5545 15.4279 12.4828 15.4766 12.3985C15.849 11.7554 16.1346 11.0658 16.3259 10.3477C16.351 10.2531 16.3536 10.1539 16.3334 10.0581C16.3132 9.96229 16.2707 9.87257 16.2095 9.79618L15.0501 8.34384ZM13.7923 7.83602C13.8056 8.06187 13.8056 8.2883 13.7923 8.51415C13.783 8.66877 13.8314 8.82134 13.9282 8.94227L15.0368 10.3274C14.9096 10.7317 14.7467 11.1239 14.5501 11.4993L12.7845 11.6993C12.6307 11.7164 12.4887 11.7899 12.386 11.9056C12.2356 12.0747 12.0755 12.2349 11.9063 12.3852C11.7906 12.488 11.7172 12.6299 11.7001 12.7837L11.504 14.5477C11.1286 14.7445 10.7364 14.9074 10.3321 15.0345L8.94618 13.9259C8.83528 13.8373 8.69751 13.789 8.55555 13.7891H8.51805C8.29221 13.8024 8.06578 13.8024 7.83993 13.7891C7.68536 13.7803 7.53295 13.8287 7.4118 13.9251L6.02274 15.0345C5.61847 14.9073 5.2263 14.7444 4.85087 14.5477L4.65087 12.7845C4.6338 12.6307 4.56031 12.4887 4.44462 12.386C4.27548 12.2356 4.11531 12.0755 3.96493 11.9063C3.86222 11.7906 3.72025 11.7172 3.56649 11.7001L1.80243 11.5032C1.6057 11.1278 1.44282 10.7356 1.31571 10.3313L2.4243 8.9454C2.5211 8.82447 2.56955 8.6719 2.56024 8.51727C2.54696 8.29143 2.54696 8.06499 2.56024 7.83915C2.56955 7.68452 2.5211 7.53195 2.4243 7.41102L1.31571 6.02274C1.44292 5.61847 1.6058 5.2263 1.80243 4.85087L3.56571 4.65087C3.71947 4.6338 3.86144 4.56031 3.96415 4.44462C4.11453 4.27548 4.2747 4.11531 4.44383 3.96493C4.55999 3.86215 4.63378 3.71986 4.65087 3.56571L4.84696 1.80243C5.22235 1.6057 5.61453 1.44282 6.01884 1.31571L7.40477 2.4243C7.5257 2.5211 7.67828 2.56955 7.8329 2.56024C8.05874 2.54696 8.28518 2.54696 8.51102 2.56024C8.66559 2.5691 8.818 2.52071 8.93915 2.4243L10.3274 1.31571C10.7317 1.44292 11.1239 1.6058 11.4993 1.80243L11.6993 3.56571C11.7164 3.71947 11.7899 3.86144 11.9056 3.96415C12.0747 4.11453 12.2349 4.2747 12.3852 4.44383C12.488 4.55953 12.6299 4.63302 12.7837 4.65008L14.5477 4.84618C14.7445 5.22157 14.9074 5.61375 15.0345 6.01805L13.9259 7.40399C13.8281 7.52594 13.7796 7.68008 13.7899 7.83602H13.7923Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* ✅ VERTICAL DIVIDER */}
          <div className="h-12 w-px bg-[#E2E2E2]" />

          {/* Actions */}
          <div className="flex items-center gap-4 mr-10">
            {/* User */}
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-linear-to-b from-[#06378D] to-[#008CFF] text-white flex items-center justify-center font-semibold">
                A
              </div>
              <div className="text-sm leading-tight">
                <p className="font-medium">Admin User</p>
                <p className="text-xs text-gray-500">CEO</p>
              </div>
            </div>
          </div>
        </header>

        {/* ===== PAGE CONTENT ===== */}
        <main className="pt-16 lg:pt-0 p-6">{children}</main>
      </div>
    </div>
  );
};

export default SidebarLayout;

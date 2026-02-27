import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
const statCards = [
  {
    icon: (
     <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="35" height="35" rx="10" fill="#FFE3E3"/>
<path d="M17.2441 20.1035C17.998 19.6016 18.5703 18.8704 18.8765 18.0181C19.1827 17.1657 19.2065 16.2375 18.9443 15.3706C18.6821 14.5037 18.1479 13.7441 17.4207 13.2043C16.6935 12.6645 15.8119 12.373 14.9062 12.373C14.0005 12.373 13.1189 12.6645 12.3917 13.2043C11.6644 13.7441 11.1302 14.5037 10.8681 15.3706C10.6059 16.2375 10.6297 17.1657 10.9359 18.0181C11.242 18.8704 11.8144 19.6016 12.5683 20.1035C11.2046 20.6061 10.0399 21.5362 9.24815 22.755C9.20653 22.8168 9.17763 22.8863 9.16311 22.9595C9.1486 23.0326 9.14876 23.1079 9.16359 23.1809C9.17842 23.254 9.20763 23.3233 9.24951 23.385C9.29139 23.4467 9.34511 23.4994 9.40755 23.5401C9.46999 23.5809 9.5399 23.6088 9.61321 23.6222C9.68653 23.6357 9.7618 23.6345 9.83463 23.6186C9.90747 23.6027 9.97642 23.5725 10.0375 23.5298C10.0986 23.487 10.1505 23.4325 10.1903 23.3695C10.7011 22.584 11.4 21.9385 12.2235 21.4916C13.0471 21.0447 13.9692 20.8107 14.9062 20.8107C15.8432 20.8107 16.7653 21.0447 17.5889 21.4916C18.4124 21.9385 19.1113 22.584 19.6221 23.3695C19.7046 23.4921 19.832 23.5774 19.9768 23.6068C20.1217 23.6362 20.2723 23.6074 20.396 23.5267C20.5198 23.4459 20.6069 23.3197 20.6383 23.1753C20.6698 23.0309 20.6432 22.8799 20.5642 22.755C19.7724 21.5362 18.6078 20.6061 17.2441 20.1035ZM11.8124 16.5935C11.8124 15.9816 11.9939 15.3835 12.3338 14.8747C12.6738 14.3659 13.157 13.9694 13.7223 13.7353C14.2876 13.5011 14.9096 13.4398 15.5098 13.5592C16.1099 13.6786 16.6611 13.9732 17.0938 14.4059C17.5265 14.8386 17.8211 15.3898 17.9405 15.9899C18.0599 16.5901 17.9986 17.2121 17.7644 17.7774C17.5303 18.3427 17.1338 18.8259 16.625 19.1659C16.1162 19.5058 15.5181 19.6873 14.9062 19.6873C14.086 19.6863 13.2996 19.3601 12.7196 18.7801C12.1396 18.2001 11.8134 17.4137 11.8124 16.5935ZM26.5879 23.5334C26.463 23.6148 26.3108 23.6433 26.1648 23.6126C26.0188 23.5819 25.8911 23.4945 25.8096 23.3695C25.2994 22.5835 24.6006 21.9377 23.7769 21.491C22.9532 21.0444 22.0307 20.811 21.0937 20.8123C20.9445 20.8123 20.8014 20.753 20.6959 20.6475C20.5905 20.542 20.5312 20.3989 20.5312 20.2498C20.5312 20.1006 20.5905 19.9575 20.6959 19.852C20.8014 19.7465 20.9445 19.6873 21.0937 19.6873C21.5493 19.6868 21.9992 19.5858 22.4112 19.3913C22.8232 19.1969 23.1872 18.9138 23.4772 18.5624C23.7671 18.2109 23.9759 17.7998 24.0885 17.3584C24.2011 16.9169 24.2149 16.456 24.1287 16.0086C24.0426 15.5612 23.8587 15.1384 23.5902 14.7703C23.3217 14.4022 22.9752 14.098 22.5755 13.8793C22.1758 13.6607 21.7328 13.533 21.278 13.5054C20.8232 13.4779 20.368 13.5511 19.9448 13.7198C19.8758 13.7497 19.8015 13.7654 19.7263 13.766C19.6512 13.7666 19.5766 13.7522 19.5071 13.7235C19.4376 13.6949 19.3746 13.6526 19.3217 13.5991C19.2689 13.5457 19.2272 13.4822 19.1993 13.4124C19.1714 13.3426 19.1578 13.2679 19.1592 13.1928C19.1606 13.1176 19.1771 13.0435 19.2077 12.9748C19.2382 12.9062 19.2822 12.8443 19.3371 12.7929C19.392 12.7415 19.4566 12.7017 19.5271 12.6757C20.4957 12.2894 21.5729 12.2755 22.5511 12.6367C23.5293 12.9978 24.339 13.7084 24.8242 14.6314C25.3094 15.5543 25.4355 16.6243 25.1784 17.6348C24.9212 18.6453 24.2989 19.5247 23.4316 20.1035C24.7953 20.6061 25.9599 21.5362 26.7517 22.755C26.8332 22.8799 26.8617 23.0321 26.831 23.1781C26.8003 23.3241 26.7128 23.4518 26.5879 23.5334Z" fill="#A60000"/>
</svg>

    ),
    label: "Total Employee",
    subLabel: "Active Workforce",
    value: 120,
    change: "+12",
    changeColor: "text-[#A60000]",
    bg: "bg-white",
    // iconBg: "bg-blue-50 text-blue-500",
  },
  {
    icon: (
      <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="35" height="35" rx="10" fill="#FFE3E3"/>
<path d="M24.6354 20.1416L21.323 18.6573L21.3138 18.6531C21.1419 18.5795 20.9543 18.55 20.768 18.5672C20.5818 18.5844 20.4028 18.6477 20.2472 18.7515C20.2289 18.7636 20.2113 18.7767 20.1945 18.7909L18.4831 20.2499C17.3988 19.7232 16.2795 18.6123 15.7528 17.5421L17.2139 15.8047C17.228 15.7871 17.2413 15.7695 17.254 15.7506C17.3555 15.5954 17.4172 15.4175 17.4333 15.2328C17.4495 15.048 17.4198 14.8621 17.3468 14.6917V14.6832L15.8583 11.3652C15.7618 11.1425 15.5958 10.9569 15.3852 10.8363C15.1746 10.7157 14.9306 10.6664 14.6897 10.6958C13.7369 10.8212 12.8624 11.2891 12.2294 12.0121C11.5964 12.7352 11.2483 13.6639 11.25 14.6249C11.25 20.2077 15.7922 24.7499 21.375 24.7499C22.336 24.7516 23.2647 24.4034 23.9878 23.7705C24.7108 23.1375 25.1787 22.2629 25.3041 21.3102C25.3335 21.0693 25.2844 20.8254 25.1638 20.6148C25.0433 20.4042 24.858 20.2382 24.6354 20.1416ZM21.375 23.6249C18.9889 23.6223 16.7012 22.6732 15.0139 20.9859C13.3267 19.2987 12.3776 17.011 12.375 14.6249C12.3724 13.9382 12.6197 13.2742 13.0709 12.7566C13.5221 12.239 14.1463 11.9034 14.8268 11.8124C14.8265 11.8152 14.8265 11.818 14.8268 11.8208L16.3034 15.1255L14.85 16.865C14.8353 16.882 14.8219 16.9001 14.8099 16.9192C14.7041 17.0815 14.642 17.2685 14.6297 17.4619C14.6174 17.6553 14.6553 17.8486 14.7396 18.0231C15.3766 19.326 16.6894 20.6288 18.0063 21.2652C18.1821 21.3487 18.3765 21.3853 18.5706 21.3712C18.7647 21.3572 18.9519 21.293 19.1138 21.185C19.1318 21.1729 19.1492 21.1597 19.1658 21.1456L20.8751 19.6874L24.1798 21.1674C24.1798 21.1674 24.1854 21.1674 24.1875 21.1674C24.0976 21.849 23.7624 22.4744 23.2448 22.9267C22.7271 23.379 22.0624 23.6272 21.375 23.6249Z" fill="#A60000"/>
</svg>

    ),
    label: "Present Today",
    subLabel: "95.2% Attendance",
    value: 142,
    change: "+5",
    changeColor: "text-[#A60000]",
    bg: "bg-white",
    // iconBg: "bg-teal-50 text-teal-500",
  },
  {
    icon: (
      <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="35" height="35" rx="10" fill="#FFE3E3"/>
<path d="M25.3125 23.625C25.3125 23.7742 25.2532 23.9173 25.1477 24.0227C25.0423 24.1282 24.8992 24.1875 24.75 24.1875H11.25C11.1008 24.1875 10.9577 24.1282 10.8523 24.0227C10.7468 23.9173 10.6875 23.7742 10.6875 23.625V12.375C10.6875 12.2258 10.7468 12.0827 10.8523 11.9773C10.9577 11.8718 11.1008 11.8125 11.25 11.8125C11.3992 11.8125 11.5423 11.8718 11.6477 11.9773C11.7532 12.0827 11.8125 12.2258 11.8125 12.375V20.0173L15.352 16.477C15.4043 16.4247 15.4663 16.3832 15.5346 16.3549C15.6029 16.3266 15.6761 16.3121 15.75 16.3121C15.8239 16.3121 15.8971 16.3266 15.9654 16.3549C16.0337 16.3832 16.0957 16.4247 16.148 16.477L18 18.3298L21.7048 14.625H20.25C20.1008 14.625 19.9577 14.5657 19.8523 14.4602C19.7468 14.3548 19.6875 14.2117 19.6875 14.0625C19.6875 13.9133 19.7468 13.7702 19.8523 13.6648C19.9577 13.5593 20.1008 13.5 20.25 13.5H23.0625C23.2117 13.5 23.3548 13.5593 23.4602 13.6648C23.5657 13.7702 23.625 13.9133 23.625 14.0625V16.875C23.625 17.0242 23.5657 17.1673 23.4602 17.2727C23.3548 17.3782 23.2117 17.4375 23.0625 17.4375C22.9133 17.4375 22.7702 17.3782 22.6648 17.2727C22.5593 17.1673 22.5 17.0242 22.5 16.875V15.4202L18.398 19.523C18.3457 19.5753 18.2837 19.6168 18.2154 19.6451C18.1471 19.6734 18.0739 19.6879 18 19.6879C17.9261 19.6879 17.8529 19.6734 17.7846 19.6451C17.7163 19.6168 17.6543 19.5753 17.602 19.523L15.75 17.6702L11.8125 21.6077V23.0625H24.75C24.8992 23.0625 25.0423 23.1218 25.1477 23.2273C25.2532 23.3327 25.3125 23.4758 25.3125 23.625Z" fill="#A60000"/>
</svg>

    ),
    label: "On Leave",
    subLabel: "Approved Leaves",
    value: "08",
    change: "+5",
    changeColor: "text-[#A60000]",
    bg: "bg-white",
    // iconBg: "bg-purple-50 text-purple-500",
  },
  {
    icon: (
     <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="35" height="35" rx="10" fill="#FFE3E3"/>
<path d="M21.2105 15.9145C21.2628 15.9668 21.3043 16.0288 21.3326 16.0971C21.3609 16.1654 21.3754 16.2386 21.3754 16.3125C21.3754 16.3864 21.3609 16.4596 21.3326 16.5279C21.3043 16.5962 21.2628 16.6582 21.2105 16.7105L17.273 20.648C17.2207 20.7003 17.1587 20.7418 17.0904 20.7701C17.0221 20.7984 16.9489 20.8129 16.875 20.8129C16.8011 20.8129 16.7279 20.7984 16.6596 20.7701C16.5913 20.7418 16.5293 20.7003 16.477 20.648L14.7895 18.9605C14.684 18.8549 14.6247 18.7118 14.6247 18.5625C14.6247 18.4132 14.684 18.2701 14.7895 18.1645C14.8951 18.059 15.0382 17.9997 15.1875 17.9997C15.3368 17.9997 15.4799 18.059 15.5855 18.1645L16.875 19.4548L20.4145 15.9145C20.4668 15.8622 20.5288 15.8207 20.5971 15.7924C20.6654 15.7641 20.7386 15.7496 20.8125 15.7496C20.8864 15.7496 20.9596 15.7641 21.0279 15.7924C21.0962 15.8207 21.1582 15.8622 21.2105 15.9145ZM24.75 12.375V23.625C24.75 23.9234 24.6315 24.2095 24.4205 24.4205C24.2095 24.6315 23.9234 24.75 23.625 24.75H12.375C12.0766 24.75 11.7905 24.6315 11.5795 24.4205C11.3685 24.2095 11.25 23.9234 11.25 23.625V12.375C11.25 12.0766 11.3685 11.7905 11.5795 11.5795C11.7905 11.3685 12.0766 11.25 12.375 11.25H23.625C23.9234 11.25 24.2095 11.3685 24.4205 11.5795C24.6315 11.7905 24.75 12.0766 24.75 12.375ZM23.625 23.625V12.375H12.375V23.625H23.625Z" fill="#A60000"/>
</svg>

    ),
    label: "New Joiners",
    subLabel: "This Month",
    value: 234,
    change: "+5",
    changeColor: "text-[#A60000]",
    bg: "bg-white",
    // iconBg: "bg-orange-50 text-orange-500",
  },
];
const headcountData = [
  { week: "Week 1", value: 45 },
  { week: "Week 2", value: 78 },
  { week: "Week 3", value: 52 },
  { week: "Week 4", value: 88 },
  { week: "Week 5", value: 60 },
  { week: "Week 6", value: 91 },
];
const datas = [
  { day: "Mon", absent: 18, leave: 8,  present: 240 },
  { day: "Tue", absent: 14, leave: 5,  present: 243 },
  { day: "Wed", absent: 18, leave: 9,  present: 240 },
  { day: "Thu", absent: 10, leave: 4,  present: 243 },
  { day: "Fri", absent: 16, leave: 7,  present: 241 },
];

const LegendItem = ({ color, label }) => (
  <span className="flex items-center gap-1.5 text-xs text-gray-500">
    <span className="flex items-center gap-0.5">
      <span className="inline-block w-3 h-px" style={{ backgroundColor: color }} />
      <span
        className="inline-block w-2.5 h-2.5 rounded-full border-2 bg-white"
        style={{ borderColor: color }}
      />
      <span className="inline-block w-3 h-px" style={{ backgroundColor: color }} />
    </span>
    <span>{label}</span>
  </span>
);

const attendanceData = [
  { day: "Mon", absent: 8, leave: 5, present: 230 },
  { day: "Tue", absent: 10, leave: 7, present: 235 },
  { day: "Wed", absent: 6, leave: 4, present: 238 },
  { day: "Thu", absent: 9, leave: 6, present: 233 },
  { day: "Fri", absent: 7, leave: 5, present: 236 },
];


const renderLegend = () => (
  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
    <span className="flex items-center gap-1">
      <span className="inline-block w-5 border-t-2 border-red-500" style={{ borderStyle: "dashed" }} />
      absent
    </span>
    <span className="flex items-center gap-1">
      <span className="inline-block w-5 border-t-2 border-yellow-400" style={{ borderStyle: "dashed" }} />
      leave
    </span>
    <span className="flex items-center gap-1">
      <span className="inline-block w-5 border-t-2 border-emerald-500" style={{ borderStyle: "dashed" }} />
      present
    </span>
  </div>
);
const upcomingEvents = [
  {
    type: "birthday",
    title: "Birthdays",
    items: ["Rajesh Kumar - Feb 15", "Priya Sharma - Feb 18"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.6654 17.5003V10.8337C16.6654 10.3916 16.4898 9.96771 16.1772 9.65515C15.8646 9.34259 15.4407 9.16699 14.9987 9.16699H4.9987C4.55667 9.16699 4.13275 9.34259 3.82019 9.65515C3.50763 9.96771 3.33203 10.3916 3.33203 10.8337V17.5003" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.33203 13.3333C3.33203 13.3333 3.7487 12.5 4.9987 12.5C6.2487 12.5 7.08203 14.1667 8.33203 14.1667C9.58203 14.1667 10.4154 12.5 11.6654 12.5C12.9154 12.5 13.7487 14.1667 14.9987 14.1667C16.2487 14.1667 16.6654 13.3333 16.6654 13.3333" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.66797 17.5H18.3346" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.83203 6.66699V9.16699" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 6.66699V9.16699" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.168 6.66699V9.16699" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.83203 3.33301H5.84036" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 3.33301H10.0083" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.168 3.33301H14.1763" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    ),
    bg: "bg-[#EFF6FF]",
    border: "border-blue-100",
  },
  {
    type: "anniversary",
    title: "Work Anniversaries",
    items: ["Amit Patel - 5 years (Feb 20)"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.6667 6.66699H3.33333C2.8731 6.66699 2.5 7.04009 2.5 7.50033V9.16699C2.5 9.62723 2.8731 10.0003 3.33333 10.0003H16.6667C17.1269 10.0003 17.5 9.62723 17.5 9.16699V7.50033C17.5 7.04009 17.1269 6.66699 16.6667 6.66699Z" stroke="#9810FA" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 6.66699V17.5003" stroke="#9810FA" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.8346 10V15.8333C15.8346 16.2754 15.659 16.6993 15.3465 17.0118C15.0339 17.3244 14.61 17.5 14.168 17.5H5.83464C5.39261 17.5 4.96868 17.3244 4.65612 17.0118C4.34356 16.6993 4.16797 16.2754 4.16797 15.8333V10" stroke="#9810FA" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.2513 6.66703C5.69877 6.66703 5.16886 6.44754 4.77816 6.05684C4.38746 5.66614 4.16797 5.13623 4.16797 4.5837C4.16797 4.03116 4.38746 3.50126 4.77816 3.11056C5.16886 2.71986 5.69877 2.50036 6.2513 2.50036C7.05521 2.48636 7.84299 2.87641 8.51192 3.61966C9.18084 4.36292 9.69987 5.42487 10.0013 6.66703C10.3027 5.42487 10.8218 4.36292 11.4907 3.61966C12.1596 2.87641 12.9474 2.48636 13.7513 2.50036C14.3038 2.50036 14.8337 2.71986 15.2244 3.11056C15.6151 3.50126 15.8346 4.03116 15.8346 4.5837C15.8346 5.13623 15.6151 5.66614 15.2244 6.05684C14.8337 6.44754 14.3038 6.66703 13.7513 6.66703" stroke="#9810FA" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


    ),
    bg: "bg-[#FAF5FF]",
    border: "border-purple-100",
  },
  {
    type: "contract",
    title: "Contract Expiry",
    items: ["3 contracts expiring this month"],
    icon: (
     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.0013 18.3337C14.6037 18.3337 18.3346 14.6027 18.3346 10.0003C18.3346 5.39795 14.6037 1.66699 10.0013 1.66699C5.39893 1.66699 1.66797 5.39795 1.66797 10.0003C1.66797 14.6027 5.39893 18.3337 10.0013 18.3337Z" stroke="#E7000B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 6.66699V10.0003" stroke="#E7000B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 13.333H10.0083" stroke="#E7000B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    ),
    bg: "bg-[#FEF2F2]",
    border: "border-red-100",
  },
];
const data = [
  { week: "Week 1", a: 47, b: 78 },
  { week: "Week 2", a: 53, b: 85 },
  { week: "Week 3", a: 38, b: 93 },
  { week: "Week 4", a: 62, b: 88 },
];
const infoCards = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    ),
    label: "Attrition Rate",
    value: "3.2%",
    sub: "5 exits this month",
    iconBg: "text-[#82181A]",
    valueBg: "",
    border: "border-[#FFC9C9]",
    bg: 'bg-[#FEF2F2]'
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.8333 5.83333V3.33333C15.8333 3.11232 15.7455 2.90036 15.5893 2.74408C15.433 2.5878 15.221 2.5 15 2.5H4.16667C3.72464 2.5 3.30072 2.67559 2.98816 2.98816C2.67559 3.30072 2.5 3.72464 2.5 4.16667C2.5 4.60869 2.67559 5.03262 2.98816 5.34518C3.30072 5.65774 3.72464 5.83333 4.16667 5.83333H16.6667C16.8877 5.83333 17.0996 5.92113 17.2559 6.07741C17.4122 6.23369 17.5 6.44565 17.5 6.66667V10M17.5 10H15C14.558 10 14.134 10.1756 13.8215 10.4882C13.5089 10.8007 13.3333 11.2246 13.3333 11.6667C13.3333 12.1087 13.5089 12.5326 13.8215 12.8452C14.134 13.1577 14.558 13.3333 15 13.3333H17.5C17.721 13.3333 17.933 13.2455 18.0893 13.0893C18.2455 12.933 18.3333 12.721 18.3333 12.5V10.8333C18.3333 10.6123 18.2455 10.4004 18.0893 10.2441C17.933 10.0878 17.721 10 17.5 10Z" stroke="#00A63E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.5 4.16699V15.8337C2.5 16.2757 2.67559 16.6996 2.98816 17.0122C3.30072 17.3247 3.72464 17.5003 4.16667 17.5003H16.6667C16.8877 17.5003 17.0996 17.4125 17.2559 17.2562C17.4122 17.1 17.5 16.888 17.5 16.667V13.3337" stroke="#00A63E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    ),
    label: "Payroll Status",
    value: "Processing",

    sub: "Due: Feb 28, 2026",
    // iconBg: "bg-green-100 text-green-600",
text: "text-[#0D542B] font-normal text-[12px]",
    bg: "bg-[#B9F8CF]",
    // valueBg: "bg-green-50",
    border: "border-[#B9F8CF]",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.0013 18.3337C14.6037 18.3337 18.3346 14.6027 18.3346 10.0003C18.3346 5.39795 14.6037 1.66699 10.0013 1.66699C5.39893 1.66699 1.66797 5.39795 1.66797 10.0003C1.66797 14.6027 5.39893 18.3337 10.0013 18.3337Z" stroke="#D08700" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 6.66699V10.0003" stroke="#D08700" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 13.333H10.0083" stroke="#D08700" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    ),
    label: "Pending Approvals",
    value: "15",
    sub: "Leaves & Expenses",
    iconBg: "text-yellow-600",
      text: "text-[#733E0A]",  
      border: 'border-[#FFF085]', // manual text color

    // valueBg: "bg-yellow-50",
    border: "border-yellow-100",
    bg: "bg-[#FEFCE8]"
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.4987 1.66699H4.9987C4.55667 1.66699 4.13275 1.84259 3.82019 2.15515C3.50763 2.46771 3.33203 2.89163 3.33203 3.33366V16.667C3.33203 17.109 3.50763 17.5329 3.82019 17.8455C4.13275 18.1581 4.55667 18.3337 4.9987 18.3337H14.9987C15.4407 18.3337 15.8646 18.1581 16.1772 17.8455C16.4898 17.5329 16.6654 17.109 16.6654 16.667V5.83366L12.4987 1.66699Z" stroke="#E7000B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 7.5V10.8333" stroke="#E7000B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 14.167H10.0083" stroke="#E7000B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    ),
    label: "Compliance Alerts",
    value: "3",
    sub: "Contract expiring soon",
    // iconBg: "bg-red-100 text-red-500",
    // valueBg: "bg-red-50",
    bg: "bg-[#FFC9C9]",
    border: "border-[#FFC9C9] ",
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("This Month");

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 tracking-tight">HRMS Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Human Resource Management Overview</p>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 mb-6">
        {["This Month", "Last Month"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
              activeTab === tab
                ? "bg-white border-gray-300 text-gray-800 shadow-sm"
                : "bg-transparent border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {statCards.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-xl ${card.iconBg}`}>
                {card.icon}
              </div>
             <span
  className={`text-xs font-semibold ${card.changeColor} px-2 py-0.5 rounded-full inline-flex items-center gap-1`}
>
 <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.1877 2.84375V6.09375C12.1877 6.20149 12.1449 6.30483 12.0687 6.38101C11.9926 6.4572 11.8892 6.5 11.7815 6.5C11.6737 6.5 11.5704 6.4572 11.4942 6.38101C11.418 6.30483 11.3752 6.20149 11.3752 6.09375V3.82434L7.1939 8.00617C7.15617 8.04394 7.11136 8.07391 7.06205 8.09435C7.01273 8.1148 6.95986 8.12532 6.90648 8.12532C6.85309 8.12532 6.80022 8.1148 6.75091 8.09435C6.70159 8.07391 6.65678 8.04394 6.61905 8.00617L4.87523 6.26184L1.5064 9.63117C1.43017 9.7074 1.32678 9.75023 1.21898 9.75023C1.11117 9.75023 1.00778 9.7074 0.931554 9.63117C0.855325 9.55494 0.8125 9.45155 0.8125 9.34375C0.8125 9.23595 0.855325 9.13256 0.931554 9.05633L4.5878 5.40008C4.62553 5.36231 4.67034 5.33234 4.71966 5.3119C4.76897 5.29145 4.82184 5.28093 4.87523 5.28093C4.92861 5.28093 4.98148 5.29145 5.0308 5.3119C5.08011 5.33234 5.12492 5.36231 5.16265 5.40008L6.90648 7.14441L10.8009 3.25H8.53148C8.42373 3.25 8.3204 3.2072 8.24421 3.13101C8.16803 3.05483 8.12523 2.95149 8.12523 2.84375C8.12523 2.73601 8.16803 2.63267 8.24421 2.55649C8.3204 2.4803 8.42373 2.4375 8.53148 2.4375H11.7815C11.8892 2.4375 11.9926 2.4803 12.0687 2.55649C12.1449 2.63267 12.1877 2.73601 12.1877 2.84375Z" fill="#00A63E"/>
</svg>

  {card.change}
</span>

            </div>
            <div className="mt-2">
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">{card.value}</p>
              <p className="text-sm font-semibold text-gray-700 mt-0.5">{card.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{card.subLabel}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Info Cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
  {infoCards.map((card, i) => (
    <div
      key={i}
      className={`${card.bg || "bg-white"} rounded-2xl p-4 sm:p-5 shadow-sm border ${card.border} hover:shadow-md transition-shadow duration-200`}
    >
      <div className="flex items-center gap-3 mb-3">

        {/* icon */}
        <div className={`p-1 rounded-xl ${card.iconBg || ""}`}>
          {card.icon}
        </div>

        {/* label */}
        <p className={`text-[16px] font-semibold ${card.text || "text-[#82181A]"}`}>
          {card.label}
        </p>

      </div>

      {/* value */}
      <p
        className={`text-xl sm:text-2xl font-bold px-2 py-1 rounded-lg inline-block ${card.valueBg || ""} ${card.text || "text-[#82181A]"}`}
      >
        {card.value}
      </p>

      {/* sub */}
      <p className={`text-xs mt-2 ${card.text || "text-[#C10007]"}`}>
        {card.sub}
      </p>

    </div>
  ))}
</div>

      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 space-y-4">
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Department Headcount */}
        <div className="bg-white  p-6 rounded-2xl shadow-sm border border-gray-100 w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-5">Department Headcount</h2>
      <ResponsiveContainer width="104%" height={300}>
        <BarChart
          data={data}
          barCategoryGap="10%"
          barGap={3}
          margin={{ top: 8, right: 8, left: -10, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#e5e7eb"
            vertical={false}
          />
          <XAxis
            dataKey="week"
            tick={{ fontSize: 13, fill: "#6b7280" }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 13, fill: "#666666" }}
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
          />
          <Bar dataKey="a" fill="#DC2626" radius={[3, 3, 0, 0]} />
          <Bar dataKey="b" fill="#EF4444" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>

        {/* Attendance Trend */}
         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full relative">
      {/* Sparkle badge */}
      <div className="absolute top-5 right-5 w-11 h-11 bg-red-500 rounded-full flex items-center justify-center shadow-lg z-10">
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3l1.8 5.4L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.6L12 3z" />
          <path d="M19 15l.9 2.7L22 18.5l-2.1.8L19 22l-.9-2.7L16 18.5l2.1-.8L19 15z" opacity="0.85" />
        </svg>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 mb-5">Attendance Trend (This Week)</h2>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={datas} margin={{ top: 8, right: 16, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 13, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 13, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
            domain={[0, 240]}
            ticks={[0, 60, 120, 180, 240]}
          />
          <Line
            type="monotone"
            dataKey="absent"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 4, fill: "white", stroke: "#ef4444", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="leave"
            stroke="#eab308"
            strokeWidth={2}
            dot={{ r: 4, fill: "white", stroke: "#eab308", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="present"
            stroke="#10b981"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "white", stroke: "#10b981", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-3">
        <LegendItem color="#ef4444" label="absent" />
        <LegendItem color="#eab308" label="leave" />
        <LegendItem color="#10b981" label="present" />
      </div>
    </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Upcoming Events</h2>
        <div className="space-y-3">
          {upcomingEvents.map((event, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 p-4 rounded-xl border ${event.bg} ${event.border}`}
            >
              <div className="mt-0.5 shrink-0">{event.icon}</div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{event.title}</p>
                {event.items.map((item, j) => (
                  <p key={j} className="text-xs text-gray-500 mt-0.5">{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
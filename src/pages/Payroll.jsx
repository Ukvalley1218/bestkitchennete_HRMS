import React, { useState } from "react";
import EmployeeOfMonthCard from "../components/CardComponent";

// ─── Icons ────────────────────────────────────────────────────────────────────
const TrendIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const PlusIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const TotalPayrollIcon = () => (
  <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="35" height="35" rx="10" fill="#FFE3E3"/>
<path d="M17.2441 20.1035C17.998 19.6016 18.5703 18.8704 18.8765 18.0181C19.1827 17.1657 19.2065 16.2375 18.9443 15.3706C18.6821 14.5037 18.1479 13.7441 17.4207 13.2043C16.6935 12.6645 15.8119 12.373 14.9062 12.373C14.0005 12.373 13.1189 12.6645 12.3917 13.2043C11.6644 13.7441 11.1302 14.5037 10.8681 15.3706C10.6059 16.2375 10.6297 17.1657 10.9359 18.0181C11.242 18.8704 11.8144 19.6016 12.5683 20.1035C11.2046 20.6061 10.0399 21.5362 9.24815 22.755C9.20653 22.8168 9.17763 22.8863 9.16311 22.9595C9.1486 23.0326 9.14876 23.1079 9.16359 23.1809C9.17842 23.254 9.20763 23.3233 9.24951 23.385C9.29139 23.4467 9.34511 23.4994 9.40755 23.5401C9.46999 23.5809 9.5399 23.6088 9.61321 23.6222C9.68653 23.6357 9.7618 23.6345 9.83463 23.6186C9.90747 23.6027 9.97642 23.5725 10.0375 23.5298C10.0986 23.487 10.1505 23.4325 10.1903 23.3695C10.7011 22.584 11.4 21.9385 12.2235 21.4916C13.0471 21.0447 13.9692 20.8107 14.9062 20.8107C15.8432 20.8107 16.7653 21.0447 17.5889 21.4916C18.4124 21.9385 19.1113 22.584 19.6221 23.3695C19.7046 23.4921 19.832 23.5774 19.9768 23.6068C20.1217 23.6362 20.2723 23.6074 20.396 23.5267C20.5198 23.4459 20.6069 23.3197 20.6383 23.1753C20.6698 23.0309 20.6432 22.8799 20.5642 22.755C19.7724 21.5362 18.6078 20.6061 17.2441 20.1035ZM11.8124 16.5935C11.8124 15.9816 11.9939 15.3835 12.3338 14.8747C12.6738 14.3659 13.157 13.9694 13.7223 13.7353C14.2876 13.5011 14.9096 13.4398 15.5098 13.5592C16.1099 13.6786 16.6611 13.9732 17.0938 14.4059C17.5265 14.8386 17.8211 15.3898 17.9405 15.9899C18.0599 16.5901 17.9986 17.2121 17.7644 17.7774C17.5303 18.3427 17.1338 18.8259 16.625 19.1659C16.1162 19.5058 15.5181 19.6873 14.9062 19.6873C14.086 19.6863 13.2996 19.3601 12.7196 18.7801C12.1396 18.2001 11.8134 17.4137 11.8124 16.5935ZM26.5879 23.5334C26.463 23.6148 26.3108 23.6433 26.1648 23.6126C26.0188 23.5819 25.8911 23.4945 25.8096 23.3695C25.2994 22.5835 24.6006 21.9377 23.7769 21.491C22.9532 21.0444 22.0307 20.811 21.0937 20.8123C20.9445 20.8123 20.8014 20.753 20.6959 20.6475C20.5905 20.542 20.5312 20.3989 20.5312 20.2498C20.5312 20.1006 20.5905 19.9575 20.6959 19.852C20.8014 19.7465 20.9445 19.6873 21.0937 19.6873C21.5493 19.6868 21.9992 19.5858 22.4112 19.3913C22.8232 19.1969 23.1872 18.9138 23.4772 18.5624C23.7671 18.2109 23.9759 17.7998 24.0885 17.3584C24.2011 16.9169 24.2149 16.456 24.1287 16.0086C24.0426 15.5612 23.8587 15.1384 23.5902 14.7703C23.3217 14.4022 22.9752 14.098 22.5755 13.8793C22.1758 13.6607 21.7328 13.533 21.278 13.5054C20.8232 13.4779 20.368 13.5511 19.9448 13.7198C19.8758 13.7497 19.8015 13.7654 19.7263 13.766C19.6512 13.7666 19.5766 13.7522 19.5071 13.7235C19.4376 13.6949 19.3746 13.6526 19.3217 13.5991C19.2689 13.5457 19.2272 13.4822 19.1993 13.4124C19.1714 13.3426 19.1578 13.2679 19.1592 13.1928C19.1606 13.1176 19.1771 13.0435 19.2077 12.9748C19.2382 12.9062 19.2822 12.8443 19.3371 12.7929C19.392 12.7415 19.4566 12.7017 19.5271 12.6757C20.4957 12.2894 21.5729 12.2755 22.5511 12.6367C23.5293 12.9978 24.339 13.7084 24.8242 14.6314C25.3094 15.5543 25.4355 16.6243 25.1784 17.6348C24.9212 18.6453 24.2989 19.5247 23.4316 20.1035C24.7953 20.6061 25.9599 21.5362 26.7517 22.755C26.8332 22.8799 26.8617 23.0321 26.831 23.1781C26.8003 23.3241 26.7128 23.4518 26.5879 23.5334Z" fill="#A60000"/>
</svg>

);
const ProcessedIcon = () => (
 <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="35" height="35" rx="10" fill="#FFE3E3"/>
<path d="M21.2105 15.9145C21.2628 15.9668 21.3043 16.0288 21.3326 16.0971C21.3609 16.1654 21.3754 16.2386 21.3754 16.3125C21.3754 16.3864 21.3609 16.4596 21.3326 16.5279C21.3043 16.5962 21.2628 16.6582 21.2105 16.7105L17.273 20.648C17.2207 20.7003 17.1587 20.7418 17.0904 20.7701C17.0221 20.7984 16.9489 20.8129 16.875 20.8129C16.8011 20.8129 16.7279 20.7984 16.6596 20.7701C16.5913 20.7418 16.5293 20.7003 16.477 20.648L14.7895 18.9605C14.684 18.8549 14.6247 18.7118 14.6247 18.5625C14.6247 18.4132 14.684 18.2701 14.7895 18.1645C14.8951 18.059 15.0382 17.9997 15.1875 17.9997C15.3368 17.9997 15.4799 18.059 15.5855 18.1645L16.875 19.4548L20.4145 15.9145C20.4668 15.8622 20.5288 15.8207 20.5971 15.7924C20.6654 15.7641 20.7386 15.7496 20.8125 15.7496C20.8864 15.7496 20.9596 15.7641 21.0279 15.7924C21.0962 15.8207 21.1582 15.8622 21.2105 15.9145ZM24.75 12.375V23.625C24.75 23.9234 24.6315 24.2095 24.4205 24.4205C24.2095 24.6315 23.9234 24.75 23.625 24.75H12.375C12.0766 24.75 11.7905 24.6315 11.5795 24.4205C11.3685 24.2095 11.25 23.9234 11.25 23.625V12.375C11.25 12.0766 11.3685 11.7905 11.5795 11.5795C11.7905 11.3685 12.0766 11.25 12.375 11.25H23.625C23.9234 11.25 24.2095 11.3685 24.4205 11.5795C24.6315 11.7905 24.75 12.0766 24.75 12.375ZM23.625 23.625V12.375H12.375V23.625H23.625Z" fill="#A60000"/>
</svg>

);
const PendingIcon = () => (
  <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="35" height="35" rx="10" fill="#FFE3E3"/>
<path d="M14.7697 11.6012C14.7331 11.4572 14.7551 11.3045 14.8307 11.1766C14.9063 11.0487 15.0295 10.9559 15.1733 10.9185C16.3724 10.6092 17.6304 10.6092 18.8295 10.9185C18.9624 10.9525 19.0782 11.0338 19.1553 11.1472C19.2323 11.2606 19.2653 11.3982 19.248 11.5343C19.2308 11.6703 19.1644 11.7953 19.0615 11.8858C18.9585 11.9764 18.826 12.0262 18.6889 12.0259C18.6415 12.0256 18.5942 12.0195 18.5483 12.0076C17.5337 11.7456 16.4692 11.7456 15.4545 12.0076C15.3829 12.026 15.3083 12.03 15.2351 12.0195C15.1619 12.009 15.0914 11.9842 15.0278 11.9465C14.9642 11.9087 14.9087 11.8588 14.8644 11.7995C14.8201 11.7403 14.7879 11.6729 14.7697 11.6012ZM10.3463 16.734C10.4175 16.7538 10.4919 16.7593 10.5653 16.7504C10.6386 16.7414 10.7094 16.718 10.7738 16.6817C10.8381 16.6453 10.8946 16.5966 10.9401 16.5384C10.9856 16.4802 11.0192 16.4136 11.0389 16.3424C11.3192 15.3329 11.8515 14.4113 12.5858 13.6642C12.6819 13.5563 12.7329 13.4156 12.7281 13.2713C12.7233 13.1269 12.6632 12.9898 12.5601 12.8886C12.4571 12.7874 12.319 12.7296 12.1746 12.7274C12.0301 12.7252 11.8903 12.7786 11.7842 12.8767C10.9167 13.7595 10.2877 14.8482 9.95611 16.0407C9.9362 16.1119 9.9305 16.1863 9.93934 16.2596C9.94818 16.3329 9.97138 16.4038 10.0076 16.4682C10.0439 16.5326 10.0924 16.5892 10.1505 16.6348C10.2087 16.6804 10.2752 16.7141 10.3463 16.734ZM18.5483 23.9917C17.5337 24.2536 16.4692 24.2536 15.4545 23.9917C15.311 23.9569 15.1595 23.9801 15.0329 24.056C14.9062 24.132 14.8145 24.2548 14.7776 24.3978C14.7407 24.5408 14.7615 24.6925 14.8355 24.8203C14.9095 24.9481 15.0309 25.0417 15.1733 25.0808C16.3724 25.3901 17.6304 25.3901 18.8295 25.0808C18.972 25.0417 19.0933 24.9481 19.1673 24.8203C19.2414 24.6925 19.2621 24.5408 19.2252 24.3978C19.1883 24.2548 19.0966 24.132 18.9699 24.056C18.8433 23.9801 18.6918 23.9569 18.5483 23.9917ZM22.9639 16.3438C23.0038 16.4876 23.0992 16.6096 23.2291 16.683C23.359 16.7565 23.5127 16.7753 23.6565 16.7354C23.8003 16.6955 23.9223 16.6001 23.9958 16.4702C24.0692 16.3404 24.088 16.1866 24.0481 16.0428C23.7164 14.8504 23.0873 13.7618 22.22 12.8788C22.1687 12.824 22.107 12.7801 22.0385 12.7495C21.97 12.719 21.8961 12.7024 21.8211 12.7009C21.7461 12.6993 21.6716 12.7128 21.6019 12.7404C21.5322 12.7681 21.4687 12.8094 21.4152 12.862C21.3617 12.9146 21.3192 12.9773 21.2903 13.0465C21.2614 13.1157 21.2467 13.19 21.2469 13.265C21.2471 13.34 21.2624 13.4142 21.2917 13.4833C21.3211 13.5523 21.3639 13.6148 21.4177 13.667C22.1507 14.4144 22.6824 15.3353 22.9632 16.3438H22.9639ZM24.0495 19.9571C23.6774 21.2988 22.9288 22.5058 21.8924 23.4355C21.8282 23.4934 21.7517 23.5357 21.6686 23.5592C21.5855 23.5827 21.4981 23.5868 21.4132 23.5711C21.3282 23.5554 21.2481 23.5203 21.1789 23.4686C21.1097 23.417 21.0533 23.35 21.0142 23.2731C20.638 22.532 20.064 21.9095 19.3557 21.4747C18.6474 21.0399 17.8325 20.8097 17.0014 20.8097C16.1703 20.8097 15.3555 21.0399 14.6472 21.4747C13.9389 21.9095 13.3648 22.532 12.9887 23.2731C12.9496 23.35 12.8933 23.4169 12.8242 23.4685C12.755 23.5202 12.675 23.5552 12.5902 23.571C12.5053 23.5868 12.418 23.5828 12.335 23.5595C12.2519 23.5361 12.1753 23.4939 12.1112 23.4362C11.0747 22.506 10.3261 21.2985 9.954 19.9564C9.91418 19.8127 9.93311 19.659 10.0066 19.5291C10.0801 19.3993 10.2022 19.304 10.346 19.2642C10.4898 19.2244 10.6435 19.2433 10.7733 19.3168C10.9031 19.3904 10.9984 19.5124 11.0382 19.6562C11.2898 20.5652 11.7469 21.4043 12.3742 22.1087C13.0018 21.1984 13.885 20.4945 14.9124 20.0858C14.3611 19.6518 13.9588 19.0568 13.7614 18.3836C13.564 17.7103 13.5813 16.9922 13.8109 16.3293C14.0405 15.6663 14.4711 15.0914 15.0427 14.6845C15.6142 14.2776 16.2984 14.0589 17 14.0589C17.7016 14.0589 18.3858 14.2776 18.9574 14.6845C19.5289 15.0914 19.9595 15.6663 20.1891 16.3293C20.4188 16.9922 20.4361 17.7103 20.2386 18.3836C20.0412 19.0568 19.6389 19.6518 19.0876 20.0858C20.115 20.4945 20.9983 21.1984 21.6259 22.1087C22.2531 21.4043 22.7102 20.5652 22.9618 19.6562C22.9816 19.585 23.0152 19.5184 23.0607 19.4602C23.1062 19.402 23.1627 19.3533 23.227 19.3169C23.2913 19.2806 23.3621 19.2572 23.4355 19.2483C23.5088 19.2393 23.5832 19.2448 23.6544 19.2646C23.7256 19.2843 23.7922 19.3179 23.8504 19.3634C23.9086 19.4089 23.9573 19.4654 23.9936 19.5297C24.03 19.5941 24.0534 19.6649 24.0623 19.7382C24.0713 19.8116 24.0658 19.886 24.046 19.9571H24.0495ZM17.0014 19.6871C17.4464 19.6871 17.8814 19.5552 18.2515 19.308C18.6215 19.0607 18.9098 18.7093 19.0801 18.2982C19.2504 17.887 19.295 17.4346 19.2082 16.9982C19.1214 16.5617 18.9071 16.1608 18.5924 15.8462C18.2777 15.5315 17.8768 15.3172 17.4404 15.2304C17.0039 15.1436 16.5515 15.1881 16.1404 15.3584C15.7292 15.5287 15.3778 15.8171 15.1306 16.1871C14.8834 16.5571 14.7514 16.9921 14.7514 17.4371C14.7514 18.0339 14.9885 18.6062 15.4104 19.0281C15.8324 19.4501 16.4047 19.6871 17.0014 19.6871Z" fill="#A60000"/>
</svg>

);
const AvgCtcIcon = () => (
  <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="35" height="35" rx="10" fill="#FFE3E3"/>
<path d="M25.3125 23.625C25.3125 23.7742 25.2532 23.9173 25.1477 24.0227C25.0423 24.1282 24.8992 24.1875 24.75 24.1875H11.25C11.1008 24.1875 10.9577 24.1282 10.8523 24.0227C10.7468 23.9173 10.6875 23.7742 10.6875 23.625V12.375C10.6875 12.2258 10.7468 12.0827 10.8523 11.9773C10.9577 11.8718 11.1008 11.8125 11.25 11.8125C11.3992 11.8125 11.5423 11.8718 11.6477 11.9773C11.7532 12.0827 11.8125 12.2258 11.8125 12.375V20.0173L15.352 16.477C15.4043 16.4247 15.4663 16.3832 15.5346 16.3549C15.6029 16.3266 15.6761 16.3121 15.75 16.3121C15.8239 16.3121 15.8971 16.3266 15.9654 16.3549C16.0337 16.3832 16.0957 16.4247 16.148 16.477L18 18.3298L21.7048 14.625H20.25C20.1008 14.625 19.9577 14.5657 19.8523 14.4602C19.7468 14.3548 19.6875 14.2117 19.6875 14.0625C19.6875 13.9133 19.7468 13.7702 19.8523 13.6648C19.9577 13.5593 20.1008 13.5 20.25 13.5H23.0625C23.2117 13.5 23.3548 13.5593 23.4602 13.6648C23.5657 13.7702 23.625 13.9133 23.625 14.0625V16.875C23.625 17.0242 23.5657 17.1673 23.4602 17.2727C23.3548 17.3782 23.2117 17.4375 23.0625 17.4375C22.9133 17.4375 22.7702 17.3782 22.6648 17.2727C22.5593 17.1673 22.5 17.0242 22.5 16.875V15.4202L18.398 19.523C18.3457 19.5753 18.2837 19.6168 18.2154 19.6451C18.1471 19.6734 18.0739 19.6879 18 19.6879C17.9261 19.6879 17.8529 19.6734 17.7846 19.6451C17.7163 19.6168 17.6543 19.5753 17.602 19.523L15.75 17.6702L11.8125 21.6077V23.0625H24.75C24.8992 23.0625 25.0423 23.1218 25.1477 23.2273C25.2532 23.3327 25.3125 23.4758 25.3125 23.625Z" fill="#A60000"/>
</svg>

);
const CompletedIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" fill="#dcfce7" stroke="#22c55e" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0.5">
    <path d="M12 2 L13.5 9 L20 12 L13.5 15 L12 22 L10.5 15 L4 12 L10.5 9 Z" />
    <path d="M5 5 L5.8 8 L8 9 L5.8 10 L5 13 L4.2 10 L2 9 L4.2 8 Z" />
    <path d="M19 2 L19.5 4 L21 5 L19.5 6 L19 8 L18.5 6 L17 5 L18.5 4 Z" />
  </svg>
);

// ─── Step indicator ───────────────────────────────────────────────────────────
const StepIndicator = ({ step, status }) => {
  if (status === "completed") {
    return <CompletedIcon />;
  }
  if (status === "inProgress") {
    return (
      <div className="w-[22px] h-[22px] rounded-full bg-yellow-400 flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
        {step}
      </div>
    );
  }
  // pending
  return (
    <div className="w-[22px] h-[22px] rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-400 text-[11px] font-bold flex-shrink-0">
      {step}
    </div>
  );
};
const departments = [
  { dept: "Production", employees: 145, totalSalary: "₹1245K", avgSalary: "₹8,586",  overtime: "₹45K", deductions: "₹65K", netAmount: "₹1225K" },
  { dept: "Sales",      employees: 42,  totalSalary: "₹892K",  avgSalary: "₹21,238", overtime: "₹12K", deductions: "₹42K", netAmount: "₹862K"  },
  { dept: "IT",         employees: 28,  totalSalary: "₹1456K", avgSalary: "₹52,000", overtime: "₹8K",  deductions: "₹68K", netAmount: "₹1396K" },
  { dept: "Finance",    employees: 15,  totalSalary: "₹678K",  avgSalary: "₹45,200", overtime: "₹0K",  deductions: "₹32K", netAmount: "₹646K"  },
  { dept: "Admin",      employees: 18,  totalSalary: "₹456K",  avgSalary: "₹25,333", overtime: "₹0K",  deductions: "₹21K", netAmount: "₹435K"  },
];

const headers = ["Department", "Employees", "Total Salary", "Avg. Salary", "Overtime", "Deductions", "Net Amount"];
const data = [
  {
    department: "Production",
    employees: 145,
    totalSalary: "₹1245K",
    avgSalary: "₹8,586",
    overtime: "₹45K",
    deductions: "₹65K",
    netAmount: "₹1225K",
  },
  {
    department: "Sales",
    employees: 42,
    totalSalary: "₹892K",
    avgSalary: "₹21,238",
    overtime: "₹12K",
    deductions: "₹42K",
    netAmount: "₹862K",
  },
  {
    department: "IT",
    employees: 28,
    totalSalary: "₹1456K",
    avgSalary: "₹52,000",
    overtime: "₹8K",
    deductions: "₹68K",
    netAmount: "₹1396K",
  },
  {
    department: "Finance",
    employees: 15,
    totalSalary: "₹678K",
    avgSalary: "₹45,200",
    overtime: "₹0K",
    deductions: "₹32K",
    netAmount: "₹646K",
  },
  {
    department: "Admin",
    employees: 18,
    totalSalary: "₹456K",
    avgSalary: "₹25,333",
    overtime: "₹0K",
    deductions: "₹21K",
    netAmount: "₹435K",
  },
];

const columns = [
  { key: "department", label: "DEPARTMENT", align: "left" },
  { key: "employees", label: "EMPLOYEES", align: "left" },
  { key: "totalSalary", label: "TOTAL SALARY", align: "left" },
  { key: "avgSalary", label: "AVG. SALARY", align: "left" },
  { key: "overtime", label: "OVERTIME", align: "left", type: "overtime" },
  { key: "deductions", label: "DEDUCTIONS", align: "left", type: "deduction" },
  { key: "netAmount", label: "NET AMOUNT", align: "left" },
];

function CellValue({ value, type }) {
  if (type === "overtime") {
    return <span className="text-green-500 font-medium">{value}</span>;
  }
  if (type === "deduction") {
    return <span className="text-red-500 font-medium">{value}</span>;
  }
  return <span>{value}</span>;
}

// ─── Timeline Step ────────────────────────────────────────────────────────────
const TimelineStep = ({ step, title, subtitle, status, isLast }) => (
  <div className="flex gap-4">
    {/* Left: indicator + connector line */}
    <div className="flex flex-col items-center">
      <StepIndicator step={step} status={status} />
      {!isLast && (
        <div className="w-px flex-1 mt-1 bg-gray-200 min-h-[20px]" />
      )}
    </div>

    {/* Right: text */}
    <div className="pb-5">
      <p className={`text-sm font-semibold ${status === "completed" ? "text-gray-800" : status === "inProgress" ? "text-gray-800" : "text-gray-500"}`}>
        {title}
      </p>
      <p className={`text-xs mt-0.5 ${status === "completed" ? "text-green-500" : status === "inProgress" ? "text-yellow-500" : "text-gray-400"}`}>
        {subtitle}
      </p>
    </div>
  </div>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const steps = [
  { step: 1,  title: "Attendance Freeze",  subtitle: "Completed on Feb 26, 2026", status: "completed" },
  { step: 2,  title: "Payroll Calculation", subtitle: "In Progress",               status: "inProgress" },
  { step: 3,  title: "HR Approval",         subtitle: "Pending",                   status: "pending"    },
  { step: 4,  title: "Finance Approval",    subtitle: "Pending",                   status: "pending"    },
  { step: 5,  title: "Salary Disbursement", subtitle: "Scheduled: Feb 28, 2026",   status: "pending"    },
];


// ─── PayrollStatCard ──────────────────────────────────────────────────────────
// Wraps EmployeeOfMonthCard's structural shell (left strip + z-10 content)
// but renders white-bg stat card content inside it
const PayrollStatCard = ({ icon, badge, value, label, sublabel }) => {
  return (
    <div className="bg-white relative rounded-2xl p-5 overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex-1 min-w-[140px]">
      {/* Reusing EmployeeOfMonthCard's LEFT CURVED STRIP pattern */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[85%] rounded-r" />

      {/* Reusing EmployeeOfMonthCard's relative z-10 content pattern */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-400">
            {icon}
          </div>
           <span className="flex items-center gap-0.5 pr-5  text-xs font-semibold text-[#A60000]">
          <svg className="text-green-500" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.1877 2.84375V6.09375C12.1877 6.20149 12.1449 6.30483 12.0687 6.38101C11.9926 6.4572 11.8892 6.5 11.7815 6.5C11.6737 6.5 11.5704 6.4572 11.4942 6.38101C11.418 6.30483 11.3752 6.20149 11.3752 6.09375V3.82434L7.1939 8.00617C7.15617 8.04394 7.11136 8.07391 7.06205 8.09435C7.01273 8.1148 6.95986 8.12532 6.90648 8.12532C6.85309 8.12532 6.80022 8.1148 6.75091 8.09435C6.70159 8.07391 6.65678 8.04394 6.61905 8.00617L4.87523 6.26184L1.5064 9.63117C1.43017 9.7074 1.32678 9.75023 1.21898 9.75023C1.11117 9.75023 1.00778 9.7074 0.931554 9.63117C0.855325 9.55494 0.8125 9.45155 0.8125 9.34375C0.8125 9.23595 0.855325 9.13256 0.931554 9.05633L4.5878 5.40008C4.62553 5.36231 4.67034 5.33234 4.71966 5.3119C4.76897 5.29145 4.82184 5.28093 4.87523 5.28093C4.92861 5.28093 4.98148 5.29145 5.0308 5.3119C5.08011 5.33234 5.12492 5.36231 5.16265 5.40008L6.90648 7.14441L10.8009 3.25H8.53148C8.42373 3.25 8.3204 3.2072 8.24421 3.13101C8.16803 3.05483 8.12523 2.95149 8.12523 2.84375C8.12523 2.73601 8.16803 2.63267 8.24421 2.55649C8.3204 2.4803 8.42373 2.4375 8.53148 2.4375H11.7815C11.8892 2.4375 11.9926 2.4803 12.0687 2.55649C12.1449 2.63267 12.1877 2.73601 12.1877 2.84375Z" fill="#00A63E"/>
</svg>

          {badge}
        </span>
        </div>
        <p className="text-2xl font-bold text-gray-900 leading-none mb-1">{value}</p>
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>
      </div>
    </div>
  );
};

// ─── Tab Button ───────────────────────────────────────────────────────────────
const TabButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 text-sm font-medium rounded-xl border border-gray-300 transition-colors ${
      active ? "bg-gray-100 text-gray-800" : "bg-white text-gray-500 hover:bg-gray-50"
    }`}
  >
    {label}
  </button>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const stats = [
  { icon: <TotalPayrollIcon />, badge: "+12", value: "₹42.5L", label: "Total Payroll", sublabel: "This Month" },
  { icon: <ProcessedIcon />,    badge: "+5",  value: "0",       label: "Processed",     sublabel: "Employees"  },
  { icon: <PendingIcon />,      badge: "+5",  value: "248",     label: "Pending",       sublabel: "Employees"  },
  { icon: <AvgCtcIcon />,       badge: "+5",  value: "₹5.2L",  label: "Avg. CTC",      sublabel: "Per Annum"  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
const PayrollManagement = () => {
    const [hovered, setHovered] = useState(null);

  const [activeTab, setActiveTab] = useState("thisMonth");

  return (
    <div className="bg-gray-50 p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-5">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
            <p className="text-sm text-gray-400 mt-0.5">Process salaries and manage compensation</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors flex-shrink-0">
            <PlusIcon />
            Process Payroll
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center w-fit">
          <TabButton label="This Month" active={activeTab === "thisMonth"} onClick={() => setActiveTab("thisMonth")} />
          <div className="w-px h-8 bg-gray-300 mx-2" />
          <TabButton label="Last Month" active={activeTab === "lastMonth"} onClick={() => setActiveTab("lastMonth")} />
        </div>

        {/* Stat Cards — each built on EmployeeOfMonthCard's internal pattern */}
        <div className="flex flex-wrap gap-4">
          {stats.map((s, i) => (
            <PayrollStatCard key={i} {...s} />
          ))}
        </div>

      </div>
      <div className="bg-white rounded-2xl border mt-3 border-gray-100 shadow-sm p-5 font-sans">
      {/* Title */}
      <h2 className="text-base font-bold text-gray-900 mb-5 text-[24px]">
        Payroll Processing Timeline - February 2026
      </h2>

      {/* Steps */}
      <div>
        {steps.map((s, i) => (
          <TimelineStep
            key={i}
            {...s}
            isLast={i === steps.length - 1}
          />
        ))}
      </div>

      {/* Floating Sparkle Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-95 z-50">
        <SparkleIcon />
      </button>
    </div>
    <div className=" bg-gray-50 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            Department-wise Salary Breakdown
          </h2>
        </div>

        {/* Table wrapper for horizontal scroll on small screens */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-gray-100">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-6 py-4 text-left text-[11px] font-semibold text-gray-400 tracking-widest uppercase whitespace-nowrap"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr
                  key={row.department}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className={`border-b border-gray-50 transition-colors duration-150 ${
                    hovered === i ? "bg-gray-50" : "bg-white"
                  } ${i === data.length - 1 ? "border-b-0" : ""}`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-6 py-5 text-sm text-gray-700 whitespace-nowrap"
                    >
                      <CellValue value={row[col.key]} type={col.type} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PayrollManagement;
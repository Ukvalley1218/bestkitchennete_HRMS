import React, { useState, useRef, useEffect, useMemo } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────
const TrendUpIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.1877 2.84375V6.09375C12.1877 6.20149 12.1449 6.30483 12.0687 6.38101C11.9926 6.4572 11.8892 6.5 11.7815 6.5C11.6737 6.5 11.5704 6.4572 11.4942 6.38101C11.418 6.30483 11.3752 6.20149 11.3752 6.09375V3.82434L7.1939 8.00617C7.15617 8.04394 7.11136 8.07391 7.06205 8.09435C7.01273 8.1148 6.95986 8.12532 6.90648 8.12532C6.85309 8.12532 6.80022 8.1148 6.75091 8.09435C6.70159 8.07391 6.65678 8.04394 6.61905 8.00617L4.87523 6.26184L1.5064 9.63117C1.43017 9.7074 1.32678 9.75023 1.21898 9.75023C1.11117 9.75023 1.00778 9.7074 0.931554 9.63117C0.855325 9.55494 0.8125 9.45155 0.8125 9.34375C0.8125 9.23595 0.855325 9.13256 0.931554 9.05633L4.5878 5.40008C4.62553 5.36231 4.67034 5.33234 4.71966 5.3119C4.76897 5.29145 4.82184 5.28093 4.87523 5.28093C4.92861 5.28093 4.98148 5.29145 5.0308 5.3119C5.08011 5.33234 5.12492 5.36231 5.16265 5.40008L6.90648 7.14441L10.8009 3.25H8.53148C8.42373 3.25 8.3204 3.2072 8.24421 3.13101C8.16803 3.05483 8.12523 2.95149 8.12523 2.84375C8.12523 2.73601 8.16803 2.63267 8.24421 2.55649C8.3204 2.4803 8.42373 2.4375 8.53148 2.4375H11.7815C11.8892 2.4375 11.9926 2.4803 12.0687 2.55649C12.1449 2.63267 12.1877 2.73601 12.1877 2.84375Z" fill="#00A63E"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.25 15.75V14.25C14.25 13.4544 13.9339 12.6913 13.3713 12.1287C12.8087 11.5661 12.0456 11.25 11.25 11.25H6.75C5.95435 11.25 5.19129 11.5661 4.62868 12.1287C4.06607 12.6913 3.75 13.4544 3.75 14.25V15.75" stroke="#A60000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 8.25C10.6569 8.25 12 6.90685 12 5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25C6 6.90685 7.34315 8.25 9 8.25Z" stroke="#A60000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UserPlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 15.75V14.25C14 13.4544 13.6839 12.6913 13.1213 12.1287C12.5587 11.5661 11.7956 11.25 11 11.25H5.75C4.95435 11.25 4.19129 11.5661 3.62868 12.1287C3.06607 12.6913 2.75 13.4544 2.75 14.25V15.75" stroke="#A60000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.5 8.25C10.1569 8.25 11.5 6.90685 11.5 5.25C11.5 3.59315 10.1569 2.25 8.5 2.25C6.84315 2.25 5.5 3.59315 5.5 5.25C5.5 6.90685 6.84315 8.25 8.5 8.25Z" stroke="#A60000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.25 7.25V10.25M14.75 8.75H17.75" stroke="#A60000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DocumentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#A60000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2V8H20" stroke="#A60000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 13H8M16 17H8M10 9H8" stroke="#A60000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="#A60000" strokeWidth="1.5"/>
    <path d="M12 6V12L16 14" stroke="#A60000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GraduationCapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#A60000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 10V16C6 16 9 19 12 19C15 19 18 16 18 16V10" stroke="#A60000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 7V14" stroke="#A60000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const OfferIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#A60000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 20V10M12 20V4M6 20V14" stroke="#A60000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SparkleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0.5">
    <path d="M12 2 L13.5 9 L20 12 L13.5 15 L12 22 L10.5 15 L4 12 L10.5 9 Z" />
    <path d="M5 5 L5.8 8 L8 9 L5.8 10 L5 13 L4.2 10 L2 9 L4.2 8 Z" />
    <path d="M19 2 L19.5 4 L21 5 L19.5 6 L19 8 L18.5 6 L17 5 L18.5 4 Z" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="#FF8C00" strokeWidth="1.5"/>
    <path d="M16 2V6M8 2V6M3 10H21" stroke="#FF8C00" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="16" r="2" fill="#FF8C00"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="8" stroke="#9CA3AF" strokeWidth="1.5"/>
    <path d="M21 21L16.5 16.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FilterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 4H21L14 12V20L10 16V12L3 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89783 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H5H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MoreVerticalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="5" r="1" fill="currentColor"/>
    <circle cx="12" cy="12" r="1" fill="currentColor"/>
    <circle cx="12" cy="19" r="1" fill="currentColor"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 16.92V19.92C22 20.48 21.56 20.93 21 20.98C20.62 21.01 20.24 21.03 19.85 21.03C10.28 21.03 2.47 13.22 2.47 3.65C2.47 3.26 2.49 2.88 2.52 2.5C2.57 1.94 3.02 1.5 3.58 1.5H6.58C7.08 1.5 7.5 1.87 7.58 2.36C7.72 3.24 7.95 4.08 8.26 4.87C8.42 5.29 8.31 5.76 7.98 6.06L6.42 7.62C7.91 10.5 10.5 13.09 13.38 14.58L14.94 13.02C15.24 12.69 15.71 12.58 16.13 12.74C16.92 13.05 17.76 13.28 18.64 13.42C19.13 13.5 19.5 13.92 19.5 14.42V16.92H22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DragIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="5" r="1.5" fill="currentColor"/>
    <circle cx="15" cy="5" r="1.5" fill="currentColor"/>
    <circle cx="9" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="15" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="9" cy="19" r="1.5" fill="currentColor"/>
    <circle cx="15" cy="19" r="1.5" fill="currentColor"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UserIconFilled = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 6H23V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CursorClickIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 9L15 15M15 9L9 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 3V5M12 19V21M3 12H5M19 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ClockReverseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 4V10H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.51 15C4.15839 16.8404 5.38734 18.4202 7.01166 19.5014C8.63598 20.5826 10.5677 21.1066 12.5157 20.9945C14.4637 20.8824 16.3226 20.1403 17.8121 18.8798C19.3017 17.6192 20.3413 15.9082 20.7742 14.0006C21.2072 12.0929 21.0101 10.0918 20.2126 8.30259C19.4152 6.51342 18.0605 5.03161 16.3528 4.0813C14.6451 3.13099 12.6769 2.66658 10.6958 2.7595C8.71479 2.85243 6.82487 3.5978 5.31 4.88L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="#155dfc" strokeWidth="1.5"/>
    <path d="M8 12L11 15L16 9" stroke="#155dfc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FileTextIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#155dfc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2V8H20M16 13H8M16 17H8" stroke="#155dfc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CalendarCheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="#155dfc" strokeWidth="1.5"/>
    <path d="M16 2V6M8 2V6M3 10H21" stroke="#155dfc" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 16L11 18L15 14" stroke="#155dfc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const statsRow1 = [
  { icon: <UsersIcon />, value: "12", label: "Total Open Positions", badge: "+12", subtext: "This month" },
  { icon: <UserPlusIcon />, value: "02", label: "Total Candidates Applied", badge: "+5", subtext: "Finished" },
  { icon: <DocumentIcon />, value: "40", label: "Candidates in Screening", badge: "+5", subtext: "Confirmed" },
  { icon: <ClockIcon />, value: "15", label: "Interview Scheduled", badge: "+5", subtext: "Today" },
  { icon: <GraduationCapIcon />, value: "180", label: "Candidates in Training", badge: "+5", subtext: "This Month" },
];

const statsRow2 = [
  { icon: <DocumentIcon />, value: "05", label: "Offers Released", badge: "+12", subtext: "This month" },
  { icon: <OfferIcon />, value: "05", label: "Offers Accepted", badge: "+5", subtext: "Finished" },
  { icon: <ChartIcon />, value: "3.3%", label: "Conversion Rate", badge: "+5", subtext: "Confirmed" },
  { icon: <ClockIcon />, value: "28 Days", label: "Average hiring time", badge: "+5", subtext: "Today" },
  { icon: <GraduationCapIcon />, value: "85%", label: "Training Completion Rate", badge: "+5", subtext: "This Month" },
];

const pipelineStages = [
  { label: "New", value: 25, color: "#2b7fff", bgColor: "bg-[#2b7fff]" },
  { label: "Screening", value: 40, color: "#ad46ff", bgColor: "bg-[#ad46ff]" },
  { label: "Interview", value: 18, color: "#ff6900", bgColor: "bg-[#ff6900]" },
  { label: "Training", value: 6, color: "#f0b100", bgColor: "bg-[#f0b100]" },
  { label: "Offer", value: 5, color: "#00c950", bgColor: "bg-[#00c950]" },
  { label: "Hired", value: 4, color: "#00bba7", bgColor: "bg-[#00bba7]" },
];

const recentCandidates = [
  { name: "Rohit Sharma", position: "UI/UX Designer", stage: "Screening", time: "2 hours ago", initials: "RS" },
  { name: "Priya Patel", position: "Sales Executive", stage: "Interview", time: "5 hours ago", initials: "PP" },
  { name: "Amit Kumar", position: "Production Manager", stage: "Training", time: "1 day ago", initials: "AK" },
  { name: "Sneha Reddy", position: "Marketing Executive", stage: "New", time: "2 days ago", initials: "SR" },
];

const upcomingInterviews = [
  { name: "Rahul Verma", position: "Software Developer", time: "Today, 2:00 PM", interviewer: "by Suresh Rao" },
  { name: "Anjali Singh", position: "HR Executive", time: "Today, 4:30 PM", interviewer: "by Priya Sharma" },
  { name: "Vikram Desai", position: "Accountant", time: "Tomorrow, 11:00 AM", interviewer: "by Amit Verma" },
  { name: "Neha Gupta", position: "Content Writer", time: "Tomorrow, 3:00 PM", interviewer: "by Deepak Singh" },
];

const candidatesList = [
  { id: 1, name: "Rohit Sharma", email: "rohit.sharma@email.com", position: "UI/UX Designer", stage: "Screening", appliedDate: "2024-01-15", initials: "RS", phone: "+91 98765 43210", experience: "3 years" },
  { id: 2, name: "Priya Patel", email: "priya.patel@email.com", position: "Sales Executive", stage: "Interview", appliedDate: "2024-01-14", initials: "PP", phone: "+91 87654 32109", experience: "2 years" },
  { id: 3, name: "Amit Kumar", email: "amit.kumar@email.com", position: "Production Manager", stage: "Training", appliedDate: "2024-01-13", initials: "AK", phone: "+91 76543 21098", experience: "5 years" },
  { id: 4, name: "Sneha Reddy", email: "sneha.reddy@email.com", position: "Marketing Executive", stage: "New", appliedDate: "2024-01-12", initials: "SR", phone: "+91 65432 10987", experience: "1 year" },
  { id: 5, name: "Vikram Singh", email: "vikram.singh@email.com", position: "Software Developer", stage: "Offer", appliedDate: "2024-01-11", initials: "VS", phone: "+91 54321 09876", experience: "4 years" },
  { id: 6, name: "Neha Gupta", email: "neha.gupta@email.com", position: "Content Writer", stage: "Hired", appliedDate: "2024-01-10", initials: "NG", phone: "+91 43210 98765", experience: "2 years" },
  { id: 7, name: "Rahul Verma", email: "rahul.verma@email.com", position: "Accountant", stage: "Interview", appliedDate: "2024-01-09", initials: "RV", phone: "+91 32109 87654", experience: "6 years" },
  { id: 8, name: "Anjali Mehta", email: "anjali.mehta@email.com", position: "HR Executive", stage: "Screening", appliedDate: "2024-01-08", initials: "AM", phone: "+91 21098 76543", experience: "3 years" },
];

const stageOptions = ["All Stages", "New", "Screening", "Interview", "Training", "Offer", "Hired"];

// ─── Kanban Data ───────────────────────────────────────────────────────────────
// ─── 14 Pipeline Steps ──────────────────────────────────────────────────────────
const kanbanColumns = [
  { id: "new", title: "New Candidates", color: "#2b7fff", bgColor: "#eff6ff", shortTitle: "New" },
  { id: "screening", title: "Screening", color: "#ad46ff", bgColor: "#faf5ff" },
  { id: "interview_scheduled", title: "Interview Scheduled", color: "#ff6900", bgColor: "#fff7ed" },
  { id: "interview_completed", title: "Interview Completed", color: "#f0b100", bgColor: "#fefce8" },
  { id: "training_assigned", title: "4 Days Training Assigned", color: "#2b7fff", bgColor: "#eff6ff" },
  { id: "day1_completed", title: "Day 1 Completed", color: "#2b7fff", bgColor: "#eff6ff" },
  { id: "day2_completed", title: "Day 2 Completed", color: "#ad46ff", bgColor: "#faf5ff" },
  { id: "day3_completed", title: "Day 3 Completed", color: "#ff6900", bgColor: "#fff7ed" },
  { id: "day4_completed", title: "Day 4 Completed", color: "#f0b100", bgColor: "#fefce8" },
  { id: "training_evaluation", title: "Training Evaluation", color: "#f6339a", bgColor: "#fdf2f8" },
  { id: "final_interview", title: "Ready for Final Interview", color: "#00a63e", bgColor: "#f0fdf4" },
  { id: "shortlisted", title: "Shortlisted", color: "#00c950", bgColor: "#f0fdf4" },
  { id: "offer", title: "Offer Letter", color: "#00c950", bgColor: "#f0fdf4" },
  { id: "rejected", title: "Rejected", color: "#fb2c36", bgColor: "#fef2f2" },
];

const kanbanCards = {
  new: [
    { id: 1, name: "Rohit Sharma", position: "UI/UX Designer", initials: "RS", appliedDate: "Mar 1, 2024", experience: "2 years", email: "rohit.sharma@email.com", phone: "+91 98765 43210", source: "LinkedIn", skillsMatch: 85 },
    { id: 2, name: "Priya Patel", position: "Sales Executive", initials: "PP", appliedDate: "Mar 2, 2024", experience: "3 years", email: "priya.patel@email.com", phone: "+91 87654 32109", source: "Referral", skillsMatch: 72 },
  ],
  screening: [
    { id: 3, name: "Amit Kumar", position: "Production Manager", initials: "AK", appliedDate: "Feb 28, 2024", experience: "5 years", email: "amit.kumar@email.com", phone: "+91 76543 21098", source: "Job Portal", skillsMatch: 85 },
    { id: 4, name: "Sneha Reddy", position: "Marketing Executive", initials: "SR", appliedDate: "Feb 27, 2024", experience: "1 year", email: "sneha.reddy@email.com", phone: "+91 65432 10987", source: "LinkedIn", skillsMatch: 72 },
  ],
  interview_scheduled: [
    { id: 5, name: "Rahul Verma", position: "Software Developer", initials: "RV", appliedDate: "Feb 25, 2024", experience: "4 years", email: "rahul.verma@email.com", phone: "+91 32109 87654", source: "Referral", interviewDate: "Mar 8, 2024", interviewer: "Suresh Rao" },
    { id: 6, name: "Anjali Singh", position: "HR Executive", initials: "AS", appliedDate: "Feb 24, 2024", experience: "2 years", email: "anjali.singh@email.com", phone: "+91 21098 76543", source: "Job Portal", interviewDate: "Mar 9, 2024", interviewer: "Priya Sharma" },
  ],
  interview_completed: [
    { id: 7, name: "Karthik Menon", position: "Accountant", initials: "KM", appliedDate: "Feb 20, 2024", experience: "4 years", email: "karthik.menon@email.com", phone: "+91 12345 67890", source: "LinkedIn", interviewDate: "Mar 7, 2024", interviewer: "Priya Sharma", rating: "4.5/5", mode: "Offline" },
  ],
  training_assigned: [],
  day1_completed: [
    { id: 8, name: "Rahul Mehta", position: "UI Designer", initials: "RM", appliedDate: "Mar 3, 2024", experience: "3 years", email: "rahul.mehta@email.com", phone: "+91 98765 43210", trainer: "Amit Singh", trainingDate: "Mar 4, 2024", progress: 50 },
  ],
  day2_completed: [
    { id: 9, name: "Priya Kapoor", position: "Sales Executive", initials: "PK", appliedDate: "Mar 2, 2024", experience: "2 years", email: "priya.kapoor@email.com", phone: "+91 87654 32109", trainer: "Suresh Rao", trainingDate: "Mar 5, 2024", progress: 25 },
  ],
  day3_completed: [],
  day4_completed: [],
  training_evaluation: [],
  final_interview: [],
  shortlisted: [
    { id: 10, name: "Neha Gupta", position: "Marketing Executive", initials: "NG", appliedDate: "Feb 18, 2024", experience: "3 years", email: "neha.gupta@email.com", phone: "+91 43210 98765", source: "Referral", interviewDate: "Mar 6, 2024", interviewer: "Deepak Singh", rating: "4.8/5", mode: "Online" },
  ],
  offer: [
    { id: 11, name: "Vikram Singh", position: "Software Developer", initials: "VS", appliedDate: "Jan 11, 2024", experience: "4 years", email: "vikram.singh@email.com", phone: "+91 54321 09876", salary: "₹35,000" },
  ],
  rejected: [],
};

// ─── Interview Columns for Kanban View ─────────────────────────────────────────
const interviewColumns = [
  { id: "today", title: "Today", color: "#2b7fff", bgColor: "#e0f2fe" },
  { id: "upcoming", title: "Upcoming", color: "#ad46ff", bgColor: "#f3e8ff" },
  { id: "completed", title: "Completed", color: "#00c950", bgColor: "#dcfce7" },
  { id: "cancelled", title: "Cancelled", color: "#ef4444", bgColor: "#fee2e2" },
];

const interviewCards = {
  today: [
    { id: 1, candidate: "Rahul Verma", position: "Software Developer", interviewer: "Suresh Rao", time: "2:00 PM", duration: "45 min", type: "Technical Round", initials: "RV", email: "rahul.verma@email.com" },
    { id: 2, candidate: "Anjali Singh", position: "HR Executive", interviewer: "Priya Sharma", time: "4:30 PM", duration: "30 min", type: "HR Round", initials: "AS", email: "anjali.singh@email.com" },
  ],
  upcoming: [
    { id: 3, candidate: "Vikram Desai", position: "Accountant", interviewer: "Amit Verma", date: "Tomorrow", time: "11:00 AM", duration: "60 min", type: "Technical Round", initials: "VD", email: "vikram.desai@email.com" },
    { id: 4, candidate: "Neha Gupta", position: "Content Writer", interviewer: "Deepak Singh", date: "Tomorrow", time: "3:00 PM", duration: "30 min", type: "Final Round", initials: "NG", email: "neha.gupta@email.com" },
    { id: 9, candidate: "Sneha Reddy", position: "Marketing Executive", interviewer: "Kavita Patel", date: "Mar 15, 2024", time: "10:00 AM", duration: "45 min", type: "HR Round", initials: "SR", email: "sneha.reddy@email.com" },
  ],
  completed: [
    { id: 5, candidate: "Rohit Sharma", position: "UI/UX Designer", interviewer: "Kavita Patel", date: "Mar 12, 2024", type: "Portfolio Review", initials: "RS", email: "rohit.sharma@email.com" },
    { id: 6, candidate: "Priya Patel", position: "Sales Executive", interviewer: "Amit Kumar", date: "Mar 11, 2024", type: "HR Round", initials: "PP", email: "priya.patel@email.com" },
  ],
  cancelled: [
    { id: 7, candidate: "Amit Kumar", position: "Production Manager", interviewer: "Suresh Rao", date: "Mar 10, 2024", type: "Technical Round", initials: "AK", email: "amit.kumar@email.com" },
  ],
};

// ─── Training Columns for Kanban View ──────────────────────────────────────────
const trainingColumns = [
  { id: "not_started", title: "Not Started", color: "#6b7280", bgColor: "#f3f4f6" },
  { id: "in_progress", title: "In Progress", color: "#2b7fff", bgColor: "#e0f2fe" },
  { id: "completed", title: "Completed", color: "#00c950", bgColor: "#dcfce7" },
];

const trainingKanbanCards = {
  not_started: [
    { id: 101, name: "Ravi Sharma", position: "Data Analyst", program: "Technical Onboarding", initials: "RS", mentor: "Priya Sharma", progress: 0 },
    { id: 102, name: "Pooja Verma", position: "HR Executive", program: "Customer Service Fundamentals", initials: "PV", mentor: "Amit Verma", progress: 0 },
  ],
  in_progress: [
    { id: 1, name: "Amit Kumar", position: "Production Manager", program: "Technical Onboarding", initials: "AK", mentor: "Priya Sharma", progress: 85 },
    { id: 2, name: "Suresh Rao", position: "Quality Analyst", program: "Technical Onboarding", initials: "SR", mentor: "Priya Sharma", progress: 60 },
    { id: 3, name: "Pooja Sharma", position: "Sales Executive", program: "Sales Excellence Program", initials: "PS", mentor: "Rajesh Kumar", progress: 45 },
    { id: 6, name: "Vikram Singh", position: "Software Developer", program: "Technical Onboarding", initials: "VS", mentor: "Priya Sharma", progress: 30 },
    { id: 7, name: "Meera Joshi", position: "Marketing Lead", program: "Leadership Development", initials: "MJ", mentor: "Suresh Rao", progress: 50 },
    { id: 8, name: "Sanjay Patel", position: "Operations Manager", program: "Compliance & Safety", initials: "SP", mentor: "Deepak Singh", progress: 75 },
  ],
  completed: [
    { id: 4, name: "Rahul Singh", position: "Data Analyst", program: "Technical Onboarding", initials: "RS", mentor: "Priya Sharma", progress: 100 },
    { id: 5, name: "Neha Gupta", position: "Content Writer", program: "Product Knowledge Training", initials: "NG", mentor: "Kavita Patel", progress: 100 },
  ],
};

const navTabs = [
  { label: "Dashboard", value: "dashboard" },
  { label: "Candidates List", value: "candidates" },
  { label: "Kanban Pipeline", value: "kanban" },
  { label: "Interviews", value: "interviews" },
  { label: "Training", value: "training" },
];

// ─── Stat Card Component ──────────────────────────────────────────────────────
const StatCard = ({ icon, value, label, badge, subtext }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 flex items-start justify-between gap-4 cursor-pointer hover:-translate-y-1">
    <div className="flex flex-col gap-2">
      <div className="w-10 h-10 rounded-xl bg-[#ffe3e3] flex items-center justify-center transition-transform duration-200 hover:scale-110">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 leading-none">{value}</p>
        <p className="text-sm font-medium text-black/60 mt-1">{label}</p>
      </div>
      <p className="text-xs text-gray-400 capitalize">{subtext}</p>
    </div>
    <div className="flex items-center gap-1 mt-2">
      <TrendUpIcon />
      <span className="text-[#a60000] text-sm font-semibold">{badge}</span>
    </div>
  </div>
);

// ─── Pipeline Stage Circle Component ──────────────────────────────────────────
const PipelineStage = ({ label, value, color, isLast }) => (
  <div className="flex items-center">
    <div className="flex flex-col items-center group cursor-pointer">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
        style={{ backgroundColor: color }}
      >
        {value}
      </div>
      <span className="text-sm font-medium text-gray-600 mt-2 transition-colors duration-200 group-hover:text-gray-900">{label}</span>
    </div>
    {!isLast && (
      <div className="flex items-center mx-4">
        <ArrowRightIcon />
      </div>
    )}
  </div>
);

// ─── Candidate Item Component ─────────────────────────────────────────────────
const CandidateItem = ({ initials, name, position, stage, time }) => {
  const stageColors = {
    "Screening": "bg-blue-100 text-blue-600",
    "Interview": "bg-purple-100 text-purple-600",
    "Training": "bg-amber-100 text-amber-600",
    "New": "bg-cyan-100 text-cyan-600",
    "Offer": "bg-green-100 text-green-600",
  };

  return (
    <div className="flex items-center justify-between py-3 px-3 -mx-3 border-b border-gray-50 last:border-0 rounded-lg transition-all duration-200 hover:bg-gray-50 cursor-pointer">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium transition-transform duration-200 hover:scale-105"
          style={{ background: "linear-gradient(135deg, #2b7fff 0%, #ad46ff 100%)" }}
        >
          {initials}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">{name}</p>
          <p className="text-xs text-gray-500">{position}</p>
        </div>
      </div>
      <div className="text-right">
        <span className={`px-2 py-1 rounded-full text-[11px] font-medium ${stageColors[stage] || "bg-blue-100 text-blue-600"}`}>
          {stage}
        </span>
        <p className="text-[11px] text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
};

// ─── Interview Item Component ─────────────────────────────────────────────────
const InterviewItem = ({ name, position, time, interviewer }) => (
  <div className="flex items-center justify-between py-3 px-3 -mx-3 border-b border-gray-50 last:border-0 rounded-lg transition-all duration-200 hover:bg-gray-50 cursor-pointer">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-[#ffedd4] flex items-center justify-center transition-transform duration-200 hover:scale-105">
        <CalendarIcon />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-800">{name}</p>
        <p className="text-xs text-gray-500">{position}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-sm font-medium text-gray-800">{time}</p>
      <p className="text-[11px] text-gray-400">{interviewer}</p>
    </div>
  </div>
);

// ─── Stage Badge Component ────────────────────────────────────────────────────
const StageBadge = ({ stage }) => {
  const stageStyles = {
    "New": "bg-[#e0f2fe] text-[#0369a1] border border-[#bae6fd]",
    "Screening": "bg-[#f3e8ff] text-[#7c3aed] border border-[#e9d5ff]",
    "Interview": "bg-[#fff7ed] text-[#c2410c] border border-[#fed7aa]",
    "Training": "bg-[#fef9c3] text-[#a16207] border border-[#fde047]",
    "Offer": "bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0]",
    "Hired": "bg-[#ccfbf1] text-[#0f766e] border border-[#99f6e4]",
  };

  return (
    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${stageStyles[stage] || "bg-gray-100 text-gray-600"}`}>
      {stage}
    </span>
  );
};

// ─── Candidates List Page Component ───────────────────────────────────────────
const CandidatesListPage = ({ onViewProfile, onAddCandidate, onEditCandidate, onDeleteCandidate }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState("All Stages");
  const [showStageDropdown, setShowStageDropdown] = useState(false);

  const filteredCandidates = candidatesList.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          candidate.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = selectedStage === "All Stages" || candidate.stage === selectedStage;
    return matchesSearch && matchesStage;
  });

  return (
    <div className="space-y-5">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Candidates List</h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage and track all candidates in your recruitment pipeline</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 hover:shadow-sm">
            <DownloadIcon />
            Export
          </button>
          <button
            onClick={onAddCandidate}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-all duration-200 hover:shadow-md"
          >
            <PlusIcon />
            Add Candidate
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 transition-shadow duration-200 hover:shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search candidates by name, position, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200 placeholder:text-gray-400"
            />
          </div>

          {/* Stage Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowStageDropdown(!showStageDropdown)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all duration-200 min-w-[160px] justify-between"
            >
              <div className="flex items-center gap-2">
                <FilterIcon />
                <span>{selectedStage}</span>
              </div>
              <ChevronDownIcon />
            </button>

            {showStageDropdown && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                {stageOptions.map((stage) => (
                  <button
                    key={stage}
                    onClick={() => {
                      setSelectedStage(stage);
                      setShowStageDropdown(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm transition-colors duration-150 ${
                      selectedStage === stage
                        ? "bg-red-50 text-red-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Candidates Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-shadow duration-200 hover:shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Candidate</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Position</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stage</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Applied Date</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Experience</th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-50">
              {filteredCandidates.map((candidate) => (
                <tr
                  key={candidate.id}
                  className="transition-all duration-200 hover:bg-gray-50/50 cursor-pointer group"
                >
                  {/* Candidate Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                        style={{ background: "linear-gradient(135deg, #2b7fff 0%, #ad46ff 100%)" }}
                      >
                        {candidate.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors duration-200">{candidate.name}</p>
                        <p className="text-xs text-gray-500">{candidate.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Position */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{candidate.position}</span>
                  </td>

                  {/* Stage Badge */}
                  <td className="px-6 py-4">
                    <StageBadge stage={candidate.stage} />
                  </td>

                  {/* Applied Date */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{candidate.appliedDate}</span>
                  </td>

                  {/* Experience */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{candidate.experience}</span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => onViewProfile(candidate)}
                        className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-all duration-200"
                        title="View"
                      >
                        <EyeIcon />
                      </button>
                      <button
                        onClick={() => onEditCandidate && onEditCandidate(candidate)}
                        className="p-2 rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-all duration-200"
                        title="Edit"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => onDeleteCandidate && onDeleteCandidate(candidate)}
                        className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all duration-200"
                        title="Delete"
                      >
                        <TrashIcon />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all duration-200" title="More">
                        <MoreVerticalIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer - Pagination */}
        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-700">{filteredCandidates.length}</span> of <span className="font-medium text-gray-700">{candidatesList.length}</span> candidates
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-200">
              1
            </button>
            <button className="px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
              2
            </button>
            <button className="px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
              3
            </button>
            <button className="px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Kanban Card Component ───────────────────────────────────────────────────
const KanbanCard = ({ card, columnColor, onViewProfile, onDragStart, onDragEnd, isDragging, onEdit, onDelete }) => {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-gray-200 group relative overflow-hidden ${
        isDragging ? 'opacity-50 scale-95 rotate-2' : 'hover:-translate-y-1'
      }`}
      onClick={() => onViewProfile(card)}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', card.id);
        e.dataTransfer.effectAllowed = 'move';
        onDragStart && onDragStart(card.id);
      }}
      onDragEnd={() => {
        onDragEnd && onDragEnd();
      }}
    >
      {/* Gradient accent on hover */}
      <div
        className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${columnColor} 0%, ${columnColor}80 100%)` }}
      />

      {/* Action buttons - Edit & Delete */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit && onEdit(card); }}
          className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 shadow-sm"
          title="Edit"
        >
          <EditIcon />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete && onDelete(card); }}
          className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-all duration-200 shadow-sm"
          title="Delete"
        >
          <TrashIcon />
        </button>
      </div>

      {/* Card Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg"
            style={{ background: `linear-gradient(135deg, ${columnColor} 0%, ${columnColor}cc 100%)` }}
          >
            {card.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-200">{card.name}</p>
            <p className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors duration-200">{card.position}</p>
          </div>
        </div>
      </div>

      {/* Card Details */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-200">
          <BriefcaseIcon />
          <span>{card.experience} experience</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-200">
          <MailIcon />
          <span className="truncate">{card.email}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-200">
          <PhoneIcon />
          <span>{card.phone}</span>
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-200">
        <span className="text-[11px] text-gray-400 group-hover:text-gray-500 transition-colors duration-200">Applied: {card.appliedDate}</span>
        <button
          onClick={(e) => { e.stopPropagation(); onViewProfile(card); }}
          className="text-[11px] text-red-600 hover:text-red-700 font-medium transition-colors duration-200 opacity-0 group-hover:opacity-100"
        >
          View Profile →
        </button>
      </div>
    </div>
  );
};

// ─── Kanban Pipeline Page Component ───────────────────────────────────────────
const KanbanPipelinePage = ({ onViewProfile, scrollToSection, scrollContainerRef, activeTab, onAddCandidate, cards: externalCards, onEditCandidate, onDeleteCandidate }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedCardId, setDraggedCardId] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [internalCards, setInternalCards] = useState(kanbanCards);
  const [viewMode, setViewMode] = useState("kanban");

  // Use external cards if provided, otherwise use internal state
  const cards = externalCards || internalCards;
  const setCards = externalCards ? () => {} : setInternalCards;
  const internalScrollRef = useRef(null);
  const actualScrollRef = scrollContainerRef || internalScrollRef;

  // Scroll to specific section when tab or scrollToSection changes
  useEffect(() => {
    const targetSection = scrollToSection || (activeTab === 'interviews' ? 'interview_scheduled' : activeTab === 'training' ? 'training_assigned' : null);
    if (targetSection && actualScrollRef.current) {
      const columnIndex = kanbanColumns.findIndex(col => col.id === targetSection);
      if (columnIndex !== -1) {
        const columnWidth = 340; // column width + gap
        actualScrollRef.current.scrollTo({
          left: columnIndex * columnWidth - 20,
          behavior: 'smooth'
        });
      }
    }
  }, [scrollToSection, activeTab, actualScrollRef]);

  const handleDragStart = (cardId) => {
    setDraggedCardId(cardId);
  };

  const handleDragEnd = () => {
    setDraggedCardId(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    setDragOverColumn(null);

    if (!draggedCardId) return;

    // Find the source column and card
    let sourceColumn = null;
    let cardToMove = null;

    for (const [columnId, columnCards] of Object.entries(cards)) {
      const cardIndex = columnCards.findIndex(card => card.id === draggedCardId);
      if (cardIndex !== -1) {
        sourceColumn = columnId;
        cardToMove = columnCards[cardIndex];
        break;
      }
    }

    if (!cardToMove || sourceColumn === targetColumnId) {
      setDraggedCardId(null);
      return;
    }

    // Update the cards state
    setCards(prevCards => {
      const newCards = { ...prevCards };
      // Remove from source
      newCards[sourceColumn] = newCards[sourceColumn].filter(card => card.id !== draggedCardId);
      // Add to target
      newCards[targetColumnId] = [...newCards[targetColumnId], cardToMove];
      return newCards;
    });

    setDraggedCardId(null);
  };

  // Get all cards for list view
  const allCards = Object.entries(cards).flatMap(([columnId, columnCards]) =>
    columnCards.map(card => ({ ...card, columnId }))
  );

  const filteredCards = searchQuery
    ? allCards.filter(card =>
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.position.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allCards;

  return (
    <div className="space-y-5">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Recruitment Pipeline</h2>
          <p className="text-sm text-gray-500 mt-0.5">14-step recruitment process with drag and drop functionality</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode("kanban")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                viewMode === "kanban"
                  ? "bg-white text-red-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="14" y="3" width="7" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Kanban
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                viewMode === "list"
                  ? "bg-white text-red-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              List
            </button>
          </div>
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200 w-64 placeholder:text-gray-400 group-hover:border-gray-300"
            />
          </div>
          <button
            onClick={onAddCandidate}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
          >
            <PlusIcon />
            Add Candidate
          </button>
        </div>
      </div>

      {/* Drag instruction */}
      {draggedCardId && viewMode === "kanban" && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white"/>
            </svg>
          </div>
          <span className="text-sm text-blue-700 font-medium">Drop the candidate card on any stage to move them</span>
        </div>
      )}

      {/* Pipeline Stats - Scrollable */}
      <div className="overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="flex gap-4 min-w-max">
          {kanbanColumns.map((column) => (
            <div
              key={column.id}
              className="bg-white rounded-2xl border border-gray-100 p-4 transition-all duration-300 hover:shadow-lg hover:border-gray-200 cursor-pointer hover:-translate-y-1 group flex-shrink-0 w-[180px]"
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: column.color }}
                >
                  {cards[column.id]?.length || 0}
                </div>
                <div
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ backgroundColor: column.color }}
                />
              </div>
              <p className="text-xs font-medium text-gray-800 truncate" title={column.title}>{column.title}</p>
              <p className="text-xs text-gray-500 mt-1">candidates</p>
            </div>
          ))}
        </div>
      </div>

      {viewMode === "kanban" ? (
        /* Kanban View */
        <>
          {/* Kanban Board - Horizontal Scroll */}
          <div
            ref={actualScrollRef}
            className="flex gap-5 overflow-x-auto pb-4 pt-1 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {kanbanColumns.map((column) => {
              const isDragOver = dragOverColumn === column.id;
              // Determine if this column should be highlighted based on active tab
              const isActiveSection = (
                (activeTab === 'interviews' && column.id === 'interview_scheduled') ||
                (activeTab === 'training' && column.id === 'training_assigned') ||
                (activeTab === 'kanban' && column.id === 'new')
              );
              return (
                <div
                  key={column.id}
                  id={`kanban-column-${column.id}`}
                  className={`flex-shrink-0 w-[320px] rounded-2xl border-2 transition-all duration-200 ${
                    isDragOver
                      ? 'bg-blue-50/80 border-blue-300 shadow-lg scale-[1.02]'
                      : isActiveSection
                      ? 'bg-yellow-50/80 border-yellow-400 shadow-lg ring-2 ring-yellow-300'
                      : 'bg-gray-50/80 border-gray-100 hover:shadow-lg'
                  }`}
                  onDragOver={(e) => handleDragOver(e, column.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, column.id)}
                >
                  {/* Column Header */}
                  <div
                    className={`px-4 py-3 rounded-t-2xl border-b transition-all duration-200 ${
                      isDragOver ? 'border-blue-200' : isActiveSection ? 'border-yellow-200' : 'border-gray-100'
                    }`}
                    style={{ backgroundColor: column.bgColor }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full shadow-sm transition-transform duration-200 ${
                            isDragOver ? 'scale-125' : ''
                          }`}
                          style={{ backgroundColor: column.color }}
                        />
                        <h3 className="font-semibold text-gray-800 text-sm truncate" title={column.title}>
                          {column.title}
                        </h3>
                        {isActiveSection && (
                          <span className="ml-2 px-2 py-0.5 bg-yellow-400 text-yellow-900 text-[10px] font-bold rounded-full animate-pulse">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full text-white shadow-sm"
                        style={{ backgroundColor: column.color }}
                      >
                        {cards[column.id]?.length || 0}
                      </span>
                    </div>
                  </div>

                  {/* Column Content */}
                  <div className="p-2 max-h-[calc(100vh-400px)] overflow-y-auto space-y-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {cards[column.id]?.map((card) => (
                      <KanbanCard
                        key={card.id}
                        card={card}
                        columnColor={column.color}
                        onViewProfile={onViewProfile}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        isDragging={draggedCardId === card.id}
                        onEdit={onEditCandidate}
                        onDelete={onDeleteCandidate}
                      />
                    ))}

                    {/* Drop zone indicator when dragging over */}
                    {isDragOver && (
                      <div className="border-2 border-dashed border-blue-400 rounded-xl p-4 flex items-center justify-center bg-blue-50/50">
                        <div className="text-center">
                          <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-blue-100 flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 5V19M5 12H19" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span className="text-xs text-blue-600 font-medium">Drop here</span>
                        </div>
                      </div>
                    )}

                    {/* Add Card Button */}
                    <button className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-xs text-gray-400 hover:text-red-600 hover:border-red-300 hover:bg-red-50/30 transition-all duration-200 flex items-center justify-center gap-1 group">
                      <div className="transition-transform duration-200 group-hover:rotate-90">
                        <PlusIcon />
                      </div>
                      Add
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Candidate</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stage</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Applied</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Experience</th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredCards.map((card) => {
                  const column = kanbanColumns.find(c => c.id === card.columnId);
                  return (
                    <tr key={card.id} className="transition-all duration-200 hover:bg-gray-50/50 cursor-pointer group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                            style={{ background: `linear-gradient(135deg, ${column?.color || '#2b7fff'}, ${column?.color || '#2b7fff'}cc)` }}
                          >
                            {card.initials}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors duration-200">{card.name}</p>
                            <p className="text-xs text-gray-500">{card.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">{card.position}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: column?.bgColor, color: column?.color }}
                        >
                          {column?.shortTitle || column?.title}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">{card.appliedDate}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">{card.experience}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => onViewProfile(card)}
                            className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-all duration-200"
                            title="View Profile"
                          >
                            <EyeIcon />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-all duration-200" title="Edit">
                            <EditIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-700">{filteredCards.length}</span> candidates across all stages
            </p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 transition-all duration-200 hover:shadow-md overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="flex flex-nowrap items-center gap-6 min-w-max">
          <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Pipeline Steps:</span>
          {kanbanColumns.map((column, index) => (
            <div key={column.id} className="flex items-center gap-2 group cursor-pointer flex-shrink-0">
              <div
                className="w-3 h-3 rounded-full shadow-sm transition-transform duration-200 group-hover:scale-125"
                style={{ backgroundColor: column.color }}
              />
              <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors duration-200 whitespace-nowrap">{index + 1}. {column.shortTitle || column.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-100 p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#dc2626"/>
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-1">Quick Tip</h4>
            <p className="text-sm text-gray-600">
              Use the <strong>Kanban/List</strong> toggle to switch views. Drag candidates between stages in Kanban view. Scroll horizontally to see all 14 pipeline stages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Interview Status Badge Component ───────────────────────────────────────────
const InterviewStatusBadge = ({ status }) => {
  const statusStyles = {
    scheduled: "bg-blue-100 text-blue-700 border border-blue-200",
    completed: "bg-green-100 text-green-700 border border-green-200",
    cancelled: "bg-red-100 text-red-700 border border-red-200",
    pending: "bg-amber-100 text-amber-700 border border-amber-200",
  };

  const statusIcons = {
    scheduled: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    completed: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    cancelled: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {statusIcons[status]}
      <span className="capitalize">{status}</span>
    </span>
  );
};

// ─── Interview Type Badge Component ─────────────────────────────────────────────
const InterviewTypeBadge = ({ type }) => {
  const typeColors = {
    "Technical Round": { bg: "#f3e8ff", text: "#7c3aed", border: "#e9d5ff" },
    "HR Round": { bg: "#fff7ed", text: "#c2410c", border: "#fed7aa" },
    "Final Round": { bg: "#dcfce7", text: "#15803d", border: "#bbf7d0" },
    "Portfolio Review": { bg: "#e0f2fe", text: "#0369a1", border: "#bae6fd" },
  };

  const colors = typeColors[type] || { bg: "#f3f4f6", text: "#374151", border: "#e5e7eb" };

  return (
    <span
      className="px-2.5 py-1 rounded-lg text-xs font-medium"
      style={{ backgroundColor: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
    >
      {type}
    </span>
  );
};

// ─── Interview Card Component ───────────────────────────────────────────────────
const InterviewCard = ({ card, columnColor, onViewProfile }) => {
  return (
    <div
      className="bg-white rounded-xl border border-gray-100 p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden"
      style={{
        boxShadow: `inset 0 0 0 0 transparent`,
      }}
    >
      {/* Gradient accent on hover */}
      <div
        className="absolute inset-x-0 top-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${columnColor}, ${columnColor}cc)` }}
      />

      {/* Candidate Info */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md transition-transform duration-200 group-hover:scale-110"
          style={{ background: `linear-gradient(135deg, ${columnColor}, ${columnColor}cc)` }}
        >
          {card.initials}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-red-600 transition-colors duration-200">
            {card.candidate}
          </h4>
          <p className="text-xs text-gray-500 truncate">{card.position}</p>
        </div>
        <button
          onClick={() => onViewProfile && onViewProfile(card)}
          className="p-1.5 rounded-lg bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all duration-200 opacity-0 group-hover:opacity-100"
          title="View Profile"
        >
          <EyeIcon />
        </button>
      </div>

      {/* Interview Details */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{card.interviewer}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span>{card.date || "Today"}, {card.time}</span>
        </div>
      </div>

      {/* Type Badge */}
      <div className="flex items-center justify-between">
        <InterviewTypeBadge type={card.type} />
        <span className="text-xs text-gray-500">{card.duration}</span>
      </div>
    </div>
  );
};

// ─── Interviews Page Component ───────────────────────────────────────────────────
const InterviewsPage = ({ onViewProfile }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cards] = useState(interviewCards);
  const [viewMode, setViewMode] = useState("kanban");

  // Get all cards for list view
  const allInterviews = Object.entries(cards).flatMap(([columnId, columnCards]) =>
    columnCards.map(card => ({ ...card, columnId }))
  );

  const filteredInterviews = searchQuery
    ? allInterviews.filter(card =>
        card.candidate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.position.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allInterviews;

  return (
    <div className="space-y-5">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Interviews</h2>
          <p className="text-sm text-gray-500 mt-0.5">Schedule and manage candidate interviews across all stages</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode("kanban")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                viewMode === "kanban"
                  ? "bg-white text-red-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="14" y="3" width="7" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Kanban
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                viewMode === "list"
                  ? "bg-white text-red-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              List
            </button>
          </div>
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search interviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200 w-64 placeholder:text-gray-400 group-hover:border-gray-300"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-95">
            <PlusIcon />
            Schedule Interview
          </button>
        </div>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {interviewColumns.map((column) => {
          const count = cards[column.id]?.length || 0;
          return (
            <div
              key={column.id}
              className="bg-white rounded-2xl border border-gray-100 p-4 transition-all duration-300 hover:shadow-lg hover:border-gray-200 cursor-pointer hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-md transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: column.color }}
                >
                  {count}
                </div>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full transition-all duration-200"
                  style={{ backgroundColor: column.bgColor, color: column.color }}
                >
                  {column.title}
                </span>
              </div>
              <p className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
                {column.id === 'today' ? 'Today' : column.id === 'upcoming' ? 'Upcoming' : column.id === 'completed' ? 'Completed' : 'Cancelled'} interviews
              </p>
            </div>
          );
        })}
      </div>

      {viewMode === "kanban" ? (
        /* Kanban View */
        <div className="flex gap-5 overflow-x-auto pb-4 pt-1">
          {interviewColumns.map((column) => (
            <div
              key={column.id}
              className="flex-shrink-0 w-[340px] rounded-2xl border-2 transition-all duration-200 bg-gray-50/80 border-gray-100 hover:shadow-lg"
            >
              {/* Column Header */}
              <div
                className="px-5 py-4 rounded-t-2xl border-b border-gray-100"
                style={{ backgroundColor: column.bgColor }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full shadow-sm"
                      style={{ backgroundColor: column.color }}
                    />
                    <h3 className="font-semibold text-gray-800">{column.title}</h3>
                  </div>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full text-white shadow-sm transition-transform duration-200 hover:scale-110"
                    style={{ backgroundColor: column.color }}
                  >
                    {cards[column.id]?.length || 0}
                  </span>
                </div>
              </div>

              {/* Column Content */}
              <div className="p-3 max-h-[calc(100vh-420px)] overflow-y-auto space-y-3">
                {cards[column.id]?.map((card) => (
                  <InterviewCard
                    key={card.id}
                    card={card}
                    columnColor={column.color}
                    onViewProfile={onViewProfile}
                  />
                ))}

                {/* Add Card Button */}
                <button className="w-full py-3.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:text-red-600 hover:border-red-300 hover:bg-red-50/30 transition-all duration-200 flex items-center justify-center gap-2 group">
                  <div className="transition-transform duration-200 group-hover:rotate-90">
                    <PlusIcon />
                  </div>
                  Add Interview
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Candidate</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Interviewer</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredInterviews.map((card) => {
                  const column = interviewColumns.find(c => c.id === card.columnId);
                  return (
                    <tr key={card.id} className="transition-all duration-200 hover:bg-gray-50/50 cursor-pointer group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm"
                            style={{ backgroundColor: column?.color || '#2b7fff' }}
                          >
                            {card.initials}
                          </div>
                          <span className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors">{card.candidate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{card.position}</td>
                      <td className="px-6 py-4">
                        <InterviewTypeBadge type={card.type} />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{card.interviewer}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                          <span>{card.date || "Today"}, {card.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: column?.bgColor || '#f3f4f6', color: column?.color || '#374151' }}
                        >
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: column?.color || '#374151' }}
                          />
                          {column?.title || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => onViewProfile && onViewProfile(card)}
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-600 transition-all duration-200"
                          title="View Details"
                        >
                          <EyeIcon />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-700">{filteredInterviews.length}</span> interviews across all statuses
            </p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 transition-all duration-200 hover:shadow-md">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="text-sm font-semibold text-gray-700">Status Legend:</span>
          {interviewColumns.map((column) => (
            <div key={column.id} className="flex items-center gap-2 group cursor-pointer">
              <div
                className="w-4 h-4 rounded-full shadow-sm transition-transform duration-200 group-hover:scale-125"
                style={{ backgroundColor: column.color }}
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200">{column.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-100 p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#dc2626"/>
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-1">Quick Tip</h4>
            <p className="text-sm text-gray-600">
              Click on the view icon <span className="inline-flex items-center mx-1"><EyeIcon /></span> on any interview card to view complete details, reschedule, or cancel the interview.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Progress Bar Component ────────────────────────────────────────────────────
const ProgressBar = ({ progress, color = "#2b7fff" }) => {
  return (
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%`, backgroundColor: color }}
      />
    </div>
  );
};

// ─── Training Status Badge Component ───────────────────────────────────────────
const TrainingStatusBadge = ({ status }) => {
  const statusStyles = {
    in_progress: "bg-blue-100 text-blue-700 border border-blue-200",
    completed: "bg-green-100 text-green-700 border border-green-200",
    not_started: "bg-gray-100 text-gray-700 border border-gray-200",
    active: "bg-purple-100 text-purple-700 border border-purple-200",
  };

  const statusIcons = {
    in_progress: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    completed: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    active: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
      </svg>
    ),
    not_started: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  };

  const displayStatus = status === "in_progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {statusIcons[status]}
      <span>{displayStatus}</span>
    </span>
  );
};

// ─── Training Card Component ───────────────────────────────────────────────────
const TrainingCard = ({ card, columnColor, onViewProfile }) => {
  return (
    <div
      className="bg-white rounded-xl border border-gray-100 p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden"
    >
      {/* Gradient accent on hover */}
      <div
        className="absolute inset-x-0 top-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${columnColor}, ${columnColor}cc)` }}
      />

      {/* Candidate Info */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md transition-transform duration-200 group-hover:scale-110"
          style={{ background: `linear-gradient(135deg, ${columnColor}, ${columnColor}cc)` }}
        >
          {card.initials}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-red-600 transition-colors duration-200">
            {card.name}
          </h4>
          <p className="text-xs text-gray-500 truncate">{card.position}</p>
        </div>
        <button
          onClick={() => onViewProfile && onViewProfile(card)}
          className="p-1.5 rounded-lg bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all duration-200 opacity-0 group-hover:opacity-100"
          title="View Profile"
        >
          <EyeIcon />
        </button>
      </div>

      {/* Program Info */}
      <div className="mb-3">
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 10V16C6 16 9 19 12 19C15 19 18 16 18 16V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="truncate font-medium">{card.program}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{card.mentor}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-500">Progress</span>
          <span className="text-xs font-semibold" style={{ color: columnColor }}>{card.progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${card.progress}%`, backgroundColor: columnColor }}
          />
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center justify-between">
        <TrainingStatusBadge status={card.progress === 100 ? "completed" : card.progress === 0 ? "not_started" : "in_progress"} />
      </div>
    </div>
  );
};

// ─── Training Page Component ───────────────────────────────────────────────────
const TrainingPage = ({ onViewProfile }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cards] = useState(trainingKanbanCards);
  const [viewMode, setViewMode] = useState("kanban");

  // Get all cards for list view
  const allTraining = Object.entries(cards).flatMap(([columnId, columnCards]) =>
    columnCards.map(card => ({ ...card, columnId }))
  );

  const filteredTraining = searchQuery
    ? allTraining.filter(card =>
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.position.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allTraining;

  return (
    <div className="space-y-5">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Training</h2>
          <p className="text-sm text-gray-500 mt-0.5">Track candidate progress through training programs</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode("kanban")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                viewMode === "kanban"
                  ? "bg-white text-red-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="14" y="3" width="7" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Kanban
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                viewMode === "list"
                  ? "bg-white text-red-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              List
            </button>
          </div>
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200 w-64 placeholder:text-gray-400 group-hover:border-gray-300"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-95">
            <PlusIcon />
            Add to Training
          </button>
        </div>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {trainingColumns.map((column) => {
          const count = cards[column.id]?.length || 0;
          return (
            <div
              key={column.id}
              className="bg-white rounded-2xl border border-gray-100 p-4 transition-all duration-300 hover:shadow-lg hover:border-gray-200 cursor-pointer hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-md transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: column.color }}
                >
                  {count}
                </div>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full transition-all duration-200"
                  style={{ backgroundColor: column.bgColor, color: column.color }}
                >
                  {column.title}
                </span>
              </div>
              <p className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
                {column.id === 'not_started' ? 'Not started yet' : column.id === 'in_progress' ? 'Currently training' : 'Completed training'}
              </p>
            </div>
          );
        })}
      </div>

      {viewMode === "kanban" ? (
        /* Kanban View */
        <div className="flex gap-5 overflow-x-auto pb-4 pt-1">
          {trainingColumns.map((column) => (
            <div
              key={column.id}
              className="flex-shrink-0 w-[340px] rounded-2xl border-2 transition-all duration-200 bg-gray-50/80 border-gray-100 hover:shadow-lg"
            >
              {/* Column Header */}
              <div
                className="px-5 py-4 rounded-t-2xl border-b border-gray-100"
                style={{ backgroundColor: column.bgColor }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full shadow-sm"
                      style={{ backgroundColor: column.color }}
                    />
                    <h3 className="font-semibold text-gray-800">{column.title}</h3>
                  </div>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full text-white shadow-sm transition-transform duration-200 hover:scale-110"
                    style={{ backgroundColor: column.color }}
                  >
                    {cards[column.id]?.length || 0}
                  </span>
                </div>
              </div>

              {/* Column Content */}
              <div className="p-3 max-h-[calc(100vh-420px)] overflow-y-auto space-y-3">
                {cards[column.id]?.map((card) => (
                  <TrainingCard
                    key={card.id}
                    card={card}
                    columnColor={column.color}
                    onViewProfile={onViewProfile}
                  />
                ))}

                {/* Add Card Button */}
                <button className="w-full py-3.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:text-red-600 hover:border-red-300 hover:bg-red-50/30 transition-all duration-200 flex items-center justify-center gap-2 group">
                  <div className="transition-transform duration-200 group-hover:rotate-90">
                    <PlusIcon />
                  </div>
                  Add Candidate
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Candidate</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Program</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Mentor</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Progress</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-center px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredTraining.map((card) => {
                  const column = trainingColumns.find(c => c.id === card.columnId);
                  return (
                    <tr key={card.id} className="transition-all duration-200 hover:bg-gray-50/50 cursor-pointer group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm"
                            style={{ background: `linear-gradient(135deg, ${column?.color || '#2b7fff'}, ${(column?.color || '#2b7fff')}cc)` }}
                          >
                            {card.initials}
                          </div>
                          <span className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors">{card.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{card.position}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{card.program}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{card.mentor}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${card.progress}%`, backgroundColor: column?.color || '#2b7fff' }}
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-600">{card.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <TrainingStatusBadge status={card.progress === 100 ? "completed" : card.progress === 0 ? "not_started" : "in_progress"} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => onViewProfile && onViewProfile(card)}
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-600 transition-all duration-200"
                          title="View Details"
                        >
                          <EyeIcon />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-700">{filteredTraining.length}</span> candidates across all training stages
            </p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 transition-all duration-200 hover:shadow-md">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="text-sm font-semibold text-gray-700">Status Legend:</span>
          {trainingColumns.map((column) => (
            <div key={column.id} className="flex items-center gap-2 group cursor-pointer">
              <div
                className="w-4 h-4 rounded-full shadow-sm transition-transform duration-200 group-hover:scale-125"
                style={{ backgroundColor: column.color }}
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200">{column.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border border-amber-100 p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 10V16C6 16 9 19 12 19C15 19 18 16 18 16V10" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-1">Quick Tip</h4>
            <p className="text-sm text-gray-600">
              Click on the view icon <span className="inline-flex items-center mx-1"><EyeIcon /></span> on any training card to view candidate progress details, update training status, or assign mentors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Add/Edit Candidate Modal Component ───────────────────────────────────────────────
const AddCandidateModal = ({ isOpen, onClose, onAddCandidate, editCandidate, onUpdateCandidate }) => {
  const isEditMode = !!editCandidate;

  // Compute initial form data based on edit mode
  const initialData = useMemo(() => {
    if (editCandidate) {
      return {
        name: editCandidate.name || "",
        email: editCandidate.email || "",
        phone: editCandidate.phone || "",
        position: editCandidate.position || "",
        experience: editCandidate.experience || "",
        source: editCandidate.source || "LinkedIn",
        skillsMatch: editCandidate.skillsMatch || 50,
        appliedDate: editCandidate.appliedDate ? new Date(editCandidate.appliedDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        notes: editCandidate.notes || "",
        resume: null,
        expectedSalary: editCandidate.expectedSalary || "",
        noticePeriod: editCandidate.noticePeriod || "",
        currentCompany: editCandidate.currentCompany || "",
        location: editCandidate.location || "",
        skills: editCandidate.skills || "",
        education: editCandidate.education || "",
        linkedinUrl: editCandidate.linkedinUrl || "",
        stage: editCandidate.stage || "new",
      };
    }
    return {
      name: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      source: "LinkedIn",
      skillsMatch: 50,
      appliedDate: new Date().toISOString().split('T')[0],
      notes: "",
      resume: null,
      expectedSalary: "",
      noticePeriod: "",
      currentCompany: "",
      location: "",
      skills: "",
      education: "",
      linkedinUrl: "",
      stage: "new",
    };
  }, [editCandidate]);

  const [formData, setFormData] = useState(() => initialData);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available positions
  const positions = [
    "UI/UX Designer",
    "Software Developer",
    "Sales Executive",
    "Marketing Executive",
    "HR Executive",
    "Accountant",
    "Production Manager",
    "Quality Analyst",
    "Data Analyst",
    "Content Writer",
    "Operations Manager",
    "Customer Support",
  ];

  // Source options
  const sources = [
    "LinkedIn",
    "Referral",
    "Job Portal",
    "Company Website",
    "Walk-in",
    "Recruitment Agency",
    "Campus Drive",
    "Other",
  ];

  // Generate initials from name
  const generateInitials = (name) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.position) {
      newErrors.position = "Position is required";
    }
    if (!formData.experience.trim()) {
      newErrors.experience = "Experience is required";
    }
    if (!formData.appliedDate) {
      newErrors.appliedDate = "Applied date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const newCandidate = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      position: formData.position,
      experience: formData.experience,
      source: formData.source,
      skillsMatch: parseInt(formData.skillsMatch),
      appliedDate: new Date(formData.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      initials: generateInitials(formData.name),
      notes: formData.notes,
      expectedSalary: formData.expectedSalary,
      noticePeriod: formData.noticePeriod,
      currentCompany: formData.currentCompany,
      location: formData.location,
      skills: formData.skills,
      education: formData.education,
      linkedinUrl: formData.linkedinUrl,
      resume: formData.resume?.name || null,
    };

    if (isEditMode && onUpdateCandidate) {
      // Update existing candidate
      onUpdateCandidate({
        ...editCandidate,
        ...newCandidate,
        id: editCandidate.id, // Keep original ID
        stage: formData.stage || editCandidate.stage, // Keep the stage
      });
    } else {
      // Add new candidate
      onAddCandidate(newCandidate);
    }

    setIsSubmitting(false);
    onClose();
  };

  // Handle modal close
  const handleClose = () => {
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={handleClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white shadow-lg">
              {isEditMode ? <EditIcon /> : <UserPlusIcon />}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {isEditMode ? "Edit Candidate" : "Add New Candidate"}
              </h2>
              <p className="text-sm text-gray-500">
                {isEditMode ? "Update candidate information" : "Fill in the candidate details"}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information Section */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <UserIconFilled />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className={`w-full px-4 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200 ${
                    errors.name ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="candidate@email.com"
                  className={`w-full px-4 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200 ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={`w-full px-4 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200 ${
                    errors.phone ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, State"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200"
                />
              </div>

              {/* LinkedIn URL */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BriefcaseIcon />
              Professional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Position Applied For */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Position Applied For <span className="text-red-500">*</span>
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200 ${
                    errors.position ? 'border-red-500' : 'border-gray-200'
                  }`}
                >
                  <option value="">Select position</option>
                  {positions.map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
                {errors.position && <p className="text-xs text-red-500 mt-1">{errors.position}</p>}
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Total Experience <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g., 3 years"
                  className={`w-full px-4 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200 ${
                    errors.experience ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.experience && <p className="text-xs text-red-500 mt-1">{errors.experience}</p>}
              </div>

              {/* Current Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Current Company
                </label>
                <input
                  type="text"
                  name="currentCompany"
                  value={formData.currentCompany}
                  onChange={handleChange}
                  placeholder="Current employer name"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200"
                />
              </div>

              {/* Education */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Education
                </label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="e.g., B.Tech in Computer Science"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200"
                />
              </div>

              {/* Skills */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Skills
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g., JavaScript, React, Node.js, Python"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Application Details Section */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <DocumentIcon />
              Application Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Source */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Application Source
                </label>
                <select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200"
                >
                  {sources.map(src => (
                    <option key={src} value={src}>{src}</option>
                  ))}
                </select>
              </div>

              {/* Applied Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Applied Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="appliedDate"
                  value={formData.appliedDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200 ${
                    errors.appliedDate ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.appliedDate && <p className="text-xs text-red-500 mt-1">{errors.appliedDate}</p>}
              </div>

              {/* Skills Match */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Skills Match Score: {formData.skillsMatch}%
                </label>
                <input
                  type="range"
                  name="skillsMatch"
                  value={formData.skillsMatch}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Resume/CV
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="resume"
                    onChange={handleChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="w-full px-4 py-2.5 bg-white border border-dashed border-gray-300 rounded-xl text-sm text-gray-500 cursor-pointer hover:border-red-400 hover:bg-red-50/30 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 8L12 3L7 8M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {formData.resume ? formData.resume.name : "Upload Resume (PDF, DOC)"}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Compensation Details Section */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <OfferIcon />
              Compensation Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Expected Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Expected Salary
                </label>
                <input
                  type="text"
                  name="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={handleChange}
                  placeholder="e.g., ₹50,000/month"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200"
                />
              </div>

              {/* Notice Period */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Notice Period
                </label>
                <input
                  type="text"
                  name="noticePeriod"
                  value={formData.noticePeriod}
                  onChange={handleChange}
                  placeholder="e.g., 30 days"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FileTextIcon />
              Additional Notes
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Notes/Comments
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Add any notes about the candidate..."
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200 resize-none"
              />
            </div>
          </div>

          {/* Required Fields Note */}
          <p className="text-xs text-gray-500">
            <span className="text-red-500">*</span> Required fields
          </p>
        </form>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl text-sm font-medium hover:from-red-700 hover:to-red-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isEditMode ? "Updating..." : "Adding..."}
              </>
            ) : (
              <>
                {isEditMode ? <EditIcon /> : <PlusIcon />}
                {isEditMode ? "Update Candidate" : "Add Candidate"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Delete Confirmation Modal Component ─────────────────────────────────────────
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, candidate }) => {
  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <TrashIcon />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Delete Candidate</h2>
              <p className="text-sm text-gray-500">This action cannot be undone</p>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete <span className="font-semibold text-gray-900">{candidate.name}</span>?
            This will permanently remove the candidate from the system.
          </p>

          {/* Candidate Info */}
          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" }}
              >
                {candidate.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{candidate.name}</p>
                <p className="text-xs text-gray-500">{candidate.position}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(candidate);
              onClose();
            }}
            className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <TrashIcon />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── View Profile Modal Component ───────────────────────────────────────────────
const ViewProfileModal = ({ isOpen, onClose, candidate }) => {
  if (!isOpen || !candidate) return null;

  const stageColors = {
    "New": { bg: "#eff6ff", text: "#155dfc", border: "#bfdbfe" },
    "Screening": { bg: "#f3e8ff", text: "#7c3aed", border: "#e9d5ff" },
    "Interview": { bg: "#fff7ed", text: "#c2410c", border: "#fed7aa" },
    "Training": { bg: "#fef9c3", text: "#a16207", border: "#fde047" },
    "Offer": { bg: "#dcfce7", text: "#15803d", border: "#bbf7d0" },
    "Hired": { bg: "#ccfbf1", text: "#0f766e", border: "#99f6e4" },
  };

  const currentStageColor = stageColors[candidate.stage] || stageColors["New"];

  const timeline = [
    { title: "Application Received", date: candidate.appliedDate, completed: true },
    { title: "Resume Screening", date: "Completed", completed: true },
    { title: "Interview Scheduled", date: "Pending", completed: false },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg"
              style={{ background: "linear-gradient(135deg, #2b7fff 0%, #ad46ff 100%)" }}
            >
              {candidate.initials}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{candidate.name}</h2>
              <p className="text-sm text-gray-500">{candidate.position}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          {/* Personal Information */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 text-gray-600">
                <UserIconFilled />
              </div>
              <h3 className="text-base font-semibold text-gray-800">Personal Information</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-sm font-medium text-gray-800">{candidate.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Phone</p>
                <p className="text-sm font-medium text-gray-800">{candidate.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Experience</p>
                <p className="text-sm font-medium text-gray-800">{candidate.experience}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Source</p>
                <p className="text-sm font-medium text-gray-800">LinkedIn</p>
              </div>
            </div>
          </div>

          {/* Current Stage */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 text-gray-600">
                <TrendingUpIcon />
              </div>
              <h3 className="text-base font-semibold text-gray-800">Current Stage</h3>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{
                  backgroundColor: currentStageColor.bg,
                  color: currentStageColor.text,
                  border: `1px solid ${currentStageColor.border}`
                }}
              >
                {candidate.stage} Candidates
              </span>
              <p className="text-xs text-gray-500">Applied on {candidate.appliedDate}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 text-gray-600">
                <CursorClickIcon />
              </div>
              <h3 className="text-base font-semibold text-gray-800">Quick Actions</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="px-4 py-2.5 bg-[#fff7ed] border border-[#ff6900] text-[#ff6900] rounded-lg text-sm font-medium hover:bg-[#ffedd4] transition-colors duration-200">
                Schedule Interview
              </button>
              <button className="px-4 py-2.5 bg-[#dcfce7] border border-[#00a63e] text-[#00a63e] rounded-lg text-sm font-medium hover:bg-[#bbf7d0] transition-colors duration-200">
                Move to Next Stage
              </button>
              <button className="px-4 py-2.5 bg-[#fef9c3] border border-[#f0b100] text-[#f0b100] rounded-lg text-sm font-medium hover:bg-[#fef08a] transition-colors duration-200">
                Add Notes
              </button>
              <button className="px-4 py-2.5 bg-[#fee2e2] border border-[#ef4444] text-[#ef4444] rounded-lg text-sm font-medium hover:bg-[#fecaca] transition-colors duration-200">
                Reject Candidate
              </button>
            </div>
          </div>

          {/* Candidate Timeline */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 text-gray-600">
                <ClockReverseIcon />
              </div>
              <h3 className="text-base font-semibold text-gray-800">Candidate Timeline</h3>
            </div>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${item.completed ? 'bg-[#dbeafe]' : 'bg-gray-100'}`}>
                    {item.completed ? (
                      <CheckCircleIcon />
                    ) : (
                      <CalendarCheckIcon />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{item.title}</p>
                    <p className={`text-xs ${item.completed ? 'text-gray-500' : 'text-amber-600'}`}>{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
          >
            Close
          </button>
          <button className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors duration-200">
            View Full Profile
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const Recruitment = () => {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [activeTimeFilter, setActiveTimeFilter] = useState("thisMonth");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddCandidateModalOpen, setIsAddCandidateModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [scrollToSection, setScrollToSection] = useState(null);
  const [kanbanCardsData, setKanbanCardsData] = useState(kanbanCards);
  const kanbanScrollRef = useRef(null);

  const handleViewProfile = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
  };

  const handleOpenAddCandidate = () => {
    setIsAddCandidateModalOpen(true);
  };

  const handleCloseAddCandidate = () => {
    setIsAddCandidateModalOpen(false);
    setEditCandidateData(null);
  };

  const handleAddCandidate = (newCandidate) => {
    // Add the new candidate to the 'new' column in kanban
    setKanbanCardsData(prevCards => ({
      ...prevCards,
      new: [...prevCards.new, newCandidate]
    }));
  };

  // Edit candidate state
  const [editCandidateData, setEditCandidateData] = useState(null);

  const handleEditCandidate = (candidate) => {
    setEditCandidateData(candidate);
    setIsAddCandidateModalOpen(true);
  };

  const handleUpdateCandidate = (updatedCandidate) => {
    // Update candidate in kanban cards
    setKanbanCardsData(prevCards => {
      const newCards = { ...prevCards };
      // Find and update the candidate in the appropriate column
      for (const columnId in newCards) {
        const cardIndex = newCards[columnId].findIndex(card => card.id === updatedCandidate.id);
        if (cardIndex !== -1) {
          newCards[columnId] = [
            ...newCards[columnId].slice(0, cardIndex),
            updatedCandidate,
            ...newCards[columnId].slice(cardIndex + 1)
          ];
          break;
        }
      }
      return newCards;
    });
    setEditCandidateData(null);
  };

  // Delete candidate state
  const [deleteCandidateData, setDeleteCandidateData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteCandidate = (candidate) => {
    setDeleteCandidateData(candidate);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = (candidate) => {
    // Delete candidate from kanban cards
    setKanbanCardsData(prevCards => {
      const newCards = { ...prevCards };
      for (const columnId in newCards) {
        newCards[columnId] = newCards[columnId].filter(card => card.id !== candidate.id);
      }
      return newCards;
    });
    setIsDeleteModalOpen(false);
    setDeleteCandidateData(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteCandidateData(null);
  };

  // Scroll to specific kanban column
  const scrollToKanbanColumn = (columnId) => {
    if (kanbanScrollRef.current) {
      const columnIndex = kanbanColumns.findIndex(col => col.id === columnId);
      if (columnIndex !== -1) {
        const columnWidth = 340; // column width + gap
        kanbanScrollRef.current.scrollTo({
          left: columnIndex * columnWidth - 20,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleNavChange = (tabValue) => {
    setActiveNav(tabValue);

    // Scroll to specific kanban section based on tab
    if (tabValue === "interviews") {
      setScrollToSection("interview_scheduled");
      scrollToKanbanColumn("interview_scheduled");
    } else if (tabValue === "training") {
      setScrollToSection("training_assigned");
      scrollToKanbanColumn("training_assigned");
    } else if (tabValue === "kanban") {
      setScrollToSection(null);
      scrollToKanbanColumn("new");
    } else if (tabValue === "candidates") {
      setScrollToSection(null);
    } else {
      setScrollToSection(null);
    }
  };

  return (
    <div className="bg-gray-50 p-4 sm:p-6 font-sans min-h-screen">
      <div className="max-w-7xl mx-auto space-y-5">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">HRMS - Recruitment</h1>
            <p className="text-sm text-gray-500 mt-0.5">Manage recruitment pipeline and hiring process</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-3">
          {navTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleNavChange(tab.value)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeNav === tab.value
                  ? "bg-red-600 text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Render content based on active tab */}
        {activeNav === "candidates" && (
          <CandidatesListPage
            onViewProfile={handleViewProfile}
            onAddCandidate={handleOpenAddCandidate}
            onEditCandidate={handleEditCandidate}
            onDeleteCandidate={handleDeleteCandidate}
          />
        )}

        {/* Show Dashboard content */}
        {activeNav === "dashboard" && (
          <>
            {/* Time Filter Tabs - Only for Dashboard */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTimeFilter("thisMonth")}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTimeFilter === "thisMonth"
                    ? "bg-gray-100 border border-gray-300 text-gray-800"
                    : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                This Month
              </button>
              <div className="w-px h-6 bg-gray-300"></div>
              <button
                onClick={() => setActiveTimeFilter("lastMonth")}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTimeFilter === "lastMonth"
                    ? "bg-gray-100 border border-gray-300 text-gray-800"
                    : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                Last Month
              </button>
            </div>

            {/* Stats Cards Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {statsRow1.map((stat, i) => (
                <StatCard key={i} {...stat} />
              ))}
            </div>

            {/* Stats Cards Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {statsRow2.map((stat, i) => (
                <StatCard key={i} {...stat} />
              ))}
            </div>

            {/* Recruitment Pipeline Overview */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 transition-shadow duration-200 hover:shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                Recruitment Pipeline Overview
              </h2>
              <div className="flex items-center justify-center overflow-x-auto py-4">
                <div className="flex items-center gap-6">
                  {pipelineStages.map((stage, i) => (
                    <PipelineStage
                      key={i}
                      {...stage}
                      isLast={i === pipelineStages.length - 1}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Two Column Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Recent Candidates */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-shadow duration-200 hover:shadow-md">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800">Recent Candidates</h3>
                </div>
                <div className="p-5">
                  {recentCandidates.map((candidate, i) => (
                    <CandidateItem key={i} {...candidate} />
                  ))}
                </div>
              </div>

              {/* Upcoming Interviews */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-shadow duration-200 hover:shadow-md">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800">Upcoming Interviews</h3>
                </div>
                <div className="p-5">
                  {upcomingInterviews.map((interview, i) => (
                    <InterviewItem key={i} {...interview} />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Unified Kanban View - visible for Kanban, Interviews, and Training tabs */}
        {(activeNav === "kanban" || activeNav === "interviews" || activeNav === "training") && (
          <KanbanPipelinePage
            onViewProfile={handleViewProfile}
            scrollToSection={scrollToSection}
            scrollContainerRef={kanbanScrollRef}
            activeTab={activeNav}
            onAddCandidate={handleOpenAddCandidate}
            cards={kanbanCardsData}
            onEditCandidate={handleEditCandidate}
            onDeleteCandidate={handleDeleteCandidate}
          />
        )}
      </div>

      {/* Floating AI Assistant Button */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 active:scale-95 z-50 hover:scale-110"
        style={{ background: "linear-gradient(180deg, #f60000 0%, #900000 100%)" }}
      >
        <SparkleIcon />
      </button>

      {/* Add Candidate Modal */}
      <AddCandidateModal
        key={editCandidateData ? `edit-${editCandidateData.id}` : 'add'}
        isOpen={isAddCandidateModalOpen}
        onClose={handleCloseAddCandidate}
        onAddCandidate={handleAddCandidate}
        editCandidate={editCandidateData}
        onUpdateCandidate={handleUpdateCandidate}
      />

      {/* View Profile Modal */}
      <ViewProfileModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        candidate={selectedCandidate}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        candidate={deleteCandidateData}
      />
    </div>
  );
};

export default Recruitment;
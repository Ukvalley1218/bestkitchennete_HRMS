import React from 'react';
import { StatCard, ActivityItem } from '../components';
import { Folder, Clock, Files, CheckCircle } from '@phosphor-icons/react';

const Dashboard = () => {
  // KPI Data
  const kpiData = [
    {
      icon: <Folder size={28} weight="bold" />,
      number: "24",
      title: "Total Projects",
      iconBgColor: "bg-red-100",
      iconTextColor: "text-red-600",
    },
    {
      icon: <Clock size={28} weight="bold" />,
      number: "8",
      title: "Pending Reviews",
      iconBgColor: "bg-yellow-100",
      iconTextColor: "text-yellow-600",
    },
    {
      icon: <Files size={28} weight="bold" />,
      number: "12",
      title: "Completed Designs",
      iconBgColor: "bg-green-100",
      iconTextColor: "text-green-600",
    },
    {
      icon: <CheckCircle size={28} weight="bold" />,
      number: "95%",
      title: "Client Satisfaction",
      iconBgColor: "bg-blue-100",
      iconTextColor: "text-blue-600",
    },
  ];

  // Activity Data
  const activityData = [
    {
      projectName: "Modern Living Room",
      employeeName: "Sarah Johnson",
      activity: "submitted design proposal",
      time: "2 hours ago",
      dotColor: "blue",
    },
    {
      projectName: "Office Renovation",
      employeeName: "Michael Chen",
      activity: "updated project timeline",
      time: "4 hours ago",
      dotColor: "green",
    },
    {
      projectName: "Kitchen Remodel",
      employeeName: "Emily Davis",
      activity: "received client approval",
      time: "5 hours ago",
      dotColor: "purple",
    },
    {
      projectName: "Bedroom Suite Design",
      employeeName: "James Wilson",
      activity: "completed final review",
      time: "6 hours ago",
      dotColor: "yellow",
    },
    {
      projectName: "Restaurant Interior",
      employeeName: "Lisa Anderson",
      activity: "uploaded new materials",
      time: "8 hours ago",
      dotColor: "orange",
    },
    {
      projectName: "Bathroom Redesign",
      employeeName: "David Brown",
      activity: "started design draft",
      time: "10 hours ago",
      dotColor: "red",
    },
  ];

  return (
    <div className="font-[Lato] bg-gray-50 min-h-screen p-6">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Interior Designer Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here's an overview of your projects.</p>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpiData.map((kpi, index) => (
          <StatCard
            key={index}
            icon={kpi.icon}
            number={kpi.number}
            title={kpi.title}
            iconBgColor={kpi.iconBgColor}
            iconTextColor={kpi.iconTextColor}
          />
        ))}
      </div>

      {/* Recent Project Activity Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Recent Project Activity</h2>
        <div className="divide-y divide-gray-100">
          {activityData.map((activity, index) => (
            <ActivityItem
              key={index}
              projectName={activity.projectName}
              employeeName={activity.employeeName}
              activity={activity.activity}
              time={activity.time}
              dotColor={activity.dotColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
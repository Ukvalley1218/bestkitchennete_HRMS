import { Megaphone, Users, TrendingUp, DollarSign } from "lucide-react";
import {
  StatCard,
  LeadGenerationChart,
  CampaignROIChart,
  RecentActivity,
} from "../components";

const MarketingDashboard = () => {
  const stats = [
    {
      id: 1,
      label: "Active Campaigns",
      value: "12",
      icon: Megaphone,
      trend: "+5",
      sub: "vs last month",
    },
    {
      id: 2,
      label: "Total Leads",
      value: "2,845",
      icon: Users,
      trend: "+12",
      sub: "vs last month",
    },
    {
      id: 3,
      label: "Conversion Rate",
      value: "25.5%",
      icon: TrendingUp,
      trend: "+8",
      sub: "vs last month",
    },
    {
      id: 4,
      label: "Marketing ROI",
      value: "385%",
      icon: DollarSign,
      trend: "+15",
      sub: "vs last month",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1F2937]">Marketing Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Overview of your marketing campaigns and performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            sub={stat.sub}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeadGenerationChart />
        <CampaignROIChart />
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
};

export default MarketingDashboard;
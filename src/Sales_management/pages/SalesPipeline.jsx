import { useState } from "react";
import { MoreVertical, Plus, User, DollarSign, Calendar } from "lucide-react";

const SalesPipeline = () => {
  const [deals, setDeals] = useState([
    {
      id: 1,
      title: "Enterprise Software Deal",
      company: "Tech Corp",
      value: "$45,000",
      probability: "90%",
      stage: "Closed Won",
      contact: "John Smith",
      expectedClose: "Mar 15, 2026",
    },
    {
      id: 2,
      title: "Cloud Migration Project",
      company: "Digital Solutions",
      value: "$32,000",
      probability: "75%",
      stage: "Negotiation",
      contact: "Sarah Wilson",
      expectedClose: "Mar 20, 2026",
    },
    {
      id: 3,
      title: "Annual License Renewal",
      company: "Innovate Inc",
      value: "$28,000",
      probability: "60%",
      stage: "Proposal Sent",
      contact: "Michael Brown",
      expectedClose: "Mar 25, 2026",
    },
    {
      id: 4,
      title: "Custom Development",
      company: "StartUp Hub",
      value: "$55,000",
      probability: "40%",
      stage: "Discovery",
      contact: "Emily Davis",
      expectedClose: "Apr 10, 2026",
    },
    {
      id: 5,
      title: "Security Audit Service",
      company: "Global Tech",
      value: "$18,000",
      probability: "25%",
      stage: "Initial Contact",
      contact: "Robert Chen",
      expectedClose: "Apr 20, 2026",
    },
    {
      id: 6,
      title: "Mobile App Development",
      company: "Creative Labs",
      value: "$72,000",
      probability: "80%",
      stage: "Negotiation",
      contact: "Lisa Anderson",
      expectedClose: "Mar 30, 2026",
    },
  ]);

  const stages = [
    { id: "initial", name: "Initial Contact", color: "bg-gray-100", deals: deals.filter(d => d.stage === "Initial Contact") },
    { id: "discovery", name: "Discovery", color: "bg-red-50", deals: deals.filter(d => d.stage === "Discovery") },
    { id: "proposal", name: "Proposal Sent", color: "bg-yellow-100", deals: deals.filter(d => d.stage === "Proposal Sent") },
    { id: "negotiation", name: "Negotiation", color: "bg-orange-100", deals: deals.filter(d => d.stage === "Negotiation") },
    { id: "closed", name: "Closed Won", color: "bg-green-100", deals: deals.filter(d => d.stage === "Closed Won") },
  ];

  const getProbabilityColor = (probability) => {
    const prob = parseInt(probability);
    if (prob >= 80) return "text-green-600 bg-green-50";
    if (prob >= 50) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Sales Pipeline</h1>
          <p className="text-gray-500 text-sm mt-1">Track and manage your deals across stages</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#FF1E1E] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors shadow-sm">
          <Plus size={18} />
          Add Deal
        </button>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Pipeline Value</p>
          <p className="text-2xl font-bold text-[#1F2937]">$250,000</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Active Deals</p>
          <p className="text-2xl font-bold text-[#1F2937]">{deals.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Win Rate</p>
          <p className="text-2xl font-bold text-green-600">67%</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Avg Deal Size</p>
          <p className="text-2xl font-bold text-[#1F2937]">$41,667</p>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {stages.map((stage) => (
            <div key={stage.id} className="w-80">
              {/* Stage Header */}
              <div className={`rounded-t-xl px-4 py-3 ${stage.color}`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#1F2937]">{stage.name}</h3>
                  <span className="bg-white px-2 py-0.5 rounded-full text-xs font-medium text-gray-600">
                    {stage.deals.length}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  ${stage.deals.reduce((sum, d) => parseInt(d.value.replace(/[$,]/g, '')), 0).toLocaleString()}
                </p>
              </div>

              {/* Deal Cards */}
              <div className="bg-gray-50 rounded-b-xl p-3 space-y-3 min-h-[200px]">
                {stage.deals.map((deal) => (
                  <div key={deal.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-[#1F2937] text-sm">{deal.title}</h4>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{deal.company}</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold text-[#1F2937]">{deal.value}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getProbabilityColor(deal.probability)}`}>
                        {deal.probability}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <User size={12} />
                      <span>{deal.contact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar size={12} />
                      <span>{deal.expectedClose}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesPipeline;
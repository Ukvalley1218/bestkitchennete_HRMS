import { useState } from 'react';
import { CheckCircle, Clock, AlertTriangle, ChevronDown, ChevronUp, Eye, X, User, MapPin, Calendar, Clock as ClockIcon } from 'lucide-react';
import { checklistItems } from '../data/salesData';

export default function ChecklistManagerView({ records }) {
  const [expandedRecord, setExpandedRecord] = useState(null);
  const [selectedChecklist, setSelectedChecklist] = useState(null);

  // Generate mock checked items for each record (in real app, this would come from backend)
  const getMockCheckedItems = (record) => {
    // Create a deterministic set of checked items based on record ID and completion
    const checkedCount = record.completedItems;
    const checkedItems = {};
    const seed = record.id;

    checklistItems.forEach((item, index) => {
      // Simple deterministic pattern based on record id and index
      const is_checked = index < checkedCount;
      if (is_checked) {
        checkedItems[item.id] = true;
      }
    });

    return checkedItems;
  };

  // Generate mock remarks for some items
  const getMockRemarks = (record) => {
    const remarks = {};
    const seed = record.id;

    // Add some sample remarks
    const sampleRemarks = [
      "Verified and ready",
      "Need to restock",
      "Packed in the bag",
      "Battery fully charged",
      "Documents printed",
      "Sample kit prepared",
    ];

    checklistItems.slice(0, Math.min(5, record.completedItems)).forEach((item, index) => {
      if (index % 3 === 0) {
        remarks[item.id] = sampleRemarks[index % sampleRemarks.length];
      }
    });

    return remarks;
  };

  const getStatusIcon = (status, percentage) => {
    if (status === 'ready' || percentage >= 100) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    if (percentage >= 80) {
      return <Clock className="w-5 h-5 text-yellow-500" />;
    }
    return <AlertTriangle className="w-5 h-5 text-red-500" />;
  };

  const getStatusBg = (status, percentage) => {
    if (status === 'ready' || percentage >= 100) return 'bg-green-50 border-green-200';
    if (percentage >= 80) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusText = (status, percentage) => {
    if (status === 'ready' || percentage >= 100) return 'Ready';
    if (percentage >= 80) return 'Almost Ready';
    return 'Pending';
  };

  // Category icons
  const categoryIcons = {
    'Documentation': '📄',
    'Transport': '🛵',
    'Personal': '👔',
    'Materials': '📦',
    'Stationary': '✏️',
    'Electronics': '📱',
    'Samples': '🎨',
  };

  // Group items by category
  const groupedItems = checklistItems.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  // View checklist details
  const handleViewChecklist = (record) => {
    setSelectedChecklist({
      ...record,
      checkedItems: getMockCheckedItems(record),
      remarks: getMockRemarks(record),
    });
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-[#1F2937]">Sales Visit Readiness</h3>
          <p className="text-sm text-gray-500 mt-1">Team preparation status for upcoming visits - Click to expand</p>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {records.map((record) => {
              const percentage = Math.round((record.completedItems / record.totalItems) * 100);
              const isExpanded = expandedRecord === record.id;

              return (
                <div key={record.id} className={`rounded-xl border overflow-hidden ${getStatusBg(record.status, percentage)}`}>
                  {/* Card Header - Always Visible */}
                  <div
                    className="p-4 cursor-pointer hover:bg-white/50 transition-colors"
                    onClick={() => setExpandedRecord(isExpanded ? null : record.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${record.salespersonName}`}
                          alt={record.salespersonName}
                          className="w-12 h-12 rounded-full bg-white shadow-sm"
                        />
                        <div>
                          <h4 className="font-semibold text-[#1F2937]">{record.salespersonName}</h4>
                          <p className="text-xs text-gray-600">Visit: {record.leadName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(record.status, percentage)}
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {record.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {record.visitDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          {record.visitTime}
                        </span>
                      </div>

                      <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${getProgressColor(percentage)}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[#1F2937]">
                          {record.completedItems}/{record.totalItems} items
                        </span>
                        <span className={`text-sm font-semibold ${
                          percentage >= 100 ? 'text-green-600' : percentage >= 80 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {percentage}% {getStatusText(record.status, percentage)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 bg-white p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium text-[#1F2937]">Checklist Details</h5>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewChecklist(record);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#FF1E1E] text-white text-xs rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          View Full Checklist
                        </button>
                      </div>

                      {/* Quick Category Summary */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {Object.entries(groupedItems).map(([category, items]) => {
                          const checkedCount = items.filter(item => getMockCheckedItems(record)[item.id]).length;
                          const categoryPercentage = Math.round((checkedCount / items.length) * 100);

                          return (
                            <div key={category} className="bg-gray-50 rounded-lg p-2">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm">{categoryIcons[category] || '📁'}</span>
                                <span className="text-xs font-medium text-gray-700">{category}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${categoryPercentage >= 100 ? 'bg-green-500' : categoryPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                    style={{ width: `${categoryPercentage}%` }}
                                  />
                                </div>
                                <span className="text-xs text-gray-600">{checkedCount}/{items.length}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Missing Items Alert */}
                      {percentage < 100 && (
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-yellow-800">Items Pending</p>
                              <p className="text-xs text-yellow-700">{record.totalItems - record.completedItems} items need to be completed before the visit</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Ready Badge */}
                      {percentage >= 100 && (
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <div>
                              <p className="text-sm font-medium text-green-800">All Set!</p>
                              <p className="text-xs text-green-700">Salesperson is fully prepared for the client visit</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {records.length === 0 && (
            <div className="text-center py-12">
              <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900">No Upcoming Visits</h4>
              <p className="text-gray-500 text-sm mt-1">No scheduled visits to display</p>
            </div>
          )}
        </div>
      </div>

      {/* Full Checklist Modal */}
      {selectedChecklist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedChecklist(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#1F2937]">Checklist Details</h2>
                <p className="text-sm text-gray-500">{selectedChecklist.salespersonName} - {selectedChecklist.leadName}</p>
              </div>
              <button onClick={() => setSelectedChecklist(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Visit Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-medium text-[#1F2937]">{selectedChecklist.location}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Visit Date</p>
                  <p className="text-sm font-medium text-[#1F2937]">{selectedChecklist.visitDate}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Visit Time</p>
                  <p className="text-sm font-medium text-[#1F2937]">{selectedChecklist.visitTime}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Completion</p>
                  <p className="text-sm font-bold text-green-600">{selectedChecklist.completedItems}/{selectedChecklist.totalItems}</p>
                </div>
              </div>

              {/* Checklist Items by Category */}
              {Object.entries(groupedItems).map(([category, items]) => {
                const categoryChecked = items.filter(item => selectedChecklist.checkedItems[item.id]).length;
                const categoryTotal = items.length;
                const categoryPercentage = Math.round((categoryChecked / categoryTotal) * 100);

                return (
                  <div key={category} className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{categoryIcons[category] || '📁'}</span>
                        <h4 className="font-medium text-[#1F2937]">{category}</h4>
                      </div>
                      <span className={`text-sm font-medium ${
                        categoryPercentage >= 100 ? 'text-green-600' : categoryPercentage >= 50 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {categoryChecked}/{categoryTotal}
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">#</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Item</th>
                            <th className="px-3 py-2 text-center text-xs font-medium text-gray-500">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {items.map((item, index) => {
                            const isChecked = selectedChecklist.checkedItems[item.id];
                            const hasRemark = selectedChecklist.remarks[item.id];

                            return (
                              <tr key={item.id} className={isChecked ? 'bg-green-50/50' : ''}>
                                <td className="px-3 py-2 text-xs text-gray-400">{String(index + 1).padStart(2, '0')}</td>
                                <td className="px-3 py-2 text-sm text-[#1F2937]">{item.name}</td>
                                <td className="px-3 py-2 text-center">
                                  {isChecked ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                      <CheckCircle className="w-3 h-3" />
                                      Done
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                                      <X className="w-3 h-3" />
                                      Pending
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
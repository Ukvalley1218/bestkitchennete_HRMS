import { useState, useMemo } from 'react';
import {
  User,
  Calendar,
  MapPin,
  Clock,
  Building2,
  Save,
  Send,
  CheckCircle2,
  ChevronDown,
  Search,
  Filter,
  LayoutGrid,
  List,
  Check,
  X,
  MessageSquare,
} from 'lucide-react';
import { checklistItems, salesTeam, leads, checklistRecords } from '../data/salesData';
import ChecklistProgress from '../components/ChecklistProgress';
import ChecklistTable from '../components/ChecklistTable';
import ChecklistManagerView from '../components/ChecklistManagerView';

export default function PrePlanningChecklist() {
  // Form state
  const [selectedSalesperson, setSelectedSalesperson] = useState('');
  const [selectedLead, setSelectedLead] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('');

  // Checklist state
  const [checkedItems, setCheckedItems] = useState({});
  const [remarks, setRemarks] = useState({});

  // View state
  const [activeView, setActiveView] = useState('checklist'); // 'checklist' | 'manager'
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('category'); // 'all' | 'category'
  const [openRemarkId, setOpenRemarkId] = useState(null);

  // Calculate completion
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = checklistItems.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  // Filter available leads based on selected salesperson
  const availableLeads = useMemo(() => {
    if (!selectedSalesperson) return leads;
    return leads.filter((lead) => lead.assignedTo === parseInt(selectedSalesperson));
  }, [selectedSalesperson]);

  // Get selected lead details
  const selectedLeadDetails = useMemo(() => {
    if (!selectedLead) return null;
    return leads.find((lead) => lead.id === parseInt(selectedLead));
  }, [selectedLead]);

  // Get selected salesperson details
  const selectedSalespersonDetails = useMemo(() => {
    if (!selectedSalesperson) return null;
    return salesTeam.find((person) => person.id === parseInt(selectedSalesperson));
  }, [selectedSalesperson]);

  // Get category-wise completion stats
  const categoryStats = useMemo(() => {
    const stats = {};
    checklistItems.forEach(item => {
      const category = item.category || 'Other';
      if (!stats[category]) {
        stats[category] = { completed: 0, total: 0 };
      }
      stats[category].total++;
      if (checkedItems[item.id]) {
        stats[category].completed++;
      }
    });
    return stats;
  }, [checkedItems]);

  // Handlers
  const handleToggleItem = (itemId) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleSelectAll = () => {
    const allChecked = checklistItems.every(item => checkedItems[item.id]);
    const newCheckedItems = {};
    checklistItems.forEach(item => {
      newCheckedItems[item.id] = !allChecked;
    });
    setCheckedItems(newCheckedItems);
  };

  const handleSelectCategory = (category) => {
    const categoryItems = checklistItems.filter(item => item.category === category);
    const allCategoryChecked = categoryItems.every(item => checkedItems[item.id]);
    setCheckedItems((prev) => {
      const newChecked = { ...prev };
      categoryItems.forEach(item => {
        newChecked[item.id] = !allCategoryChecked;
      });
      return newChecked;
    });
  };

  const handleRemarkChange = (itemId, value) => {
    setRemarks((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };

  const handleSaveProgress = () => {
    const data = {
      salesperson: selectedSalespersonDetails,
      lead: selectedLeadDetails,
      visitDate,
      visitTime,
      checkedItems,
      remarks,
      completedCount,
      totalCount,
    };
    console.log('Saving progress:', data);
    alert('Progress saved successfully!');
  };

  const handleSubmitChecklist = () => {
    if (!selectedSalesperson || !selectedLead || !visitDate || !visitTime) {
      alert('Please fill in all required fields before submitting.');
      return;
    }
    console.log('Submitting checklist:', {
      salesperson: selectedSalespersonDetails,
      lead: selectedLeadDetails,
      visitDate,
      visitTime,
      checkedItems,
      remarks,
    });
    alert('Checklist submitted successfully!');
  };

  const handleMarkVisitReady = () => {
    if (completionPercentage < 100) {
      alert('Please complete all checklist items before marking as visit ready.');
      return;
    }
    console.log('Marking visit ready:', {
      salesperson: selectedSalespersonDetails,
      lead: selectedLeadDetails,
      visitDate,
      visitTime,
    });
    alert('Visit marked as ready! CRM Lead Status updated to "Ready for Visit"');
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

  return (
    <div className="pt-8 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1F2937]">Sales Pre-Visit Preparation Checklist</h1>
        <p className="text-gray-500 mt-1">
          Ensure all required materials and preparations are completed before visiting the client.
        </p>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveView('checklist')}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeView === 'checklist'
              ? 'text-red-600 border-b-2 border-red-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          My Checklist
        </button>
        <button
          onClick={() => setActiveView('manager')}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeView === 'manager'
              ? 'text-red-600 border-b-2 border-red-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Manager View
        </button>
      </div>

      {activeView === 'checklist' ? (
        <>
          {/* Filter Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 w-full"
            >
              <Filter className="w-4 h-4" />
              Filter Details
              <ChevronDown
                className={`w-4 h-4 ml-auto transition-transform ${showFilters ? 'rotate-180' : ''}`}
              />
            </button>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4 pt-4 border-t border-gray-100">
                {/* Salesperson */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salesperson Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      value={selectedSalesperson}
                      onChange={(e) => {
                        setSelectedSalesperson(e.target.value);
                        setSelectedLead('');
                      }}
                      className="w-full pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm appearance-none"
                    >
                      <option value="">Select Salesperson</option>
                      {salesTeam.map((person) => (
                        <option key={person.id} value={person.id}>
                          {person.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Lead / Client */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lead / Client Name
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      value={selectedLead}
                      onChange={(e) => setSelectedLead(e.target.value)}
                      className="w-full pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm appearance-none"
                    >
                      <option value="">Select Lead</option>
                      {availableLeads.map((lead) => (
                        <option key={lead.id} value={lead.id}>
                          {lead.name} - {lead.company}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Location (Auto-filled) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lead Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={selectedLeadDetails?.address || ''}
                      readOnly
                      placeholder="Auto-filled"
                      className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-600"
                    />
                  </div>
                </div>

                {/* Visit Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visit Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                  </div>
                </div>

                {/* Visit Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visit Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="time"
                      value={visitTime}
                      onChange={(e) => setVisitTime(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Selected Info Summary */}
          {(selectedSalesperson || selectedLead) && (
            <div className="bg-red-50 rounded-xl border border-red-200 p-4">
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {selectedSalespersonDetails && (
                  <div className="flex items-center gap-2">
                    <img
                      src={selectedSalespersonDetails.avatar}
                      alt={selectedSalespersonDetails.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <span className="font-medium text-[#1F2937]">{selectedSalespersonDetails.name}</span>
                      <span className="text-gray-500 ml-1">({selectedSalespersonDetails.role})</span>
                    </div>
                  </div>
                )}
                {selectedLeadDetails && (
                  <>
                    <span className="text-gray-400">→</span>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-[#1F2937]">{selectedLeadDetails.name}</span>
                      <span className="text-gray-500">@ {selectedLeadDetails.company}</span>
                    </div>
                    <span className="text-gray-400">|</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{selectedLeadDetails.address}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Progress Section */}
          <ChecklistProgress completed={completedCount} total={totalCount} />

          {/* Category-wise Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-semibold text-[#1F2937] mb-3">Category-wise Progress</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {Object.entries(categoryStats).map(([category, stats]) => {
                const percentage = Math.round((stats.completed / stats.total) * 100);
                const icon = categoryIcons[category] || '📁';
                return (
                  <div key={category} className="bg-gray-50 rounded-lg p-3 text-center">
                    <span className="text-2xl">{icon}</span>
                    <p className="text-xs font-medium text-gray-700 mt-1 truncate">{category}</p>
                    <p className={`text-sm font-bold ${percentage === 100 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {stats.completed}/{stats.total}
                    </p>
                    <div className="w-full h-1 bg-gray-200 rounded-full mt-1 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${percentage === 100 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Checklist Table by Category */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="font-semibold text-[#1F2937]">Preparation Checklist</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Check off each item as you prepare for your client visit
                </p>
              </div>
              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('all')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'all'
                      ? 'bg-white text-red-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <List className="w-4 h-4" />
                  All
                </button>
                <button
                  onClick={() => setViewMode('category')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'category'
                      ? 'bg-white text-red-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  By Category
                </button>
              </div>
            </div>
            <div className="p-4">
              {viewMode === 'all' ? (
                /* All Items View */
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-12">#</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-32">Category</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Item</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">
                          <div className="flex flex-col items-center gap-1">
                            <button
                              onClick={handleSelectAll}
                              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                                checklistItems.every(item => checkedItems[item.id])
                                  ? 'bg-green-500 text-white shadow-md shadow-green-500/30'
                                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
                              }`}
                              title={checklistItems.every(item => checkedItems[item.id]) ? 'Deselect All' : 'Select All'}
                            >
                              {checklistItems.every(item => checkedItems[item.id]) ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <X className="w-4 h-4" />
                              )}
                            </button>
                            <span className="text-[10px] text-gray-400">
                              {checklistItems.every(item => checkedItems[item.id]) ? 'Clear' : 'All'}
                            </span>
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-40">Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {checklistItems.map((item, index) => {
                        const isChecked = checkedItems[item.id] || false;
                        const hasRemark = remarks[item.id] && remarks[item.id].trim() !== '';
                        const icon = categoryIcons[item.category] || '📁';

                        return (
                          <tr
                            key={item.id}
                            className={`hover:bg-gray-50 transition-colors ${isChecked ? 'bg-green-50/30' : ''}`}
                          >
                            <td className="px-4 py-3 text-sm text-gray-400 font-medium">
                              {String(index + 1).padStart(2, '0')}
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                                <span>{icon}</span>
                                <span>{item.category}</span>
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`text-sm ${isChecked ? 'text-gray-900 line-through' : 'text-gray-700'}`}>
                                {item.name}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex justify-center">
                                <button
                                  onClick={() => handleToggleItem(item.id)}
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                                    isChecked
                                      ? 'bg-green-500 text-white shadow-md shadow-green-500/30'
                                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
                                  }`}
                                >
                                  {isChecked ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                                </button>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="relative">
                                <button
                                  onClick={() => setOpenRemarkId(openRemarkId === item.id ? null : item.id)}
                                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                                    hasRemark
                                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                  }`}
                                >
                                  <MessageSquare className="w-3 h-3" />
                                  {hasRemark ? 'Edit' : 'Add'}
                                </button>

                                {openRemarkId === item.id && (
                                  <div className="absolute z-10 top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
                                    <textarea
                                      value={remarks[item.id] || ''}
                                      onChange={(e) => handleRemarkChange(item.id, e.target.value)}
                                      placeholder="Add remarks..."
                                      className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                                      rows={2}
                                      autoFocus
                                    />
                                    <div className="flex justify-end mt-1 gap-1">
                                      <button
                                        onClick={() => {
                                          handleRemarkChange(item.id, '');
                                          setOpenRemarkId(null);
                                        }}
                                        className="px-2 py-1 text-xs text-gray-600 hover:text-gray-800"
                                      >
                                        Clear
                                      </button>
                                      <button
                                        onClick={() => setOpenRemarkId(null)}
                                        className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                                      >
                                        Done
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* Category View */
                <ChecklistTable
                  items={checklistItems}
                  checkedItems={checkedItems}
                  remarks={remarks}
                  onToggle={handleToggleItem}
                  onRemarkChange={handleRemarkChange}
                  onSelectCategory={handleSelectCategory}
                />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleSaveProgress}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
            >
              <Save className="w-4 h-4" />
              Save Progress
            </button>

            <button
              onClick={handleSubmitChecklist}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium text-sm"
            >
              <Send className="w-4 h-4" />
              Submit Checklist
            </button>

            <button
              onClick={handleMarkVisitReady}
              disabled={completionPercentage < 100}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
                completionPercentage === 100
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              Mark Visit Ready
            </button>
          </div>
        </>
      ) : (
        /* Manager View */
        <ChecklistManagerView records={checklistRecords} />
      )}
    </div>
  );
}
import { useState } from 'react';
import { Check, X, MessageSquare, ChevronDown, ChevronRight, FolderOpen } from 'lucide-react';

// Category icons and colors
const categoryConfig = {
  'Documentation': { icon: '📄', color: 'bg-blue-50 border-blue-200', headerColor: 'bg-blue-100' },
  'Transport': { icon: '🛵', color: 'bg-orange-50 border-orange-200', headerColor: 'bg-orange-100' },
  'Personal': { icon: '👔', color: 'bg-purple-50 border-purple-200', headerColor: 'bg-purple-100' },
  'Materials': { icon: '📦', color: 'bg-green-50 border-green-200', headerColor: 'bg-green-100' },
  'Stationary': { icon: '✏️', color: 'bg-yellow-50 border-yellow-200', headerColor: 'bg-yellow-100' },
  'Electronics': { icon: '📱', color: 'bg-red-50 border-red-200', headerColor: 'bg-red-100' },
  'Samples': { icon: '🎨', color: 'bg-pink-50 border-pink-200', headerColor: 'bg-pink-100' },
};

export default function ChecklistTable({ items, checkedItems, remarks, onToggle, onRemarkChange, onSelectCategory }) {
  const [openRemarkId, setOpenRemarkId] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState(
    // All categories expanded by default
    [...new Set(items.map(item => item.category))]
  );

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  // Sort categories alphabetically
  const sortedCategories = Object.keys(groupedItems).sort();

  const toggleCategory = (category) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const getCategoryCompletion = (categoryItems) => {
    const completed = categoryItems.filter(item => checkedItems[item.id]).length;
    const total = categoryItems.length;
    const percentage = Math.round((completed / total) * 100);
    return { completed, total, percentage };
  };

  const getProgressColor = (percentage) => {
    if (percentage === 100) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-4">
      {sortedCategories.map((category) => {
        const categoryItems = groupedItems[category];
        const config = categoryConfig[category] || { icon: '📁', color: 'bg-gray-50 border-gray-200', headerColor: 'bg-gray-100' };
        const { completed, total, percentage } = getCategoryCompletion(categoryItems);
        const isExpanded = expandedCategories.includes(category);

        return (
          <div
            key={category}
            className={`rounded-xl border overflow-hidden ${config.color}`}
          >
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category)}
              className="w-full flex items-center justify-between p-4 hover:bg-opacity-80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{config.icon}</span>
                <div className="text-left">
                  <h4 className="font-semibold text-[#1F2937]">{category}</h4>
                  <p className="text-sm text-gray-500">
                    {completed}/{total} items completed
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Completion Progress */}
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-white rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${getProgressColor(percentage)}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className={`text-sm font-semibold ${
                    percentage === 100 ? 'text-green-600' :
                    percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {percentage}%
                  </span>
                </div>
                {/* Select All for Category */}
                {onSelectCategory && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCategory(category);
                    }}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      completed === total && total > 0
                        ? 'bg-green-500 text-white shadow-md shadow-green-500/30'
                        : 'bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-600 border border-gray-200'
                    }`}
                    title={completed === total ? 'Deselect All' : 'Select All'}
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </button>

            {/* Category Items */}
            {isExpanded && (
              <div className="border-t border-gray-200 bg-white">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-12">
                        #
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Item
                      </th>
                      <th className="px-4 py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">
                        Status
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-40">
                        Remarks
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {categoryItems.map((item, index) => {
                      const isChecked = checkedItems[item.id] || false;
                      const hasRemark = remarks[item.id] && remarks[item.id].trim() !== '';

                      return (
                        <tr
                          key={item.id}
                          className={`hover:bg-gray-50 transition-colors ${isChecked ? 'bg-green-50/30' : ''}`}
                        >
                          <td className="px-4 py-3 text-sm text-gray-400 font-medium">
                            {String(index + 1).padStart(2, '0')}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm ${isChecked ? 'text-gray-900 line-through' : 'text-gray-700'}`}>
                                {item.name}
                              </span>
                              {isChecked && (
                                <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded">
                                  ✓ Done
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex justify-center">
                              <button
                                onClick={() => onToggle(item.id)}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                                  isChecked
                                    ? 'bg-green-500 text-white shadow-md shadow-green-500/30'
                                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
                                }`}
                              >
                                {isChecked ? (
                                  <Check className="w-4 h-4" />
                                ) : (
                                  <X className="w-4 h-4" />
                                )}
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
                                    onChange={(e) => onRemarkChange(item.id, e.target.value)}
                                    placeholder="Add remarks..."
                                    className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                                    rows={2}
                                    autoFocus
                                  />
                                  <div className="flex justify-end mt-1 gap-1">
                                    <button
                                      onClick={() => {
                                        onRemarkChange(item.id, '');
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
            )}
          </div>
        );
      })}
    </div>
  );
}
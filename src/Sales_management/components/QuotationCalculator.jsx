import { useState } from "react";
import { X, Calculator } from "lucide-react";

const QuotationCalculator = ({ isOpen, onClose, onCalculate }) => {
  const [formData, setFormData] = useState({
    clientName: "",
    projectType: "",
    area: "",
    pricePerSqFt: "",
    materialCost: "",
    labourCost: "",
    discount: "",
    tax: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate totals
  const area = parseFloat(formData.area) || 0;
  const pricePerSqFt = parseFloat(formData.pricePerSqFt) || 0;
  const materialCost = parseFloat(formData.materialCost) || 0;
  const labourCost = parseFloat(formData.labourCost) || 0;
  const discount = parseFloat(formData.discount) || 0;
  const taxPercent = parseFloat(formData.tax) || 0;

  const baseAmount = area * pricePerSqFt;
  const subtotal = baseAmount + materialCost + labourCost;
  const discountAmount = (subtotal * discount) / 100;
  const afterDiscount = subtotal - discountAmount;
  const taxAmount = (afterDiscount * taxPercent) / 100;
  const total = afterDiscount + taxAmount;

  const handleCreateQuotation = () => {
    const quotation = {
      ...formData,
      baseAmount: baseAmount.toFixed(2),
      subtotal: subtotal.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      total: total.toFixed(2),
    };
    onCalculate(quotation);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Calculator size={20} className="text-[#FF1E1E]" />
            <h2 className="text-lg font-semibold text-[#1F2937]">Quotation Calculator</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <div className="p-5 space-y-4">
          {/* Client Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                placeholder="Enter client name"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E]"
              >
                <option value="">Select project type</option>
                <option value="2BHK Interior">2BHK Interior</option>
                <option value="3BHK Interior">3BHK Interior</option>
                <option value="Villa Interior">Villa Interior</option>
                <option value="Office Design">Office Design</option>
                <option value="Commercial Space">Commercial Space</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Shop Interior">Shop Interior</option>
              </select>
            </div>
          </div>

          {/* Area & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Area (sq ft)</label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="e.g., 1200"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price per sq ft (₹)</label>
              <input
                type="number"
                name="pricePerSqFt"
                value={formData.pricePerSqFt}
                onChange={handleChange}
                placeholder="e.g., 1500"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E]"
              />
            </div>
          </div>

          {/* Costs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Material Cost (₹)</label>
              <input
                type="number"
                name="materialCost"
                value={formData.materialCost}
                onChange={handleChange}
                placeholder="e.g., 50000"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Labour Cost (₹)</label>
              <input
                type="number"
                name="labourCost"
                value={formData.labourCost}
                onChange={handleChange}
                placeholder="e.g., 30000"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E]"
              />
            </div>
          </div>

          {/* Discount & Tax */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                placeholder="e.g., 5"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tax (%)</label>
              <input
                type="number"
                name="tax"
                value={formData.tax}
                onChange={handleChange}
                placeholder="e.g., 18"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E]"
              />
            </div>
          </div>

          {/* Calculation Summary */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Calculation Summary</h3>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Base Amount (Area × Price)</span>
              <span className="font-medium text-gray-900">₹{baseAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Material Cost</span>
              <span className="font-medium text-gray-900">₹{materialCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Labour Cost</span>
              <span className="font-medium text-gray-900">₹{labourCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
              <span className="text-gray-700 font-medium">Subtotal</span>
              <span className="font-bold text-gray-900">₹{subtotal.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount ({discount}%)</span>
                <span>- ₹{discountAmount.toLocaleString()}</span>
              </div>
            )}
            {taxPercent > 0 && (
              <div className="flex justify-between text-sm text-orange-600">
                <span>Tax ({taxPercent}%)</span>
                <span>+ ₹{taxAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-lg border-t border-gray-300 pt-3 mt-3">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-[#FF1E1E]">₹{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Formula Display */}
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-blue-700">
              <strong>Formula:</strong> Total = (Area × Price/sqft) + Material + Labour - Discount% + Tax%
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 p-5 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateQuotation}
            className="px-4 py-2 bg-[#FF1E1E] text-white rounded-lg text-sm font-medium hover:bg-red-600"
          >
            Create Quotation
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuotationCalculator;
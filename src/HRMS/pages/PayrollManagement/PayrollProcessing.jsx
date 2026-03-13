import React, { useState } from "react";
import {
  PlusIcon,
  SearchIcon,
  DownloadIcon,
  UploadIcon,
  CheckCircleIcon,
  ClockIcon,
  RefreshIcon,
  AlertCircleIcon,
  ArrowUpIcon,
} from "./components/Icons";
import { payrollProcessingSteps } from "./data/payrollData";

// ─── Payroll Processing Component ────────────────────────────────────────────────
const PayrollProcessing = () => {
  const [currentStep, setCurrentStep] = useState(3);
  const [steps, setSteps] = useState(payrollProcessingSteps);

  const handleStepClick = (stepIndex) => {
    if (stepIndex <= currentStep + 1) {
      // Can only click on completed steps or next step
      const newSteps = [...steps];
      if (stepIndex === currentStep && steps[stepIndex].status === "inProgress") {
        newSteps[stepIndex].status = "completed";
        if (stepIndex < steps.length - 1) {
          newSteps[stepIndex + 1].status = "inProgress";
        }
        setCurrentStep(stepIndex + 1);
      }
      setSteps(newSteps);
    }
  };

  const getStepStatus = (status) => {
    switch (status) {
      case "completed":
        return { bg: "bg-green-500", text: "text-green-600", border: "border-green-500" };
      case "inProgress":
        return { bg: "bg-yellow-500", text: "text-yellow-600", border: "border-yellow-500" };
      default:
        return { bg: "bg-white", text: "text-gray-400", border: "border-gray-300" };
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payroll Processing</h1>
            <p className="text-sm text-gray-500 mt-0.5">Process salaries step by step for February 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 bg-white text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all">
              <RefreshIcon />
              Reset Process
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-all hover:shadow-lg">
              <CheckCircleIcon />
              Complete All Steps
            </button>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Processing Progress</h3>
              <p className="text-sm text-gray-500 mt-0.5">
                {steps.filter((s) => s.status === "completed").length} of {steps.length} steps completed
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-red-600">
                {Math.round((steps.filter((s) => s.status === "completed").length / steps.length) * 100)}%
              </p>
              <p className="text-sm text-gray-500">Complete</p>
            </div>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-500"
              style={{ width: `${(steps.filter((s) => s.status === "completed").length / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Processing Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Steps List */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-6">Processing Steps</h3>
            <div className="space-y-1">
              {steps.map((step, index) => {
                const status = getStepStatus(step.status);
                const isClickable = index <= currentStep + 1;

                return (
                  <div
                    key={step.step}
                    onClick={() => handleStepClick(index)}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                      isClickable ? "cursor-pointer hover:bg-gray-50" : "opacity-60 cursor-not-allowed"
                    } ${step.status === "inProgress" ? "bg-yellow-50 border-2 border-yellow-200" : ""}`}
                  >
                    {/* Step Number/Icon */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${status.bg} ${status.border} border-2`}
                    >
                      {step.status === "completed" ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : step.status === "inProgress" ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span className={`text-sm font-bold ${status.text}`}>{step.step}</span>
                      )}
                    </div>

                    {/* Step Info */}
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${step.status === "pending" ? "text-gray-400" : "text-gray-900"}`}>
                        {step.title}
                      </p>
                      <p className={`text-xs ${step.status === "pending" ? "text-gray-300" : "text-gray-500"}`}>
                        {step.subtitle}
                      </p>
                    </div>

                    {/* Status Badge */}
                    {step.status === "completed" && (
                      <span className="text-xs font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
                        Completed
                      </span>
                    )}
                    {step.status === "inProgress" && (
                      <span className="text-xs font-medium text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
                        In Progress
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Details */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-6">Step Details</h3>

            {/* Current Step Detail */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-5 border border-red-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center text-white text-lg font-bold">
                  {steps[currentStep]?.step || steps[steps.length - 1].step}
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{steps[currentStep]?.title || "All Steps Completed"}</p>
                  <p className="text-sm text-gray-500">{steps[currentStep]?.subtitle}</p>
                </div>
              </div>

              {steps[currentStep]?.status === "inProgress" && (
                <div className="space-y-4 mt-6">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-700 mb-3">Action Required:</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      {currentStep === 2 && (
                        <>
                          <li className="flex items-center gap-2">
                            <CheckCircleIcon /> Import sales data from CRM
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircleIcon /> Calculate incentives based on slabs
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircleIcon /> Review and approve incentive amounts
                          </li>
                        </>
                      )}
                      {currentStep === 3 && (
                        <>
                          <li className="flex items-center gap-2">
                            <CheckCircleIcon /> Apply PF deductions (12%)
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircleIcon /> Apply ESIC deductions (0.75%)
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircleIcon /> Apply Professional Tax
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-all">
                    <CheckCircleIcon />
                    Complete Step {currentStep + 1}
                  </button>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all">
                <UploadIcon />
                Import Data
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all">
                <DownloadIcon />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                <CheckCircleIcon />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{steps.filter((s) => s.status === "completed").length}</p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600">
                <ClockIcon />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{steps.filter((s) => s.status === "inProgress").length}</p>
                <p className="text-xs text-gray-500">In Progress</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                <AlertCircleIcon />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{steps.filter((s) => s.status === "pending").length}</p>
                <p className="text-xs text-gray-500">Pending</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                <ArrowUpIcon />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">28 Feb</p>
                <p className="text-xs text-gray-500">Due Date</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollProcessing;
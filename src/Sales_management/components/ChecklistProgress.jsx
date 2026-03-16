import { CheckCircle, AlertTriangle } from 'lucide-react';

export default function ChecklistProgress({ completed, total }) {
  const percentage = Math.round((completed / total) * 100);

  const getProgressColor = () => {
    if (percentage < 40) return 'bg-red-500';
    if (percentage < 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusColor = () => {
    if (percentage < 40) return 'text-red-600';
    if (percentage < 80) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getBgColor = () => {
    if (percentage < 40) return 'bg-red-50 border-red-200';
    if (percentage < 80) return 'bg-yellow-50 border-yellow-200';
    return 'bg-green-50 border-green-200';
  };

  const getStatusMessage = () => {
    if (percentage === 100) {
      return {
        type: 'success',
        message: 'Salesperson ready for client visit.',
        icon: CheckCircle,
      };
    }
    return {
      type: 'warning',
      message: 'Some items are not prepared. Please complete the checklist before visiting the client.',
      icon: AlertTriangle,
    };
  };

  const status = getStatusMessage();
  const StatusIcon = status.icon;

  return (
    <div className="space-y-4">
      {/* Progress Card */}
      <div className={`rounded-xl p-4 border ${getBgColor()}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-[#1F2937]">Checklist Completion</h3>
          <span className={`text-2xl font-bold ${getStatusColor()}`}>{percentage}%</span>
        </div>

        <div className="flex items-center gap-4 mb-3">
          <div className="flex-1">
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${getProgressColor()}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
          <div className="text-right min-w-[80px]">
            <span className="text-[#1F2937] font-semibold">{completed}</span>
            <span className="text-gray-500"> / {total}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600">
          {completed === total
            ? 'All items completed!'
            : `${total - completed} items remaining`}
        </p>
      </div>

      {/* Status Message */}
      <div
        className={`rounded-xl p-4 border flex items-start gap-3 ${
          status.type === 'success'
            ? 'bg-green-50 border-green-200'
            : 'bg-yellow-50 border-yellow-200'
        }`}
      >
        <StatusIcon
          className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
            status.type === 'success' ? 'text-green-500' : 'text-yellow-500'
          }`}
        />
        <p className={`text-sm ${status.type === 'success' ? 'text-green-700' : 'text-yellow-700'}`}>
          {status.message}
        </p>
      </div>
    </div>
  );
}
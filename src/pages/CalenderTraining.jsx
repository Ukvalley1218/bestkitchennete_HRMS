import { useState, useEffect } from "react";
import LeaveStatCard from "../components/StatCard";

// ───────────────── ICONS ─────────────────

const ActiveProgramIcon = () => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="35" height="35" rx="10" fill="#FFE3E3" />
    <path
      d="M26.7017 15.2535L18.2642 10.7535C18.1828 10.7102 18.092 10.6875 17.9998 10.6875C17.9076 10.6875 17.8168 10.7102 17.7354 10.7535L9.29795 15.2535C9.20795 15.3015 9.13269 15.373 9.08021 15.4604C9.02772 15.5479 9 15.6479 9 15.7499C9 15.8519 9.02772 15.9519 9.08021 16.0394C9.13269 16.1268 9.20795 16.1984 9.29795 16.2463L11.2498 17.2876V20.6922C11.2492 20.9685 11.3509 21.2352 11.5353 21.441C12.4564 22.4669 14.5201 24.1874 17.9998 24.1874C19.1536 24.1969 20.2988 23.988 21.3748 23.5715V25.8749C21.3748 26.0241 21.4341 26.1672 21.5396 26.2727C21.6451 26.3781 21.7881 26.4374 21.9373 26.4374C22.0865 26.4374 22.2296 26.3781 22.3351 26.2727C22.4406 26.1672 22.4998 26.0241 22.4998 25.8749V23.028C23.2333 22.6045 23.8962 22.0691 24.4644 21.441C24.6487 21.2352 24.7504 20.9685 24.7498 20.6922V17.2876L26.7017 16.2463C26.7917 16.1984 26.867 16.1268 26.9194 16.0394C26.9719 15.9519 26.9996 15.8519 26.9996 15.7499C26.9996 15.6479 26.9719 15.5479 26.9194 15.4604C26.867 15.373 26.7917 15.3015 26.7017 15.2535ZM17.9998 23.0624C14.9574 23.0624 13.1679 21.576 12.3748 20.6922V17.8874L17.7354 20.7463C17.8168 20.7896 17.9076 20.8123 17.9998 20.8123C18.092 20.8123 18.1828 20.7896 18.2642 20.7463L21.3748 19.0876V22.3459C20.4889 22.7594 19.3723 23.0624 17.9998 23.0624ZM23.6248 20.6894C23.2876 21.0635 22.9104 21.3995 22.4998 21.6913V18.4872L23.6248 17.8874V20.6894ZM22.2186 17.3629L22.2031 17.3537L18.2656 15.2535C18.1342 15.1864 17.9818 15.1736 17.841 15.2178C17.7003 15.2621 17.5826 15.3598 17.5133 15.49C17.4439 15.6202 17.4285 15.7725 17.4703 15.9139C17.5121 16.0554 17.6079 16.1747 17.7369 16.2463L21.0233 17.9999L17.9998 19.6122L10.7576 15.7499L17.9998 11.8876L25.242 15.7499L22.2186 17.3629Z"
      fill="#A60000"
    />
  </svg>
);

const EnrolledIcon = () => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="35" height="35" rx="10" fill="#FFE3E3" />
    <path
      d="M23.625 10.6875H14.0625C13.4658 10.6875 12.8935 10.9246 12.4715 11.3465C12.0496 11.7685 11.8125 12.3408 11.8125 12.9375V24.75C11.8125 24.8992 11.8718 25.0423 11.9773 25.1477C12.0827 25.2532 12.2258 25.3125 12.375 25.3125H22.5C22.6492 25.3125 22.7923 25.2532 22.8977 25.1477C23.0032 25.0423 23.0625 24.8992 23.0625 24.75C23.0625 24.6008 23.0032 24.4577 22.8977 24.3523C22.7923 24.2468 22.6492 24.1875 22.5 24.1875H12.9375C12.9375 23.8891 13.056 23.603 13.267 23.392C13.478 23.181 13.7641 23.0625 14.0625 23.0625H23.625C23.7742 23.0625 23.9173 23.0032 24.0227 22.8977C24.1282 22.7923 24.1875 22.6492 24.1875 22.5V11.25C24.1875 11.1008 24.1282 10.9577 24.0227 10.8523C23.9173 10.7468 23.7742 10.6875 23.625 10.6875ZM17.4375 11.8125H20.8125V16.875L19.4618 15.8625C19.3644 15.7895 19.246 15.75 19.1243 15.75C19.0026 15.75 18.8842 15.7895 18.7868 15.8625L17.4375 16.875V11.8125ZM23.0625 21.9375H14.0625C13.6674 21.937 13.2793 22.041 12.9375 22.2391V12.9375C12.9375 12.6391 13.056 12.353 13.267 12.142C13.478 11.931 13.7641 11.8125 14.0625 11.8125H16.3125V18C16.3125 18.1045 16.3416 18.2069 16.3965 18.2957C16.4514 18.3846 16.53 18.4564 16.6234 18.5031C16.7169 18.5498 16.8215 18.5696 16.9255 18.5602C17.0296 18.5508 17.1289 18.5127 17.2125 18.45L19.125 17.0156L21.0382 18.45C21.1354 18.5229 21.2535 18.5623 21.375 18.5625C21.5242 18.5625 21.6673 18.5032 21.7727 18.3977C21.8782 18.2923 21.9375 18.1492 21.9375 18V11.8125H23.0625V21.9375Z"
      fill="#A60000"
    />
  </svg>
);

const ActiveJobsIcon = () => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="35" height="35" rx="10" fill="#FFE3E3" />
    <path
      d="M23.1875 13.5H20.375C20.375 12.6049 20.0194 11.7464 19.3865 11.1135C18.7536 10.4806 17.8951 10.125 17 10.125C16.1049 10.125 15.2464 10.4806 14.6135 11.1135C13.9806 11.7464 13.625 12.6049 13.625 13.5H10.8125C10.5141 13.5 10.228 13.6185 10.017 13.8295C9.80603 14.0405 9.6875 14.3266 9.6875 14.625V23.0625C9.6875 23.3609 9.80603 23.647 10.017 23.858C10.228 24.069 10.5141 24.1875 10.8125 24.1875H23.1875C23.4859 24.1875 23.772 24.069 23.983 23.858C24.194 23.647 24.3125 23.3609 24.3125 23.0625V14.625C24.3125 14.3266 24.194 14.0405 23.983 13.8295C23.772 13.6185 23.4859 13.5 23.1875 13.5ZM17 11.25C17.5967 11.25 18.169 11.4871 18.591 11.909C19.0129 12.331 19.25 12.9033 19.25 13.5H14.75C14.75 12.9033 14.9871 12.331 15.409 11.909C15.831 11.4871 16.4033 11.25 17 11.25ZM23.1875 23.0625H10.8125V14.625H13.625V15.75C13.625 15.8992 13.6843 16.0423 13.7898 16.1477C13.8952 16.2532 14.0383 16.3125 14.1875 16.3125C14.3367 16.3125 14.4798 16.2532 14.5852 16.1477C14.6907 16.0423 14.75 15.8992 14.75 15.75V14.625H19.25V15.75C19.25 15.8992 19.3093 16.0423 19.4148 16.1477C19.5202 16.2532 19.6633 16.3125 19.8125 16.3125C19.9617 16.3125 20.1048 16.2532 20.2102 16.1477C20.3157 16.0423 20.375 15.8992 20.375 15.75V14.625H23.1875V23.0625Z"
      fill="#A60000"
    />
  </svg>
);

const InactiveJobsIcon = () => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="35" height="35" rx="10" fill="#FFE3E3" />
    <path
      d="M23.1875 13.5H20.375C20.375 12.6049 20.0194 11.7464 19.3865 11.1135C18.7536 10.4806 17.8951 10.125 17 10.125C16.1049 10.125 15.2464 10.4806 14.6135 11.1135C13.9806 11.7464 13.625 12.6049 13.625 13.5H10.8125C10.5141 13.5 10.228 13.6185 10.017 13.8295C9.80603 14.0405 9.6875 14.3266 9.6875 14.625V23.0625C9.6875 23.3609 9.80603 23.647 10.017 23.858C10.228 24.069 10.5141 24.1875 10.8125 24.1875H23.1875C23.4859 24.1875 23.772 24.069 23.983 23.858C24.194 23.647 24.3125 23.3609 24.3125 23.0625V14.625C24.3125 14.3266 24.194 14.0405 23.983 13.8295C23.772 13.6185 23.4859 13.5 23.1875 13.5ZM17 11.25C17.5967 11.25 18.169 11.4871 18.591 11.909C19.0129 12.331 19.25 12.9033 19.25 13.5H14.75C14.75 12.9033 14.9871 12.331 15.409 11.909C15.831 11.4871 16.4033 11.25 17 11.25ZM23.1875 23.0625H10.8125V14.625H13.625V15.75C13.625 15.8992 13.6843 16.0423 13.7898 16.1477C13.8952 16.2532 14.0383 16.3125 14.1875 16.3125C14.3367 16.3125 14.4798 16.2532 14.5852 16.1477C14.6907 16.0423 14.75 15.8992 14.75 15.75V14.625H19.25V15.75C19.25 15.8992 19.3093 16.0423 19.4148 16.1477C19.5202 16.2532 19.6633 16.3125 19.8125 16.3125C19.9617 16.3125 20.1048 16.2532 20.2102 16.1477C20.3157 16.0423 20.375 15.8992 20.375 15.75V14.625H23.1875V23.0625Z"
      fill="#A60000"
    />
  </svg>
);

// ───────────────── CONSTANTS ─────────────────

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const EVENT_TYPES = [
  { value: "Training", color: "bg-green-500", textColor: "text-green-600", bgLight: "bg-green-100" },
  { value: "Meeting", color: "bg-blue-500", textColor: "text-blue-600", bgLight: "bg-blue-100" },
  { value: "Interview", color: "bg-purple-500", textColor: "text-purple-600", bgLight: "bg-purple-100" },
  { value: "Payroll", color: "bg-orange-500", textColor: "text-orange-600", bgLight: "bg-orange-100" },
  { value: "Other", color: "bg-gray-500", textColor: "text-gray-600", bgLight: "bg-gray-100" },
];

// ───────────────── INITIAL MOCK EVENTS ─────────────────

const INITIAL_EVENTS = [
  {
    id: 1,
    title: "React Training",
    type: "Training",
    date: "2026-03-10",
    time: "10:00 AM",
    description: "Advanced React concepts including hooks and context API.",
  },
  {
    id: 2,
    title: "HR Meeting",
    type: "Meeting",
    date: "2026-03-12",
    time: "11:00 AM",
    description: "Quarterly HR review meeting with department heads.",
  },
  {
    id: 3,
    title: "Payroll Processing",
    type: "Payroll",
    date: "2026-03-18",
    time: "02:00 PM",
    description: "Monthly payroll processing and verification.",
  },
  {
    id: 4,
    title: "Interview Schedule",
    type: "Interview",
    date: "2026-03-18",
    time: "04:30 PM",
    description: "Technical interview for Senior Developer position.",
  },
  {
    id: 5,
    title: "Team Training",
    type: "Training",
    date: "2026-03-22",
    time: "09:00 AM",
    description: "New team member onboarding and training session.",
  },
  {
    id: 6,
    title: "Performance Review",
    type: "Meeting",
    date: "2026-03-25",
    time: "03:00 PM",
    description: "Annual performance review meeting with team leads.",
  },
];

// ───────────────── HELPERS ─────────────────

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getEventTypeConfig(type) {
  return EVENT_TYPES.find((t) => t.value === type) || EVENT_TYPES[4];
}

// ───────────────── ADD/EDIT EVENT MODAL ─────────────────

function EventModal({ isOpen, onClose, onSave, selectedDate, editingEvent, onUpdate }) {
  const [formData, setFormData] = useState({
    title: "",
    type: "Training",
    date: selectedDate || "",
    time: "09:00 AM",
    description: "",
  });

  const isEditMode = !!editingEvent;

  // Populate form when editing
  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title,
        type: editingEvent.type,
        date: editingEvent.date,
        time: editingEvent.time,
        description: editingEvent.description || "",
      });
    } else {
      setFormData({
        title: "",
        type: "Training",
        date: selectedDate || "",
        time: "09:00 AM",
        description: "",
      });
    }
  }, [editingEvent, selectedDate, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date) return;

    if (isEditMode) {
      onUpdate({
        ...editingEvent,
        ...formData,
      });
    } else {
      onSave({
        id: Date.now(),
        ...formData,
      });
    }

    setFormData({
      title: "",
      type: "Training",
      date: selectedDate || "",
      time: "09:00 AM",
      description: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {isEditMode ? "Edit Event" : "Add New Event"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter event title"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              required
            />
          </div>

          {/* Event Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white"
            >
              {EVENT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.value}
                </option>
              ))}
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="e.g., 10:00 AM"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter event description"
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700"
            >
              {isEditMode ? "Update Event" : "Add Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ───────────────── EVENT DETAIL PANEL ─────────────────

function EventDetailPanel({ selectedDate, events, onClose, onDelete, onEdit }) {
  if (!selectedDate) return null;

  const typeConfig = (type) => getEventTypeConfig(type);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-red-500 rounded-full" />
          <h3 className="text-base font-bold text-gray-900">
            {formatDate(selectedDate)}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-sm"
        >
          Clear
        </button>
      </div>

      {/* Events List */}
      {events.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-sm text-gray-500">No events scheduled</p>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => {
            const config = typeConfig(event.type);
            return (
              <div
                key={event.id}
                className={`p-4 rounded-xl ${config.bgLight} border border-gray-100`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${config.textColor} ${config.bgLight}`}>
                        {event.type}
                      </span>
                      <span className="text-xs text-gray-500">{event.time}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900">{event.title}</h4>
                    {event.description && (
                      <p className="text-xs text-gray-500 mt-1">{event.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEdit(event)}
                      className="text-gray-400 hover:text-blue-500 p-1"
                      title="Edit event"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(event.id)}
                      className="text-gray-400 hover:text-red-500 p-1"
                      title="Delete event"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Event Count */}
      {events.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            {events.length} event{events.length !== 1 ? "s" : ""} scheduled
          </p>
        </div>
      )}
    </div>
  );
}

// ───────────────── MAIN COMPONENT ─────────────────

export default function CalenderTraining() {
  const today = new Date();

  // State
  const [view, setView] = useState("Month");
  const [current, setCurrent] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const { year, month } = current;
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Navigation
  const prev = () => {
    setCurrent(({ year, month }) =>
      month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 }
    );
  };

  const next = () => {
    setCurrent(({ year, month }) =>
      month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 }
    );
  };

  const goToday = () => {
    setCurrent({
      year: today.getFullYear(),
      month: today.getMonth(),
    });
    setSelectedDate(
      `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
    );
  };

  // Calendar cells
  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  // Helpers
  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const dateKey = (day) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const getEventsForDate = (date) =>
    events.filter((e) => e.date === date);

  const handleDateClick = (day) => {
    if (day) {
      setSelectedDate(dateKey(day));
    }
  };

  const handleAddEvent = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
    );
    setEditingEvent(null);
  };

  const handleOpenModal = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-7xl space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Calendar & Training Program</h1>
            <p className="text-[#757575]">Event management and training schedule</p>
          </div>
          <button
            onClick={handleOpenModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Event
          </button>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <LeaveStatCard
            icon={ActiveProgramIcon}
            trend="+12"
            value="8"
            label="Active Program"
            sub="This Month"
          />
          <LeaveStatCard
            icon={EnrolledIcon}
            trend="+5"
            value="05"
            label="Enrolled Employees"
          />
          <LeaveStatCard
            icon={ActiveJobsIcon}
            trend="+5"
            value="06"
            label="Active Jobs"
          />
          <LeaveStatCard
            icon={InactiveJobsIcon}
            trend="+5"
            value="12"
            label="Inactive Jobs"
          />
        </div>

        {/* CALENDAR + EVENT DETAIL */}
        <div className="flex gap-6 flex-col lg:flex-row">
          {/* CALENDAR */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              {/* Header Row */}
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-gray-900">
                  {MONTHS[month]} {year}
                </h2>
                <div className="flex rounded-lg border border-gray-200 overflow-hidden text-sm font-medium">
                  {["Day", "Week", "Month"].map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      className={`px-3 py-1.5 transition-colors ${
                        view === v
                          ? "bg-red-500 text-white"
                          : "bg-white text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-2 mb-5">
                <button
                  onClick={prev}
                  className="w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center text-lg leading-none transition-colors"
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  className="w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center text-lg leading-none transition-colors"
                >
                  ›
                </button>
                <button
                  onClick={goToday}
                  className="px-3 py-1 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Today
                </button>
                <div className="ml-auto flex items-center gap-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    Events
                  </span>
                </div>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 mb-1">
                {DAYS.map((d) => (
                  <div
                    key={d}
                    className="text-center text-xs font-semibold text-gray-500 py-1"
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Date Grid */}
              <div className="grid grid-cols-7 gap-1">
                {cells.map((day, i) => {
                  const key = day ? dateKey(day) : null;
                  const dayEvents = key ? getEventsForDate(key) : [];
                  const isTodayDate = day && isToday(day);
                  const isSelected = key && selectedDate === key;

                  return (
                    <div
                      key={i}
                      onClick={() => handleDateClick(day)}
                      className={`rounded-xl min-h-[102px] p-2 border transition-all cursor-pointer ${
                        isTodayDate
                          ? "border-cyan-300 bg-cyan-50"
                          : isSelected
                          ? "border-red-400 bg-red-50"
                          : "border-gray-100 hover:bg-gray-50"
                      }`}
                    >
                      {day && (
                        <>
                          {/* Day Number */}
                          <div className="flex items-center justify-between mb-1">
                            <span
                              className={`text-[11px] font-semibold w-5 h-5 flex items-center justify-center rounded-full ${
                                isTodayDate ? "bg-red-500 text-white" : "text-gray-700"
                              }`}
                            >
                              {day}
                            </span>
                            {dayEvents.length > 0 && (
                              <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                                {dayEvents.length}
                              </span>
                            )}
                          </div>

                          {/* Event Indicators */}
                          <div className="space-y-1">
                            {dayEvents.slice(0, 2).map((ev, j) => {
                              const config = getEventTypeConfig(ev.type);
                              return (
                                <div
                                  key={j}
                                  className={`${config.color} text-white text-[9px] font-medium px-1.5 py-0.5 rounded truncate`}
                                  title={`${ev.title} - ${ev.time}`}
                                >
                                  {ev.title}
                                </div>
                              );
                            })}
                            {dayEvents.length > 2 && (
                              <div className="text-[9px] text-gray-500 pl-1">
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* EVENT DETAIL PANEL */}
          <div className="lg:w-80">
            <EventDetailPanel
              selectedDate={selectedDate}
              events={selectedDateEvents}
              onClose={() => setSelectedDate(null)}
              onDelete={handleDeleteEvent}
              onEdit={handleEditEvent}
            />
          </div>
        </div>

        {/* EVENT TYPE LEGEND */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Event Types</h3>
          <div className="flex flex-wrap gap-4">
            {EVENT_TYPES.map((type) => (
              <div key={type.value} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${type.color}`}></span>
                <span className="text-xs text-gray-600">{type.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ADD/EDIT EVENT MODAL */}
      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleAddEvent}
        onUpdate={handleUpdateEvent}
        selectedDate={selectedDate}
        editingEvent={editingEvent}
      />
    </div>
  );
}
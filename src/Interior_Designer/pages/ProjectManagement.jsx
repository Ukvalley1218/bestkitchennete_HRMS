import React, { useState } from 'react';
import {
  Plus, MagnifyingGlass, Funnel, Eye, PencilSimple, Trash, Calendar, Users, MapPin,
  X, Clock, CheckCircle, Warning, CurrencyInr, Buildings, User, Files, ArrowRight,
  Check, Play, Pause, HandWaving, ChartLine, Timer
} from '@phosphor-icons/react';

const ProjectManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Modern Living Room",
      client: "John Smith",
      status: "In Progress",
      progress: 65,
      budget: "₹5,00,000",
      budgetRaw: 500000,
      startDate: "2024-01-15",
      deadline: "2024-03-30",
      location: "Mumbai",
      designer: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=250&fit=crop",
      team: ["Sarah Johnson", "Mike Chen", "Lisa Wong"],
      description: "Complete modern living room renovation with minimalist design approach, featuring custom furniture and smart home integration.",
      tasks: [
        { id: 1, title: "Initial consultation", status: "Completed", dueDate: "2024-01-20" },
        { id: 2, title: "Design concept approval", status: "Completed", dueDate: "2024-02-01" },
        { id: 3, title: "Material selection", status: "Completed", dueDate: "2024-02-15" },
        { id: 4, title: "Furniture procurement", status: "In Progress", dueDate: "2024-03-10" },
        { id: 5, title: "Installation", status: "To Do", dueDate: "2024-03-25" },
        { id: 6, title: "Final walkthrough", status: "To Do", dueDate: "2024-03-30" },
      ],
      activity: [
        { id: 1, action: "Material samples approved", date: "2024-02-20", user: "Sarah Johnson" },
        { id: 2, action: "Furniture order placed", date: "2024-02-25", user: "Mike Chen" },
        { id: 3, action: "Client meeting scheduled", date: "2024-03-05", user: "Lisa Wong" },
      ],
    },
    {
      id: 2,
      name: "Corporate Office Renovation",
      client: "Tech Solutions Ltd",
      status: "Pending",
      progress: 20,
      budget: "₹15,00,000",
      budgetRaw: 1500000,
      startDate: "2024-02-01",
      deadline: "2024-05-15",
      location: "Delhi",
      designer: "Michael Chen",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop",
      team: ["Michael Chen", "Priya Sharma"],
      description: "Full office renovation for a tech company, including open workspace, meeting rooms, and executive suites.",
      tasks: [
        { id: 1, title: "Site survey", status: "Completed", dueDate: "2024-02-05" },
        { id: 2, title: "Design proposal", status: "In Progress", dueDate: "2024-02-28" },
        { id: 3, title: "Budget approval", status: "To Do", dueDate: "2024-03-15" },
        { id: 4, title: "Construction phase", status: "To Do", dueDate: "2024-04-30" },
        { id: 5, title: "Final inspection", status: "To Do", dueDate: "2024-05-15" },
      ],
      activity: [
        { id: 1, action: "Project kickoff meeting", date: "2024-02-01", user: "Michael Chen" },
        { id: 2, action: "Site measurements completed", date: "2024-02-05", user: "Priya Sharma" },
      ],
    },
    {
      id: 3,
      name: "Luxury Kitchen Remodel",
      client: "Priya Sharma",
      status: "Completed",
      progress: 100,
      budget: "₹8,50,000",
      budgetRaw: 850000,
      startDate: "2024-01-01",
      deadline: "2024-02-28",
      location: "Bangalore",
      designer: "Emily Davis",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop",
      team: ["Emily Davis", "John Smith"],
      description: "Luxury kitchen remodel with high-end appliances, custom cabinetry, and premium finishes.",
      tasks: [
        { id: 1, title: "Design consultation", status: "Completed", dueDate: "2024-01-10" },
        { id: 2, title: "Material selection", status: "Completed", dueDate: "2024-01-20" },
        { id: 3, title: "Demolition", status: "Completed", dueDate: "2024-01-30" },
        { id: 4, title: "Installation", status: "Completed", dueDate: "2024-02-20" },
        { id: 5, title: "Final walkthrough", status: "Completed", dueDate: "2024-02-28" },
      ],
      activity: [
        { id: 1, action: "Project completed successfully", date: "2024-02-28", user: "Emily Davis" },
        { id: 2, action: "Client feedback received - 5 stars", date: "2024-03-01", user: "Emily Davis" },
      ],
    },
    {
      id: 4,
      name: "Boutique Hotel Suite",
      client: "Grand Hotels Inc",
      status: "In Progress",
      progress: 45,
      budget: "₹12,00,000",
      budgetRaw: 1200000,
      startDate: "2024-02-10",
      deadline: "2024-06-30",
      location: "Goa",
      designer: "James Wilson",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=250&fit=crop",
      team: ["James Wilson", "Ana Martinez", "Raj Patel"],
      description: "Luxury boutique hotel suite design with tropical theme, featuring custom furniture and premium amenities.",
      tasks: [
        { id: 1, title: "Concept development", status: "Completed", dueDate: "2024-02-25" },
        { id: 2, title: "Client presentation", status: "Completed", dueDate: "2024-03-05" },
        { id: 3, title: "Material sourcing", status: "In Progress", dueDate: "2024-04-15" },
        { id: 4, title: "Furniture fabrication", status: "To Do", dueDate: "2024-05-30" },
        { id: 5, title: "Installation", status: "To Do", dueDate: "2024-06-25" },
      ],
      activity: [
        { id: 1, action: "Design concept approved", date: "2024-03-06", user: "James Wilson" },
        { id: 2, action: "Material samples requested", date: "2024-03-10", user: "Ana Martinez" },
      ],
    },
    {
      id: 5,
      name: "Restaurant Interior Design",
      client: "Spice Garden",
      status: "Design Review",
      progress: 80,
      budget: "₹6,00,000",
      budgetRaw: 600000,
      startDate: "2024-01-20",
      deadline: "2024-04-15",
      location: "Pune",
      designer: "Lisa Anderson",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop",
      team: ["Lisa Anderson", "Kumar Singh"],
      description: "Modern restaurant interior with traditional elements, featuring open kitchen concept and ambient lighting design.",
      tasks: [
        { id: 1, title: "Initial consultation", status: "Completed", dueDate: "2024-01-25" },
        { id: 2, title: "Design development", status: "Completed", dueDate: "2024-02-20" },
        { id: 3, title: "3D visualization", status: "Completed", dueDate: "2024-03-10" },
        { id: 4, title: "Client revision", status: "In Progress", dueDate: "2024-03-25" },
        { id: 5, title: "Final approval", status: "To Do", dueDate: "2024-04-01" },
        { id: 6, title: "Implementation", status: "To Do", dueDate: "2024-04-15" },
      ],
      activity: [
        { id: 1, action: "Design review meeting scheduled", date: "2024-03-15", user: "Lisa Anderson" },
        { id: 2, action: "Minor changes requested by client", date: "2024-03-18", user: "Kumar Singh" },
      ],
    },
    {
      id: 6,
      name: "Bedroom Suite Design",
      client: "Amit Patel",
      status: "On Hold",
      progress: 30,
      budget: "₹3,50,000",
      budgetRaw: 350000,
      startDate: "2024-02-15",
      deadline: "2024-04-30",
      location: "Ahmedabad",
      designer: "David Brown",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=250&fit=crop",
      team: ["David Brown"],
      description: "Master bedroom suite design with walk-in closet and en-suite bathroom integration.",
      tasks: [
        { id: 1, title: "Initial consultation", status: "Completed", dueDate: "2024-02-20" },
        { id: 2, title: "Concept presentation", status: "Completed", dueDate: "2024-03-01" },
        { id: 3, title: "Material selection", status: "In Progress", dueDate: "2024-03-20" },
        { id: 4, title: "Furniture design", status: "To Do", dueDate: "2024-04-10" },
        { id: 5, title: "Installation", status: "To Do", dueDate: "2024-04-30" },
      ],
      activity: [
        { id: 1, action: "Project put on hold by client", date: "2024-03-10", user: "David Brown" },
        { id: 2, action: "Reschedule discussion pending", date: "2024-03-12", user: "David Brown" },
      ],
    },
  ]);

  const [newProject, setNewProject] = useState({
    name: "",
    client: "",
    budget: "",
    startDate: "",
    deadline: "",
    location: "",
    designer: "",
    status: "Pending",
    description: "",
    team: "",
  });

  const statusColors = {
    "In Progress": { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200", icon: Play },
    "Pending": { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200", icon: Timer },
    "Completed": { bg: "bg-green-100", text: "text-green-700", border: "border-green-200", icon: CheckCircle },
    "Design Review": { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200", icon: Eye },
    "On Hold": { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-200", icon: Pause },
  };

  const taskStatusColors = {
    "To Do": { bg: "bg-gray-100", text: "text-gray-600" },
    "In Progress": { bg: "bg-blue-100", text: "text-blue-600" },
    "Completed": { bg: "bg-green-100", text: "text-green-600" },
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "all" || project.status.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const totalBudget = projects.reduce((sum, p) => sum + (p.budgetRaw || 0), 0);
  const inProgressBudget = projects
    .filter(p => p.status === "In Progress")
    .reduce((sum, p) => sum + (p.budgetRaw || 0), 0);
  const upcomingDeadlines = projects.filter(p => {
    const deadline = new Date(p.deadline);
    const today = new Date();
    const diff = (deadline - today) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 30 && p.status !== "Completed";
  }).length;
  const overdueProjects = projects.filter(p => {
    const deadline = new Date(p.deadline);
    const today = new Date();
    return deadline < today && p.status !== "Completed";
  }).length;

  const handleCreateProject = () => {
    if (newProject.name && newProject.client) {
      const project = {
        id: Date.now(),
        ...newProject,
        budget: `₹${Number(newProject.budget).toLocaleString()}`,
        budgetRaw: Number(newProject.budget),
        progress: 0,
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=250&fit=crop",
        team: newProject.team.split(",").map(t => t.trim()).filter(t => t),
        description: newProject.description || "Project description will be added soon.",
        tasks: [
          { id: 1, title: "Initial consultation", status: "To Do", dueDate: newProject.startDate },
          { id: 2, title: "Design concept", status: "To Do", dueDate: "" },
          { id: 3, title: "Implementation", status: "To Do", dueDate: newProject.deadline },
        ],
        activity: [
          { id: 1, action: "Project created", date: new Date().toISOString().split('T')[0], user: "System" },
        ],
      };
      setProjects([project, ...projects]);
      setIsModalOpen(false);
      setNewProject({
        name: "",
        client: "",
        budget: "",
        startDate: "",
        deadline: "",
        location: "",
        designer: "",
        status: "Pending",
        description: "",
        team: "",
      });
    }
  };

  const handleEditProject = () => {
    if (editingProject) {
      setProjects(projects.map(p =>
        p.id === editingProject.id
          ? {
              ...editingProject,
              budget: `₹${Number(editingProject.budgetRaw || editingProject.budget?.replace(/[₹,]/g, '') || 0).toLocaleString()}`,
              budgetRaw: Number(editingProject.budgetRaw || editingProject.budget?.replace(/[₹,]/g, '') || 0),
              team: typeof editingProject.team === 'string' ? editingProject.team.split(",").map(t => t.trim()).filter(t => t) : editingProject.team,
            }
          : p
      ));
      setIsEditModalOpen(false);
      setEditingProject(null);
    }
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
    if (selectedProject?.id === id) {
      setIsDetailModalOpen(false);
      setSelectedProject(null);
    }
  };

  const openEditModal = (project) => {
    setEditingProject({
      ...project,
      budgetRaw: project.budgetRaw || project.budget?.replace(/[₹,]/g, ''),
      team: Array.isArray(project.team) ? project.team.join(", ") : project.team,
    });
    setIsEditModalOpen(true);
  };

  const openDetailModal = (project) => {
    setSelectedProject(project);
    setIsDetailModalOpen(true);
  };

  const updateTaskStatus = (projectId, taskId, newStatus) => {
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        const updatedTasks = p.tasks.map(t =>
          t.id === taskId ? { ...t, status: newStatus } : t
        );
        const completedTasks = updatedTasks.filter(t => t.status === "Completed").length;
        const progress = Math.round((completedTasks / updatedTasks.length) * 100);
        return { ...p, tasks: updatedTasks, progress };
      }
      return p;
    }));
    // Update selected project if viewing details
    if (selectedProject?.id === projectId) {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        const updatedTasks = project.tasks.map(t =>
          t.id === taskId ? { ...t, status: newStatus } : t
        );
        const completedTasks = updatedTasks.filter(t => t.status === "Completed").length;
        const progress = Math.round((completedTasks / updatedTasks.length) * 100);
        setSelectedProject({ ...project, tasks: updatedTasks, progress });
      }
    }
  };

  const getDaysRemaining = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diff = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-blue-500";
    if (progress >= 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="font-[Lato] bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Project Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track all interior design projects</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus size={20} weight="bold" />
          Add Project
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects or clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["all", "in progress", "pending", "completed", "design review", "on hold"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-red-500">
          <div className="flex items-center gap-2">
            <Buildings size={20} className="text-red-500" />
            <p className="text-gray-500 text-sm">Total Projects</p>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-1">{projects.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-500">
          <div className="flex items-center gap-2">
            <Play size={20} className="text-blue-500" />
            <p className="text-gray-500 text-sm">In Progress</p>
          </div>
          <p className="text-2xl font-bold text-blue-600 mt-1">{projects.filter(p => p.status === "In Progress").length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-green-500">
          <div className="flex items-center gap-2">
            <CheckCircle size={20} className="text-green-500" />
            <p className="text-gray-500 text-sm">Completed</p>
          </div>
          <p className="text-2xl font-bold text-green-600 mt-1">{projects.filter(p => p.status === "Completed").length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-yellow-500">
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-yellow-500" />
            <p className="text-gray-500 text-sm">Upcoming (30d)</p>
          </div>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{upcomingDeadlines}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-gray-500">
          <div className="flex items-center gap-2">
            <Pause size={20} className="text-gray-500" />
            <p className="text-gray-500 text-sm">On Hold</p>
          </div>
          <p className="text-2xl font-bold text-gray-600 mt-1">{projects.filter(p => p.status === "On Hold").length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-purple-500">
          <div className="flex items-center gap-2">
            <CurrencyInr size={20} className="text-purple-500" />
            <p className="text-gray-500 text-sm">Active Budget</p>
          </div>
          <p className="text-lg font-bold text-purple-600 mt-1">₹{(inProgressBudget / 100000).toFixed(1)}L</p>
        </div>
      </div>

      {/* Deadline Warning Banner */}
      {(upcomingDeadlines > 0 || overdueProjects > 0) && (
        <div className="mb-6">
          {overdueProjects > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 mb-2">
              <Warning size={24} className="text-red-500" weight="fill" />
              <div>
                <p className="font-medium text-red-700">{overdueProjects} project{overdueProjects > 1 ? 's' : ''} overdue</p>
                <p className="text-sm text-red-600">Immediate attention required</p>
              </div>
            </div>
          )}
          {upcomingDeadlines > 0 && overdueProjects === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
              <Clock size={24} className="text-yellow-500" />
              <div>
                <p className="font-medium text-yellow-700">{upcomingDeadlines} project{upcomingDeadlines > 1 ? 's' : ''} with upcoming deadlines</p>
                <p className="text-sm text-yellow-600">Within the next 30 days</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const daysRemaining = getDaysRemaining(project.deadline);
          const isOverdue = daysRemaining < 0 && project.status !== "Completed";
          const isUrgent = daysRemaining >= 0 && daysRemaining <= 7 && project.status !== "Completed";

          return (
            <div key={project.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
              {/* Project Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status]?.bg} ${statusColors[project.status]?.text}`}>
                  {project.status}
                </span>
                {isOverdue && (
                  <span className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs rounded-full flex items-center gap-1">
                    <Warning size={14} weight="fill" /> Overdue
                  </span>
                )}
                {isUrgent && !isOverdue && (
                  <span className="absolute top-3 left-3 px-2 py-1 bg-yellow-500 text-white text-xs rounded-full flex items-center gap-1">
                    <Clock size={14} /> Urgent
                  </span>
                )}
              </div>

              {/* Project Header */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg line-clamp-1">{project.name}</h3>
                    <p className="text-sm text-gray-500">{project.client}</p>
                  </div>
                </div>

                {/* Team Avatars */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex -space-x-2">
                    {project.team?.slice(0, 3).map((member, index) => (
                      <div
                        key={index}
                        className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-xs font-medium border-2 border-white"
                        title={member}
                      >
                        {member.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                    ))}
                    {project.team?.length > 3 && (
                      <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-medium border-2 border-white">
                        +{project.team.length - 3}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{project.team?.length || 1} member{project.team?.length !== 1 ? 's' : ''}</span>
                </div>

                {/* Project Details */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={14} className="text-gray-400" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={14} className="text-gray-400" />
                    <span className={isOverdue ? 'text-red-500 font-medium' : ''}>
                      {isOverdue ? `${Math.abs(daysRemaining)} days overdue` :
                       isUrgent ? `${daysRemaining} days left` :
                       new Date(project.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium text-gray-700">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(project.progress)}`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Budget & Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Budget</p>
                    <p className="font-semibold text-gray-800">{project.budget}</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openDetailModal(project)}
                      className="p-2 rounded-lg hover:bg-blue-50 transition-colors text-gray-400 hover:text-blue-600"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => openEditModal(project)}
                      className="p-2 rounded-lg hover:bg-green-50 transition-colors text-gray-400 hover:text-green-600"
                      title="Edit Project"
                    >
                      <PencilSimple size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-600"
                      title="Delete Project"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Buildings size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No projects found matching your criteria.</p>
          <button
            onClick={() => { setActiveFilter("all"); setSearchTerm(""); }}
            className="mt-4 text-red-600 hover:text-red-700 font-medium"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg my-8">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Add New Project</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
                <input
                  type="text"
                  value={newProject.client}
                  onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter client name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  rows={3}
                  placeholder="Enter project description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget (₹)</label>
                <input
                  type="number"
                  value={newProject.budget}
                  onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter budget"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                  <input
                    type="date"
                    value={newProject.deadline}
                    onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={newProject.location}
                  onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lead Designer</label>
                <input
                  type="text"
                  value={newProject.designer}
                  onChange={(e) => setNewProject({ ...newProject, designer: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter designer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Team Members (comma-separated)</label>
                <input
                  type="text"
                  value={newProject.team}
                  onChange={(e) => setNewProject({ ...newProject, team: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="e.g., John Doe, Jane Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newProject.status}
                  onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Design Review">Design Review</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {isEditModalOpen && editingProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg my-8">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Edit Project</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  type="text"
                  value={editingProject.name}
                  onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                <input
                  type="text"
                  value={editingProject.client}
                  onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget (₹)</label>
                <input
                  type="number"
                  value={editingProject.budgetRaw || editingProject.budget?.replace(/[₹,]/g, '')}
                  onChange={(e) => setEditingProject({ ...editingProject, budgetRaw: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={editingProject.startDate}
                    onChange={(e) => setEditingProject({ ...editingProject, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                  <input
                    type="date"
                    value={editingProject.deadline}
                    onChange={(e) => setEditingProject({ ...editingProject, deadline: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={editingProject.location}
                  onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lead Designer</label>
                <input
                  type="text"
                  value={editingProject.designer}
                  onChange={(e) => setEditingProject({ ...editingProject, designer: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Team Members (comma-separated)</label>
                <input
                  type="text"
                  value={Array.isArray(editingProject.team) ? editingProject.team.join(", ") : editingProject.team}
                  onChange={(e) => setEditingProject({ ...editingProject, team: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editingProject.status}
                  onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Design Review">Design Review</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Progress (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editingProject.progress}
                  onChange={(e) => setEditingProject({ ...editingProject, progress: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditProject}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {isDetailModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl my-8 max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{selectedProject.name}</h2>
                <p className="text-sm text-gray-500">{selectedProject.client}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[selectedProject.status]?.bg} ${statusColors[selectedProject.status]?.text}`}>
                  {selectedProject.status}
                </span>
                <button onClick={() => setIsDetailModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Project Info */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Project Image */}
                  <div className="rounded-lg overflow-hidden h-48">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">Description</h3>
                    <p className="text-gray-600 text-sm">{selectedProject.description}</p>
                  </div>

                  {/* Tasks/Milestones */}
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Tasks & Milestones</h3>
                    <div className="space-y-2">
                      {selectedProject.tasks?.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${taskStatusColors[task.status]?.bg}`}>
                              {task.status === "Completed" ? (
                                <Check size={16} className="text-green-600" weight="bold" />
                              ) : task.status === "In Progress" ? (
                                <Play size={14} className="text-blue-600" />
                              ) : (
                                <Timer size={14} className="text-gray-500" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800 text-sm">{task.title}</p>
                              <p className="text-xs text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                            </div>
                          </div>
                          <select
                            value={task.status}
                            onChange={(e) => updateTaskStatus(selectedProject.id, task.id, e.target.value)}
                            className={`text-xs px-2 py-1 rounded border-0 ${taskStatusColors[task.status]?.bg} ${taskStatusColors[task.status]?.text}`}
                          >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activity Log */}
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Recent Activity</h3>
                    <div className="space-y-3">
                      {selectedProject.activity?.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                          <div>
                            <p className="text-sm text-gray-800">{activity.action}</p>
                            <p className="text-xs text-gray-500">
                              {activity.user} • {new Date(activity.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Details & Team */}
                <div className="space-y-6">
                  {/* Progress */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">Overall Progress</span>
                      <span className="text-lg font-bold text-gray-800">{selectedProject.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(selectedProject.progress)}`}
                        style={{ width: `${selectedProject.progress}%` }}
                      ></div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                      <span>{selectedProject.tasks?.filter(t => t.status === "Completed").length || 0} completed</span>
                      <span>{selectedProject.tasks?.length || 0} total tasks</span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <h3 className="font-medium text-gray-800">Project Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CurrencyInr size={18} className="text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Budget</p>
                          <p className="font-medium text-gray-800">{selectedProject.budget}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin size={18} className="text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Location</p>
                          <p className="font-medium text-gray-800">{selectedProject.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Timeline</p>
                          <p className="font-medium text-gray-800 text-sm">
                            {new Date(selectedProject.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} - {new Date(selectedProject.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Team */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-800 mb-3">Team Members</h3>
                    <div className="space-y-2">
                      {selectedProject.team?.map((member, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-xs font-medium">
                            {member.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <span className="text-sm text-gray-700">{member}</span>
                          {member === selectedProject.designer && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">Lead</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setIsDetailModalOpen(false);
                        openEditModal(selectedProject);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <PencilSimple size={18} />
                      Edit Project
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this project?')) {
                          handleDeleteProject(selectedProject.id);
                        }
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash size={18} />
                      Delete Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;
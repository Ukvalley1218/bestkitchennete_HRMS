import React, { useState, useMemo } from 'react';
import {
  Plus, MagnifyingGlass, Funnel, Eye, PencilSimple, Trash, Calendar, Users, MapPin,
  X, Clock, CheckCircle, Warning, CurrencyInr, Buildings, User, Files, ArrowRight,
  Check, Play, Pause, HandWaving, ChartLine, Timer, Download, SortAscending, SortDescending,
  List, SquaresFour, NotePencil, ChatCircle, Paperclip, Flag, Star, Lightning, Archive,
  DotsThreeVertical, CaretDown, CaretUp
} from '@phosphor-icons/react';

const ProjectManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("deadline"); // deadline, name, progress, budget, priority
  const [sortOrder, setSortOrder] = useState("asc"); // asc or desc
  const [selectedProjects, setSelectedProjects] = useState([]); // for bulk actions
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [showNotes, setShowNotes] = useState({}); // track which projects show notes
  const [projectNotes, setProjectNotes] = useState({}); // notes for each project
  const [newNote, setNewNote] = useState("");

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
      category: "Residential",
      priority: "High",
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
      files: [
        { id: 1, name: "FloorPlan_v2.pdf", type: "pdf", size: "2.4 MB" },
        { id: 2, name: "Material_Board.png", type: "image", size: "5.1 MB" },
      ],
      notes: [
        { id: 1, text: "Client prefers warm tones", date: "2024-02-10", user: "Sarah" },
        { id: 2, text: "Budget approved for custom furniture", date: "2024-02-20", user: "Mike" },
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
      category: "Commercial",
      priority: "High",
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
      files: [
        { id: 1, name: "Office_Layout.dwg", type: "drawing", size: "8.2 MB" },
      ],
      notes: [
        { id: 1, text: "Need sustainable materials", date: "2024-02-15", user: "Michael" },
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
      category: "Residential",
      priority: "Medium",
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
      files: [
        { id: 1, name: "Kitchen_Render.jpg", type: "image", size: "12.3 MB" },
        { id: 2, name: "Appliance_Specs.pdf", type: "pdf", size: "1.8 MB" },
      ],
      notes: [],
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
      category: "Hospitality",
      priority: "Medium",
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
      files: [
        { id: 1, name: "Mood_Board.pdf", type: "pdf", size: "4.5 MB" },
      ],
      notes: [
        { id: 1, text: "Client wants tropical theme", date: "2024-02-12", user: "James" },
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
      category: "Commercial",
      priority: "Medium",
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
      files: [
        { id: 1, name: "Restaurant_3D.png", type: "image", size: "18.7 MB" },
        { id: 2, name: "Lighting_Plan.pdf", type: "pdf", size: "3.2 MB" },
      ],
      notes: [
        { id: 1, text: "Client wants ambient lighting", date: "2024-02-05", user: "Lisa" },
        { id: 2, text: "Revised layout submitted", date: "2024-03-15", user: "Kumar" },
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
      category: "Residential",
      priority: "Low",
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
      files: [],
      notes: [
        { id: 1, text: "Project paused by client", date: "2024-03-10", user: "David" },
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
    category: "Residential",
    priority: "Medium",
  });

  const statusColors = {
    "In Progress": { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200", icon: Play },
    "Pending": { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200", icon: Timer },
    "Completed": { bg: "bg-green-100", text: "text-green-700", border: "border-green-200", icon: CheckCircle },
    "Design Review": { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200", icon: Eye },
    "On Hold": { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-200", icon: Pause },
  };

  const priorityColors = {
    "High": { bg: "bg-red-100", text: "text-red-700", border: "border-red-200", icon: Lightning },
    "Medium": { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200", icon: Star },
    "Low": { bg: "bg-green-100", text: "text-green-700", border: "border-green-200", icon: Flag },
  };

  const categoryColors = {
    "Residential": { bg: "bg-blue-50", text: "text-blue-600" },
    "Commercial": { bg: "bg-purple-50", text: "text-purple-600" },
    "Hospitality": { bg: "bg-green-50", text: "text-green-600" },
    "Retail": { bg: "bg-orange-50", text: "text-orange-600" },
  };

  const taskStatusColors = {
    "To Do": { bg: "bg-gray-100", text: "text-gray-600" },
    "In Progress": { bg: "bg-blue-100", text: "text-blue-600" },
    "Completed": { bg: "bg-green-100", text: "text-green-600" },
  };

  // Memoized filtered and sorted projects
  const filteredProjects = useMemo(() => {
    let result = projects.filter((project) => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.client.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = activeFilter === "all" || project.status.toLowerCase() === activeFilter.toLowerCase();
      const matchesCategory = categoryFilter === "all" || project.category === categoryFilter;
      const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
    });

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "deadline":
          comparison = new Date(a.deadline) - new Date(b.deadline);
          break;
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "progress":
          comparison = b.progress - a.progress;
          break;
        case "budget":
          comparison = (b.budgetRaw || 0) - (a.budgetRaw || 0);
          break;
        case "priority":
          const priorityOrder = { "High": 3, "Medium": 2, "Low": 1 };
          comparison = priorityOrder[b.priority] - priorityOrder[a.priority];
          break;
        case "startDate":
          comparison = new Date(a.startDate) - new Date(b.startDate);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [projects, searchTerm, activeFilter, categoryFilter, priorityFilter, sortBy, sortOrder]);

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
  const highPriorityCount = projects.filter(p => p.priority === "High" && p.status !== "Completed").length;

  // Get unique categories
  const categories = [...new Set(projects.map(p => p.category))];

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
        files: [],
        notes: [],
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
        category: "Residential",
        priority: "Medium",
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

  const handleBulkDelete = () => {
    if (selectedProjects.length === 0) return;
    if (confirm(`Are you sure you want to delete ${selectedProjects.length} projects?`)) {
      setProjects(projects.filter(p => !selectedProjects.includes(p.id)));
      setSelectedProjects([]);
    }
  };

  const handleBulkStatusChange = (newStatus) => {
    if (selectedProjects.length === 0) return;
    setProjects(projects.map(p =>
      selectedProjects.includes(p.id) ? { ...p, status: newStatus } : p
    ));
    setSelectedProjects([]);
  };

  const updateProjectStatus = (projectId, newStatus) => {
    setProjects(projects.map(p =>
      p.id === projectId ? { ...p, status: newStatus } : p
    ));
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

  const addNoteToProject = (projectId, note) => {
    if (!note.trim()) return;
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        const newNote = {
          id: Date.now(),
          text: note,
          date: new Date().toISOString().split('T')[0],
          user: "You"
        };
        return { ...p, notes: [...(p.notes || []), newNote] };
      }
      return p;
    }));
    if (selectedProject?.id === projectId) {
      setSelectedProject({
        ...selectedProject,
        notes: [...(selectedProject.notes || []), { id: Date.now(), text: note, date: new Date().toISOString().split('T')[0], user: "You" }]
      });
    }
    setNewNote("");
  };

  const exportToCSV = () => {
    const headers = ["Name", "Client", "Status", "Progress", "Budget", "Location", "Designer", "Category", "Priority", "Start Date", "Deadline"];
    const csvContent = [
      headers.join(","),
      ...filteredProjects.map(p => [
        `"${p.name}"`,
        `"${p.client}"`,
        `"${p.status}"`,
        p.progress,
        `"${p.budget}"`,
        `"${p.location}"`,
        `"${p.designer}"`,
        `"${p.category}"`,
        `"${p.priority}"`,
        p.startDate,
        p.deadline
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `projects_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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

  const getProjectHealth = (project) => {
    const daysRemaining = getDaysRemaining(project.deadline);
    const progress = project.progress;

    if (project.status === "Completed") return { status: "completed", color: "green", label: "Completed" };
    if (project.status === "On Hold") return { status: "on-hold", color: "gray", label: "On Hold" };

    if (daysRemaining < 0) return { status: "overdue", color: "red", label: "Overdue" };
    if (daysRemaining <= 7 && progress < 70) return { status: "at-risk", color: "orange", label: "At Risk" };
    if (daysRemaining <= 14 && progress < 50) return { status: "warning", color: "yellow", label: "Warning" };
    if (progress >= 70 || daysRemaining > 14) return { status: "on-track", color: "green", label: "On Track" };

    return { status: "monitor", color: "blue", label: "Monitor" };
  };

  const toggleProjectSelection = (projectId) => {
    setSelectedProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const selectAllProjects = () => {
    if (selectedProjects.length === filteredProjects.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(filteredProjects.map(p => p.id));
    }
  };

  return (
    <div className="font-[Lato] bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Project Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track all interior design projects</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
          >
            <Download size={18} />
            Export
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Plus size={20} weight="bold" />
            Add Project
          </button>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-red-500">
          <div className="flex items-center gap-2">
            <Buildings size={20} className="text-red-500" />
            <p className="text-gray-500 text-sm">Total</p>
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
            <p className="text-gray-500 text-sm">Upcoming</p>
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
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-red-400">
          <div className="flex items-center gap-2">
            <Lightning size={20} className="text-red-400" />
            <p className="text-gray-500 text-sm">High Priority</p>
          </div>
          <p className="text-2xl font-bold text-red-500 mt-1">{highPriorityCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-purple-500">
          <div className="flex items-center gap-2">
            <CurrencyInr size={20} className="text-purple-500" />
            <p className="text-gray-500 text-sm">Active Budget</p>
          </div>
          <p className="text-lg font-bold text-purple-600 mt-1">₹{(inProgressBudget / 100000).toFixed(1)}L</p>
        </div>
      </div>

      {/* Warnings */}
      {(upcomingDeadlines > 0 || overdueProjects > 0 || highPriorityCount > 0) && (
        <div className="mb-6 space-y-2">
          {overdueProjects > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <Warning size={24} className="text-red-500" weight="fill" />
              <div>
                <p className="font-medium text-red-700">{overdueProjects} project{overdueProjects > 1 ? 's' : ''} overdue</p>
                <p className="text-sm text-red-600">Immediate attention required</p>
              </div>
            </div>
          )}
          {highPriorityCount > 0 && overdueProjects === 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center gap-3">
              <Lightning size={24} className="text-orange-500" />
              <div>
                <p className="font-medium text-orange-700">{highPriorityCount} high priority project{highPriorityCount > 1 ? 's' : ''} active</p>
                <p className="text-sm text-orange-600">Requires focused attention</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Search, Filter, Sort & View Controls */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col gap-4">
          {/* Row 1: Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
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
              {/* Status Filter */}
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Status</option>
                <option value="in progress">In Progress</option>
                <option value="pending">Pending</option>
                <option value="design review">Design Review</option>
                <option value="completed">Completed</option>
                <option value="on hold">On Hold</option>
              </select>
              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {/* Priority Filter */}
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          {/* Row 2: Sort, View, Bulk Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Sort */}
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="deadline">Sort by Deadline</option>
                  <option value="name">Sort by Name</option>
                  <option value="progress">Sort by Progress</option>
                  <option value="budget">Sort by Budget</option>
                  <option value="priority">Sort by Priority</option>
                  <option value="startDate">Sort by Start Date</option>
                </select>
                <button
                  onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  title={sortOrder === "asc" ? "Ascending" : "Descending"}
                >
                  {sortOrder === "asc" ? <SortAscending size={18} /> : <SortDescending size={18} />}
                </button>
              </div>
              {/* View Toggle */}
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-red-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                >
                  <SquaresFour size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-red-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
            {/* Bulk Actions */}
            {selectedProjects.length > 0 && (
              <div className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded-lg">
                <span className="text-sm text-red-700">{selectedProjects.length} selected</span>
                <button
                  onClick={() => handleBulkStatusChange("In Progress")}
                  className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  Set In Progress
                </button>
                <button
                  onClick={() => handleBulkStatusChange("Completed")}
                  className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                >
                  Set Completed
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  Delete
                </button>
                <button
                  onClick={() => setSelectedProjects([])}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Projects Grid/List View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const daysRemaining = getDaysRemaining(project.deadline);
            const isOverdue = daysRemaining < 0 && project.status !== "Completed";
            const isUrgent = daysRemaining >= 0 && daysRemaining <= 7 && project.status !== "Completed";
            const health = getProjectHealth(project);

            return (
              <div
                key={project.id}
                className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border-2 ${
                  selectedProjects.includes(project.id) ? 'border-red-500' : 'border-transparent'
                }`}
              >
                {/* Selection Checkbox & Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedProjects.includes(project.id)}
                    onChange={() => toggleProjectSelection(project.id)}
                    className="absolute top-3 left-3 w-5 h-5 rounded border-white bg-white/20 backdrop-blur cursor-pointer"
                  />
                  {/* Badges */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[project.priority]?.bg} ${priorityColors[project.priority]?.text}`}>
                      {project.priority}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status]?.bg} ${statusColors[project.status]?.text}`}>
                      {project.status}
                    </span>
                  </div>
                  {isOverdue && (
                    <span className="absolute top-3 left-10 px-2 py-1 bg-red-500 text-white text-xs rounded-full flex items-center gap-1">
                      <Warning size={14} weight="fill" /> Overdue
                    </span>
                  )}
                  {isUrgent && !isOverdue && (
                    <span className="absolute top-3 left-10 px-2 py-1 bg-yellow-500 text-white text-xs rounded-full flex items-center gap-1">
                      <Clock size={14} /> Urgent
                    </span>
                  )}
                  {/* Health indicator */}
                  <div className={`absolute bottom-3 left-3 px-2 py-1 rounded text-xs font-medium ${
                    health.color === 'green' ? 'bg-green-500 text-white' :
                    health.color === 'red' ? 'bg-red-500 text-white' :
                    health.color === 'orange' ? 'bg-orange-500 text-white' :
                    health.color === 'yellow' ? 'bg-yellow-500 text-white' :
                    health.color === 'gray' ? 'bg-gray-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    {health.label}
                  </div>
                </div>

                {/* Project Header */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg line-clamp-1">{project.name}</h3>
                      <p className="text-sm text-gray-500">{project.client}</p>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-0.5 rounded text-xs ${categoryColors[project.category]?.bg || 'bg-gray-100'} ${categoryColors[project.category]?.text || 'text-gray-600'}`}>
                      {project.category}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-gray-500">{project.location}</span>
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

                  {/* Files & Notes Count */}
                  <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
                    {project.files?.length > 0 && (
                      <div className="flex items-center gap-1">
                        <Paperclip size={14} />
                        <span>{project.files.length} file{project.files.length > 1 ? 's' : ''}</span>
                      </div>
                    )}
                    {project.notes?.length > 0 && (
                      <div className="flex items-center gap-1">
                        <ChatCircle size={14} />
                        <span>{project.notes.length} note{project.notes.length > 1 ? 's' : ''}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span className={isOverdue ? 'text-red-500 font-medium' : ''}>
                        {isOverdue ? `${Math.abs(daysRemaining)}d overdue` : `${daysRemaining}d left`}
                      </span>
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
      ) : (
        /* List View */
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-1 flex items-center">
              <input
                type="checkbox"
                checked={selectedProjects.length === filteredProjects.length && filteredProjects.length > 0}
                onChange={selectAllProjects}
                className="w-4 h-4 rounded"
              />
            </div>
            <div className="col-span-3">Project</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1">Priority</div>
            <div className="col-span-2">Progress</div>
            <div className="col-span-1">Deadline</div>
            <div className="col-span-1">Budget</div>
            <div className="col-span-1">Actions</div>
          </div>
          {/* Rows */}
          {filteredProjects.map((project) => {
            const daysRemaining = getDaysRemaining(project.deadline);
            const isOverdue = daysRemaining < 0 && project.status !== "Completed";
            const health = getProjectHealth(project);

            return (
              <div
                key={project.id}
                className={`grid grid-cols-12 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  selectedProjects.includes(project.id) ? 'bg-red-50' : ''
                }`}
              >
                <div className="col-span-1 flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedProjects.includes(project.id)}
                    onChange={() => toggleProjectSelection(project.id)}
                    className="w-4 h-4 rounded"
                  />
                </div>
                <div className="col-span-3 flex items-center gap-3">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{project.name}</p>
                    <p className="text-xs text-gray-500">{project.client}</p>
                  </div>
                </div>
                <div className="col-span-2 flex items-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[project.status]?.bg} ${statusColors[project.status]?.text}`}>
                    {project.status}
                  </span>
                </div>
                <div className="col-span-1 flex items-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[project.priority]?.bg} ${priorityColors[project.priority]?.text}`}>
                    {project.priority}
                  </span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 w-10">{project.progress}%</span>
                </div>
                <div className="col-span-1 flex items-center">
                  <span className={`text-sm ${isOverdue ? 'text-red-500 font-medium' : 'text-gray-600'}`}>
                    {isOverdue ? `${Math.abs(daysRemaining)}d over` : `${daysRemaining}d`}
                  </span>
                </div>
                <div className="col-span-1 flex items-center">
                  <span className="text-sm font-medium text-gray-800">{project.budget}</span>
                </div>
                <div className="col-span-1 flex items-center gap-1">
                  <button
                    onClick={() => openDetailModal(project)}
                    className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-blue-600"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => openEditModal(project)}
                    className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-green-600"
                  >
                    <PencilSimple size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-red-600"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Buildings size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No projects found matching your criteria.</p>
          <button
            onClick={() => { setActiveFilter("all"); setSearchTerm(""); setCategoryFilter("all"); setPriorityFilter("all"); }}
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
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget (₹)</label>
                  <input
                    type="number"
                    value={newProject.budget}
                    onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter budget"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Retail">Retail</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={newProject.priority}
                    onChange={(e) => setNewProject({ ...newProject, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
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
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Members (comma-separated)</label>
                  <input
                    type="text"
                    value={newProject.team}
                    onChange={(e) => setNewProject({ ...newProject, team: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="e.g., John Doe, Jane Smith"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                    rows={3}
                    placeholder="Enter project description"
                  />
                </div>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Retail">Retail</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={editingProject.priority}
                    onChange={(e) => setEditingProject({ ...editingProject, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
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
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Members (comma-separated)</label>
                  <input
                    type="text"
                    value={Array.isArray(editingProject.team) ? editingProject.team.join(", ") : editingProject.team}
                    onChange={(e) => setEditingProject({ ...editingProject, team: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
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
              <div className="flex items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-gray-800">{selectedProject.name}</h2>
                    <span className={`px-2 py-0.5 rounded text-xs ${categoryColors[selectedProject.category]?.bg || 'bg-gray-100'} ${categoryColors[selectedProject.category]?.text || 'text-gray-600'}`}>
                      {selectedProject.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs ${priorityColors[selectedProject.priority]?.bg} ${priorityColors[selectedProject.priority]?.text}`}>
                      {selectedProject.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{selectedProject.client}</p>
                </div>
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

                  {/* Files */}
                  {selectedProject.files?.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-800 mb-3">Files</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedProject.files.map((file) => (
                          <div key={file.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Files size={20} className="text-gray-400" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                              <p className="text-xs text-gray-500">{file.size}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Notes</h3>
                    <div className="space-y-2 mb-3">
                      {selectedProject.notes?.map((note) => (
                        <div key={note.id} className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                          <NotePencil size={16} className="text-yellow-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-700">{note.text}</p>
                            <p className="text-xs text-gray-500 mt-1">{note.user} • {note.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Add a note..."
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      <button
                        onClick={() => addNoteToProject(selectedProject.id, newNote)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                      >
                        Add
                      </button>
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
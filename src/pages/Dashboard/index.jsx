import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, BookOpen, Settings, LogOut, User, Bell, BarChart2, 
  FileText, HelpCircle, Truck, Radio, Stethoscope, CreditCard,
  Shield, School, Smartphone, Database, Award, Clock,
  Car, Wrench, Book, Heart, DollarSign, Code, Folder, MessageCircle
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState('all');

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;

  // Service categories with icons only for compact display
  const serviceCategories = [
    { 
      id: 'all', 
      name: 'All Services', 
      icon: Home, 
      color: 'bg-gray-800', 
      textColor: 'text-gray-800',
      tooltip: 'View all services'
    },
    { 
      id: 'automotive', 
      name: 'Automotive', 
      icon: Car, 
      color: 'bg-red-800', 
      textColor: 'text-red-800',
      tooltip: 'Car audio, customization, truck services'
    },
    { 
      id: 'education', 
      name: 'Education', 
      icon: Book, 
      color: 'bg-amber-600', 
      textColor: 'text-amber-600',
      tooltip: 'Home schooling, CDL training, licensing'
    },
    { 
      id: 'healthcare', 
      name: 'Healthcare', 
      icon: Heart, 
      color: 'bg-gray-300', 
      textColor: 'text-gray-700',
      tooltip: 'Healthcare licensing, compliance'
    },
    { 
      id: 'financial', 
      name: 'Financial', 
      icon: DollarSign, 
      color: 'bg-emerald-700', 
      textColor: 'text-emerald-700',
      tooltip: 'Financial services, GRC, accounts'
    },
    { 
      id: 'technology', 
      name: 'Technology', 
      icon: Code, 
      color: 'bg-blue-800', 
      textColor: 'text-blue-800',
      tooltip: 'Software & app development'
    },
    { 
      id: 'compliance', 
      name: 'Compliance', 
      icon: Folder, 
      color: 'bg-purple-800', 
      textColor: 'text-purple-800',
      tooltip: 'Document compliance tracking'
    },
    { 
      id: 'communications', 
      name: 'Communications', 
      icon: MessageCircle, 
      color: 'bg-indigo-800', 
      textColor: 'text-indigo-800',
      tooltip: 'HAM Radio, authorized accounts'
    }
  ];

  // Sample services data
  const services = [
    {
      id: 1,
      name: 'Car Audio Installation',
      category: 'automotive',
      progress: 65,
      status: 'In Progress',
      deadline: '2024-02-15',
      priority: 'medium'
    },
    {
      id: 2,
      name: 'Home Healthcare License',
      category: 'healthcare',
      progress: 30,
      status: 'Document Review',
      deadline: '2024-03-01',
      priority: 'high'
    },
    {
      id: 3,
      name: 'CDL Training Program',
      category: 'education',
      progress: 100,
      status: 'Completed',
      deadline: '2024-01-10',
      priority: 'completed'
    },
    {
      id: 4,
      name: 'Financial Compliance GRC',
      category: 'financial',
      progress: 45,
      status: 'In Progress',
      deadline: '2024-02-28',
      priority: 'high'
    },
    {
      id: 5,
      name: 'Mobile App Development',
      category: 'technology',
      progress: 20,
      status: 'Planning',
      deadline: '2024-04-15',
      priority: 'low'
    },
    {
      id: 6,
      name: 'HAM Radio License',
      category: 'communications',
      progress: 80,
      status: 'Exam Preparation',
      deadline: '2024-02-20',
      priority: 'medium'
    }
  ];

  // Filter services based on active category
  const filteredServices = activeService === 'all' 
    ? services 
    : services.filter(service => service.category === activeService);

  // Compliance tracking
  const complianceStats = [
    { name: 'Documents in Order', value: '24', status: 'compliant' },
    { name: 'Requires Attention', value: '3', status: 'warning' },
    { name: 'Out of Compliance', value: '1', status: 'critical' },
    { name: 'Renewals Due', value: '5', status: 'upcoming' }
  ];

  // Creditor Academy progress
  const academyProgress = [
    { level: 'Foundation', progress: 100, status: 'Completed', credits: 50 },
    { level: 'Intermediate', progress: 75, status: 'In Progress', credits: 75 },
    { level: 'Advanced', progress: 0, status: 'Locked', credits: 150 },
    { level: 'Premium', progress: 0, status: 'Locked', credits: 300 }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Completed') return 'text-emerald-600';
    if (status === 'In Progress') return 'text-amber-600';
    if (status === 'Document Review') return 'text-blue-600';
    if (status === 'Requires Attention') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-black text-white">
          <div className="flex items-center justify-center h-16 px-4 bg-gray-900 border-b border-amber-600">
            <Award className="h-8 w-8 text-amber-500 mr-2" />
            <h1 className="text-xl font-bold text-amber-500">HaveDominion</h1>
          </div>
          
          <div className="flex-1 flex flex-col overflow-y-auto py-4">
            {/* Company Vision */}
            <div className="px-4 mb-6">
              <p className="text-sm text-gray-300 mb-2">
                Empowering individuals through comprehensive service management and private career development.
              </p>
              <div className="h-px bg-amber-600 opacity-50"></div>
            </div>

            <nav className="flex-1 px-2 space-y-1">
              <Link to="/dashboard" className="flex items-center px-4 py-3 text-sm font-medium rounded-md bg-gray-800 text-amber-400">
                <Home className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
              
              <div className="px-4 pt-4 pb-2">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">Services</span>
              </div>
              
              <Link to="/dashboard/services" className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-amber-400 rounded-md">
                <BookOpen className="mr-3 h-5 w-5" />
                My Services
              </Link>
              
              <Link to="/dashboard/compliance" className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-amber-400 rounded-md">
                <Shield className="mr-3 h-5 w-5" />
                Compliance Tracker
              </Link>

              <div className="px-4 pt-4 pb-2">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">Career Development</span>
              </div>

              <Link to="/dashboard/academy" className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-amber-400 rounded-md">
                <School className="mr-3 h-5 w-5" />
                Creditor Academy
              </Link>

              <Link to="/dashboard/progress" className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-amber-400 rounded-md">
                <BarChart2 className="mr-3 h-5 w-5" />
                Progress Tracking
              </Link>

              <Link to="/dashboard/profile" className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-amber-400 rounded-md">
                <User className="mr-3 h-5 w-5" />
                Profile & Documents
              </Link>

              <Link to="/dashboard/settings" className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-amber-400 rounded-md">
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Link>
            </nav>
          </div>

          <div className="p-4 border-t border-gray-800">
            <div className="mb-3 p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-amber-400">Creditor Academy Credits</span>
                <span className="text-sm font-bold text-white">125</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-crimson hover:bg-red-700 rounded-md transition-colors"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Service Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage your services and track progress in one place
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-amber-600 relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name || user.email}</p>
                  <p className="text-xs text-amber-600">125 academy credits</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-amber-100 border-2 border-amber-500 flex items-center justify-center text-amber-700 font-bold">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Compact Service Category Filter - Icons Only */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-3">
              <span className="text-sm font-medium text-gray-700 mr-4">Services:</span>
              <div className="flex space-x-1 overflow-x-auto flex-1">
                {serviceCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveService(category.id)}
                      className={`flex flex-col items-center p-2 rounded-lg min-w-16 transition-all ${
                        activeService === category.id
                          ? `${category.color} text-white shadow-md`
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                      title={category.tooltip}
                    >
                      <IconComponent className="h-5 w-5 mb-1" />
                      <span className="text-xs font-medium truncate max-w-12">
                        {category.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          {/* Welcome & Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6 border-l-4 border-amber-500">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Welcome back, {user.name || 'Private Citizen'}!
                  </h2>
                  <p className="text-gray-600 mb-4">
                    You're making great progress toward your goals. {filteredServices.filter(s => s.status === 'Completed').length} services completed, {filteredServices.filter(s => s.status === 'In Progress').length} in progress.
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                  <Award className="h-4 w-4" />
                  <span>125 Credits</span>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-amber-600 mr-1" />
                  <span className="text-sm text-gray-600">3 deadlines this month</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-emerald-600 mr-1" />
                  <span className="text-sm text-gray-600">24 compliant documents</span>
                </div>
              </div>
            </div>

            {/* Compliance Quick View */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="h-5 w-5 text-amber-600 mr-2" />
                Compliance Status
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {complianceStats.map((stat, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${
                    stat.status === 'critical' ? 'bg-red-50 border-red-200' :
                    stat.status === 'warning' ? 'bg-amber-50 border-amber-200' :
                    stat.status === 'upcoming' ? 'bg-blue-50 border-blue-200' :
                    'bg-emerald-50 border-emerald-200'
                  }`}>
                    <p className="text-sm text-gray-600">{stat.name}</p>
                    <p className={`text-xl font-bold ${
                      stat.status === 'critical' ? 'text-red-700' :
                      stat.status === 'warning' ? 'text-amber-700' :
                      stat.status === 'upcoming' ? 'text-blue-700' :
                      'text-emerald-700'
                    }`}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Active Services */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Active Services</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-amber-600 bg-amber-50 px-2 py-1 rounded">
                      {filteredServices.length} active
                    </span>
                    <span className="text-sm text-gray-500">
                      {serviceCategories.find(cat => cat.id === activeService)?.name}
                    </span>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {filteredServices.map((service) => {
                    const category = serviceCategories.find(cat => cat.id === service.category);
                    const IconComponent = category?.icon;
                    const isHomeHealthcare = service.name === 'Home Healthcare License';
                    return (
                      <div 
                        key={service.id} 
                        className={`px-6 py-4 transition-colors ${isHomeHealthcare ? 'bg-gray-100 hover:bg-gray-200' : 'hover:bg-gray-50'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${category?.color} text-white`}>
                              <IconComponent className="h-6 w-6" />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">{service.name}</p>
                              <p className={`text-sm font-medium ${getStatusColor(service.status)}`}>
                                {service.status}
                              </p>
                              <p className="text-xs text-gray-500">Due: {service.deadline}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="w-32">
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Progress</span>
                                <span>{service.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${category?.color}`}
                                  style={{ width: `${service.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(service.priority)}`}>
                              {service.priority}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Creditor Academy Progress */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-amber-500 to-amber-600">
                <h3 className="text-lg font-medium text-white flex items-center">
                  <School className="h-5 w-5 mr-2" />
                  Creditor Academy
                </h3>
                <p className="text-amber-100 text-sm">Your path to private career</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {academyProgress.map((level, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-amber-300 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{level.level}</span>
                        <span className={`text-sm font-medium ${
                          level.status === 'Completed' ? 'text-emerald-600' :
                          level.status === 'In Progress' ? 'text-amber-600' :
                          'text-gray-400'
                        }`}>
                          {level.status}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className={`h-2 rounded-full ${
                            level.status === 'Completed' ? 'bg-emerald-500' :
                            level.status === 'In Progress' ? 'bg-amber-500' :
                            'bg-gray-300'
                          }`}
                          style={{ width: `${level.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{level.progress}% Complete</span>
                        <span>{level.credits} credits</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Continue Learning
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
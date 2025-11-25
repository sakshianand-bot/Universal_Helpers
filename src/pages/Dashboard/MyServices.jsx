import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, Plus, Clock, CheckCircle, AlertCircle, 
  ChevronRight, Download, Share2, MoreHorizontal, 
  Car, Wrench, Book, Heart, DollarSign, Code, Folder, MessageCircle
} from 'lucide-react';

const MyServices = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample services data
  const services = [
    {
      id: 1,
      name: 'Car Audio Installation',
      category: 'automotive',
      status: 'in-progress',
      progress: 65,
      nextStep: 'Schedule installation',
      dueDate: '2024-02-15',
      provider: 'AutoSound Pro',
      lastUpdated: '2 days ago'
    },
    {
      id: 2,
      name: 'Home Healthcare License',
      category: 'healthcare',
      status: 'pending',
      progress: 30,
      nextStep: 'Submit documents',
      dueDate: '2024-03-01',
      provider: 'HealthCare Licensing Board',
      lastUpdated: '1 week ago'
    },
    {
      id: 3,
      name: 'CDL Training Program',
      category: 'education',
      status: 'completed',
      progress: 100,
      nextStep: 'Download certificate',
      dueDate: '2024-01-10',
      provider: 'ProDriver Academy',
      lastUpdated: '2 weeks ago'
    },
    {
      id: 4,
      name: 'Financial Compliance GRC',
      category: 'financial',
      status: 'in-progress',
      progress: 45,
      nextStep: 'Review compliance report',
      dueDate: '2024-02-28',
      provider: 'FinanceSecure',
      lastUpdated: '3 days ago'
    },
    {
      id: 5,
      name: 'Mobile App Development',
      category: 'technology',
      status: 'pending',
      progress: 20,
      nextStep: 'Initial consultation',
      dueDate: '2024-04-15',
      provider: 'TechSolutions Inc.',
      lastUpdated: '5 days ago'
    },
    {
      id: 6,
      name: 'HAM Radio License',
      category: 'communications',
      status: 'in-progress',
      progress: 80,
      nextStep: 'Schedule exam',
      dueDate: '2024-02-20',
      provider: 'FCC Licensing',
      lastUpdated: '1 day ago'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services', icon: <Folder className="h-4 w-4 mr-2" /> },
    { id: 'automotive', name: 'Automotive', icon: <Car className="h-4 w-4 mr-2" /> },
    { id: 'healthcare', name: 'Healthcare', icon: <Heart className="h-4 w-4 mr-2" /> },
    { id: 'education', name: 'Education', icon: <Book className="h-4 w-4 mr-2" /> },
    { id: 'financial', name: 'Financial', icon: <DollarSign className="h-4 w-4 mr-2" /> },
    { id: 'technology', name: 'Technology', icon: <Code className="h-4 w-4 mr-2" /> },
    { id: 'communications', name: 'Communications', icon: <MessageCircle className="h-4 w-4 mr-2" /> },
  ];

  const statuses = [
    { id: 'all', name: 'All Status', count: services.length },
    { id: 'in-progress', name: 'In Progress', count: services.filter(s => s.status === 'in-progress').length },
    { id: 'pending', name: 'Pending', count: services.filter(s => s.status === 'pending').length },
    { id: 'completed', name: 'Completed', count: services.filter(s => s.status === 'completed').length },
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeFilter === 'all' || service.category === activeFilter;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'in-progress':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">In Progress</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">Pending</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">Completed</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Unknown</span>;
    }
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : <Folder className="h-4 w-4 mr-2" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Services</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your active services and track their progress
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/services/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            New Service
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-white shadow rounded-lg p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {statuses.map((status) => (
              <button
                key={status.id}
                onClick={() => setActiveFilter(status.id === 'all' ? 'all' : status.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap ${
                  activeFilter === status.id || (status.id === 'all' && activeFilter === 'all')
                    ? 'bg-amber-100 text-amber-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {status.name} ({status.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">Categories</h3>
            </div>
            <nav className="p-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                    activeFilter === category.id
                      ? 'bg-amber-50 text-amber-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-2">
              <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                <Download className="h-4 w-4 mr-2 text-gray-500" />
                Export Services
              </button>
              <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                <Share2 className="h-4 w-4 mr-2 text-gray-500" />
                Share Access
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {filteredServices.length > 0 ? (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {filteredServices.map((service) => (
                  <li key={service.id} className="hover:bg-gray-50">
                    <Link to={`/services/${service.id}`} className="block">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                              {getCategoryIcon(service.category)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-amber-600">
                                {service.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {service.provider}
                              </div>
                            </div>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            {getStatusBadge(service.status)}
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              <p>Due {service.dueDate}</p>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <div className="w-32 mr-2">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-amber-500 h-2 rounded-full" 
                                  style={{ width: `${service.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            <span>{service.progress}%</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium text-gray-900">Next: </span>
                            <span className="ml-1">{service.nextStep}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center bg-white py-16 rounded-lg shadow">
              <Folder className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No services found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery 
                  ? 'No services match your search. Try different keywords.'
                  : 'Get started by adding a new service.'}
              </p>
              <div className="mt-6">
                <Link
                  to="/services/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" />
                  New Service
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyServices;

import React, { useState } from 'react';
import { 
  Search, Filter, Plus, AlertCircle, CheckCircle2, Clock, 
  FileText, Download, Upload, Shield, AlertTriangle, CheckCircle, XCircle, 
  ChevronDown, ChevronRight, MoreVertical, Trash2, Edit, Eye, Share2
} from 'lucide-react';

const ComplianceTracker = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedItems, setExpandedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample compliance items
  const complianceItems = [
    {
      id: 1,
      title: 'Business License',
      category: 'legal',
      status: 'valid',
      expiryDate: '2024-12-31',
      lastVerified: '2023-11-20',
      documents: [
        { id: 101, name: 'Business_License_2023.pdf', uploaded: '2023-01-15', status: 'approved' },
        { id: 102, name: 'Renewal_Application_2024.pdf', uploaded: '2023-11-20', status: 'pending' }
      ],
      requirements: [
        { id: 201, description: 'Renewal application', status: 'completed' },
        { id: 202, description: 'Fee payment', status: 'pending' },
        { id: 203, description: 'Inspection', status: 'not-started' }
      ]
    },
    {
      id: 2,
      title: 'Health and Safety Certification',
      category: 'safety',
      status: 'expiring',
      expiryDate: '2023-12-15',
      lastVerified: '2023-06-10',
      documents: [
        { id: 103, name: 'Safety_Certificate_2023.pdf', uploaded: '2023-06-10', status: 'approved' },
        { id: 104, name: 'Inspection_Report_2023.pdf', uploaded: '2023-06-10', status: 'approved' }
      ],
      requirements: [
        { id: 204, description: 'Annual inspection', status: 'pending' },
        { id: 205, description: 'Staff training', status: 'in-progress' }
      ]
    },
    {
      id: 3,
      title: 'Data Protection Compliance',
      category: 'privacy',
      status: 'expired',
      expiryDate: '2023-09-30',
      lastVerified: '2022-10-15',
      documents: [
        { id: 105, name: 'DPA_Compliance_2022.pdf', uploaded: '2022-10-15', status: 'expired' },
        { id: 106, name: 'Privacy_Policy_v2.pdf', uploaded: '2023-01-20', status: 'approved' }
      ],
      requirements: [
        { id: 206, description: 'Update privacy policy', status: 'not-started' },
        { id: 207, description: 'Staff training', status: 'not-started' },
        { id: 208, description: 'Audit', status: 'not-started' }
      ]
    },
    {
      id: 4,
      title: 'Professional Indemnity Insurance',
      category: 'insurance',
      status: 'valid',
      expiryDate: '2024-06-30',
      lastVerified: '2023-07-01',
      documents: [
        { id: 107, name: 'Insurance_Certificate_2023.pdf', uploaded: '2023-07-01', status: 'approved' },
        { id: 108, name: 'Policy_Document_2023.pdf', uploaded: '2023-07-01', status: 'approved' }
      ],
      requirements: []
    }
  ];

  const categories = [
    { id: 'all', name: 'All Items', count: complianceItems.length },
    { id: 'legal', name: 'Legal', count: complianceItems.filter(item => item.category === 'legal').length },
    { id: 'safety', name: 'Health & Safety', count: complianceItems.filter(item => item.category === 'safety').length },
    { id: 'privacy', name: 'Data Privacy', count: complianceItems.filter(item => item.category === 'privacy').length },
    { id: 'insurance', name: 'Insurance', count: complianceItems.filter(item => item.category === 'insurance').length },
  ];

  const statuses = {
    'valid': { text: 'Valid', color: 'bg-emerald-100 text-emerald-800' },
    'expiring': { text: 'Expiring Soon', color: 'bg-amber-100 text-amber-800' },
    'expired': { text: 'Expired', color: 'bg-red-100 text-red-800' },
    'pending': { text: 'Pending Review', color: 'bg-blue-100 text-blue-800' }
  };

  const documentStatuses = {
    'approved': { icon: CheckCircle, color: 'text-emerald-500' },
    'pending': { icon: Clock, color: 'text-amber-500' },
    'expired': { icon: AlertTriangle, color: 'text-red-500' }
  };

  const requirementStatuses = {
    'completed': { text: 'Completed', color: 'bg-emerald-100 text-emerald-800' },
    'in-progress': { text: 'In Progress', color: 'bg-blue-100 text-blue-800' },
    'pending': { text: 'Pending', color: 'bg-amber-100 text-amber-800' },
    'not-started': { text: 'Not Started', color: 'bg-gray-100 text-gray-800' }
  };

  const filteredItems = complianceItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeTab === 'all' || item.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpiryBadge = (expiryDate, status) => {
    const days = getDaysUntilExpiry(expiryDate);
    
    if (status === 'expired') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="h-3.5 w-3.5 mr-1" />
          Expired
        </span>
      );
    }
    
    if (days <= 30) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
          <AlertCircle className="h-3.5 w-3.5 mr-1" />
          Expires in {days} {days === 1 ? 'day' : 'days'}
        </span>
      );
    }
    
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
        <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
        {status === 'valid' ? 'Valid' : `Expires in ${days} days`}
      </span>
    );
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'legal':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'safety':
        return <Shield className="h-5 w-5 text-amber-500" />;
      case 'privacy':
        return <Eye className="h-5 w-5 text-purple-500" />;
      case 'insurance':
        return <Shield className="h-5 w-5 text-emerald-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Tracker</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track all your compliance requirements in one place
          </p>
        </div>
        <div className="mt-4 sm:mt-0 space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
            <Upload className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
            Upload Document
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Add Requirement
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {complianceItems.map((item) => (
          <div key={item.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {getCategoryIcon(item.category)}
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {item.title}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {new Date(item.expiryDate).toLocaleDateString()}
                      </div>
                      <div className="ml-2">
                        {getExpiryBadge(item.expiryDate, item.status)}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {categories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
                {tab.count > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Search and Filter */}
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-xs w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                placeholder="Search requirements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="mt-3 sm:mt-0 flex items-center space-x-3">
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-left text-base font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  defaultValue="all"
                >
                  <option value="all">All Status</option>
                  <option value="valid">Valid</option>
                  <option value="expiring">Expiring Soon</option>
                  <option value="expired">Expired</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                <Filter className="h-4 w-4 mr-2 text-gray-500" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Compliance Items List */}
        <ul className="divide-y divide-gray-200">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <li key={item.id} className="hover:bg-gray-50">
                <div 
                  className="px-4 py-4 sm:px-6 cursor-pointer"
                  onClick={() => toggleItem(item.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {expandedItems.includes(item.id) ? (
                        <ChevronDown className="h-5 w-5 text-gray-500 mr-3" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500 mr-3" />
                      )}
                      <div className="flex-shrink-0">
                        {getCategoryIcon(item.category)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-amber-600">{item.title}</div>
                        <div className="flex flex-wrap items-center mt-1">
                          <span className="text-sm text-gray-500 mr-3">
                            Expires: {new Date(item.expiryDate).toLocaleDateString()}
                          </span>
                          <span className="text-sm text-gray-500">
                            Last verified: {new Date(item.lastVerified).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {getExpiryBadge(item.expiryDate, item.status)}
                      <button className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedItems.includes(item.id) && (
                  <div className="px-4 pb-4 sm:px-12 bg-gray-50">
                    {/* Documents Section */}
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Documents</h4>
                      <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                          {item.documents.map((doc) => {
                            const StatusIcon = documentStatuses[doc.status].icon;
                            return (
                              <li key={doc.id} className="px-4 py-3 sm:px-6">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <FileText className="h-5 w-5 text-gray-400 mr-3" />
                                    <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                                    <span className="ml-2 text-xs text-gray-500">
                                      Uploaded: {new Date(doc.uploaded).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <StatusIcon 
                                      className={`h-5 w-5 ${documentStatuses[doc.status].color} mr-2`} 
                                    />
                                    <span className="text-sm capitalize text-gray-500">
                                      {doc.status}
                                    </span>
                                    <button className="ml-4 text-amber-600 hover:text-amber-800">
                                      <Download className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>

                    {/* Requirements Section */}
                    {item.requirements.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements</h4>
                        <div className="bg-white shadow overflow-hidden sm:rounded-md">
                          <ul className="divide-y divide-gray-200">
                            {item.requirements.map((req) => (
                              <li key={req.id} className="px-4 py-3 sm:px-6">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <CheckCircle2 className="h-5 w-5 text-gray-400 mr-3" />
                                    <p className="text-sm font-medium text-gray-900">{req.description}</p>
                                  </div>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${requirementStatuses[req.status].color}`}>
                                    {requirementStatuses[req.status].text}
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-6 flex justify-end space-x-3">
                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                        <Edit className="-ml-1 mr-2 h-4 w-4" />
                        Edit
                      </button>
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                        <Upload className="-ml-1 mr-2 h-4 w-4" />
                        Upload Document
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))
          ) : (
            <li className="px-4 py-6 sm:px-6 text-center">
              <div className="text-gray-500">No compliance items found</div>
              <div className="mt-2">
                <button className="text-amber-600 hover:text-amber-800 font-medium">
                  Add your first compliance requirement
                </button>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ComplianceTracker;

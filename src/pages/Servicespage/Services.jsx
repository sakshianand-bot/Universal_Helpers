import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ServiceNeighborhood() {
  const [activeBlock, setActiveBlock] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userQuestion, setUserQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const neighborhoodBlocks = [
    // HAM Radio Licensing Support
    {
      id: 'ham-radio',
      title: 'HAM Radio Licensing',
      color: '#FF8C00',
      icon: '📡',
      description: 'Get licensed and master amateur radio communication',
      buildings: [
        { 
          name: 'Technician License', 
          available: true, 
          time: 'Self-Paced',
          description: 'Entry-level HAM radio licensing course - 35 question exam preparation',
          provider: 'Have Dominion',
          rating: '5.0/5',
          level: 'Beginner',
          features: ['FCC Exam Prep', 'Basic Operations', 'Study Resources', 'Official Certification']
        },
        { 
          name: 'General License', 
          available: true, 
          time: 'Self-Paced',
          description: 'Intermediate HAM radio licensing with extended privileges',
          provider: 'Have Dominion',
          rating: '4.9/5',
          level: 'Intermediate',
          features: ['HF Band Access', 'Advanced Theory', 'Practical Skills', 'Emergency Comms']
        },
        { 
          name: 'Amateur Extra', 
          available: true, 
          time: 'Self-Paced',
          description: 'Advanced HAM radio certification with all frequency privileges',
          provider: 'Have Dominion',
          rating: '5.0/5',
          level: 'Advanced',
          features: ['Expert Level', 'Mentorship', 'All Privileges', 'Leadership Training']
        },
        { 
          name: 'Practical Training', 
          available: true, 
          time: 'Flexible',
          description: 'Hands-on radio operation practice for real-world scenarios',
          provider: 'Have Dominion',
          rating: '4.8/5',
          features: ['Equipment Setup', 'Emergency Protocols', 'Field Operations', 'Network Building']
        }
      ]
    },

    // Private Membership & Coaching Center
    {
      id: 'private-membership',
      title: 'Private Membership',
      color: '#FFA500',
      icon: '🎯',
      description: 'Exclusive coaching and private sector transition support',
      buildings: [
        { 
          name: 'Creditor Academy', 
          available: true, 
          time: '24/7 Access',
          description: 'Structured financial education community with masterclasses',
          provider: 'Have Dominion',
          rating: '5.0/5',
          features: ['Masterclass Access', 'Private Group Sessions', 'Step-by-step Pathways', 'Network Building']
        },
        { 
          name: 'Business Structure', 
          available: true, 
          time: 'By Appointment',
          description: 'Private business entity setup and compliance guidance',
          provider: 'Have Dominion',
          rating: '4.9/5',
          features: ['Entity Formation', 'Contract Setup', 'Legal Compliance', 'Private Sector Transition']
        },
        { 
          name: 'Credit Building', 
          available: true, 
          time: 'Self-Paced',
          description: 'Advanced credit enhancement and optimization strategies',
          provider: 'Have Dominion',
          rating: '4.8/5',
          features: ['Credit Repair', 'Score Optimization', 'Leverage Strategies', 'Monitoring']
        },
        { 
          name: 'Private Contracting', 
          available: true, 
          time: 'Consultation',
          description: 'Complete transition to private sector contracting',
          provider: 'Have Dominion',
          rating: '5.0/5',
          features: ['Contract Templates', 'Negotiation Training', 'Private Agreements', 'Client Acquisition']
        }
      ]
    },

    // Financial Homeschooling / Private Coaching
    {
      id: 'financial-coaching',
      title: 'Financial Coaching',
      color: '#FF8C00',
      icon: '💰',
      description: 'One-on-one financial education and private banking mastery',
      buildings: [
        { 
          name: 'Credit Mastery', 
          available: true, 
          time: '1-on-1 Sessions',
          description: 'Complete credit building and management system',
          provider: 'Have Dominion',
          rating: '5.0/5',
          features: ['Credit Analysis', 'Building Strategies', 'Maintenance Plans', 'Dispute Resolution']
        },
        { 
          name: 'Private Banking', 
          available: true, 
          time: 'Consultation',
          description: 'Access and utilize private banking systems effectively',
          provider: 'Have Dominion',
          rating: '4.9/5',
          features: ['Banking Fundamentals', 'Private Lending', 'Asset Protection', 'Wealth Preservation']
        },
        { 
          name: 'Smart Borrowing', 
          available: true, 
          time: 'Strategy Sessions',
          description: 'Intelligent borrowing and strategic repayment systems',
          provider: 'Have Dominion',
          rating: '4.8/5',
          features: ['Loan Optimization', 'Debt Management', 'Leverage Strategies', 'Risk Assessment']
        },
        { 
          name: 'Financial Independence', 
          available: true, 
          time: 'Guided Program',
          description: 'Achieve complete financial independence and control',
          provider: 'Have Dominion',
          rating: '5.0/5',
          features: ['Wealth Building', 'Passive Income', 'Asset Allocation', 'Legacy Planning']
        }
      ]
    },

    // Authorized User Tradelines
    {
      id: 'tradelines',
      title: 'Credit Tradelines',
      color: '#D2691E',
      icon: '📈',
      description: 'Boost your credit profile with established credit lines',
      buildings: [
        { 
          name: 'AU Tradeline Setup', 
          available: true, 
          time: '24-48 Hours',
          description: 'Get added to well-established credit accounts instantly',
          provider: 'Have Dominion',
          rating: '4.9/5',
          features: ['Quick Processing', 'Quality Accounts', 'Immediate Impact', 'Secure Process']
        },
        { 
          name: 'Credit Profile Review', 
          available: true, 
          time: 'Consultation',
          description: 'Comprehensive credit analysis and custom strategy development',
          provider: 'Have Dominion',
          rating: '5.0/5',
          features: ['Full Analysis', 'Custom Strategy', 'Action Plan', 'Progress Tracking']
        },
        { 
          name: 'Score Optimization', 
          available: true, 
          time: 'Ongoing Support',
          description: 'Continuous credit improvement monitoring and adjustment',
          provider: 'Have Dominion',
          rating: '4.8/5',
          features: ['Monthly Monitoring', 'Strategy Adjustments', 'Progress Reports', 'Expert Guidance']
        },
        { 
          name: 'Business Credit Building', 
          available: true, 
          time: 'Setup + Coaching',
          description: 'Establish and build strong business credit profiles',
          provider: 'Have Dominion',
          rating: '4.9/5',
          features: ['Business Setup', 'Credit Establishment', 'Lending Access', 'Growth Funding']
        }
      ]
    },

    // Document & Compliance Management
    {
      id: 'documents',
      title: 'Document Management',
      color: '#D2691E',
      icon: '📋',
      description: 'Secure document storage and compliance tracking system',
      buildings: [
        { 
          name: 'Document Vault', 
          available: true, 
          time: '24/7',
          description: 'Secure encrypted cloud storage for all important documents',
          provider: 'Have Dominion',
          rating: '4.9/5',
          features: ['Military-grade Encryption', 'Mobile Access', 'Unlimited Uploads', 'Automated Backup']
        },
        { 
          name: 'Compliance Tracker', 
          available: true, 
          time: '24/7',
          description: 'Automated compliance tracking and deadline management',
          provider: 'Have Dominion',
          rating: '5.0/5',
          features: ['Deadline Alerts', 'Document Expiry', 'Audit Trails', 'Regulatory Updates']
        }
      ]
    },

    /* Commented out Software Development section
    {
      id: 'development',
      title: 'Software Development',
      color: '#FF8C00',
      icon: '💻',
      description: 'Custom software and secure app development services',
      buildings: [
        { 
          name: 'Web Development', 
          available: true, 
          time: '24/7',
          description: 'Custom website and web application development',
          provider: 'Have Dominion',
          rating: '4.9/5',
          features: ['Responsive Design', 'Secure Coding', 'Performance Optimization', 'Maintenance']
        },
        { 
          name: 'Mobile Apps', 
          available: true, 
          time: '24/7',
          description: 'Secure mobile application development for F-Droid & Aurora',
          provider: 'Have Dominion',
          rating: '5.0/5',
          features: ['Cross-platform', 'Privacy Focused', 'Offline Capability', 'Secure Authentication']
        }
      ]
    },
    */

    // Security & Protection Services
    {
      id: 'security',
      title: 'Security Services',
      color: '#8B0000',
      icon: '🛡️',
      description: 'Comprehensive digital and physical security solutions',
      buildings: [
        { 
          name: 'Cybersecurity', 
          available: true, 
          time: '24/7',
          description: 'Complete digital protection and threat prevention',
          provider: 'Have Dominion',
          rating: '5.0/5',
          features: ['Threat Monitoring', 'Vulnerability Assessment', 'Incident Response', 'Security Training']
        },
        { 
          name: 'Privacy Consulting', 
          available: true, 
          time: 'Consultation',
          description: 'Personal and business privacy protection strategies',
          provider: 'Have Dominion',
          rating: '4.9/5',
          features: ['Data Protection', 'Online Privacy', 'Secure Communications', 'Asset Concealment']
        }
      ]
    }
  ];

  const filteredBlocks = neighborhoodBlocks.filter(block =>
    block.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    block.buildings.some(building => 
      building.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleCategoryClick = (block) => {
    setSelectedCategory(block);
    setActiveBlock(null);
  };

  const closeCategoryPanel = () => {
    setSelectedCategory(null);
  };

  const askAIQuestion = () => {
    if (userQuestion.trim()) {
      // Simulate AI response based on question content
      let response = "";
      const question = userQuestion.toLowerCase();
      
      if (question.includes('ham') || question.includes('radio')) {
        response = "For HAM radio licensing, I recommend starting with our Technician License program. It's perfect for beginners and includes full FCC exam preparation with curated learning resources.";
      } else if (question.includes('credit') || question.includes('score')) {
        response = "Our Credit Tradelines service can help boost your credit score quickly. Combined with our Financial Coaching, you'll have a complete credit building strategy.";
      } else if (question.includes('business') || question.includes('private')) {
        response = "The Private Membership program includes business structure setup, private contracting guidance, and access to our exclusive Creditor Academy community.";
      } else if (question.includes('financial') || question.includes('money')) {
        response = "Our Financial Coaching provides one-on-one mentorship covering credit building, private banking, and strategies for achieving financial independence.";
      } else {
        response = "Based on your question, I recommend exploring our comprehensive services. Each program is designed to work together for complete personal and financial development.";
      }
      
      setAiResponse(response);
      setUserQuestion('');
    }
  };

  const CategoryDetailPanel = () => (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed right-0 top-0 h-full w-96 bg-gray-900/95 backdrop-blur-xl border-l border-gray-700 shadow-2xl z-50 overflow-y-auto"
    >
      {/* Panel Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: selectedCategory.color + '20', color: selectedCategory.color }}
            >
              {selectedCategory.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{selectedCategory.title}</h2>
              <p className="text-gray-400 text-sm">{selectedCategory.buildings.length} services available</p>
            </div>
          </div>
          <button
            onClick={closeCategoryPanel}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-gray-300 text-sm">{selectedCategory.description}</p>
      </div>

      {/* AI Question Section - Commented out as per request */}
      {/* 
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-3">🤖 Have Dominion Assistant</h3>
        <div className="space-y-3">
          <textarea
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            placeholder="Ask about our services... (e.g., Which HAM radio license should I start with?)"
            className="w-full h-20 p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none text-sm"
          />
          <button
            onClick={askAIQuestion}
            disabled={!userQuestion.trim()}
            className="w-full py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors"
          >
            Ask Have Dominion AI
          </button>
          {aiResponse && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg"
            >
              <p className="text-orange-300 text-sm">{aiResponse}</p>
            </motion.div>
          )}
        </div>
      </div>
      */}

      {/* Services List */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Available Services</h3>
        <div className="space-y-3">
          {selectedCategory.buildings.map((building, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-orange-500/50 transition-colors cursor-pointer group"
              onClick={() => alert(`Booking ${building.name} - Contact Have Dominion to get started!`)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-white font-semibold group-hover:text-orange-300 transition-colors">
                  {building.name}
                </h4>
                <span className="text-green-400 text-sm font-medium bg-green-500/10 px-2 py-1 rounded">
                  {building.rating}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-2">{building.description}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {building.features.slice(0, 3).map((feature, idx) => (
                  <span key={idx} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>🕒 {building.time}</span>
                <span>👤 {building.provider}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 border-t border-gray-700">
        <div className="space-y-2">
          <button 
            onClick={() => alert('Contact Have Dominion: info@havedominion.com')}
            className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors"
          >
            📞 Contact Have Dominion
          </button>
          <button className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors border border-gray-600">
            💰 Get Pricing Info
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black pt-20 pb-20">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-red-800/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,140,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,0,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      {/* Category Detail Panel Overlay */}
      <AnimatePresence>
        {selectedCategory && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={closeCategoryPanel}
            />
            <CategoryDetailPanel />
          </>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl font-bold text-white mb-6"
          >
            Have Dominion Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Master your communication, finances, and future with our comprehensive service ecosystem
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Search Have Dominion services... (HAM radio, credit, financial, etc.)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-black/30 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 backdrop-blur-sm text-lg transition-all duration-300 hover:border-gray-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Neighborhood Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlocks.map((block, index) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              {/* Block Card */}
              <motion.div
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 cursor-pointer shadow-xl hover:border-orange-500/50 transition-all duration-300"
                onClick={() => handleCategoryClick(block)}
              >
                {/* Block Header */}
                <div className="flex items-center space-x-4 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl bg-gray-800 border border-gray-700"
                    style={{ 
                      backgroundColor: block.color + '15',
                      color: block.color
                    }}
                  >
                    {block.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{block.title}</h3>
                    <p className="text-gray-400 text-sm">
                      {block.buildings.length} specialized services
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {block.description}
                </p>

                {/* Quick Preview */}
                <div className="space-y-3 mb-4">
                  {block.buildings.slice(0, 2).map((building, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between text-sm p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
                    >
                      <div>
                        <span className="text-gray-200 font-medium">{building.name}</span>
                        <p className="text-gray-400 text-xs">{building.provider}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 text-xs font-medium">{building.time}</div>
                        <div className="text-yellow-400 text-xs">⭐ {building.rating}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* View More Indicator */}
                {block.buildings.length > 2 && (
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-orange-400 text-sm font-medium bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                      +{block.buildings.length - 2} more services →
                    </span>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredBlocks.length === 0 && searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-8xl mb-6 text-gray-600">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-3">No services found</h3>
            <p className="text-gray-400 text-lg">
              Try searching for "HAM radio", "credit", "financial", "membership", etc.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-6 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors font-medium border border-gray-600"
            >
              Clear Search
            </button>
          </motion.div>
        )}

        {/* Quick Actions Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-lg rounded-2xl p-4 border border-gray-700 shadow-xl"
        >
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900 text-white rounded-xl transition-all font-medium flex items-center space-x-2 shadow-lg hover:shadow-orange-500/20"
            >
              <span>Join Have Dominion</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all font-medium flex items-center space-x-2 border border-gray-600"
            >
              <span>Schedule Consultation</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all font-medium flex items-center space-x-2 border border-gray-600"
            >
              <span>Download Resources</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
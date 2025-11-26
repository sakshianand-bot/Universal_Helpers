import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function About() {
  const [activeSection, setActiveSection] = useState('pathway');
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const autoRotateRef = useRef(null);
  const sectionRef = useRef(null);

  const sections = [
    { id: 'pathway', label: 'The Pathway' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'training', label: 'Training System' },
    { id: 'benefits', label: 'Your Benefits' },
    { id: 'academy', label: 'Private Academy' }
  ];

  const pathwaySteps = [
    {
      step: 1,
      title: 'Work & Contribute',
      description: 'Complete tasks and projects within the organization',
      outcome: 'Build Private Credits through meaningful work',
      icon: '💼'
    },
    {
      step: 2,
      title: 'Earn Training Access',
      description: 'Use accumulated credits for Academy enrollment',
      outcome: 'Unlock private domain knowledge and principles',
      icon: '🎓'
    },
    {
      step: 3,
      title: 'Foundational Training',
      description: 'Master essential private operations concepts',
      outcome: 'Complete contracts, sovereignty, PMA, and trusts training',
      icon: '🏛️'
    },
    {
      step: 4,
      title: 'Advance to Premium',
      description: 'Optional progression to mastery courses',
      outcome: 'Continue education without financial burden',
      icon: '⭐'
    }
  ];

  const trainingModules = [
    {
      module: 'Foundation',
      courses: ['Private Contracts', 'Sovereign Principles', 'PMA Fundamentals', 'Trust Structures', 'Private Operations'],
      duration: '8-12 weeks',
      credits: 100,
      icon: '🔰'
    },
    {
      module: 'Premium Mastery',
      courses: ['Advanced Contracts', 'Private Banking', 'Asset Protection', 'International Law', 'Master Operations'],
      duration: '12-16 weeks',
      credits: 200,
      icon: '🎯'
    }
  ];

  const benefits = [
    {
      icon: '🧠',
      title: 'Knowledgeable',
      description: 'Master the principles and structure of private operations'
    },
    {
      icon: '⚡',
      title: 'Self-Reliant',
      description: 'Build confidence to operate independently in private domains'
    },
    {
      icon: '🚀',
      title: 'Empowered',
      description: 'Gain the tools and knowledge for true personal empowerment'
    },
    {
      icon: '🛡️',
      title: 'Prepared',
      description: 'Ready to operate fully in private with complete preparation'
    }
  ];

  const outcomes = [
    {
      metric: 'Lifestyle Stability',
      description: 'Build a stable foundation for long-term personal growth',
      icon: '🏠'
    },
    {
      metric: 'Financial Confidence',
      description: 'Operate with financial certainty and strategic advantage',
      icon: '💎'
    },
    {
      metric: 'Long-term Growth',
      description: 'Sustainable personal and professional development',
      icon: '📈'
    },
    {
      metric: 'Private Domain Access',
      description: 'Full integration into private systems and operations',
      icon: '🔐'
    }
  ];

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoRotating) return;

    autoRotateRef.current = setInterval(() => {
      setActiveSection(current => {
        const currentIndex = sections.findIndex(section => section.id === current);
        const nextIndex = (currentIndex + 1) % sections.length;
        return sections[nextIndex].id;
      });
    }, 3000);

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [isAutoRotating, sections]);

  // Progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 10));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleContentTap = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    setTimeout(() => {
      setClickCount(0);
    }, 500);

    if (newClickCount === 2) {
      setIsAutoRotating(false);
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    }
    
    if (!isAutoRotating) {
      setIsAutoRotating(true);
    }
  };

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  const getCurrentSectionIndex = () => {
    return sections.findIndex(section => section.id === activeSection);
  };

  return (
    <div 
      className="min-h-screen pt-20 pb-20 relative overflow-hidden"
      style={{
        backgroundImage: 'url("/src/assets/smoke.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Main Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/80 to-black/70 backdrop-blur-sm"></div>
      
      {/* Corner Image Overlay - Top Right */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 opacity-80 z-0"
        style={{
          backgroundImage: 'url("/src/assets/smoke.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'top right',
          maskImage: 'radial-gradient(circle at top right, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at top right, black 20%, transparent 80%)',
          filter: 'brightness(1.2)'
        }}
      ></div>

      {/* Corner Image Overlay - Bottom Left */}
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 opacity-80 z-0"
        style={{
          backgroundImage: 'url("/src/assets/smoke.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom left',
          maskImage: 'radial-gradient(circle at bottom left, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at bottom left, black 20%, transparent 80%)',
          filter: 'brightness(1.2)'
        }}
      ></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Pathway to the <span className="bg-gradient-to-r from-amber-600 to-red-800 text-transparent bg-clip-text font-bold">Private</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed"
          >
            Earn Your Way Into Private Membership & Training. At our Global Conglomerate, we empower individuals 
            to build stable, secure, and private lives through a clear pathway from public systems to private domains.
          </motion.p>
        </motion.section>

        {/* Navigation Tabs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-wrap justify-center gap-2">
              {sections.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSectionClick(tab.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeSection === tab.id
                      ? 'bg-gradient-to-r from-amber-600 to-red-800 text-white shadow-lg shadow-amber-700/25'
                      : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 border border-amber-900/50'
                  }`}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Auto-rotation Status */}
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex space-x-1">
                {sections.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === getCurrentSectionIndex() 
                        ? 'bg-amber-600' 
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Main Content Sections */}
        <div 
          ref={sectionRef}
          onClick={handleContentTap}
          className="cursor-pointer"
        >
          <AnimatePresence mode="wait">
            {/* Pathway Section */}
            {activeSection === 'pathway' && (
              <motion.section
                key="pathway"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">The Clear Pathway</h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    A structured journey from public participation to private mastery, ensuring 
                    confidence and competence at every step.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  {pathwaySteps.map((step, index) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 border border-amber-900/50 hover:border-amber-600 transition-all duration-300 group"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">{step.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-amber-500 font-bold text-lg">Step {step.step}</span>
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            <h3 className="text-xl font-bold text-white">{step.title}</h3>
                          </div>
                          <p className="text-gray-300 mb-3">{step.description}</p>
                          <div className="bg-amber-900/30 rounded-lg p-3 border border-amber-800/50">
                            <p className="text-amber-200 text-sm font-semibold">Outcome: {step.outcome}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Progress Visualization */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="bg-gray-900/60 rounded-2xl p-8 border border-amber-900/50"
                >
                  <h3 className="text-2xl font-bold text-white text-center mb-6">Your Journey Progress</h3>
                  <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                    <motion.div
                      className="bg-gradient-to-r from-amber-600 to-red-800 h-4 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1 }}
                    ></motion.div>
                  </div>
                  <p className="text-gray-300 text-center">
                    Simulated progress through the private pathway system
                  </p>
                </motion.div>
              </motion.section>
            )}

            {/* How It Works Section */}
            {activeSection === 'how-it-works' && (
              <motion.section
                key="how-it-works"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">How The System Works</h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    A credit-based ecosystem that rewards contribution with knowledge and private access.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-amber-900/50 to-red-900/30 rounded-2xl p-6 border border-amber-600/50 text-center"
                  >
                    <div className="text-4xl mb-4">💼</div>
                    <h3 className="text-xl font-bold text-white mb-3">Work & Contribute</h3>
                    <p className="text-gray-300">
                      Complete meaningful tasks and projects to build your Private Credits pool
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-amber-900/50 to-red-900/30 rounded-2xl p-6 border border-amber-600/50 text-center"
                  >
                    <div className="text-4xl mb-4">🎓</div>
                    <h3 className="text-xl font-bold text-white mb-3">Earn Training Access</h3>
                    <p className="text-gray-300">
                      Use accumulated credits to enroll in Creditor Academy's private programs
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-amber-900/50 to-red-900/30 rounded-2xl p-6 border border-amber-600/50 text-center"
                  >
                    <div className="text-4xl mb-4">🚀</div>
                    <h3 className="text-xl font-bold text-white mb-3">Advance Confidently</h3>
                    <p className="text-gray-300">
                      Progress through training without financial burden, fully prepared for private operations
                    </p>
                  </motion.div>
                </div>
              </motion.section>
            )}

            {/* Training System Section */}
            {activeSection === 'training' && (
              <motion.section
                key="training"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">Training System</h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Structured learning paths designed to build competence and confidence in private operations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {trainingModules.map((module, index) => (
                    <motion.div
                      key={module.module}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 border border-amber-900/50 hover:border-amber-600 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="text-3xl">{module.icon}</div>
                        <h3 className="text-2xl font-bold text-white">{module.module}</h3>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-amber-400 font-semibold mb-2">Courses Included:</h4>
                        <ul className="space-y-1">
                          {module.courses.map((course, idx) => (
                            <li key={idx} className="text-gray-300 flex items-center space-x-2">
                              <span className="text-amber-500">•</span>
                              <span>{course}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-amber-900/30 rounded-lg p-3 text-center">
                          <p className="text-amber-200 font-semibold">Duration</p>
                          <p className="text-white">{module.duration}</p>
                        </div>
                        <div className="bg-red-900/30 rounded-lg p-3 text-center">
                          <p className="text-red-200 font-semibold">Credits Required</p>
                          <p className="text-white">{module.credits}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Benefits Section */}
            {activeSection === 'benefits' && (
              <motion.section
                key="benefits"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">Your Transformation</h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    The comprehensive benefits of completing your journey through our private pathway system.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 border border-amber-900/50 hover:border-amber-600 transition-all duration-300 group"
                    >
                      <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                        {benefit.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white text-center mb-3">{benefit.title}</h3>
                      <p className="text-gray-300 text-center leading-relaxed">{benefit.description}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Outcomes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {outcomes.map((outcome, index) => (
                    <motion.div
                      key={outcome.metric}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="bg-gradient-to-br from-amber-900/40 to-red-900/20 rounded-xl p-4 text-center border border-amber-700/30"
                    >
                      <div className="text-2xl mb-2">{outcome.icon}</div>
                      <h4 className="text-lg font-bold text-white mb-2">{outcome.metric}</h4>
                      <p className="text-gray-300 text-sm">{outcome.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Academy Section */}
            {activeSection === 'academy' && (
              <motion.section
                key="academy"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">Private Academy</h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Your gateway to private domain mastery. Learn the principles, structure, and operational 
                    knowledge required for confident private operations.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-amber-900/30 to-red-900/20 rounded-3xl p-8 border border-amber-600/50 mb-8">
                  <h3 className="text-2xl font-bold text-white text-center mb-6">Academy Mission</h3>
                  <p className="text-gray-200 text-lg text-center leading-relaxed">
                    To create a workforce and community of individuals who are knowledgeable, self-reliant, 
                    empowered, and prepared to operate fully in the private domain. This pathway ensures 
                    lifestyle stability, financial confidence, and long-term growth as you transition into 
                    the private domain.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-900/80 rounded-2xl p-6 border border-amber-900/50"
                  >
                    <h4 className="text-xl font-bold text-amber-400 mb-4">What You'll Master</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center space-x-3 text-gray-300">
                        <span className="text-amber-500">✓</span>
                        <span>Private contract principles and execution</span>
                      </li>
                      <li className="flex items-center space-x-3 text-gray-300">
                        <span className="text-amber-500">✓</span>
                        <span>Sovereign operations and structures</span>
                      </li>
                      <li className="flex items-center space-x-3 text-gray-300">
                        <span className="text-amber-500">✓</span>
                        <span>PMA (Private Membership Association) fundamentals</span>
                      </li>
                      <li className="flex items-center space-x-3 text-gray-300">
                        <span className="text-amber-500">✓</span>
                        <span>Trust establishment and management</span>
                      </li>
                      <li className="flex items-center space-x-3 text-gray-300">
                        <span className="text-amber-500">✓</span>
                        <span>Complete private operational systems</span>
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-900/80 rounded-2xl p-6 border border-amber-900/50"
                  >
                    <h4 className="text-xl font-bold text-amber-400 mb-4">The Result</h4>
                    <p className="text-gray-300 mb-4">
                      Graduates emerge with the confidence, knowledge, and practical skills to operate 
                      successfully in private domains, fully prepared for long-term stability and growth.
                    </p>
                    <div className="bg-amber-900/30 rounded-lg p-4 border border-amber-800/50">
                      <p className="text-amber-200 font-semibold text-center">
                        "From public participant to private professional — your journey to empowerment starts here."
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-black via-amber-900 to-amber-800 rounded-3xl p-12 border border-amber-600 shadow-2xl shadow-amber-900/30">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Begin Your Private Journey?</h2>
            <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">
              Join the pathway to private membership and transform your future through earned knowledge and access.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-amber-700 rounded-2xl font-bold text-lg hover:bg-amber-50 transition-colors shadow-lg"
              >
                Start Earning Credits
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-colors"
              >
                Explore Academy
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { 
  Phone, 
  Users, 
  Calendar, 
  Clock, 
  Star,
  ArrowRight,
  Heart,
  Settings,
  GraduationCap,
  MapPin,
  Shield,
  CheckCircle,
  Award,
  ThumbsUp,
  Map,
  FileText,
  MessageCircle,
  Zap,
  BadgeCheck,
  ShieldCheck,
  BookOpen,
  PhoneCall,
  Radio,
  Truck,
  Car,
  Smartphone,
  Lock,
  Building,
  CreditCard,
  FileCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import ChatWidget from '../../components/Chat/ChatWidget'

// Counter Component
const Counter = ({ end, suffix }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [end]);
  
  return <span>{count}{suffix}</span>;
};

// FAQ Item Component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-black/50 backdrop-blur-sm rounded-xl border border-red-600/20 overflow-hidden">
      <button
        className="w-full px-6 py-4 text-left flex items-center justify-between text-white font-semibold hover:bg-red-600/10 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <ChevronDown className={`h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-red-600/5 border-t border-red-600/10">
          <p className="text-red-100">{answer}</p>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const [visibleSections, setVisibleSections] = useState({})
  const sectionRefs = useRef({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true
            }))
          }
        })
      },
      { threshold: 0.1 }
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  // Updated Services for Have Dominion
  const services = [
    {
      icon: <Car className="h-8 w-8" />,
      title: "Auto Customization & Audio",
      description: "Premium car audio systems, truck customization, and professional vehicle upgrades for enthusiasts.",
      features: ["Premium Audio Installation", "Truck Customization", "Performance Upgrades", "Professional Tuning"],
      color: "from-red-600 to-red-800",
      bgColor: "bg-gradient-to-br from-red-600/20 to-red-800/20",
      category: "automotive",
      cta: "Customize Your Vehicle"
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Class A CDL Training",
      description: "Commercial Driver's License training and certification for professional truck driving careers.",
      features: ["CDL Certification", "Road Training", "Job Placement", "Lifetime Support"],
      color: "from-red-700 to-red-900",
      bgColor: "bg-gradient-to-br from-red-700/20 to-red-900/20",
      category: "cdl",
      cta: "Start CDL Training"
    },
    {
      icon: <Radio className="h-8 w-8" />,
      title: "HAM Radio & Communications",
      description: "HAM radio licensing, equipment setup, and secure communication systems for enthusiasts.",
      features: ["HAM Licensing", "Equipment Setup", "Secure Comms", "Emergency Protocols"],
      color: "from-red-500 to-red-700",
      bgColor: "bg-gradient-to-br from-red-500/20 to-red-700/20",
      category: "radio",
      cta: "Get Licensed"
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Home Schooling Programs",
      description: "Comprehensive home schooling solutions with customized curriculum and expert guidance.",
      features: ["Custom Curriculum", "Expert Tutors", "Progress Tracking", "College Prep"],
      color: "from-amber-600 to-amber-800",
      bgColor: "bg-gradient-to-br from-amber-600/20 to-amber-800/20",
      category: "education",
      cta: "Explore Programs"
    },
    {
      icon: <FileCheck className="h-8 w-8" />,
      title: "Home Healthcare Licensing",
      description: "Complete licensing solutions for home healthcare providers and medical professionals.",
      features: ["License Preparation", "Compliance Guidance", "Document Management", "Renewal Support"],
      color: "from-amber-500 to-amber-700",
      bgColor: "bg-gradient-to-br from-amber-500/20 to-amber-700/20",
      category: "healthcare",
      cta: "Get Licensed"
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Financial Services & GRC",
      description: "Authorized user accounts, financial planning, and Governance, Risk & Compliance solutions.",
      features: ["Credit Building", "GRC Consulting", "Financial Planning", "Compliance Management"],
      color: "from-amber-600 to-amber-800",
      bgColor: "bg-gradient-to-br from-amber-600/20 to-amber-800/20",
      category: "financial",
      cta: "Secure Your Future"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Software & App Development",
      description: "Custom software solutions, mobile apps, and F-Droid/Aurora Store compatible applications.",
      features: ["Custom Development", "F-Droid Compatible", "Security Focused", "Ongoing Support"],
      color: "from-amber-500 to-amber-700",
      bgColor: "bg-gradient-to-br from-amber-500/20 to-amber-700/20",
      category: "software",
      cta: "Start Your Project"
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: "Creditor Academy",
      description: "Premium training program for financial mastery and private sector career advancement.",
      features: ["Basic Training", "Premium Modules", "Career Placement", "Ongoing Mentorship"],
      color: "from-yellow-600 to-yellow-800",
      bgColor: "bg-gradient-to-br from-yellow-600/20 to-yellow-800/20",
      category: "academy",
      cta: "Enroll Now"
    }
  ]

  // const stats = [
  //   { number: "2K+", label: "Private Sector Graduates", icon: <GraduationCap className="h-6 w-6" /> },
  //   { number: "500+", label: "CDL Certified Drivers", icon: <Truck className="h-6 w-6" /> },
  //   { number: "24/7", label: "Compliance Support", icon: <Shield className="h-6 w-6" /> },
  //   { number: "95%", label: "Success Rate", icon: <Award className="h-6 w-6" /> }
  // ]

  const documentFeatures = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Smart Document Storage",
      description: "Organized, secure storage for all your important documents with instant access"
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Compliance Tracking",
      description: "Never fall out of compliance with automated alerts and renewal reminders"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile App Companion",
      description: "F-Droid & Aurora Store compatible app for document management on the go"
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Secure & Private",
      description: "Military-grade encryption ensuring your documents remain confidential"
    }
  ]

  const creditorAcademy = [
    {
      level: "Basic Training",
      description: "Essential knowledge for working in the private sector",
      features: ["Financial Fundamentals", "Legal Framework", "Privacy Protocols", "Basic Compliance"],
      color: "from-gray-600 to-gray-800"
    },
    {
      level: "Premium Program",
      description: "Advanced training for financial mastery and leadership",
      features: ["Advanced Strategies", "Leadership Development", "Wealth Management", "Executive Placement"],
      color: "from-yellow-600 to-yellow-800"
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Custom styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes crimson-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(220, 38, 38, 0.5); }
          50% { box-shadow: 0 0 40px rgba(220, 38, 38, 0.8), 0 0 60px rgba(220, 38, 38, 0.3); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 4s ease infinite; }
        .animate-crimson-glow { animation: crimson-glow 3s ease-in-out infinite; }
        .crimson-gradient { background: linear-gradient(135deg, #dc2626, #991b1b, #450a0a); }
        .gold-gradient { background: linear-gradient(135deg, #d97706, #b45309, #78350f); }
      `}</style>

      {/* Emergency Banner */}
      <section id="emergency" className="relative crimson-gradient text-white py-3">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 animate-pulse" />
              <span className="font-bold">24/7 Compliance & Support Services</span>
            </div>
            <div className="flex items-center space-x-2">
              <a href="tel:1-888-997-3744" className="bg-black text-red-400 font-semibold py-2 px-4 rounded-full hover:bg-gray-900 transition-all duration-300 flex items-center space-x-2">
                <PhoneCall className="h-4 w-4" />
                <span>Call Now: 1-888-997-3744</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section id="hero" className="relative bg-black text-white pt-12 lg:pt-16 pb-20 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/5 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_var(--tw-gradient-stops))] from-yellow-600/5 via-transparent to-transparent"></div>
          </div>
          <div className="absolute top-10 left-10 w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Have
                <span className="block bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 bg-clip-text text-transparent animate-gradient">
                  Dominion
                </span>
              </h1>
              <p className="text-xl text-red-100 leading-relaxed">
                Your pathway to privacy, financial independence, and professional mastery. 
                Join our global conglomerate and build the life you deserve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/creditor-academy" 
                  className="relative overflow-hidden group bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105 hover:shadow-red-600/30"
                >
                  <GraduationCap className="h-5 w-5" />
                  <span>Start at Creditor Academy</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </Link>
                <button className="relative overflow-hidden group border-2 border-red-600/80 text-red-400 font-medium py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-red-600/10 flex items-center justify-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>Call 1-888-997-3744</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-red-200">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Privacy Focused</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4" />
                  <span>Professional Training</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4" />
                  <span>Secure Services</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="backdrop-blur-sm rounded-3xl p-8 border border-red-600/30">
                <div className="overflow-hidden rounded-2xl w-full h-80 bg-gradient-to-br from-red-900/90 to-black/90 relative shadow-2xl shadow-red-500/20">
                  <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Building a secure future" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-red-900/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-white text-left">
                      <div className="text-2xl font-bold mb-2">Build Your Private Future</div>
                      <div className="text-sm opacity-90">From CDL Training to Financial Mastery</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Counter - Commented Out
      <section className="py-20 bg-gradient-to-r from-red-950/50 to-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { end: 2000, label: "Lives Transformed", suffix: "+" },
              { end: 500, label: "CDL Graduates", suffix: "+" },
              { end: 95, label: "Success Rate", suffix: "%" },
              { end: 24, label: "Support Hours", suffix: "/7" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-3">
                  <Counter end={stat.end} suffix={stat.suffix} />
                </div>
                <div className="text-red-200 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Service Sections */}
      <div className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
            Our Core Services
          </h2>
          
          {/* Auto Customization & Audio Section */}
          <div id="auto-customization" className="mb-20 bg-gradient-to-br from-red-900/20 to-black rounded-2xl overflow-hidden border border-red-900/30 shadow-2xl hover:shadow-red-900/20 transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="p-8 md:p-12">
                <div className="flex items-center mb-6">
                  <Car className="h-10 w-10 text-red-500 mr-3" />
                  <h3 className="text-3xl font-bold text-white">Auto Customization & Audio</h3>
                </div>
                <p className="text-gray-300 mb-6 text-lg">Transform your vehicle with our premium customization and audio solutions. From high-end sound systems to performance upgrades, we bring your automotive dreams to life.</p>
                <ul className="space-y-3 mb-8">
                  {['Premium Audio Installation', 'Truck Customization', 'Performance Upgrades', 'Professional Tuning'].map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <CheckCircle className="h-5 w-5 text-red-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center group">
                  Customize Your Vehicle
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80" 
                  alt="Professional auto customization and audio installation" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:from-transparent md:to-black/40"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center md:text-right">
                  <div className="inline-flex items-center px-4 py-2 bg-red-600/90 rounded-full text-sm font-semibold mb-2">
                    <Car className="h-4 w-4 mr-2" />
                    <span>Custom Builds</span>
                  </div>
                  <h4 className="text-xl font-bold">Premium Audio</h4>
                  <p className="text-sm opacity-90">Transform your ride with our experts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Class A CDL Training Section */}
          <div id="cdl-training" className="mb-20 bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800 shadow-2xl hover:shadow-red-900/10 transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="p-8 md:p-12 order-2 md:order-1">
                <div className="flex items-center mb-6">
                  <Truck className="h-10 w-10 text-red-500 mr-3" />
                  <h3 className="text-3xl font-bold text-white">Class A CDL Training</h3>
                </div>
                <p className="text-gray-300 mb-6 text-lg">Start your career in trucking with our comprehensive CDL training program. Our expert instructors and hands-on approach ensure you're road-ready in no time.</p>
                <ul className="space-y-3 mb-8">
                  {['CDL Certification', 'Road Training', 'Job Placement', 'Lifetime Support'].map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <CheckCircle className="h-5 w-5 text-red-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center group">
                  Start CDL Training
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden order-1 md:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.1.0&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80" 
                  alt="Professional truck driver with Class A CDL truck" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:from-transparent md:to-black/40"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center md:text-left">
                  <div className="inline-flex items-center px-4 py-2 bg-red-600/90 rounded-full text-sm font-semibold mb-2">
                    <Truck className="h-4 w-4 mr-2" />
                    <span>Class A CDL Program</span>
                  </div>
                  <h4 className="text-xl font-bold">Earn While You Learn</h4>
                  <p className="text-sm opacity-90">Paid on-the-job training available</p>
                </div>
              </div>
            </div>
          </div>

          {/* HAM Radio & Communications Section */}
          <div id="ham-radio" className="bg-gradient-to-br from-red-800/10 to-black rounded-2xl overflow-hidden border border-red-900/30 shadow-2xl hover:shadow-red-900/20 transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="p-8 md:p-12">
                <div className="flex items-center mb-6">
                  <Radio className="h-10 w-10 text-red-500 mr-3" />
                  <h3 className="text-3xl font-bold text-white">HAM Radio & Communications</h3>
                </div>
                <p className="text-gray-300 mb-6 text-lg">Join the world of amateur radio with our comprehensive training and equipment solutions. Stay connected with secure, reliable communication systems.</p>
                <ul className="space-y-3 mb-8">
                  {['HAM Licensing', 'Equipment Setup', 'Secure Comms', 'Emergency Protocols'].map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <CheckCircle className="h-5 w-5 text-red-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center group">
                  Get Licensed
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-4.1.0&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80" 
                  alt="Professional HAM radio equipment and communication setup" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:from-transparent md:to-black/40"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center md:text-right">
                  <div className="inline-flex items-center px-4 py-2 bg-red-600/90 rounded-full text-sm font-semibold mb-2">
                    <Radio className="h-4 w-4 mr-2" />
                    <span>HAM Radio Training</span>
                  </div>
                  <h4 className="text-xl font-bold">Global Communication</h4>
                  <p className="text-sm opacity-90">Connect worldwide with our expert training</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Flow Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gold-gradient bg-clip-text text-transparent mb-6">
              Your Journey to Dominion
            </h2>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto">
              Simple steps to transform your life and career
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-red-600 to-yellow-500"></div>
            
            {[
              {
                step: "01",
                title: "Assess & Plan",
                description: "Free consultation to understand your goals",
                icon: <Users className="h-8 w-8" />
              },
              {
                step: "02",
                title: "Train & Learn",
                description: "Professional training in your chosen field",
                icon: <GraduationCap className="h-8 w-8" />
              },
              {
                step: "03",
                title: "Implement & Grow",
                description: "Apply knowledge with our support",
                icon: <Zap className="h-8 w-8" />
              },
              {
                step: "04",
                title: "Achieve Dominion",
                description: "Financial freedom and career success",
                icon: <Award className="h-8 w-8" />
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="absolute inset-0 bg-red-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative bg-black border-2 border-red-600 rounded-full w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <div className="text-red-400 group-hover:text-yellow-400 transition-colors">
                      {step.icon}
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-red-100 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-28 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold crimson-gradient bg-clip-text text-transparent animate-gradient mb-6">
              Our Services
            </h2>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Comprehensive solutions for automotive, education, licensing, and financial services. 
              Your privacy and success are our priority.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className={`rounded-2xl p-6 border backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 h-full flex flex-col ${
                service.category === 'automotive' || service.category === 'cdl' || service.category === 'radio' 
                  ? 'border-red-600/30 bg-gradient-to-br from-red-950/30 to-black/80 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/20' 
                  : 'border-amber-600/30 bg-gradient-to-br from-amber-950/20 to-black/80 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/20'
              }`}>
                <div className={`inline-flex p-3 rounded-xl mb-4 ${
                  service.category === 'automotive' || service.category === 'cdl' || service.category === 'radio' 
                    ? 'bg-red-600/20 text-red-400' 
                    : 'bg-amber-600/20 text-amber-400'
                }`}>
                  {service.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-red-100 text-sm mb-4 leading-relaxed flex-grow">{service.description}</p>
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2 text-sm text-red-200">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 text-red-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <button className={`w-full font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                  service.category === 'automotive' || service.category === 'cdl' || service.category === 'radio' 
                    ? 'crimson-gradient text-white' 
                    : 'gold-gradient text-white'
                }`}>
                  {service.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-black to-red-950/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold crimson-gradient bg-clip-text text-transparent mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Hear from our community members who have transformed their lives
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Michael R.",
                role: "CDL Graduate",
                content: "From unemployed to earning $85k/year in 6 months. The training changed my life.",
                avatar: "🚚",
                rating: 5
              },
              {
                name: "Sarah K.",
                role: "Creditor Academy",
                content: "The financial strategies helped me clear $30k debt and start building wealth.",
                avatar: "💼",
                rating: 5
              },
              {
                name: "James L.",
                role: "Auto Client",
                content: "Professional audio installation that exceeded all my expectations. Worth every penny.",
                avatar: "🔊",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-red-600/20 transition-all duration-500 hover:scale-105">
                <div className="flex items-center space-x-2 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-red-100 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-red-300">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Management Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-red-950/30 to-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold crimson-gradient bg-clip-text text-transparent animate-gradient mb-6">
              Smart Document Management
            </h2>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Never dread paperwork again. Our secure system organizes, stores, and alerts you to maintain compliance effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {documentFeatures.map((feature, index) => (
              <div key={index} className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-red-600/20 text-center transition-all duration-500 hover:-translate-y-2">
                <div className="inline-flex p-3 rounded-xl mb-4 bg-red-600/20 text-red-400">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-red-100 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="crimson-gradient text-white font-semibold py-4 px-8 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 mx-auto">
              <Smartphone className="h-5 w-5" />
              <span>Download Our App (F-Droid/Aurora)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Service Selector */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold crimson-gradient bg-clip-text text-transparent mb-6">
              Find Your Path
            </h2>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Select your goal and discover the perfect service for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: "💼", title: "Career Change", services: ["CDL Training", "Creditor Academy"] },
              { icon: "🚗", title: "Vehicle Services", services: ["Auto Customization", "Audio Systems"] },
              { icon: "📱", title: "Tech & Privacy", services: ["Software Development", "HAM Radio"] }
            ].map((category, index) => (
              <div key={index} className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-red-600/30 text-center transition-all duration-500 hover:scale-105 group cursor-pointer">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{category.title}</h3>
                <div className="space-y-2">
                  {category.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="text-red-200 text-sm py-2 px-3 bg-red-600/10 rounded-lg">
                      {service}
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-red-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 hover:scale-105">
                  Explore Options
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creditor Academy Section */}
      <section className="py-20 lg:py-28 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gold-gradient bg-clip-text text-transparent animate-gradient mb-6">
              Creditor Academy
            </h2>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto">
              Your pathway to financial mastery and private sector success. Start with basics, advance to premium with accumulated credits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {creditorAcademy.map((level, index) => (
              <div key={index} className={`rounded-2xl p-8 bg-gradient-to-br ${level.color} border border-amber-600/30 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2`}>
                <h3 className="text-2xl font-bold text-white mb-4">{level.level}</h3>
                <p className="text-amber-100 mb-6">{level.description}</p>
                <div className="space-y-3">
                  {level.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3 text-amber-200">
                      <CheckCircle className="h-5 w-5 text-amber-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-amber-600 text-white font-semibold py-3 rounded-xl mt-6 transition-all duration-300 hover:scale-105">
                  {index === 0 ? 'Start Basic Training' : 'Enroll in Premium'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold crimson-gradient bg-clip-text text-transparent mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Get answers to common questions about our services
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                question: "How long does CDL training take?",
                answer: "Our CDL training programs typically take 4-6 weeks, with flexible scheduling options available."
              },
              {
                question: "Is financial aid available for Creditor Academy?",
                answer: "Yes, we offer payment plans and financing options. Contact us to discuss available options."
              },
              {
                question: "Do you provide job placement assistance?",
                answer: "Absolutely! We have partnerships with major employers and offer lifetime placement support."
              },
              {
                question: "Are your services available nationwide?",
                answer: "Yes, we serve clients across the United States with both in-person and remote options."
              }
            ].map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section - Commented Out
      <section className="py-20 bg-gradient-to-b from-black to-red-950/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gold-gradient bg-clip-text text-transparent mb-6">
              Trusted Partnerships
            </h2>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto">
              Working with industry leaders to deliver excellence
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60 hover:opacity-100 transition-opacity duration-300">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-6 border border-amber-600/20 backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:bg-white/10">
                <div className="text-2xl font-bold text-amber-400 text-center">
                  Partner {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-white text-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 bg-clip-text text-transparent">
              Ready to Take Dominion?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Join our global conglomerate and start building your private future today. 
              From CDL training to financial mastery, we provide the pathway.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="relative overflow-hidden group bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>Call: 1-888-997-3744</span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </Link>
              <Link to="/creditor-academy" className="relative overflow-hidden group border-2 border-red-600 text-red-600 font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-red-50 flex items-center justify-center space-x-2">
                <span>Start Your Journey</span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ChatWidget />
    </div>
  )
}

export default Home
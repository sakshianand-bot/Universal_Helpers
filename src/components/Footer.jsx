import React from 'react'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gradient-to-br from-black via-gray-900 to-red-950 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-600 rounded-full filter blur-3xl opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-300">
              Have Dominion
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Empowering individuals through comprehensive education and professional development services.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5 pb-2 border-b border-red-900/50">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-red-400 transition-colors flex items-center group">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Home
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-400 transition-colors flex items-center group">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Services
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-400 transition-colors flex items-center group">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                About Us
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-400 transition-colors flex items-center group">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Contact
              </a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2">
            <h4 className="text-lg font-semibold text-white mb-5 pb-2 border-b border-red-900/50">Contact Us</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-start space-x-3 mb-4">
                  <div className="mt-1 p-2 bg-red-900/30 rounded-lg">
                    <Mail size={18} className="text-red-400" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-200">Email</h5>
                    <a href="mailto:lthd@letthemhavedominion.org" className="text-gray-400 hover:text-red-400 transition-colors text-sm">
                      lthd@letthemhavedominion.org
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="mt-1 p-2 bg-red-900/30 rounded-lg">
                    <Phone size={18} className="text-red-400" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-200">Phone</h5>
                    <a href="tel:1-888-997-3744" className="text-gray-400 hover:text-red-400 transition-colors text-sm">
                      1-888-997-3744
                    </a>
                    <p className="text-gray-500 text-xs mt-1">Fax: 1-888-971-3681</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="mt-1 p-2 bg-red-900/30 rounded-lg">
                  <MapPin size={18} className="text-red-400" />
                </div>
                <div>
                  <h5 className="font-medium text-gray-200">Location</h5>
                  <address className="text-gray-400 not-italic text-sm">
                    <p>Have Dominion</p>
                    <p>1700 Seventh Avenue</p>
                    <p>Suite 2100-2029</p>
                    <p>Seattle, Washington 98101</p>
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-red-900/30">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Have Dominion. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-red-400 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-red-400 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-red-400 text-sm transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
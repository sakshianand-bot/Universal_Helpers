import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { toast } from "sonner";
import { FaLock, FaEye, FaEyeSlash, FaArrowRight, FaShieldAlt, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaMicrosoft } from "react-icons/fa";
import { SiAuth0 } from "react-icons/si";
import axios from "axios";

// Helper to decode JWT and extract payload safely
function decodeJwtPayload(token) {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    const jsonPayload = decodeURIComponent(atob(padded).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tokenError, setTokenError] = useState("");
  const [decodedEmail, setDecodedEmail] = useState("");
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // Validate & decode token, extract email and check expiry
    if (!token) {
      setTokenError("Missing token");
      toast.error("Invalid reset link. Please request a new password reset.");
      return;
    }
    
    const payload = decodeJwtPayload(token);
    if (!payload || !payload.email) {
      setTokenError("Invalid token payload");
      toast.error("Invalid reset link. Please request a new password reset.");
      return;
    }
    
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      setTokenError("Token expired");
      toast.error("This reset link has expired. Please request a new one.");
      return;
    }
    
    setDecodedEmail(payload.email);
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (tokenError || !decodedEmail) {
      toast.error("Invalid or expired reset link");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE}/api/auth/reset-password`,
        {
          email: decodedEmail,
          password: formData.newPassword,
        },
        {
          headers: {
            'reset-token': token
          }
        }
      );
      
      setIsSuccess(true);
      toast.success(response.data?.message || "Password reset successfully!");
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error(error.response?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 p-4 sm:p-6">
        <div className="w-full max-w-md bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50">
          <div className="p-8 text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 rounded-full flex items-center justify-center mb-4">
              <FaCheckCircle className="h-8 w-8 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Password Reset Successful!</h2>
            <p className="text-gray-300 mb-6">
              Your password has been successfully updated. You can now sign in with your new password.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 transition-all duration-300"
            >
              <FaArrowLeft className="mr-2" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (tokenError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 p-4 sm:p-6">
        <div className="w-full max-w-md bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-red-500/30">
          <div className="p-8 text-center">
            <div className="mx-auto h-16 w-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
              <FaShieldAlt className="h-8 w-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Invalid Reset Link</h2>
            <p className="text-gray-300 mb-6">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <div className="space-y-3">
              <Link
                to="/forgot-password"
                className="block w-full px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 transition-all duration-300"
              >
                Request New Reset Link
              </Link>
              <Link
                to="/login"
                className="block text-sm font-medium text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 p-4 sm:p-6">
      {/* Back Button */}
      <Link 
        to="/login" 
        className="absolute top-6 left-6 z-50 flex items-center text-yellow-400 hover:text-yellow-300 transition-colors group"
      >
        <FaArrowLeft className="mr-1 transition-transform group-hover:-translate-x-1" />
        Back to Login
      </Link>

      <div className="w-full max-w-md bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50">
        <div className="p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg mb-4">
              <FaLock className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Reset Your Password</h2>
            <p className="mt-1 text-sm text-gray-300">
              Enter your new password below
            </p>
          </div>

          {/* Password Reset Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password Field */}
            <div className="space-y-2">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-4 w-4 text-yellow-500" />
                </div>
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword.newPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  className="block w-full pl-10 pr-10 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-all duration-200"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-yellow-400 focus:outline-none transition-colors"
                  onClick={() => togglePasswordVisibility('newPassword')}
                  tabIndex={-1}
                >
                  {showPassword.newPassword ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-400">Password must be at least 8 characters long</p>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-4 w-4 text-yellow-500" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword.confirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  className="block w-full pl-10 pr-10 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-all duration-200"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-yellow-400 focus:outline-none transition-colors"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  tabIndex={-1}
                >
                  {showPassword.confirmPassword ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Resetting...
                </>
              ) : (
                <>
                  Reset Password
                  <FaArrowRight className="ml-2 h-3.5 w-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Security Footer */}
          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className="flex items-center justify-center space-x-2">
              <FaShieldAlt className="h-4 w-4 text-green-400" />
              <span className="text-xs text-gray-400">Your information is protected with 256-bit SSL encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
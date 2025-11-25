import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaGithub, FaFacebook, FaTwitter, FaInfoCircle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { MdError } from 'react-icons/md';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    showPassword: false,
    showMFA: false,
    mfaCode: ''
  });
  
  const [error, setError] = useState('');
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, error: authError, isAuthenticated } = useAuth();

  // Check for CAPS LOCK
  const checkCapsLock = (e) => {
    setCapsLockOn(e.getModifierState('CapsLock'));
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Show CAPS LOCK warning
  useEffect(() => {
    window.addEventListener('keydown', checkCapsLock);
    return () => window.removeEventListener('keydown', checkCapsLock);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user types
    if (error) setError('');
  };

  const togglePasswordVisibility = () => {
    setFormData(prev => ({
      ...prev,
      showPassword: !prev.showPassword
    }));
  };

  const handleSocialLogin = (provider) => {
    // Implement social login logic here
    console.log(`Logging in with ${provider}`);
    // This would typically redirect to OAuth flow
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      const result = await login(formData.email, formData.password, formData.rememberMe);
      
      if (!result.success) {
        setLoginAttempts(prev => prev + 1);
        setError(result.error || 'Invalid email or password');
      } else if (result.requiresMFA) {
        setFormData(prev => ({ ...prev, showMFA: true }));
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMFAVerification = async (e) => {
    e.preventDefault();
    if (!formData.mfaCode) {
      setError('Please enter the verification code');
      return;
    }
    // Implement MFA verification logic here
    console.log('Verifying MFA code:', formData.mfaCode);
  };

  // Social login providers
  const socialProviders = [
    { name: 'Google', icon: <FcGoogle className="w-5 h-5" /> },
    { name: 'GitHub', icon: <FaGithub className="w-5 h-5 text-gray-200" /> },
    { name: 'Facebook', icon: <FaFacebook className="w-5 h-5 text-blue-400" /> },
    { name: 'Twitter', icon: <FaTwitter className="w-5 h-5 text-blue-400" /> },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg mb-4">
            <FaLock className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-yellow-400">Universal-Helper</h2>
          <p className="mt-2 text-sm text-gray-400">Sign in to access your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg flex items-start">
            <MdError className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* CAPS LOCK Warning */}
        {capsLockOn && (
          <div className="bg-yellow-900/50 border border-amber-500/50 text-amber-200 px-4 py-2 rounded-lg flex items-center text-sm">
            <FaInfoCircle className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>Caps Lock is on</span>
          </div>
        )}

        {/* Login Form */}
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl overflow-hidden">
          <div className="px-8 py-8">
            {!formData.showMFA ? (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email address
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="h-5 w-5 text-yellow-500" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full pl-10 pr-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent sm:text-sm"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        onKeyDown={checkCapsLock}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                        Password
                      </label>
                      <Link to="/forgot-password" className="text-xs font-medium text-yellow-400 hover:text-yellow-300 transition-colors">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="h-5 w-5 text-yellow-500" />
                      </div>
                      <input
                        id="password"
                        ref={passwordRef}
                        name="password"
                        type={formData.showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        className="block w-full pl-10 pr-10 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent sm:text-sm"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        onKeyDown={checkCapsLock}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-yellow-400 transition-colors"
                        onClick={togglePasswordVisibility}
                        tabIndex="-1"
                      >
                        {formData.showPassword ? (
                          <FaEyeSlash className="h-5 w-5" />
                        ) : (
                          <FaEye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & MFA Options */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="rememberMe"
                        type="checkbox"
                        className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-600 rounded bg-gray-700"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, showMFA: !prev.showMFA }))}
                      className="text-xs font-medium text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                      {formData.showMFA ? 'Back to Login' : 'Use MFA'}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </>
                    ) : (
                      'Sign in'
                    )}
                  </button>
                </div>
              </form>
            ) : (
              // MFA Verification Form
              <form className="space-y-6" onSubmit={handleMFAVerification}>
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 rounded-full flex items-center justify-center mb-3">
                    <FaLock className="h-6 w-6 text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white">Two-Factor Authentication</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Enter the 6-digit code from your authenticator app
                  </p>
                </div>
                
                <div>
                  <label htmlFor="mfaCode" className="block text-sm font-medium text-gray-300 mb-1">
                    Verification Code
                  </label>
                  <div className="mt-1">
                    <input
                      id="mfaCode"
                      name="mfaCode"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoComplete="one-time-code"
                      className="block w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-center text-xl tracking-widest placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="000000"
                      value={formData.mfaCode}
                      onChange={handleChange}
                      maxLength={6}
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-400">
                    Can't access your authenticator app?{' '}
                    <button type="button" className="text-yellow-400 hover:text-yellow-300 font-medium">
                      Use backup code
                    </button>
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-700 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
                  >
                    Verify and Continue
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, showMFA: false }))}
                    className="w-full flex justify-center py-2 px-4 text-sm font-medium text-gray-300 hover:text-white"
                  >
                    Back to login
                  </button>
                </div>
              </form>
            )}

            {/* Social Login Divider */}
            {!formData.showMFA && (
              <>
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {socialProviders.map((provider) => (
                      <div key={provider.name}>
                        <button
                          type="button"
                          onClick={() => handleSocialLogin(provider.name.toLowerCase())}
                          className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-700 rounded-lg shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors"
                        >
                          <span className="sr-only">Sign in with {provider.name}</span>
                          {provider.icon}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Security Info */}
          <div className="bg-gray-900/50 px-6 py-4 border-t border-gray-700">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-xs text-gray-400">
                  Your information is protected with 256-bit SSL encryption and never shared with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Rate Limiting Notice */}
        {loginAttempts >= 3 && (
          <div className="text-center text-xs text-gray-500 mt-4">
            <p>Too many failed attempts. Your account will be temporarily locked after {5 - loginAttempts} more failed attempts.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

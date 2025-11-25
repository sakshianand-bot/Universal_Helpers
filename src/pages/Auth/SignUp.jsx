import React, { useEffect, useRef, useState } from "react";
// Using direct paths since shadcn components are not set up yet
const Button = ({ children, className = '', ...props }) => (
  <button 
    className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Input = React.forwardRef(({ className = '', ...props }, ref) => (
  <input
    className={`border border-gray-300 rounded p-2 ${className}`}
    ref={ref}
    {...props}
  />
));

const Label = ({ children, className = '', ...props }) => (
  <label className={`block text-sm font-medium text-gray-700 ${className}`} {...props}>
    {children}
  </label>
);
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { FaEnvelope, FaPhone, FaUserPlus, FaLock, FaArrowRight, FaArrowLeft, FaEye, FaEyeSlash, FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SignUp({ onBack }) {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTnC, setAcceptTnC] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpOpen, setOtpOpen] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // OTP inputs helpers
  const OTP_LENGTH = 6;
  const otpRefs = useRef([]);

  const focusInput = (index) => {
    const el = otpRefs.current[index];
    if (el) el.focus();
  };

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(0, 1);
    if (digit === "" && otp[index] === undefined) return;
    const chars = Array.from(otp.padEnd(OTP_LENGTH, " "));
    chars[index] = digit || "";
    const nextOtp = chars.join("").replace(/\s/g, "");
    setOtp(nextOtp);
    if (digit && index < OTP_LENGTH - 1) focusInput(index + 1);
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const chars = Array.from(otp);
        chars[index] = "";
        setOtp(chars.join(""));
      } else if (index > 0) {
        focusInput(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusInput(index - 1);
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      e.preventDefault();
      focusInput(index + 1);
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const text = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!text) return;
    setOtp(text);
    const lastIndex = Math.min(text.length, OTP_LENGTH) - 1;
    focusInput(Math.max(lastIndex, 0));
  };

  useEffect(() => {
    if (!otpOpen || resendIn <= 0) return;
    const t = setInterval(() => setResendIn((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [otpOpen, resendIn]);

  const requestOtp = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/registerUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, phone })
      });
      const data = await res.json();
      
      if (!res.ok) {
        if (data?.message && /already sent/i.test(data.message)) {
          setOtpOpen(true);
          setResendIn(300);
          toast.success(`OTP sent to ${email}`);
          return;
        }
        throw new Error(data?.message || "Failed to send OTP");
      }
      toast.success(`OTP sent to ${email}`);
      setOtpOpen(true);
      setResendIn(300);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }
    if (!acceptTnC) {
      toast.error("Please accept the Terms & Conditions");
      return;
    }
    await requestOtp();
  };

  const proceedToDetails = () => {
    if (!otp.trim() || otp.length !== 6) {
      toast.error("Enter the 6-digit OTP sent to your email");
      return;
    }
    setOtpOpen(false);
    setDetailsOpen(true);
  };

  const handleCompleteRegistration = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!gender) {
      toast.error("Please select your gender");
      return;
    }
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          gender,
          otp,
          password,
          auth_provider: "local",
        })
      });
      const data = await res.json();
      if (!res.ok) {
        const msg = data?.message || "Registration failed";
        if (/otp/i.test(msg) && (/invalid/i.test(msg) || /expired/i.test(msg))) {
          toast.error(msg);
          setDetailsOpen(false);
          setOtp("");
          setOtpOpen(true);
          return;
        }
        throw new Error(msg);
      }
      toast.success(data?.message || "Registered successfully");
      setDetailsOpen(false);
      onBack?.();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendIn > 0 || isResending) return;
    setIsResending(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, subject: "OTP Verification" })
      });
      const data = await res.json();
      if (!res.ok) {
        if (data?.message && /already sent/i.test(data.message)) {
          toast.success("OTP resent");
          setResendIn(300);
          return;
        }
        throw new Error(data?.message || "Failed to resend OTP");
      }
      setOtpOpen(true);
      toast.success("OTP resent");
      setResendIn(300);
    } catch (e) {
      toast.error(e.message || "Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  const handleTermsClick = () => {
    navigate('/termcondition');
  };

  const handlePrivacyClick = () => {
    navigate('/privacy');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="w-full max-w-md bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg mb-4">
              <FaUserPlus className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Create an Account</h2>
            <p className="mt-2 text-gray-400">Join us today to get started</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            <div className="space-y-4">
              <div className="w-full">
                <Label htmlFor="email" className="text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
                  <FaEnvelope className="h-4 w-4 text-yellow-500" />
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div className="w-full">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
                  <FaPhone className="h-4 w-4 text-yellow-500" />
                  Phone Number (Optional)
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+1 (___) ___-____"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isLoading}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <label className="flex items-start gap-3 text-sm text-gray-300">
                <input 
                  type="checkbox" 
                  className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-700 text-yellow-500 focus:ring-yellow-500 focus:ring-offset-gray-800" 
                  checked={acceptTnC} 
                  onChange={(e) => setAcceptTnC(e.target.checked)} 
                  disabled={isLoading} 
                />
                <span>
                  I agree to the{' '}
                  <button 
                    type="button" 
                    onClick={handleTermsClick} 
                    className="font-medium text-yellow-400 hover:text-yellow-300 underline underline-offset-2 transition-colors duration-200"
                  >
                    Terms & Conditions
                  </button>{' '}
                  and
                  <button 
                    type="button" 
                    onClick={handlePrivacyClick} 
                    className="font-medium text-yellow-400 hover:text-yellow-300 underline underline-offset-2 transition-colors duration-200 ml-1"
                  >
                    Privacy Policy
                  </button>.
                </span>
              </label>
            </div>
            <Button 
              onClick={handleSubmit}
              disabled={isLoading || !acceptTnC}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
          <div className="mt-6 pt-4 border-t border-gray-700">
            <p className="text-sm text-center text-gray-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-yellow-400 hover:text-yellow-300 font-medium px-1.5 py-0.5 -mx-1.5 transition-colors hover:underline focus:outline-none focus:ring-0 focus:ring-offset-0"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      <Dialog open={otpOpen} onOpenChange={(open) => {
        setOtpOpen(open);
        if (!open) {
          setOtp("");
          setResendIn(0);
        }
      }}>
        <DialogContent className="sm:max-w-[480px] rounded-xl bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Email Verification</DialogTitle>
            <DialogDescription className="text-gray-300">
              Enter the 6-digit OTP sent to
              <span className="ml-1 font-medium text-yellow-400">{email}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5">
            <div>
              <Label className="text-sm font-medium text-gray-300">One-Time Password</Label>
              <div
                className="mt-2 grid grid-cols-6 gap-2"
                onPaste={handleOtpPaste}
              >
                {Array.from({ length: OTP_LENGTH }).map((_, i) => (
                  <input
                    key={i}
                    ref={(el) => (otpRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    autoComplete="one-time-code"
                    value={otp[i] || ""}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="h-12 rounded-md border-2 border-gray-600 bg-gray-700 text-center text-lg font-medium text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30"
                    autoFocus={i === 0}
                  />
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-400">OTP expires in 5 minutes.</p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={handleResend}
                disabled={resendIn > 0 || isResending}
                className={`font-medium underline-offset-2 ${(resendIn > 0 || isResending) ? 'text-gray-500 cursor-not-allowed' : 'text-yellow-400 hover:text-yellow-300 underline'}`}
              >
                {isResending ? (
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"></div>
                    Resending...
                  </span>
                ) : resendIn > 0 ? (
                  `Resend in ${Math.floor(resendIn / 60)}:${(resendIn % 60).toString().padStart(2, '0')}` 
                ) : (
                  'Resend OTP'
                )}
              </button>
              <span className="text-gray-400">Didn't get it? Check spam folder.</span>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-3">
            <Button 
              variant="outline" 
              onClick={() => {
                setOtpOpen(false);
                setOtp("");
                setResendIn(0);
              }} 
              className="w-full sm:w-auto bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Cancel
            </Button>
            <Button 
              onClick={proceedToDetails} 
              disabled={isLoading || otp.length !== 6} 
              className="w-full sm:w-auto bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600"
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Details Modal */}
      <Dialog open={detailsOpen} onOpenChange={(open) => {
        setDetailsOpen(open);
        if (!open) {
          setPassword("");
        }
      }}>
        <DialogContent className="sm:max-w-[520px] rounded-xl bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Complete Your Profile</DialogTitle>
            <DialogDescription className="text-gray-300">
              Enter your details to finish creating your account.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dt-fn" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <FaUserPlus className="h-4 w-4 text-yellow-500" />
                  First Name
                </Label>
                <Input 
                  id="dt-fn" 
                  type="text" 
                  autoComplete="given-name" 
                  placeholder="John" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                  disabled={isLoading} 
                  required 
                  className="h-11 px-4 bg-gray-700 border-2 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dt-ln" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <FaUserPlus className="h-4 w-4 text-yellow-500" />
                  Last Name
                </Label>
                <Input 
                  id="dt-ln" 
                  type="text" 
                  autoComplete="family-name" 
                  placeholder="Doe" 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                  disabled={isLoading} 
                  required 
                  className="h-11 px-4 bg-gray-700 border-2 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dt-gender" className="text-sm font-medium text-gray-300">
                  Gender
                </Label>
                <select 
                  id="dt-gender" 
                  autoComplete="off" 
                  value={gender} 
                  onChange={(e) => setGender(e.target.value)} 
                  disabled={isLoading} 
                  required 
                  className="h-11 px-4 w-full rounded-md border-2 border-gray-600 bg-gray-700 text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30"
                >
                  <option value="" disabled>Choose...</option>
                  <option value="male" className="bg-gray-700">Male</option>
                  <option value="female" className="bg-gray-700">Female</option>
                  <option value="other" className="bg-gray-700">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dt-pw" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <FaLock className="h-4 w-4 text-yellow-500" />
                  Password
                </Label>
                <div className="relative">
                  <Input 
                    id="dt-pw" 
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password" 
                    placeholder="Create a password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    disabled={isLoading} 
                    required 
                    className="h-11 px-4 pl-10 bg-gray-700 border-2 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-yellow-400 focus:outline-none"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5" />
                    ) : (
                      <FaEye className="h-5 w-5" />
                    )}
                  </button>
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <p className="text-xs text-gray-400">Minimum 6 characters</p>
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-3">
            <Button 
              variant="outline" 
              onClick={() => setDetailsOpen(false)} 
              className="w-full sm:w-auto bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Back
            </Button>
            <Button 
              onClick={handleCompleteRegistration} 
              disabled={isLoading} 
              className="w-full sm:w-auto bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </div>
              ) : (
                'Finish Registration'
              )}
            </Button>
          </DialogFooter>
          
          {/* Security Footer */}
          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className="flex items-center justify-center space-x-2">
              <FaShieldAlt className="h-4 w-4 text-green-400" />
              <span className="text-xs text-gray-400">Your information is protected with 256-bit SSL encryption</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SignUp;
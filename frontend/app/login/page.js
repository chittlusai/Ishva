"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, Building, Briefcase, ChevronRight, CheckCircle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/userContext";
import CustomModal from "@/components/CustomModal";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const { loginUser } = useUser();

  const [step, setStep] = useState(0); // 0: Login, 1: OTP, 2: Business Type, 3: Budget, 4: Features
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, message: "", type: "success" });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    businessName: "",
    websiteType: "",
    budget: "",
    features: []
  });

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const requestOTP = () => {
    // Simulate sending OTP
    setOtpSent(true);
    setStep(1);
  };

  const verifyOTP = () => {
    if (otp === "1234") { // Mock verification
      setStep(2);
    } else {
      setModalConfig({ isOpen: true, message: "Invalid OTP! Try 1234", type: "error" });
    }
  };

  const toggleFeature = (f) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(f) 
        ? prev.features.filter(i => i !== f)
        : [...prev.features, f]
    }));
  };

  const finishOnboarding = () => {
    // Save to global context
    loginUser(formData);
    // Redirect to home or templates based on context
    router.push("/templates");
  };

  // Remember Login Effect
  useEffect(() => {
    const saved = localStorage.getItem("ishiva_user_profile");
    if (saved) {
      router.push("/profile");
    }
  }, [router]);

  const inputStyle = {
    width: "100%", padding: "14px 16px", borderRadius: 12,
    border: "1px solid var(--color-border-glass)", background: "rgba(255,255,255,0.03)",
    color: "white", fontSize: "0.95rem", outline: "none", transition: "all 0.3s"
  };

  const focusStyle = (e) => {
    e.target.style.borderColor = "var(--color-neon-purple)";
    e.target.style.background = "rgba(168,85,247,0.05)";
  };
  const blurStyle = (e) => {
    e.target.style.borderColor = "var(--color-border-glass)";
    e.target.style.background = "rgba(255,255,255,0.03)";
  };

  const countryCodes = ["+1", "+7", "+20", "+27", "+30", "+31", "+32", "+33", "+34", "+36", "+39", "+40", "+41", "+43", "+44", "+45", "+46", "+47", "+48", "+49", "+51", "+52", "+53", "+54", "+55", "+56", "+57", "+58", "+60", "+61", "+62", "+63", "+64", "+65", "+66", "+81", "+82", "+84", "+86", "+90", "+91", "+92", "+93", "+94", "+95", "+98", "+212", "+213", "+216", "+218", "+234", "+254", "+351", "+353", "+358", "+359", "+375", "+380", "+852", "+886", "+966", "+971", "+972"];

  const types = ["Ecommerce", "Portfolio", "Business", "SaaS", "Blog", "Other"];
  const budgets = ["Under ₹50K", "₹50K - ₹1L", "₹1L - ₹5L", "₹5L+"];
  const featureList = ["Payments", "User Login", "Booking System", "Live Chat", "Admin Panel", "AI Integration"];

  return (
    <>
      <CustomModal {...modalConfig} onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} />
      <Navbar />
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 72, background: "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.1) 0%, transparent 60%)" }}>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card"
          style={{ width: "90%", maxWidth: 500, padding: "2.5rem", borderRadius: 24, position: "relative", overflow: "hidden" }}
        >
          {/* Progress Bar */}
          <div style={{ position: "absolute", top: 0, left: 0, height: 4, background: "var(--color-border-glass)", width: "100%" }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(step / 3) * 100}%` }}
              style={{ height: "100%", background: "linear-gradient(90deg, var(--color-neon-purple), var(--color-neon-cyan))" }}
            />
          </div>

          <AnimatePresence mode="popLayout">
            {/* STEP 0: LOGIN */}
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", color: "white", marginBottom: 8 }}>Welcome to <span className="text-gradient">Ishiva</span></h1>
                <p style={{ color: "var(--color-text-secondary)", marginBottom: 24, fontSize: "0.9rem" }}>Create your account to unlock personalized templates and AI assistance.</p>
                
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: 6 }}>Full Name</label>
                    <div style={{ position: "relative" }}>
                      <User size={18} style={{ position: "absolute", top: 16, left: 16, color: "var(--color-text-muted)" }} />
                      <input type="text" placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{...inputStyle, paddingLeft: 46}} onFocus={focusStyle} onBlur={blurStyle} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: 6 }}>Email</label>
                    <div style={{ position: "relative" }}>
                      <Mail size={18} style={{ position: "absolute", top: 16, left: 16, color: "var(--color-text-muted)" }} />
                      <input type="email" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{...inputStyle, paddingLeft: 46}} onFocus={focusStyle} onBlur={blurStyle} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: 6 }}>Phone Number</label>
                    <div style={{ display: "flex", gap: 8 }}>
                      <select 
                        value={formData.countryCode} 
                        onChange={e => setFormData({...formData, countryCode: e.target.value})}
                        style={{ padding: "14px", borderRadius: 12, border: "1px solid var(--color-border-glass)", background: "rgba(255,255,255,0.03)", color: "white", outline: "none", cursor: "pointer" }}
                      >
                         {countryCodes.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <div style={{ position: "relative", flexGrow: 1 }}>
                        <Phone size={18} style={{ position: "absolute", top: 16, left: 16, color: "var(--color-text-muted)" }} />
                        <input type="tel" placeholder="98765 43210" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{...inputStyle, paddingLeft: 46}} onFocus={focusStyle} onBlur={blurStyle} />
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={requestOTP} 
                  disabled={!formData.name || !formData.email}
                  className="btn-primary" 
                  style={{ width: "100%", marginTop: 32, padding: "1rem", opacity: (!formData.name || !formData.email) ? 0.5 : 1 }}
                >
                  Continue <ChevronRight size={18} />
                </button>
              </motion.div>
            )}

            {/* STEP 1: OTP VERIFICATION */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <button onClick={handleBack} style={{ background: "none", border: "none", color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: 4, cursor: "pointer", marginBottom: 16 }}><ArrowLeft size={16} /> Back</button>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "white", marginBottom: 8 }}>Verify your <span className="text-gradient">Email</span></h2>
                <p style={{ color: "var(--color-text-secondary)", marginBottom: 24, fontSize: "0.9rem" }}>We sent a secure code to {formData.email}</p>
                
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: 6 }}>Enter OTP (Test: 1234)</label>
                  <input type="text" placeholder="● ● ● ●" value={otp} onChange={e => setOtp(e.target.value)} style={{...inputStyle, textAlign: "center", letterSpacing: "0.5em", fontSize: "1.2rem"}} onFocus={focusStyle} onBlur={blurStyle} maxLength={4} />
                </div>

                <button 
                  onClick={verifyOTP} 
                  disabled={otp.length !== 4}
                  className="btn-primary" 
                  style={{ width: "100%", marginTop: 32, padding: "1rem", opacity: otp.length !== 4 ? 0.5 : 1 }}
                >
                  Verify <CheckCircle size={18} />
                </button>
              </motion.div>
            )}

            {/* STEP 2: BUSINESS TYPE */}
            {step === 2 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <button onClick={handleBack} style={{ background: "none", border: "none", color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: 4, cursor: "pointer", marginBottom: 16 }}><ArrowLeft size={16} /> Back</button>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "white", marginBottom: 8 }}>Tell us about your business</h2>
                <p style={{ color: "var(--color-text-secondary)", marginBottom: 24, fontSize: "0.9rem" }}>This helps us tailor the templates for you.</p>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: 6 }}>Business Name</label>
                  <div style={{ position: "relative" }}>
                    <Building size={18} style={{ position: "absolute", top: 16, left: 16, color: "var(--color-text-muted)" }} />
                    <input type="text" placeholder="e.g. Skyline Ventures" value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} style={{...inputStyle, paddingLeft: 46}} onFocus={focusStyle} onBlur={blurStyle} />
                  </div>
                </div>

                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: 12 }}>What are you building?</label>
                <div className="responsive-grid" style={{ gap: 12 }}>
                  {types.map(t => (
                    <button
                      key={t}
                      onClick={() => setFormData({...formData, websiteType: t})}
                      style={{
                        padding: "12px", borderRadius: 12, border: `1px solid ${formData.websiteType === t ? 'var(--color-neon-purple)' : 'var(--color-border-glass)'}`,
                        background: formData.websiteType === t ? 'rgba(168,85,247,0.1)' : 'rgba(255,255,255,0.03)',
                        color: formData.websiteType === t ? 'white' : 'var(--color-text-secondary)',
                        cursor: "pointer", transition: "all 0.2s"
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={handleNext} 
                  disabled={!formData.businessName || !formData.websiteType}
                  className="btn-primary" 
                  style={{ width: "100%", marginTop: 32, padding: "1rem", opacity: (!formData.businessName || !formData.websiteType) ? 0.5 : 1 }}
                >
                  Continue <ChevronRight size={18} />
                </button>
              </motion.div>
            )}

            {/* STEP 3: BUDGET */}
            {step === 3 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <button onClick={handleBack} style={{ background: "none", border: "none", color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: 4, cursor: "pointer", marginBottom: 16 }}><ArrowLeft size={16} /> Back</button>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "white", marginBottom: 8 }}>What's your project budget?</h2>
                <p style={{ color: "var(--color-text-secondary)", marginBottom: 24, fontSize: "0.9rem" }}>We provide expert solutions for all scales.</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {budgets.map(b => (
                    <button
                      key={b}
                      onClick={() => setFormData({...formData, budget: b})}
                      style={{
                        padding: "16px", borderRadius: 12, border: `1px solid ${formData.budget === b ? 'var(--color-neon-cyan)' : 'var(--color-border-glass)'}`,
                        background: formData.budget === b ? 'rgba(6,182,212,0.1)' : 'rgba(255,255,255,0.03)',
                        color: formData.budget === b ? 'white' : 'var(--color-text-secondary)',
                        cursor: "pointer", transition: "all 0.2s", textAlign: "left", display: "flex", alignItems: "center", gap: 12
                      }}
                    >
                      <Briefcase size={18} color={formData.budget === b ? "var(--color-neon-cyan)" : "var(--color-text-muted)"} />
                      {b}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={handleNext} 
                  disabled={!formData.budget}
                  className="btn-primary" 
                  style={{ width: "100%", marginTop: 32, padding: "1rem", opacity: !formData.budget ? 0.5 : 1 }}
                >
                  Continue <ChevronRight size={18} />
                </button>
              </motion.div>
            )}

            {/* STEP 4: FEATURES */}
            {step === 4 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <button onClick={handleBack} style={{ background: "none", border: "none", color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: 4, cursor: "pointer", marginBottom: 16 }}><ArrowLeft size={16} /> Back</button>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "white", marginBottom: 8 }}>Select key features</h2>
                <p style={{ color: "var(--color-text-secondary)", marginBottom: 24, fontSize: "0.9rem" }}>Pick what you need, we'll handle the rest.</p>

                <div className="responsive-grid" style={{ gap: 12 }}>
                  {featureList.map(f => {
                    const isSelected = formData.features.includes(f);
                    return (
                      <button
                        key={f}
                        onClick={() => toggleFeature(f)}
                        style={{
                          padding: "16px 12px", borderRadius: 12, border: `1px solid ${isSelected ? 'var(--color-neon-green)' : 'var(--color-border-glass)'}`,
                          background: isSelected ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.03)',
                          color: isSelected ? 'white' : 'var(--color-text-secondary)',
                          cursor: "pointer", transition: "all 0.2s", textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between"
                        }}
                      >
                        {f}
                        {isSelected && <CheckCircle size={16} color="var(--color-neon-green)" />}
                      </button>
                    )
                  })}
                </div>

                <button 
                  onClick={finishOnboarding} 
                  className="btn-primary" 
                  style={{ width: "100%", marginTop: 32, padding: "1rem" }}
                >
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    Create My Profile <CheckCircle size={18} />
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </>
  );
}

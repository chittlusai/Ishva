"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, ArrowRight, ArrowLeft, Monitor, LineChart, Cpu, Layout, 
  Paintbrush, Megaphone, Server, Shield, Smartphone, PenTool,
  Calendar, Clock, Users, CreditCard, Send
} from "lucide-react";
import { MessageSquare, X, Sparkles, User, UserCheck } from "lucide-react";
import { useUser } from "@/lib/userContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// --- Data ---
const SERVICES = [
  { id: "web", title: "Web Development", price: 50000, icon: Monitor, desc: "Custom Next.js web applications" },
  { id: "seo", title: "SEO Optimization", price: 20000, icon: LineChart, desc: "On-page & Off-page SEO" },
  { id: "ai", title: "AI Automation", price: 80000, icon: Cpu, desc: "Custom LLMs & chatbots" },
  { id: "design", title: "UI/UX Design", price: 40000, icon: Layout, desc: "Figma prototyping & branding" },
  { id: "ads", title: "Performance Ads", price: 30000, icon: Megaphone, desc: "Meta & Google Ads management" },
  { id: "backend", title: "Backend Systems", price: 60000, icon: Server, desc: "Node.js & Database architecture" },
];

const ADDONS = [
  { id: "responsive", title: "Mobile Responsive", price: 0, icon: Smartphone },
  { id: "security", title: "Advanced Security", price: 15000, icon: Shield },
  { id: "copy", title: "Copywriting", price: 25000, icon: PenTool },
  { id: "maintenance", title: "1 Year Maintenance", price: 50000, icon: CheckCircle },
];

const TEAMS = [
  { id: "seo_team", name: "SEO Team", desc: "For ranking strategies" },
  { id: "backend_dev", name: "Backend Dev Team", desc: "For architecture planning" },
  { id: "full_stack", name: "Full Stack Team", desc: "For end-to-end builds" },
  { id: "ui_ux", name: "UI/UX Design Team", desc: "For brand identity" },
  { id: "marketing", name: "Marketing & Ads Team", desc: "For ad campaign planning" },
];

export default function QuotationPage() {
  const { userProfile } = useUser();
  const [step, setStep] = useState(0); // 0: Popup, 1: Services, 2: Addons, 3: Quote, 4: Schedule, 5: Payment
  
  // State for initial popup lead form
  const [leadForm, setLeadForm] = useState({
    name: userProfile?.name || "", 
    phone: userProfile?.phone || "", 
    requirement: userProfile?.businessName ? `Need a ${userProfile.websiteType} for ${userProfile.businessName}` : ""
  });
  const [leadSubmitted, setLeadSubmitted] = useState(!userProfile ? false : true); // skip if logged in

  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState(["responsive"]); // Free included

  const [schedule, setSchedule] = useState({ date: "", time: "", team: "" });
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    // If user is already logged in, skip the popup
    if (userProfile && !leadSubmitted) {
      setStep(1);
      setLeadSubmitted(true);
    }
  }, [userProfile]);

  const total = selectedServices.reduce((sum, id) => sum + SERVICES.find(s => s.id === id).price, 0)
              + selectedAddons.reduce((sum, id) => sum + ADDONS.find(a => a.id === id).price, 0);

  const bookingFee = total * 0.10; // 10% booking fee

  const toggleService = (id) => {
    setSelectedServices(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleAddon = (id) => {
    if (id === "responsive") return; // Cannot turn off free default
    setSelectedAddons(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(price);

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;
    
    try {
      await fetch('/api/submit-lead', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadForm)
      });
    } catch(e) { console.error(e) }

    setLeadSubmitted(true);
    setStep(1);
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: 72, paddingBottom: "4rem" }}>
        <div className="section-container" style={{ maxWidth: 800, margin: "0 auto" }}>
          
          <AnimatePresence mode="wait">
            
            {/* STEP 0: POPUP FORM */}
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="glass-card" style={{ padding: "3rem", borderRadius: 24, textAlign: "center" }}>
                <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", marginBottom: 12 }}>Check <span className="text-gradient">Pricing</span></h1>
                <p style={{ color: "var(--color-text-secondary)", marginBottom: 32 }}>Tell us a bit about yourself before we start building your custom quote.</p>
                <form onSubmit={handleLeadSubmit} style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "left" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: 6 }}>Full Name</label>
                    <input autoFocus required type="text" value={leadForm.name} onChange={e=>setLeadForm({...leadForm, name: e.target.value})} style={{ width: "100%", padding: "14px", borderRadius: 12, border: "1px solid var(--color-border-glass)", background: "rgba(255,255,255,0.03)", color: "white", outline: "none" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: 6 }}>Phone Number</label>
                    <input required type="tel" value={leadForm.phone} onChange={e=>setLeadForm({...leadForm, phone: e.target.value})} style={{ width: "100%", padding: "14px", borderRadius: 12, border: "1px solid var(--color-border-glass)", background: "rgba(255,255,255,0.03)", color: "white", outline: "none" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: 6 }}>Basic Requirement</label>
                    <textarea rows={3} value={leadForm.requirement} onChange={e=>setLeadForm({...leadForm, requirement: e.target.value})} placeholder="e.g. Need a portfolio website..." style={{ width: "100%", padding: "14px", borderRadius: 12, border: "1px solid var(--color-border-glass)", background: "rgba(255,255,255,0.03)", color: "white", outline: "none", resize: "none" }} />
                  </div>
                  <button type="submit" className="btn-primary" style={{ padding: "1rem", marginTop: 16 }}>Start Quotation <ArrowRight size={18} /></button>
                </form>
              </motion.div>
            )}

            {/* PROGRESS HEADER (Steps 1-5) */}
            {step > 0 && (
              <div style={{ marginBottom: "3rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: "0.8rem", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
                   <span>Services</span>
                   <span>Features</span>
                   <span>Summary</span>
                   <span>Schedule</span>
                   <span>Payment</span>
                </div>
                <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" }}>
                  <motion.div initial={{ width: "0%" }} animate={{ width: `${((step-1)/4)*100}%` }} transition={{ duration: 0.3 }} style={{ height: "100%", background: "linear-gradient(90deg, var(--color-neon-purple), var(--color-neon-cyan))" }} />
                </div>
              </div>
            )}

            {/* STEP 1: SERVICES */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="section-title" style={{ textAlign: "center", marginBottom: "2rem" }}>Select Core <span className="text-gradient">Services</span></h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "3rem" }}>
                  {SERVICES.map(s => {
                    const isSelected = selectedServices.includes(s.id);
                    return (
                      <div key={s.id} onClick={() => toggleService(s.id)} className="glass-card" style={{ padding: "1.5rem", borderRadius: 16, cursor: "pointer", border: `1px solid ${isSelected ? 'var(--color-neon-purple)' : 'var(--color-border-glass)'}`, background: isSelected ? 'rgba(168,85,247,0.1)' : 'rgba(255,255,255,0.03)', transition: "all 0.2s" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                           <s.icon size={24} color={isSelected ? "var(--color-neon-purple)" : "white"} />
                           {isSelected && <CheckCircle size={20} color="var(--color-neon-purple)" />}
                        </div>
                        <h4 style={{ fontFamily: "var(--font-heading)", color: "white", fontSize: "1.1rem", marginBottom: 4 }}>{s.title}</h4>
                        <p style={{ color: "var(--color-text-muted)", fontSize: "0.8rem", marginBottom: 12 }}>{s.desc}</p>
                        <div style={{ fontSize: "0.9rem", color: "var(--color-neon-cyan)", fontWeight: 600 }}>{formatPrice(s.price)}</div>
                      </div>
                    )
                  })}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <button className="btn-outline" disabled style={{ opacity: 0 }}>Back</button>
                  <button className="btn-primary" onClick={nextStep} disabled={selectedServices.length === 0}>Next Step <ArrowRight size={18} /></button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: ADDONS */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="section-title" style={{ textAlign: "center", marginBottom: "2rem" }}>Choose <span className="text-gradient">Add-ons</span></h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem", marginBottom: "3rem" }}>
                  {ADDONS.map(a => {
                    const isSelected = selectedAddons.includes(a.id);
                    return (
                      <div key={a.id} onClick={() => toggleAddon(a.id)} className="glass" style={{ padding: "1.25rem 1.5rem", borderRadius: 16, cursor: a.id === "responsive" ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", border: `1px solid ${isSelected ? 'var(--color-neon-blue)' : 'var(--color-border-glass)'}`, background: isSelected ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.03)' }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                          <a.icon size={20} color={isSelected ? "var(--color-neon-blue)" : "var(--color-text-secondary)"} />
                          <h4 style={{ color: "white", fontSize: "1rem", fontFamily: "var(--font-heading)" }}>{a.title}</h4>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                           <span style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>{a.price === 0 ? "Included" : `+ ${formatPrice(a.price)}`}</span>
                           {isSelected ? <CheckCircle size={20} color="var(--color-neon-blue)" /> : <div style={{width: 20, height: 20, borderRadius: "50%", border: "1px solid var(--color-border-glass)"}}/>}
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <button className="btn-outline" onClick={prevStep}><ArrowLeft size={18} /> Back</button>
                  <button className="btn-primary" onClick={nextStep}>View Summary <ArrowRight size={18} /></button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: SUMMARY */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="section-title" style={{ textAlign: "center", marginBottom: "2rem" }}>Proposal <span className="text-gradient">Summary</span></h2>
                <div className="glass-card" style={{ padding: "2rem", borderRadius: 16, marginBottom: "2rem" }}>
                   <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24, paddingBottom: 24, borderBottom: "1px dashed var(--color-border-glass)" }}>
                     {selectedServices.map(id => {
                       const s = SERVICES.find(x => x.id === id);
                       return (
                         <div key={id} style={{ display: "flex", justifyContent: "space-between", color: "white", fontSize: "1rem" }}>
                           <span style={{ display: "flex", alignItems: "center", gap: 8 }}><CheckCircle size={14} color="var(--color-neon-purple)"/> {s.title}</span>
                           <span>{formatPrice(s.price)}</span>
                         </div>
                       )
                     })}
                     {selectedAddons.filter(id => id !== "responsive").map(id => {
                       const a = ADDONS.find(x => x.id === id);
                       return (
                         <div key={id} style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
                           <span style={{ display: "flex", alignItems: "center", gap: 8 }}>+ {a.title}</span>
                           <span>{formatPrice(a.price)}</span>
                         </div>
                       )
                     })}
                   </div>
                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                     <span style={{ fontSize: "1.2rem", color: "white", fontFamily: "var(--font-heading)", fontWeight: 600 }}>Total Estimate</span>
                     <span style={{ fontSize: "1.8rem", color: "var(--color-neon-cyan)", fontFamily: "var(--font-heading)", fontWeight: 800 }}>{formatPrice(total)}</span>
                   </div>
                </div>

                <div className="glass" style={{ padding: "1.5rem", borderRadius: 16, marginBottom: "3rem", background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <h4 style={{ color: "white", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}><CheckCircle size={18} color="var(--color-neon-green)" /> Next Step: Schedule Discovery Call</h4>
                  <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>To proceed with this exact quotation, let's schedule a 30-min strategy call with our specialists. You can pay the 10% booking fee ({formatPrice(bookingFee)}) after scheduling to lock in this rate.</p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <button className="btn-outline" onClick={prevStep}><ArrowLeft size={18} /> Back</button>
                  <button className="btn-primary" onClick={nextStep}>Schedule Call <ArrowRight size={18} /></button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: SCHEDULE CALL */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="section-title" style={{ textAlign: "center", marginBottom: "2rem" }}>Schedule <span className="text-gradient">Discovery</span></h2>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                  {/* Date/Time */}
                  <div className="glass-card" style={{ padding: "1.5rem", borderRadius: 16 }}>
                    <h3 style={{ color: "white", fontSize: "1rem", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><Calendar size={18} /> Select Time</h3>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: 6 }}>Date</label>
                      <input type="date" required value={schedule.date} onChange={e=>setSchedule({...schedule, date: e.target.value})} style={{ width: "100%", padding: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--color-border-glass)", borderRadius: 8, color: "white", outline: "none" }}/>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: 6 }}>Time</label>
                      <input type="time" required value={schedule.time} onChange={e=>setSchedule({...schedule, time: e.target.value})} style={{ width: "100%", padding: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--color-border-glass)", borderRadius: 8, color: "white", outline: "none" }}/>
                    </div>
                  </div>

                  {/* Team */}
                  <div className="glass-card" style={{ padding: "1.5rem", borderRadius: 16 }}>
                    <h3 style={{ color: "white", fontSize: "1rem", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><Users size={18} /> Preferred Team</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {TEAMS.map(team => (
                        <div 
                          key={team.id}
                          onClick={() => setSchedule({...schedule, team: team.id})}
                          style={{ padding: "10px 12px", borderRadius: 8, border: `1px solid ${schedule.team === team.id ? 'var(--color-neon-purple)' : 'var(--color-border-glass)'}`, background: schedule.team === team.id ? 'rgba(168,85,247,0.1)' : 'transparent', cursor: "pointer" }}
                        >
                          <div style={{ color: "white", fontSize: "0.9rem", fontWeight: 500 }}>{team.name}</div>
                          <div style={{ color: "var(--color-text-muted)", fontSize: "0.75rem" }}>{team.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
                  <button className="btn-outline" onClick={prevStep}><ArrowLeft size={18} /> Back</button>
                  <button className="btn-primary" onClick={nextStep} disabled={!schedule.date || !schedule.time || !schedule.team}>Proceed to Payment <ArrowRight size={18} /></button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: PAYMENT */}
            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="section-title" style={{ textAlign: "center", marginBottom: "2rem" }}>Confirm & <span className="text-gradient">Pay</span></h2>
                
                <div className="glass-card" style={{ padding: "2rem", borderRadius: 16, marginBottom: "2rem", textAlign: "center" }}>
                   <div style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>10% Booking Fee</div>
                   <div style={{ fontSize: "2.5rem", color: "white", fontFamily: "var(--font-heading)", fontWeight: 800, marginBottom: 24 }}>{formatPrice(bookingFee)}</div>
                   <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: "0.85rem", color: "var(--color-neon-green)", background: "rgba(16,185,129,0.1)", padding: "8px 16px", borderRadius: 20, width: "fit-content", margin: "0 auto" }}>
                     <CheckCircle size={16} /> 100% Refundable Guarantee
                   </div>
                </div>

                <h3 style={{ color: "white", fontFamily: "var(--font-heading)", fontSize: "1.1rem", marginBottom: 16 }}>Select Payment Method</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: "3rem" }}>
                   {["UPI (GPay, PhonePe)", "Credit/Debit Card", "Net Banking"].map(method => (
                     <div 
                       key={method}
                       onClick={() => setPaymentMethod(method)}
                       style={{ padding: "16px", borderRadius: 12, display: "flex", alignItems: "center", gap: 16, cursor: "pointer", border: `1px solid ${paymentMethod === method ? 'var(--color-neon-cyan)' : 'var(--color-border-glass)'}`, background: paymentMethod === method ? 'rgba(6,182,212,0.1)' : 'rgba(255,255,255,0.03)' }}
                     >
                       <CreditCard size={20} color={paymentMethod === method ? 'var(--color-neon-cyan)' : 'var(--color-text-secondary)'} />
                       <span style={{ color: "white", fontSize: "0.95rem" }}>{method}</span>
                       <div style={{ marginLeft: "auto", width: 20, height: 20, borderRadius: "50%", border: `2px solid ${paymentMethod === method ? 'var(--color-neon-cyan)' : 'var(--color-border-glass)'}`, background: paymentMethod === method ? 'var(--color-neon-cyan)' : 'transparent' }}/>
                     </div>
                   ))}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <button className="btn-outline" onClick={prevStep}><ArrowLeft size={18} /> Back</button>
                  <button className="btn-primary" onClick={() => alert("Redirecting to payment gateway...")} disabled={!paymentMethod} style={{ padding: "1rem 2rem" }}>
                    Pay {formatPrice(bookingFee)} <CheckCircle size={18} />
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}

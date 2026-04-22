"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, User, UserCheck } from "lucide-react";
import { useUser } from "@/lib/userContext";

// Simulated AI Brain
const QA_DATABASE = [
  { keywords: ["price", "cost", "how much", "budget", "pricing"], answer: "Our base websites start at ₹50,000, and fully custom SaaS platforms can range from ₹1L to ₹5L+. It depends on your features. Use our /quotation page to get an exact estimate!" },
  { keywords: ["template", "templates", "themes"], answer: "We have dozens of premium templates built on Next.js 15. Check them out on the /templates page! If you describe your business there, we'll auto-filter them for you." },
  { keywords: ["time", "timeline", "how long", "fast"], answer: "A standard website takes 2-3 weeks to build. E-commerce takes 4-6 weeks, and custom web apps take 6-12 weeks." },
  { keywords: ["seo", "rank", "google"], answer: "Yes! All our templates are SEO-optimized out of the box. We also offer advanced Performance Marketing and SEO services as add-ons to guarantee 1st-page rankings." },
  { keywords: ["technology", "tech stack", "framework", "nextjs", "react"], answer: "We build everything on the modern web stack: Next.js 15, React 19, Tailwind CSS v4, and Framer Motion. This guarantees 100/100 Lighthouse scores." },
  { keywords: ["support", "maintenance", "help"], answer: "We offer a 1-year maintenance package that covers security updates, content changes, and 24/7 priority support." },
  { keywords: ["contact", "call", "schedule", "meeting", "talk"], answer: "You can schedule a discovery call with our specialists directly via the /quotation page, or use the /contact page to email us." },
  { keywords: ["ai", "chatbot", "automation"], answer: "We specialize in AI! We can build context-aware chatbots (like me!), automate your CRM, or integrate LLMs into your systems." },
  { keywords: ["design", "ui", "ux", "figma"], answer: "Our UI/UX team delivers Apple-level minimalism and Web3 aesthetics using Figma. We provide 3 revisions before writing any code." },
  { keywords: ["domain", "hosting", "server"], answer: "We handle end-to-end deployment. We typically deploy Next.js apps on Vercel for edge network speeds, and provide domain registration assistance." },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  
  const { userProfile } = useUser(); // Using global context to be smart!

  useEffect(() => {
    // Initial greeting based on context
    const greeting = userProfile?.name
      ? `Hi ${userProfile.name.split(" ")[0]}! I see you're building a ${userProfile.websiteType} for ${userProfile.businessName}. How can I help you scale today?`
      : "Hi there! I'm Ira, your AI assistant. Have questions about our services or pricing? Just ask!";
    
    setMessages([{ role: "assistant", text: greeting, sender: "Ira AI" }]);
  }, [userProfile]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (providedText = null) => {
    const text = typeof providedText === "string" ? providedText : input;
    if (!text.trim()) return;

    setMessages(prev => [...prev, { role: "user", text, sender: userProfile?.name || "You" }]);
    setInput("");

    // Simulate AI thinking
    setTimeout(() => {
      let matched = false;
      const lowerText = text.toLowerCase();
      
      // Personalization logic
      if ((lowerText.includes("my project") || lowerText.includes("my business")) && userProfile) {
        setMessages(prev => [...prev, { 
          role: "assistant", 
          text: `Since you're building a ${userProfile.websiteType} with a budget of ${userProfile.budget}, I highly recommend our Full Stack Team. Should we jump on a discovery call?`, 
          sender: "Ira AI" 
        }]);
        matched = true;
      } else {
        // Keyword Search
        for (const qa of QA_DATABASE) {
          if (qa.keywords.some(kw => lowerText.includes(kw))) {
            setMessages(prev => [...prev, { role: "assistant", text: qa.answer, sender: "Ira AI" }]);
            matched = true;
            break;
          }
        }
      }

      if (!matched) {
        setMessages(prev => [...prev, { 
          role: "assistant", 
          text: "That's an interesting question. To give you the best answer, I recommend booking a strategy call with our team via the Quotation page!", 
          sender: "Ira AI" 
        }]);
      }
    }, 600);
  };

  const suggestions = ["How much does a website cost?", "Who handles SEO?", "What tech do you use?"];

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="glass"
            style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000, width: 60, height: 60, borderRadius: "50%", border: "1px solid var(--color-neon-purple)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--color-neon-purple)", boxShadow: "0 0 30px rgba(168,85,247,0.3)" }}
            whileHover={{ scale: 1.1 }}
          >
            <MessageSquare size={26} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            className="glass-card"
            style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000, width: "calc(100vw - 48px)", maxWidth: 380, height: 500, borderRadius: 20, display: "flex", flexDirection: "column", overflow: "hidden", border: "1px solid rgba(168,85,247,0.3)", boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }}
          >
            {/* Header */}
            <div style={{ padding: "16px 20px", background: "linear-gradient(90deg, rgba(168,85,247,0.2), rgba(6,182,212,0.1))", borderBottom: "1px solid var(--color-border-glass)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-neon-green)", boxShadow: "0 0 10px var(--color-neon-green)" }} />
                <span style={{ color: "white", fontFamily: "var(--font-heading)", fontWeight: 600 }}>Ira AI <span style={{ color: "var(--color-text-muted)", fontSize: "0.8rem", fontWeight: 400 }}>Support</span></span>
                {userProfile && <UserCheck size={14} color="var(--color-neon-cyan)" style={{marginLeft: 4}} title={`Recognized: ${userProfile.name}`} />}
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "white", cursor: "pointer", display: "flex" }}>
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flexGrow: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start", gap: 4 }}>
                  <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", marginLeft: 4, marginRight: 4 }}>{m.sender}</span>
                  <div style={{ maxWidth: "85%", padding: "12px 16px", borderRadius: 16, fontSize: "0.9rem", lineHeight: 1.5, background: m.role === "user" ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.05)", color: "white", border: m.role === "user" ? "1px solid rgba(168,85,247,0.3)" : "1px solid var(--color-border-glass)", borderBottomRightRadius: m.role === "user" ? 4 : 16, borderBottomLeftRadius: m.role === "assistant" ? 4 : 16 }}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div style={{ padding: "0 20px 12px", display: "flex", gap: 8, overflowX: "auto" }}>
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => handleSend(s)} style={{ padding: "6px 12px", borderRadius: 20, border: "1px solid var(--color-border-glass)", background: "rgba(255,255,255,0.03)", color: "var(--color-neon-cyan)", fontSize: "0.75rem", cursor: "pointer", whiteSpace: "nowrap" }}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ padding: "16px", borderTop: "1px solid var(--color-border-glass)", background: "rgba(0,0,0,0.2)" }}>
              <form onSubmit={e => { e.preventDefault(); handleSend(); }} style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  placeholder="Ask about our services..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  style={{ width: "100%", padding: "12px 48px 12px 16px", borderRadius: 24, background: "rgba(255,255,255,0.1)", border: "1px solid var(--color-border-glass)", color: "white", outline: "none", fontSize: "0.9rem" }}
                  onFocus={e => e.target.style.borderColor = "var(--color-neon-purple)"}
                  onBlur={e => e.target.style.borderColor = "var(--color-border-glass)"}
                />
                <button type="submit" style={{ position: "absolute", right: 12, background: "none", border: "none", color: input.trim() ? "var(--color-neon-purple)" : "var(--color-text-muted)", cursor: input.trim() ? "pointer" : "default", display: "flex", transition: "color 0.2s" }} disabled={!input.trim()}>
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Send,
  FileCode2,
  Folder,
  GitBranch,
  Database,
  Cpu,
  Sparkles,
  Copy,
  Download,
  Maximize2,
  Plus,
  History,
  Settings,
  Lock,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/AuroraBackground";
import { Logo } from "@/components/Logo";
import { MermaidDiagram } from "@/components/MermaidDiagram";

type Msg = {
  role: "user" | "assistant";
  text: string;
  citations?: { file: string; lines: string }[];
  diagram?: string;
};

const initialMessages: Msg[] = [
  {
    role: "assistant",
    text:
      "Repository indexed successfully. **2,847 chunks** across **312 files** are now searchable. Ask me anything about the codebase — architecture, specific functions, data flows, security patterns.",
  },
];

const sampleConvo: Msg[] = [
  {
    role: "user",
    text: "Where is user authentication handled and how is the password encrypted?",
  },
  {
    role: "assistant",
    text:
      "Authentication is implemented in `auth/login.controller.js`. Passwords are hashed with **bcrypt** (10 salt rounds) before being persisted. JWTs are signed using HS256 and stored in an httpOnly cookie. Below is the actual data flow:",
    citations: [
      { file: "auth/login.controller.js", lines: "L42-L78" },
      { file: "models/user.model.js", lines: "L21-L34" },
      { file: "middleware/jwt.js", lines: "L8-L29" },
    ],
    diagram: `graph TD
    A[Client POST /login] --> B[login.controller.js]
    B --> C{User exists?}
    C -- No --> D[401 Unauthorized]
    C -- Yes --> E[bcrypt.compare]
    E -- Match --> F[jwt.sign HS256]
    F --> G[Set httpOnly cookie]
    G --> H[200 OK + user]
    E -- Mismatch --> D`,
  },
];

const suggestions = [
  "Explain the overall architecture",
  "Where is the database schema defined?",
  "Show me the payment processing flow",
  "What security middleware is in use?",
];

const Workspace = () => {
  const [messages, setMessages] = useState<Msg[]>(initialMessages);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [activeMsg, setActiveMsg] = useState<Msg | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const send = (text?: string) => {
    const q = (text ?? input).trim();
    if (!q || thinking) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      const reply = sampleConvo[1];
      setMessages((m) => [...m, reply]);
      setActiveMsg(reply);
      setThinking(false);
    }, 1400);
  };

  return (
    <div className="relative h-screen flex overflow-hidden">
      <AuroraBackground />

      {/* SIDEBAR */}
      <aside className="relative z-10 hidden md:flex flex-col w-64 border-r border-border/50 glass">
        <div className="p-4 border-b border-border/50">
          <Logo />
        </div>

        <div className="p-3">
          <Button asChild variant="hero" size="sm" className="w-full">
            <Link to="/upload"><Plus /> New Repository</Link>
          </Button>
        </div>

        <div className="px-3 pt-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground px-2 mb-2">Active Repository</div>
          <div className="glass rounded-lg p-3 border border-primary/20">
            <div className="flex items-center gap-2 text-sm font-medium">
              <GitBranch className="h-3.5 w-3.5 text-primary" />
              <span className="truncate">legacy-banking-app</span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-[10px] font-mono text-muted-foreground">
              <div className="flex items-center gap-1"><FileCode2 className="h-3 w-3" /> 312 files</div>
              <div className="flex items-center gap-1"><Database className="h-3 w-3" /> 2.8k chunks</div>
            </div>
          </div>
        </div>

        <div className="px-3 pt-5 flex-1 overflow-y-auto">
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground px-2 mb-2 flex items-center gap-2">
            <History className="h-3 w-3" /> Recent
          </div>
          <div className="space-y-1">
            {[
              "Authentication & encryption",
              "Database schema overview",
              "API endpoint inventory",
              "Payment gateway integration",
            ].map((t, i) => (
              <button
                key={t}
                className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-colors ${
                  i === 0 ? "bg-primary/10 text-foreground border border-primary/20" : "text-muted-foreground hover:bg-background/40 hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 border-t border-border/50 space-y-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/30 text-xs">
            <Cpu className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono">Llama-3 · 8B</span>
            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
          </div>
          <div className="flex items-center gap-2 px-3 text-[10px] font-mono text-muted-foreground">
            <Lock className="h-3 w-3 text-primary" /> 100% offline · zero leak
          </div>
          <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
            <Settings /> Settings
          </Button>
        </div>
      </aside>

      {/* CHAT COLUMN */}
      <main className="relative z-10 flex-1 flex flex-col min-w-0 border-r border-border/50">
        <header className="flex items-center justify-between px-6 py-3 border-b border-border/50 glass">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="icon" className="md:hidden">
              <Link to="/"><ArrowLeft /></Link>
            </Button>
            <div>
              <div className="text-sm font-display font-semibold">Code Conversation</div>
              <div className="text-[10px] font-mono text-muted-foreground flex items-center gap-1.5">
                <Folder className="h-3 w-3" /> ~/projects/legacy-banking-app
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
            <Button variant="glow" size="sm"><Sparkles /> New chat</Button>
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}
              >
                {m.role === "assistant" && (
                  <div className="h-8 w-8 rounded-lg bg-gradient-aurora flex items-center justify-center shrink-0 shadow-glow-primary">
                    <Sparkles className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                <div className={`max-w-[85%] ${m.role === "user" ? "" : ""}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-gradient-aurora text-primary-foreground font-medium"
                        : "glass"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: m.text
                        .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono text-xs">$1</code>')
                        .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground">$1</strong>'),
                    }}
                  />
                  {m.citations && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.citations.map((c) => (
                        <button
                          key={c.file}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono glass hover:border-primary/30 transition-colors"
                        >
                          <FileCode2 className="h-3 w-3 text-primary" />
                          {c.file}
                          <span className="text-muted-foreground">{c.lines}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  {m.diagram && (
                    <button
                      onClick={() => setActiveMsg(m)}
                      className="mt-3 inline-flex items-center gap-2 text-xs font-mono text-primary hover:text-primary-glow transition-colors"
                    >
                      <Maximize2 className="h-3 w-3" /> View flowchart →
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
            {thinking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="h-8 w-8 rounded-lg bg-gradient-aurora flex items-center justify-center shrink-0">
                  <Sparkles className="h-4 w-4 text-primary-foreground animate-pulse" />
                </div>
                <div className="glass rounded-2xl px-4 py-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span className="font-mono text-xs">retrieving · embedding · generating…</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* suggestions */}
        {messages.length <= 1 && (
          <div className="px-4 md:px-8 pb-3 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-xs px-3 py-1.5 rounded-full glass hover:border-primary/40 hover:text-foreground text-muted-foreground transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="p-4 md:px-8 md:pb-6 border-t border-border/50">
          <div className="glass-strong rounded-2xl flex items-end gap-2 p-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={1}
              placeholder="Ask about authentication, database schema, API endpoints…"
              className="flex-1 bg-transparent resize-none px-4 py-3 text-sm focus:outline-none placeholder:text-muted-foreground max-h-40"
            />
            <Button variant="hero" size="icon" onClick={() => send()} disabled={thinking || !input.trim()}>
              <Send />
            </Button>
          </div>
          <div className="text-[10px] font-mono text-muted-foreground mt-2 text-center">
            Llama-3 runs locally · Press <kbd className="px-1 rounded bg-muted">Enter</kbd> to send · <kbd className="px-1 rounded bg-muted">Shift+Enter</kbd> for newline
          </div>
        </div>
      </main>

      {/* FLOWCHART PANEL */}
      <aside className="relative z-10 hidden lg:flex flex-col w-[440px] xl:w-[520px]">
        <header className="flex items-center justify-between px-6 py-3 border-b border-border/50 glass">
          <div>
            <div className="text-sm font-display font-semibold">Live Flowchart</div>
            <div className="text-[10px] font-mono text-muted-foreground">Auto-generated via Mermaid.js</div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon"><Copy className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          {activeMsg?.diagram ? (
            <motion.div
              key={activeMsg.text}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="glass-strong rounded-2xl p-6 min-h-[400px] flex items-center justify-center"
            >
              <MermaidDiagram chart={activeMsg.diagram} />
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-8">
              <div className="h-14 w-14 rounded-2xl bg-gradient-aurora-soft border border-primary/20 flex items-center justify-center mb-4">
                <GitBranch className="h-6 w-6 text-primary" />
              </div>
              <div className="font-display font-semibold text-foreground mb-1">Flowcharts appear here</div>
              <p className="text-xs max-w-xs">
                Ask a question about a function, flow or architecture. CodeSage will diagram it for you in real time.
              </p>
            </div>
          )}

          {activeMsg?.diagram && (
            <div className="mt-4 glass rounded-xl p-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Mermaid Source</div>
              <pre className="text-[11px] font-mono text-muted-foreground overflow-x-auto leading-relaxed">{activeMsg.diagram}</pre>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default Workspace;

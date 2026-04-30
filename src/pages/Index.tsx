import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  GitBranch,
  Network,
  MessageSquareCode,
  Lock,
  Sparkles,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/AuroraBackground";
import { Logo } from "@/components/Logo";

const features = [
  {
    icon: Lock,
    title: "Zero Data Leak",
    desc: "Code never leaves your machine. 100% offline RAG pipeline running on Ollama + Llama-3.",
  },
  {
    icon: Network,
    title: "Live Flowcharts",
    desc: "Every answer comes with an animated Mermaid.js flowchart of the actual code path.",
  },
  {
    icon: GitBranch,
    title: "Any Repository",
    desc: "Drop a GitHub URL or .zip — JS, Python, Java, C++ — we chunk, embed and understand.",
  },
  {
    icon: MessageSquareCode,
    title: "Conversational",
    desc: "Ask questions in plain English. Get cited code chunks back, instantly.",
  },
  {
    icon: Cpu,
    title: "Local LLM",
    desc: "Llama-3 runs on your hardware. No API keys, no rate limits, no surveillance.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Ready",
    desc: "Built for legacy codebases at TCS, Infosys & beyond. Compliance-friendly by design.",
  },
];

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AuroraBackground />

      {/* NAV */}
      <header className="relative z-10 container flex items-center justify-between py-6">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#flow" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#" className="hover:text-foreground transition-colors">Docs</a>
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Github className="h-4 w-4" /> Star
          </Button>
          <Button asChild variant="hero" size="sm">
            <Link to="/upload">Launch App <ArrowRight /></Link>
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 container pt-20 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono tracking-wide text-muted-foreground mb-8"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
          v0.1 · Powered by Llama-3 · Runs 100% locally
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] max-w-5xl mx-auto"
        >
          Understand any codebase
          <br />
          <span className="text-aurora">without leaking a line.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          CodeSage ingests your repository, builds a private vector index,
          and lets a local Llama-3 explain it to you — with live flowcharts.
          Zero cloud. Zero compromise.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button asChild variant="hero" size="xl">
            <Link to="/upload">Analyze a Repository <ArrowRight /></Link>
          </Button>
          <Button asChild variant="glass" size="xl">
            <Link to="/workspace">View Live Demo</Link>
          </Button>
        </motion.div>

        {/* preview window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-24 max-w-5xl mx-auto"
        >
          <div className="glass-strong rounded-2xl p-2 shadow-elevated">
            <div className="rounded-xl bg-background/60 border border-border/50 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-destructive/70" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                  <div className="h-3 w-3 rounded-full bg-primary/70" />
                </div>
                <div className="flex-1 text-center text-xs font-mono text-muted-foreground">
                  codesage · ~/projects/legacy-banking-app
                </div>
              </div>
              <div className="grid md:grid-cols-2 divide-x divide-border/50 min-h-[320px]">
                <div className="p-6 text-left space-y-4">
                  <div className="text-xs font-mono text-muted-foreground">YOU</div>
                  <p className="text-sm">Where is user authentication and how is the password encrypted?</p>
                  <div className="text-xs font-mono text-primary mt-6">CODESAGE</div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Authentication lives in <code className="text-primary">auth/login.js</code>.
                    Passwords are hashed using <code className="text-primary">bcrypt</code> with
                    10 salt rounds before being persisted to the <code className="text-primary">users</code> table…
                  </p>
                </div>
                <div className="p-6 bg-gradient-aurora-soft flex items-center justify-center">
                  <div className="font-mono text-xs text-foreground/70 space-y-3 w-full">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1.5 rounded-md bg-background/60 border border-primary/30">User</span>
                      <span className="text-primary">→</span>
                      <span className="px-3 py-1.5 rounded-md bg-background/60 border border-primary/30">login.js</span>
                    </div>
                    <div className="flex items-center gap-3 ml-8">
                      <span className="text-secondary">↓</span>
                      <span className="px-3 py-1.5 rounded-md bg-background/60 border border-secondary/30">bcrypt.hash()</span>
                    </div>
                    <div className="flex items-center gap-3 ml-16">
                      <span className="text-accent">↓</span>
                      <span className="px-3 py-1.5 rounded-md bg-background/60 border border-accent/30">db.users.insert</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 container py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-primary mb-4">Features</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Built for codebases that <span className="text-aurora">can't go to the cloud.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass rounded-2xl p-6 group hover:border-primary/30 transition-all duration-300"
            >
              <div className="h-11 w-11 rounded-lg bg-gradient-aurora-soft border border-primary/20 flex items-center justify-center mb-5 group-hover:shadow-glow-primary transition-shadow">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="flow" className="relative z-10 container py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-primary mb-4">Pipeline</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Five stages. <span className="text-aurora">Zero round-trips.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-5 gap-4">
          {[
            { n: "01", t: "Ingest", d: "Clone repo or unzip archive" },
            { n: "02", t: "Chunk", d: "LangChain splits into 500–1k line blocks" },
            { n: "03", t: "Embed", d: "Vectors stored in local ChromaDB" },
            { n: "04", t: "Retrieve", d: "Top-K relevant chunks per query" },
            { n: "05", t: "Generate", d: "Llama-3 explains + draws Mermaid" },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-xl p-5"
            >
              <div className="font-mono text-xs text-primary mb-3">{s.n}</div>
              <div className="font-display font-semibold mb-1">{s.t}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{s.d}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 container py-24">
        <div className="glass-strong rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-aurora opacity-10" />
          <div className="relative">
            <Sparkles className="h-10 w-10 text-primary mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight max-w-2xl mx-auto">
              Your code stays yours. <br />
              <span className="text-aurora">The understanding is instant.</span>
            </h2>
            <Button asChild variant="hero" size="xl" className="mt-10">
              <Link to="/upload">Start Analyzing <ArrowRight /></Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="relative z-10 container py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground border-t border-border/50">
        <Logo />
        <div className="font-mono">© 2026 CodeSage · Local-first code intelligence</div>
      </footer>
    </div>
  );
};

export default Index;

import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Github, UploadCloud, FileArchive, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuroraBackground } from "@/components/AuroraBackground";
import { Logo } from "@/components/Logo";
import { toast } from "sonner";

const Upload = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"git" | "zip">("git");
  const [url, setUrl] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const stages = [
    "Cloning repository…",
    "Filtering code files…",
    "Chunking into blocks…",
    "Generating embeddings…",
    "Building vector index…",
  ];

  const start = () => {
    if (tab === "git" && !url.trim()) {
      toast.error("Please paste a GitHub repository URL");
      return;
    }
    setLoading(true);
    setProgress(0);
    let p = 0;
    let s = 0;
    setStage(stages[0]);
    const id = setInterval(() => {
      p += 4 + Math.random() * 6;
      if (p > 100) p = 100;
      setProgress(p);
      const newStage = Math.min(stages.length - 1, Math.floor((p / 100) * stages.length));
      if (newStage !== s) {
        s = newStage;
        setStage(stages[s]);
      }
      if (p >= 100) {
        clearInterval(id);
        setTimeout(() => navigate("/workspace"), 500);
      }
    }, 220);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <AuroraBackground />

      <header className="relative z-10 container flex items-center justify-between py-6">
        <Logo />
        <Button asChild variant="ghost" size="sm">
          <Link to="/"><ArrowLeft /> Back</Link>
        </Button>
      </header>

      <main className="relative z-10 flex-1 container flex items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <div className="text-center mb-10">
            <div className="text-xs font-mono uppercase tracking-widest text-primary mb-3">Step 01 · Ingest</div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Bring your <span className="text-aurora">codebase.</span>
            </h1>
            <p className="text-muted-foreground mt-4">
              Everything is processed locally. Nothing is uploaded to any cloud service.
            </p>
          </div>

          <div className="glass-strong rounded-2xl p-2">
            {/* tabs */}
            <div className="flex gap-1 p-1 rounded-xl bg-background/40 mb-2">
              <button
                onClick={() => setTab("git")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
                  tab === "git" ? "bg-gradient-aurora-soft text-foreground shadow-glass border border-primary/20" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Github className="h-4 w-4" /> GitHub URL
              </button>
              <button
                onClick={() => setTab("zip")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
                  tab === "zip" ? "bg-gradient-aurora-soft text-foreground shadow-glass border border-primary/20" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileArchive className="h-4 w-4" /> Upload .zip
              </button>
            </div>

            <div className="p-6">
              {tab === "git" ? (
                <div className="space-y-4">
                  <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Repository URL</label>
                  <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://github.com/org/legacy-banking-app"
                    className="h-14 text-base bg-background/40 border-border/60 font-mono"
                    disabled={loading}
                  />
                  <p className="text-xs text-muted-foreground">
                    Public repos work instantly. For private repos, configure a local Git credential.
                  </p>
                </div>
              ) : (
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    if (e.dataTransfer.files[0]) toast.success(`Selected ${e.dataTransfer.files[0].name}`);
                  }}
                  onClick={() => fileRef.current?.click()}
                  className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all p-12 text-center ${
                    dragOver ? "border-primary bg-primary/5 shadow-glow-primary" : "border-border/60 hover:border-primary/40 hover:bg-background/40"
                  }`}
                >
                  <input ref={fileRef} type="file" accept=".zip" hidden onChange={(e) => e.target.files?.[0] && toast.success(`Selected ${e.target.files[0].name}`)} />
                  <UploadCloud className="h-10 w-10 text-primary mx-auto mb-4" />
                  <div className="font-display font-semibold mb-1">Drop your .zip here</div>
                  <div className="text-xs text-muted-foreground">or click to browse · max 500MB</div>
                </div>
              )}

              {loading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-6 space-y-3"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="font-mono text-xs text-muted-foreground">{stage}</span>
                    <span className="ml-auto font-mono text-xs text-primary">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-background/60 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-aurora"
                      style={{ width: `${progress}%` }}
                      transition={{ ease: "linear" }}
                    />
                  </div>
                </motion.div>
              )}

              <Button
                variant="hero"
                size="lg"
                className="w-full mt-6"
                onClick={start}
                disabled={loading}
              >
                {loading ? <><Loader2 className="animate-spin" /> Building index…</> : <><Sparkles /> Analyze Repository <ArrowRight /></>}
              </Button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {[
              { v: "100%", l: "Offline" },
              { v: "0", l: "API keys" },
              { v: "~3min", l: "Avg index time" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-xl p-4">
                <div className="font-display text-xl font-bold text-aurora">{s.v}</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Upload;

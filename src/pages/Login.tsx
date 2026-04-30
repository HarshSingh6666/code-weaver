import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github, Loader2, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/AuroraBackground";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4">
    <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4-5.5 4-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.3 14.5 2.4 12 2.4 6.7 2.4 2.4 6.7 2.4 12s4.3 9.6 9.6 9.6c5.5 0 9.2-3.9 9.2-9.4 0-.6-.1-1.1-.2-1.6H12z"/>
  </svg>
);

const Login = () => {
  const { loginWith, user } = useAuth();
  const nav = useNavigate();
  const loc = useLocation() as { state?: { from?: string } };
  const [busy, setBusy] = useState<"github" | "google" | null>(null);
  const dest = loc.state?.from || "/upload";

  if (user) {
    nav(dest, { replace: true });
  }

  const handle = async (p: "github" | "google") => {
    if (busy) return;
    setBusy(p);
    try {
      await loginWith(p);
      toast.success(`Signed in with ${p === "github" ? "GitHub" : "Google"}`);
      nav(dest, { replace: true });
    } catch {
      toast.error("Login failed");
    } finally {
      setBusy(null);
    }
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

      <main className="relative z-10 flex-1 container flex items-center justify-center py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-5">
              <Sparkles className="h-3 w-3 text-primary" /> Sign in to continue
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Welcome to <span className="text-aurora">CodeSage</span>
            </h1>
            <p className="text-muted-foreground mt-3 text-sm">
              Authenticate to access the workspace. Your code stays on your machine.
            </p>
          </div>

          <div className="glass-strong rounded-2xl p-6 space-y-3">
            <Button
              variant="glass"
              size="lg"
              className="w-full justify-center"
              onClick={() => handle("github")}
              disabled={!!busy}
            >
              {busy === "github" ? <Loader2 className="animate-spin" /> : <Github />}
              Continue with GitHub
            </Button>
            <Button
              variant="glass"
              size="lg"
              className="w-full justify-center"
              onClick={() => handle("google")}
              disabled={!!busy}
            >
              {busy === "google" ? <Loader2 className="animate-spin" /> : <GoogleIcon />}
              Continue with Google
            </Button>

            <div className="flex items-center gap-2 pt-3 text-[11px] font-mono text-muted-foreground justify-center">
              <Lock className="h-3 w-3 text-primary" />
              Secure · No password · No tracking
            </div>
          </div>

          <p className="text-center text-[11px] text-muted-foreground mt-6">
            By continuing you agree to keep things ✨ local-first.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default Login;

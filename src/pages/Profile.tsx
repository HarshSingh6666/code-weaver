import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Github,
  Mail,
  Calendar,
  GitBranch,
  Database,
  FileCode2,
  Sparkles,
  LogOut,
  Settings as SettingsIcon,
  Pencil,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/AuroraBackground";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

const stats = [
  { icon: GitBranch, label: "Repositories", value: "12" },
  { icon: FileCode2, label: "Files Indexed", value: "3.4k" },
  { icon: Database, label: "Chunks", value: "28.7k" },
  { icon: Sparkles, label: "Queries", value: "486" },
];

const recentRepos = [
  { name: "legacy-banking-app", files: 312, when: "2h ago" },
  { name: "react-dashboard-pro", files: 184, when: "Yesterday" },
  { name: "ml-pipeline-core", files: 97, when: "3 days ago" },
  { name: "auth-microservice", files: 56, when: "1 week ago" },
];

const Profile = () => {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  if (!user) return null;

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AuroraBackground />

      {/* Top bar */}
      <header className="relative z-10 sticky top-0 glass border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Button asChild variant="ghost" size="icon" className="shrink-0">
              <Link to="/workspace" aria-label="Back">
                <ArrowLeft />
              </Link>
            </Button>
            <Logo />
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="glass" size="sm">
              <Link to="/settings">
                <SettingsIcon /> <span className="hidden sm:inline">Settings</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                logout();
                toast.success("Signed out");
                nav("/");
              }}
            >
              <LogOut /> <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Identity */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-3xl p-5 sm:p-8 border border-border/50 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-aurora-soft opacity-40 pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-7 text-center sm:text-left">
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl bg-gradient-aurora flex items-center justify-center text-3xl sm:text-4xl font-bold text-primary-foreground shadow-glow-primary shrink-0">
              {user.name[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-display font-bold truncate">
                {user.name}
              </h1>
              <div className="mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> {user.email}
                </span>
                <span className="hidden sm:inline">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Github className="h-3.5 w-3.5" /> via {user.provider}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  <Shield className="h-3 w-3" /> Pro Member
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-full glass">
                  <Calendar className="h-3 w-3" /> Joined Mar 2026
                </span>
              </div>
            </div>
            <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
              <Button asChild variant="hero" size="sm" className="flex-1 sm:flex-initial">
                <Link to="/settings"><Pencil /> Edit profile</Link>
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Stats */}
        <section className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="glass rounded-2xl p-4 sm:p-5 border border-border/50"
            >
              <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono uppercase tracking-wider">
                <s.icon className="h-3.5 w-3.5 text-primary" />
                {s.label}
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-display font-bold">
                {s.value}
              </div>
            </motion.div>
          ))}
        </section>

        {/* Recent repos */}
        <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 glass rounded-2xl p-4 sm:p-6 border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold">Recent Repositories</h2>
              <Button asChild variant="ghost" size="sm">
                <Link to="/upload">+ New</Link>
              </Button>
            </div>
            <ul className="space-y-2">
              {recentRepos.map((r) => (
                <li
                  key={r.name}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-background/40 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-lg bg-gradient-aurora-soft border border-primary/20 flex items-center justify-center shrink-0">
                      <GitBranch className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{r.name}</div>
                      <div className="text-[11px] font-mono text-muted-foreground">
                        {r.files} files · {r.when}
                      </div>
                    </div>
                  </div>
                  <Button asChild variant="glass" size="sm" className="shrink-0">
                    <Link to="/workspace">Open</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl p-4 sm:p-6 border border-border/50">
            <h2 className="font-display font-semibold mb-4">Account</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Plan</dt>
                <dd className="font-mono text-primary">Pro</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Provider</dt>
                <dd className="font-mono capitalize">{user.provider}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Model</dt>
                <dd className="font-mono">Llama-3 · 8B</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Storage</dt>
                <dd className="font-mono">2.4 / 10 GB</dd>
              </div>
            </dl>
            <Button asChild variant="glow" size="sm" className="w-full mt-5">
              <Link to="/settings">Manage account</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;

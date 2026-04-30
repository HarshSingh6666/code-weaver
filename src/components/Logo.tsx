import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const Logo = ({ to = "/" }: { to?: string }) => (
  <Link to={to} className="flex items-center gap-2.5 group">
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-aurora rounded-lg blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
      <div className="relative h-9 w-9 rounded-lg bg-gradient-aurora flex items-center justify-center shadow-glow-primary">
        <Sparkles className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
      </div>
    </div>
    <div className="flex flex-col leading-none">
      <span className="font-display font-bold text-lg tracking-tight">CodeSage</span>
      <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">Local · Private</span>
    </div>
  </Link>
);

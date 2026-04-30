import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Provider = "github" | "google";
export type User = { name: string; email: string; provider: Provider; avatar?: string };

type AuthCtx = {
  user: User | null;
  loginWith: (p: Provider) => Promise<User>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);
const KEY = "codesage.user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const loginWith = async (provider: Provider) => {
    // Mocked OAuth — simulates a redirect/popup with a delay
    await new Promise((r) => setTimeout(r, 900));
    const u: User =
      provider === "github"
        ? { name: "octocat", email: "octocat@github.com", provider }
        : { name: "Jane Doe", email: "jane@gmail.com", provider };
    localStorage.setItem(KEY, JSON.stringify(u));
    setUser(u);
    return u;
  };

  const logout = () => {
    localStorage.removeItem(KEY);
    setUser(null);
  };

  return <Ctx.Provider value={{ user, loginWith, logout }}>{children}</Ctx.Provider>;
};

export const useAuth = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used within AuthProvider");
  return c;
};

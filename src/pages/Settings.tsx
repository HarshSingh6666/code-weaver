import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User as UserIcon,
  Bell,
  Cpu,
  Lock,
  Palette,
  LogOut,
  Trash2,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AuroraBackground } from "@/components/AuroraBackground";
import { Logo } from "@/components/Logo";
import { ScrollableNav } from "@/components/ScrollableNav";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

const Section = ({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <div className="glass rounded-2xl p-5 sm:p-6 border border-border/50">
    <div className="flex items-start gap-3 mb-5">
      <div className="h-10 w-10 rounded-xl bg-gradient-aurora-soft border border-primary/20 flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="min-w-0">
        <h3 className="font-display font-semibold">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const Row = ({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 py-2">
    <div className="min-w-0">
      <div className="text-sm font-medium">{label}</div>
      {hint && <div className="text-xs text-muted-foreground">{hint}</div>}
    </div>
    <div className="shrink-0 w-full sm:w-auto">{children}</div>
  </div>
);

const Settings = () => {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [bio, setBio] = useState("Building secure systems with offline AI.");
  const [theme, setTheme] = useState<"dark" | "aurora" | "noir">("aurora");
  const [accent, setAccent] = useState([72]);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(false);
  const [notifSummary, setNotifSummary] = useState(true);
  const [model, setModel] = useState<"llama3-8b" | "llama3-70b" | "mistral">("llama3-8b");
  const [temperature, setTemperature] = useState([35]);
  const [twoFA, setTwoFA] = useState(false);
  const [telemetry, setTelemetry] = useState(false);

  if (!user) return null;

  const save = () => toast.success("Settings saved");

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AuroraBackground />

      <header className="relative z-10 sticky top-0 glass border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Button asChild variant="ghost" size="icon" className="shrink-0">
              <Link to="/profile" aria-label="Back">
                <ArrowLeft />
              </Link>
            </Button>
            <Logo />
          </div>
          <Button variant="hero" size="sm" onClick={save}>
            <Save /> <span className="hidden sm:inline">Save changes</span>
          </Button>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl sm:text-3xl font-display font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your account, appearance, AI engine and privacy preferences.
          </p>
        </motion.div>

        <Tabs defaultValue="account" className="w-full">
          <ScrollableNav className="-mx-4 sm:mx-0 px-4 sm:px-0">
            <TabsList className="glass border border-border/50 inline-flex w-auto">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="ai">AI Engine</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>
          </ScrollableNav>

          <TabsContent value="account" className="mt-5 space-y-5">
            <Section icon={UserIcon} title="Profile" description="How others see you in CodeSage.">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Display name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                />
              </div>
            </Section>

            <Section icon={LogOut} title="Session" description="Sign out from this device.">
              <Row label="Sign out" hint="You can sign back in any time.">
                <Button
                  variant="glass"
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    logout();
                    toast.success("Signed out");
                    nav("/");
                  }}
                >
                  <LogOut /> Logout
                </Button>
              </Row>
            </Section>
          </TabsContent>

          <TabsContent value="appearance" className="mt-5 space-y-5">
            <Section icon={Palette} title="Theme" description="Pick the mood of your workspace.">
              <div className="grid grid-cols-3 gap-3">
                {(["dark", "aurora", "noir"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`relative rounded-xl p-3 border text-left transition-all ${
                      theme === t
                        ? "border-primary shadow-glow-primary"
                        : "border-border/50 hover:border-primary/40"
                    }`}
                  >
                    <div
                      className={`h-14 w-full rounded-lg mb-2 ${
                        t === "dark"
                          ? "bg-background"
                          : t === "aurora"
                          ? "bg-gradient-aurora"
                          : "bg-gradient-to-br from-black via-zinc-900 to-amber-900"
                      }`}
                    />
                    <div className="text-xs font-medium capitalize">{t}</div>
                  </button>
                ))}
              </div>
              <Row label="Accent intensity" hint="Glow and aurora strength.">
                <div className="w-full sm:w-48">
                  <Slider value={accent} onValueChange={setAccent} min={0} max={100} step={1} />
                </div>
              </Row>
            </Section>
          </TabsContent>

          <TabsContent value="ai" className="mt-5 space-y-5">
            <Section icon={Cpu} title="Model" description="All inference runs locally — fully offline.">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {([
                  { id: "llama3-8b", label: "Llama-3 8B", hint: "Fast · balanced" },
                  { id: "llama3-70b", label: "Llama-3 70B", hint: "Deep · slower" },
                  { id: "mistral", label: "Mistral 7B", hint: "Lean · code-tuned" },
                ] as const).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setModel(m.id)}
                    className={`rounded-xl p-3 border text-left transition-all ${
                      model === m.id
                        ? "border-primary bg-primary/5 shadow-glow-primary"
                        : "border-border/50 hover:border-primary/40"
                    }`}
                  >
                    <div className="text-sm font-medium">{m.label}</div>
                    <div className="text-[11px] font-mono text-muted-foreground mt-0.5">{m.hint}</div>
                  </button>
                ))}
              </div>
              <Row label="Temperature" hint={`Currently ${(temperature[0] / 100).toFixed(2)} — lower is more deterministic.`}>
                <div className="w-full sm:w-48">
                  <Slider value={temperature} onValueChange={setTemperature} min={0} max={100} step={1} />
                </div>
              </Row>
            </Section>
          </TabsContent>

          <TabsContent value="notifications" className="mt-5 space-y-5">
            <Section icon={Bell} title="Notifications" description="Choose what reaches you and where.">
              <Row label="Email alerts" hint="Indexing complete, errors, security findings.">
                <Switch checked={notifEmail} onCheckedChange={setNotifEmail} />
              </Row>
              <Row label="Push notifications" hint="In-app realtime updates.">
                <Switch checked={notifPush} onCheckedChange={setNotifPush} />
              </Row>
              <Row label="Weekly digest" hint="A short summary every Monday.">
                <Switch checked={notifSummary} onCheckedChange={setNotifSummary} />
              </Row>
            </Section>
          </TabsContent>

          <TabsContent value="privacy" className="mt-5 space-y-5">
            <Section icon={Lock} title="Security" description="Protect your account and your code.">
              <Row label="Two-factor authentication" hint="Add an extra layer of protection.">
                <Switch checked={twoFA} onCheckedChange={setTwoFA} />
              </Row>
              <Row label="Anonymous telemetry" hint="Help improve CodeSage. No code is ever sent.">
                <Switch checked={telemetry} onCheckedChange={setTelemetry} />
              </Row>
            </Section>

            <Section icon={Trash2} title="Danger zone" description="These actions are permanent.">
              <Row label="Delete all repositories" hint="Removes indexes from this device.">
                <Button
                  variant="glass"
                  size="sm"
                  className="w-full sm:w-auto text-destructive hover:text-destructive"
                  onClick={() => toast.success("All repositories cleared")}
                >
                  <Trash2 /> Clear data
                </Button>
              </Row>
              <Row label="Delete account" hint="Permanently removes your CodeSage account.">
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => toast.error("Account deletion is disabled in demo")}
                >
                  Delete account
                </Button>
              </Row>
            </Section>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end">
          <Button variant="hero" onClick={save}>
            <Save /> Save changes
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Settings;

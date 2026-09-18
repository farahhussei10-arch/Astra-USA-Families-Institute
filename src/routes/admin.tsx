import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  Check,
  ChevronRight,
  CircleDollarSign,
  Eye,
  GraduationCap,
  LayoutDashboard,
  Mail,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  PanelLeftClose,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/admin")({
  component: Admin,
});

type Section = "Overview" | "Courses" | "Learners" | "Enrollments" | "Messages" | "Settings";
type CourseStatus = "Published" | "Draft";

type Course = {
  title: string;
  category: string;
  learners: number;
  revenue: string;
  status: CourseStatus;
};

const initialCourses: Course[] = [
  { title: "Somali Language for Diaspora Kids", category: "Language & Culture", learners: 128, revenue: "$4,820", status: "Published" },
  { title: "CDL Permit Test Prep", category: "Trucking & Logistics", learners: 86, revenue: "$3,440", status: "Published" },
  { title: "Microsoft Office Essentials", category: "Technology", learners: 64, revenue: "$2,560", status: "Published" },
  { title: "US Citizenship Test Prep", category: "Life Abroad", learners: 42, revenue: "$1,680", status: "Draft" },
];

const learners = [
  ["Amina Hassan", "Minneapolis, USA", "Somali Language", "Active", "Today"],
  ["Yusuf Abdi", "Nairobi, Kenya", "CDL Permit Test", "Active", "Yesterday"],
  ["Hodan Mohamed", "London, UK", "Microsoft Office", "Pending", "Sep 16, 2026"],
  ["Abdi Noor", "Mogadishu, Somalia", "English Language", "Active", "Sep 14, 2026"],
];

const navItems: { label: Section; icon: typeof LayoutDashboard }[] = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Courses", icon: BookOpen },
  { label: "Learners", icon: Users },
  { label: "Enrollments", icon: GraduationCap },
  { label: "Messages", icon: MessageSquareText },
  { label: "Settings", icon: Settings },
];

function Admin() {
  const [activeSection, setActiveSection] = useState<Section>("Overview");
  const [courses, setCourses] = useState(initialCourses);
  const [search, setSearch] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredCourses = useMemo(
    () => courses.filter((course) => `${course.title} ${course.category}`.toLowerCase().includes(search.toLowerCase())),
    [courses, search],
  );

  const toggleCourseStatus = (title: string) => {
    setCourses((current) => current.map((course) => course.title === title ? { ...course, status: course.status === "Published" ? "Draft" : "Published" } : course));
  };

  const selectSection = (section: Section) => {
    setActiveSection(section);
    setMobileNavOpen(false);
  };
  const notify = (message: string) => setNotice(message);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-surface/95 px-4 backdrop-blur-xl lg:px-7">
        <div className="flex items-center gap-3">
          <button type="button" className="grid size-10 place-items-center rounded-md border border-border lg:hidden" aria-label="Open admin navigation" onClick={() => setMobileNavOpen(true)}><Menu className="size-5" /></button>
          <a href="/" className="flex items-center gap-2.5" aria-label="Return to public website"><span className="grid size-9 place-items-center rounded-md bg-primary text-gold"><ShieldCheck className="size-5" /></span><span className="font-display text-sm font-extrabold leading-tight"><span className="block">Astra Admin</span><span className="block text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Control center</span></span></a>
        </div>
        <div className="flex items-center gap-3"><a href="/" className="hidden items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary sm:flex"><Eye className="size-4" />View website</a><span className="grid size-9 place-items-center rounded-full bg-gold text-sm font-extrabold text-gold-foreground">HF</span></div>
      </header>
      <div className="flex">
        <aside className={`${mobileNavOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} fixed inset-y-16 left-0 z-30 w-64 border-r border-border bg-surface p-4 transition-transform lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]`}>
          <div className="mb-5 flex items-center justify-between px-2"><span className="text-xs font-extrabold uppercase tracking-[0.14em] text-muted-foreground">Workspace</span><button type="button" className="grid size-8 place-items-center rounded-md hover:bg-muted lg:hidden" aria-label="Close admin navigation" onClick={() => setMobileNavOpen(false)}><X className="size-4" /></button><button type="button" className="hidden size-8 place-items-center rounded-md hover:bg-muted lg:grid" aria-label="Collapse navigation"><PanelLeftClose className="size-4" /></button></div>
          <nav className="grid gap-1">{navItems.map(({ label, icon: Icon }) => <button key={label} type="button" onClick={() => selectSection(label)} className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-bold transition-colors ${activeSection === label ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}><Icon className="size-4" />{label}{label === "Messages" && <span className="ml-auto rounded-full bg-gold px-2 py-0.5 text-[10px] text-gold-foreground">3</span>}</button>)}</nav>
          <div className="mt-auto hidden rounded-md border border-border bg-muted/60 p-4 lg:block"><p className="text-xs font-extrabold uppercase tracking-wide text-primary">Admin access</p><p className="mt-2 text-xs leading-5 text-muted-foreground">You have full workspace permissions for this session.</p></div>
        </aside>
        {mobileNavOpen && <button type="button" className="fixed inset-0 z-20 bg-foreground/20 lg:hidden" aria-label="Close navigation overlay" onClick={() => setMobileNavOpen(false)} />}
        <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="section-kicker"><BarChart3 className="size-4" />Admin workspace</p><h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{activeSection}</h1><p className="mt-2 text-sm text-muted-foreground">Manage Astra UsA Families Institute from one calm, focused workspace.</p></div><div className="flex gap-2"><Button variant="outline" size="icon" aria-label="Search courses" onClick={() => selectSection("Courses")}><Search className="size-4" /></Button><Button variant="gold" onClick={() => { selectSection("Courses"); notify("Course creation is ready for connection to your content service."); }}><Plus className="size-4" />New course</Button></div></div>
            {notice && <div className="mb-6 flex items-center justify-between gap-4 rounded-md border border-gold/50 bg-gold/10 px-4 py-3 text-sm"><span>{notice}</span><button type="button" aria-label="Dismiss notification" onClick={() => setNotice("")}><X className="size-4" /></button></div>}
            {activeSection === "Overview" && <Overview onSectionChange={selectSection} onNotify={notify} />}
            {activeSection === "Courses" && <Courses courses={filteredCourses} search={search} onSearch={setSearch} onToggle={toggleCourseStatus} onNotify={notify} />}
            {activeSection === "Learners" && <LearnerTable onNotify={notify} />}
            {activeSection === "Enrollments" && <Enrollments onNotify={notify} />}
            {activeSection === "Messages" && <Messages onNotify={notify} />}
            {activeSection === "Settings" && <SettingsPanel saved={saved} onSave={() => setSaved(true)} />}
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({ icon: Icon, label, value, detail, tone = "primary" }: { icon: typeof Users; label: string; value: string; detail: string; tone?: "primary" | "gold" | "green" }) {
  return <article className="rounded-lg border border-border bg-surface p-5 shadow-card"><div className="flex items-start justify-between"><span className={`grid size-10 place-items-center rounded-md ${tone === "gold" ? "bg-gold text-gold-foreground" : tone === "green" ? "bg-whatsapp text-whatsapp-foreground" : "bg-primary text-primary-foreground"}`}><Icon className="size-5" /></span><span className="text-xs font-bold text-whatsapp">{detail}</span></div><p className="mt-6 text-sm font-bold text-muted-foreground">{label}</p><p className="mt-1 font-display text-3xl font-extrabold">{value}</p></article>;
}

function Overview({ onSectionChange }: { onSectionChange: (section: Section) => void }) {
  return <div className="grid gap-6"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard icon={Users} label="Total learners" value="1,284" detail="+12.8%" /><StatCard icon={CircleDollarSign} label="Monthly revenue" value="$12,840" detail="+8.4%" tone="gold" /><StatCard icon={GraduationCap} label="Active enrollments" value="342" detail="+16 this week" tone="green" /><StatCard icon={MessageSquareText} label="Unread messages" value="3" detail="Needs reply" /></div><div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]"><section className="rounded-lg border border-border bg-surface p-5 shadow-card"><div className="flex items-center justify-between"><div><h2 className="text-lg font-extrabold">Enrollment activity</h2><p className="mt-1 text-sm text-muted-foreground">New learners across the last six months</p></div><button type="button" className="text-sm font-bold text-primary">View report <ChevronRight className="inline size-4" /></button></div><div className="mt-8 flex h-48 items-end gap-3 border-b border-border px-2">{[42, 60, 48, 76, 68, 92, 82, 100, 88, 108, 96, 124].map((height, index) => <div key={index} className="group flex flex-1 flex-col items-center gap-2"><div className="w-full rounded-t-sm bg-primary/80 transition-colors group-hover:bg-gold" style={{ height: `${height}px` }} /><span className="text-[10px] text-muted-foreground">{["Apr", "", "May", "", "Jun", "", "Jul", "", "Aug", "", "Sep", ""][index]}</span></div>)}</div></section><section className="rounded-lg border border-border bg-surface p-5 shadow-card"><h2 className="text-lg font-extrabold">Quick actions</h2><div className="mt-5 grid gap-2">{[[BookOpen, "Manage course catalog", "Courses"], [Users, "Review learners", "Learners"], [Mail, "Open message inbox", "Messages"], [Settings, "Workspace settings", "Settings"]].map(([Icon, label, section]) => <button key={label as string} type="button" onClick={() => onSectionChange(section as Section)} className="flex items-center gap-3 rounded-md border border-border p-3 text-left transition-colors hover:border-primary hover:bg-muted"><span className="grid size-9 place-items-center rounded-md bg-muted text-primary"><Icon className="size-4" /></span><span className="flex-1 text-sm font-bold">{label as string}</span><ChevronRight className="size-4 text-muted-foreground" /></button>)}</div></section></div><section className="rounded-lg border border-border bg-surface p-5 shadow-card"><div className="flex items-center justify-between"><div><h2 className="text-lg font-extrabold">Recent enrollments</h2><p className="mt-1 text-sm text-muted-foreground">Latest activity from across your academy</p></div><button type="button" onClick={() => onSectionChange("Enrollments")} className="text-sm font-bold text-primary">See all <ChevronRight className="inline size-4" /></button></div><div className="mt-5 grid gap-3 md:grid-cols-3">{[["Amina Hassan", "Somali Language for Diaspora Kids", "$40", "2 min ago"], ["Yusuf Abdi", "CDL Permit Test Prep", "$40", "1 hour ago"], ["Hodan Mohamed", "Microsoft Office Essentials", "$40", "Yesterday"]].map(([name, course, amount, time]) => <div key={name} className="flex items-center gap-3 rounded-md bg-muted/60 p-3"><span className="grid size-9 place-items-center rounded-full bg-gold text-xs font-extrabold text-gold-foreground">{name.split(" ").map((part) => part[0]).join("")}</span><span className="min-w-0 flex-1"><strong className="block truncate text-sm">{name}</strong><span className="block truncate text-xs text-muted-foreground">{course}</span></span><span className="text-right"><strong className="block text-sm">{amount}</strong><span className="text-[10px] text-muted-foreground">{time}</span></span></div>)}</div></section></div>;
}

function Courses({ courses, search, onSearch, onToggle }: { courses: Course[]; search: string; onSearch: (value: string) => void; onToggle: (title: string) => void }) {
  return <section className="rounded-lg border border-border bg-surface shadow-card"><div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-lg font-extrabold">Course catalog</h2><p className="mt-1 text-sm text-muted-foreground">Publish, edit, and monitor your learning tracks.</p></div><div className="relative w-full sm:w-72"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search courses" className="pl-9" /></div></div><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="px-5 py-3">Course</th><th className="px-5 py-3">Learners</th><th className="px-5 py-3">Revenue</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-border">{courses.map((course) => <tr key={course.title} className="hover:bg-muted/30"><td className="px-5 py-4"><strong className="block">{course.title}</strong><span className="text-xs text-muted-foreground">{course.category}</span></td><td className="px-5 py-4 font-bold">{course.learners}</td><td className="px-5 py-4 font-bold">{course.revenue}</td><td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${course.status === "Published" ? "bg-whatsapp/10 text-whatsapp" : "bg-gold/20 text-gold-foreground"}`}>{course.status}</span></td><td className="px-5 py-4 text-right"><div className="flex justify-end gap-2"><Button variant="outline" size="icon" aria-label={`Toggle ${course.title} status`} onClick={() => onToggle(course.title)}>{course.status === "Published" ? <X className="size-4" /> : <Check className="size-4" />}</Button><Button variant="ghost" size="icon" aria-label={`More actions for ${course.title}`}><MoreHorizontal className="size-4" /></Button></div></td></tr>)}</tbody></table></div></section>;
}

function LearnerTable() { return <DataSection title="Learners" description="Review learner profiles, locations, and current study activity."><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="px-5 py-3">Learner</th><th className="px-5 py-3">Course</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Last active</th><th className="px-5 py-3 text-right">Action</th></tr></thead><tbody className="divide-y divide-border">{learners.map(([name, location, course, status, lastActive]) => <tr key={name} className="hover:bg-muted/30"><td className="px-5 py-4"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-full bg-primary text-xs font-extrabold text-primary-foreground">{name.split(" ").map((part) => part[0]).join("")}</span><span><strong className="block">{name}</strong><span className="text-xs text-muted-foreground">{location}</span></span></div></td><td className="px-5 py-4">{course}</td><td className="px-5 py-4"><span className={`font-bold ${status === "Active" ? "text-whatsapp" : "text-gold-foreground"}`}>{status}</span></td><td className="px-5 py-4 text-muted-foreground">{lastActive}</td><td className="px-5 py-4 text-right"><Button variant="outline" size="icon" aria-label={`View ${name}`}><UserRound className="size-4" /></Button></td></tr>)}</tbody></table></DataSection>; }

function Enrollments() { return <DataSection title="Enrollments" description="Track payments and keep every learner moving forward."><div className="grid gap-4 p-5 sm:grid-cols-3"><StatCard icon={Check} label="Completed this month" value="128" detail="+18%" tone="green" /><StatCard icon={CircleDollarSign} label="Pending confirmation" value="14" detail="Review" tone="gold" /><StatCard icon={BarChart3} label="Conversion rate" value="24.8%" detail="+4.1%" /></div><div className="border-t border-border p-5"><div className="flex items-center gap-3 rounded-md border border-gold/40 bg-gold/10 p-4 text-sm"><CircleDollarSign className="size-5 text-gold-foreground" /><span><strong>14 payments need review.</strong> Confirm receipts from EVC Plus, Zaad, and M-Pesa before granting access.</span><Button className="ml-auto" variant="gold" size="sm">Review queue</Button></div></div></DataSection>; }

function Messages() { return <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]"><DataSection title="Inbox" description="Messages that need a response."><div className="divide-y divide-border">{[["Sahra Ali", "I would like to ask about the Somali language course...", "2m"], ["Mohamed Yusuf", "I sent my payment receipt for CDL prep.", "1h"], ["Hodan Mohamed", "Can I join the next live class from London?", "3h"]].map(([name, preview, time], index) => <button key={name} type="button" className={`flex w-full items-start gap-3 p-4 text-left hover:bg-muted/50 ${index === 0 ? "bg-muted/50" : ""}`}><span className="grid size-9 shrink-0 place-items-center rounded-full bg-gold text-xs font-extrabold text-gold-foreground">{name.split(" ").map((part) => part[0]).join("")}</span><span className="min-w-0 flex-1"><strong className="block text-sm">{name}</strong><span className="mt-1 block truncate text-xs text-muted-foreground">{preview}</span></span><span className="text-[10px] text-muted-foreground">{time}</span></button>)}</div></DataSection><section className="rounded-lg border border-border bg-surface p-5 shadow-card"><div className="flex items-center justify-between border-b border-border pb-4"><div><p className="text-xs font-extrabold uppercase tracking-wide text-primary">Selected conversation</p><h2 className="mt-1 text-lg font-extrabold">Sahra Ali</h2></div><Button variant="outline" size="icon" aria-label="Email selected learner"><Mail className="size-4" /></Button></div><div className="grid min-h-56 content-end gap-3 py-5"><p className="max-w-sm rounded-lg bg-muted px-4 py-3 text-sm">Hello, I would like to ask about the Somali language course for my daughter.</p><p className="ml-auto max-w-sm rounded-lg bg-primary px-4 py-3 text-sm text-primary-foreground">Absolutely. I can share the next class dates and enrollment details.</p></div><div className="flex gap-2 border-t border-border pt-4"><Input placeholder="Write a reply..." /><Button variant="primary" aria-label="Send reply"><ChevronRight className="size-5" /></Button></div></section></div>; }

function SettingsPanel({ saved, onSave }: { saved: boolean; onSave: () => void }) { return <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr]"><section className="rounded-lg border border-border bg-surface p-5 shadow-card"><h2 className="text-lg font-extrabold">Workspace settings</h2><p className="mt-1 text-sm text-muted-foreground">Control the public academy details and enrollment defaults.</p><div className="mt-6 grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-bold sm:col-span-2">Institute name<Input defaultValue="Astra UsA Families Institute" /></label><label className="grid gap-2 text-sm font-bold">Default currency<select className="h-9 rounded-md border border-input bg-transparent px-3 text-sm font-normal"><option>USD equivalent</option><option>Kenyan Shilling</option><option>Somali Shilling</option></select></label><label className="grid gap-2 text-sm font-bold">Enrollment mode<select className="h-9 rounded-md border border-input bg-transparent px-3 text-sm font-normal"><option>Open enrollment</option><option>Approval required</option></select></label></div><div className="mt-6 flex items-center justify-between border-t border-border pt-5"><span className="text-sm text-muted-foreground">Changes are saved for this session.</span><Button variant="gold" onClick={onSave}>{saved ? <><Check className="size-4" />Saved</> : "Save settings"}</Button></div></section><section className="rounded-lg border border-border bg-surface p-5 shadow-card"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-md bg-primary text-primary-foreground"><ShieldCheck className="size-5" /></span><div><h2 className="text-lg font-extrabold">Access & privacy</h2><p className="text-sm text-muted-foreground">Admin controls for the workspace.</p></div></div><div className="mt-6 grid gap-4 text-sm"><label className="flex items-center justify-between gap-4"><span><strong className="block">Require receipt review</strong><span className="text-xs text-muted-foreground">Hold access until payment is confirmed.</span></span><input type="checkbox" defaultChecked className="size-4 accent-[var(--primary)]" /></label><label className="flex items-center justify-between gap-4"><span><strong className="block">Public course catalog</strong><span className="text-xs text-muted-foreground">Let visitors browse published courses.</span></span><input type="checkbox" defaultChecked className="size-4 accent-[var(--primary)]" /></label><label className="flex items-center justify-between gap-4"><span><strong className="block">Message notifications</strong><span className="text-xs text-muted-foreground">Show unread messages in the sidebar.</span></span><input type="checkbox" defaultChecked className="size-4 accent-[var(--primary)]" /></label></div></section></div>; }

function DataSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) { return <section className="overflow-hidden rounded-lg border border-border bg-surface shadow-card"><div className="border-b border-border p-5"><h2 className="text-lg font-extrabold">{title}</h2><p className="mt-1 text-sm text-muted-foreground">{description}</p></div><div className="overflow-x-auto">{children}</div></section>; }

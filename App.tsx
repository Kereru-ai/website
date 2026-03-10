
import React, { useState, useEffect } from 'react';
import {
  Menu, X, Shield, Lock, Globe, Server, ChevronRight,
  CheckCircle2, ArrowRight, Activity, Cpu, Network,
  Zap, Users, Leaf, Banknote, Sliders, ChevronDown,
  Building2, Microscope, Droplets, Database, Box,
  Wind, ZapOff, MapPin, Eye, UserCheck, TrendingDown,
  ShieldCheck, FileText, Key, Layers, Headset,
  BarChart3, BrainCircuit, Settings, Cloud, MessageSquare,
  FileSearch, ShieldAlert, BadgeCheck, Sparkles, BarChart, Search,
  Briefcase, GraduationCap, PenTool, Terminal, Phone
} from 'lucide-react';
import { Logo } from './components/Logo';
import { InfrastructureDiagram } from './components/InfrastructureDiagram';
import { KereruChat } from './components/KereruChat';

type Page = 'home' | 'about' | 'sustainability' | 'infrastructure' | 'our-models' | 'project-kereru' | 'what-we-offer' | 'consulting' | 'contact' | 'sovereignty' | 'governance';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [factoryDropdownOpen, setFactoryDropdownOpen] = useState(false);
  const [modelsDropdownOpen, setModelsDropdownOpen] = useState(false);
  const [kereruChatOpen, setKereruChatOpen] = useState(false);
  const [linkedInBannerVisible, setLinkedInBannerVisible] = useState(false);
  const [linkedInBannerDismissed, setLinkedInBannerDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  // LinkedIn banner animation (home page only)
  useEffect(() => {
    if (activePage === 'home' && !linkedInBannerDismissed) {
      const timer = setTimeout(() => {
        setLinkedInBannerVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setLinkedInBannerVisible(false);
    }
  }, [activePage, linkedInBannerDismissed]);

  const dismissLinkedInBanner = () => {
    setLinkedInBannerDismissed(true);
    setLinkedInBannerVisible(false);
  };

  const navigate = (page: Page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    setCompanyDropdownOpen(false);
    setFactoryDropdownOpen(false);
    setModelsDropdownOpen(false);
  };

  const scrollToSection = (id: string) => {
    if (activePage !== 'home') {
      setActivePage('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Shared Components
  const BrandTag = ({ label, icon: Icon = ShieldCheck, centered = false }: { label: string, icon?: any, centered?: boolean }) => (
    <div className={`flex items-center gap-2 mb-4 ${centered ? 'justify-center' : 'justify-start'}`}>
      <Icon className="w-5 h-5 text-kereru-neon" />
      <span className="text-kereru-neon font-extrabold text-[11px] uppercase tracking-[0.2em]">{label}</span>
    </div>
  );

  const CalloutBox = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
    <div className={`relative overflow-hidden bg-gradient-to-br from-kereru-panel to-kereru-dark border border-white/10 rounded-[2rem] p-8 md:p-16 shadow-2xl ${className}`}>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-kereru-green/10 rounded-full blur-[100px]"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px]"></div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );

  const SectionHeading = ({ tag, title, description, icon, centered = false }: { tag?: string, title: string, description?: React.ReactNode, icon?: any, centered?: boolean }) => (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
      {tag && <BrandTag label={tag} icon={icon} centered={centered} />}
      <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight tracking-tight uppercase">{title}</h2>
      {description && <div className={`text-slate-400 text-lg leading-relaxed space-y-6 ${centered ? 'mx-auto max-w-2xl' : 'max-w-4xl'}`}>{description}</div>}
    </div>
  );

  const ServiceCard = ({ icon: Icon, title, description, benefits, iconColor = "bg-kereru-neon/10" }: { icon: any, title: string, description: string, benefits?: string, iconColor?: string }) => (
    <div className={`bg-kereru-panel/40 border-white/10 text-white rounded-2xl p-8 shadow-sm border flex flex-col h-full hover:bg-kereru-panel/60 hover:border-kereru-neon/30 transition-all group text-left relative overflow-hidden`}>
      <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-kereru-neon/5 rounded-full blur-2xl group-hover:bg-kereru-neon/10 transition-colors"></div>
      <div className={`w-12 h-12 ${iconColor} rounded-xl flex items-center justify-center mb-6 border border-white/5 relative z-10`}>
        <Icon className={`w-6 h-6 text-kereru-neon`} />
      </div>
      <h3 className={`font-bold text-xl mb-4 uppercase tracking-tight text-white relative z-10`}>{title}</h3>
      <p className={`text-sm leading-relaxed mb-6 text-slate-400 relative z-10`}>{description}</p>
      {benefits && <p className="text-kereru-neon text-xs font-bold leading-relaxed mb-8 uppercase tracking-widest relative z-10">{benefits}</p>}
      <button className={`mt-auto flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all text-slate-300 hover:text-white relative z-10`}>
        Learn more <ArrowRight className={`w-4 h-4 text-kereru-neon`} />
      </button>
    </div>
  );

  const ConsultingItem = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
    <div className="p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all text-left">
      <div className="w-10 h-10 bg-kereru-neon/10 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-kereru-neon" />
      </div>
      <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">{title}</h4>
      <p className="text-slate-500 text-xs leading-relaxed">{description}</p>
    </div>
  );

  // Content for Home
  const HomePage = () => (
    <div className="space-y-32 pb-32">
      {/* Hero - Left Aligned */}
      <section className="relative pt-48 pb-12 px-6 min-h-[90vh] flex items-center overflow-hidden mesh-gradient">
        <div className="container mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <span className="w-2 h-2 bg-kereru-neon rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sovereign Intelligence Online</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold leading-tight tracking-tighter text-white">
              AI Sovereignty <br />
              <span className="gradient-text">for Aotearoa.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl">
              We deliver secure, responsible, and locally-controlled AI infrastructure.
              Proudly partnering with <span className="text-white font-bold">SCX.AI</span> to bring world-class sovereign capability to New Zealand shores.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => navigate('what-we-offer')}
                className="btn-8020 btn-8020-white px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-bold transition flex items-center justify-center backdrop-blur-sm text-sm uppercase tracking-widest"
              >
                Our Offerings
              </button>
            </div>

            <div className="pt-12 flex items-center gap-12">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-xl font-bold text-white mb-1">Strategic Partner</p>
                  <p className="text-xs text-slate-500 uppercase font-bold">SCX.AI</p>
                </div>
                <img
                  src="https://www.scx.ai/scx-logo-long.png"
                  alt="SCX.AI Logo"
                  className="h-6 opacity-80 brightness-110"
                />
              </div>
            </div>
          </div>

          {/* Feature Box - Visual Element */}
          <div className="relative">
            <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl space-y-8 animate-in fade-in slide-in-from-right-10 duration-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-kereru-neon/50"></div>
              </div>

              <div className="flex items-start gap-6 group cursor-pointer" onClick={() => navigate('infrastructure')}>
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl group-hover:bg-blue-500/20 transition">
                  <Cpu className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Compute Location</p>
                  <p className="text-xl font-bold text-white uppercase tracking-tight">Across NZ</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group cursor-pointer" onClick={() => navigate('sovereignty')}>
                <div className="p-3 bg-kereru-green/10 border border-kereru-green/20 rounded-xl group-hover:bg-kereru-green/20 transition">
                  <Shield className="w-6 h-6 text-kereru-neon" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Data Sovereignty</p>
                  <p className="text-xl font-bold text-white uppercase tracking-tight">Protected (NZ Privacy Act)</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group cursor-pointer" onClick={() => navigate('our-models')}>
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl group-hover:bg-purple-500/20 transition">
                  <Network className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Model Source</p>
                  <p className="text-xl font-bold text-kereru-neon uppercase tracking-tight">SCX.AI Strategic Core</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Kererū Section - Left Aligned Narrative */}
      <section id="strategic-advantage" className="container mx-auto px-6 scroll-mt-24">
        <div className="text-left mb-12">
          <BrandTag label="WHY KERERŪ" icon={CheckCircle2} />
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight uppercase">
            Strategic advantage <br />for New Zealand AI.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8 text-left">
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-medium">
              Power & cost efficiency. Low latency. Regional delivery. No vendor lock-in.
            </p>
            <p className="text-slate-400 leading-relaxed text-lg">
              Kererū.ai is designed to keep AI capability under local control while improving cost-to-serve and reducing long-run platform risk. Our architecture separates training and inference, aligns workloads to the most efficient compute, and supports a hub-and-spoke deployment model.
            </p>
          </div>
          <div className="bg-gradient-to-br from-kereru-panel to-kereru-dark border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-xl text-left">
            <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">Built for regulated workloads</h3>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
              Kererū enables AI deployment close to sensitive data and operational systems — supporting real-time decision-making for regulated environments.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Data Residency', 'Compliance', 'Audit Ready', 'Physical Control'].map(tag => (
                <span key={tag} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-slate-300 uppercase tracking-widest">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlight Boxes - Centered Grid for Balance */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Shield className="w-8 h-8 text-white" />, title: "Data Security", description: "Enterprise-grade security with complete data privacy and control, subject to New Zealand law." },
            { icon: <Zap className="w-8 h-8 text-white" />, title: "High Performance", description: "Cutting-edge hardware including specialized accelerators and SCX.AI integrated stacks." },
            { icon: <Headset className="w-8 h-8 text-white" />, title: "Enterprise Support", description: "Dedicated local support team with deep AI expertise and unique market understanding." },
            { icon: <Banknote className="w-8 h-8 text-white" />, title: "Transparent Pricing", description: "Predictable costs in NZD, no hidden fees, and flexible models to suit your mission." }
          ].map((item, idx) => (
            <div key={idx} className="bg-kereru-panel/40 border border-white/10 rounded-3xl p-8 text-center flex flex-col items-center group hover:bg-kereru-panel/60 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-kereru-neon flex items-center justify-center mb-6 shadow-lg shadow-kereru-neon/20 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Callout Box - Centered focal point */}
      <section className="container mx-auto px-6">
        <CalloutBox className="relative overflow-hidden group">
          <Wind className="absolute -right-16 -top-16 w-64 h-64 text-kereru-neon/5 rotate-12 group-hover:scale-110 transition-transform duration-1000" />
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block px-4 py-1.5 bg-kereru-neon/10 border border-kereru-neon/20 rounded-full text-kereru-neon text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              EFFICIENCY COMMITMENT
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-6">
              Power and Water Impact <br />
              <span className="text-kereru-neon">— By Design</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-kereru-neon to-transparent mx-auto mb-8 rounded-full"></div>
            <p className="text-xl md:text-2xl text-slate-200 font-medium leading-relaxed max-w-3xl mx-auto">
              At national scale, Kererū avoids electricity demand equivalent to <span className="text-white font-black underline decoration-kereru-neon decoration-4 underline-offset-4">tens of thousands of homes</span>.
            </p>
          </div>
        </CalloutBox>
      </section>

      {/* Project Kererū - Centered Alignment */}
      <section id="project-kereru-cta" className="container mx-auto px-6 py-24 bg-gradient-to-r from-kereru-dark to-kereru-panel border border-white/5 rounded-[3rem] relative overflow-hidden scroll-mt-24">
        <div className="absolute top-1/2 left-1/2 w-[120%] h-[120%] bg-kereru-neon/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2"></div>
        <div className="max-w-4xl mx-auto relative z-10 px-8 text-center flex flex-col items-center">
          <SectionHeading
            tag="MODEL ENABLEMENT"
            title="Project Kererū"
            icon={Zap}
            centered={true}
          />
          <p className="text-slate-300 text-xl mb-12 leading-relaxed max-w-3xl">
            Kererū.ai develops and maintains proprietary, New Zealand-grounded foundational models. We provide expert fine-tuning services for enterprise and government workloads.
          </p>
          <button onClick={() => navigate('project-kereru')} className="btn-8020 px-12 py-5 bg-kereru-neon text-white rounded-full font-bold flex items-center gap-2 hover:gap-4 transition-all uppercase text-sm tracking-widest shadow-xl">
            Explore Project Kererū <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Closing CTA - Centered final destination */}
      <section id="get-started-cta" className="container mx-auto px-6 text-center scroll-mt-32">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight uppercase">Build sovereign AI capacity without scaling environmental impact.</h2>
          <p className="text-slate-400 text-lg">Talk to Kererū about your workload, latency needs, and data residency constraints.</p>
          <button onClick={() => navigate('contact')} className="btn-8020 px-14 py-6 bg-white text-kereru-dark rounded-full font-extrabold text-lg transition-all shadow-xl uppercase tracking-widest">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );

  // Sovereignty Page
  const SovereigntyPage = () => (
    <div className="container mx-auto px-6 pt-48 pb-24 space-y-24">
      <SectionHeading
        tag="DATA SOVEREIGNTY"
        title="Your data, your jurisdiction."
        description="Kereru.ai is committed to protecting data sovereignty. Your data belongs to you—and it stays within New Zealand unless you explicitly consent otherwise."
      />
      <div className="grid md:grid-cols-2 gap-8">
        {[
          { icon: <MapPin className="w-6 h-6 text-blue-400" />, title: "Local Processing", description: "We process data within New Zealand infrastructure. Data only leaves NZ with explicit consent." },
          { icon: <Lock className="text-kereru-neon w-6 h-6" />, title: "Strict Access Controls", description: "Comprehensive access controls ensure data is accessible only to authorised parties." },
          { icon: <UserCheck className="w-6 h-6 text-amber-400" />, title: "Your Control", description: "You decide how your data moves and is used. Granular controls for mission-critical apps." },
          { icon: <Eye className="w-6 h-6 text-purple-400" />, title: "Transparency", description: "Transparent reporting on storage, access, and processing. No hidden third parties." }
        ].map((principle, idx) => (
          <div key={idx} className="p-8 bg-kereru-panel/50 border border-white/10 rounded-[2rem] hover:bg-kereru-panel transition-all group text-left">
            <div className="mb-6 flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:border-white/10 transition">{principle.icon}</div>
              <h4 className="text-xl font-bold text-white uppercase tracking-tight">{principle.title}</h4>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm">{principle.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // Governance Page
  const GovernancePage = () => (
    <div className="container mx-auto px-6 pt-48 pb-24 space-y-24">
      <SectionHeading
        tag="GOVERNANCE & CONTROL"
        title="Governance & control for highly secure workloads"
        description="Deploy Kereru.ai with isolation and policy controls—with dedicated AI endpoints with an optional Secure Enclave to protect customer data."
      />
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { icon: <Layers className="w-5 h-5 text-kereru-neon" />, title: "Dedicated AI endpoints", desc: "for workload isolation" },
            { icon: <Shield className="w-5 h-5 text-kereru-neon" />, title: "Secure Enclave option", desc: "to protect data during inference" },
            { icon: <Network className="w-5 h-5 text-kereru-neon" />, title: "Private networking options", desc: "for internal-only access" },
            { icon: <Key className="w-5 h-5 text-kereru-neon" />, title: "Fine-grained access control", desc: "(org, project, key, role)" },
            { icon: <FileText className="w-5 h-5 text-kereru-neon" />, title: "Auditability", desc: "(logs, traceability, policy events)" },
            { icon: <Eye className="w-5 h-5 text-kereru-neon" />, title: "Data handling controls", desc: "(retention, redaction, opt-in telemetry)" },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 group p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition text-left">
              <div className="mt-1 shrink-0 p-2 bg-kereru-neon/10 rounded-lg group-hover:bg-kereru-neon/20 transition-colors">
                {item.icon}
              </div>
              <div>
                <h4 className="text-white font-bold text-sm leading-tight uppercase tracking-widest">{item.title}</h4>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="relative group">
          <div className="absolute -inset-4 bg-kereru-neon/5 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative glass-panel rounded-[2rem] border border-white/10 p-8 md:p-12 overflow-hidden shadow-2xl">
            <span className="absolute top-6 left-8 text-[10px] font-mono text-slate-500 uppercase tracking-widest">Dedicated Endpoint Architecture</span>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-12">
              <div className="w-32 h-32 flex items-center justify-center text-center p-4 bg-slate-800/50 border border-slate-700 rounded-2xl">
                <span className="text-slate-400 text-sm font-bold uppercase tracking-tighter">Public /<br />Shared</span>
              </div>
              <ArrowRight className="text-slate-600 hidden md:block" />
              <ChevronDown className="text-slate-600 md:hidden" />
              <div className="w-36 h-36 flex flex-col items-center justify-center text-center p-4 bg-blue-500/10 border-2 border-blue-500/50 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                <span className="text-blue-400 text-sm font-black mb-2 uppercase tracking-tight">Dedicated<br />Endpoint</span>
              </div>
              <ArrowRight className="text-slate-600 hidden md:block" />
              <ChevronDown className="text-slate-600 md:hidden" />
              <div className="relative border-2 border-dashed border-kereru-neon rounded-2xl p-4 flex flex-col gap-3 min-w-[160px] bg-kereru-neon/5">
                <span className="absolute -top-3 left-4 bg-kereru-dark px-2 text-[10px] font-black text-kereru-neon uppercase">Secure Enclave</span>
                {["Model Runtime", "Encrypted Memory", "Customer Keys"].map(label => (
                  <div key={label} className="py-2 px-3 bg-kereru-neon/10 border border-kereru-neon/20 rounded-lg text-center">
                    <span className="text-kereru-neon text-[10px] font-bold uppercase tracking-tight">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="container mx-auto px-6 pt-48 pb-24 space-y-24">
      <SectionHeading
        tag="ABOUT KERERŪ"
        title="Sovereign AI capability, built for Aotearoa."
        description="Kererū.ai is a majority New Zealand–owned entity established to deliver a sovereign, national-scale AI infrastructure capability."
      />
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="bg-white/5 p-8 md:p-12 rounded-[2rem] border border-white/10 text-left">
          <h3 className="text-2xl font-bold text-white mb-6 tracking-tight uppercase">Our Mandate</h3>
          <p className="text-slate-400 leading-relaxed text-lg">
            Our mandate aligns with national research and innovation priorities: establishing a long-term AI platform that is technically robust, economically sustainable, and capable of supporting universities, CRIs, and government agencies.
          </p>
        </div>
        <div className="space-y-8 text-left">
          <h3 className="text-2xl font-bold text-white tracking-tight uppercase">Our Principles</h3>
          <div className="grid gap-6">
            {[
              { title: "Sovereignty by design", text: "Decision-making authority across the AI stack, with geographic constraints enforced by architecture." },
              { title: "Efficiency as a foundation", text: "We treat power and water intensity as first-order design constraints." }
            ].map(p => (
              <div key={p.title} className="p-6 bg-kereru-panel/30 border-l-2 border-kereru-neon rounded-r-2xl">
                <h4 className="font-bold text-white mb-1 uppercase text-xs tracking-widest">{p.title}</h4>
                <p className="text-slate-400 text-sm">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const InfrastructurePage = () => (
    <div className="container mx-auto px-6 pt-48 pb-24 space-y-32">
      {/* Intro Section */}
      <section>
        <SectionHeading
          tag="NATIONAL CAPABILITY"
          icon={Globe}
          title="Distributed AI platform."
          description="Kererū is designed for national delivery. Our architecture supports central capacity for training and data-intensive research, paired with regional inference nodes that bring low-latency AI to where it is used — across universities, CRIs, government services, health networks, and industrial environments."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12 text-left">
            <div className="space-y-6">
              <BrandTag label="HUB-AND-SPOKE MODEL" icon={Database} />
              <div className="grid gap-8">
                <div className="p-6 bg-kereru-panel/40 rounded-2xl border border-white/5 hover:bg-white/5 transition-all">
                  <h4 className="font-bold text-kereru-neon mb-2 uppercase text-xs tracking-widest">National hubs (training & HPC)</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">Designed for high-bandwidth training workloads, large datasets, and shared multi-tenant research operations.</p>
                </div>
                <div className="p-6 bg-kereru-panel/40 rounded-2xl border border-white/5 hover:bg-white/5 transition-all">
                  <h4 className="font-bold text-kereru-neon mb-2 uppercase text-xs tracking-widest">Regional nodes (inference)</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">Designed for low-latency model serving close to users, facilities, and operational systems — enabling real-time AI without pushing sensitive workloads offshore.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="glass-panel p-6 rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden group">
            <InfrastructureDiagram />
            <p className="mt-4 text-center text-[10px] uppercase font-bold text-slate-600 tracking-widest">Sovereign Distributed Architecture</p>
          </div>
        </div>
      </section>

      {/* Why it Matters Section */}
      <section className="container mx-auto px-6">
        <div className="text-left mb-16">
          <BrandTag label="STRATEGIC VALUE" icon={Activity} />
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">Why it matters</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Zap className="w-6 h-6 text-kereru-neon" />, title: "Lower Latency", desc: "For time-sensitive workflows: voice, real-time decisioning, interactive AI, instrument control, and operational monitoring." },
            { icon: <ShieldCheck className="w-6 h-6 text-kereru-neon" />, title: "Better Resilience", desc: "Through distributed capacity and location diversity, ensuring high availability across the country." },
            { icon: <Leaf className="w-6 h-6 text-kereru-neon" />, title: "Reduced Intensity", desc: "Lower grid and cooling requirements compared with high-density central GPU-only deployments." },
            { icon: <Users className="w-6 h-6 text-kereru-neon" />, title: "National Access", desc: "Practical access for all of New Zealand, moving beyond single metro data centre limitations." }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white/5 rounded-[2rem] border border-white/10 hover:border-kereru-neon/30 transition-all text-left">
              <div className="mb-6 p-3 bg-kereru-neon/10 rounded-xl w-fit">{item.icon}</div>
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">{item.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Two Stacks Section */}
      <section>
        <div className="text-center mb-16">
          <BrandTag label="ARCHITECTURE" icon={Layers} centered={true} />
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">Two Stacks, Integrated Experience</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">Kererū operates two discrete environments, each optimised for its purpose, integrated through access, identity, and governance.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="p-8 md:p-12 bg-kereru-panel/60 border-l-4 border-kereru-blue rounded-r-3xl text-left">
            <h4 className="text-kereru-blue font-black text-xl mb-6 uppercase tracking-widest">Training & HPC</h4>
            <p className="text-slate-400 mb-8 leading-relaxed">A Red Hat–based stack designed specifically for GPU training and high-performance computing operations.</p>
            <ul className="space-y-3">
              {['Red Hat Enterprise Linux', 'GPU Optimized', 'HPC Workloads', 'Scalable Clusters'].map(li => (
                <li key={li} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-kereru-blue"></div> {li}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 md:p-12 bg-kereru-panel/60 border-l-4 border-kereru-neon rounded-r-3xl text-left">
            <h4 className="text-kereru-neon font-black text-xl mb-6 uppercase tracking-widest">Inference Stack</h4>
            <p className="text-slate-400 mb-8 leading-relaxed">An independent, vertically integrated stack for specialised accelerators, using native compiler and model-serving capabilities.</p>
            <ul className="space-y-3">
              {['Native Runtime', 'Specialised Accelerators', 'Inference Focused', 'Predictable Determinism'].map(li => (
                <li key={li} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-kereru-neon"></div> {li}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 max-w-3xl mx-auto p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col md:flex-row items-center gap-6 justify-center">
          <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em]">INTEGRATION LAYER</span>
          <div className="flex gap-4 flex-wrap justify-center">
            {['Access Control', 'Identity Management', 'Shared Data Services', 'Unified Governance'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[9px] font-bold text-slate-300 uppercase tracking-widest">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Observability Section */}
      <section className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 text-left space-y-8">
            <BrandTag label="VISIBILITY" icon={Eye} />
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">Comprehensive Observability</h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              Kererū provides a comprehensive framework spanning accelerator, system, and network performance using open standards.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Telemetry integrates with job scheduling signals to support capacity planning, utilisation optimisation, and governance reporting, with exports compatible with common observability tooling.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                <BarChart className="w-4 h-4 text-kereru-neon" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">Open Standards</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                <Search className="w-4 h-4 text-kereru-neon" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">Full Telemetry</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-kereru-neon w-3/4 animate-pulse"></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-20 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-kereru-neon">98.2%</span>
                  <span className="text-[8px] uppercase text-slate-500 tracking-tighter">GPU Utilization</span>
                </div>
                <div className="h-20 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-blue-400">12ms</span>
                  <span className="text-[8px] uppercase text-slate-500 tracking-tighter">Avg Latency</span>
                </div>
                <div className="h-20 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-purple-400">10GB/s</span>
                  <span className="text-[8px] uppercase text-slate-500 tracking-tighter">IO Throughput</span>
                </div>
              </div>
              <div className="h-32 bg-slate-900/50 rounded-xl border border-white/5 p-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full fill-none stroke-kereru-neon stroke-[0.5]">
                    <path d="M0,10 Q25,2 50,10 T100,10" />
                  </svg>
                </div>
                <span className="text-[9px] uppercase font-bold text-slate-600 tracking-widest">Live Performance Stream</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Specs Table Section */}
      <section>
        <SectionHeading
          tag="TECH SPECS"
          title="Designed for output."
          description="The AI Factory design focuses on end-to-end delivery — from training through to high-volume inference — with efficiency and governance built in."
        />
        <div className="overflow-x-auto rounded-[2rem] border border-white/10 bg-kereru-panel/20 p-8 text-left shadow-xl">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">Metric</th>
                <th className="py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">Standard Platforms</th>
                <th className="py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-kereru-neon">Kererū.ai Architecture</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                ["Primary hardware", "GPUs", "Specialised inference accelerators"],
                ["Power per rack", "30–60+ kW", "~10–12 kW"],
                ["Tokens per watt", "Baseline", "Up to ~6× higher"],
                ["Grid impact", "High", "Controlled"]
              ].map(([metric, gpu, kereru]) => (
                <tr key={metric} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-5 font-bold text-white">{metric}</td>
                  <td className="py-5 text-slate-500">{gpu}</td>
                  <td className="py-5 text-kereru-neon font-black uppercase">{kereru}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );

  const OurModelsPage = () => {
    const ModelCard = ({ title, provider, context, description, tags }: { title: string, provider: string, context: string, description: string, tags?: string[] }) => (
      <div className="bg-white/5 rounded-2xl p-6 shadow-sm border border-white/10 flex flex-col h-full hover:bg-white/10 transition-all group text-left">
        <div className="mb-4">
          <h3 className="text-white font-bold text-lg mb-1 group-hover:text-kereru-neon transition-colors">{title}</h3>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{provider} • {context}</p>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-6">{description}</p>
        {tags && (
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 bg-kereru-neon/10 text-kereru-neon rounded-full text-[10px] font-bold uppercase tracking-wider border border-kereru-neon/20">
                <CheckCircle2 className="w-3 h-3" /> {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    );

    return (
      <div className="min-h-screen bg-kereru-dark">
        <div className="container mx-auto px-6 pt-48 pb-32">
          {/* Header */}
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <BrandTag label="SOVEREIGN MODELS" icon={BrainCircuit} centered={true} />
            <h1 className="text-white text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">Our <br /><span className="gradient-text">Model Library</span></h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-medium">
              Access the world's most powerful models, optimized for Aotearoa performance and hosted on our secure, local infrastructure.
            </p>
          </div>

          {/* Language Models Section */}
          <div className="mb-32">
            <div className="flex items-center gap-3 mb-10 border-l-4 border-kereru-neon pl-6">
              <h2 className="text-white font-black text-2xl uppercase tracking-widest">Language Models</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ModelCard
                title="ALLaM-7B-Instruct-preview"
                provider="HUMAIN"
                context="4k context"
                description="ALLaM 7B Instruct — compact instruction-tuned model for general tasks"
              />
              <ModelCard
                title="DeepSeek-R1-0528"
                provider="DeepSeek"
                context="128k context"
                description="First-generation RL-trained reasoning model with chain-of-thought (o1-class)"
                tags={["Reasoning"]}
              />
              <ModelCard
                title="DeepSeek-R1-Distill-Llama-70B"
                provider="DeepSeek"
                context="128k context"
                description="Distilled Llama 70B variant of DeepSeek R1 with strong reasoning"
                tags={["Reasoning"]}
              />
              <ModelCard
                title="DeepSeek-V3-0324"
                provider="DeepSeek"
                context="128k context"
                description="DeepSeek V3 (MoE) focused on fast direct outputs; 128k context, tools"
                tags={["Function Calling"]}
              />
              <ModelCard
                title="DeepSeek-V3.1"
                provider="DeepSeek"
                context="128k context"
                description="Hybrid MoE model with distilled R1 reasoning; excels at math, code, agents"
                tags={["Reasoning", "Function Calling"]}
              />
              <ModelCard
                title="DeepSeek-V3.1-Terminus"
                provider="DeepSeek"
                context="128k context"
                description="DeepSeek V3.1 Terminus — enhanced reasoning with reliable function calling"
                tags={["Reasoning", "Function Calling"]}
              />
              <ModelCard
                title="Llama-3.3-Swallow-70B-Instruct-v0.4"
                provider="Meta"
                context="128k context"
                description="Meta Llama 3.3 70B Instruct — multilingual with 128k context (GQA-optimized)"
                tags={["Function Calling"]}
              />
              <ModelCard
                title="Llama-4-Maverick-17B-128E-Instruct"
                provider="Meta"
                context="128k context"
                description="Meta Llama 4 Maverick 17B — native multimodal MoE (128 experts), 128k context"
                tags={["Vision", "Function Calling"]}
              />
              <ModelCard
                title="Meta-Llama-3.1-8B-Instruct"
                provider="Meta"
                context="16k context"
                description="Meta Llama 3.1 8B — efficient multilingual model with 128k context and GQA"
                tags={["Function Calling"]}
              />
              <ModelCard
                title="Meta-Llama-3.3-70B-Instruct"
                provider="Meta"
                context="128k context"
                description="Meta Llama 3.3 70B — multilingual instruction-tuned model with 128k context"
                tags={["Function Calling"]}
              />
              <ModelCard
                title="Qwen3-32B"
                provider="Alibaba"
                context="32k context"
                description="Qwen3 32B — multilingual model with strong Chinese/English and reasoning"
                tags={["Reasoning", "Function Calling"]}
              />
              <ModelCard
                title="Qwen3-235B"
                provider="Alibaba"
                context="32k context"
                description="Qwen3 235B — multilingual model with strong Chinese/English and reasoning"
                tags={["Reasoning", "Function Calling"]}
              />
              <ModelCard
                title="gpt-oss-120b"
                provider="OpenAI"
                context="128k context"
                description="Open-weight MoE reasoning model (117B/5.1B active), 131k context, CoT & tools"
                tags={["Reasoning", "Function Calling"]}
              />
              <ModelCard
                title="magpie-small"
                provider="scx.ai"
                context="128k context"
                description="Experimental Australian sovereign fine-tuned model optimized for Australian English"
                tags={["Reasoning"]}
              />
              <ModelCard
                title="kereru-small"
                provider="kereru.ai"
                context="128k context"
                description="Experimental New Zealand sovereign fine-tuned model optimized for Kiwi English"
                tags={["Reasoning"]}
              />
            </div>
          </div>

          {/* Embedding & Audio Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12 gap-y-24 mb-32">
            <div>
              <div className="flex items-center gap-3 mb-10 border-l-4 border-kereru-neon pl-6 text-left">
                <h2 className="text-white font-black text-2xl uppercase tracking-widest">Embedding Models</h2>
              </div>
              <ModelCard
                title="E5-Mistral-7B-Instruct"
                provider="Mistral"
                context="32k context • 4096d"
                description="Compact 7B embedding model for semantic search and retrieval"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-10 border-l-4 border-kereru-neon pl-6 text-left">
                <h2 className="text-white font-black text-2xl uppercase tracking-widest">Audio Models</h2>
              </div>
              <ModelCard
                title="Whisper-Large-v3"
                provider="OpenAI"
                context="4k context"
                description="Multilingual ASR for transcription and translation (99+ languages)"
                tags={["Transcription"]}
              />
            </div>
          </div>

        </div>

        {/* SAM Product Spotlight - White Background Section */}
        <div className="bg-white py-24 -mx-6 px-6 shadow-2xl">
          <div className="container mx-auto">
            {/* Ready Badge */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-kereru-neon text-white rounded-full animate-pulse">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                <span className="font-black text-xs uppercase tracking-widest">Ready to Use Today • 10 Minute Setup</span>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Left Column - Information */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-kereru-neon/10 border border-kereru-neon/30 rounded-full">
                  <span className="text-kereru-neon font-bold text-[10px] uppercase tracking-widest">Powered by Kereru Models</span>
                </div>

                <h2 className="text-kereru-dark font-black text-4xl md:text-5xl leading-tight tracking-tight">
                  SAM - Your AI Receptionist
                </h2>

                <h3 className="text-slate-700 font-bold text-2xl md:text-3xl leading-tight">
                  Never Lose a Customer to a Missed Call
                </h3>

                <p className="text-slate-600 text-lg leading-relaxed">
                  SAM is your AI receptionist with a friendly Kiwi voice. Answer every call 24/7, book appointments, and get instant summaries — all powered by sovereign Kereru models running on New Zealand infrastructure.
                </p>

                {/* 3-Step Setup */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-kereru-neon text-white rounded-full flex items-center justify-center font-black text-sm">1</div>
                    <div>
                      <h4 className="text-kereru-dark font-bold text-sm uppercase tracking-wide mb-1">Divert Your Calls</h4>
                      <p className="text-slate-600 text-sm">Forward your business line to Sam when you're busy</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-kereru-neon text-white rounded-full flex items-center justify-center font-black text-sm">2</div>
                    <div>
                      <h4 className="text-kereru-dark font-bold text-sm uppercase tracking-wide mb-1">Sam Answers</h4>
                      <p className="text-slate-600 text-sm">Natural Kiwi voice handles your callers professionally</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-kereru-neon text-white rounded-full flex items-center justify-center font-black text-sm">3</div>
                    <div>
                      <h4 className="text-kereru-dark font-bold text-sm uppercase tracking-wide mb-1">You Get Notified</h4>
                      <p className="text-slate-600 text-sm">Receive instant SMS and email summaries with all details</p>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 pt-6">
                  <button
                    onClick={() => navigate('contact')}
                    className="btn-8020 px-10 py-5 bg-kereru-neon text-white rounded-full font-black uppercase text-base tracking-widest shadow-2xl shadow-kereru-neon/30 hover:bg-kereru-green hover:shadow-kereru-neon/50 transition-all transform hover:scale-105"
                  >
                    Contact Us for a Demo →
                  </button>
                </div>
              </div>

              {/* Right Column - Dashboard Visual */}
              <div className="relative">
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 border-2 border-slate-200 shadow-xl">
                  {/* Dashboard Header */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-300">
                    <div className="w-10 h-10 bg-kereru-neon rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-kereru-dark font-black text-lg">Kia ora, Kereru!</h4>
                      <p className="text-slate-500 text-xs">Here's how Sam is doing today</p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Phone className="w-4 h-4 text-blue-600" />
                        </div>
                      </div>
                      <p className="text-slate-600 text-xs font-medium uppercase tracking-wide mb-1">Total Calls Today</p>
                      <p className="text-kereru-dark text-2xl font-black">24</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                      <p className="text-slate-600 text-xs font-medium uppercase tracking-wide mb-1">Answered by Sam</p>
                      <p className="text-kereru-dark text-2xl font-black">24</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <BadgeCheck className="w-4 h-4 text-purple-600" />
                        </div>
                      </div>
                      <p className="text-slate-600 text-xs font-medium uppercase tracking-wide mb-1">Bookings Made</p>
                      <p className="text-kereru-dark text-2xl font-black">8</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                          <Activity className="w-4 h-4 text-amber-600" />
                        </div>
                      </div>
                      <p className="text-slate-600 text-xs font-medium uppercase tracking-wide mb-1">Urgent Calls</p>
                      <p className="text-kereru-dark text-2xl font-black">2</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Cards Bottom */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-kereru-neon hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-kereru-neon/10 rounded-xl flex items-center justify-center mb-4 border border-kereru-neon/20">
                  <Phone className="w-6 h-6 text-kereru-neon" />
                </div>
                <h4 className="text-kereru-dark font-bold text-sm uppercase tracking-wide mb-2">24/7 Availability</h4>
                <p className="text-slate-600 text-xs leading-relaxed">Never miss a call, day or night</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-kereru-neon hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-kereru-neon/10 rounded-xl flex items-center justify-center mb-4 border border-kereru-neon/20">
                  <MapPin className="w-6 h-6 text-kereru-neon" />
                </div>
                <h4 className="text-kereru-dark font-bold text-sm uppercase tracking-wide mb-2">Kiwi Voice</h4>
                <p className="text-slate-600 text-xs leading-relaxed">Authentic New Zealand accent</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-kereru-neon hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-kereru-neon/10 rounded-xl flex items-center justify-center mb-4 border border-kereru-neon/20">
                  <MessageSquare className="w-6 h-6 text-kereru-neon" />
                </div>
                <h4 className="text-kereru-dark font-bold text-sm uppercase tracking-wide mb-2">Instant Summaries</h4>
                <p className="text-slate-600 text-xs leading-relaxed">Get call transcripts immediately</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-kereru-neon hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-kereru-neon/10 rounded-xl flex items-center justify-center mb-4 border border-kereru-neon/20">
                  <Zap className="w-6 h-6 text-kereru-neon" />
                </div>
                <h4 className="text-kereru-dark font-bold text-sm uppercase tracking-wide mb-2">10 Min Setup</h4>
                <p className="text-slate-600 text-xs leading-relaxed">Up and running in minutes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 pb-32">

          {/* Footer Banner */}
          <CalloutBox className="text-center">
            <Sparkles className="w-12 h-12 text-kereru-neon mx-auto mb-6" />
            <h3 className="text-white font-black text-2xl md:text-3xl mb-6 uppercase tracking-tighter">Expanding Library</h3>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              We continuously expand our model library to include the latest advancements. Enterprise customers can also leverage our <span className="text-white font-bold">"Bring your own model checkpoint"</span> service.
            </p>
            <button onClick={() => navigate('contact')} className="btn-8020 px-10 py-4 bg-kereru-neon text-white rounded-full font-bold uppercase text-sm tracking-widest shadow-xl shadow-kereru-neon/20">
              Request Custom Model Hosting
            </button>
          </CalloutBox>
        </div>
      </div>
    );
  };

  const ProjectKereruPage = () => {
    const [formSubmitted, setFormSubmitted] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);

      try {
        const response = await fetch('https://formspree.io/f/xbdlnkda', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          setFormSubmitted(true);
        }
      } catch (error) {
        console.error('Form submission error:', error);
      }
    };

    return (
      <div className="container mx-auto px-6 pt-48 pb-24 space-y-24">
        {/* Project Kererū Section */}
        <SectionHeading
          tag="PROPRIETARY CAPABILITY"
          title="Project Kererū"
          description="Project Kererū is Kererū.ai's model-layer enablement programme — enabling fine-tuned models grounded on local data, policies, standards, and legal frameworks. This includes company enterprise information and cultural pathways, with the ability to run leading global models alongside - on the same platform."
          icon={Zap}
        />

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button onClick={() => navigate('contact')} className="btn-8020 px-12 py-5 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-full font-black uppercase text-sm tracking-widest shadow-xl transition-all backdrop-blur-sm">
            Discuss Your Model Requirements
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-kereru-panel to-kereru-dark border border-white/10 rounded-[2rem] p-8 md:p-16 shadow-2xl">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-kereru-green/10 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px]"></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-kereru-neon" />
                  <span className="text-kereru-neon font-extrabold text-[11px] uppercase tracking-[0.2em]">EARLY ACCESS AVAILABLE</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                  PROJECT KERERŪ<br />
                  <span className="text-3xl md:text-4xl text-slate-300">The First LLM That Thinks Like a Kiwi</span>
                </h1>
              </div>

              <div className="flex items-start gap-16">
                {/* Kereru Bird Icon */}
                <div className="hidden md:block mt-4">
                  <svg viewBox="0 0 595.3 841.9" className="w-36 h-36">
                    <path fill="white" d="M314.7,773.7c-.6,4.1-5,12.9-9.6,13.5-8.9,1.2-6.6-8.8-10.4-12.5s-13.9-4.2-17-9.5c.4,6.8-2.6,21.4-12,18.6-5.5-1.6-4.8-8-8-11-1.8-1.6-6.3-3.1-8.9-5.1-7.1-5.5-10.3-14.2-16.1-20.9-8.5-1.1-17.1-.3-25.5-.4-2.1,0-4.3-1.2-5.9-1.1-2.8.3-5.2,5.6-8.5,6.6-11.8,3.7-10.6-15.5-9.1-22.5-10.9-2.5-24.9-5.4-33.4-13.1s-4.2-6-7.6-8.4-9.7-4.4-13.7-7.4c-1.7-.3-23.3,13.9-27.6,16-20.7,10.2-46.1,14.5-69.2,12.8-5.8-.4-13.7-3.7-18.1-3.9-6.7-.3-21.6,4.4-29.9,4.9-10.2.6-45.9-1.3-53-8-6.6-6.2,1.6-12.8,6-17,12.3-12,26.8-22,39.5-33.5-11-1.6-29,.5-32.5-13.5-3.4-13.4,17.9-33.8,25.3-44.7,7.7-11.3,14.1-23.6,22-35,2.9-4.1,12.7-14.8,13.8-18.2s-.9-12-.6-16.5c2.8-40.4,29.5-81.5,42.7-118.3,6.6-18.3,9.5-37,17.1-55.9,20.6-51.1,61-100.6,112.8-122.2,25.7-10.7,30.1-8.1,50.4-29.6,47.9-51,48.9-131.2,128.2-152.8,38.7-10.5,77.1-3.9,106.8,23.7,14.6,13.6,22.2,30.6,18,50.8,9.5,4.3,8.3,13.4,11.8,20.4s5.2,5.1,7.2,7.8c8.1,10.8,10.6,20.3,9,34s-10.7,2.9-16,1c-2.8-1-6.9-.7-10-1.5.7,16.5,17.7,22,28.9,30.6,13.4,10.3,20.6,21.6,31.6,33.4,12.5,13.5,31.2,21.1,45.5,33.5,81.2,70.3,72.5,205.5,10,285-3.5,4.5-9,8.8-12.4,13.6-6.2,8.9-11.1,19.8-17.7,29.3-21.6,30.9-52.3,60.4-85.8,77.7-.4,2.3.1,1.6,1.3,2.2,10,5.5,15.3,2.5,21.3,15.7s8.5,28.5-2.4,29.6c-5.1.5-8.1-10.7-10.1-8.5,2,6.9-.7,25.5-10.4,25s-5.4-6.9-7.9-9.7-10.7-5-13.7-8.3c.2,5.1-1.6,17-8.4,16-5.1-.7-4.8-5-7.1-8-2.9-3.6-9.1-3.8-13.1-5.9-6.5-3.2-12.3-8-19-11-24.4-10.9-41.1-2.4-65.9-1.2-3.2.2-6.6.5-9.5-1,1.5,7.9,3.2,27.7-7,30.6-5.8,1.6-5-8.1-8.7-10.5-2.5-1.7-4.6.1-7.4,0-.5,4.5.7,10.2,0,14.5ZM264.2,265.2h17.5c-.4,1.6-3.8,2.8-5.2,3.3-19.3,6.9-31.5-6.9-48.8-12.8s-28.6.1-41,4c-54.8,17.1-99.5,81.9-115.3,134.7-5.4,18.2-13.6,43.4-3.7,60.8,1.5-.2,1.5-1.5,1.9-2.6,1.8-5.8,1.9-14.1,7.1-18.4-3.5,17.2-7.3,38,12,47,1.3-8,2.1-16.1,6.2-23.4,4.1-4.2.9.2.9.9v24c0,3.3,3.7,10.3,6.5,12.5,16.6,13.2,31.3.1,45.5-9l-4.6,7.9-6.4,7.1c27.3,14.3,44.1-13.7,62-29l-13,23.5c9.5,5.1,21-2.4,28.4-8.5,17.4-14.4,26.2-32.9,37.2-51.8.7-1.2-.6-2.8,2.3-2.2-2.8,7.9-5.4,16-8.8,23.7-4,8.8-10.4,16.8-14,25s-4.4,13.2-7.3,19.7c-15.8,35.4-42.4,70-79.9,83.7,7.6,16.9,27,8.3,39.3,1.8,30.9-16.4,59.2-55.2,73.6-86.4,20.1-43.8,32.4-95.1,24.2-143.4,1.4,0,2,2.8,2.5,4,12.8,31.4,8.5,65.9,1,98-11.2,48.6-36.6,92.9-74.5,125.5-12.6,10.9-23.8,13.9-37.3,21.7-7.7,4.4-15.5,11.2-23.1,15.9-22,13.5-46.5,26.4-71.5,33,3.8,3.3,11.7,4.7,16.8,5.7,8.7,1.7,17.5,2,26.2,3.3-5.4,5.2-15.2,3.1-22,4.5,27.6,21.2,60.9,25.1,94,15.5-2.6,3.9-7.4,7-11.6,8.9s-15,5.1-16.9,5.1h-15.5c10.5,8.5,27,7.5,40,8l-17,6.5c21.7,8.2,44.9.5,65-8.5,1.3,1.1-12.2,13.7-15,13-.7,3.1,2.3,2,4.4,1.9,22-1.8,49-22.1,58.1-41.9,5.7,11.3-6.7,23.4-14.5,30.5,11.6,8.5,25.6,9.1,39,12,4.6,1,9.7,3.9,13.5,4.5,23.1,3.8,55.9-1.3,78.5-7.4,33-9,63.1-27.3,87-51.5-5.2,11.7-15.7,22-25.3,30.2-.9.7-3.2,2-.2,1.8,61.2-29.8,105.8-82,124.2-147.8,20.1-71.9,13.6-149.5-22.2-215.2-.4,15.6-6.7,29.8-14.5,43l-2-.5c0-3,.1-6,0-9s.8-3.7-1-3.5c-.4,14.6-23.3,41.7-36.6,44.9s1-4.7-.9-5.9c-3.7,5.6-26.2,27.3-31.8,25.9s-5.9-8.4-10.2-8.9c-1.4,1.7,1.8,3.6-1,5-8-3.7-16.6-6.5-24.4-10.6-5.5-2.9-13.3-9.7-18.6-11.4s-1.6-.3-1.5.5l12,13.5c-24.5-3.3-46.6-17.3-63.5-35-.2,5.6,4.2,11.5,6.7,16.3.4.8,1.7,2.1.3,2.7-19.2-7-32.1-22-46-36l1,8c-13.3-10.9-23.1-25.2-32.3-39.7-9-14.3-15.4-26.1-26.2-39.8-2.1-2.7-12.3-12.8-12.8-14.2s-.2-2.9-.2-4.3c5-5.2,24.8,21.4,27.4,25.1,10.9,15.3,23.4,44.4,35.1,55.9s1.6.5,1.1-1.1c-2-7.5-4.7-14.9-4.1-22.9,9.2,16,17.5,32,31.5,44.5,2.2,2,9.2,7.6,11.5,8.5s.9-1,.7-1.7c-1.9-8.1-4.6-16.3-4.2-24.8l2-.5c10.9,21.6,32.6,37.8,55,46-4.3-6-9.8-13.5-11.8-20.7s-.8-2.7,1.3-2.3c6,5.3,12.3,10.6,19,15s23.4,14.9,30,17,1.6.3,1.5-.5c-1.6-5.2-11.5-11.7-13-15s-.2-1.7.5-1.5c8,4,15.1,8.3,22,14,2.3,1.9,10.5,10.9,12,11,12-7,23.3-18.3,31.2-29.8,2.4-3.5,10-19.3,11.9-20.1s1.7.9,2,2c1.5,5.4-2.3,14.5-3.5,20,16.3-13.4,23-33.4,25-54l2.9,3.6,5.1,13.4c6.6-31.3-3.7-65.2-24-89.5-6.4-7.6-16.4-17.8-24.1-23.9-15-12.1-38.1-22.8-37-45.5-2.2-2.5-23.9-2.8-27.9-4.6s-1.3-1.4-2-2l6-3c.1-1.2-.3-2.2-.8-3.2-2-4.5-16.2-15.1-20.9-18.1s-12.1-3.4-6-7.4,11.6-.3,15.7-2.3,3.8-6.4,5.5-8.5c4-5.2,11.1-9.6,17.9-9.6s7.9,2.3,9.2,2.3,4.1-3,6.3-2.8c2-43.4-46.6-69.8-85.4-66.9-33.2,2.5-62.4,18.7-81.3,45.7s-33.1,55.5-36.2,67.8-.3,1.6.5,1.5l7.5-7c-2.4,8-8.9,14.2-13.5,21l-28.5,30.5c3.6,2.4,18.7-7.7,20-6.5-.2,2.6-3.2,4.9-5,6.5-5.8,5.3-13.2,9.1-19,14.5l21-4-2.1,3.4-9.9,5.6c10.5,4,21.2,1.2,32,0-5.3,4.9-14.9,6.1-22,7l15.5,8ZM500.7,199.2c.5-6.4-.4-12.6-3.1-18.4-3.2-6.9-11.1-12.7-13.7-18.4-2.2-5,2.7-8.3-3.7-14.2s-9.7-7.1-12-3.1l.5,5c-4.6-1.5-7.5-5.5-12.8-5.8s-16.6,6.6-17.1,12.5,12.5,7.6,16.2,7.2c6.1-.6,13.7-6.6,18.6-1.4.6,2.5-9.6,4.7-11.8,5.2-8.4,1.7-11.9,2-19.9-1.5s-5.7-5.9-12.3-3.2l39.7,15.8c11.5,5.5,22.5,10.7,31.3,20.2ZM484.7,192.2c-14.2-7.1-28.6-13.6-44-18,4.8,4.1,7.5,7.6,10.2,13.3,9.7.1,19,4.5,28.4,5.5s5.4,1,5.4-.9ZM596.8,561.2c12.2-17.1,20.9-38.5,26.7-58.8,9.4-32.6,13.4-65.9,7-99.4-8.4-43.8-32.2-85.5-71.7-107.8,2.6,14,12.1,24.8,18.5,37,36.9,69.8,42.7,153.7,19.5,229ZM34.7,495.2c6-13.6,15.5-25.4,23.8-37.6l-4.3-12.3c-3.3,0-18.1,41.3-20,47s-1.4,3.2.5,3ZM21.7,540.2c13.8-23,30.2-44.7,46.5-66.1,1.5-2-2.7-12.8-4-12.9-2.8,1.4-4.4,3.3-6.3,5.6-11.1,13.6-35.7,53-37.2,69.9s-.7,3.7,1,3.5ZM19.8,558.2c3.5,2.5,29.9-23.1,33.5-27s33.8-41.2,32.1-44c-3.7-.9-12.2-9.4-15.1-7.1l-48.5,66.6c-1.9,3.5-3,7.7-2,11.5ZM147.7,576.2c16.3-4,29.7-17.7,40.5-30,14.8-16.7,25.7-36.6,34.5-57-8.4,8.1-17.4,16.3-29.8,17.2-11,25.5-26.3,49.5-45.2,69.8ZM25.7,563.2c1.4,5.6,9.6,5.4,14.2,4.7,24.4-3.5,51.8-41.6,65.7-60.4.2-1.5-6.5-5.4-8.4-7.3-2.4-2.3-4.1-5.3-6-8-20.5,24.4-32.8,60-65.5,71ZM105.8,587.2c12.8,5.4,26.3-4.7,35.5-13,20.7-18.5,34-45,47-69-1.8-1.2-4.9-3.7-7.1-3.6-8.7.4-30.8,39.6-37.5,48.1-11.8,15-23.8,22.4-36.3,34.7-.9.9-2.2.9-1.7,2.8ZM136.6,508.4l-7.2-3.9c-5.2,2.4-12.9,2-17.6,5.3-4.4,3.1-15.9,22.7-21.1,28.9-12.1,14.6-27.7,30.1-46,36,16.7,13.6,42.5-8.3,55-20,14.1-13.1,24.9-28.3,36.5-43.5l.4-2.8ZM161.7,513.2c-5.9,3.3-12.9-1.2-17.6-.9s-13.2,17.2-16,20.8c-15.5,20.3-33.5,38.7-56.4,50.6,8.8,7.5,22.3.7,31-4,17.1-9.2,34.4-30.4,45.8-46.2,4.7-6.5,8.8-13.5,13.2-20.3ZM19.7,569.2c-1.4-.3-1.6.1-2.4,1-3.1,3.4-13.9,32.6-11.5,35,14.9-.3,27.6-9.9,40-17l-1-2.4c-5.9-4.5-16.4-7.9-21.9-12.1s-2.9-2.4-3.1-4.4ZM2,610c-3.9-3.9,1.4-18.6,2.3-23.7s1.3-3.3-.5-3c-6.5,12.1-14.9,24-19.5,37s-5.4,13.9-.9,14.7,15.2-3.5,18.9-4.7c23.9-8.2,48-22.4,69.5-35.5-8.1-7.5-12.3-7.6-22-3-9.2,4.3-17.7,11.5-27.7,15.3-4,1.6-16.9,6.2-20,3ZM-23.3,626.2c-3.8,3.3-18.9,22.3-17.9,26.4s16.6-.2,20-.9c20.1-4.1,42.9-12.3,62-20,22.8-9.2,44.2-21,65-34-8.1-5.7-13.4-6.2-22.5-2.5-28.2,11.5-56.9,35.8-88.3,42.7-11,2.4-22.8,3.8-18.2-11.7ZM-20.2,658.2c41.2-3.3,81.7-18.3,118-37.5,4.8-2.5,37.2-20.9,37.9-23.2,1.9-6.4-6.2-5.4-10.2-4.1-11.8,3.9-28.7,16.8-40.7,23.3-32.4,17.5-66.9,30.4-102.6,39.5-1.7.4-2.9-1-2.4,2ZM149.7,609.2l-11.3-6.8c-24.9,17.9-52.8,31.2-81.2,42.8l-35.5,12c45.7-5.5,89.6-22.9,128-48ZM89.5,670.5c-8.4-.6-20.1-7.2-27.5-8.1-5.9-.7-17.3,9.3-22.9,12.6-16.5,9.7-34.7,19.7-51.9,28.1-6.4,3.1-18.5,6.7-23.7,10.3-1.2.8-2,1.2-1.6,2.9,26.8,4.2,50.6-3.3,74.7-13.8,7.2-3.2,23.4-13.1,29.8-14.2s1.6-.3,1.5.5c-7.3,7.5-15.7,13.9-24.7,19.3-3.7,2.2-8.6,3.7-12,6s-1.8-.1-1.3,2.2c18,.6,35.4,0,52.5-6,12-4.2,22.5-11.3,33.5-17l-.6-2.1c-10.2-4.1-20.3-10.9-25.7-20.6ZM38.7,667.2c-13.7,3.1-27.9,2.4-41.7,3.7l-48.3,42.2,64-30.5,26-15.5ZM500.7,737.2c-1.4-8.9-3.8-16.2-12.8-19.7-8-3.1-18.7-5.4-27.2-4.3,3.6,3.7,9.8,4.3,14.7,6.8,4.9,2.6,9.2,6.1,12.3,10.7l13,6.5ZM306.7,773.2v-14.5c0-.6-2.3-7.1-2.8-8.2-4-8.5-13.9-10.8-20.7-16.3-1.3-1.1-8.2-7.3-6.5-9,2.1-.3,3.8.2,5.7.8,3.3,1,22.5,12.8,24.8,15.2s4,6.9,5.4,7.5,6.3-.9,9.3-.2,4.3,3.8,6.2,5.7c1.7-7.5-5.1-18.8-11-23-7-4.9-23.7-5.1-33.3-7.7-8.2-2.3-14.8-5.6-21.8-10.3-6.5,1.9-11.9,6.8-18.5,9.5s-20.2,6.6-28.2,5.3c-6.6-1.1-8-6.8-15.3-2.8s-7.9,14.7-5.9,14.1c5.1-4.7,9.8-1.9,15-2s19.6-2.5,25.6-.6,12.2,16,17.9,21.1c5.8,5.3,8.2,4,13.8,12.1.6.9-.2,1.8,2.2,1.3.5-6.1,1.9-11.9.6-18.1-1.9-9.2-15.3-16.5-14.1-26.9,6.7,8.4,16.6,13.5,23.5,21.5,3.2,3.7,7.6,12.4,11.4,14.6s6.9.5,10.5,3.5,2.4,4,3.8,6.2-.1,1.8,2.2,1.3ZM483.7,753.2c.7-9.7-.2-18.9-8.1-25.4s-24.1-10.8-31.4-10.6-4.3.9-6.5,1.1l14,6.5c4.3,5.5,11.5,18.3,18.1,21s3.2-1.1,6.3.6,4,6.2,7.6,6.9ZM452.7,752.2c-.6-9.9-1.2-19.5-10.3-25.2s-14.4-6.8-17.2-6.8c-5.1,0-15.4,5.5-20.5,7.5,11.6,1.3,21.5,11.7,31.3,15.7,6.2,2.5,12.4,1.5,16.7,8.8Z" />
                    <path fill="white" d="M277.7,341.2c-4.3-5-7-11.3-10.8-16.7-11.3-16.3-28.2-30.6-48-35l-30.2-3.3c33.4-12.3,67.5,3.3,83.2,34.3,3.1,6.1,6.3,13.8,5.8,20.7Z" />
                    <path fill="white" d="M401.7,149.1c-6.5.9-7.3-6.6-11.9-10.4-5.3-4.4-10.7-5.8-17.3-3.3s-6.8,6.7-10.2,6.7-11.8-4.8-14.3-5.7-2.7.5-2.2-2.3l12.5,1.6c7.9-10.6,20.9-14.2,32.8-7.5s13.6,13,10.6,20.7Z" />
                    <path fill="white" d="M316.7,183.2h-4c-1.6,1.1,13.4,7.3,15,7,1.9,2-6.1,3.9-6,6l18,2-5,6,18.5-3-5.5,6,17-2.5c-3.1,2.3-8.3,4.2-11.9,5.1s-14.2,3.5-11-2.5c-5.2.1-9.8,2.2-15,0l5-6c-4.9-.5-14.2-1.3-18-4.5-2.6-2.2,3-2.9,4-4-5-3.6-11.8-7.8-14-14-1-2.6-3.3-11.2,0-12.6.8,8.2,7.3,12.3,13,17Z" />
                    <path fill="white" d="M401.7,127.2c-6.5-6.2-11.8-11.1-21.5-11.1s-7.5,2.2-11.5,1.6c10-9.4,30.2-4.7,33,9.5Z" />
                    <path fill="white" d="M348.7,139.2l-12.5,2h-6.5c.3-1.5,4.3-2.8,5.6-2.9,4.2-.6,9.4-.2,13.4,1Z" />
                  </svg>
                </div>

                {/* Bullet Points */}
                <div className="space-y-6 flex-1">
                  <div className="flex gap-4 items-start">
                    <ChevronRight className="w-6 h-6 text-kereru-neon shrink-0 mt-1" />
                    <p className="text-white text-base leading-relaxed">
                      <strong>True Sovereign Reasoning:</strong> Understands New Zealand law, regulations, and context at the reasoning level
                    </p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <ChevronRight className="w-6 h-6 text-kereru-neon shrink-0 mt-1" />
                    <p className="text-white text-base leading-relaxed">
                      <strong>30-40% More Efficient:</strong> Eliminates massive system prompts by thinking natively in Aotearoa context
                    </p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <ChevronRight className="w-6 h-6 text-kereru-neon shrink-0 mt-1" />
                    <p className="text-white text-base leading-relaxed">
                      <strong>Compliance-Ready:</strong> Built for New Zealand legal frameworks with auditable reasoning
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="bg-kereru-dark/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-6">
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Request Early Access</h3>
              <p className="text-slate-400 text-sm">Be among the first to experience sovereign AI reasoning</p>

              {formSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="text-kereru-neon text-5xl mb-4">✓</div>
                  <p className="text-white text-lg font-bold">Your form was submitted successfully</p>
                  <p className="text-slate-400">Kererū will get back to you to discuss your requirements</p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-white text-sm font-bold mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      className="w-full px-4 py-3 bg-kereru-panel/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-kereru-neon focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-bold mb-2">Work Email *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 bg-kereru-panel/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-kereru-neon focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-bold mb-2">Message (optional)</label>
                    <textarea
                      name="message"
                      placeholder="Tell us about your use case..."
                      rows={3}
                      className="w-full px-4 py-3 bg-kereru-panel/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-kereru-neon focus:outline-none transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-kereru-green hover:bg-kereru-neon text-white rounded-lg font-bold uppercase text-sm tracking-wider shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    Request Access <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12 text-left">
            <div className="space-y-6">
              <BrandTag label="WHAT YOU CAN DO" icon={Sliders} />
              <h3 className="text-3xl font-bold text-white uppercase tracking-tight">Kererū Models in Action</h3>
              <div className="grid gap-6">
                {[
                  { title: "Sector Specialization", text: "Fine-tune models for sector-specific applications (public sector, health, finance, research, industry)." },
                  { title: "Governance & Safety", text: "Apply governance controls: lineage, safety testing, access controls, and audit-ready artefact management." },
                  { title: "Low-Latency Edge", text: "Run low-latency inference near users and operational systems where response time matters." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group p-6 bg-kereru-panel/40 rounded-2xl border border-white/5 hover:bg-white/5 transition-all">
                    <div className="mt-1 shrink-0 p-2 bg-kereru-neon/10 rounded-lg group-hover:bg-kereru-neon/20 transition-colors h-fit">
                      <CheckCircle2 className="w-5 h-5 text-kereru-neon" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-kereru-neon to-blue-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative glass-panel rounded-[2.5rem] border border-white/10 p-10 overflow-hidden shadow-2xl flex flex-col items-center justify-center text-center">
                <Sparkles className="w-16 h-16 text-kereru-neon mb-6" />
                <h4 className="text-white text-2xl font-black uppercase tracking-tighter mb-3">Core Foundations</h4>
                <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
                  Building models that understand our land, our culture, and our people, while remaining compatible with global standards.
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-left">
              <h4 className="text-white font-bold text-lg uppercase tracking-tight mb-4 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-kereru-neon" /> Strategic Flexibility
              </h4>
              <p className="text-slate-400 leading-relaxed text-sm">
                Kererū’s approach avoids lock-in to a single model provider. The platform is designed to support model flexibility over time — so organisations can adopt better-performing models as they emerge without rebuilding the platform.
              </p>
            </div>
          </div>
        </div>

        <CalloutBox className="text-center">
          <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-6">Build your proprietary edge.</h3>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Create custom models that are truly yours, trained on your data, within your jurisdiction, for your mission.
          </p>
        </CalloutBox>
      </div>
    );
  };

  const WhatWeOfferPage = () => (
    <div className="container mx-auto px-6 pt-48 pb-24 space-y-32">
      {/* Integrated Offerings Section */}
      <section>
        <div className="text-center mb-16">
          <BrandTag label="PLATFORM SOLUTIONS" icon={Briefcase} centered={true} />
          <h2 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">What We Offer</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Kereru.ai delivers a high-efficiency AI platform with comprehensive enterprise enablement and 99.9% uptime guarantees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            icon={Settings}
            title="Managed AI Solutions"
            description="Ready-to-deploy AI applications for document analysis, ESG screening, and advisory support. Includes full Enterprise Enablement: SOC 2 and ISO 27001 compliance, model governance, and risk frameworks."
            benefits="Accelerate delivery"
          />
          <ServiceCard
            icon={Box}
            title="Dedicated Infrastructure"
            description="Single-tenant hosting on specialized accelerators with 70% power reduction. Built for highly secure workloads with integrated model governance and guaranteed enterprise SLAs."
            benefits="Maximum Control"
          />
          <ServiceCard
            icon={Cloud}
            title="AI Cloud Services"
            description="High-performance Inference-as-a-Service with sub-100ms latency. Managed under enterprise compliance standards with risk frameworks and 99.9% uptime guarantees."
            benefits="On-Demand Power"
          />
        </div>
      </section>

      {/* Compliance / Support Footer (Optional visual aid) */}
      <CalloutBox className="text-center py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-white text-2xl font-bold uppercase tracking-tight mb-4">Enterprise Standard Across All Tiers</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            All Kererū.ai offerings include support for enterprise compliance (SOC 2, ISO 27001),
            sophisticated model governance, and robust risk frameworks. We stand behind our
            infrastructure with Enterprise SLAs and 99.9% uptime guarantees as standard.
          </p>
          <div className="flex flex-wrap justify-center gap-6 opacity-60">
            {['SOC 2', 'ISO 27001', 'NZ PRIVACY ACT', '99.9% UPTIME'].map(cert => (
              <span key={cert} className="text-[10px] font-black uppercase tracking-[0.3em] text-white border border-white/20 px-4 py-1.5 rounded-full">{cert}</span>
            ))}
          </div>
        </div>
      </CalloutBox>
    </div>
  );

  const ConsultingPage = () => (
    <div className="container mx-auto px-6 pt-48 pb-24 space-y-32">
      {/* Consulting Services Section */}
      <section>
        <div className="text-center mb-16">
          <BrandTag label="PROFESSIONAL SERVICES" icon={PenTool} centered={true} />
          <h2 className="text-white text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter">Consulting Services</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Expert advisory and engineering to help you design, deploy, and scale sovereign AI capability.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ConsultingItem
            icon={Layers}
            title="Solution Architecture"
            description="Strategic design of AI systems tailored to New Zealand's specific regulatory and operational constraints."
          />
          <ConsultingItem
            icon={Building2}
            title="Infrastructure Design & Installation"
            description="Custom design and physical/virtual deployment of AI Factory components within your secure environment."
          />
          <ConsultingItem
            icon={Cpu}
            title="Enterprise Model Training"
            description="High-performance custom fine-tuning and proprietary model training services on sovereign infrastructure."
          />
          <ConsultingItem
            icon={Network}
            title="Enterprise Model As a Service"
            description="End-to-end lifecycle management and dedicated hosting for your mission-specific proprietary models."
          />
          <ConsultingItem
            icon={GraduationCap}
            title="Training & Enablement"
            description="Comprehensive upskilling for your teams on AI operations, sovereign data handling, and local governance."
          />
          <div className="p-6 bg-kereru-neon/5 border border-kereru-neon/20 rounded-2xl flex flex-col justify-center items-center text-center group">
            <h4 className="text-white font-bold text-sm uppercase mb-4">Need custom support?</h4>
            <button onClick={() => navigate('contact')} className="text-kereru-neon text-xs font-black uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
              Talk to an expert <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Compliance / Support Footer */}
      <CalloutBox className="text-center py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-white text-2xl font-bold uppercase tracking-tight mb-4">Enterprise Standard Across All Tiers</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            All Kererū.ai offerings include support for enterprise compliance (SOC 2, ISO 27001),
            sophisticated model governance, and robust risk frameworks. We stand behind our
            infrastructure with Enterprise SLAs and 99.9% uptime guarantees as standard.
          </p>
          <div className="flex flex-wrap justify-center gap-6 opacity-60">
            {['SOC 2', 'ISO 27001', 'NZ PRIVACY ACT', '99.9% UPTIME'].map(cert => (
              <span key={cert} className="text-[10px] font-black uppercase tracking-[0.3em] text-white border border-white/20 px-4 py-1.5 rounded-full">{cert}</span>
            ))}
          </div>
        </div>
      </CalloutBox>
    </div>
  );

  const ContactPage = () => (
    <div className="container mx-auto px-6 pt-48 pb-24 text-center space-y-12">
      <SectionHeading
        tag="CONTACT US"
        title="Talk to Kererū"
        centered={true}
        description="Let's build sovereign AI capacity without scaling environmental impact."
      />
      <div className="max-w-xl mx-auto space-y-6">
        <div className="p-12 bg-kereru-panel border border-white/10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-kereru-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <button
            onClick={() => window.location.href = 'mailto:hello@kereru.ai'}
            className="btn-8020 w-full py-8 bg-white text-kereru-dark rounded-full font-black text-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-3 uppercase tracking-tighter"
          >
            Get Started <ArrowRight />
          </button>
          <p className="mt-8 text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
            Across all of New Zealand
          </p>
        </div>

        {/* Phone Number */}
        <div className="p-8 bg-kereru-panel/40 border border-white/10 rounded-[2.5rem] relative overflow-hidden hover:bg-kereru-panel/60 hover:border-kereru-neon/30 transition-all">
          <a
            href="tel:+6492188771"
            className="flex items-center justify-center gap-4 text-white hover:text-kereru-neon transition-colors group"
          >
            <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-lg tracking-wide">09 2188 771</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-200 selection:bg-kereru-neon selection:text-kereru-dark overflow-x-hidden">

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-kereru-dark/90 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('home')}>
            <Logo className="w-10 h-10 transition-transform group-hover:scale-105" variant="white" />
            <span className="font-black text-xl tracking-tighter text-white uppercase">
              KERERU<span className="text-kereru-neon">.AI</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[11px] font-extrabold uppercase tracking-widest">
            <div className="relative group/nav" onMouseEnter={() => setCompanyDropdownOpen(true)} onMouseLeave={() => setCompanyDropdownOpen(false)}>
              <button className="flex items-center gap-1 text-slate-400 hover:text-white transition py-2">
                Company <ChevronDown className="w-4 h-4 group-hover/nav:rotate-180 transition-transform" />
              </button>
              {companyDropdownOpen && (
                <div className="absolute top-full left-0 mt-0 w-56 bg-kereru-panel border border-white/10 rounded-xl shadow-2xl py-3 animate-in fade-in slide-in-from-top-2">
                  <button onClick={() => navigate('about')} className="w-full text-left px-4 py-2 hover:bg-white/5 hover:text-kereru-neon transition flex items-center gap-2 group">
                    <Users className="w-4 h-4 text-slate-500 group-hover:text-kereru-neon" /> About Us
                  </button>
                  <button onClick={() => navigate('sovereignty')} className="w-full text-left px-4 py-2 hover:bg-white/5 hover:text-kereru-neon transition flex items-center gap-2 group">
                    <Globe className="w-4 h-4 text-slate-500 group-hover:text-kereru-neon" /> Data Sovereignty
                  </button>
                  <button onClick={() => navigate('governance')} className="w-full text-left px-4 py-2 hover:bg-white/5 hover:text-kereru-neon transition flex items-center gap-2 group">
                    <ShieldCheck className="w-4 h-4 text-slate-500 group-hover:text-kereru-neon" /> Governance & Control
                  </button>
                </div>
              )}
            </div>
            <div className="relative group/nav" onMouseEnter={() => setFactoryDropdownOpen(true)} onMouseLeave={() => setFactoryDropdownOpen(false)}>
              <button className="flex items-center gap-1 text-slate-400 hover:text-white transition py-2">
                What We Offer <ChevronDown className="w-4 h-4 group-hover/nav:rotate-180 transition-transform" />
              </button>
              {factoryDropdownOpen && (
                <div className="absolute top-full left-0 mt-0 w-56 bg-kereru-panel border border-white/10 rounded-xl shadow-2xl py-3 animate-in fade-in slide-in-from-top-2">
                  <button onClick={() => navigate('infrastructure')} className="w-full text-left px-4 py-2 hover:bg-white/5 hover:text-kereru-neon transition flex items-center gap-2 group">
                    <Server className="w-4 h-4 text-slate-500 group-hover:text-kereru-neon" /> AI Factory
                  </button>
                  <button onClick={() => navigate('what-we-offer')} className="w-full text-left px-4 py-2 hover:bg-white/5 hover:text-kereru-neon transition flex items-center gap-2 group">
                    <Briefcase className="w-4 h-4 text-slate-500 group-hover:text-kereru-neon" /> Infrastructure Services
                  </button>
                  <button onClick={() => navigate('consulting')} className="w-full text-left px-4 py-2 hover:bg-white/5 hover:text-kereru-neon transition flex items-center gap-2 group">
                    <PenTool className="w-4 h-4 text-slate-500 group-hover:text-kereru-neon" /> Consulting Services
                  </button>
                </div>
              )}
            </div>

            <div className="relative group/nav" onMouseEnter={() => setModelsDropdownOpen(true)} onMouseLeave={() => setModelsDropdownOpen(false)}>
              <button className="flex items-center gap-1 text-slate-400 hover:text-white transition py-2">
                Kererū Models <ChevronDown className="w-4 h-4 group-hover/nav:rotate-180 transition-transform" />
              </button>
              {modelsDropdownOpen && (
                <div className="absolute top-full left-0 mt-0 w-56 bg-kereru-panel border border-white/10 rounded-xl shadow-2xl py-3 animate-in fade-in slide-in-from-top-2">
                  <button onClick={() => navigate('our-models')} className="w-full text-left px-4 py-2 hover:bg-white/5 hover:text-kereru-neon transition flex items-center gap-2 group">
                    <Network className="w-4 h-4 text-slate-500 group-hover:text-kereru-neon" /> Our Models
                  </button>
                </div>
              )}
            </div>


            <button onClick={() => navigate('contact')} className="btn-8020 px-7 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-full transition backdrop-blur-sm">
              Contact Us
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-kereru-panel border-t border-white/10 shadow-xl animate-in slide-in-from-top-4 fade-in">
            <div className="container mx-auto px-6 py-6 space-y-2 text-[11px] font-extrabold uppercase tracking-widest">
              <div className="space-y-1">
                <div className="text-xs text-slate-500 px-4 py-2">Company</div>
                <button onClick={() => navigate('about')} className="w-full text-left px-4 py-3 hover:bg-white/5 hover:text-kereru-neon transition flex items-center gap-2">
                  <Users className="w-4 h-4" /> About Us
                </button>
                <button onClick={() => navigate('sovereignty')} className="w-full text-left px-4 py-3 hover:bg-white/5 hover:text-kereru-neon transition flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Data Sovereignty
                </button>
                <button onClick={() => navigate('governance')} className="w-full text-left px-4 py-3 hover:bg-white/5 hover:text-kereru-neon transition flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Governance & Control
                </button>
              </div>

              <div className="space-y-1 pt-2">
                <div className="text-xs text-slate-500 px-4 py-2">What We Offer</div>
                <button onClick={() => navigate('infrastructure')} className="w-full text-left px-4 py-3 hover:bg-white/5 hover:text-kereru-neon transition flex items-center gap-2">
                  <Server className="w-4 h-4" /> AI Factory
                </button>
                <button onClick={() => navigate('what-we-offer')} className="w-full text-left px-4 py-3 hover:bg-white/5 hover:text-kereru-neon transition flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Infrastructure Services
                </button>
              </div>

              <div className="space-y-1 pt-2">
                <div className="text-xs text-slate-500 px-4 py-2">Kererū Models</div>
                <button onClick={() => navigate('our-models')} className="w-full text-left px-4 py-3 hover:bg-white/5 hover:text-kereru-neon transition flex items-center gap-2">
                  <Network className="w-4 h-4" /> Our Models
                </button>
              </div>



              <div className="pt-4">
                <button onClick={() => navigate('contact')} className="w-full px-7 py-3 bg-kereru-green text-white rounded-full transition shadow-lg shadow-kereru-green/20">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">
        {activePage === 'home' && <HomePage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'sovereignty' && <SovereigntyPage />}
        {activePage === 'governance' && <GovernancePage />}
        {activePage === 'infrastructure' && <InfrastructurePage />}
        {activePage === 'our-models' && <OurModelsPage />}
        {activePage === 'project-kereru' && <ProjectKereruPage />}
        {activePage === 'what-we-offer' && <WhatWeOfferPage />}
        {activePage === 'consulting' && <ConsultingPage />}
        {activePage === 'contact' && <ContactPage />}
      </main>

      <footer className="bg-kereru-dark pt-24 pb-8 border-t border-white/5 text-slate-500">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16 text-left">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Logo className="w-8 h-8" variant="white" />
                <span className="font-black text-lg text-white uppercase tracking-tighter">KERERU.AI</span>
              </div>
              <p className="text-xs leading-relaxed uppercase tracking-widest font-bold">
                Sovereign Intelligence. <br /> Locally Controlled.
              </p>
            </div>
            <div>
              <h4 className="font-black text-white mb-6 uppercase text-[10px] tracking-[0.2em]">Company</h4>
              <ul className="space-y-3 text-[11px] font-extrabold uppercase tracking-widest">
                <li><button onClick={() => navigate('about')} className="hover:text-kereru-neon transition">About Us</button></li>
                <li><button onClick={() => navigate('sovereignty')} className="hover:text-kereru-neon transition">Data Sovereignty</button></li>
                <li><button onClick={() => navigate('governance')} className="hover:text-kereru-neon transition">Governance & Control</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-white mb-6 uppercase text-[10px] tracking-[0.2em]">What We Offer</h4>
              <ul className="space-y-3 text-[11px] font-extrabold uppercase tracking-widest">
                <li><button onClick={() => navigate('infrastructure')} className="hover:text-kereru-neon transition">AI Factory</button></li>
                <li><button onClick={() => navigate('what-we-offer')} className="hover:text-kereru-neon transition">Infrastructure Services</button></li>
                <li><button onClick={() => navigate('consulting')} className="hover:text-kereru-neon transition">Consulting Services</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-white mb-6 uppercase text-[10px] tracking-[0.2em]">Kererū Models</h4>
              <ul className="space-y-3 text-[11px] font-extrabold uppercase tracking-widest">
                <li><button onClick={() => navigate('our-models')} className="hover:text-kereru-neon transition">Our Models</button></li>
                <li><button onClick={() => navigate('project-kereru')} className="hover:text-kereru-neon transition">Project Kererū</button></li>
                <li><a href="mailto:hello@kereru.ai" className="hover:text-kereru-neon transition lowercase">hello@kereru.ai</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.3em] text-slate-700 font-black">
            <p>&copy; {new Date().getFullYear()} Kereru.ai</p>
            <p>Sovereign National Infrastructure</p>
          </div>
        </div>
      </footer>

      {/* Floating LinkedIn Banner (Home Page Only) */}
      {linkedInBannerVisible && activePage === 'home' && (
        <div className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ${linkedInBannerVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          <div className="bg-kereru-dark/95 backdrop-blur-md border-t border-white/10 shadow-2xl">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
              <a
                href="https://www.linkedin.com/company/kereruai/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white hover:text-kereru-neon transition-colors group"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="font-bold text-sm uppercase tracking-wider">Connect on LinkedIn</span>
              </a>
              <button
                onClick={dismissLinkedInBanner}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Dismiss LinkedIn banner"
              >
                <X className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </div>
      )}

      <KereruChat isOpen={kereruChatOpen} onClose={() => setKereruChatOpen(false)} />
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Lock, Globe, Server, ChevronRight, CheckCircle2, ArrowRight, Activity, Cpu, Network, Zap, Users, Leaf, Banknote, Sliders } from 'lucide-react';
import { Logo } from './Logo';
import { ChatWidget } from './ChatWidget';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-200 selection:bg-kereru-neon selection:text-kereru-dark overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-kereru-dark/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollTo('home')}>
            <Logo className="w-10 h-10 transition-transform group-hover:scale-105" variant="white" />
            <span className="font-bold text-xl tracking-tight text-white">
              KERERU<span className="text-kereru-neon">.AI</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button onClick={() => scrollTo('mission')} className="hover:text-white transition">Mission</button>
            <button onClick={() => scrollTo('benefits')} className="hover:text-white transition">Benefits</button>
            <button onClick={() => scrollTo('infrastructure')} className="hover:text-white transition">Infrastructure</button>
            <Link to="/chat" className="px-5 py-2.5 bg-kereru-green hover:bg-kereru-neon text-white rounded-lg transition">
              Try Kereru
            </Link>
            <button onClick={() => scrollTo('contact')} className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-lg transition backdrop-blur-sm">
              Contact Us
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-kereru-panel border-b border-white/10 p-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-5">
            <button onClick={() => scrollTo('mission')} className="text-left py-2 hover:text-kereru-neon text-slate-300">Mission</button>
            <button onClick={() => scrollTo('benefits')} className="text-left py-2 hover:text-kereru-neon text-slate-300">Benefits</button>
            <button onClick={() => scrollTo('infrastructure')} className="text-left py-2 hover:text-kereru-neon text-slate-300">Infrastructure</button>
            <Link to="/chat" className="bg-kereru-green text-white py-3 rounded-lg text-center font-medium">Try Kereru</Link>
            <button onClick={() => scrollTo('contact')} className="bg-white/10 text-white py-3 rounded-lg text-center font-medium">Contact Us</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 px-6 min-h-screen flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-kereru-dark via-kereru-dark/90 to-kereru-dark"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-kereru-green/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-kereru-blue/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

        <div className="container mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kereru-neon opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-kereru-neon"></span>
              </span>
              <span className="text-xs font-semibold tracking-wide text-slate-300 uppercase">Sovereign Intelligence Online</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white">
              AI Sovereignty <br/>
              <span className="gradient-text">for Aotearoa.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
              We deliver secure, responsible, and locally-controlled AI infrastructure. 
              Proudly partnering with <span className="text-white font-medium">SCX.AI</span> to bring world-class sovereign capability to New Zealand shores.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/chat" className="px-8 py-4 bg-kereru-green hover:bg-kereru-neon text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-kereru-green/20 flex items-center justify-center gap-2 group">
                Try Kereru
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button onClick={() => scrollTo('infrastructure')} className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-semibold transition flex items-center justify-center backdrop-blur-sm">
                View Infrastructure
              </button>
            </div>

            <div className="pt-8 border-t border-white/10 flex items-center gap-8 text-sm text-slate-500">
               <div>
                 <span className="block text-xl font-bold text-white">NZ Entity</span>
                 <span>NZ Owned</span>
               </div>
               <div className="h-8 w-px bg-white/10"></div>
               <div>
                 <span className="block text-xl font-bold text-white">Strategic Partner</span>
                 <span>SCX.AI</span>
               </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-kereru-neon/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="glass-panel p-8 rounded-3xl relative border border-white/10 shadow-2xl">
               <div className="flex items-center justify-between mb-8">
                 <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                 </div>
                 <div className="text-xs text-slate-500 font-mono"></div>
               </div>
               
               <div className="space-y-6">
                 <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="p-3 rounded-lg bg-kereru-blue/20 text-kereru-blue">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Compute Location</div>
                      <div className="font-semibold text-white">Across NZ</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="p-3 rounded-lg bg-kereru-green/20 text-kereru-neon">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Data Sovereignty</div>
                      <div className="font-semibold text-white">Protected (NZ Privacy Act)</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400">
                      <Network className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Model Source</div>
                      <div className="font-semibold text-white">SCX.AI Strategic Core</div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Partnership Banner */}
      <div className="bg-kereru-panel border-y border-white/10 py-12">
        <div className="container mx-auto px-6">
          <p className="text-center text-slate-400 text-sm font-medium uppercase tracking-widest mb-8">Strategic Alliance</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 opacity-80 hover:opacity-100 transition duration-500">
            <div className="flex items-center gap-3">
              <Logo className="w-12 h-12" variant="white" />
              <span className="text-2xl font-bold tracking-tight text-white">KERERU.AI</span>
            </div>
            <div className="hidden md:block h-8 w-px bg-white/20"></div>
            <div className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-blue-500">SCX</span>.AI
              <span className="text-xs ml-2 py-1 px-2 bg-blue-500/20 text-blue-400 rounded border border-blue-500/30 font-normal">Southern Cross AI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 relative overflow-hidden bg-kereru-dark">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Sovereign by Design</h2>
            <p className="text-slate-400 text-lg">
              Our infrastructure is built to protect your data, your budget, and our environment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Benefit 1: Buy with NZD */}
            <div className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-kereru-green/50 hover:to-kereru-neon/50 transition-all duration-500">
              <div className="bg-kereru-panel h-full rounded-xl p-8 relative overflow-hidden flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-kereru-green/20 text-kereru-neon flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Banknote className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Buy with NZD</h3>
                <p className="text-slate-400 leading-relaxed">
                  Eliminate foreign exchange volatility. All services are billed in New Zealand Dollars, ensuring price stability and keeping capital within our local economy.
                </p>
              </div>
            </div>

            {/* Benefit 2: Data Sovereignty Controls */}
            <div className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-blue-500/50 hover:to-blue-400/50 transition-all duration-500">
              <div className="bg-kereru-panel h-full rounded-xl p-8 relative overflow-hidden flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Sliders className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Sovereign Controls</h3>
                <p className="text-slate-400 leading-relaxed">
                  Granular controls that protect and maintain strict sovereignty over your data. Our platform ensures you decide exactly where and how your data moves.
                </p>
              </div>
            </div>

            {/* Benefit 3: Sustainability */}
            <div className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-emerald-400/50 hover:to-teal-500/50 transition-all duration-500">
              <div className="bg-kereru-panel h-full rounded-xl p-8 relative overflow-hidden flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">10X Efficiency</h3>
                <p className="text-slate-400 leading-relaxed">
                  Leading the way in sustainable AI. Our infrastructure achieves 10X less power and water consumption (PUE / WUE) compared to standard training clusters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Infrastructure */}
      <section id="infrastructure" className="py-24 bg-kereru-panel/50 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Sovereign Infrastructure</h2>
            <p className="text-slate-400 text-lg">
              We provide the physical and digital infrastructure required to run AI workloads securely within New Zealand borders.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Server className="w-8 h-8 text-kereru-neon" />,
                title: "Local Compute",
                desc: "High-performance GPU clusters located in secure NZ data centers, ensuring your data never leaves the country.",
              },
              {
                icon: <Lock className="w-8 h-8 text-blue-400" />,
                title: "Data Residency",
                desc: "Full compliance with NZ data residency requirements. We guarantee your data is processed and stored locally.",
              },
              {
                icon: <Activity className="w-8 h-8 text-purple-400" />,
                title: "Ethical AI",
                desc: "LLM fine-tuned to respect New Zealand & Maori Data Sovereignty principles and New Zealand cultural context.",
              }
            ].map((feature, idx) => (
              <div key={idx} className="group relative p-8 rounded-2xl bg-kereru-dark border border-white/10 hover:border-kereru-neon/50 transition-colors duration-300 overflow-hidden flex flex-col h-full">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed mb-4">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantage / USP Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-kereru-green/10 to-transparent opacity-30 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-kereru-neon font-mono text-sm tracking-wider uppercase mb-2 block">The Kereru Difference</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why New Zealand chooses Kereru.</h2>
            <p className="text-slate-400 text-lg">
              We bridge the gap between global AI capability and local sovereignty, offering a unique value proposition for Aotearoa / New Zealand's innovators and guardians.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* USP 1 */}
            <div className="group p-1 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-kereru-neon/50 hover:to-kereru-blue/50 transition-all duration-500">
              <div className="bg-kereru-dark h-full rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Shield className="w-24 h-24 text-white" />
                </div>
                <div className="w-12 h-12 rounded-lg bg-kereru-green/20 text-kereru-neon flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Jurisdictional Safety</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Your data remains subject only to New Zealand law. We provide guaranteed immunity from foreign data access requests.
                </p>
              </div>
            </div>

            {/* USP 2 */}
            <div className="group p-1 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-blue-500/50 hover:to-purple-500/50 transition-all duration-500">
              <div className="bg-kereru-dark h-full rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Globe className="w-24 h-24 text-white" />
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Global Capability</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Through our strategic SCX.AI partnership, we deploy frontier models instantly, ensuring NZ never falls behind the global AI innovation curve.
                </p>
              </div>
            </div>

            {/* USP 3 */}
            <div className="group p-1 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-amber-500/50 hover:to-red-500/50 transition-all duration-500">
              <div className="bg-kereru-dark h-full rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Users className="w-24 h-24 text-white" />
                </div>
                <div className="w-12 h-12 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Cultural Integrity</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Our models are fine-tuned to understand Aotearoa's unique context, protecting Māori Data Sovereignty and reflecting Kiwi values.
                </p>
              </div>
            </div>

            {/* USP 4 */}
            <div className="group p-1 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-emerald-400/50 hover:to-teal-500/50 transition-all duration-500">
              <div className="bg-kereru-dark h-full rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Zap className="w-24 h-24 text-white" />
                </div>
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Low Latency</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Local inference eliminates international bandwidth latency, delivering snappy, real-time AI experiences for your users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="bg-gradient-to-br from-kereru-panel to-kereru-dark border border-white/10 rounded-3xl p-8 md:p-20 text-center relative overflow-hidden shadow-2xl">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-kereru-green/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-kereru-blue/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white">Secure your AI future.</h2>
              <p className="text-slate-400 text-lg">
                Partner with New Zealand's sovereign AI infrastructure provider today. <br className="hidden md:block"/>
                Backed by SCX.AI technology.
              </p>
              
              <form className="max-w-md mx-auto space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Enter your work email" 
                    className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-kereru-neon focus:ring-1 focus:ring-kereru-neon transition"
                  />
                </div>
                <button className="w-full px-8 py-4 bg-white text-kereru-dark rounded-xl font-bold hover:bg-slate-200 transition shadow-lg flex justify-center items-center gap-2">
                  Request Consultation <ChevronRight className="w-4 h-4" />
                </button>
              </form>
              <p className="text-xs text-slate-500">
                By contacting us, you agree to our Privacy Policy. Your data is stored securely in NZ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-kereru-dark pt-16 pb-8 border-t border-white/5 text-slate-400">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1 space-y-4">
               <div className="flex items-center gap-2">
                <Logo className="w-8 h-8" variant="white" />
                <span className="font-bold text-lg text-white">KERERU.AI</span>
               </div>
               <p className="text-sm">
                 Sovereign & Responsible AI for Aotearoa / New Zealand.
               </p>
               <div className="pt-2 flex flex-col gap-1 text-xs">
                 <span>Strategic Partner: <strong>Southern Cross AI</strong></span>
                 <span>Ownership: <strong>Majority NZ Owned</strong></span>
               </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollTo('mission')} className="hover:text-kereru-neon transition">Mission</button></li>
                <li><button onClick={() => scrollTo('benefits')} className="hover:text-kereru-neon transition">Benefits</button></li>
                <li><button onClick={() => scrollTo('infrastructure')} className="hover:text-kereru-neon transition">Infrastructure</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-kereru-neon transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-kereru-neon transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-kereru-neon transition">Data Sovereignty Statement</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://www.linkedin.com/company/kereruai/" className="hover:text-kereru-neon transition">LinkedIn</a></li>
                <li><a href="mailto:hello@kereru.ai" className="hover:text-kereru-neon transition">hello@kereru.ai</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {new Date().getFullYear()} Kereru.ai. All rights reserved.</p>
            <p className="mt-2 md:mt-0 flex items-center gap-1 opacity-60 hover:opacity-100 transition">
              Made with <span className="text-red-500">♥</span> in Aotearoa
            </p>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
};

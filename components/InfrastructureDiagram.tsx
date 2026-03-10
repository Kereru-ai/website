import React from 'react';

export const InfrastructureDiagram: React.FC = () => {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto">
      <defs>
        <linearGradient id="darkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0.8"/>
        </linearGradient>
        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#166534" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#064e3b" stopOpacity="0.6"/>
        </linearGradient>
      </defs>

      {/* Front Door Section */}
      <g>
        <rect x="20" y="20" width="340" height="120" rx="12" fill="url(#darkGrad)" stroke="#22c55e" strokeWidth="2"/>
        <text x="190" y="45" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">FRONT DOOR</text>
        
        {/* Service Catalog */}
        <rect x="35" y="55" width="90" height="70" rx="8" fill="#0F172A" stroke="#334155" strokeWidth="1.5"/>
        <text x="80" y="85" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">SERVICE</text>
        <text x="80" y="98" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">CATALOG</text>
        
        {/* Identity Enforced */}
        <rect x="135" y="55" width="110" height="70" rx="8" fill="#0F172A" stroke="#334155" strokeWidth="1.5"/>
        <text x="190" y="80" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontWeight="bold">IDENTITY ENFORCED</text>
        <text x="190" y="93" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontWeight="bold">ACCESS PATHWAY</text>
        
        {/* Billing/Session Logging */}
        <rect x="255" y="55" width="95" height="70" rx="8" fill="#0F172A" stroke="#334155" strokeWidth="1.5"/>
        <text x="302" y="80" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontWeight="bold">BILLING/SESSION</text>
        <text x="302" y="93" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontWeight="bold">LOGGING</text>
      </g>

      {/* Access Label */}
      <rect x="150" y="148" width="70" height="25" rx="8" fill="#166534" stroke="#22c55e" strokeWidth="2"/>
      <text x="185" y="165" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">ACCESS</text>

      {/* AI Infrastructure */}
      <g>
        <rect x="20" y="190" width="340" height="190" rx="12" fill="url(#darkGrad)" stroke="#22c55e" strokeWidth="2"/>
        <text x="190" y="212" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">AI INFRASTRUCTURE</text>
        
        {/* GPU Farm */}
        <rect x="35" y="225" width="145" height="145" rx="8" fill="#0F172A" stroke="#334155" strokeWidth="1.5"/>
        <text x="107" y="243" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">GPU FARM</text>
        
        {/* SLURM Interface */}
        <rect x="45" y="255" width="125" height="40" rx="6" fill="url(#accentGrad)" stroke="#22c55e" strokeWidth="1.5"/>
        <text x="107" y="272" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">SLURM</text>
        <text x="107" y="284" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">INTERFACE -</text>
        <text x="107" y="292" textAnchor="middle" fill="#cbd5e1" fontSize="8">TRAINING</text>
        
        {/* RedHat AI */}
        <rect x="45" y="305" width="125" height="50" rx="6" fill="url(#accentGrad)" stroke="#22c55e" strokeWidth="1.5"/>
        <text x="107" y="325" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">REDHAT AI</text>
        <text x="107" y="337" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">NVIDIA STACK</text>

        {/* Shared Storage - positioned between GPU and RDU farms */}
        <rect x="177" y="295" width="16" height="65" rx="4" fill="#166534" stroke="#22c55e" strokeWidth="1"/>
        <text x="185" y="330" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold" transform="rotate(-90 185 330)">SHARED STORAGE</text>

        {/* RDU Farm */}
        <rect x="190" y="225" width="145" height="145" rx="8" fill="#0F172A" stroke="#334155" strokeWidth="1.5"/>
        <text x="262" y="243" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">RDU FARM</text>
        
        {/* SLURM Interface - Inference */}
        <rect x="200" y="255" width="125" height="40" rx="6" fill="url(#accentGrad)" stroke="#22c55e" strokeWidth="1.5"/>
        <text x="262" y="272" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">SLURM</text>
        <text x="262" y="284" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">INTERFACE -</text>
        <text x="262" y="292" textAnchor="middle" fill="#cbd5e1" fontSize="8">INFERENCE</text>
        
        {/* SambaNova */}
        <rect x="200" y="305" width="125" height="50" rx="6" fill="url(#accentGrad)" stroke="#22c55e" strokeWidth="1.5"/>
        <text x="262" y="323" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">SAMBANOVA</text>
        <text x="262" y="335" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">INTEGRATED</text>
        <text x="262" y="347" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">STACK</text>
      </g>

      {/* Supporting Infrastructure */}
      <g>
        <rect x="20" y="395" width="340" height="80" rx="12" fill="url(#darkGrad)" stroke="#22c55e" strokeWidth="2"/>
        <text x="190" y="418" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">SUPPORTING INFRASTRUCTURE</text>
        
        {/* Container Server */}
        <rect x="35" y="430" width="95" height="35" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1.5"/>
        <text x="82" y="443" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="bold">CONTAINER/SERVER</text>
        <text x="82" y="455" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="bold">COMPUTE</text>
        
        {/* SIEM and SOAR */}
        <rect x="140" y="430" width="95" height="35" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1.5"/>
        <text x="187" y="448" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="bold">SIEM AND SOAR</text>
        
        {/* Segregated Admin */}
        <rect x="245" y="430" width="105" height="35" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1.5"/>
        <text x="297" y="443" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="bold">SEGREGATED ADMIN</text>
        <text x="297" y="455" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="bold">INFRASTRUCTURE</text>
      </g>

      {/* Managed Service */}
      <g>
        <rect x="390" y="20" width="140" height="100" rx="12" fill="url(#darkGrad)" stroke="#22c55e" strokeWidth="2"/>
        <text x="460" y="43" textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="bold">MANAGED</text>
        <text x="460" y="58" textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="bold">SERVICE</text>
        
        {/* 24/7 Support */}
        <rect x="405" y="70" width="110" height="40" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1.5"/>
        <text x="460" y="87" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontWeight="bold">24/7 SUPPORT</text>
        <text x="460" y="99" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontWeight="bold">& MONITORING</text>
      </g>

      {/* Training / Upskilling */}
      <g>
        <rect x="390" y="135" width="140" height="175" rx="12" fill="url(#darkGrad)" stroke="#22c55e" strokeWidth="2"/>
        <text x="460" y="158" textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="bold">TRAINING /</text>
        <text x="460" y="173" textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="bold">UPSKILLING</text>
        
        {/* Workshops */}
        <rect x="405" y="185" width="110" height="35" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1.5"/>
        <text x="460" y="199" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="bold">WORKSHOPS &</text>
        <text x="460" y="210" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="bold">BOOTCAMPS</text>
        
        {/* Certification */}
        <rect x="405" y="230" width="110" height="35" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1.5"/>
        <text x="460" y="244" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="bold">CERTIFICATION</text>
        <text x="460" y="255" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="bold">PATHWAYS</text>
        
        {/* Knowledge Base */}
        <rect x="405" y="275" width="110" height="25" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1.5"/>
        <text x="460" y="291" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="bold">KNOWLEDGE BASE</text>
      </g>

      {/* Connection arrows - adjusted to avoid text */}
      <path d="M 185 173 L 185 190" stroke="#22c55e" strokeWidth="2" fill="none" markerEnd="url(#arrowgreen)"/>
      <path d="M 360 80 L 390 80" stroke="#22c55e" strokeWidth="2" fill="none"/>
      <path d="M 360 250 L 390 250" stroke="#22c55e" strokeWidth="2" fill="none"/>
      
      <defs>
        <marker id="arrowgreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#22c55e" />
        </marker>
      </defs>
      
      {/* Label at bottom */}
      <text x="400" y="590" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="bold" letterSpacing="2">SOVEREIGN DISTRIBUTED ARCHITECTURE</text>
    </svg>
  );
};

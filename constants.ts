
import { ResumeData } from './types';
import headshot from './src/assets/images/Headshot.png';

export const RESUME_DATA: ResumeData = {
  personal: {
    name: "Jacob Pech",
    title: "Innovative Business Visionary",
    location: "Colorado Springs, CO",
    email: "pechjacob@gmail.com",
    phone: "(719) 401-2420",
    avatarUrl: "https://github.com/pechjacob.png",
    avatarHoverUrl: headshot,
    about: "Cyber Consultant and Systems Engineer with 10+ years of experience across cybersecurity, network engineering, research, and DevSecOps, leading secure system design and modernization for national defense and critical infrastructure. Cleared TS/SCI-eligible and skilled at translating mission goals into resilient, scalable architectures with a focus on AI/ML automation and energy-system innovation."
  },
  socials: [
    {
      platform: 'LinkedIn',
      username: "@jacobpech",
      url: "https://linkedin.com/in/jacobpech"
    },
    {
      platform: 'GitHub',
      username: "@pechjacob",
      url: "https://github.com/pechjacob"
    }
  ],
  clearance: "Active Top Secret (SCI Eligible)",
  education: [
    {
      id: "edu1",
      degree: "Ph.D. Security Engineering",
      school: "University of Colorado, Colorado Springs",
      year: "On Pause"
    },
    {
      id: "edu2",
      degree: "M.S. Cybersecurity & Information Assurance",
      school: "Western Governors University",
      year: "2023"
    },
    {
      id: "edu3",
      degree: "Sans VetSuccess Academy",
      school: "SANS Institute",
      year: "2020 - 2020"
    },
    {
      id: "edu4",
      degree: "B.S. Information Technology",
      school: "Western Governors University",
      year: "2020"
    },
    {
      id: "edu5",
      degree: "A.S. Information Systems",
      school: "Community College of the Air Force",
      year: "2018"
    }
  ],
  certificates: [
    {
      id: "cert2",
      name: "CompTIA",
      details: "A+ | Net+ | Sec+ | Linux+ | Project+ | Cloud Essentials | CySA+"
    },
    {
      id: "cert3",
      name: "ISC2",
      details: "CISSP"
    },
    {
      id: "cert4",
      name: "GIAC",
      details: "GSEC | GCIH | GPEN"
    },
    {
      id: "cert5",
      name: "Cisco",
      details: "CCNA"
    },
    {
      id: "cert6",
      name: "EC-Council",
      details: "CEH"
    },
    {
      id: "cert7",
      name: "CIW",
      details: "User Interface Designer | Advanced HTML5 & CSS3 Specialist | Site Development Associate"
    }
  ],
  skills: [
    "Systems Architecture: MBSE · Cameo EA · ARAS · UML · SysML · DOORS · INCOSE",
    "Cybersecurity Architecture: RMF · NIST 800-53 · STIG · ATO/ATC · SIEM · Incident Response",
    "DevSecOps & Automation: Python · Ansible · Bash · PowerShell · CI/CD · GitOps · Docker",
    "Network Engineering: Cisco · Juniper · Palo Alto · VPN · Encryption · SD-WAN · Wireless",
    "Cloud & Hybrid Systems: Azure · AWS · GCP · VMware · M365 · Linux · Windows · Proxmox",
    "Mission-Focused Engineering: Agile · Risk Management · Compliance Audits · DoD/IC",
    "Leadership & Collaboration: Team Management · Project Planning · Technical Writing · Mentorship"
  ],
  languages: [
    "English"
  ],
  experience: [
    {
      id: "exp-future",
      role: "Next Role | Future",
      company: "Any Company - Any Industry",
      period: "",
      description: [
        "Competitive Salary and Benefits",
        "Fully Remote",
        "Realistic work life balance"
      ],
      isFuture: true,
      hidden: true
    },
    {
      id: "exp-saic",
      role: "Principal Systems Engineer",
      company: "SAIC — Remote",
      period: "2024–Present",
      description: [
        "Lead engineering for radar systems in missile detection initiatives with US Space Force",
        "Architect hardware/software security modifications to counter evolving threats",
        "Manage Agile/DevSecOps teams with a focus on cost, risk, and technical performance",
        "Translate strategic goals into actionable, scalable engineering requirements"
      ]
    },
    {
      id: "exp-thinkstack",
      role: "Cloud Security Consultant",
      company: "ThinkStack — Remote",
      period: "2023–2024",
      description: [
        "Advised regulated financial clients on hybrid cloud security strategy",
        "Led projects on SIEM, EDR, SD-WAN, and regulatory compliance audits",
        "Automated Tier 3 support workflows and hardened infrastructure against advanced threats",
        "Conducted forensic investigations and incident response"
      ]
    },
    {
      id: "exp-army",
      role: "Senior Network Engineer (U.S. Army Contractor)",
      company: "RiverTech-Akima — Colorado Springs, CO",
      period: "2023",
      description: [
        "SME for RNEC/LNEC tactical communications and secure architecture",
        "Designed and maintained resilient encryption, controllers, and VPN configurations",
        "Proposed automated infrastructure for mission-critical Layer 2/3 networks"
      ]
    },
    {
      id: "exp-envistacom",
      role: "Software Engineer",
      company: "Envistacom — Colorado Springs, CO",
      period: "2022–2023",
      description: [
        "Built orchestration platform focused on cyber compliance and infrastructure hardening",
        "Led development on full-stack tools using Python, Django, React, Ansible, and Docker",
        "Established SDLC and planned future department growth"
      ]
    },
    {
      id: "exp-afa",
      role: "Instructor (Volunteer)",
      company: "AFA CyberPatriot - Cyber Education Program",
      period: "2018 - 2023",
      description: [
        "Responsible for CTF style program instruction while utilizing and/or developing curriculum covering hardening and exploitation of Windows, Cisco IOS, and Linux-based VM's",
        "Simplification of advanced topics into relatable lessons while instilling ethical lifelong values into the next generation",
        "Recruiting and leading other instructors, resourcefully acquiring lab environment hardware, and coordination of events"
      ]
    },
    {
      id: "exp-mda",
      role: "Cybersecurity Architect (MDA Contractor)",
      company: "Caribou Thunder — Colorado Springs, CO",
      period: "2021–2022",
      description: [
        "Authored RMF packages and STIG evaluations for defense infrastructure",
        "Evaluated cyber policies and processes and proposed modernization course of action",
        "Led NIST 800-53 and ISO 15408 compliance assessments"
      ]
    },
    {
      id: "exp-deloitte",
      role: "DevOps Engineer (Space Force Program)",
      company: "Deloitte — Colorado Springs, CO",
      period: "2021",
      description: [
        "Helped design and test a space-focused cyber defense detection suite",
        "Built mirrored test environments and automated deployment pipelines",
        "Maintained Docker/ELK stack for system introspection"
      ]
    },
    {
      id: "exp-kratos",
      role: "Cybersecurity Engineer",
      company: "Kratos Defense — Colorado Springs, CO",
      period: "2020–2021",
      description: [
        "Achieved system ATOs through STIG compliance and RMF control implementation",
        "Automated compliance processes with PowerShell, Bash, and VBA",
        "Maintained eMASS documentation and monitoring workflows"
      ]
    },
    {
      id: "exp-alpine",
      role: "Cybersecurity Analyst",
      company: "Alpine Security – Pentesting & Cyber Education",
      period: "2018 – 2019",
      description: [
        "Cybersecurity Analyst that conducted phishing campaigns utilizing automated command-line and graphical Linux-based tools. Organized results into vulnerability overview reports for clients while recommending remediation actions.",
        "Maintained hardware and patched software ensuring proper hardware performance and up-to-date software.",
        "Secured and monitored networks through automation and scripting."
      ]
    },
    {
      id: "exp-usaf",
      role: "Network Engineer (Active Duty)",
      company: "United States Air Force — Scott AFB, IL",
      period: "2016–2020",
      description: [
        "Managed a $150M global network backbone supporting 6 MAJCOMs",
        "Led support for 100+ sites and 6000+ users",
        "Ensured 24/7 uptime through monitoring, incident response, and WAN optimization"
      ]
    },
    {
      id: "exp-vermeer",
      role: "MIG/GMAW Welder/Fabricator",
      company: "Vermeer – Industrial & Agricultural Machinery",
      period: "2015 – 2016",
      description: [
        "Fabricated Vermeer Terrain Leveler surface excavation machines (SEM’s) and pile drivers such as the PD10 using a variety of fitting, burning, and welding processes.",
        "Inspected all work meticulously for defects, dimensions, alignment, and end preparations. Then reported and corrected discrepancies in order to sustain quality assurance standards.",
        "Operated and maintained cutting torch, plasma cutter, band saw, industrial Miller MIG welder, 10 ton hoists, and a wide variety of power hand tools. Upheld and reinforced standards and procedures outlined in Occupational Safety and Health regulations"
      ]
    }
  ]
};

import { MSMEJob } from '../types';

export interface PresetProfile {
  id: string;
  name: string;
  roleTitle: string;
  location: string;
  language: string;
  experience: number;
  phone: string;
  tradeDescription: string;
  imageTag: string;
  imageThumbnail: string; // SVG data URI
}

// Stylized SVG image representations for trade tools and deliberate non-trade tests
export const SAMPLE_IMAGES = {
  welding: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%230f172a'><rect width='400' height='300' fill='%231e293b'/><circle cx='200' cy='150' r='60' fill='%23334155' stroke='%23f97316' stroke-width='4'/><path d='M160 150 L240 150 M200 110 L200 190' stroke='%2338bdf8' stroke-width='3'/><path d='M170 120 L230 180 M170 180 L230 120' stroke='%23facc15' stroke-width='2' stroke-dasharray='4'/><text x='200' y='250' font-family='sans-serif' font-size='14' fill='%23f8fafc' text-anchor='middle' font-weight='bold'>MIG/TIG Shielded Gas Torch & Plate Joint</text><text x='200' y='275' font-family='sans-serif' font-size='11' fill='%2394a3b8' text-anchor='middle'>Workpiece Inspection: Sound Root Penetration</text></svg>",
  electrician: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%230f172a'><rect width='400' height='300' fill='%23111827'/><rect x='60' y='40' width='280' height='200' rx='8' fill='%231f2937' stroke='%2338bdf8' stroke-width='3'/><rect x='80' y='60' width='60' height='40' fill='%23dc2626'/><rect x='150' y='60' width='60' height='40' fill='%23eab308'/><rect x='220' y='60' width='60' height='40' fill='%232563eb'/><rect x='80' y='120' width='200' height='80' rx='4' fill='%23374151'/><circle cx='130' cy='160' r='18' fill='%2310b981'/><rect x='180' y='145' width='80' height='30' fill='%230f172a' stroke='%23fbbf24' stroke-width='2'/><text x='220' y='165' font-family='monospace' font-size='12' fill='%23fbbf24' text-anchor='middle'>415.2 V</text><text x='200' y='265' font-family='sans-serif' font-size='13' fill='%2338bdf8' text-anchor='middle' font-weight='bold'>415V Industrial 3-Phase Distribution Panel & MCBs</text><text x='200' y='285' font-family='sans-serif' font-size='11' fill='%2394a3b8' text-anchor='middle'>Digital Multimeter Verified • Class 0 Insulated Gauntlets</text></svg>",
  solar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%230f172a'><rect width='400' height='300' fill='%230f291e'/><rect x='80' y='60' width='240' height='150' rx='8' fill='%231e3a8a' stroke='%2360a5fa' stroke-width='3'/><line x1='80' y1='110' x2='320' y2='110' stroke='%2393c5fd' stroke-width='2'/><line x1='80' y1='160' x2='320' y2='160' stroke='%2393c5fd' stroke-width='2'/><line x1='160' y1='60' x2='160' y2='210' stroke='%2393c5fd' stroke-width='2'/><line x1='240' y1='60' x2='240' y2='210' stroke='%2393c5fd' stroke-width='2'/><text x='200' y='250' font-family='sans-serif' font-size='14' fill='%2334d399' text-anchor='middle' font-weight='bold'>Rooftop PV String & MC4 Combiner Box</text><text x='200' y='275' font-family='sans-serif' font-size='11' fill='%2394a3b8' text-anchor='middle'>Multimeter VOC: 580V DC | Earth: 2.1 Ohms</text></svg>",
  ev: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%230f172a'><rect width='400' height='300' fill='%231a1a2e'/><rect x='90' y='70' width='220' height='130' rx='10' fill='%2316213e' stroke='%2310b981' stroke-width='3'/><circle cx='130' cy='135' r='20' fill='%23e94560'/><circle cx='180' cy='135' r='20' fill='%23e94560'/><circle cx='230' cy='135' r='20' fill='%23e94560'/><circle cx='270' cy='135' r='14' fill='%230f3460' stroke='%2338bdf8' stroke-width='2'/><text x='200' y='245' font-family='sans-serif' font-size='14' fill='%23a7f3d0' text-anchor='middle' font-weight='bold'>72V Li-ion Battery Pack & Smart BMS Harness</text><text x='200' y='270' font-family='sans-serif' font-size='11' fill='%2394a3b8' text-anchor='middle'>CAN Bus Scan: No DTC faults, Cell Delta 12mV</text></svg>",
  cnc: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%230f172a'><rect width='400' height='300' fill='%2318181b'/><rect x='100' y='60' width='200' height='140' rx='6' fill='%2327272a' stroke='%23f59e0b' stroke-width='3'/><circle cx='200' cy='130' r='45' fill='%233f3f46' stroke='%23fbbf24' stroke-width='2'/><text x='200' y='135' font-family='monospace' font-size='12' fill='%23fbbf24' text-anchor='middle'>±0.005mm</text><text x='200' y='245' font-family='sans-serif' font-size='14' fill='%23fbbf24' text-anchor='middle' font-weight='bold'>Fanuc CNC VMC Tool Offset & Spindle Setup</text><text x='200' y='270' font-family='sans-serif' font-size='11' fill='%2394a3b8' text-anchor='middle'>Hydraulic Vice Clamping & Dial Gauge Verified</text></svg>",
  dog: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23451a03'><rect width='400' height='300' fill='%2378350f'/><circle cx='200' cy='130' r='55' fill='%23d97706'/><polygon points='150,80 170,120 135,110' fill='%2392400e'/><polygon points='250,80 230,120 265,110' fill='%2392400e'/><circle cx='180' cy='125' r='8' fill='%231c1917'/><circle cx='220' cy='125' r='8' fill='%231c1917'/><ellipse cx='200' cy='150' rx='14' ry='10' fill='%231c1917'/><text x='200' y='235' font-family='sans-serif' font-size='13' fill='%23fef3c7' text-anchor='middle' font-weight='bold'>TEST: Domestic Canine / Pet Photo</text><text x='200' y='260' font-family='sans-serif' font-size='11' fill='%23fde68a' text-anchor='middle'>Non-Trade Evidence: Vision AI Must Flag & Reject</text></svg>",
  selfie: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%231e1b4b'><rect width='400' height='300' fill='%23312e81'/><circle cx='200' cy='120' r='45' fill='%23fbcfe8'/><path d='M130,220 C130,170 270,170 270,220' fill='%234338ca'/><text x='200' y='250' font-family='sans-serif' font-size='13' fill='%23e0e7ff' text-anchor='middle' font-weight='bold'>TEST: Casual Selfie Without Tools</text><text x='200' y='275' font-family='sans-serif' font-size='11' fill='%23c7d2fe' text-anchor='middle'>Non-Trade Evidence: Vision AI Must Penalize</text></svg>"
};

export const PRESET_PROFILES: PresetProfile[] = [
  {
    id: "p1",
    name: "Ramesh Kumar",
    roleTitle: "MIG/MAG & TIG Welder",
    location: "Peenya Industrial Area, Bengaluru, Karnataka",
    language: "Hindi",
    experience: 5.5,
    phone: "+91 98450 12894",
    tradeDescription: "Mai pichhle 5.5 saal se MIG aur TIG welding kar raha hu. Heavy mild steel plates aur argon gas torch se joints banata hu. Blueprint dekh ke joint beveling karta hu, root pass bhar ke grinder se capping check karta hu. Safety helmet aur leather apron compulsory pehanta hu.",
    imageTag: "Welding Torch & Joint Setup",
    imageThumbnail: SAMPLE_IMAGES.welding
  },
  {
    id: "p2",
    name: "Sunita Devi",
    roleTitle: "Solar PV & Inverter Commissioning Technician",
    location: "Okhla Industrial Area Phase-III, New Delhi",
    language: "Hindi",
    experience: 4.0,
    phone: "+91 98101 77239",
    tradeDescription: "Main rooftop commercial solar panels install karti hu. 10kW se 50kW ke grid-tie inverters ki DC wiring, MC4 connectors crimping, aur AC distribution box connection karti hu. Earth pit ka resistance megger se check karti hu aur net-metering synchronization karti hu.",
    imageTag: "Solar Array & Inverter Wiring",
    imageThumbnail: SAMPLE_IMAGES.solar
  },
  {
    id: "p3",
    name: "Rajesh Deshmukh",
    roleTitle: "EV Wire Harness & BMS Diagnostic Tech",
    location: "Bhosari MIDC, Pune, Maharashtra",
    language: "Marathi",
    experience: 6.0,
    phone: "+91 98220 44581",
    tradeDescription: "Maza 6 varshancha auto electrical anubhav aahe. Aata 2W/3W electric vehicle battery packs, BMS wiring aani 72V BLDC motor controller wiring karun fault diagnosis karto. CAN bus scanner vaprून DTC error codes clear karto. High voltage orange wire safety standard mahit aahe.",
    imageTag: "EV Battery Pack & CAN Tool",
    imageThumbnail: SAMPLE_IMAGES.ev
  },
  {
    id: "p4",
    name: "Senthil Murugan",
    roleTitle: "CNC Milling & Precision Turning Operator",
    location: "Ambattur Industrial Estate, Chennai, Tamil Nadu",
    language: "Tamil",
    experience: 4.5,
    phone: "+91 94440 91832",
    tradeDescription: "Fanuc 0i-MF controller la 3-axis VMC milling machine operate pannuven. G-code, M-code offset setting, vernier micrometer la ±10 micron tolerance check pannuven. Hydraulic vice clamping, carbide tool insert change, chip cleaning accurate ah seiwen.",
    imageTag: "CNC VMC Control & Caliper",
    imageThumbnail: SAMPLE_IMAGES.cnc
  },
  {
    id: "p5",
    name: "Vikas Sharma (Judge Test: Dog Photo)",
    roleTitle: "Automotive Engine Mechanic (Unrelated Image Test)",
    location: "Peenya Industrial Area, Bengaluru, Karnataka",
    language: "Hindi",
    experience: 4.0,
    phone: "+91 98450 99887",
    tradeDescription: "Main diesel tractor aur auto engine overhaul karta hu, fuel pump nozzle calibrate karta hu.",
    imageTag: "TEST: Dog Photo (Non-Trade Evidence)",
    imageThumbnail: SAMPLE_IMAGES.dog
  }
];

export const BENCHMARK_MSME_JOBS: MSMEJob[] = [
  {
    id: "MSME-EV-01",
    company: "Bosch EV Systems India Ltd",
    cluster: "Chakan Industrial Zone, Phase II",
    city: "Pune",
    state: "Maharashtra",
    role: "EV Battery Pack & Powertrain Assembly Technician",
    nsqf_required: 4,
    salary_range: "₹34,000 - ₹44,000 / month",
    salary_numeric: 38000,
    vacancies: 8,
    contact_person: "Dr. Vikram Kulkarni (Talent Acquisition Lead)",
    contact_whatsapp: "+919822044581",
    key_requirements: ["High-voltage safety compliance (ISO 6469)", "BMS harness crimping", "CAN bus scan"],
    benefits: ["Subsidized cafeteria", "ESI + Provident Fund", "Quarterly attendance bonus", "Company bus route"],
    match_score: 96,
    demand_level: "Critical",
    interview_probability: "Very High",
    dataset_source: "Ministry of MSME Udyam Registration & NCS Industrial Cluster Requisitions"
  },
  {
    id: "MSME-BLR-02",
    company: "Kavya Precision Fabrication Pvt Ltd",
    cluster: "Peenya Industrial Complex, Stage 2",
    city: "Bengaluru",
    state: "Karnataka",
    role: "MIG/TIG Welder Specialist (Pressure Vessels)",
    nsqf_required: 4,
    salary_range: "₹28,000 - ₹38,000 / month",
    salary_numeric: 32000,
    vacancies: 5,
    contact_person: "Venkatesh Rao (Plant Head)",
    contact_whatsapp: "+919845012894",
    key_requirements: ["MIG/MAG shielding gas welding", "Blueprint reading", "Argon purge experience"],
    benefits: ["ESI + PF", "Overtime allowance 1.5x", "Subsidized canteen", "Annual safety gear grant"],
    match_score: 94,
    demand_level: "High",
    interview_probability: "Very High",
    dataset_source: "Ministry of MSME Udyam Registration & NCS Industrial Cluster Requisitions"
  },
  {
    id: "MSME-DEL-03",
    company: "Surya Shakti Renewable Solutions",
    cluster: "Okhla Industrial Area Phase-III",
    city: "New Delhi",
    state: "Delhi NCR",
    role: "Commercial Rooftop Solar Commissioning Technician",
    nsqf_required: 4,
    salary_range: "₹28,000 - ₹36,000 / month",
    salary_numeric: 31000,
    vacancies: 4,
    contact_person: "Rajesh Grover (Operations Lead)",
    contact_whatsapp: "+919810177239",
    key_requirements: ["String inverter DC sizing", "Earthing grid resistance measurement", "Working at heights certificate"],
    benefits: ["Site travel DA ₹350/day", "Accident insurance ₹5L", "Tool kit grant"],
    match_score: 92,
    demand_level: "Surge",
    interview_probability: "High",
    dataset_source: "Ministry of MSME Udyam Registration & NCS Industrial Cluster Requisitions"
  },
  {
    id: "MSME-CHE-04",
    company: "Kovai Precision Tools & Dies",
    cluster: "Ambattur Industrial Estate",
    city: "Chennai",
    state: "Tamil Nadu",
    role: "CNC VMC Milling Operator (Fanuc/Siemens)",
    nsqf_required: 4,
    salary_range: "₹30,000 - ₹40,000 / month",
    salary_numeric: 34000,
    vacancies: 3,
    contact_person: "M. Senthilkumar (Production Manager)",
    contact_whatsapp: "+919444091832",
    key_requirements: ["Fanuc control 0i-MF", "Tool offset setting", "Vernier/Micrometer ±0.01mm"],
    benefits: ["Night shift allowance", "ESIC medical card", "Annual performance bonus"],
    match_score: 91,
    demand_level: "High",
    interview_probability: "High",
    dataset_source: "Ministry of MSME Udyam Registration & NCS Industrial Cluster Requisitions"
  },
  {
    id: "MSME-MAN-05",
    company: "Apex Electro-Tech Systems",
    cluster: "IMT Manesar, Sector 8",
    city: "Gurugram",
    state: "Haryana",
    role: "Industrial Control Panel Wiring Electrician",
    nsqf_required: 3,
    salary_range: "₹24,000 - ₹32,000 / month",
    salary_numeric: 27000,
    vacancies: 6,
    contact_person: "Satish Yadav (HR Manager)",
    contact_whatsapp: "+919911230456",
    key_requirements: ["Ferrule numbering & SLD wiring", "PLC terminal relay interfacing", "3-phase busbar assembly"],
    benefits: ["Subsidized hostel accommodation", "PF & medical", "Annual bonus"],
    match_score: 89,
    demand_level: "Surge",
    interview_probability: "High Match Potential",
    dataset_source: "Ministry of MSME Udyam Registration & NCS Industrial Cluster Requisitions"
  },
  {
    id: "MSME-PUN-06",
    company: "Sahyadri Auto Components",
    cluster: "Bhosari MIDC",
    city: "Pune",
    state: "Maharashtra",
    role: "Automotive Wire Harness & Sensor Integration Tech",
    nsqf_required: 4,
    salary_range: "₹30,000 - ₹39,000 / month",
    salary_numeric: 33000,
    vacancies: 5,
    contact_person: "Anand Deshmukh (Works Director)",
    contact_whatsapp: "+919822044581",
    key_requirements: ["Wiring harness continuity check", "Ultrasonic welding basics", "5S shopfloor"],
    benefits: ["Free transport from Bhosari circle", "PF + Gratuity", "Quarterly attendance bonus"],
    match_score: 88,
    demand_level: "High",
    interview_probability: "High",
    dataset_source: "Ministry of MSME Udyam Registration & NCS Industrial Cluster Requisitions"
  }
];

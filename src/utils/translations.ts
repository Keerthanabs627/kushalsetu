export type LanguageCode = 'en' | 'hi' | 'kn';

export interface Translations {
  appName: string;
  tagline: string;
  commandCenter: string;
  heroHeader: string;
  heroSubheader: string;
  verifiedTrade: string;
  nsqfReadiness: string;
  employabilityScore: string;
  msmeMatches: string;
  incomeGrowth: string;
  runLiveDemo: string;
  workerIntake: string;
  intakeSubtitle: string;
  autonomousEngine: string;
  engineSubtitle: string;
  employabilityPassport: string;
  passportSubtitle: string;
  jobRadar: string;
  whatsappOutreach: string;
  futureRoadmap: string;
  competencyGraph: string;
  whyKaushalSetu: string;
  techTransparency: string;
  architectureDiagram: string;
  reasoningTrace: string;
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    appName: "KAUSHALSETU AI",
    tagline: "Transforming Informal Skills into Verified Employability",
    commandCenter: "Bharat Workforce Command Center",
    heroHeader: "Transforming Informal Skills into",
    heroSubheader: "Verified Employability",
    verifiedTrade: "Verified Trade",
    nsqfReadiness: "NSQF Readiness",
    employabilityScore: "Employability Score",
    msmeMatches: "MSME Matches",
    incomeGrowth: "Realistic Wage Growth",
    runLiveDemo: "Run Live Demo",
    workerIntake: "Worker Intake Form",
    intakeSubtitle: "Multimodal Vernacular Blue-Collar Profile",
    autonomousEngine: "Autonomous Employability Engine",
    engineSubtitle: "8 LangGraph Multi-Agent Nodes • Reasoning Visibility",
    employabilityPassport: "Employability Passport",
    passportSubtitle: "DigiLocker-Ready Digital Credential",
    jobRadar: "MSME Job Radar",
    whatsappOutreach: "WhatsApp Outreach",
    futureRoadmap: "4-Week Future Skills Roadmap",
    competencyGraph: "Competency Graph",
    whyKaushalSetu: "Why KaushalSetu vs Traditional Hiring",
    techTransparency: "Technical Telemetry & AI Model Transparency",
    architectureDiagram: "LangGraph Architecture DAG",
    reasoningTrace: "Agent Reasoning Trace"
  },
  hi: {
    appName: "कौशलसेतु एआई",
    tagline: "अनौपचारिक कौशल को प्रमाणित रोजगार में बदलना",
    commandCenter: "भारत कार्यबल कमांड सेंटर",
    heroHeader: "अनौपचारिक कौशल को बदलें",
    heroSubheader: "सत्यापित रोजगार में",
    verifiedTrade: "प्रमाणित व्यवसाय (Trade)",
    nsqfReadiness: "NSQF स्तर तैयारी",
    employabilityScore: "रोजगार क्षमता स्कोर",
    msmeMatches: "उपयुक्त MSME नौकरियां",
    incomeGrowth: "अनुमानित वेतन वृद्धि",
    runLiveDemo: "लाइव डेमो चलाएं",
    workerIntake: "कारीगर पंजीकरण फॉर्म",
    intakeSubtitle: "बहुभाषी आवाज और फोटो आधारित कौशल पंजीकरण",
    autonomousEngine: "स्वायत्त रोजगार इंजन (8 एजेंट्स)",
    engineSubtitle: "8 लैंगग्राफ एजेंट्स • तार्किक निर्णय दृश्यता",
    employabilityPassport: "कौशल रोजगार पासपोर्ट",
    passportSubtitle: "डिजिलॉकर-सत्यापित डिजिटल प्रमाण पत्र",
    jobRadar: "स्थानीय MSME जॉब रडार",
    whatsappOutreach: "सीधा व्हाट्सएप संपर्क",
    futureRoadmap: "4-सप्ताह भविष्य कौशल रोडमैप",
    competencyGraph: "कौशल ज्ञान आरेख",
    whyKaushalSetu: "कौशलसेतु बनाम पारंपरिक ठेकेदारी",
    techTransparency: "तकनीकी टेलीमेट्री और एआई मॉडल विवरण",
    architectureDiagram: "लैंगग्राफ आर्किटेक्चर आरेख",
    reasoningTrace: "एजेंट तार्किक निर्णय ट्रेस"
  },
  kn: {
    appName: "ಕೌಶಲಸೇತು ಎಐ",
    tagline: "ಅನೌಪಚಾರಿಕ ಕೌಶಲ್ಯಗಳನ್ನು ಪ್ರಮಾಣೀಕೃತ ಉದ್ಯೋಗವಾಗಿ ಪರಿವರ್ತಿಸುವುದು",
    commandCenter: "ಭಾರತ ಕಾರ್ಮಿಕ ಕಮಾಂಡ್ ಸೆಂಟರ್",
    heroHeader: "ಅನೌಪಚಾರಿಕ ಕೌಶಲ್ಯಗಳನ್ನು ಪರಿವರ್ತಿಸಿ",
    heroSubheader: "ದೃಢೀಕೃತ ಉದ್ಯೋಗಾವಕಾಶವಾಗಿ",
    verifiedTrade: "ದೃಢೀಕೃತ ವೃತ್ತಿ (Trade)",
    nsqfReadiness: "NSQF ಹಂತದ ಸನ್ನದ್ಧತೆ",
    employabilityScore: "ಉದ್ಯೋಗಾರ್ಹತೆ ಸ್ಕೋರ್",
    msmeMatches: "ಹೊಂದಾಣಿಕೆಯ MSME ಉದ್ಯೋಗಗಳು",
    incomeGrowth: "ವೇತನ ಬೆಳವಣಿಗೆಯ ಅಂದಾಜು",
    runLiveDemo: "ಲೈವ್ ಡೆಮೊ ರನ್ ಮಾಡಿ",
    workerIntake: "ಕುಶಲಕರ್ಮಿ ನೋಂದಣಿ ಫಾರ್ಮ್",
    intakeSubtitle: "ಸ್ಥಳೀಯ ಧ್ವನಿ ಮತ್ತು ಚಿತ್ರ ಆಧಾರಿತ ಪ್ರೊಫೈಲ್",
    autonomousEngine: "ಸ್ವಾಯತ್ತ ಉದ್ಯೋಗ ಎಂಜಿನ್ (8 ಏಜೆಂಟ್‌ಗಳು)",
    engineSubtitle: "8 ಲ್ಯಾಂಗ್‌ಗ್ರಾಫ್ ಏಜೆಂಟ್‌ಗಳು • ವಿವರಣಾತ್ಮಕ ನಿರ್ಧಾರ",
    employabilityPassport: "ಉದ್ಯೋಗಾರ್ಹತೆ ಪಾಸ್‌ಪೋರ್ಟ್",
    passportSubtitle: "ಡಿಜಿಲಾಕರ್ ಸಿದ್ಧ ಡಿಜಿಟಲ್ ಪ್ರಮಾಣಪತ್ರ",
    jobRadar: "ಸ್ಥಳೀಯ MSME ಜಾಬ್ ರಾಡಾರ್",
    whatsappOutreach: "ವಾಟ್ಸಾಪ್ ಸಂದೇಶ ವಿತರಣೆ",
    futureRoadmap: "4-ವಾರಗಳ ಭವಿಷ್ಯದ ಕೌಶಲ್ಯ ಯೋಜನೆ",
    competencyGraph: "ಸಾಮರ್ಥ್ಯ ಜ್ಞಾನ ನಕ್ಷೆ",
    whyKaushalSetu: "ಕೌಶಲಸೇತು ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ನೇಮಕಾತಿ ಹೋಲಿಕೆ",
    techTransparency: "ತಾಂತ್ರಿಕ ಟೆಲಿಮೆಟ್ರಿ ಮತ್ತು AI ಮಾದರಿ ವಿವರ",
    architectureDiagram: "ಲ್ಯಾಂಗ್‌ಗ್ರಾಫ್ ವಾಸ್ತುಶಿಲ್ಪ ರೇಖಾಚಿತ್ರ",
    reasoningTrace: "ಏಜೆಂಟ್ ತಾರ್ಕಿಕ ಪತ್ತೆದಾರಿಕೆ"
  }
};

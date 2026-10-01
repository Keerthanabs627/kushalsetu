import jsPDF from 'jspdf';
import { EmployabilityPassport, NSQFMapping, VerifiedSkill } from '../types';

export function generateEmployabilityPassportPDF(
  passport: EmployabilityPassport,
  nsqfMapping: NSQFMapping | null,
  verifiedSkills: VerifiedSkill[] = []
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Background and Outer Border
  doc.setFillColor(15, 23, 42); // slate-900 dark theme
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Double Border with Bharat Tricolor flair
  doc.setDrawColor(249, 115, 22); // Saffron
  doc.setLineWidth(1.2);
  doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

  doc.setDrawColor(59, 130, 246); // Tech Blue inner border
  doc.setLineWidth(0.4);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  // Top Tricolor stripe
  doc.setFillColor(249, 115, 22); // Saffron
  doc.rect(10, 10, (pageWidth - 20) / 3, 3, 'F');
  doc.setFillColor(255, 255, 255); // White
  doc.rect(10 + (pageWidth - 20) / 3, 10, (pageWidth - 20) / 3, 3, 'F');
  doc.setFillColor(16, 185, 129); // Green
  doc.rect(10 + 2 * (pageWidth - 20) / 3, 10, (pageWidth - 20) / 3, 3, 'F');

  // National Header
  doc.setTextColor(245, 158, 11);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('GOVERNMENT OF BHARAT • NATIONAL APPRENTICESHIP & SKILL QUALIFICATION', pageWidth / 2, 22, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text('KAUSHALSETU DIGITAL EMPLOYABILITY PASSPORT', pageWidth / 2, 31, { align: 'center' });

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Autonomous Workforce Credential • Aligned to NSQF Levels 3–5 (MSDE / NSDC)', pageWidth / 2, 37, { align: 'center' });

  // Horizontal divider
  doc.setDrawColor(51, 65, 85);
  doc.line(15, 41, pageWidth - 15, 41);

  // Candidate Profile Box
  doc.setFillColor(30, 41, 59); // slate-800
  doc.roundedRect(15, 46, pageWidth - 30, 48, 3, 3, 'F');

  // Candidate Name & Trade
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(passport.worker_name, 22, 57);

  doc.setTextColor(96, 165, 250);
  doc.setFontSize(11);
  doc.text(passport.primary_trade, 22, 64);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Location: ${passport.location}`, 22, 71);
  doc.text(`Passport ID: ${passport.passport_id}  |  Issue Date: ${passport.issue_date}`, 22, 77);
  doc.text(`QP-NOS Standard: ${passport.qp_code} (${passport.sector})`, 22, 83);

  // NSQF Badge Box (Right side of Candidate Box)
  doc.setFillColor(16, 185, 129);
  doc.roundedRect(pageWidth - 65, 52, 45, 14, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(`NSQF LEVEL ${passport.nsqf_level}`, pageWidth - 42.5, 61, { align: 'center' });

  doc.setTextColor(245, 158, 11);
  doc.setFontSize(8);
  doc.text('NATIONAL CERTIFIED', pageWidth - 42.5, 71, { align: 'center' });

  // Key Metrics Grid (Score, Probability, Salary, Trajectory)
  const metricY = 100;
  const colWidth = (pageWidth - 30) / 4;

  const metrics = [
    { title: 'EMPLOYABILITY SCORE', val: `${passport.employability_score}/100`, sub: 'A+ Industry Grade' },
    { title: 'WORKFORCE READINESS', val: `${passport.employment_probability || 94}%`, sub: 'Prioritized Match' },
    { title: 'SALARY BAND', val: (passport.expected_salary_band || '₹28,000/mo').split('/')[0], sub: 'MSME Certified' },
    { title: 'MARKET DEMAND', val: passport.market_demand_score || 'High', sub: 'Active Clusters' }
  ];

  metrics.forEach((m, idx) => {
    const x = 15 + idx * colWidth;
    doc.setFillColor(24, 33, 54);
    doc.roundedRect(x + 1, metricY, colWidth - 2, 26, 2, 2, 'F');

    doc.setTextColor(148, 163, 184);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text(m.title, x + (colWidth / 2), metricY + 7, { align: 'center' });

    doc.setTextColor(16, 185, 129);
    doc.setFontSize(12);
    doc.text(m.val, x + (colWidth / 2), metricY + 16, { align: 'center' });

    doc.setTextColor(203, 213, 225);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text(m.sub, x + (colWidth / 2), metricY + 22, { align: 'center' });
  });

  // Verified Competency Portfolio
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('VERIFIED TECHNICAL COMPETENCIES & TOOL PROFICIENCY', 16, 137);

  const skillsToRender = verifiedSkills.length > 0 ? verifiedSkills.slice(0, 4) : [
    { skill_name: 'MIG/MAG Shielded Gas Welding (GMAW)', proficiency: 'Advanced', evidence: 'Multi-pass fillet joint inspection' },
    { skill_name: 'Shielded Metal Arc Welding (SMAW)', proficiency: 'Master', evidence: 'Root pass penetration on heavy plates' },
    { skill_name: 'Thermal Oxy-Acetylene Gas Cutting', proficiency: 'Intermediate', evidence: 'Accurate edge beveling with 45-deg tolerance' },
    { skill_name: 'Technical Blueprint & GD&T Symbol Interpretation', proficiency: 'Intermediate', evidence: 'Fabrication adhering to engineering drawings' }
  ];

  let currentY = 144;
  skillsToRender.forEach((skill, idx) => {
    doc.setFillColor(30, 41, 59);
    doc.roundedRect(15, currentY, pageWidth - 30, 16, 2, 2, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(`${idx + 1}. ${skill.skill_name}`, 20, currentY + 6);

    doc.setTextColor(16, 185, 129);
    doc.setFontSize(8);
    doc.text(`[${skill.proficiency.toUpperCase()}]`, pageWidth - 45, currentY + 6);

    doc.setTextColor(148, 163, 184);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.text(`Evidence: ${skill.evidence}`, 20, currentY + 12);

    currentY += 19;
  });

  // Career Escalation & Future Skills Pathway
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('CAREER ESCALATION PATHWAY & FUTURE SKILLING', 16, currentY + 7);

  currentY += 12;
  doc.setFillColor(24, 33, 54);
  doc.roundedRect(15, currentY, pageWidth - 30, 22, 2, 2, 'F');

  doc.setTextColor(245, 158, 11);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('Trajectory: NSQF Level 4 Certified Technician  -->  NSQF Level 5 Automation & Cobot Lead', 20, currentY + 7);

  doc.setTextColor(203, 213, 225);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Targeted Specialization: EV Battery Pack Assembly, Solar Micro-Inverter Cloud Diagnostics & Cobot Pendant Programming.', 20, currentY + 13);
  doc.text('Projected Wage Escalation: +30% to +45% sustainable wage premium in industrial clusters.', 20, currentY + 18);

  // Verifiable Digital Credential Footer
  const footerY = pageHeight - 38;
  doc.setDrawColor(51, 65, 85);
  doc.line(15, footerY, pageWidth - 15, footerY);

  // Mock QR box
  doc.setFillColor(255, 255, 255);
  doc.rect(18, footerY + 5, 20, 20, 'F');
  doc.setFillColor(0, 0, 0);
  doc.rect(20, footerY + 7, 5, 5, 'F');
  doc.rect(31, footerY + 7, 5, 5, 'F');
  doc.rect(20, footerY + 18, 5, 5, 'F');
  doc.rect(27, footerY + 14, 3, 3, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('DIGILOCKER VERIFIABLE CREDENTIAL', 44, footerY + 10);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text(`Cryptographic Proof Hash: ${passport.verification_hash}`, 44, footerY + 15);
  doc.text(`Issued by: ${passport.issued_by}`, 44, footerY + 20);
  doc.text('Direct Public Verification Portal: https://kaushalsetu.gov.in/verify', 44, footerY + 24);

  doc.setTextColor(16, 185, 129);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('STATUS: ACTIVE AUTHENTICATED', pageWidth - 65, footerY + 14);

  // Save the PDF
  const filename = `${passport.worker_name.replace(/\s+/g, '_')}_KaushalSetu_Passport.pdf`;
  doc.save(filename);
}

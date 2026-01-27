import { jsPDF } from 'jspdf';
import { personalInfo, experiences, skillCategories, certifications, socialLinks } from '@/data/portfolio';

export const generateResumePDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  // Colors
  const primaryColor: [number, number, number] = [124, 58, 237]; // Purple
  const textColor: [number, number, number] = [30, 30, 30];
  const mutedColor: [number, number, number] = [100, 100, 100];

  // Helper to add new page if needed
  const checkNewPage = (height: number) => {
    if (y + height > 280) {
      doc.addPage();
      y = 20;
    }
  };

  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 45, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text(personalInfo.name, margin, 25);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(personalInfo.title, margin, 35);

  y = 55;

  // Contact Info
  doc.setTextColor(...mutedColor);
  doc.setFontSize(9);
  const contactInfo = [
    `📧 ${personalInfo.email}`,
    `📍 ${personalInfo.location}`,
    ...socialLinks.map(link => `🔗 ${link.url}`),
  ];
  doc.text(contactInfo.join('  •  '), margin, y);
  y += 12;

  // Divider
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // Summary
  doc.setTextColor(...textColor);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('PROFESSIONAL SUMMARY', margin, y);
  y += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const summaryLines = doc.splitTextToSize(personalInfo.shortBio, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 5 + 10;

  // Experience
  checkNewPage(40);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('PROFESSIONAL EXPERIENCE', margin, y);
  y += 8;

  experiences.forEach((exp) => {
    checkNewPage(35);

    doc.setTextColor(...textColor);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(exp.title, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...mutedColor);
    doc.text(`${exp.company} | ${exp.location} | ${exp.period}`, margin, y + 5);
    y += 12;

    doc.setTextColor(...textColor);
    doc.setFontSize(9);
    exp.responsibilities.slice(0, 3).forEach((resp) => {
      checkNewPage(8);
      const respLines = doc.splitTextToSize(`• ${resp}`, contentWidth - 5);
      doc.text(respLines, margin + 3, y);
      y += respLines.length * 4 + 2;
    });

    y += 5;
  });

  // Skills
  checkNewPage(40);
  y += 5;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('TECHNICAL SKILLS', margin, y);
  y += 8;

  skillCategories.forEach((category) => {
    checkNewPage(15);
    doc.setTextColor(...textColor);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(category.title + ':', margin, y);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const skillNames = category.skills.map(s => s.name).join(', ');
    const skillLines = doc.splitTextToSize(skillNames, contentWidth - 40);
    doc.text(skillLines, margin + 40, y);
    y += skillLines.length * 4 + 4;
  });

  // Certifications
  checkNewPage(40);
  y += 8;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('CERTIFICATIONS', margin, y);
  y += 8;

  const latestCerts = certifications.filter(c => c.isLatest).slice(0, 4);
  latestCerts.forEach((cert) => {
    checkNewPage(10);
    doc.setTextColor(...textColor);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(`• ${cert.title}`, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...mutedColor);
    doc.text(` - ${cert.issuer} (${cert.date})`, margin + doc.getTextWidth(`• ${cert.title}`), y);
    y += 6;
  });

  // Other certifications count
  const otherCertsCount = certifications.length - latestCerts.length;
  if (otherCertsCount > 0) {
    doc.setTextColor(...mutedColor);
    doc.setFontSize(8);
    doc.text(`+ ${otherCertsCount} more certifications`, margin, y + 2);
  }

  // Footer
  const footerY = 290;
  doc.setFontSize(8);
  doc.setTextColor(...mutedColor);
  doc.text(`Generated on ${new Date().toLocaleDateString()} | ${personalInfo.email}`, margin, footerY);
  doc.text('View full portfolio: oussamazbair.me', pageWidth - margin - 50, footerY);

  // Download
  doc.save(`${personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`);
};

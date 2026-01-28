import { jsPDF } from 'jspdf';
import { personalInfo, experiences, skillCategories, certifications, socialLinks, projects } from '@/data/portfolio';

// Helper function to clean text and handle special characters
const cleanText = (text: string): string => {
  return text
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/[…]/g, '...')
    .replace(/[•]/g, '•')
    .replace(/[^\x00-\x7F]/g, (char) => {
      // Handle common special characters
      const replacements: { [key: string]: string } = {
        'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
        'à': 'a', 'á': 'a', 'â': 'a', 'ä': 'a',
        'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
        'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
        'ò': 'o', 'ó': 'o', 'ô': 'o', 'ö': 'o',
        'ç': 'c', 'ñ': 'n',
        '°': 'deg', '€': 'EUR', '£': 'GBP', '$': 'USD'
      };
      return replacements[char] || char;
    });
};

// French translations
const frenchTranslations = {
  'Professional Summary': 'Résumé Professionnel',
  'Technical Skills': 'Compétences Techniques',
  'Professional Experience': 'Expérience Professionnelle',
  'Key Projects': 'Projets Clés',
  'Certifications': 'Certifications',
  'Professional Links': 'Liens Professionnels',
  'Email': 'Email',
  'Location': 'Localisation',
  'Experience': 'Expérience',
  'Status': 'Statut',
  'Technologies': 'Technologies',
  'Tech Stack': 'Stack Technique',
  'Generated on': 'Généré le',
  'Portfolio': 'Portfolio',
  'additional certifications available': 'certifications supplémentaires disponibles'
};

const generateCV = (language: 'en' | 'fr' = 'en') => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  // Translation helper
  const t = (key: string): string => {
    return language === 'fr' ? (frenchTranslations[key as keyof typeof frenchTranslations] || key) : key;
  };

  // Colors
  const primaryColor: [number, number, number] = [124, 58, 237]; // Purple
  const secondaryColor: [number, number, number] = [6, 182, 212]; // Cyan
  const textColor: [number, number, number] = [30, 30, 30];
  const mutedColor: [number, number, number] = [100, 100, 100];
  const lightGray: [number, number, number] = [240, 240, 240];

  // Helper to add new page if needed
  const checkNewPage = (height: number) => {
    if (y + height > pageHeight - 20) {
      doc.addPage();
      y = 20;
      return true;
    }
    return false;
  };

  // Helper to add section header
  const addSectionHeader = (title: string) => {
    checkNewPage(15);
    doc.setFillColor(...lightGray);
    doc.rect(margin, y - 2, contentWidth, 12, 'F');
    
    doc.setTextColor(...primaryColor);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(cleanText(t(title).toUpperCase()), margin + 3, y + 6);
    y += 15;
  };

  // Header Section
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 50, 'F');

  // Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(cleanText(personalInfo.name), margin, 20);

  // Title
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const title = language === 'fr' ? 'Ingénieur Logiciel & Développeur Full Stack' : personalInfo.title;
  doc.text(cleanText(title), margin, 30);

  // Contact Info
  doc.setFontSize(9);
  const contactInfo = [
    `${t('Email')}: ${personalInfo.email}`,
    `${t('Location')}: ${cleanText(personalInfo.location)}`,
    `${t('Experience')}: ${cleanText(personalInfo.experience)}`,
    `${t('Status')}: ${language === 'fr' ? 'Disponible' : cleanText(personalInfo.freelance)}`
  ];
  doc.text(contactInfo.join(' | '), margin, 40);

  y = 60;

  // Professional Summary
  addSectionHeader('Professional Summary');
  doc.setTextColor(...textColor);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const bio = language === 'fr' 
    ? 'Je développe des applications web modernes avec un focus sur la performance, la scalabilité et l\'expérience utilisateur exceptionnelle. Passionné par la création de solutions logicielles innovantes.'
    : personalInfo.shortBio;
  const summaryLines = doc.splitTextToSize(cleanText(bio), contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 4 + 10;

  // Technical Skills
  addSectionHeader('Technical Skills');
  skillCategories.forEach((category) => {
    checkNewPage(20);
    
    doc.setTextColor(...secondaryColor);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    const categoryTitle = language === 'fr' ? 
      category.title.replace('Backend & Java', 'Backend & Java')
        .replace('Frontend', 'Frontend')
        .replace('Database & DevOps', 'Base de Données & DevOps') 
      : category.title;
    doc.text(cleanText(categoryTitle) + ':', margin, y);
    
    doc.setTextColor(...textColor);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    
    const skills = category.skills.map(s => cleanText(s.name)).join(', ');
    const skillLines = doc.splitTextToSize(skills, contentWidth - 60);
    doc.text(skillLines, margin + 60, y);
    y += Math.max(skillLines.length * 4, 6) + 3;
  });

  y += 5;

  // Professional Experience
  addSectionHeader('Professional Experience');
  experiences.forEach((exp, index) => {
    checkNewPage(40);

    // Job Title and Company
    doc.setTextColor(...textColor);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    const jobTitle = language === 'fr' ? 
      exp.title.replace('Java Software Engineer', 'Ingénieur Logiciel Java')
        .replace('Software Engineer', 'Ingénieur Logiciel')
        .replace('Full Stack Developer Intern', 'Stagiaire Développeur Full Stack')
        .replace('Teaching Intern', 'Stagiaire Enseignant')
      : exp.title;
    doc.text(cleanText(jobTitle), margin, y);

    // Company and Period
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...mutedColor);
    doc.text(`${cleanText(exp.company)} | ${cleanText(exp.location)} | ${cleanText(exp.period)}`, margin, y + 6);
    y += 14;

    // Responsibilities
    doc.setTextColor(...textColor);
    doc.setFontSize(9);
    exp.responsibilities.slice(0, 4).forEach((resp) => {
      checkNewPage(8);
      const cleanResp = cleanText(resp);
      const respLines = doc.splitTextToSize(`• ${cleanResp}`, contentWidth - 5);
      doc.text(respLines, margin + 3, y);
      y += respLines.length * 4 + 1;
    });

    // Technologies
    if (exp.technologies && exp.technologies.length > 0) {
      checkNewPage(8);
      doc.setTextColor(...secondaryColor);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'italic');
      const techText = `${t('Technologies')}: ${exp.technologies.map(t => cleanText(t)).join(', ')}`;
      const techLines = doc.splitTextToSize(techText, contentWidth - 5);
      doc.text(techLines, margin + 3, y);
      y += techLines.length * 3 + 2;
    }

    y += 6;
  });

  // Key Projects
  addSectionHeader('Key Projects');
  const featuredProjects = projects.slice(0, 4); // Show top 4 projects
  
  featuredProjects.forEach((project) => {
    checkNewPage(25);

    // Project Title
    doc.setTextColor(...textColor);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(cleanText(project.title), margin, y);
    y += 6;

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const descLines = doc.splitTextToSize(cleanText(project.description), contentWidth);
    doc.text(descLines, margin, y);
    y += descLines.length * 4 + 2;

    // Technologies
    doc.setTextColor(...secondaryColor);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    const techText = `${t('Tech Stack')}: ${project.tags.map(t => cleanText(t)).join(', ')}`;
    const techLines = doc.splitTextToSize(techText, contentWidth);
    doc.text(techLines, margin, y);
    y += techLines.length * 3 + 8;
  });

  // Certifications
  addSectionHeader('Certifications');
  const latestCerts = certifications.filter(c => c.isLatest).slice(0, 6);
  
  latestCerts.forEach((cert) => {
    checkNewPage(8);
    doc.setTextColor(...textColor);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(`• ${cleanText(cert.title)}`, margin, y);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...mutedColor);
    doc.setFontSize(8);
    doc.text(`${cleanText(cert.issuer)} - ${cleanText(cert.date)}`, margin + 3, y + 4);
    y += 10;
  });

  // Additional certifications count
  const otherCertsCount = certifications.length - latestCerts.length;
  if (otherCertsCount > 0) {
    doc.setTextColor(...mutedColor);
    doc.setFontSize(8);
    doc.text(`+ ${otherCertsCount} ${t('additional certifications available')}`, margin, y + 2);
    y += 8;
  }

  // Social Links
  if (socialLinks.length > 0) {
    checkNewPage(15);
    doc.setTextColor(...secondaryColor);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(`${t('Professional Links')}:`, margin, y);
    y += 6;

    socialLinks.forEach((link) => {
      doc.setTextColor(...textColor);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`• ${cleanText(link.name)}: ${link.url}`, margin, y);
      y += 5;
    });
  }

  // Footer
  const footerY = pageHeight - 10;
  doc.setFontSize(7);
  doc.setTextColor(...mutedColor);
  doc.text(`${t('Generated on')} ${new Date().toLocaleDateString()} | ${personalInfo.email}`, margin, footerY);
  doc.text(`${t('Portfolio')}: oussamazbair.me`, pageWidth - margin - 40, footerY);

  // Download with clean filename
  const langSuffix = language === 'fr' ? '_FR' : '_EN';
  const fileName = `${personalInfo.name.replace(/\s+/g, '_')}_Resume${langSuffix}_${new Date().getFullYear()}.pdf`;
  doc.save(fileName);
};

// Export functions
export const generateResumePDF = () => generateCV('en');
export const generateResumePDF_FR = () => generateCV('fr');

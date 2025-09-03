import React from 'react';
import { Award, ExternalLink } from 'lucide-react';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  credentialUrl?: string;
  image: string;
  featured?: boolean;
}

const CertificationsSection: React.FC = () => {
  const certifications: Certification[] = [
    {
      id: 1,
      title: "Oracle Certified Professional: Java SE 17 Developer",
      issuer: "Oracle",
      date: "Aug 2025",
      credentialId: "OCP-JAVA-SE17",
      credentialUrl: "",
      image: "https://brm-workforce.oracle.com/pdf/certview/images/OCPJSE17.png",
      featured: true
    },
    {
      id: 2,
      title: "Oracle Certified Professional, Java EE 7 Application Developer",
      issuer: "Oracle",
      date: "Jul 2025",
      credentialId: "OCP-JAVAEE7",
      credentialUrl: "",
      image: "https://brm-workforce.oracle.com/pdf/certview/images/OCPJEE7AD.png",
      featured: true
    },
    {
      id: 3,
      title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
      issuer: "Oracle",
      date: "Jul 2025",
      credentialId: "OCI-GAI-2025",
      credentialUrl: "",
      image: "https://brm-workforce.oracle.com/pdf/certview/images/OCI2025GENAI.png",
      featured: true
    },
    {
      id: 4,
      title: "Oracle Cloud Infrastructure 2024 Certified Associate",
      issuer: "Oracle",
      date: "Feb 2025",
      credentialId: "OCI-ASSOCIATE-2024",
      credentialUrl: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=D30E4CA29B911578359425C1B0F4CB37631053C50554D49F58B721BC1F9B7EB6",
      image: "https://brm-workforce.oracle.com/pdf/certview/images/OCI2024FNDCFA.png",
      featured: true
    },
    {
      id: 5,
      title: "Scrum Foundation Professional Certificate (SFPC)",
      issuer: "CertiProf",
      date: "Aug 2024",
      credentialId: "SFPC-2024",
      credentialUrl: "",
      image: "https://media.licdn.com/dms/image/v2/D4E2DAQGFWkczN-v6lg/profile-treasury-document-cover-images_480/profile-treasury-document-cover-images_480/0/1724410428718?e=1746291600&v=beta&t=CcmU612GGtjq-vmvEHH7Sh9CtmGOJFEgb3ANOKzSeEk"
    },
    {
      id: 6,
      title: "Certified Software Engineer",
      issuer: "HackerRank",
      date: "Aug 2024",
      credentialId: "1dbd917c8d70",
      credentialUrl: "https://www.hackerrank.com/certificates/1dbd917c8d70",
      image: "https://hrcdn.net/fcore/assets/brand/logo-new-white-green-a5cb16e0ae.svg"
    },
    {
      id: 7,
      title: "AWS Technical Essentials",
      issuer: "Amazon Web Services (AWS)",
      date: "2024",
      credentialId: "AWS-TECH-ESS",
      credentialUrl: "",
      image: "https://media.licdn.com/dms/image/v2/D4E0BAQE0fp2sCqnVLg/company-logo_200_200/company-logo_200_200/0/1738855736997/amazon_web_services_logo?e=1750896000&v=beta&t=0QhDsH0AB1AMui_htwOmtO0unEN0ycVMesxgPz-YQDA"
    },
    {
      id: 8,
      title: "AWS Cloud Practitioner Essentials",
      issuer: "Amazon Web Services (AWS)",
      date: "2024",
      credentialId: "AWS-CP-ESS",
      credentialUrl: "",
      image: "https://media.licdn.com/dms/image/v2/D4E0BAQE0fp2sCqnVLg/company-logo_200_200/company-logo_200_200/0/1738855736997/amazon_web_services_logo?e=1750896000&v=beta&t=0QhDsH0AB1AMui_htwOmtO0unEN0ycVMesxgPz-YQDA"
    },
    {
      id: 9,
      title: "Continuous Integration and Continuous Delivery (CI/CD)",
      issuer: "IBM",
      date: "2024",
      credentialId: "IBM-CICD-2024",
      credentialUrl: "",
      image: "https://media.licdn.com/dms/image/v2/D560BAQGiz5ecgpCtkA/company-logo_200_200/company-logo_200_200/0/1688684715866/ibm_logo?e=1750896000&v=beta&t=2EYzlHr0aMMYjoavrnbg4-789SRk1pnprPjqZi8EBoU"
    },
    {
      id: 10,
      title: "Software Engineering Specialization",
      issuer: "Coursera - The Hong Kong University of Science and Technology",
      date: "Dec 2023",
      credentialId: "COURSERA-SE-SPEC",
      credentialUrl: "",
      image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/3a/37974779f7ad2a04626183c2f8951b/ustLogo.png?auto=format%2Ccompress&dpr=1&w=80&h=80"
    },
    {
      id: 11,
      title: "Foundations of Cybersecurity",
      issuer: "Google",
      date: "Nov 2023",
      credentialId: "831599c22e7d7256e8ee574d11a0cbf2",
      credentialUrl: "https://coursera.org/share/831599c22e7d7256e8ee574d11a0cbf2",
      image: "https://media.licdn.com/dms/image/v2/C4D0BAQHiNSL4Or29cg/company-logo_200_200/company-logo_200_200/0/1631311446380?e=1750896000&v=beta&t=RwIUDVm8bSK8s4zH7QCU2huXL124REnJ7oQg4Ihaj3c"
    },
    {
      id: 12,
      title: "Cybersecurity Fundamentals",
      issuer: "IBM",
      date: "Jan 2021",
      credentialId: "9d19b0bb-62e8-426f-89e4-32ead2a42756",
      credentialUrl: "https://www.youracclaim.com/badges/9d19b0bb-62e8-426f-89e4-32ead2a42756?source=linked_in_profile",
      image: "https://media.licdn.com/dms/image/v2/D560BAQGiz5ecgpCtkA/company-logo_200_200/company-logo_200_200/0/1688684715866/ibm_logo?e=1750896000&v=beta&t=2EYzlHr0aMMYjoavrnbg4-789SRk1pnprPjqZi8EBoU"
    }
  ];

  // Separate featured and regular certifications
  const featuredCerts = certifications.filter(cert => cert.featured);
  const regularCerts = certifications.filter(cert => !cert.featured);

  return (
    <section id="certifications" className="section-container bg-dark-200">
      <div className="flex items-center justify-center mb-12">
        <Award size={24} className="text-neon mr-3 animate-pulse-neon" />
        <h2 className="section-title mb-0">Certifications & Credentials</h2>
      </div>

      {/* Featured Certifications */}
      {featuredCerts.length > 0 && (
        <>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Latest Professional Certifications</h3>
            <div className="w-24 h-1 bg-neon mx-auto rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
            {featuredCerts.map((cert) => (
              <div 
                key={cert.id} 
                className="glass-card overflow-hidden group hover:border-neon transition-all duration-300 transform hover:scale-105"
              >
                <div className="h-48 bg-dark-100 flex items-center justify-center p-6 relative">
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="max-h-full max-w-full object-contain"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-neon text-dark-300 px-2 py-1 rounded-full text-xs font-bold">
                      LATEST
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-300/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                    {cert.credentialUrl && (
                      <a 
                        href={cert.credentialUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white bg-neon hover:bg-neon/80 text-sm py-2 px-4 rounded flex items-center font-semibold"
                      >
                        <ExternalLink size={14} className="mr-2" />
                        Verify Credential
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">{cert.title}</h3>
                  <p className="text-purple font-semibold">{cert.issuer}</p>
                  <div className="text-gray-400 text-sm flex justify-between items-center mt-3">
                    <span className="bg-dark-300 px-2 py-1 rounded text-neon font-mono">{cert.date}</span>
                    {cert.credentialId && (
                      <span className="text-xs">ID: {cert.credentialId}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Regular Certifications */}
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-white mb-2">Additional Certifications</h3>
        <div className="w-16 h-1 bg-purple mx-auto rounded"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {regularCerts.map((cert) => (
          <div 
            key={cert.id} 
            className="glass-card overflow-hidden group hover:border-neon transition-all duration-300"
          >
            <div className="h-32 bg-dark-100 flex items-center justify-center p-4 relative">
              <img 
                src={cert.image} 
                alt={cert.title} 
                className="max-h-full max-w-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-300/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                {cert.credentialUrl && (
                  <a 
                    href={cert.credentialUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white bg-neon hover:bg-neon/80 text-xs py-1 px-3 rounded flex items-center"
                  >
                    <ExternalLink size={12} className="mr-1" />
                    Verify
                  </a>
                )}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-sm font-bold text-white mb-1 leading-tight">{cert.title}</h3>
              <p className="text-purple text-sm">{cert.issuer}</p>
              <div className="text-gray-400 text-xs flex justify-between items-center mt-2">
                <span className="bg-dark-300 px-2 py-1 rounded text-neon font-mono">{cert.date}</span>
                {cert.credentialId && (
                  <span>ID: {cert.credentialId}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CertificationsSection;
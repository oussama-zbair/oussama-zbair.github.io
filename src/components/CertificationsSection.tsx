
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
}

const CertificationsSection: React.FC = () => {
  const certifications: Certification[] = [
    {
      id: 1,
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "Jan 2023",
      credentialId: "AWS-ASA-12345",
      credentialUrl: "https://www.credly.com/badges/example",
      image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 2,
      title: "Professional React Developer",
      issuer: "Meta (formerly Facebook)",
      date: "Mar 2022",
      credentialId: "FB-REACT-67890",
      credentialUrl: "https://www.credential.net/example",
      image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 3,
      title: "Full Stack Web Development",
      issuer: "freeCodeCamp",
      date: "Nov 2021",
      credentialId: "FCC-FSWD-13579",
      credentialUrl: "https://www.freecodecamp.org/certification/example",
      image: "https://images.unsplash.com/photo-1545670723-196ed0954986?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 4,
      title: "JavaScript Algorithms & Data Structures",
      issuer: "Udemy",
      date: "Aug 2021",
      credentialId: "UDMY-JSDS-24680",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <section id="certifications" className="section-container bg-dark-200">
      <div className="flex items-center justify-center mb-12">
        <Award size={24} className="text-neon mr-3 animate-pulse-neon" />
        <h2 className="section-title mb-0">Certifications</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {certifications.map((cert) => (
          <div 
            key={cert.id} 
            className="glass-card overflow-hidden group hover:border-neon transition-all duration-300"
          >
            <div className="h-40 bg-dark-100 flex items-center justify-center p-4 relative">
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
                    className="text-white bg-neon hover:bg-neon/80 text-sm py-1 px-3 rounded flex items-center"
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Verify
                  </a>
                )}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-bold text-white">{cert.title}</h3>
              <p className="text-purple">{cert.issuer}</p>
              <div className="text-gray-400 text-sm flex justify-between items-center mt-2">
                <span>{cert.date}</span>
                <span className="text-xs">ID: {cert.credentialId}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CertificationsSection;

import React, { useState } from 'react';
import { Code, ExternalLink, Github } from 'lucide-react';
import { Button } from './ui/button';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  category: string[];
}

const ProjectsSection: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "Insurance Management Platform",
      description: "Web-based insurance platform supporting multiple user roles (admin, client, provider, manager) with secure authentication, subscriptions, claims, and analytics.",
      image: "https://images.unsplash.com/photo-1611645149402-b7f87a1f158f?auto=format&fit=crop&w=600&q=80",
      technologies: ["Spring Boot", "React", "PostgreSQL", "JWT", "Docker", "CI/CD"],
      githubUrl: "",
      category: ["Full-Stack", "Web"]
    },
    {
      id: 2,
      title: "Document Management System (Desktop)",
      description: "Internal desktop application for user management, document indexing, and real-time tracking built for a government organization.",
      image: "https://images.unsplash.com/photo-1537498425277-c283d32ef9db?auto=format&fit=crop&w=600&q=80",
      technologies: ["Electron.js", "React", "Node.js", "IndexedDB", "Desktop App"],
      githubUrl: "",
      category: ["Desktop", "Full-Stack"]
    },
    {
      id: 3,
      title: "ImgBGRemoval – AI Image Background Remover",
      description: "AI web app for automatic background removal using the U²-Net deep learning model. Built with Flask and OpenCV.",
      image: "https://images.unsplash.com/photo-1549921296-3a6b1525cbe4?auto=format&fit=crop&w=600&q=80",
      technologies: ["Python", "Flask", "OpenCV", "PyTorch", "Deep Learning"],
      githubUrl: "https://github.com/oussama-zbair/ImgBGRemoval",
      demoUrl: "https://imgbgremoval.vercel.app",
      category: ["AI", "Web"]
    },
    {
      id: 4,
      title: "Real-Time Currency Converter",
      description: "Real-time currency converter with geolocation detection, exchange rate API, and interactive UI.",
      image: "https://images.unsplash.com/photo-1611974789855-9c1fafeebf6b?auto=format&fit=crop&w=600&q=80",
      technologies: ["Spring Boot", "React", "REST API", "Geolocation"],
      githubUrl: "https://github.com/oussama-zbair/CurrencyXchange-Backend",
      category: ["Web", "Finance", "Full-Stack"]
    },
    {
      id: 5,
      title: "Weather App",
      description: "Weather forecast application using Mapbox and OpenWeatherMap APIs. Supports location-based forecasts and animated display.",
      image: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=600&q=80",
      technologies: ["Next.js", "OpenWeatherMap", "Mapbox", "Tailwind"],
      githubUrl: "https://github.com/oussama-zbair/weather-app",
      demoUrl: "https://weather-world-view.vercel.app/",
      category: ["Frontend", "Web"]
    }
  ];

  const allCategories = Array.from(
    new Set(projects.flatMap(project => project.category))
  );

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visibleProjects, setVisibleProjects] = useState(projects);

  const filterProjects = (category: string | null) => {
    setActiveCategory(category);
    if (category === null) {
      setVisibleProjects(projects);
    } else {
      setVisibleProjects(projects.filter(project => project.category.includes(category)));
    }
  };

  return (
    <section id="projects" className="section-container">
      <div className="flex items-center justify-center mb-12">
        <Code size={24} className="text-neon mr-3 animate-pulse-neon" />
        <h2 className="section-title mb-0">Featured Projects</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <Button
          variant={activeCategory === null ? "default" : "outline"}
          className={activeCategory === null ? "bg-neon text-dark-300" : "text-gray-300"}
          onClick={() => filterProjects(null)}
        >
          All
        </Button>
        {allCategories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            className={activeCategory === category ? "bg-neon text-dark-300" : "text-gray-300"}
            onClick={() => filterProjects(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProjects.map((project) => (
          <div 
            key={project.id} 
            className="glass-card overflow-hidden group transition-all duration-300 hover:border-neon"
          >
            <div className="h-48 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-dark-300 to-transparent z-10"></div>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            
            <div className="p-5">
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-4 h-16 overflow-hidden">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 text-xs font-mono bg-dark-300 text-neon rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-3">
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-white bg-neon hover:bg-neon/80 px-3 py-2 rounded text-sm transition-colors"
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Live Demo
                  </a>
                )}
                
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-white bg-dark-300 hover:bg-dark-200 px-3 py-2 rounded text-sm transition-colors"
                  >
                    <Github size={14} className="mr-1" />
                    Code
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Button variant="outline" className="border-neon text-neon hover:bg-neon/10">
          View All Projects
        </Button>
      </div>
    </section>
  );
};

export default ProjectsSection;

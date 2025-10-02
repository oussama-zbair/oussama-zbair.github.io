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
      description: "Full-stack insurance platform with user roles, subscriptions, claims, and admin dashboards. Developed for real-world business needs during final-year internship.",
      image: "https://images.unsplash.com/photo-1611645149402-b7f87a1f158f?auto=format&fit=crop&w=600&q=80",
      technologies: ["Spring Boot", "React", "PostgreSQL", "JWT", "Docker"],
      githubUrl: "https://github.com/oussama-zbair/insurance-platform",
      category: ["Full-Stack", "Web"]
    },
    {
      id: 2,
      title: "Document Management System (Desktop App)",
      description: "Internal tool for managing user access and organizing government documents with search and activity tracking features.",
      image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=600&q=80",
      technologies: ["Electron.js", "React", "Node.js"],
      githubUrl: "https://github.com/oussama-zbair/desktop-doc-manager",
      category: ["Desktop", "Full-Stack"]
    },
    {
      id: 3,
      title: "ImgBGRemoval – AI Background Remover",
      description: "AI web app that removes image backgrounds using U²-Net deep learning model. Built with Flask and OpenCV.",
      image: "https://images.unsplash.com/photo-1549921296-3a6b1525cbe4?auto=format&fit=crop&w=600&q=80",
      technologies: ["Python", "Flask", "PyTorch", "OpenCV"],
      demoUrl: "",
      githubUrl: "https://github.com/oussama-zbair/ImgBGRemoval",
      category: ["AI", "Web"]
    },
    {
      id: 4,
      title: "CurrencyXchange – Real-Time Converter",
      description: "Real-time currency converter with geolocation, country flag support, and exchange rate API integration.",
      image: "https://images.unsplash.com/photo-1588776814546-0fef3d9a6d67?auto=format&fit=crop&w=600&q=80",
      technologies: ["Spring Boot", "React", "REST API", "Geolocation"],
      githubUrl: "https://github.com/oussama-zbair/RealTime-CurrencyConverter",
      category: ["Web", "Finance", "Full-Stack"],
      demoUrl: "https://green-sea-0ad5cce03.1.azurestaticapps.net/",
    

    },
    {
      id: 5,
      title: "Weather App",
      description: "Modern weather forecast app using OpenWeatherMap and Mapbox for geolocation, weather data, and visuals.",
      image: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=600&q=80",
      technologies: ["Next.js", "Tailwind", "OpenWeatherMap", "Mapbox"],
      githubUrl: "https://github.com/oussama-zbair/weather-app",
      category: ["Frontend", "Web"],
      demoUrl: "https://weather-app-rouge.vercel.app/"
    }
  ];

  const allCategories = Array.from(new Set(projects.flatMap(project => project.category)));
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visibleProjects, setVisibleProjects] = useState(projects);

  const filterProjects = (category: string | null) => {
    setActiveCategory(category);
    setVisibleProjects(category ? projects.filter(p => p.category.includes(category)) : projects);
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
          <div key={project.id} className="glass-card overflow-hidden group transition-all duration-300 hover:border-neon">
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
                  <span key={index} className="px-2 py-1 text-xs font-mono bg-dark-300 text-neon rounded">
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

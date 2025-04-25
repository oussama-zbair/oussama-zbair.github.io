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
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform with user authentication, product management, cart functionality, and payment integration.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Redux"],
      demoUrl: "https://demo.example.com",
      githubUrl: "https://github.com/oussama-zbair/ecommerce-platform",
      category: ["Web", "Full-Stack"]
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, task assignments, and project tracking.",
      image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      technologies: ["React", "Firebase", "Tailwind CSS", "TypeScript"],
      githubUrl: "https://github.com/oussama-zbair/task-manager",
      category: ["Web", "Frontend"]
    },
    {
      id: 3,
      title: "Real Estate Analytics",
      description: "A data visualization dashboard for real estate metrics with market trends analysis.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      technologies: ["Next.js", "D3.js", "PostgreSQL", "Express"],
      demoUrl: "https://real-estate-analytics.example.com",
      category: ["Data", "Web"]
    },
    {
      id: 4,
      title: "Social Media API",
      description: "A RESTful API for social media applications with authentication, feed generation, and content management.",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      technologies: ["Node.js", "Express", "MongoDB", "JWT", "Socket.io"],
      githubUrl: "https://github.com/oussama-zbair/social-media-api",
      category: ["Backend", "API"]
    },
    {
      id: 5,
      title: "Weather Forecast App",
      description: "A mobile-friendly weather application with location detection and 5-day forecasts.",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      technologies: ["React", "OpenWeather API", "Geolocation API", "CSS Animations"],
      demoUrl: "https://weather.example.com",
      githubUrl: "https://github.com/oussama-zbair/weather-app",
      category: ["Web", "Frontend"]
    },
    {
      id: 6,
      title: "DevOps Toolkit",
      description: "A collection of automation scripts and tools for streamlining development workflows and CI/CD pipelines.",
      image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      technologies: ["Python", "Bash", "Docker", "Terraform", "GitHub Actions"],
      githubUrl: "https://github.com/oussama-zbair/devops-toolkit",
      category: ["DevOps", "Tools"]
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

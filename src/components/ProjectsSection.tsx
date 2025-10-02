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
      title: "Insurance Management Platform (PFE)",
      description:
        "Multi-role insurance management platform for electronic and appliance coverage. Features JWT auth, 2FA, device registration, claims, admin dashboard, and secure CI/CD deployment.",
      image: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d2?auto=format&fit=crop&w=600&q=80",
      technologies: ["Spring Boot", "React", "JWT", "Firebase", "Docker", "PostgreSQL"],
      githubUrl: "https://github.com/oussama-zbair/insurance-platform",
      category: ["Full-Stack", "Security", "DevOps"]
    },
    {
      id: 2,
      title: "Document Management System (DMS)",
      description:
        "Desktop app for document workflow, advanced search, and user access control. Developed for the Moroccan Ministry of Interior using Electron.js and deployed on Windows servers.",
      image: "https://images.unsplash.com/photo-1537432376769-00a5f1be3cbb?auto=format&fit=crop&w=600&q=80",
      technologies: ["Electron.js", "React", "Node.js", "MySQL", "Socket.io"],
      githubUrl: "https://github.com/oussama-zbair/desktop-doc-manager",
      category: ["Desktop", "Full-Stack"]
    },
    {
      id: 3,
      title: "CurrencyXchange",
      description:
        "Real-time currency converter with geolocation and dynamic exchange rate data. Frontend built with React, backend Spring Boot WebFlux, deployed on Azure with CI/CD.",
      image: "https://images.unsplash.com/photo-1588776814546-0fef3d9a6d67?auto=format&fit=crop&w=600&q=80",
      technologies: ["Spring Boot", "React", "WebFlux", "REST API", "Azure"],
      demoUrl: "https://green-sea-0ad5cce03.1.azurestaticapps.net/",
      githubUrl: "https://github.com/oussama-zbair/CurrencyXchange-Backend",
      category: ["Finance", "Full-Stack"]
    },
    {
      id: 4,
      title: "ImgBGRemoval",
      description:
        "AI-powered image background remover using Flask and U²-Net deep learning. Upload an image, remove the background, and download the result instantly.",
      image: "https://images.unsplash.com/photo-1580894732444-8ecded7900c8?auto=format&fit=crop&w=600&q=80",
      technologies: ["Python", "Flask", "PyTorch", "OpenCV"],
      demoUrl: "",
      githubUrl: "https://github.com/oussama-zbair/ImgBGRemoval",
      category: ["AI", "Web"]
    },
    {
      id: 5,
      title: "QuizMaster",
      description:
        "Gamified quiz app with real-time scoring and category-based learning. Built with modern React stack and animated UI. Future plans: backend quiz builder.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80",
      technologies: ["React", "Vite", "TypeScript", "Tailwind", "Framer Motion"],
      demoUrl: "https://quiz-master-dojo.vercel.app/",
      githubUrl: "https://github.com/oussama-zbair/QuizMaster",
      category: ["Frontend", "Learning"]
    },
    {
      id: 6,
      title: "ClassroomLite",
      description:
        "Student-teacher assignment submission and grading system developed using Django and SQLite. Clean UI, secure role-based access, and feedback workflows.",
      image: "https://images.unsplash.com/photo-1584697964154-33ad5d07ef0e?auto=format&fit=crop&w=600&q=80",
      technologies: ["Django", "SQLite", "Bootstrap", "jQuery"],
      githubUrl: "https://github.com/oussama-zbair/ClassroomLite",
      category: ["Education", "Full-Stack"]
    },
    {
      id: 7,
      title: "Vulnerability Score Prediction (ML)",
      description:
        "Machine learning project predicting vulnerability scores using Random Forest, SVM, and Neural Networks. Includes Jupyter notebooks and visual analysis.",
      image: "https://images.unsplash.com/photo-1581091870632-2c4464c14299?auto=format&fit=crop&w=600&q=80",
      technologies: ["Python", "scikit-learn", "TensorFlow", "pandas"],
      githubUrl: "https://github.com/oussama-zbair/vulnerability-detection-notebook",
      category: ["ML", "Security"]
    },
    {
      id: 8,
      title: "Weather App",
      description:
        "Interactive weather forecast platform using Next.js, Mapbox and OpenWeatherMap. Explore weather worldwide via geolocation and dynamic maps.",
      image: "https://images.unsplash.com/photo-1611866098054-1d0858d16d6d?auto=format&fit=crop&w=600&q=80",
      technologies: ["Next.js", "Mapbox", "OpenWeatherMap", "Tailwind"],
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

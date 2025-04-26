
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-200 py-10 border-t border-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-gray-300">
              &copy; {currentYear} Oussama Zbair. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Software Engineer | Full Stack Developer
            </p>
          </div>
          
          <div className="mt-8 md:mt-0">
            <div className="flex justify-center md:justify-end space-x-6">
              <a 
                href="https://github.com/oussama-zbair"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-neon" 
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/oussama-zbair"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-neon"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:contact@oussamazbair.com"
                className="text-gray-400 hover:text-neon"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Mail } from 'lucide-react';
import { sameAsUrls } from '@/config/seo';
import { identifyPlatform } from '@/lib/platform';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Filter out malformed URLs
  const validLinks = sameAsUrls.filter(entry => {
    try {
      new URL(entry.url);
      return true;
    } catch {
      return false;
    }
  });

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
            {validLinks.length > 0 && (
              <div className="flex flex-wrap justify-center md:justify-end gap-4">
                {validLinks.map((entry) => {
                  const platform = identifyPlatform(entry.url);
                  const Icon = platform.icon;

                  return (
                    <a
                      key={entry.url}
                      href={entry.url}
                      target="_blank"
                      rel="me noopener noreferrer"
                      className="text-gray-400 hover:text-neon transition-colors"
                      aria-label={platform.name}
                      title={platform.name}
                    >
                      {Icon ? <Icon size={18} /> : (
                        <span className="text-xs font-medium">{platform.name}</span>
                      )}
                    </a>
                  );
                })}
                <a
                  href="mailto:contact@oussamazbair.engineer"
                  className="text-gray-400 hover:text-neon transition-colors"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

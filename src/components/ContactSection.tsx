
import React, { useState } from 'react';
import { Mail, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';
import { InlineWidget } from 'react-calendly';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [showCalendly, setShowCalendly] = useState(false);

 
  const CALENDLY_URL = 'https://calendly.com/oussama-zbair';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const toggleCalendly = () => {
    setShowCalendly(!showCalendly);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaToken) {
      toast({
        title: "Verification Required",
        description: "Please complete the reCAPTCHA verification.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      
      
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="section-container">
      <div className="flex items-center justify-center mb-12">
        <Mail size={24} className="text-neon mr-3 animate-pulse-neon" />
        <h2 className="section-title mb-0">Get In Touch</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Let's Connect</h3>
          <p className="text-gray-300 mb-6">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            Feel free to reach out using the form or through social links.
          </p>
          
          <div className="glass-card p-6 mb-6">
            <h4 className="text-lg font-bold text-white mb-4">Contact Information</h4>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Email</p>
                <p className="text-neon">contact@oussamazbair.com</p>
              </div>
              <div>
                <p className="text-gray-400">Location</p>
                <p className="text-white">Morocco</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6">
            <h4 className="text-lg font-bold text-white mb-4">Schedule a Meeting</h4>
            <p className="text-gray-300 mb-4">
              Want to discuss a project or just have a chat? Schedule a virtual meeting directly on my calendar.
            </p>
            <Button 
              className="bg-purple hover:bg-purple/80 text-white w-full mb-4"
              onClick={toggleCalendly}
            >
              <Calendar size={18} className="mr-2" />
              {showCalendly ? "Hide Calendar" : "Book a Time Slot"}
            </Button>
            
            {showCalendly ? (
              <div className="rounded-lg overflow-hidden glass-card mt-4">
                <InlineWidget 
                  url={CALENDLY_URL}
                  styles={{
                    height: '630px',
                    minWidth: '320px'
                  }}
                />
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center mt-2">
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="text-neon hover:underline">
                  Direct link to my calendar
                </a>
              </p>
            )}
          </div>
        </div>
        
        <div className="glass-card p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-white mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-dark-300 border border-dark-100 rounded px-4 py-2 text-white focus:border-neon focus:outline-none transition-colors"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-white mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-dark-300 border border-dark-100 rounded px-4 py-2 text-white focus:border-neon focus:outline-none transition-colors"
                required
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-white mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-dark-300 border border-dark-100 rounded px-4 py-2 text-white focus:border-neon focus:outline-none transition-colors"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-white mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full bg-dark-300 border border-dark-100 rounded px-4 py-2 text-white focus:border-neon focus:outline-none transition-colors resize-none"
                required
              />
            </div>
            
           
            <Button 
              type="submit"
              className="bg-neon hover:bg-neon/80 text-dark-300 w-full"
              disabled={isSubmitting || !captchaToken}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

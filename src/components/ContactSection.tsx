
import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            <Button className="bg-purple hover:bg-purple/80 text-white w-full">
              Book a Time Slot
            </Button>
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
              disabled={isSubmitting}
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

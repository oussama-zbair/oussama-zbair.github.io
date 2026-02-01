import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin, Calendar, Send, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfo, socialLinks } from '@/data/portfolio';
import { contactFormSchema, type ContactFormData, isRateLimited, sanitizeText } from '@/lib/validation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import FloatingSection from './FloatingSection';
import GlassCard from './GlassCard';
import { InlineWidget } from 'react-calendly';

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/mzdvrrww';

const ContactPortal: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const toggleCalendly = () => {
    setShowCalendly(!showCalendly);
  };

  const onSubmit = async (data: ContactFormData) => {
    // Rate limiting check
    if (isRateLimited('contact-form', 3, 60000)) {
      toast({
        title: 'Too many requests',
        description: 'Please wait a moment before submitting again.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Sanitize inputs
      const sanitizedData = {
        name: sanitizeText(data.name),
        email: sanitizeText(data.email),
        subject: sanitizeText(data.subject),
        message: sanitizeText(data.message),
      };

      console.log('🔧 Contact Form Debug:');
      console.log('Formspree Endpoint:', FORMSPREE_ENDPOINT);
      console.log('Form Data:', sanitizedData);

      // Send via Formspree
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });

      console.log('📧 Formspree Response:', response.status, response.statusText);

      if (response.ok) {
        console.log('✅ Contact form sent successfully');
        toast({
          title: '✅ Message Sent!',
          description: "Thank you! I'll get back to you soon.",
        });
        reset();
      } else {
        const errorText = await response.text();
        console.error('❌ Formspree error:', errorText);
        toast({
          title: '❌ Failed to Send',
          description: 'Please try again or contact me directly.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      toast({
        title: '❌ Network Error',
        description: 'Please check your connection or try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const linkedInUrl = socialLinks.find(s => s.name === 'LinkedIn')?.url || '#';
  const githubUrl = socialLinks.find(s => s.name === 'GitHub')?.url || '#';

  const contacts = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: 'primary',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect with me',
      href: linkedInUrl,
      color: 'info',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '@oussama-zbair',
      href: githubUrl,
      color: 'foreground',
    },
    {
      icon: Calendar,
      label: 'Schedule Meeting',
      value: 'Book a call',
      href: personalInfo.calendlyUrl,
      color: 'accent',
    },
  ];

  return (
    <FloatingSection className="min-h-screen flex items-center justify-center py-20 bg-background relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-primary tracking-[0.3em] uppercase">
            Contact
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 text-foreground">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            Ready to build something amazing together? Reach out through any of these portals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Contact Links */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contacts.map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="block"
                >
                  <GlassCard className="text-center h-full hover:border-primary/30 transition-all">
                    <div 
                      className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
                      style={{ 
                        backgroundColor: `hsl(var(--${contact.color}) / 0.1)`,
                        borderColor: `hsl(var(--${contact.color}) / 0.2)`
                      }}
                    >
                      <contact.icon 
                        className="w-6 h-6"
                        style={{ color: `hsl(var(--${contact.color}))` }}
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {contact.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {contact.value}
                    </p>
                  </GlassCard>
                </motion.a>
              ))}
            </div>

            {/* Calendar Widget */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Schedule a Meeting</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Want to discuss a project? Book a virtual meeting directly.
                </p>
                <Button
                  onClick={toggleCalendly}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mb-4"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {showCalendly ? "Hide Calendar" : "Book a Time Slot"}
                </Button>
                {showCalendly && (
                  <div className="rounded-lg overflow-hidden">
                    <InlineWidget 
                      url={personalInfo.calendlyUrl}
                      styles={{
                        height: '600px',
                        minWidth: '100%'
                      }}
                    />
                  </div>
                )}
              </GlassCard>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="bg-background/50 border-border focus:border-primary"
                      {...register('name')}
                      aria-invalid={errors.name ? 'true' : 'false'}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="bg-background/50 border-border focus:border-primary"
                      {...register('email')}
                      aria-invalid={errors.email ? 'true' : 'false'}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="What's this about?"
                    className="bg-background/50 border-border focus:border-primary"
                    {...register('subject')}
                    aria-invalid={errors.subject ? 'true' : 'false'}
                  />
                  {errors.subject && (
                    <p className="text-xs text-destructive">{errors.subject.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    rows={5}
                    className="bg-background/50 border-border focus:border-primary resize-none"
                    {...register('message')}
                    aria-invalid={errors.message ? 'true' : 'false'}
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </GlassCard>
          </motion.div>
        </div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{personalInfo.location}</span>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-20 pt-8 border-t border-border/20"
        >
          <p className="text-xs text-muted-foreground font-mono">
            © 2026 {personalInfo.firstName} {personalInfo.lastName} • Crafted with precision
          </p>
        </motion.footer>
      </div>
    </FloatingSection>
  );
};

export default ContactPortal;

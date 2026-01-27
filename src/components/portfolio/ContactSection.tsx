import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Calendar, ExternalLink, Loader2, Github, Linkedin, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { contactFormSchema, type ContactFormData, isRateLimited, sanitizeText } from '@/lib/validation';
import { personalInfo, socialLinks } from '@/data/portfolio';
import { InlineWidget } from 'react-calendly';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xdkgbznv';

const ContactSection: React.FC = () => {
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

      // Send via Formspree
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });

      if (response.ok) {
        toast({
          title: '✅ Message Sent!',
          description: "Thank you! I'll get back to you soon.",
        });
        reset();
      } else {
        toast({
          title: '❌ Failed to Send',
          description: 'Please try again or contact me directly.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: '❌ Network Error',
        description: 'Please check your connection or try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'github':
        return <Github className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      default:
        return <ExternalLink className="h-5 w-5" />;
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative bg-muted/20">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <Mail size={24} className="text-primary mr-3 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold terminal-heading">Get In Touch</h2>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-4">Let's Connect</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision. 
                Feel free to reach out using the form or through social links.
              </p>
            </div>

            {/* Schedule Meeting Card */}
            <div className="glass-card rounded-xl p-6 space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Schedule a Meeting</h4>
              <p className="text-sm text-muted-foreground">
                Want to discuss a project or just have a chat? Schedule a virtual meeting directly on my calendar.
              </p>
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={toggleCalendly}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {showCalendly ? "Hide Calendar" : "Book a Time Slot"}
              </Button>
              {showCalendly ? (
                <div className="rounded-lg overflow-hidden glass-card mt-4">
                  <InlineWidget 
                    url={personalInfo.calendlyUrl}
                    styles={{
                      height: '630px',
                      minWidth: '320px'
                    }}
                  />
                </div>
              ) : (
                <a
                  href={personalInfo.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <span>Direct link to my calendar</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl glass-card hover:border-primary/30 transition-all group"
                  aria-label={link.name}
                >
                  <span className="text-muted-foreground group-hover:text-primary transition-colors">
                    {getSocialIcon(link.name)}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="glass-card rounded-xl p-6 space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    className="bg-secondary/50 border-border focus:border-primary"
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
                    className="bg-secondary/50 border-border focus:border-primary"
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
                  className="bg-secondary/50 border-border focus:border-primary"
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
                  className="bg-secondary/50 border-border focus:border-primary resize-none"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

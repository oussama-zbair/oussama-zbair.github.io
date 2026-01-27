import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Calendar, Loader2, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BentoCard } from './BentoGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { contactFormSchema, type ContactFormData, isRateLimited, sanitizeText } from '@/lib/validation';
import { personalInfo } from '@/data/portfolio';

const ContactCard: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
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
      const sanitizedData = {
        name: sanitizeText(data.name),
        email: sanitizeText(data.email),
        subject: sanitizeText(data.subject),
        message: sanitizeText(data.message),
      };

      const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
        sanitizedData.subject
      )}&body=${encodeURIComponent(
        `Name: ${sanitizedData.name}\nEmail: ${sanitizedData.email}\n\n${sanitizedData.message}`
      )}`;

      window.open(mailtoLink, '_blank');
      toast({
        title: 'Email client opened!',
        description: 'Please send the email from your email client.',
      });
      reset();
      setShowForm(false);
    } catch {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showForm) {
    return (
      <BentoCard colSpan={2} rowSpan={1} variant="gradient" className="p-6">
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Contact</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Let's work together</h3>
            <p className="text-sm text-muted-foreground">Have a project in mind? Let's create something amazing.</p>
          </div>

          <div className="flex gap-3 mt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium"
            >
              <Send className="w-4 h-4" />
              Message me
            </motion.button>
            <motion.a
              href={personalInfo.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-foreground text-sm font-medium"
            >
              <Calendar className="w-4 h-4" />
              Schedule
            </motion.a>
          </div>
        </div>
      </BentoCard>
    );
  }

  return (
    <BentoCard colSpan={2} rowSpan={2} variant="gradient" className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Message</span>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            ← Back
          </button>
        </div>

        <div className="space-y-3 flex-1">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input
                placeholder="Name"
                className="bg-secondary/50 border-border text-sm"
                {...register('name')}
              />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <Input
                placeholder="Email"
                type="email"
                className="bg-secondary/50 border-border text-sm"
                {...register('email')}
              />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
            </div>
          </div>
          <div>
            <Input
              placeholder="Subject"
              className="bg-secondary/50 border-border text-sm"
              {...register('subject')}
            />
            {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject.message}</p>}
          </div>
          <div className="flex-1">
            <Textarea
              placeholder="Your message..."
              className="bg-secondary/50 border-border text-sm resize-none h-24"
              {...register('message')}
            />
            {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 bg-primary text-primary-foreground"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Send <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </form>
    </BentoCard>
  );
};

export default ContactCard;

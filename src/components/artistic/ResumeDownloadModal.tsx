import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, User, Mail, Briefcase, Loader2, Check, AlertCircle } from 'lucide-react';
import { z } from 'zod';
import { generateResumePDF } from '@/lib/generateResume';
import { sendVisitorInfo } from '@/lib/emailService';
import MathCaptcha from './MathCaptcha';

// Allowed email domains for security - only trusted providers
const ALLOWED_EMAIL_DOMAINS = [
  // Google
  'gmail.com',
  'googlemail.com',
  // Microsoft
  'outlook.com',
  'hotmail.com',
  'live.com',
  'msn.com',
  'hotmail.co.uk',
  'hotmail.fr',
  'outlook.fr',
  'live.fr',
  // Yahoo
  'yahoo.com',
  'yahoo.fr',
  'yahoo.co.uk',
  'ymail.com',
  'rocketmail.com',
  // Apple
  'icloud.com',
  'me.com',
  'mac.com',
  // Other major providers
  'protonmail.com',
  'proton.me',
  'aol.com',
  'mail.com',
  'zoho.com',
  'gmx.com',
  'gmx.fr',
  'yandex.com',
  'tutanota.com',
  'fastmail.com',
  // French providers
  'orange.fr',
  'wanadoo.fr',
  'free.fr',
  'sfr.fr',
  'laposte.net',
  'bbox.fr',
];

// Only allow specific trusted domains + educational/government
const isAllowedDomain = (email: string): boolean => {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;
  
  // Allow specific trusted email providers
  if (ALLOWED_EMAIL_DOMAINS.includes(domain)) return true;
  
  // Allow educational and government domains (harder to fake)
  if (domain.endsWith('.edu') || domain.endsWith('.gov')) return true;
  
  // Block everything else - no generic .com/.org/.io allowed
  return false;
};

// Validation schema
const downloadFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name must be less than 100 characters' })
    .regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, {
      message: 'Name can only contain letters, spaces, hyphens, and apostrophes',
    }),
  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email address' })
    .max(255, { message: 'Email must be less than 255 characters' })
    .refine(isAllowedDomain, {
      message: 'Please use a valid email (Gmail, Outlook, Yahoo, corporate, or educational)',
    }),
  role: z.enum(['recruiter', 'hr', 'hiring_manager', 'developer', 'other'], {
    errorMap: () => ({ message: 'Please select your role' }),
  }),
});

type DownloadFormData = z.infer<typeof downloadFormSchema>;

interface ResumeDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const roleOptions = [
  { value: 'recruiter', label: 'Recruiter', icon: '🎯' },
  { value: 'hr', label: 'HR Professional', icon: '👔' },
  { value: 'hiring_manager', label: 'Hiring Manager', icon: '📋' },
  { value: 'developer', label: 'Fellow Developer', icon: '💻' },
  { value: 'other', label: 'Other', icon: '👤' },
];

const ResumeDownloadModal: React.FC<ResumeDownloadModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<Partial<DownloadFormData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleInputChange = (field: keyof DownloadFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Check CAPTCHA first
    if (!isCaptchaVerified) {
      setErrors({ captcha: 'Please complete the security verification' });
      return;
    }

    // Validate form
    const result = downloadFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Send visitor information to your email/webhook services
      await sendVisitorInfo({
        name: result.data.fullName,
        email: result.data.email,
        role: result.data.role,
        timestamp: new Date().toISOString(),
      });

      // Generate and download the PDF
      generateResumePDF();
      setIsComplete(true);
      
      // Close modal after showing success
      setTimeout(() => {
        onClose();
        // Reset state for next time
        setTimeout(() => {
          setFormData({});
          setIsComplete(false);
        }, 300);
      }, 1500);
    } catch (error) {
      console.error('Failed to process download:', error);
      
      // Still allow download even if notification fails
      try {
        generateResumePDF();
        setIsComplete(true);
        
        setTimeout(() => {
          onClose();
          setTimeout(() => {
            setFormData({});
            setIsComplete(false);
          }, 300);
        }, 1500);
      } catch (pdfError) {
        console.error('Failed to generate PDF:', pdfError);
        setErrors({ submit: 'Failed to generate resume. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setTimeout(() => {
        setFormData({});
        setErrors({});
        setIsComplete(false);
        setIsCaptchaVerified(false);
      }, 300);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[9999]"
          />

          {/* Modal Container - handles scrolling */}
          <div className="fixed inset-0 z-[9999] overflow-y-auto">
            <div 
              className="flex min-h-full items-center justify-center p-4"
              onClick={handleClose}
            >
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
                  {/* Header */}
                  <div className="relative bg-gradient-to-r from-primary to-accent p-6 text-primary-foreground">
                    <button
                      onClick={handleClose}
                      disabled={isSubmitting}
                      className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Download className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Download Resume</h2>
                        <p className="text-sm opacity-90">Please verify your identity</p>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {isComplete ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-8 text-center"
                      >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                          <Check className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">Download Started!</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Thank you for your interest
                        </p>
                      </motion.div>
                    ) : (
                      <>
                        {/* Full Name */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={formData.fullName || ''}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            placeholder="John Doe"
                            disabled={isSubmitting}
                            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground 
                              placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 
                              focus:border-primary transition-all disabled:opacity-50"
                          />
                          {errors.fullName && (
                            <p className="text-sm text-destructive flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.fullName}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={formData.email || ''}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="john@company.com"
                            disabled={isSubmitting}
                            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground 
                              placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 
                              focus:border-primary transition-all disabled:opacity-50"
                          />
                          {errors.email && (
                            <p className="text-sm text-destructive flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.email}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            Use Gmail, Outlook, Yahoo, or your corporate email
                          </p>
                        </div>

                        {/* Role */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-muted-foreground" />
                            Your Role
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {roleOptions.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => handleInputChange('role', option.value)}
                                disabled={isSubmitting}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all
                                  disabled:opacity-50 ${
                                    formData.role === option.value
                                      ? 'border-primary bg-primary/10 text-primary'
                                      : 'border-input bg-background text-foreground hover:border-primary/50'
                                  }`}
                              >
                                <span>{option.icon}</span>
                                <span>{option.label}</span>
                              </button>
                            ))}
                          </div>
                          {errors.role && (
                            <p className="text-sm text-destructive flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.role}
                            </p>
                          )}
                        </div>

                        {/* CAPTCHA Verification */}
                        <MathCaptcha
                          onVerify={setIsCaptchaVerified}
                          error={errors.captcha}
                          disabled={isSubmitting}
                        />

                        {/* Submit Error */}
                        {errors.submit && (
                          <p className="text-sm text-destructive text-center">{errors.submit}</p>
                        )}

                        {/* Submit Button */}
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-accent 
                            text-primary-foreground font-medium flex items-center justify-center gap-2
                            hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Generating PDF...</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-5 h-5" />
                              <span>Download Resume</span>
                            </>
                          )}
                        </motion.button>

                        <p className="text-xs text-center text-muted-foreground">
                          Your information is used only to track downloads and will not be shared.
                        </p>
                      </>
                    )}
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResumeDownloadModal;

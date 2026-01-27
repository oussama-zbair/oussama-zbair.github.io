import { z } from 'zod';

/**
 * OWASP-compliant input validation schemas
 * All user inputs must be validated before processing
 */

// Email validation with strict rules
export const emailSchema = z
  .string()
  .trim()
  .min(1, { message: 'Email is required' })
  .max(255, { message: 'Email must be less than 255 characters' })
  .email({ message: 'Please enter a valid email address' })
  .refine(
    (email) => !/<script|javascript:|data:|vbscript:/i.test(email),
    { message: 'Invalid email format' }
  );

// Name validation - prevent XSS and injection
export const nameSchema = z
  .string()
  .trim()
  .min(1, { message: 'Name is required' })
  .max(100, { message: 'Name must be less than 100 characters' })
  .regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, { 
    message: 'Name can only contain letters, spaces, hyphens, and apostrophes' 
  });

// Subject validation
export const subjectSchema = z
  .string()
  .trim()
  .min(1, { message: 'Subject is required' })
  .max(200, { message: 'Subject must be less than 200 characters' })
  .refine(
    (subject) => !/<script|javascript:|data:|vbscript:|onclick|onerror/i.test(subject),
    { message: 'Invalid characters in subject' }
  );

// Message validation with sanitization
export const messageSchema = z
  .string()
  .trim()
  .min(10, { message: 'Message must be at least 10 characters' })
  .max(2000, { message: 'Message must be less than 2000 characters' })
  .refine(
    (message) => !/<script|javascript:|data:|vbscript:|onclick|onerror|onload/i.test(message),
    { message: 'Invalid characters in message' }
  );

// Full contact form schema
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: subjectSchema,
  message: messageSchema,
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Sanitize HTML content to prevent XSS
 * For display-only text, strips all HTML tags
 */
export const sanitizeText = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
};

/**
 * Validate and sanitize URL parameters
 */
export const sanitizeUrl = (url: string): string => {
  try {
    const parsed = new URL(url);
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return '';
    }
    return parsed.toString();
  } catch {
    return '';
  }
};

/**
 * Rate limiting helper for client-side
 * Returns true if action should be blocked
 */
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export const isRateLimited = (
  key: string, 
  maxRequests: number = 5, 
  windowMs: number = 60000
): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now - record.timestamp > windowMs) {
    rateLimitMap.set(key, { count: 1, timestamp: now });
    return false;
  }

  if (record.count >= maxRequests) {
    return true;
  }

  record.count++;
  return false;
};

import { z } from "zod";

// --- 1. Lead Finder (The Scout) ---
export const LeadFinderRequestSchema = z.object({
  client_id: z.string().uuid(), // Assuming client IDs are UUIDs, adjust if needed
  icp: z.object({
    industry: z.array(z.string()).min(1),
    job_titles: z.array(z.string()).min(1),
    company_size: z.object({
      min: z.number().int().nonnegative(),
      max: z.number().int().positive(),
    }),
    location: z.array(z.string()).min(1),
  }),
  max_results: z.number().int().positive().max(100).default(10), // Set a reasonable cap
});

export const ContactSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  title: z.string(),
  email: z.string().email(),
  is_verified: z.boolean().default(false),
});

export const LeadSchema = z.object({
  lead_id: z.string().uuid(),
  business_name: z.string(),
  website: z.string().url(),
  linkedin_url: z.string().url().optional(), // Might not always have LinkedIn
  contacts: z.array(ContactSchema),
});

export const LeadFinderResponseSchema = z.object({
  status: z.enum(["success", "error"]),
  data: z.object({
    leads: z.array(LeadSchema),
  }).optional(),
  error: z.string().optional(),
  metadata: z.object({
    search_credits_used: z.number().int().nonnegative(),
    source: z.string(),
  }).optional(),
});

// --- 2. Intel Scraper (The Researcher) ---
export const IntelScraperRequestSchema = z.object({
  lead_id: z.string().uuid(),
  business_name: z.string(),
  website: z.string().url(),
  linkedin_url: z.string().url().optional(),
});

export const ProspectAuditSchema = z.object({
  company_overview: z.string(),
  recent_news: z.array(z.string()),
  buying_signals: z.array(z.string()),
  identified_pain_points: z.array(z.string()),
  tech_stack: z.array(z.string()),
  personalization_hooks: z.array(z.string()),
});

export const IntelScraperResponseSchema = z.object({
  status: z.enum(["success", "error"]),
  data: z.object({
    prospect_audit: ProspectAuditSchema,
  }).optional(),
  error: z.string().optional(),
});

// --- 3. Demo Builder (The Creator) ---
export const DemoBuilderRequestSchema = z.object({
  lead_id: z.string().uuid(),
  business_name: z.string(),
  contact_name: z.string(),
  prospect_audit: z.object({
    pain_points: z.array(z.string()),
    tech_stack: z.array(z.string()),
    personalization_hooks: z.array(z.string()),
  }),
  offer_template_id: z.string(),
});

export const DemoBuilderResponseSchema = z.object({
  status: z.enum(["success", "error"]),
  data: z.object({
    demo_url: z.string().url(),
    thumbnail_url: z.string().url().optional(),
    customized_points: z.array(z.string()),
  }).optional(),
  error: z.string().optional(),
});

// --- 4. Email Sender (The Communicator) ---
export const EmailSenderRequestSchema = z.object({
  lead_id: z.string().uuid(),
  contact: z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
  }),
  context: z.object({
    personalization_hooks: z.array(z.string()),
    demo_url: z.string().url(),
    business_name: z.string(),
  }),
  campaign_id: z.string(),
});

export const EmailSenderResponseSchema = z.object({
  status: z.enum(["success", "error"]),
  data: z.object({
    email_id: z.string(), // ID from email provider (e.g., ActiveCampaign)
    subject_line_used: z.string(),
    email_body_used: z.string(),
    dispatched_at: z.string().datetime(), // ISO 8601 string
  }).optional(),
  error: z.string().optional(),
});

// Type Exports for use across the application
export type LeadFinderRequest = z.infer<typeof LeadFinderRequestSchema>;
export type LeadFinderResponse = z.infer<typeof LeadFinderResponseSchema>;
export type IntelScraperRequest = z.infer<typeof IntelScraperRequestSchema>;
export type IntelScraperResponse = z.infer<typeof IntelScraperResponseSchema>;
export type DemoBuilderRequest = z.infer<typeof DemoBuilderRequestSchema>;
export type DemoBuilderResponse = z.infer<typeof DemoBuilderResponseSchema>;
export type EmailSenderRequest = z.infer<typeof EmailSenderRequestSchema>;
export type EmailSenderResponse = z.infer<typeof EmailSenderResponseSchema>;

import { z } from 'zod';

// Define your custom type if needed
// For example, if ICountry is an enum or string, define it accordingly
// Replace this with the actual type or enum
const ICountry = z.string(); // Adjust this if needed

// Create schema
const universityCreateSchemaValidation = z.object({
  body: z.object({
    name: z.string(),
    country: z.string(),
    logo: z.string().optional(),
    website: z.string().optional(),
    description: z.string().optional(),
    ranking: z.number().optional(),
    type: z.string().optional(), // e.g., Public, Private
    programsOffered: z.array(z.string()).optional(), // List of programs or courses offered
    duration: z.string().optional(), // Typical duration of programs
    admissionRequirements: z.array(z.string()).optional(), // List of admission requirements
    tuitionFees: z.number().optional(), // Average tuition fees
    shortDescription: z.string().optional(),
  }),
});

// Update schema (all fields optional)
const universityUpdateSchemaValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    country: ICountry.optional(),
    logo: z.string().optional(),
    website: z.string().optional(),
    description: z.string().optional(),
    ranking: z.number().optional(),
    type: z.string().optional(),
    programsOffered: z.array(z.string()).optional(),
    duration: z.string().optional(),
    admissionRequirements: z.array(z.string()).optional(),
    tuitionFees: z.number().optional(),
    shortDescription: z.string().optional(),
  }),
});

export const UniversityValidations = {
  universityCreateSchemaValidation,
  universityUpdateSchemaValidation,
};

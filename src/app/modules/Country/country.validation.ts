import { z } from 'zod';
const createCountry = z.object({
  body: z.object({
    name: z.string().min(1, 'Country name is required'),
    flagUrl: z.string().url('Invalid URL format for flag').optional(),
    continent: z.string().min(1, 'Continent is required').optional(),
  }),
});

export const CountryValidations = {
  createCountryValidation: createCountry,
};

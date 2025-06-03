import { ICountry } from '../Country/country.interface';

export interface IUniversity {
  uid: string;
  name: string;
  country: ICountry;
  logo?: string;
  website?: string;
  description?: string;
  ranking?: number;
  type?: string; // e.g., Public, Private
  programsOffered?: string[]; // List of programs or courses offered
  duration?: string; // Typical duration of programs
  admissionRequirements?: string[]; // List of admission requirements
  tuitionFees?: number; // Average tuition fees
  shortDescription?: string;
}

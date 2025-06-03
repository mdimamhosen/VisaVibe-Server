import { ICountry } from './country.interface';

const createCountry = async (payload: ICountry): Promise<ICountry> => {
  // TODO: Implement actual creation logic, for now just return the payload
  return payload;
};

export const CountryServices = {
  createCountry,
};

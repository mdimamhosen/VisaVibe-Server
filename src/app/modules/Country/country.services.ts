import AppError from '../../errors/appError';
import { IImageFile } from '../../interface/IImageFile';
import { ICountry } from './country.interface';
import Country from './country.model';

const createCountry = async (payload: ICountry, file: IImageFile) => {
  // TODO: Implement actual creation logic, for now just return the payload

  const createId = `C-${Date.now()}`;
  payload.cid = createId;

  console.log('Creating country with payload:', payload);

  const isCOuntryExists = await Country.findOne({
    name: payload.name,
  });
  if (isCOuntryExists) {
    throw new AppError(400, 'Country already exists');
  }

  if (file && file.path) {
    payload.flagUrl = file.path;
  }
  console.log('Creating country with payload:', payload);
  const country = new Country(payload);
  const createdCountry = await country.save();

  if (!createdCountry) {
    throw new AppError(400, 'Country creation failed');
  }
  if (createdCountry) {
    return createdCountry;
  }
};

const getAllCountries = async () => {
  const countries = await Country.find().populate('universities').exec();

  if (!countries || countries.length === 0) {
    throw new AppError(404, 'No countries found');
  }
  console.log('Countries fetched successfully:', countries.length);
  return countries;
};

const getCountryById = async (id: string) => {
  const country = await Country.findById(id).populate('universities').exec();
  if (!country) {
    throw new AppError(404, 'Country not found');
  }
  return country;
};

const deleteCountry = async (id: string) => {
  const country = await Country.findByIdAndDelete(id);
  if (!country) {
    throw new AppError(404, 'Country not found');
  }
  return country;
};

const updateCountry = async (id: string, payload: Partial<ICountry>, file: IImageFile) => {
  const country = await Country.findById(id);
  if (!country) {
    throw new AppError(404, 'Country not found');
  }
  if (file && file.path) {
    payload.flagUrl = file.path;
  }
  const updatedCountry = await Country.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
    .populate('universities')
    .exec();
  if (!updatedCountry) {
    throw new AppError(400, 'Country update failed');
  }
  return updatedCountry;
};

export const CountryServices = {
  createCountry,
  getAllCountries,
  getCountryById,
  deleteCountry,
  updateCountry,
};

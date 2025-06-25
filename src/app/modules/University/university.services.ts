import AppError from '../../errors/appError';
import { IImageFile } from '../../interface/IImageFile';
import Country from '../Country/country.model';
import { IUniversity } from './university.interface';
import University from './university.model';

const createUniversity = async (payload: IUniversity, file: IImageFile) => {
  const isUniversityExists = await University.findOne({ name: payload.name });
  if (isUniversityExists) {
    throw new AppError(400, 'University already exists');
  }

  if (file && file.path) {
    payload.logo = file.path;
  }

  const createId = `U-${Date.now()}`;
  payload.uid = createId;

  // Parse string to array if needed, then sanitize
  if (typeof payload.programsOffered === 'string') {
    try {
      payload.programsOffered = JSON.parse(payload.programsOffered);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      payload.programsOffered = [];
    }
  }

  if (Array.isArray(payload.programsOffered)) {
    payload.programsOffered = payload.programsOffered.filter(
      (item) => typeof item === 'string' && item.trim() !== ''
    );
  } else {
    payload.programsOffered = [];
  }

  // Same for admissionRequirements
  if (typeof payload.admissionRequirements === 'string') {
    try {
      payload.admissionRequirements = JSON.parse(payload.admissionRequirements);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      payload.admissionRequirements = [];
    }
  }

  if (Array.isArray(payload.admissionRequirements)) {
    payload.admissionRequirements = payload.admissionRequirements.filter(
      (item) => typeof item === 'string' && item.trim() !== ''
    );
  } else {
    payload.admissionRequirements = [];
  }

  const university = new University(payload);
  const createdUniversity = await university.save();
  await Country.findByIdAndUpdate(
    payload.country, // assuming `payload.country` contains the country ID
    {
      $push: { universities: createdUniversity._id },
    },
    { new: true }
  );

  if (!createdUniversity) {
    throw new AppError(400, 'University creation failed');
  }

  return createdUniversity;
};

const getAllUniversities = async () => {
  const universities = await University.find().populate('country').exec();

  if (!universities || universities.length === 0) {
    throw new AppError(404, 'No universities found');
  }
  return universities;
};

const getUniversityById = async (id: string) => {
  console.log(id);
  const university = await University.findById(id).populate('country').exec();
  if (!university) {
    throw new AppError(404, 'University not found');
  }
  return university;
};
const deleteUniversity = async (id: string) => {
  const university = await University.findByIdAndDelete(id);
  if (!university) {
    throw new AppError(404, 'University not found');
  }
  return university;
};

export const updateUniversity = async (
  id: string,
  payload: Partial<IUniversity>,
  file: IImageFile
) => {
  console.log('Updating university with ID:', id, 'and payload:', payload);
  const existingUniversity = await University.findById(id);
  if (!existingUniversity) {
    throw new AppError(404, 'University not found');
  }

  // Handle file upload (logo)
  if (file && file.path) {
    payload.logo = file.path;
  }

  // Parse stringified arrays if not already parsed (defensive check)
  if (typeof payload.programsOffered === 'string') {
    try {
      payload.programsOffered = JSON.parse(payload.programsOffered);
    } catch {
      payload.programsOffered = [];
    }
  }

  if (typeof payload.admissionRequirements === 'string') {
    try {
      payload.admissionRequirements = JSON.parse(payload.admissionRequirements);
    } catch {
      payload.admissionRequirements = [];
    }
  }

  // Convert numeric fields if passed as strings
  if (payload.ranking && typeof payload.ranking === 'string') {
    payload.ranking = Number(payload.ranking);
  }
  if (payload.tuitionFees && typeof payload.tuitionFees === 'string') {
    payload.tuitionFees = Number(payload.tuitionFees);
  }

  // Perform the update
  const updatedUniversity = await University.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!updatedUniversity) {
    throw new AppError(400, 'University update failed');
  }

  return {
    success: true,
    message: 'University updated successfully',
    data: updatedUniversity,
  };
};
export const UniversityServices = {
  createUniversity,
  getAllUniversities,
  getUniversityById,
  deleteUniversity,
  updateUniversity,
};

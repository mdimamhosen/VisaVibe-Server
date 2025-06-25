import { IImageFile } from '../../interface/IImageFile';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CountryServices } from './country.services';

const createCountry = catchAsync(async (req, res) => {
  console.log('Request received for creating country:', req.body);
  const result = await CountryServices.createCountry(req.body, req.file as IImageFile);
  if (!result) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Country creation failed',
      data: null,
    });
    return;
  }
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Country created successfully',
    data: result,
  });
});

const getAllCountries = catchAsync(async (req, res) => {
  const result = await CountryServices.getAllCountries();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Countries retrieved successfully',
    data: result,
  });
});

const getCountryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CountryServices.getCountryById(id);
  if (!result) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Country not found',
      data: null,
    });
    return;
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Country retrieved successfully',
    data: result,
  });
});

const updateCountry = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CountryServices.updateCountry(id, req.body, req.file as IImageFile);
  if (!result) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Country not found',
      data: null,
    });
    return;
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Country updated successfully',
    data: result,
  });
});

const deleteCountry = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CountryServices.deleteCountry(id);
  if (!result) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Country not found',
      data: null,
    });
    return;
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Country deleted successfully',
    data: result,
  });
});

export const CountryController = {
  createCountry,
  getAllCountries,
  getCountryById,
  updateCountry,
  deleteCountry,
};

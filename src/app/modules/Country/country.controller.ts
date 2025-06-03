import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CountryServices } from './country.services';

const createCountry = catchAsync(async (req, res) => {
  const result = await CountryServices.createCountry(req.body);
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

export const CountryController = {
  createCountry,
};

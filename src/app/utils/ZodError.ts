import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

export const handleZodError = (error: ZodError): TGenericErrorResponse => {
  const statusCode = 400;

  const errorSources: TErrorSources = error.issues.map((issue: ZodIssue) => ({
    path: issue.path[issue.path.length - 1]?.toString() || 'unknown',
    message: issue.message,
  }));

  return {
    statusCode,
    message: 'Validation error',
    errorSources,
  };
};

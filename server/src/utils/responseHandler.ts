import { Response } from 'express';
import { HTTP_STATUS } from './constants.js';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message?: string,
  statusCode: number = HTTP_STATUS.OK
): Response => {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
  } as ApiResponse<T>);
};

export const sendError = (
  res: Response,
  error: string,
  statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR
): Response => {
  return res.status(statusCode).json({
    success: false,
    error,
  });
};

export const sendCreated = <T>(res: Response, data: T, message?: string): Response => {
  return sendSuccess(res, data, message, HTTP_STATUS.CREATED);
};

export const sendBadRequest = (res: Response, error: string): Response => {
  return sendError(res, error, HTTP_STATUS.BAD_REQUEST);
};

export const sendUnauthorized = (res: Response, error: string = 'Unauthorized'): Response => {
  return sendError(res, error, HTTP_STATUS.UNAUTHORIZED);
};

export const sendNotFound = (res: Response, error: string = 'Not found'): Response => {
  return sendError(res, error, HTTP_STATUS.NOT_FOUND);
};

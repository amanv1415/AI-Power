export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_EXISTS: 'User already exists',
  USER_NOT_FOUND: 'User not found',
  CONTENT_NOT_FOUND: 'Content not found',
  UNAUTHORIZED: 'Unauthorized access',
  INVALID_TOKEN: 'Invalid token',
  MISSING_TOKEN: 'No token provided',
  INTERNAL_ERROR: 'Internal server error',
  VALIDATION_ERROR: 'Validation failed',
};

export const SUCCESS_MESSAGES = {
  SIGNUP_SUCCESS: 'Account created successfully',
  SIGNIN_SUCCESS: 'Signed in successfully',
  CONTENT_CREATED: 'Content created successfully',
  CONTENT_UPDATED: 'Content updated successfully',
  CONTENT_ANALYZED: 'Content analyzed successfully',
};

export const CONTENT_TYPES = ['image', 'video', 'article', 'podcast'] as const;
export const SENTIMENT_TYPES = ['positive', 'neutral', 'negative', 'mixed'] as const;
export const THEME_TYPES = ['light', 'dark'] as const;

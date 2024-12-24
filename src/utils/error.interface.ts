export interface ValidationErrorProperty {
  message?: string;
  type?: string;
  [key: string]: unknown;
}

export interface ValidationErrorDetails {
  [key: string]: {
    message: string;
    name: string;
    properties?: ValidationErrorProperty;
    kind?: string;
    path?: string;
    value?: unknown;
  };
}

export interface ErrorDetails {
  name: string;
  message: string;
  stack?: string;
  errors?: ValidationErrorDetails;
}

export interface ErrorResponse {
  message: string;
  success: false;
  error: ErrorDetails | string;
  stack?: string;
}

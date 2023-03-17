import { AxiosError } from 'axios';

export type ErrorResponse = {
  errors?: string | string[];

  status?: number;
};

export type AxiosErrorResponse = AxiosError<{
  message?: string | string[];
}>;

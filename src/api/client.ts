import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AxiosErrorResponse } from '@/api/interfaces/clientTypes';

export default class Client {
  protected readonly axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.get<T>(url, config);
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(
        this.transformErrorResponse(e as AxiosErrorResponse),
      );
    }
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, config);
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(
        this.transformErrorResponse(e as AxiosErrorResponse),
      );
    }
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }

  protected transformErrorResponse(error: AxiosErrorResponse) {
    const { response } = error;
    return {
      errors: response?.data?.message,
      status: response?.status,
    };
  }
}

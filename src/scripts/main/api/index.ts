import { AppError } from 'Utils/Error';

export type Task = {
  name?: string;
  at?: string;
  duration?: number;
  start?: string;
  stop?: string;
};

export default class API {
  host: string;
  activeTaskUrl: string;
  loginUrl: string;
  signUpUrl: string;
  forgotPasswordUrl: string;
  updatePasswordUrl: string;

  constructor() {
    this.host = window.location.origin;
    this.activeTaskUrl = this.host + '/api/v1/activeTask';
    this.loginUrl = this.host + '/api/v1/login';
    this.signUpUrl = this.host + '/api/v1/signup';
    this.forgotPasswordUrl = this.host + '/api/v1/forgotPassword';
    this.updatePasswordUrl = this.host + '/api/v1/updatePassword';
  }

  createHeaders(method: string, headers: HeadersInit, data: BodyInit | null, token?: string): RequestInit {
    return {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
      body: data, // body data type must match "Content-Type" header
    };
  }

  async createErr(response: Response, message?: string) {
    if (!response.ok) {
      const resJson: { status: string; message: string; err: { statusCode: number; message: string } } =
        await response.json();
        
      const err: AppError = new AppError(message || resJson.message);
      err.response = response;
      err.statusCode = response.status;
      err.status = resJson.status;
      throw err;
    }
    return response;
  }
}

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
  tasksUrl: string;
  activeTaskUrl: string;
  loginUrl: string;
  signUpUrl: string;

  constructor() {
    this.host = 'http://localhost:3002';
    this.tasksUrl = this.host + '/api/v1/tasks';
    this.activeTaskUrl = this.host + '/api/v1/activeTask';
    this.loginUrl = this.host + '/api/v1/login';
    this.signUpUrl = this.host + '/api/v1/signup';
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
      const resJson: { status: string; message: string } = await response.json();
      const err: AppError = new AppError(message || resJson.message);
      err.response = response;
      err.statusCode = response.status;
      err.status = resJson.status;
      console.error(message || resJson.message);
      throw err;
    }
    return response;
  }
}

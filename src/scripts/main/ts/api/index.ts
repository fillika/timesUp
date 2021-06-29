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

  constructor() {
    this.host = 'http://localhost:22222';
    this.tasksUrl = this.host + '/api/v1/tasks1';
    this.activeTaskUrl = this.host + '/api/v1/activeTask';
    this.loginUrl = this.host + '/api/v1/login';
  }

  createHeaders(method: string, headers: HeadersInit, data: BodyInit | null, token?: string): RequestInit {
    return {
      method: method,
      headers: {
        Authorization: `Times ${token}`,
        ...headers,
      },
      body: data, // body data type must match "Content-Type" header
    };
  }

  createErr(response: Response, message: string) {
    if (!response.ok) {
      const err: AppError = new AppError(message);
      err.response = response;
      err.statusCode = response.status;
      throw err;
    }
    return response;
  }
}

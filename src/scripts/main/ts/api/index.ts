export interface CustomError extends Error {
  response?: Response;
  status?: number;
}

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
    this.tasksUrl = this.host + '/api/v1/tasks';
    this.activeTaskUrl = this.host + '/api/v1/activeTask';
    this.loginUrl = this.host + '/api/v1/login';
  }

  createErr(response: Response) {
    if (!response.ok) {
      const err: CustomError = new Error('HTTP status code: ' + response.status);
      err.response = response;
      err.status = response.status;
      throw err;
    }
    return response;
  }
}
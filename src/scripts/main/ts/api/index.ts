interface CustomError extends Error {
  response?: Response;
  status?: number;
}

type Task = {
  name?: string;
  at?: string;
  duration?: number;
  start?: string;
  stop?: string;
};

class API {
  host: string;
  tasksUrl: string;
  activeTaskUrl: string;

  constructor() {
    this.host = 'http://localhost:22222';
    this.tasksUrl = this.host + '/api/v1/tasks';
    this.activeTaskUrl = this.host + '/api/v1/activeTask';
  }

  async getAllTask(): Promise<any> {
    try {
      const response = await fetch(this.tasksUrl).then(this.createErr);
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async createTask(data = {}) {
    const headers: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    };

    try {
      const response = await fetch(this.tasksUrl, headers).then(this.createErr);
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async updateTask(id: string, data: Task = {}) {
    const url = this.tasksUrl + `/${id}`;

    const headers: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    };

    try {
      const response = await fetch(url, headers).then(this.createErr);
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async updateTaskByName(data: { name: string; date: string }) {
    const headers: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    };

    try {
      const response = await fetch(this.tasksUrl, headers).then(this.createErr);
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async deleteTaskByID(id: string) {
    const headers: RequestInit = {
      method: 'DELETE',
    };

    const urlWithID = `${this.tasksUrl}/${id}`;

    try {
      const response = await fetch(urlWithID, headers).then(this.createErr);
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async deleteTaskByName(data = {}) {
    const headers: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    };

    try {
      const response = await fetch(this.tasksUrl, headers).then(response => {
        if (!response.ok) {
          const err: CustomError = new Error('HTTP status code: ' + response.status);
          err.response = response;
          err.status = response.status;
          throw err;
        }

        return {
          status: response.ok,
          message: 'All task has been deleted',
          response,
        };
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getActiveTask(userID: string) {
    const url = `${this.activeTaskUrl}/${userID}`;

    try {
      const response = await fetch(url).then(this.createErr);
      return response.json();
    } catch (error) {
      console.error(error);
    }
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

const api = new API();

export default api;

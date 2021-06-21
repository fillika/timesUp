interface CustomError extends Error {
  response?: Response;
  status?: number;
}

class API {
  url: string;

  constructor() {
    this.url = 'http://localhost:22222/api/v1/tasks';
  }

  async getAllTask(): Promise<any> {
    try {
      const response = await fetch(this.url).then(response => {
        if (!response.ok) {
          const err: CustomError = new Error('HTTP status code: ' + response.status);
          err.response = response;
          err.status = response.status;
          throw err;
        }
        return response;
      });
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async createTask(url: string, data = {}) {
    const headers: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    };

    try {
      const response = await fetch(url, headers);
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async updateTask(url: string, data = {}) {
    const headers: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    };

    try {
      const response = await fetch(url, headers);
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async deleteTaskByID(id: string) {
    const headers: RequestInit = {
      method: 'DELETE',
    };

    const urlWithID = `${this.url}/${id}`;

    try {
      const response = await fetch(urlWithID, headers).then(response => {
        if (!response.ok) {
          const err: CustomError = new Error('HTTP status code: ' + response.status);
          err.response = response;
          err.status = response.status;
          throw err;
        }

        return {
          status: response.ok,
          message: 'Task has been deleted',
          response,
        };
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  }
}

const api = new API();

export default api;

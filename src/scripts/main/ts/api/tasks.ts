import API, { CustomError, Task } from '.';

class TasksAPI extends API {
  constructor() {
    super();
  }

  async getAllTask(token: string): Promise<any> {
    const headers: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Times ${token}`,
      },
    };

    try {
      const response = await fetch(this.tasksUrl, headers).then(this.createErr);
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async createTask(data = {}, token: string) {
    const headers: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Times ${token}`,
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

  async updateTask(id: string, data: Task = {}, token: string) {
    const url = this.tasksUrl + `/${id}`;

    const headers: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Times ${token}`,
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
}

const taskAPI = new TasksAPI();

export default taskAPI;

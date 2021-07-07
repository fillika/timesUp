import API, { Task } from '.';
class TasksAPI extends API {
  constructor() {
    super();
  }

  async getAllTask(token: string): Promise<any> {
    const headers = this.createHeaders('GET', {}, null, token);
    const errMessage = 'Ошибка при получении всех тасков в методе getAllTask';

    const response = await fetch(this.tasksUrl, headers).then(response => this.createErr(response, errMessage));
    return response.json();
  }

  async createTask(data = {}, token: string) {
    const headers = this.createHeaders('POST', { 'Content-Type': 'application/json' }, JSON.stringify(data), token);
    const errMessage = 'Ошибка при создании таска в методе createTask';

    try {
      const response = await fetch(this.tasksUrl, headers).then(response => this.createErr(response, errMessage));
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async updateTask(id: string, data: Task = {}, token: string) {
    const url = this.tasksUrl + `/${id}`;
    const errMessage = 'Ошибка при обновлении таска в методе updateTask';

    const headers: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    };

    try {
      const response = await fetch(url, headers).then(response => this.createErr(response, errMessage));
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async updateTaskByName(data: { name: string; date: string }, token: string) {
    const headers = this.createHeaders('PATCH', { 'Content-Type': 'application/json' }, JSON.stringify(data), token);
    const errMessage = 'Ошибка при обновлении всех тасков по имени в методе updateTaskByName';

    try {
      const response = await fetch(this.tasksUrl, headers).then(response => this.createErr(response, errMessage));
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async deleteTaskByID(id: string, token: string) {
    const headers = this.createHeaders('DELETE', {}, null, token);
    const urlWithID = `${this.tasksUrl}/${id}`;
    const errMessage = 'Ошибка при удалении таска по ID в методе deleteTaskByID';

    try {
      const response = await fetch(urlWithID, headers).then(response => this.createErr(response, errMessage));
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async deleteTaskByName(data = {}, token: string) {
    const headers = this.createHeaders('DELETE', { 'Content-Type': 'application/json' }, JSON.stringify(data), token);
    const errMessage = 'Ошибка при удалении всех тасков по имени в методе deleteTaskByName';

    try {
      const response = await fetch(this.tasksUrl, headers).then(response => this.createErr(response, errMessage));

      return {
        status: response.ok,
        message: 'All task has been deleted',
        response,
      };
    } catch (error) {
      console.error(error);
    }
  }
}

const taskAPI = new TasksAPI();

export { taskAPI };

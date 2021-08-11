import API, { Task } from '.';
class TasksAPI extends API {
  tasksUrl: string;
  moreTaskUrl: string;

  constructor() {
    super();
    this.tasksUrl = this.host + '/api/v1/tasks';
    this.moreTaskUrl = this.host + '/api/v1/tasks/more';
  }

  async getAllTask(token: string): Promise<any> {
    const headers = this.createHeaders('GET', {}, null, token);

    const response = await fetch(this.tasksUrl, headers).then(response => this.createErr(response));
    return response.json();
  }

  async getMoreTask(page: number, token: string) {
    const headers = this.createHeaders('GET', {}, null, token);
    const url = `${this.moreTaskUrl}?page=${page}`;

    const response = await fetch(url, headers).then(response => this.createErr(response));
    return response.json();
  }

  async createTask(data = {}, token: string) {
    const headers = this.createHeaders('POST', { 'Content-Type': 'application/json' }, JSON.stringify(data), token);

    const response = await fetch(this.tasksUrl, headers).then(response => this.createErr(response));
    return response.json();
  }

  async updateTask(id: string, data: Task = {}, token: string) {
    const url = this.tasksUrl + `/${id}`;

    const headers: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    };

    await fetch(url, headers).then(response => this.createErr(response));
  }

  async updateTaskByName(data: { name: string; date: string }, token: string) {
    const headers = this.createHeaders('PATCH', { 'Content-Type': 'application/json' }, JSON.stringify(data), token);
    await fetch(this.tasksUrl, headers).then(response => this.createErr(response));
  }

  async deleteTaskByID(id: string, token: string) {
    const headers = this.createHeaders('DELETE', {}, null, token);
    const urlWithID = `${this.tasksUrl}/${id}`;

    await fetch(urlWithID, headers).then(response => this.createErr(response));
  }

  async deleteTaskByName(data = {}, token: string) {
    const headers = this.createHeaders('DELETE', { 'Content-Type': 'application/json' }, JSON.stringify(data), token);
    await fetch(this.tasksUrl, headers).then(response => this.createErr(response));
  }

  async changeTaskDateByID(data = {}, token: string) {
    const headers = this.createHeaders('PATCH', { 'Content-Type': 'application/json' }, JSON.stringify(data), token);
    await fetch(this.tasksUrl, headers).then(response => this.createErr(response));
  }
}

const taskAPI = new TasksAPI();

export { taskAPI };

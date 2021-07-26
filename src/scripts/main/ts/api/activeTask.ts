import API from '.';

class ActiveTaskAPI extends API {
  constructor() {
    super();
  }

  async getActiveTask(token: string) {
    const headers = this.createHeaders('GET', {}, null, token);

    const response = await fetch(this.activeTaskUrl, headers).then(response => this.createErr(response));
    return response.json();
  }

  async updateActiveTask(token: string, data = {}) {
    const headers = this.createHeaders('PATCH', { 'Content-Type': 'application/json' }, JSON.stringify(data), token);

    const response = await fetch(this.activeTaskUrl, headers).then(response => this.createErr(response));
    return response.json();
  }
}

const activeTaskAPI = new ActiveTaskAPI();

export { activeTaskAPI };

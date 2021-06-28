import API from '.';

class ActiveTaskAPI extends API {
  constructor() {
    super();
  }

  async getActiveTask(token: string) {
    const headers = this.createHeaders('GET', {}, null, token);

    try {
      const response = await fetch(this.activeTaskUrl, headers).then(this.createErr);
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async updateActiveTask(token: string, data = {}) {
    const headers = this.createHeaders('PATCH', {'Content-Type': 'application/json'}, JSON.stringify(data), token);
    
    try {
      const response = await fetch(this.activeTaskUrl, headers).then(this.createErr);
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }
}

const activeTaskAPI = new ActiveTaskAPI();

export default activeTaskAPI;

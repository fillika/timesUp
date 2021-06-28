import API from '.';

class ActiveTaskAPI extends API {
  constructor() {
    super();
  }

  async getActiveTask(token: string) {
    const headers: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Times ${token}`,
      },
    };

    try {
      const response = await fetch(this.activeTaskUrl, headers).then(this.createErr);
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async updateActiveTask(token: string, data = {}) {
    const headers: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Times ${token}`,
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    };

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

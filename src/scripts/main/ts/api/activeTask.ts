import API from '.';

class ActiveTaskAPI extends API {
  constructor() {
    super();
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

  async updateActiveTask(userID: string, data = {}) {
    const url = `${this.activeTaskUrl}/${userID}`;

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
}

const activeTaskAPI = new ActiveTaskAPI();

export default activeTaskAPI;

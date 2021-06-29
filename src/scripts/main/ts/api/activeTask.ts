import API from '.';

class ActiveTaskAPI extends API {
  constructor() {
    super();
  }

  async getActiveTask(token: string) {
    const headers = this.createHeaders('GET', {}, null, token);
    const errMessage = 'Ошибка при получении активного таска в методе getActiveTask';

    try {
      const response = await fetch(this.activeTaskUrl, headers).then(response => this.createErr(response, errMessage));
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async updateActiveTask(token: string, data = {}) {
    const headers = this.createHeaders('PATCH', {'Content-Type': 'application/json'}, JSON.stringify(data), token);
    const errMessage = 'Ошибка при обновлении активного таска в методе updateActiveTask';
    
    try {
      const response = await fetch(this.activeTaskUrl, headers).then(response => this.createErr(response, errMessage));
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }
}

const activeTaskAPI = new ActiveTaskAPI();

export default activeTaskAPI;

interface CustomError extends Error  {
  response?: Response,
  status?: number
}

class API {
  constructor() {}

  async getAllTask(url: string): Promise<any> {
    try {
      const response = await fetch(url).then(response => {
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
}

const api = new API();

export default api;

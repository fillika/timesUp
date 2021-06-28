import API from '.';

class AuthAPI extends API {
  constructor() {
    super();
  }

  async logIn(data: FormData) {
    const headers = this.createHeaders('POST', {}, data);

    try {
      const response = await fetch(this.loginUrl, headers);
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }
}

const authAPI = new AuthAPI();

export { authAPI };

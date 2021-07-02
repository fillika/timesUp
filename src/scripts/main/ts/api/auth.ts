import API from '.';

class AuthAPI extends API {
  constructor() {
    super();
  }

  async logIn(data = {}) {
    const headers = this.createHeaders(
      'POST',
      {
        'Content-type': 'application/json',
      },
      JSON.stringify(data)
    );
    const errMessage = 'Ошибка при попытке logIn';

    const response = await fetch(this.loginUrl, headers).then(response => this.createErr(response, errMessage));
    return response.json();
  }

  async signUp(data = {}) {
    const headers = this.createHeaders(
      'POST',
      {
        'Content-type': 'application/json',
      },
      JSON.stringify(data)
    );

    const response = await fetch(this.signUpUrl, headers).then(response => this.createErr(response));
    return response.json();
  }
}

const authAPI = new AuthAPI();

export { authAPI };

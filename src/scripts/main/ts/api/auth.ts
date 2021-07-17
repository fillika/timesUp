import API from '.';

class AuthAPI extends API {
  confirmRegisterUrl: string;

  constructor() {
    super();
    this.confirmRegisterUrl = this.host + '/api/v1/confirmRegister';
  }

  async logIn(data = {}) {
    const headers = this.createHeaders(
      'POST',
      {
        'Content-type': 'application/json',
      },
      JSON.stringify(data)
    );
    const response = await fetch(this.loginUrl, headers).then(response => this.createErr(response));
    return response;
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

  async confirmRegister(data = {}) {
    const headers = this.createHeaders(
      'POST',
      {
        'Content-type': 'application/json',
      },
      JSON.stringify(data)
    );
    const response = await fetch(this.confirmRegisterUrl, headers).then(response => this.createErr(response));
    return response.json();
  }

  async forgotPassword(data = {}) {
    const headers = this.createHeaders(
      'POST',
      {
        'Content-type': 'application/json',
      },
      JSON.stringify(data)
    );

    const response = await fetch(this.forgotPasswordUrl, headers).then(response => this.createErr(response));
    return response.json();
  }

  async updatePassword(data = {}) {
    const headers = this.createHeaders(
      'PATCH',
      {
        'Content-type': 'application/json',
      },
      JSON.stringify(data)
    );

    const response = await fetch(this.updatePasswordUrl, headers).then(response => this.createErr(response));
    return response.json();
  }
}

const authAPI = new AuthAPI();

export { authAPI };

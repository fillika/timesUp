import API from '.';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';

class AuthAPI extends API {
  constructor() {
    super();
  }

  async logIn(data: FormData) {
    const headers = this.createHeaders('POST', {}, data);
    const errMessage = 'Ошибка при попытке logIn';

    const response = await fetch(this.loginUrl, headers).then(response => this.createErr(response, errMessage));
    return response.json();
  }

  async signUp(data: FormData) {
    const headers = this.createHeaders('POST', {}, data);

    const response = await fetch(this.signUpUrl, headers).then(response => this.createErr(response));
    return response.json();
  }
}

const authAPI = new AuthAPI();

export { authAPI };

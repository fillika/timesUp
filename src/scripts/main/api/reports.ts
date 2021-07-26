import API from '.';

type ReportParams = {
  name: string;
  start: string | number;
  stop: string | number;
};

class ReportsAPI extends API {
  reportsURL: string;

  constructor() {
    super();
    this.reportsURL = this.host + '/api/v1/reports';
  }

  async getReport(token: string, params: ReportParams) {
    const headers = this.createHeaders('GET', {}, null, token);
    
    const queryString = Object.entries(params)
      .map(arr => arr.join('='))
      .join('&');
    const url = `${this.reportsURL}?${queryString}`;

    const response = await fetch(url, headers).then(response => this.createErr(response));
    return response.json();
  }
}

const reportsAPI = new ReportsAPI();

export { reportsAPI };

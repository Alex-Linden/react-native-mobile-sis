import axios from 'axios';

const BASE_URL = "http://localhost:8000/api";

class SisApi {
  static token = "d3cb0e452955cfd4f81f2d4fccbade5e3b4753ee";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Token ${SisApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */
  static async getLectureSessions() {
    let res = await this.request(`lecturesessions/`);
    return res.company;
  }

}

export default SisApi;
import axios from 'axios';

const BASE_URL = "http://localhost:8000/api";

class SisApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Token ${SisApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, headers }));
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

  static async getToken() {
    console.log("getToken")
    let res = await axios.post(
      "http://localhost:8000/api/-token/",
      {
        data: {
          "username": "admin",
          "password": "password"
        }
      }
    );
    this.token = res.data.token
  }

}

export default SisApi;
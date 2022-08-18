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

  /** Get all items for Cohort. */
  static async getCohortItems() {
    const apiCohortItems = await axios.get(
      "http://localhost:8000/api/cohortitems/",
      { headers: { Authorization: `Token ${this.token}` } }
    );
    return apiCohortItems.data;
  }

  /** Authenticate user and get token. */
  static async logIn({ username, password }) {
    console.log("getToken", username, password);
    const data = {
      "username": username,
      "password": password
    };
    let res = await axios.post(
      "http://localhost:8000/api/-token/",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    console.log('res.data', res.data);
    this.token = res.data.token;
    return this.token;
  }

  /** Get Staff Info */
  static async getStaffInfo(staffId) {
    console.log('getStaffInfo API call', staffId);
    try {
      const apiStaffInfo = await axios.get(
        `http://localhost:8000/api/staff/${staffId}/`,
        { headers: { Authorization: `Token ${this.token}` } }
      );
      return apiStaffInfo.data;
    } catch (err) {
      console.error('API ERROR', err.response);
    }

  }
}

export default SisApi;
const { getCurrentDateTimeGMT } = require("../utils/date");

const http = require("./axios")({
  baseURL: process.env.INTHEGRA_URL,
  headers: {
    "Accept-Language": "en",
    "X-Api-Key": process.env.API_KEY
  }
});

module.exports = {
  async auth() {
    const response = await http.post(
      "/signin",
      {
        email: process.env.EMAIL,
        password: process.env.PASSWORD
      },
      {
        headers: {
          Date: getCurrentDateTimeGMT(),
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.token;
  }
};

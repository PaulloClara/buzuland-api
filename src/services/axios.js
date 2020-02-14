const axios = require("axios");

module.exports = configs =>
  axios.create({
    ...configs,
    timeout: 20000
  });

const line = require("./line");
const stop = require("./stop");

module.exports = {
  Query: {
    ...line.queries,
    ...stop.queries
  }
};

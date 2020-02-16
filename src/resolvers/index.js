const line = require("./line");
const stop = require("./stop");
const busLine = require("./bus-line");

module.exports = {
  Query: {
    ...line.queries,
    ...stop.queries,
    ...busLine.queries
  }
};

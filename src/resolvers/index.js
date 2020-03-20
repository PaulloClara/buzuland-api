const busLine = require("./bus-line");
const busStop = require("./bus-stop");
const busLocation = require("./bus-location");

module.exports = {
  Query: {
    ...busLine.queries,
    ...busStop.queries,
    ...busLocation.queries
  }
};

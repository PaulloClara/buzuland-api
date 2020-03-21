const { applyMiddleware } = require("graphql-middleware");

const handleRequest = require("./handle-request");

module.exports = {
  config(schema) {
    return applyMiddleware(schema, handleRequest);
  }
};

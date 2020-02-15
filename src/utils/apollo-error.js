const { ApolloError } = require("apollo-server");

const codes = {
  400: "BAD_REQUEST",
  401: "UNAUTHORIZED",
  404: "NOT_FOUND"
};

module.exports = {
  newError({ msg, code, response }) {
    response.status(code);

    return new ApolloError(msg, codes[code] || "INTERNAL_SERVER_ERROR");
  }
};

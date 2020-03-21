const { ApolloError } = require("apollo-server");

const codes = {
  400: "BAD_REQUEST",
  401: "UNAUTHORIZED",
  404: "NOT_FOUND",
  500: "INTERNAL_SERVER_ERROR"
};

module.exports = {
  newError({ message, code }) {
    this.response.status(code);

    return new ApolloError(message, codes[code] || "INTERNAL_SERVER_ERROR");
  },

  inthegraError() {
    return this.newError({
      message: "Inthegra API (inthegra.strans.teresina.pi.gov.br) crashed",
      code: 400
    });
  },

  internalError() {
    return this.newError({
      message: "Error",
      code: 500
    });
  }
};

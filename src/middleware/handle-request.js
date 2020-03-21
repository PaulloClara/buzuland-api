const ApolloError = require("../utils/apollo-error");

module.exports = (next, parent, args, { response }) => {
  Object.defineProperty(ApolloError, "response", {
    value: response,
    writable: true,
    enumerable: false
  });
  response.apolloError = ApolloError;

  return next();
};

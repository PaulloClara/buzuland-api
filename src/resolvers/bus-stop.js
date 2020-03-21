const Inthegra = require("../services/inthegra");
const ApolloError = require("../utils/apollo-error");

module.exports = {
  queries: {
    async busStop(_, { search = [""] }, { response }) {
      try {
        const stops = (await Promise.all(
          search.map(arg => Inthegra.stop(arg))
        )).reduce((result, stop) => result.concat(stop));

        return stops;
      } catch (error) {
        console.error(error);

        if (error.code === "ECONNABORTED")
          return ApolloError.inthegraError({ response });

        return ApolloError.internalError({ response });
      }
    }
  }
};

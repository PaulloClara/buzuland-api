const Inthegra = require("../services/inthegra");

module.exports = {
  queries: {
    async busLine(_, { search = [""] }, { response }) {
      try {
        const lines = (await Promise.all(
          search.map(arg => Inthegra.line(arg))
        )).reduce((result, line) => result.concat(line));

        return lines;
      } catch (error) {
        console.error(error);

        if (error.code === "ECONNABORTED")
          return response.apolloError.inthegraError();

        return response.apolloError.internalError();
      }
    }
  }
};

const Inthegra = require("../services/inthegra");

module.exports = {
  queries: {
    async busLocation(_, { search = [""] }, { response }) {
      try {
        const locations = (await Promise.all(
          search.map(arg => Inthegra.location(arg))
        )).reduce((result, location) => result.concat(location));

        return locations;
      } catch (error) {
        console.error(error);

        if (error.code === "ECONNABORTED")
          return response.apolloError.inthegraError();

        return response.apolloError.internalError();
      }
    }
  }
};

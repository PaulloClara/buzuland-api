const Inthegra = require("../services/inthegra");
const { newError } = require("../utils/apollo-error");

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
          return newError({
            msg: "Inthegra API (inthegra.strans.teresina.pi.gov.br) crashed",
            code: 400,
            response
          });

        return newError({ msg: "Error", code: 400, response });
      }
    }
  }
};

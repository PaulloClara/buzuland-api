const Inthegra = require("../services/inthegra");
const { newError } = require("../utils/apollo-error");

module.exports = {
  queries: {
    async stops(_, { search = [""] }, { response }) {
      try {
        const stops = (
          await Promise.all(search.map(stopCode => Inthegra.stops(stopCode)))
        ).reduce((result, stop) => result.concat(stop));

        return stops;
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

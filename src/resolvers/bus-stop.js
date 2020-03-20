const Inthegra = require("../services/inthegra");
const { newError } = require("../utils/apollo-error");

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

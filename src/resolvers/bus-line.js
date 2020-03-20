const Inthegra = require("../services/inthegra");
const { newError } = require("../utils/apollo-error");

module.exports = {
  queries: {
    async busLines(_, { search = [""] }, { response }) {
      try {
        const busLines = (
          await Promise.all(search.map(busCode => Inthegra.busLines(busCode)))
        ).reduce((result, bus) => result.concat(bus));

        return busLines;
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

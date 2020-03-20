const Inthegra = require("../services/inthegra");
const { newError } = require("../utils/apollo-error");

module.exports = {
  queries: {
    async lines(_, { search = [""] }, { response }) {
      try {
        const lines = (
          await Promise.all(search.map(lineCode => Inthegra.lines(lineCode)))
        ).reduce((result, line) => result.concat(line));

        return lines;
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

const inthegra = require("../services/inthegra");
const { newError } = require("../utils/apollo-error");

module.exports = {
  queries: {
    async lines(_, { search }, { response }) {
      try {
        const lines = await inthegra.lines(search);

        return lines;
      } catch (error) {
        console.error(error);

        return newError({ msg: "Error", code: 400, response });
      }
    }
  }
};

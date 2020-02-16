const inthegra = require("../services/inthegra");
const { newError } = require("../utils/apollo-error");

module.exports = {
  queries: {
    async busLines(_, { search }, { response }) {
      try {
        const busLines = await inthegra.busLines(search);

        return busLines;
      } catch (error) {
        return newError({ msg: "Error", code: 400, response });
      }
    }
  }
};

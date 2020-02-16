const inthegra = require("../services/inthegra");
const { newError } = require("../utils/apollo-error");

module.exports = {
  queries: {
    async stops(_, { search }, { response }) {
      try {
        const stops = await inthegra.stops(search);

        return stops;
      } catch (error) {
        console.error(error);

        return newError({ msg: "Error", code: 400, response });
      }
    }
  }
};

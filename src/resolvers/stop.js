const inthegra = require("../services/inthegra");

module.exports = {
  queries: {
    async stops(_, { search }) {
      const stops = await inthegra.stops(search);

      return stops;
    }
  }
};

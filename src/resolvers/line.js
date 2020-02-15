const inthegra = require("../services/inthegra");

module.exports = {
  queries: {
    async lines(_, { search }) {
      const lines = await inthegra.lines(search);

      return lines;
    }
  }
};

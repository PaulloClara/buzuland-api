const moment = require("moment");

module.exports = {
  getCurrentDateTimeGMT() {
    return (
      moment()
        .add(3, "h")
        .format("ddd, DD MMM YYYY HH:mm:ss") + " GMT"
    );
  }
};

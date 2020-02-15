const moment = require("moment");

module.exports = {
  getCurrentGMTDateTime() {
    return (
      moment()
        .add(3, "h")
        .format("ddd, DD MMM YYYY HH:mm:ss") + " GMT"
    );
  },

  getCurrentGMTDateTimeMore(minutes) {
    return (
      moment()
        .add(3, "h")
        .add(minutes, "m")
        .format("ddd, DD MMM YYYY HH:mm:ss") + " GMT"
    );
  },

  checkValidity(date) {
    return moment(this.getCurrentGMTDateTime()).isAfter(date);
  }
};

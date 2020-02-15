const moment = require("moment");

function currentGMTDateTime() {
  return moment().add(3, "h");
}

function format(date) {
  return date.format("ddd, DD MMM YYYY HH:mm:ss") + " GMT";
}

module.exports = {
  getCurrentGMTDateTime() {
    return format(currentGMTDateTime());
  },

  getCurrentGMTDateTimeMore(minutes) {
    return format(currentGMTDateTime().add(minutes, "m"));
  },

  checkValidity(date) {
    return moment(format(currentGMTDateTime())).isAfter(date);
  }
};

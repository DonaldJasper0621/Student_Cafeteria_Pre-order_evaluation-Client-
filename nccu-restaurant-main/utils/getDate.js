var date = new Date();

var year = date.getFullYear();
var month = date.getMonth() + 1; // getMonth() returns a 0-based value, so we need to add 1
var day = date.getDate() + 1;

if (month < 10) {
  month = "0" + month; // add a leading zero if necessary
}

if (day < 10) {
  day = "0" + day; // add a leading zero if necessary
}

export const dateStr = year + "-" + month + "-" + day;

export const formatedDate = `${month}月${day}日`;

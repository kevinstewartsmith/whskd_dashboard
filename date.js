exports.getDate = function() {
  const today = new Date();
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  };

  return today.toLocaleDateString("en-US", options);
}

exports.getDay = function() {
  const today = new Date();
  const options = {
    weekday: 'long',
  };

  return today.toLocaleDateString("en-US", options);
}

// function getDate() {
//  const today = new Date();
//  const options = {
//    weekday: 'long',
//    month: 'long',
//    day: 'numeric',
//    year: 'numeric',
//    hour: 'numeric',
//    minute: 'numeric',
//    second: 'numeric',
//    hour12: false
//
//  };
//
//  return today.toLocaleDateString("en-US", options);
// }

exports.getDay = function() {
  const today = new Date();
  const dayCodes = ["S","M","T","W","R","F","S"];
  const dayNum = today.getDay();
  return dayCodes[dayNum];
  //return "R"; //fake code
}
//console.log(getDate());
//console.log(getDay());

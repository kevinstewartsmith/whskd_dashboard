exports.getWesternTeachers = function() {
  const westernTeachers = [
    "Zeyneb",
    "Tukson",
    "Amel",
    "Lenka",
    "Sophie",
    "Andy",
    "Cai",
    "Sirina",
    "Jonathan",
    "Chris",
    "Art",
    "Marta"
  ];


  return westernTeachers.sort();
}

exports.getKoreanVietnameseTeachers = function() {
  const koreanVietTeachers = [
    "Lee MK",
    "Shin HJ",
    "Song HN",
    "Jang YJ",
    "Kim KJ",
    "Seo HJ",
    "Kim YJ",
    "Ngoc",
    "Loan"
  ];

  return koreanVietTeachers.sort();
}

const teacherCode = {
  "amel": "AMEL",
"andy" : "AN",
"art" : "AR",
"cai" :"CA",
"chris" : "CH",
"jonathan" : "JON",
"lenka" : "LE",
"marta" : "M",
"sirina" : "SI",
"sophie" : "SOPHIE",
"tukson" : "T",
"zeyneb": "Z",
"jang yj": "J",
"kim kj" : "K",
"kim yj" : "KYJ",
"lee mk" : "L",
"loan" : "LO",
"ngoc" : "NG",
"seo hj": "SE",
"shin hj":"SH",
"song hn":"S"
};
exports.getTeacherCode = function(name) {
  return teacherCode[name];
}

exports.sortClassOrder = function(classArray) {
  const thisDay = "F";
   let period = 1;
   let sortedArray = [null,null,null,null,null,null,null,null];
   // let sortedArray = ["blank","blank","blank","blank","blank","blank","blank","blank"];
  //console.log("CLASS ARRAY " + classArray);
  classArray.forEach(function(oneClass) {
    console.log("CLLLASSS: " + oneClass);
    //console.log(oneClass["class_name"] + " CLASS TIMES " + oneClass["class_times"]);
    oneClass["class_times"].forEach(function(class_time){
      //console.log("CLASS DAY " + class_time["day"]);
      //console.log("CLASS PERIOD " + class_time["period"]);
      if (class_time["day"] === thisDay){
        sortedArray[class_time["period"] - 1] = oneClass;

      }
    });

  });


  sortedArray = sortedArray.filter(a => a !== null);




  return sortedArray;
}

exports.getOrderedPeriods = function(orderedClasses,day) {
  let periods = [];
  orderedClasses.forEach(function(classSession){
    classSession["class_times"].forEach(function(classTime){
      if (classTime["day"] === day ){
        periods.push(classTime["period"]);
      }
    });
  });
  //periods = periods.sort(function(a, b) {return a - b});

  function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

// usage example:

periods = periods.filter(onlyUnique);
  return periods;
}

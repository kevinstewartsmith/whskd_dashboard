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

const teacherInfo = {
"amel": {
  code: "AMEL",
  hrClass: "G3",
  cda: "CDA",
  cda: "ESL3"
},
"andy" : {
  code: "AN",
  hrClass: "G6",
  cda: "CDA",
  cda: "ESL6"
},
"art" : "AR",
"cai" :{
  code: "CA",
  hrClass:"G4",
  cda: "CDA",
  esl: "ESL7"
},
"chris" : "CH",
"jonathan" : "JON",
"lenka" : {
  code: "LE",
  hrClass:"G4",
  cda: null,
  esl: "ESL4"
},
"marta" : "M",
"sirina" : "SI",
"sophie" : "SOPHIE",
"tukson" : {
  code: "T",
  hrClass:"G2",
  cda: "CDA",
  esl: "ESL2"
},
"zeyneb": {
  code: "Z",
  hrClass:"G1",
  cda: "CDA",
  esl: "ESL1"
},
"jang yj": "J",
"kim kj" : "K",
"kim yj" :{
  code:"KYJ",
  hrClass:null,
  cda: null,
  esl: null
} ,
"lee mk" : "L",
"loan" : {
  code:"LO",
  hrClass:null,
  cda: "CDA",
  esl: null
},
"ngoc" : "NG",
"seo hj": "SE",
"shin hj":"SH",
"song hn":"S"
};
exports.getTeacherInfo = function(name) {
  return teacherInfo[String(name)];
}

exports.sortClassOrder = function(classArray,day) {
  const thisDay = day;
   let period = 1;
   let sortedArray = [null,null,null,null,null,null,null,null];
   // let sortedArray = ["blank","blank","blank","blank","blank","blank","blank","blank"];
  //console.log("CLASS ARRAY " + classArray);
  classArray.forEach(function(oneClass) {
    //console.log("CLLLASSS: " + oneClass);
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

exports.getOrderedPeriods = function(unorderedClasses,day) {
  let periods = [];
  unorderedClasses.forEach(function(classSession){
    classSession.class_times.forEach(function(classTime){
      if (classTime.day === day ){
        periods.push(classTime.period);
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

exports.getOrderedCurrentReports = function(orderedClasses,day) {
  dailyReportArray = [];
  orderedClasses.forEach(function(oneClass){
    dailyReportArray.push(oneClass.current_report);
  });

  return dailyReportArray
}

exports.getClassTags = function() {
  const classTags = {
    orderedClasses: {
      todaysClass: "todaysClass",
      homework: "homework",
      nextClass: "nextClass"
    },
    orderedHomeroomClasses: {
      todaysClass: "todaysHomeroomClass",
      homework: "homeroomHomework",
      nextClass: "nextHomeroomClass"
    },
    orderedESLClasses: {
      todaysClass: "todaysESLClass",
      homework: "eslHomework",
      nextClass: "nextESLClass"
    },
    orderedCDAClasses: {
      todaysClass: "todaysCDAClass",
      homework: "cdaHomework",
      nextClass: "nextCDAClass"
    } 
  }
  return classTags;
}



//  console.log(orderedClasses[0].daily_reports[orderedClasses[0].daily_reports.length-2]["todays_class"]);
  //var sorted0 = sortedArray[0].daily_reports;
  //console.log("SORTED REPORTS: " + sorted0[0]["todays_class"]);
  //return reports;

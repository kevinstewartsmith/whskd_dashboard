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
    esl: "ESL3"
  },
  "andy" : {
    code: "AN",
    hrClass: "G6",
    cda: "CDA",
    esl: "ESL6"
  },
  "art" :{
    code: "AR",
    hrClass:null,
    cda: "CDA",
    esl: null
  } ,
  "cai" :{
    code: "CA",
    hrClass:"G4",
    cda: "CDA",
    esl: "ESL7"
  },
  "chris" : {
    code: "CH",
    hrClass:"G10",
    cda: "CDA",
    esl: "ESL10"
  },
  "jonathan" : {
    code: "JON",
    hrClass:"G9",
    cda: "CDA",
    esl: "ESL9"
  },
  "lenka" : {
    code: "LE",
    hrClass:"G4",
    cda: null,
    esl: "ESL4"
  },
  "marta" : {
    code: "M",
    hrClass:null,
    cda: null,
    esl: null
  },
  "sirina" : {
    code: "SI",
    hrClass:"G8",
    cda: "CDA",
    esl: "ESL8"
  },
  "sophie" : {
    code: "SOPHIE",
    hrClass:"G5",
    cda: null,
    esl: "ESL5"
  },
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
  "jang yj": {
    code:"J",
    hrClass:null,
    cda: null,
    esl: null
  },
  "kim kj" : {
    code:"K",
    hrClass:null,
    cda: null,
    esl: null
  },
  "kim yj" :{
    code:"KYJ",
    hrClass:null,
    cda: null,
    esl: null
  } ,
  "lee mk" : {
    code:"L",
    hrClass:null,
    cda: null,
    esl: null
  },
  "loan" : {
    code:"LO",
    hrClass:null,
    cda: "CDA",
    esl: null
  },
  "ngoc" : {
    code:"NG",
    hrClass:null,
    cda: "CDA",
    esl: null
  },
  "seo hj": {
    code:"SE",
    hrClass:null,
    cda: null,
    esl: null
  },
  "shin hj":{
    code:"SH",
    hrClass:null,
    cda: null,
    esl: null
  },
  "song hn":{
    code:"S",
    hrClass:null,
    cda: null,
    esl: null
  }
};
exports.getAllTeacherInfo = function() {
  return teacherInfo;
}
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

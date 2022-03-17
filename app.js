//Requires node.js and express
const express = require("express");
const bodyParser = require("body-parser");
const teachers = require(__dirname + "/teachers");
const _ = require('lodash');
const mongoose = require('mongoose');
const dates = require(__dirname + "/date")
const crazy = require(__dirname + "/classesJSON")
//Makes an express app
const app = express();
//mongoose.connect('mongodb://localhost:27017/WHSKD-DB');
mongoose.connect('mongodb+srv://kevinstewartsmith:whskd@cluster0.kxmbd.mongodb.net/WHSKD-DB');

//,{useNewUrlParser: true}
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
const westernTeachers = teachers.getWesternTeachers();
const koreanVietnameseTeachers = teachers.getKoreanVietnameseTeachers();
const allTeachers = westernTeachers.concat(koreanVietnameseTeachers);
const allTeacherInfo = teachers.getAllTeacherInfo();
const thisDayCode =  dates.getDay();
const thisDate = dates.getDate();
//console.log(thisDayCode);
//console.log("app.get day:" + dates.getDay());
//console.log(allTeacherInfo);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
///////////////Database/////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
const classTimesSchema = mongoose.Schema({
  day: {
    type: String,
    enum: {
      values: ['M', 'T', 'W', 'R', 'F'],
      message: '{VALUE} is not supported'
    }
  },
  period: {
    type: Number,
    min: [1, 'Must be at least 1, got {VALUE}'],
    max: [8, 'Must be 8 or below, got {VALUE}']
  },

});

const dailyReportSchema = mongoose.Schema({
  date_in_ms: Number,
  date: String,
  weekday: {
    type: String,
    enum: {
      values: ['S','M', 'T', 'W', 'R', 'F','S'],
      message: '{VALUE} is not supported'
    }
  },
  todays_class: String,
  homework: String,
  next_class: String,
});

const classSchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  class_name: {
    type: String,
    required: true
  },
  regular_teacher: {
    type: [String],
    required: true
  },
  class_times: {
    type: [classTimesSchema],
    required: true
  },
  class_type: {
    type: [String],
    required: true
  },
  daily_reports : [dailyReportSchema],
  current_report : dailyReportSchema,
  teacher_name: [String]

});

const Classes = mongoose.model("classe", classSchema);
const DailyReports = mongoose.model("daily_report", dailyReportSchema);
const ClassTimes =  mongoose.model("class_time", classTimesSchema);


/////////////////////////////////////////////////
/////////////////////////////////////////////////
///////////////End of Database///////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// GET and POST Methods//////////////////////////
/////////////////////////////////////////////////
//What happens when the user goes to the homepage
app.get("/", function(req, res) {

  // res.sendFile(__dirname + "/index.html");
  // res.sendFile(__dirname + "/memory-game.html");
  //console.log(koreanVietnameseTeachers);
  res.render("index", {
    westernTeachers: westernTeachers,
    koreanVietnameseTeachers: koreanVietnameseTeachers
  });
})

app.get("/teacher", function(req, res) {
  // res.sendFile(__dirname + "/teacher-dashboard.html");
  // res.sendFile(__dirname + "/memory-game.html");
  // const westernTeachers = teachers.getWesternTeachers();
//  console.log(westernTeachers);
  res.render("teacher", {
    // westernTeachers: westernTeachers,
    teachers: allTeachers
  });
})

app.get("/teachers/:teacherName", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.teacherName);
  //console.log("REQUESTED TITLE: " + requestedTitle); //Convert Teacher name to lower case string
  const teacherInfo = teachers.getTeacherInfo(requestedTitle);
  //console.log("APP.js GET Teacher Info: " + teacherInfo);
  const teacherHR = teacherInfo["hrClass"];
  const teacherESL = teacherInfo["esl"];
  const teacherCDA = teacherInfo["cda"];
  //console.log("Teacher Code: " + teacherInfo); //get the teacher acronym
  var orderedClasses = [];
  var orderedHomeroomClasses = [];
  var orderedHRPeriods = [];
  var orderedESLClasses = [];
  var orderedESLPeriods = [];
  var orderedCDAClasses = [];
  var orderedCDAPeriods = [];
  const classTags = teachers.getClassTags();
  //console.log(teacherCDA);
  //console.log(thisDayCode);
  //console.log(teacherInfo["code"]);
  Classes.find({class_type: teacherCDA,"class_times.day": thisDayCode, regular_teacher: teacherInfo["code"] },function(err,cdaClasses){
    if (err) {
      console.log(err);
    } else {
      orderedCDAClasses = teachers.sortClassOrder(cdaClasses,thisDayCode);
      orderedCDAPeriods = teachers.getOrderedPeriods(orderedCDAClasses,thisDayCode);

    //  console.log("CDA Classes app.js LENGTH:" + orderedCDAClasses[0].class_times);
      Classes.find({class_type: teacherESL,"class_times.day": thisDayCode },function(err,eslClasses){
        if (err) {
          console.log(err);
        } else {
          //console.log("ESL CLAsses: " + eslClasses);
          orderedESLClasses = teachers.sortClassOrder(eslClasses,thisDayCode);
          orderedESLPeriods = teachers.getOrderedPeriods(orderedESLClasses,thisDayCode);

          Classes.find({class_type: teacherHR,"class_times.day": thisDayCode },function(err,hrClasses){
            if (err) { console.log(err)} else {
              //console.log(hrClasses);
              orderedHomeroomClasses = teachers.sortClassOrder(hrClasses,thisDayCode);
              orderedHRPeriods = teachers.getOrderedPeriods(orderedHomeroomClasses,thisDayCode);

              Classes.find({ //Find classes based on
                regular_teacher: teacherInfo["code"],
                "class_times.day": thisDayCode
              },function(err, classes) {
                if (err) {
                  console.log(err);
                } else {
                  // mongoose.disconnect();
                //  console.log("TEACHER CLASSES APP.GET:" + classes);
                  const manyClasses = classes;

                  orderedClasses = teachers.sortClassOrder(classes,thisDayCode);
                  let orderedClassPeriods = teachers.getOrderedPeriods(orderedClasses,thisDayCode);
                  let currentReportArray = teachers.getOrderedCurrentReports(orderedClasses);
                  //teachers.getOrderedClassDuplications(orderedClasses);
                  //console.log("CR ARR: " + currentReportArray);
                  //console.log("ORDEREDCLASSPERIODS: " + orderedClassPeriods);
                  allTeachers.forEach(function(teacher) {
                    const storedTitle = _.lowerCase(teacher);
                    if (storedTitle === requestedTitle) {
                      res.render("teacher", {
                        teacher: teacher,
                        orderedClasses: orderedClasses,
                        orderedClassPeriods:orderedClassPeriods,
                        orderedHomeroomClasses:orderedHomeroomClasses,
                        orderedHRPeriods:orderedHRPeriods,
                        orderedESLClasses: orderedESLClasses,
                        orderedESLPeriods: orderedESLPeriods,
                        orderedCDAClasses: orderedCDAClasses,
                        orderedCDAPeriods: orderedCDAPeriods,
                        weekDay: thisDayCode,
                        thisDate: thisDate,
                        teacherInfo: teacherInfo,
                        teacherFirstName: requestedTitle,
                        classTags: classTags,
                        allTeacherInfo: allTeacherInfo

                      });

                      console.log("Match Found." );
                    }
                  })

                }
              });


            }
          });

        }
      });
    }
  });


})

app.post("/teachers/:teacherName", function(req,res){


  const classDetails = req.body.class_details;

  //console.log("Class details found in post method: " + classDetails);
  const className = classDetails.class_name;
  const classType = classDetails.class_type;
  const period = classDetails.period;
  const weekDay = classDetails.daily_report.weekday;
  const regularTeacher = classDetails.regular_teacher;
  const teacherFirstName = classDetails.teacher_first_name;
//  console.log("TEACHER FIRST NAME APP>JS POST : " + teacherFirstName);
  const lowerCaseTeacher = _.lowerCase(teacherFirstName);
  const teacherInfo = teachers.getTeacherInfo(lowerCaseTeacher);





  Classes.findOne({
    class_name: className,
    class_type: classType,
    "class_times.day": thisDayCode,
    "class_times.period": period,
    regular_teacher: regularTeacher,




  }, function(err, foundClass) {

    if (err) {
      console.log(err);
    } else {

      // mongoose.disconnect();
    //  classes.daily_reports.push(dailyReport);
    //  classes.save();
      //console.log("Found Class: " + foundClass);

      const currentReport = new DailyReports({
        todays_class: classDetails.daily_report.todays_class,
        homework: classDetails.daily_report.homework,
        next_class: classDetails.daily_report.next_class,
        weekday: thisDayCode,
        date_in_ms: Date.now()
      });
      currentReport.save();

      //console.log("FOUND CLASS ID: " + foundClass);

      Classes.updateOne({_id:foundClass.id},{current_report:currentReport},function(err,result){
        if (err){
          console.log(err);
        } else {
                console.log("Successfully Updated: " + result);
                res.redirect('/teachers/:' + teacherFirstName);
        }
      })



    }
  });


});
app.get("/elements/:element",function(req,res){
  const requestedTitle = _.lowerCase(req.params.element);
  //console.log("RESPONSE DATA TYPE: " + typeof req.params.element);
  var classIDParam = req.params.element;
  var idString = req.params.element;

  var classIDParam = parseInt(idString);
  console.log("ID in GET: " + classIDParam);
  console.log("classIDParam DATA TYPE: " + typeof classIDParam);
  var foundClass;
  var classInfo;
  Classes.findOne({_id: classIDParam}, function(err,result){
    if(err){
      console.log(err);

    } else {
      //console.log("CLASS NAME GET AJAX: " + result.class_name);
      console.log("ERR Reesult: "  + result);
      classInfo = {
        class_name: result.class_name,
        current_report: result.current_report

      };
        res.send(classInfo)

    }

  })

});

app.get("/headmaster", function(req, res) {
  res.sendFile(__dirname + "/headmaster-dashboard.html");
  // res.sendFile(__dirname + "/memory-game.html");

})


let port = process.env.PORT;
if (port == null || port = "") {
  port = 4000;
}

//Listening to port 3000 locally. Has a callback function to let the user know whent he server is running
//The console.log message will show up in the terminal
app.listen(port, function() {
  console.log("Server is running on port 4000");
});



// Classes.find({},function(err,results){
//   if (err){
//     console.log(err);
//   } else {
//     results.forEach(function(result){
//
//       // var currentReport = new DailyReports({
//       //   todays_class: "Today's class",
//       //   homework:"Homework",
//       //   next_class: "Next class Brotha"
//       // });
//       // currentReport.save();
//
//       //{_id:result.id},{current_report:currentReport}
//       var regularTeacherArray = result.regular_teacher
//       console.log(regularTeacherArray.length);
//       var firstNameArray = [];
//
//       regularTeacherArray.forEach(function(regularTeacher){
//         console.log(regularTeacher);
//         allTeachers.forEach(function(teacher){
//              var lowerCaseTeacher = _.lowerCase(teacher);
//              //console.log("Teacher Info:" + allTeacherInfo[lowerCaseTeacher].code);
//              //console.log(allTeacherInfo[lowerCaseTeacher].name);
//              //console.log(regularTeacher);
//              if (regularTeacher === allTeacherInfo[lowerCaseTeacher].code) {
//                //console.log(allTeacherInfo[lowerCaseTeacher].name);
//                firstNameArray.push(allTeacherInfo[lowerCaseTeacher].name)
//              }
//         })
//       });
//       console.log(firstNameArray)
//       // console.log(regularTeacherArray.length);
//       // console.log("Resluting regular teachers from db: " + result.regular_teacher);
//       // var resultTeachersCodes = result.regular_teacher
//       // var regularTeachersCodes = [];
//       // resultTeachersCodes.forEach(function(resultTeacherCode){
//       //   regularTeachersCodes.push(resultTeacherCode)
//       // });
//
//       //console.log("New Array of teacher codes:" + regularTeachersCodes);
//       // var teacherFirstNames = []
//       // allTeachers.forEach(function(teacher){
//       //   var lowerCaseTeacher = _.lowerCase(teacher);
//       //   console.log("Teacher Info:" + allTeacherInfo[lowerCaseTeacher].code);
//       //
//       //   if (allTeacherInfo[lowerCaseTeacher].code === )
//       //   //allTeacherInfo[]
//       // })
//       //*****
//       // const requestedTitle = _.lowerCase(req.params.teacherName);
//       // var teacherName;
//       // var teacherCode = result.regular_teacher
//       //
//       // allTeachers.forEach(function(teacher){
//       //   if (allTeacherInfo.teacher["code"] === teacherCode){
//       //     teacherName = allTeacherInfo[teacher]["name"]
//       //   }
//       // })
//       // console.log(teacherName);
//
//       //****
//
//       Classes.updateOne({_id:result.id},{teacher_name :firstNameArray},function(err){
//         if (err){
//           console.log(err);
//         } else {
//           console.log("Successfully Updated");
//         }
//       })
//
//       //console.log("R;" +);
//       //console.log(result);
//     })
//   }
// });

//console.log(Classes);
// var currentReport = new DailyReports({
//   todays_class: "Today's class",
//   homework:"Homework",
//   next_class: "Next class"
// });
//
// currentReport.save();
//
// DailyReports.findOne({todays_class: "Today's class"},function(err,result){
//   if (err){
//     console.log(err)
//   } else {
//     console.log(result);
//   }
// });
// var crazyArray = crazy.getCrazyArray();
// for (var i=0; i<crazyArray.length;i++){
//   var crazyClassTimes = crazyArray[i]["class_times"];
//   crazyClassTimes.forEach(function(classTime){
//     const classTimes = new ClassTimes({
//         day: classTime["day"],
//         period: classTime["period"]
//     });
//     classTimes.save();
//     //Add to the class Item
//     Classes.findOne({_id:crazyArray[i]["_id"]},function(err,foundClass){
//       if (err){
//         console.log(err);
//       } else {
//         console.log(foundClass);
//         Classes.updateOne({_id:foundClass["_id"]},{$push:{class_times:classTimes}},function(err){
//           if (err) {
//             console.log(err);
//           } else {
//             console.log("Successfully Updated Class Times!");
//           }
//         })
//       }
//     })
//
//   });
// }

//classTimes.save();
//console.log(crazy.getCrazyArray()[76]["class_times"][0]["period"]);

// const currentReport = new DailyReports({
//   todays_class: "todays class",
//   homework: "homework",
//   next_class: "next class",
//   weekday: thisDayCode,
//   date_in_ms: Date.now()
// });
// currentReport.save();
//
// //console.log("FOUND CLASS ID: " + foundClass);
//
// Classes.updateMany({},{current_report:currentReport},function(err,result){
//   if (err){
//     console.log(err);
//   } else {
//           console.log("Successfully Updated: " + result);
//           //res.redirect('/teachers/:' + teacherFirstName);
//   }
// })


// var crazyClassArray = crazy.getCrazyArray();
//
// crazyClassArray.forEach(function(foundClass){
//   console.log(foundClass._id);
//   console.log(foundClass.class_name);
//   console.log(foundClass.regular_teacher);
//   console.log(foundClass.class_type);
//   console.log(foundClass.current_report);
//   console.log(foundClass.class_times);
//   console.log(foundClass.teacher_name);
//   console.log(foundClass.current_report._id);
//   const currentReport1 = new DailyReports({
//     _id: foundClass.current_report._id,
//     date_in_ms: foundClass.current_report.date_in_ms,
//     weekDay: foundClass.current_report.weekday,
//     todays_class: foundClass.current_report.todays_class,
//     homework: foundClass.current_report.homework,
//     next_class: foundClass.current_report.next_class
//   })
//   currentReport1.save();
//   //
//   const classTimes = [];
//   foundClass.class_times.forEach(function(classTime){
//     const classSession = new ClassTimes({
//       day: classTime.day,
//       period: classTime.period
//     })
//     classSession.save();
//     classTimes.push(classSession)
//   })
//   const class1 = new Classes({
//     _id: foundClass._id,
//     class_name: foundClass.class_name,
//     regular_teacher: foundClass.regular_teacher,
//     class_type: foundClass.class_type,
//     current_report: currentReport1,
//     class_times: classTimes
//   })
//   class1.save()
// });

// const currentReport = new DailyReports({
//   todays_class: classDetails.daily_report.todays_class,
//   homework: classDetails.daily_report.homework,
//   next_class: classDetails.daily_report.next_class,
//   weekday: thisDayCode,
//   date_in_ms: Date.now()
// });
// currentReport.save();

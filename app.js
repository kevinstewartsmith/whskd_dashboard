//Requires node.js and express
const express = require("express");
const bodyParser = require("body-parser");
const teachers = require(__dirname + "/teachers");
const _ = require('lodash');
const mongoose = require('mongoose');
//Makes an express app
const app = express();
mongoose.connect('mongodb://localhost:27017/WHSKD-DB');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
const westernTeachers = teachers.getWesternTeachers();
const koreanVietnameseTeachers = teachers.getKoreanVietnameseTeachers();
const allTeachers = westernTeachers.concat(koreanVietnameseTeachers);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
///////////////Database/////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
const classTimeSchema = mongoose.Schema({
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
  date_in_ms: String,
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
    type: [classTimeSchema],
    required: true
  },
  class_type: {
    type: [String],
    required: true
  },
  daily_reports : [dailyReportSchema],
  current_report : dailyReportSchema

});

const Classes = mongoose.model("classe", classSchema);
const DailyReports = mongoose.model("daily_report", dailyReportSchema);



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
  console.log(koreanVietnameseTeachers);
  res.render("index", {
    westernTeachers: westernTeachers,
    koreanVietnameseTeachers: koreanVietnameseTeachers
  });
})

app.get("/teacher", function(req, res) {
  // res.sendFile(__dirname + "/teacher-dashboard.html");
  // res.sendFile(__dirname + "/memory-game.html");
  // const westernTeachers = teachers.getWesternTeachers();
  console.log(westernTeachers);
  res.render("teacher", {
    // westernTeachers: westernTeachers,
    teachers: allTeachers
  });
})

app.get("/teachers/:teacherName", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.teacherName); //Convert Teacher name to lower case string
  const teacherCode = teachers.getTeacherCode(requestedTitle); //get the teacher acronym
  var orderedClasses = [];
  Classes.find({ //Find classes based on

    regular_teacher: teacherCode,
    "class_times.day": "F"

  },function(err, classes) {

    if (err) {
      console.log(err);
    } else {
      //console.log("First CurrentReport in GET method: " + classes[0].current_report);
      // mongoose.disconnect();

      const manyClasses = classes;

      orderedClasses = teachers.sortClassOrder(classes);
      let orderedClassPeriods = teachers.getOrderedPeriods(orderedClasses,"F");
      let currentReportArray = teachers.getOrderedCurrentReports(orderedClasses);
      console.log("CR ARR: " + currentReportArray);

      allTeachers.forEach(function(teacher) {
        const storedTitle = _.lowerCase(teacher);
        if (storedTitle === requestedTitle) {
          res.render("teacher", {
            teacher: teacher,
            orderedClasses: orderedClasses,
            orderedClassPeriods:orderedClassPeriods,
            //dailyReports: orderedClassPeriods.daily_reports.todays_class
            //dailyReports: orderedDailyReports
            currentReports: currentReportArray,
          });
          console.log("Match Found." );
        }
      })

    }
  });




})

app.post("/teachers/:teacherName", function(req,res){


  const classDetails = req.body.class_details;
  console.log("Class details found in post method: " + classDetails.daily_report.next_class );
  const className = classDetails.class_name;
  const classType = classDetails.class_type;
  const period = classDetails.period;
  const weekDay = classDetails.daily_report.weekday;
  const regularTeacher = classDetails.regular_teacher;
  const lowerCaseTeacher = _.lowerCase(regularTeacher);
  const teacherCode = teachers.getTeacherCode(lowerCaseTeacher);





  Classes.findOne({
    class_name: className,
    class_type: classType,
    "class_times.day": "F",
    "class_times.period": period,
    regular_teacher: teacherCode,




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
      });
      currentReport.save();



      Classes.updateOne({_id:foundClass.id},{current_report:currentReport},function(err,result){
        if (err){
          console.log(err);
        } else {
                console.log("Successfully Updated: " + result);
                res.redirect('/teachers/:teacherName');
        }
      })



    }
  });


});

app.get("/headmaster", function(req, res) {
  res.sendFile(__dirname + "/headmaster-dashboard.html");
  // res.sendFile(__dirname + "/memory-game.html");

})

//Listening to port 3000 locally. Has a callback function to let the user know whent he server is running
//The console.log message will show up in the terminal
app.listen(4000, function() {
  console.log("Server is running on port 4000");
});



// Classes.find(function(err,results){
//   if (err){
//     console.log(err);
//   } else {
//     results.forEach(function(result){
//
//       var currentReport = new DailyReports({
//         todays_class: "Today's class",
//         homework:"Homework",
//         next_class: "Next class Brotha"
//       });
//       currentReport.save();
//
//       //{_id:result.id},{current_report:currentReport}
//
//       Classes.updateOne({_id:result.id},{current_report:currentReport},function(err){
//         if (err){
//           console.log(err);
//         } else {
//           //console.log("Successfully Updated");
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

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
  }

});

const Classes = mongoose.model("classe", classSchema);



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
  const requestedTitle = _.lowerCase(req.params.teacherName);
  const teacherCode = teachers.getTeacherCode(requestedTitle);
  var orderedClasses = [];
  Classes.find({
    regular_teacher: teacherCode,
    "class_times.day": "F"}, function(err, classes) {

    if (err) {
      console.log(err);
    } else {

      // mongoose.disconnect();

      const manyClasses = classes;

      orderedClasses = teachers.sortClassOrder(classes);
      let orderedClassPeriods = teachers.getOrderedPeriods(orderedClasses,"F");


      allTeachers.forEach(function(teacher) {
        const storedTitle = _.lowerCase(teacher);
        if (storedTitle === requestedTitle) {
          res.render("teacher", {
            teacher: teacher,
            orderedClasses: orderedClasses,
            orderedClassPeriods: orderedClassPeriods
          });
          console.log("Match Found." );
        }
      })

    }
  });






})

app.get("/headmaster", function(req, res) {
  res.sendFile(__dirname + "/headmaster-dashboard.html");
  // res.sendFile(__dirname + "/memory-game.html");

})

//Listening to port 3000 locally. Has a callback function to let the user know whent he server is running
//The console.log message will show up in the terminal
app.listen(4000, function() {
  console.log("Server is running on port 4000");
})

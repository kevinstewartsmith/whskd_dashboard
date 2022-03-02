//Requires node.js and express
const express = require("express");
const bodyParser = require("body-parser");
const teachers = require(__dirname + "/teachers");
//Makes an express app
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//What happens when the user goes to the homepage
app.get("/", function(req, res) {
   // res.sendFile(__dirname + "/index.html");
   // res.sendFile(__dirname + "/memory-game.html");
   const westernTeachers = teachers.getWesternTeachers();
   const koreanVietnameseTeachers = teachers.getKoreanVietnameseTeachers();
   res.render("index",{
     westernTeachers: westernTeachers,
     koreanVietnameseTeachers: koreanVietnameseTeachers
   });
})

app.get("/teacher", function(req, res) {
   // res.sendFile(__dirname + "/teacher-dashboard.html");
   // res.sendFile(__dirname + "/memory-game.html");
   const westernTeachers = teachers.getWesternTeachers();

   console.log(westernTeachers);
   res.render("teacher",{
     westernTeachers: westernTeachers,

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

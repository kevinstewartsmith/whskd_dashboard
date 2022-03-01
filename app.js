//Requires node.js and express
const express = require("express");
const bodyParser = require("body-parser");
//Makes an express app
const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

//What happens when the user goes to the homepage
app.get("/", function(req, res) {
   res.sendFile(__dirname + "/index.html");
   // res.sendFile(__dirname + "/memory-game.html");
   res.render("index")
})

app.get("/teacher", function(req, res) {
   res.sendFile(__dirname + "/teacher-dashboard.html");
   // res.sendFile(__dirname + "/memory-game.html");

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

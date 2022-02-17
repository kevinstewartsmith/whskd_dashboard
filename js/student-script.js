var colors = ["F76E11","38A3A5","FFBE0F","BD2000","F2F013","00B4D8","FF9F45","90E0EF","6998AB","E19999","8C0000","00B4D8"];

var gameStarted = false;
var level = 0;
var words = {
  "moon":true,
  "galaxy":true,
  "asteroid":true,
  "stars": true,
  "observatory": true,
  "spacecraft": true,
  "telescope" : true,
  "universe" : true,
  "meteorite" : true,
  "solar-system" : true,
  "comet" : true,
  "astronaut" : true,
};
var wordArray = [];

$(document).keypress(function(){
  if (gameStarted == false) {
    wordArray = Object.keys(words);
    giveCardsBackgroundColors();
    $("#level-title").text("Level " + level);
    nextSequence();

  }
  gameStarted = true;
});
//Incomplete


var gamePattern = [];
var wordPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var userWordPattern = [];
//
function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);



  var randNumber = Math.floor(Math.random() * 12);


  var randomChosenWord = wordArray[randNumber];


  wordPattern.push(randomChosenWord);
  flipCard(randomChosenWord);

  $("#" + randomChosenWord).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenWord);



}

$(".btn").click(function(event){
  console.log(event.target.id);
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

$(".flip-card").click(function(event) {
  console.log(event.currentTarget.id);
  var userChosenWord = event.currentTarget.id;
  userWordPattern.push(userChosenWord);
  console.log(userWordPattern);
  animatePress(userChosenWord);
  playSound(userChosenWord);

  checkWordAnswer(userWordPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
      $("#" + currentColour).removeClass("pressed");
    }, 100);
    $("#" + currentColour).fadeIn(100).fadeOut(100).fadeIn(100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel])  {
    // console.log("Correct");
    if (userClickedPattern.length == gamePattern.length){
      setTimeout(function() {
          nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
    resetGrid();
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function checkWordAnswer(currentLevel) {
  if (userWordPattern[currentLevel] === wordPattern[currentLevel])  {
    // console.log("Correct");
    if (userWordPattern.length == wordPattern.length){
      setTimeout(function() {
          nextSequence();
      }, 1000);
      userWordPattern = [];
    }
  } else {
    console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
    resetGrid();
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

setTimeout(function() {
  //your code to be executed after 1 second
}, delayInMilliseconds);


function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
  userClickedPattern = [];
  wordPattern = [];
  userWordPattern = [];
}

function flipCard(word) {
  // $("#moon-inner ").css("transform", "rotateY(180deg)");



  if (words[word] === true){
    $("#" + word + "-inner").css("transform", "rotateY(180deg)");
    words[word] = false;
  } else {
    $("#" + word + "-inner").css("transform", "rotateY(0deg)");
    words[word] = true;
  }
}

function resetGrid() {
  for (var i = 0; i < wordArray.length - 1;  i++) {
    if (words[wordArray[i]] == false) {
      flipCard(wordArray[i]);
    }
  }
  console.log("checked " + i);
}

function giveCardsBackgroundColors() {
  for (var i = 0; i < wordArray.length; i++){
    var color = "#" + colors[i];
    $("#" + wordArray[i] + " .flip-card-back").css("background-color", color);
    console.log("printed");
  }
}

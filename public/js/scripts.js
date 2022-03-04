
// console.log("Footer JS works");
// console.log($("todaysClass1").val());

// $('textArea').click(function() {
//     //var text = $('textarea#mytextarea').val();
//     //send to server and process response
//     console.log($(this).attr('id'));
//     console.log($(this).val());
//     console.log(Date.now());
// });

// $(".row").click(function() {
//   //console.log($(this).attr("id"));
//
//   console.log($(this).find("textarea.today").attr("name") + $(this).find("textarea.today").val());
// })


//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 1000;  //time in ms, 5 seconds for example
var $input = $('textarea#todaysClass5');


var class5 = {
  dateTime: ""
  todaysClass: $('textarea#todaysClass5'),
  homework: $("homework5"),
  nextclass5: $("nextClass5")
}


var array = ["","",""];

var periodArray = {
  one: {
    todaysClass: []
  }
}
console.log($input.val());

//on keyup, start the countdown
$input.on('keyup', function () {
  clearTimeout(typingTimer);

  typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown
$input.on('keydown', function () {
  clearTimeout(typingTimer);
});

//user is "finished typing," do something
function doneTyping () {
  array[0] = $input.val()
  console.log(array);
}


//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 500;
var thisWeekDay = $("#weekDay").text();
var thisDate = $("#thisDate").text();
console.log("JQUERY ON") //time in ms, 5 seconds for example
console.log("EJS: date:" + thisWeekDay);


var class1Tags = [$('textarea#todaysClass1'),$('textarea#homework1'),$('textarea#nextClass1')];
var class2Tags = [$('textarea#todaysClass2'),$('textarea#homework2'),$('textarea#nextClass2')];
var class3Tags = [$('textarea#todaysClass3'),$('textarea#homework3'),$('textarea#nextClass3')];
var class4Tags = [$('textarea#todaysClass4'),$('textarea#homework4'),$('textarea#nextClass4')];
var class5Tags = [$('textarea#todaysClass5'),$('textarea#homework5'),$('textarea#nextClass5')];
var class6Tags = [$('textarea#todaysClass6'),$('textarea#homework6'),$('textarea#nextClass6')];
var class7Tags = [$('textarea#todaysClass7'),$('textarea#homework7'),$('textarea#nextClass7')];
var class8Tags = [$('textarea#todaysClass8'),$('textarea#homework8'),$('textarea#nextClass8')];

var classTags = [
  [$('textarea#todaysClass1'),$('textarea#homework1'),$('textarea#nextClass1')],
  [$('textarea#todaysClass2'),$('textarea#homework2'),$('textarea#nextClass2')],
  [$('textarea#todaysClass3'),$('textarea#homework3'),$('textarea#nextClass3')],
  [$('textarea#todaysClass4'),$('textarea#homework4'),$('textarea#nextClass4')],
  [$('textarea#todaysClass5'),$('textarea#homework5'),$('textarea#nextClass5')],
  [$('textarea#todaysClass6'),$('textarea#homework6'),$('textarea#nextClass6')],
  [$('textarea#todaysClass7'),$('textarea#homework7'),$('textarea#nextClass7')],
  [$('textarea#todaysClass8'),$('textarea#homework8'),$('textarea#nextClass8')],
];

// console.log("Next class ID: " + class1Tags[2].attr("id"));
// console.log("Next class ID: " + classTags[0][0].parent().parent().attr("class"));
// console.log("Class name: " + classTags[0][0].parent().parent().parent().find("class-name").attr("id"));

var classDocument = {
  class1Array : { todaysClass:"ddd",homework:"",nextClass:""},
  class2Array : { todaysClass:"",homework:"",nextClass:""},
  class3Array : { todaysClass:"",homework:"",nextClass:""},
  class4Array : { todaysClass:"",homework:"",nextClass:""},
  class5Array : { todaysClass:"",homework:"",nextClass:""},
  class6Array : { todaysClass:"",homework:"",nextClass:""},
  class7Array : { todaysClass:"",homework:"",nextClass:""},
  class8Array : { todaysClass:"",homework:"",nextClass:""},

}
// console.log(classDocument["class"+1+"Array"]["todaysClass"]);
// console.log(classTags[0][0].attr("id"));

function typeEvent(tag) {

  //on keyup, start the countdown
  tag.on('keyup', function () {

    clearTimeout(typingTimer);

    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  });

  //on keydown, clear the countdown
  tag.on('keydown', function (key) {

    var code = key.keyCode || key.which;
    if(code == 9) { //Enter keycode
      console.log("TAB");
      console.log(tag.val());

      tag.text(tag.val())
      doneTyping();
      //clearTimeout(typingTimer);

      //typingTimer = setTimeout(doneTyping, 0);
    }
    clearTimeout(typingTimer);


  });


  function doneTyping () {

    var textArea = "textarea#" + tag.attr("id");
    $(textArea).text(tag.val());
    var row = tag.parents().eq(2)
    var lastClass = row.find('.class-type').text()
    lastClass = lastClass.replace("Group: ","");
    var lastClassArray = lastClass.split(',')  //.split(' ').pop();
    var teacherCode = $("#teacherCode").text();
    console.log(lastClassArray);
    console.log("CLASS_Name: " + row.attr("id"));
    console.log("class_type: " + lastClassArray);
    console.log("period: " + row.find(".period").text());
    console.log("todays_class: " + row.find(".today").text());
    console.log("homework: " + row.find(".homework").text());
    console.log("next_class: " + row.find(".next-class").text());
    console.log("teacher: " + row.find(".teacher").text());
    var teacherFirstName = row.find(".teacher").text()
    const classDetails = {

      class_name: row.attr("id"),
      class_type: lastClassArray,
      period : Number(row.find(".period").text()),
      regular_teacher: teacherCode,
      teacher_first_name: teacherFirstName,//[ row.find(".teacher").text() ],//[ row.find(".teacher").text() ],
      daily_report: {
        date_in_ms: Date.now(),
        date: thisDate,
        weekday: thisWeekDay,
        todays_class:row.find(".today").text(),
        homework: row.find(".homework").text(),
        next_class: row.find(".nextclass").text()
      }
    }
    console.log("SCRIPTS: CLASS DETAILS: " + classDetails);

    console.log("TEACHER CODE SCRIPT: " + teacherCode);
    var teacherURL = "/teachers/" + teacherFirstName;
    console.log("TTTeacher: " + teacherURL);

    $.ajax({type: "POST", url: teacherURL, dataType :"json", data :
      {"class_details":classDetails}
    });
    console.log(classDetails);

  }




}




for (var i = 0; i < 8; i++) {
  for (var j = 0; j < 3; j++ ) {
    typeEvent(classTags[i][j]);
  }
};


//   function getDate() {
//    const today = new Date();
//    const options = {
//      weekday: 'long',
//      month: 'long',
//      day: 'numeric',
//      year: 'numeric',
//      hour: 'numeric',
//      minute: 'numeric',
//      second: 'numeric',
//      hour12: false
//
//    };
//
//    return today.toLocaleDateString("en-US", options);
//  }
//
 function getDay() {
  const today = new Date();
  const dayCodes = ["S","M","T","W","R","F","S"];
  const dayNum = today.getDay();
  return dayCodes[dayNum];
}
//  console.log(getDate());
//  console.log(getDay());
function logTestData(){
 //  $.ajax({
 //   url: '/elements/element',
 //   type: 'GET',
 //
 // });
 // $.get("/elements/element", function(data, status){
 //    alert("Data: " + data + "\nStatus: " + status);
 //  });
 //  $.ajax({type: "POST", url: /elements/element, dataType :"json", data :
 //    {"class_details":classDetails}
 //  });
 $.get("/elements/element",function(data){
   console.log(data)
   $("textarea#todaysClass3").val(data)
 });
}




setUpDownloadPageAsImage();

function setUpDownloadPageAsImage() {
  document.getElementById("download").addEventListener("click", function() {
    html2canvas($("#tab2")[0]).then(function(canvas) {
      console.log(canvas);
      simulateDownloadImageClick(canvas.toDataURL(), 'file-name.png');
    });
  });
}

function simulateDownloadImageClick(uri, filename) {
  var link = document.createElement('a');
  if (typeof link.download !== 'string') {
    window.open(uri);
  } else {
    link.href = uri;
    link.download = filename;
    accountForFirefox(clickLink, link);
  }
}

function clickLink(link) {
  link.click();
}

function accountForFirefox(click) { // wrapper function
  let link = arguments[1];
  document.body.appendChild(link);
  click(link);
  document.body.removeChild(link);
}

var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus()
})

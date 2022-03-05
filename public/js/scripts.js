

//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 1000;  //time in ms, 5 seconds for example



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

console.log("Next class ID: " + class1Tags[2].attr("id"));
console.log("Next class ID: " + classTags[0][0].parent().parent().attr("class"));
console.log("Class name: " + classTags[0][0].parent().parent().parent().find("class-name").attr("id"));
$("textarea#todaysClass4").text("demo_test.txt");
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
console.log(classDocument["class"+1+"Array"]["todaysClass"]);
console.log(classTags[0][0].attr("id"));

function typeEvent(tag) {

  //on keyup, start the countdown
  tag.on('keyup', function () {
    clearTimeout(typingTimer);

    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  });

  //on keydown, clear the countdown
  tag.on('keydown', function () {
    clearTimeout(typingTimer);
  });


  function doneTyping () {

    var textArea = "textarea#" + tag.attr("id");
    $(textArea).text(tag.val());
    var row = tag.parents().eq(2)
    var lastClass = row.find('.class-type').text()
    lastClass = lastClass.replace("Group: ","");
    var lastClassArray = lastClass.split(',')  //.split(' ').pop();
    console.log(lastClassArray);
    console.log("CLASS_Name: " + row.attr("id"));
    console.log("class_type: " + lastClassArray);
    console.log("period: " + row.find(".period").text());
    console.log("todays_class: " + row.find(".today").text());
    console.log("homework: " + row.find(".homework").text());
    console.log("next_class: " + row.find(".next-class").text());
    console.log("teacher: " + row.find(".teacher").text());

    const classDetails = {

      class_name: row.attr("id"),
      class_type: lastClassArray,
      period : Number(row.find(".period").text()),
      regular_teacher: [ row.find(".teacher").text() ],
      daily_report: {
        date_in_ms: Date.now(),
        date: getDate(),
        weekday: getDay(),
        todays_class:row.find(".today").text(),
        homework: row.find(".homework").text(),
        next_class: row.find(".next-class").text()
      }
    }

    var teacherURL = "/teachers/" + classDetails["regular_teacher"];
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


  function getDate() {
   const today = new Date();
   const options = {
     weekday: 'long',
     month: 'long',
     day: 'numeric',
     year: 'numeric',
     hour: 'numeric',
     minute: 'numeric',
     second: 'numeric',
     hour12: false

   };

   return today.toLocaleDateString("en-US", options);
 }

 function getDay() {
  const today = new Date();
  const dayCodes = ["S","M","T","W","R","F","S"];
  const dayNum = today.getDay();
  return dayCodes[dayNum];
}
 console.log(getDate());
 console.log(getDay());


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

var homeroomClassTags = [
[$('textarea#todaysHomeroomClass1'), $('textarea#homeroomHomework1'),$('textarea#nextHomeroomClass1')],
[$('textarea#todaysHomeroomClass2'), $('textarea#homeroomHomework2'),$('textarea#nextHomeroomClass2')],
[$('textarea#todaysHomeroomClass3'), $('textarea#homeroomHomework3'),$('textarea#nextHomeroomClass3')],
[$('textarea#todaysHomeroomClass4'), $('textarea#homeroomHomework4'),$('textarea#nextHomeroomClass4')],
[$('textarea#todaysHomeroomClass5'), $('textarea#homeroomHomework5'),$('textarea#nextHomeroomClass5')],
[$('textarea#todaysHomeroomClass6'), $('textarea#homeroomHomework6'),$('textarea#nextHomeroomClass6')],
[$('textarea#todaysHomeroomClass7'), $('textarea#homeroomHomework7'),$('textarea#nextHomeroomClass7')],
[$('textarea#todaysHomeroomClass8'), $('textarea#homeroomHomework8'),$('textarea#nextHomeroomClass8')]
];

var eslClassTags = [
[$('textarea#todaysESLClass1'), $('textarea#eslHomework1'),$('textarea#nextESLClass1')],
[$('textarea#todaysESLClass2'), $('textarea#eslHomework2'),$('textarea#nextESLClass2')],
[$('textarea#todaysESLClass3'), $('textarea#eslHomework3'),$('textarea#nextESLClass3')],
[$('textarea#todaysESLClass4'), $('textarea#eslHomework4'),$('textarea#nextESLClass4')],
[$('textarea#todaysESLClass5'), $('textarea#eslHomework5'),$('textarea#nextESLClass5')],
[$('textarea#todaysESLClass6'), $('textarea#eslHomework6'),$('textarea#nextESLClass6')],
[$('textarea#todaysESLClass7'), $('textarea#eslHomework7'),$('textarea#nextESLClass7')],
[$('textarea#todaysESLClass8'), $('textarea#eslHomework8'),$('textarea#nextESLClass8')]
];

var cdaClassTags = [
[$('textarea#todaysCDAClass1'), $('textarea#cdaHomework1'),$('textarea#nextCDAClass1')],
[$('textarea#todaysCDAClass2'), $('textarea#cdaHomework2'),$('textarea#nextCDAClass2')],
[$('textarea#todaysCDAClass3'), $('textarea#cdaHomework3'),$('textarea#nextCDAClass3')],
[$('textarea#todaysCDAClass4'), $('textarea#cdaHomework4'),$('textarea#nextCDAClass4')],
[$('textarea#todaysCDAClass5'), $('textarea#cdaHomework5'),$('textarea#nextCDAClass5')],
[$('textarea#todaysCDAClass6'), $('textarea#cdaHomework6'),$('textarea#nextCDAClass6')],
[$('textarea#todaysCDAClass7'), $('textarea#cdaHomework7'),$('textarea#nextCDAClass7')],
[$('textarea#todaysCDAClass8'), $('textarea#cdaHomework8'),$('textarea#nextCDAClass8')]
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
    var teacherCode = row.find(".code").text();//$("#teacherCode").text();
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
    console.log("SCRIPTS: CLASS DETAILS: " + teacherFirstName);

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
    typeEvent(homeroomClassTags[i][j]);
    typeEvent(eslClassTags[i][j]);
    typeEvent(cdaClassTags[i][j]);
  }
};



 function getDay() {
  const today = new Date();
  const dayCodes = ["S","M","T","W","R","F","S"];
  const dayNum = today.getDay();
  return dayCodes[dayNum];
}


const todaysClassArray = []
for (var i = 1; i < orderedClassesLength + 1; i++) {
  todaysClassArray.push("textarea#todaysClass" +i);
  console.log(typeof todaysClassArray[i - 1]);
}


  // function reloadDivs() {
  //
  //   todaysClassArray.forEach(function(classID){
  //     var id = $(classID).parents().eq(2).attr("name");
  //     $.get("/elements/" + id, function(data){
  //
  //       if (data.current_report.todaysClass != $("textarea#todaysClass1").val()) {
  //         $("textarea#todaysClass1").val(data.current_report.todays_class)
  //       }
  //     });
  //   });
  //
  //
  // }



setInterval(logTestData, 6000)
function logTestData(){

    // console.log($("textarea#todaysClass1").parents().eq(2).attr("name"));
    //   //for (var i = 1; i < 9; i++){
    //
    //
    // var id = $("textarea#todaysClass1").parents().eq(2).attr("name")
    // $.get("/elements/" + id, function(data){
    // console.log(data.current_report.todays_class)
    //
    // if (data.current_report.todaysClass != $("textarea#todaysClass1").val()) {
    //   $("textarea#todaysClass1").val(data.current_report.todays_class)
    //   }
    // });
    //
    // //console.log($("textarea#todaysClass1").parents().eq(2).attr("name"));
    // //for (var i = 1; i < 9; i++){
    // var id = $("textarea#todaysClass3").parents().eq(2).attr("name")
    // $.get("/elements/" + id, function(data){
    // console.log(data.current_report.todays_class)
    //
    // if (data.current_report.todaysClass != $("textarea#todaysClass3").val()) {
    //   $("textarea#todaysClass3").val(data.current_report.todays_class)
    //   }
    // });

    // classTags.forEach(function(tag){
    //   console.log("The tag: " + tag[0].parents().eq(2).attr("name"));
    //   var id = tag[0].parents().eq(2).attr("name");
    //   $.get("/elements/" + id, function(data){
    //     if (data.current_report.todaysClass != tag[0].val()) {
    //       tag[0].val(data.current_report.todays_class)
    //     }
    //   });
    // });

    // var rows = $(".report");
    // for (var i = 0; i < rows.length; i++) {
    //   var id = rows[i].attr("name");
    //   $.get("/elements/" + id, function(data){
    //     rows[i].find(".today").val(data.current_report.todays_class)
    //   });
    // };
  }
function omg() {
    var rows = $(".row.report")
    rows.each(function(i){
      //console.log("i " + $( this ).attr("name"));
      //console.log("i " + $( this ).attr("id"));
      var tag = $( this );
      var textArea = $( this ).find(".today")
      var textAreaID = textArea.attr("id")
      var domToday = $( this ).find(".today").val()
      var name = $( this ).attr("name")
      var domID = $( this ).attr("id")
      console.log("DOM ID: " + domID);
      $.get("/elements/" + name, function(data){
        // if (data.current_report.todaysClass != tag[0].val()) {
        //   tag[0].val(data.current_report.todays_class)
        // }
        // if (data.current_report.todaysClass != tag[0].val()) {
        //       tag[0].val(data.current_report.todays_class)
        // }
        var req = data.current_report.todays_class
        console.log("Today's class ID:  " + textAreaID );
        console.log("REQ:" + data.current_report.todays_class + "  Type: " + typeof data.current_report.todays_class);
        console.log("DOM ID: " + domID + "  Type: " + typeof domID);
        console.log("DOM Name: " + name + "  Type: " + typeof name);
        console.log("Dom Today: " + domToday+ "  Type: " + typeof domToday );
        //$( this ).text("hello")

        if (req != domToday) {
              console.log("They're Different!");
              var textAreaHash = "textarea.today#" + textAreaID
              tag.find(textAreaHash).val(req)
              console.log(textAreaHash);
        }

      });
    })
}
//}
// var rows = $(".row.report")
// rows.each(function(i){
//   //console.log("i " + $( this ).attr("name"));
//   //console.log("i " + $( this ).attr("id"));
//
//   var name = $( this ).attr("name")
//   var domID = $( this ).attr("id")
//   console.log("NAME BEFORE:" + id);
//   $.get("/elements/" + id, function(data){
//     // if (data.current_report.todaysClass != tag[0].val()) {
//     //   tag[0].val(data.current_report.todays_class)
//     // }
//     // if (data.current_report.todaysClass != tag[0].val()) {
//     //       tag[0].val(data.current_report.todays_class)
//     // }
//     console.log("REQ:" + data.current_report.todays_class);
//     console.log("DOM ID: " + domID);
//     console.log("DOM Name: " + $( this ).attr("name"));
//     //$( this ).text("hello")
//   });
// })


// var rows = $(".row.report")
// rows.each(function(i){
//   //console.log("i " + $( this ).attr("name"));
//   //console.log("i " + $( this ).attr("id"));
//   var id = $( this ).attr("name")
//   $.get("/elements/" + id, function(data){
//     // if (data.current_report.todaysClass != tag[0].val()) {
//     //   tag[0].val(data.current_report.todays_class)
//     // }
//     console.log(data);
//   //$( this ).text("hello")
// });
// })

//console.log("rows: " + $(".today").text())

// classTags.forEach(function(tag){
//   console.log("The tag: " + tag[0].parents().eq(2).attr("name"));
//   tag[0].parents().eq(2).attr("name");
//   $.get("/elements/" + id, function(data){
//     if (data.current_report.todaysClass != tag[0].val()) {
//       tag[0].val(data.current_report.todays_class)
//     }
//   });
// });




setUpDownloadPageAsImage("download");

function setUpDownloadPageAsImage(id) {
  document.getElementById(id).addEventListener("click", function() {
    html2canvas($("#sectionReports")[0]).then(function(canvas) {
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


function loadDiv() {
    $('textarea#todaysClass1').load("some text")
}

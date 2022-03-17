
//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 100;
var thisWeekDay = $("#weekDay").text();
var thisDate = $("#thisDate").text();
console.log("JQUERY ON") //time in ms, 5 seconds for example
console.log("EJS: date:" + thisWeekDay);


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


function typeEvent(tag) {

  //on keyup, start the countdown
  tag.on('keyup', function () {

    clearTimeout(typingTimer);
    //clearTimeout(reloadDivsTimer);
    //console.log("Reload divs timer cleared");
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
    //reloadDivsTimer = setTimeout(reloadDivs, 3000);
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
    //clearTimeout(reloadDivsTimer);
  //  reloadDivsTimer = setTimeout(reloadDivs, 3000);
  });


  function doneTyping () {
    //typingTimer = setTimeout(reloadDivs, 3000);
    //startReloadDivsTimer()
    //console.log("Reload Divs activated");
    var textArea = "textarea#" + tag.attr("id");
    $(textArea).text(tag.val());
    var row = tag.parents().eq(2)
    var lastClass = row.find('.class-type').text()
    lastClass = lastClass.replace("Group: ","");
    var lastClassArray = lastClass.split(',')  //.split(' ').pop();
    var teacherCode = row.find(".code").text();//$("#teacherCode").text();
    // console.log(lastClassArray);
    // console.log("CLASS_Name: " + row.attr("id"));
    // console.log("class_type: " + lastClassArray);
    // console.log("period: " + row.find(".period").text());
    // console.log("todays_class: " + row.find(".today").text());
    // console.log("homework: " + row.find(".homework").text());
    // console.log("next_class: " + row.find(".next-class").text());
    // console.log("teacher: " + row.find(".teacher").text());
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
    //startReloadDivsTimer();
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

var reloadTypingTimer = setInterval(reloadDivs, 6000)
$(window).keyup(function(){
  console.log("KEYUP WINDOW");
  clearTimeout(reloadTypingTimer);
  reloadTypingTimer = setInterval(reloadDivs, 6000)
});


//setInterval(reloadFinalDivs, 6000)
//var reloadDivsTimer;//setInterval(reloadDivs, 3000)
//function startReloadDivsTimer() {
//  reloadDivsTimer = setInterval(reloadDivs, 3000);
//}
//startReloadDivsTimer();

//////////////////////////////////////////////////////////////////////////////////////
/////////REPORT LOADING START ///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
$("#CDAreportButton").click(function(){
  console.log("CDA report clicked");

  for (var i = 1; i < 9; i++){
    var todayTag = "#todaysCDAClass" + i + "FinalReadOnly";
    var homeWorkTag = "#cdaHomework" + i + "FinalReadOnly";
    var nextClassTag = "#nextCDAClass" + i + "FinalReadOnly";
    $( todayTag ).text(cdaClassTags[i - 1][0].val());
    $( homeWorkTag ).text(cdaClassTags[i - 1][1].val());
    $( nextClassTag ).text(cdaClassTags[i - 1][2].val());
  }

});


$("#ESLreportButton").click(function(){
  console.log("ESL report clicked");

  for (var i = 1; i < 9; i++){
    var todayTag = "#todaysESLClass" + i + "FinalReadOnly";
    var homeWorkTag = "#eslHomework" + i + "FinalReadOnly";
    var nextClassTag = "#nextESLClass" + i + "FinalReadOnly";
    $( todayTag ).text(eslClassTags[i - 1][0].val());
    $( homeWorkTag ).text(eslClassTags[i - 1][1].val());
    $( nextClassTag ).text(eslClassTags[i - 1][2].val());
  }

});

$("#homeroomReportButton").click(function(){
  console.log("Homeroom report clicked");
  // $(".row.read-row").each(function(row){
  //   $( this ).find(".today").html("hello")
  // })
  // homeroomClassTags.forEach(function(tag) {
  //   console.log(tag[0].val());
  // })
  for (var i = 1; i < 9; i++){
    var todayTag = "#todaysHomeroomClass" + i + "FinalReadOnly";
    var homeWorkTag = "#homeroomHomework" + i + "FinalReadOnly";
    var nextClassTag = "#nextHomeroomClass" + i + "FinalReadOnly";
    $( todayTag ).text(homeroomClassTags[i - 1][0].val());
    $( homeWorkTag ).text(homeroomClassTags[i - 1][1].val());
    $( nextClassTag ).text(homeroomClassTags[i - 1][2].val());
  }
  // $("#todaysHomeroomClass2FinalReadOnly").text(homeroomClassTags[1][0].val());
  // console.log($( ".row.read-row").length);
  // console.log($(".row.report").length);
});

//////////////////////////////////////////////////////////////////////////////////////
/////////REPORT LOADING END /////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

function reloadDivs() {
    var rows = $(".row.report")
    console.log("ROWS COunt: " + rows.length);
    rows.each(function(i){
      //console.log("i " + $( this ).attr("name"));
      //console.log("i " + $( this ).attr("id"));
      var tag = $( this );
      var textArea = $( this ).find(".today")
      var homeworkArea = $( this ).find(".homework")
      var nextClassArea = $( this ).find(".nextclass")
      var textAreaID = textArea.attr("id")
      var homeworkID = homeworkArea.attr("id")
      var nextClassID = nextClassArea.attr("id")
      var domToday = $( this ).find(".today").val()
      var domHomework = $( this ).find(".homework").val()
      var domNextClass = $( this ).find(".nextclass").val()
      var name = $( this ).attr("name")
      var domID = $( this ).attr("id")
      var dateString = tag.find(".date").text()
      var dateInt = parseInt(dateString) //$(".row#Grammar:first").find(".date").text()
      //console.log("DATE STRING: " + dateString);
      //console.log("DOM ID: " + domID);
      $.get("/elements/" + name, function(data){
        // if (data.current_report.todaysClass != tag[0].val()) {
        //   tag[0].val(data.current_report.todays_class)
        // }
        // if (data.current_report.todaysClass != tag[0].val()) {
        //       tag[0].val(data.current_report.todays_class)
        // }
        var req = data.current_report.todays_class;
        var reqTime = data.current_report.date_in_ms;
        var reqHomework = data.current_report.homework;
        var reqNextClass = data.current_report.next_class;

        //console.log("Today's class ID:  " + textAreaID );
        //console.log("REQ:" + data.current_report.todays_class + "  Type: " + typeof data.current_report.todays_class);
        //console.log("DOM ID: " + domID + "  Type: " + typeof domID);
        //console.log("DOM Name: " + name + "  Type: " + typeof name);
      //  console.log("Dom Today: " + domToday+ "  Type: " + typeof domToday );
        //$( this ).text("hello")

        if (reqTime > dateInt) {
              console.log("They're Different!");
              var textAreaHash = "textarea.today#" + textAreaID
              var homeworkAreaHash = "textarea.homework#" + homeworkID
              var nextClassHash = "textarea.nextclass#" + nextClassID
              tag.find(textAreaHash).val(req)
              tag.find(homeworkAreaHash).val(reqHomework)
              tag.find(nextClassHash).val(reqNextClass)
              console.log("Target ID: " + textAreaHash  + "Final");
              console.log(textAreaHash);

              var finalTextArea = $(textAreaHash + "Final");
              var finalHomeWorkArea = $(homeworkAreaHash + "Final");
              var finalNextClassArea = $(nextClassHash + "Final");

              var finalTextAreaReadOnly = $(textAreaHash + "FinalReadOnly");
              var finalHomeWorkAreaReadOnly = $(homeworkAreaHash + "FinalReadOnly");
              var finalNextClassAreaReadOnly = $(nextClassHash + "FinalReadOnly");

              console.log("FINAL TEXT AREA: " + finalTextArea.val());

              finalTextArea.html(req);
              finalHomeWorkArea.html(reqHomework);
              finalNextClassArea.html(reqNextClass);

              finalTextAreaReadOnly.html(req);
              finalHomeWorkAreaReadOnly.html(reqHomework);
              finalNextClassAreaReadOnly.html(reqNextClass);

        }
        console.log("DIVS RELOADED");
      });
    })
}



//Download Buttons and downloading reports
var hrClassID = "#homeroomReportFinal";
var hrDownloadButtonID = "homeroomDownload"
var filename = 'homeroom-report.png'
var eslClassID = "#eslReportFinal";
var eslDownloadButtonID = "eslDownload";
var eslFileName = "esl-report.png";
var cdaClassID = "#cdaReportFinal";
var cdaDownloadButtonID = "cdaDownload";
var cdaFileName = "cda-report.png";

function reportDownload(classID, buttonID, filename) {



  setUpDownloadPageAsImage(buttonID);

  function setUpDownloadPageAsImage(id) {
    document.getElementById(id).addEventListener("click", function() {
      html2canvas($(classID)[0]).then(function(canvas) {
        console.log(canvas);
        console.log("MADE IT THIS FAR - Canvas: " + canvas);
        simulateDownloadImageClick(canvas.toDataURL(), filename);

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
}
reportDownload(hrClassID,hrDownloadButtonID,filename);
reportDownload(eslClassID,eslDownloadButtonID,eslFileName);
reportDownload(cdaClassID,cdaDownloadButtonID,cdaFileName);

var traName = "";
var traDest = "";
var traTime = "";
var traFre = "";
var nextTrain = "";
var tMinutesTillTrain = "";

// jQuery global variables
var elTrain = $("#train-name-input");
var elTrainDestination = $("#destination-input");
// form validation for Time using jQuery Mask plugin
var elTrainTime = $("#time-input").mask("00:00");
var elTimeFreq = $("#fre-input").mask("00");

var firebaseConfig = {
    apiKey: "AIzaSyAXmM3HuZeoMyp5IZFsUqCurdFncuFhbDQ",
    authDomain: "my-awesome-project-cshjnim.firebaseapp.com",
    databaseURL: "https://my-awesome-project-cshjnim.firebaseio.com",
    projectId: "my-awesome-project-cshjnim",
    storageBucket: "my-awesome-project-cshjnim.appspot.com",
    messagingSenderId: "600791751939",
    appId: "1:600791751939:web:0a9b8cde3f9faf2e12dd36",
    measurementId: "G-XLM2XPJ8T2"
  };

  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();

  //make button works for adding train
$("#add-train-btn").on("click", function(event) {
   event.preventDefault();
  
    // Grabs user input
    var traName = $("#train-name-input").val().trim();
    var traDest = $("#destination-input").val().trim();
    var traFre = $("#fre-input").val().trim();
    var traTime = moment($("#time-input").val().trim(), "HH:mm").format("X");

    // Creates local "temporary" object for holding data
    var newTra = {
        name: traName,
        destination: traDest,
        frequency: traFre,
        time: traTime,
    };
    // Uploads train data to the database
    database.ref().push(newTra);
  
    // Logs everything to console
    console.log(newTra.name);
    console.log(newTra.destination);
    console.log(newTra.frequency);
    console.log(newTra.time);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#fre-input").val("");
    $("#time-input").val("");
});


database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());
    var traName = childSnapshot.val().name;
    var traDest = childSnapshot.val().destination;
    var traFre = childSnapshot.val().frequency;
    var traTime = childSnapshot.val().time;
  
    console.log(traName);
    console.log(traDest);
    console.log(traFre);
    console.log(traTime);
  
   
    var tFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(traName),
      $("<td>").text(traDest),
      $("<td>").text(traFre),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
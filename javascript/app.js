var traName = "";
var traDest = "";
var traTime = "";
var traFre = "";
var nextTrain = "";
var tMinutesTillTrain = "";


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
    var traTime = moment($("#time-input").val().trim(), "hh:mm").format("X");

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

database.ref().on("child_added", function(snapshot) {

    //  create local variables to store the data from firebase
    var trainDiff = 0;
    var trainRemainder = 0;
    var minutesTillArrival = "";
    var nextTrainTime = "";
    var frequency = snapshot.val().frequency;

    // Moment to get train time difference 
    trainDiff = moment().diff(moment.unix(snapshot.val().time), "minutes");

    // get the remainder of time by using 'moderator' with the frequency & time difference
    trainRemainder = trainDiff % frequency;

    // do some calculation
    minutesTillArrival = frequency - trainRemainder;

    // add minutesTillArrival to now, to find next train & convert to standard time format
    nextTrainTime = moment().add(minutesTillArrival, "m").format("hh:mm A");

    // append to our table of trains
    $("#table-data").append(
        "<tr><td>" + snapshot.val().name + "</td>" +
        "<td>" + snapshot.val().destination + "</td>" +
        "<td>" + frequency + "</td>" +
        "<td>" + minutesTillArrival + "</td>" +
        "<td>" + nextTrainTime + "  "  + "</td></tr>"
    );

    $("span").hide();

    // Hover view first
    $("tr").hover(
        function() {
            $(this).find("span").show();
        },
        function() {
            $(this).find("span").hide();
        });

    // BONUS: CREAT TO REMOVE ITEMS
    $("#table-data").on("click", "tr span", function() {
        console.log(this);
        var trainRef = database.ref();
        console.log(trainRef);
    });
});

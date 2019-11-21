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
    // using built-in methods
    var date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
    // request a weekday along with a long date
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    console.log(date.toLocaleString('de-DE', options));

    // Creates local "temporary" object for holding employee data
    var newTra = {
        name: traName,
        destination: traDest,
        frequency: traFre,
        time: traTime,
    };
    // Uploads employee data to the database
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

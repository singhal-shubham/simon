
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var started = false;


// Animates the clicked button
function animatePress(color) {
  $("#" + color).addClass("pressed");

  setTimeout(function() {
      $("#" + color).removeClass("pressed");
  }, 100);
}


// Function to play sound
function playSound(color){
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}


// Start game
$(document).keydown(function(){

  if (!started) {
    // update displayed level to 0 in the beginning
    $("#level-title").text("Level " + level);
    $("body").removeClass("game-over");

    nextSequence();
  }


});


// Generate Sequence
function nextSequence() {

  level++;
  $("#level-title").text("Level " + level);

  // random number between 0 and 3
  var randomNumber = Math.floor(Math.random()*4);
  // choose a color based on the random number
  var randomChosenColour = buttonColors[randomNumber];
  // appending to the game gamePattern
  gamePattern.push(randomChosenColour);

  //console.log(gamePattern);

  // Animate and Play Sound
  animatePress(randomChosenColour);
  playSound(randomChosenColour)

}


// Check answer
function checkAnswer(currentLevel) {
  if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
    return true;
  } else {
    return false;
  }

}


// Store user clicks
$(".btn").click(function(){

    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);

    //console.log(userClickPattern);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    //Check users answer
    if (checkAnswer(userClickPattern.length - 1)) {
      if (userClickPattern.length === gamePattern.length) {
        userClickPattern = [];
        setTimeout(function() {
          nextSequence();
        }, 1000);
      }
    } else {
      $("#level-title").text("Game Over! Press Any Key to Restart.");
      playSound("wrong");
      $("body").addClass("game-over");
      gamePattern = [];
      userClickPattern = [];
      level = 0;

    }

    //console.log(userClickPattern);
});

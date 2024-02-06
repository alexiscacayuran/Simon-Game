var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(4 * Math.random());
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  //console.log(userClickedPattern);
  $("#" + userChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

$("body").on("keydown", function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("svg:has(#" + currentColour + ")").addClass("pressed");

  setTimeout(function () {
    $("svg:has(#" + currentColour + ")").removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //console.log("Correct");
    if (gamePattern.length === userClickedPattern.length)
      setTimeout(function () {
        nextSequence();
      }, 500);
  } else {
    var wrong = new Audio("./sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over! Press A Key to Start");
    startOver();
  }
}

function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
}

//function to grab variables from URl

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       console.log("false");
       return(false);
}


var pairs = getQueryVariable("level");
var gallery = getQueryVariable("type");

//var pairs = 4;
//var gallery = "aliens";




var count = 0;
var clickz = 0;
var pair = [];
var match = 0;
var vault = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var audio = new Audio('snd/prox.wav');
var audio2 = new Audio('snd/beverly_computer.wav');
var content = [];



//this function creates the content for the cards
function createCards() {
  console.log("creating cards");
  for (i = 0; i < pairs; i++) {
    var position = Math.floor(Math.random() * vault.length);
    var vaultLetter = vault.splice(position, 1);
    content.push(vaultLetter);
    content.push(vaultLetter);
    console.log(content.toString());
  }
}


function flip() {
//change the background of the card
$(this).addClass("flipped");
//clear the mask
$(this).find("div").addClass("clear");
var identifier = $(this).data('value');
pair.push(identifier);
count++;
clickz++;
$(".counter").text(clickz);

//check for match
if (count == 2) {

  //prevent more cards from being clicked
  $(".card").addClass("noClick");
  
  //match affirmative
  if (pair[0] == pair[1]) {
    //remove mask from matching pair
    $("[data-value=" + identifier + "]").addClass("matched").empty();
    audio.play();
    match++;
    $(".matches").text(match);
    $(".card").removeClass("noClick");
    $(".card").removeClass("flipped");
      //check to see if all matches are complete
      if (match == pairs) {
        $(".card").addClass("winner");
        audio2.play();
      }

    //
    
    } 

  //negative
  else {
    setTimeout(function() {
      $(".card").removeClass("flipped");
      $(".mask").removeClass("clear");
      $(".card").removeClass("noClick");
    }, 1000);
  }

  pair = [];
  count = 0;

}

}


function createBoard() {

  createCards();

    

    //add to DOM
    for (i = 0; i < pairs*2; i++) {
      var position = Math.floor(Math.random() * content.length);
      var letter = content.splice(position, 1);
      $("<div class=\"card\" style=\"background-image:url(img/" + gallery + "/" + letter + ".png);\" data-value=" + letter + "><div class=\"mask\"></div></div>").appendTo(".board");

    }

  //attach listeners
  $(".card").click(flip);


};


createBoard();

function reset() {
  console.log("reset");
  $(".matches,.counter").text("");
  $(".board").empty();
  vault = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  content = [];
  count = 0;
  clickz = 0;
  match = 0;

  createBoard();

}

$(document).ready(function(){
  $(".reset").click(function(){
    reset();
  });


});





function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function gameBot() {

  setInterval(function(){ 
    
      var $all = $(".card");
      console.log($all);
      //this ignores the no click class settings and allows clicked items to be reclicked, shortcircuiting the whole thing
      shuffle($all).slice(0,1).triggerHandler("click");

   }, 2000);

    

}

//gameBot();



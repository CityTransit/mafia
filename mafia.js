var numMafia = 0;
var numPlayers;
var assignmentCounter = 0;
var players = 0;
var playerArray;
var extraClasses;

$( "#start" ).on( "click", function() {
    init();
});

$("#nextbtn" ).hide();
$("#spoilerbtn" ).hide();
$( "#nextbtn" ).removeClass("hidden");
$( "#spoilerbtn" ).removeClass("hidden");

$( "#nextbtn" ).click( function() {
    $("#nextbtn" ).hide();
    start();
});

$( "#spoilerbtn" ).click( function() {
    $("#spoilerbtn").fadeOut();
    $("#class").fadeOut(400, function() {
        showclass();
    });
});

function init(){
    numPlayers = document.getElementById("players").value;
    extraClasses = $("input:checked");
    if(numPlayers >= (5 + extraClasses.length)){
        $( "#home" ).remove( ".space" );
        numMafia = Math.round(numPlayers / 3);
        generatePlayerArray();
        console.log(playerArray.toString());
        start();
    } else {       
        $( "#alert" ).html("You need " + (5 + extraClasses.length) + " players to play with the current settings.");
        $( "#alert" ).removeClass("hidden");
    }
}

function generatePlayerArray(){
    playerArray = new Array();
    for(var i = 0; i < numPlayers; i++){
        playerArray[i] = "VILLAGER";
    }
    addClass("MAFIA", numMafia);
    for(var i = 0; i < extraClasses.length; i++){
        addClass(extraClasses[i].value, 1);
    }
}

function addClass(className, amount){
    var placed = 0;
    while(placed < amount){
        var random = Math.floor((Math.random()*numPlayers)+1);
        if(playerArray[random] == "VILLAGER"){
            playerArray[random] = className;
            placed++;
        }
    }
}

function start(){
    if(assignmentCounter === 0){
        $( "#class" ).removeClass("hidden");
    }
    else if (assignmentCounter >= numPlayers){
        moderator();
    }
    else {
        $("#class" ).html("Hand phone to next player...");
    }
    var t1 = setTimeout("spoiler()",3000);
}

function spoiler(){
    $( "#class" ).html("You are...");
    $( "#spoilerbtn" ).show();
}

function showclass(){
    $( "#class" ).html(playerArray[assignmentCounter]);
    assignmentCounter++;
    $( "#class").fadeIn( 400, function() {
        $("#nextbtn" ).show();
    });
}

function moderator(){
  $("#class" ).html("Play the game!<br><h4>Moderator placeholder</h4>");
}

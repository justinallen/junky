var readlineSync = require('readline-sync');
 
// Scenes

// scene prototype
function Scene(name) {
	this.name = name;
	this.description = null;
	this.talk = null;
	this.nextScene = null;
	this.availableScenes = [];
}

// the scenes
var tenderloin_apartment = new Scene("Tenderloin Apartment");
var polk_street = new Scene("Gritty lower Polk St.");
var civic_center_bart = new Scene("Civic Center Bart Station");
var chinatown = new Scene("Chinatown");

// living room
tenderloin_apartment.description = "A brown carpeted shabby basement studio with a flimsy door and a velvet painting on the wall. Violeta's place. She's not home right now.";
tenderloin_apartment.nextScene = polk_street;

// the street
polk_street.description = 'A gritty urban street in the San Francisco Tenderloin: pigeons, cars, lurching buses and slumping junkies.';
polk_street.availableScenes.push(tenderloin_apartment, civic_center_bart);
polk_street.nextScene = civic_center_bart;
polk_street.talk = function() {
	console.log('"Hey buddy, spare some change?" you say to a random tech worker looking dude. He walks past avoiding eye contact, probably here to score drugs.');
}

// bart station
civic_center_bart.description = 'The Bart subway station: a 1970s tile-covered warren of tunnels under the downtown streets, echoing with clattering heels.';
civic_center_bart.decision = function() {

	console.log("You can catch Bart or MUNI trains all over the Bay Area from here. But there's only a few places you feel like going.");
	console.log("[chinatown, oakland, mission district]");

	var destination = readlineSync.question('you go to: ');

	if (destination == "exit station") { 
		console.log("you leave the station");
		activeScene = polk_street;
   	runScene();		
	}

	if (destination == "chinatown") {
		console.log("you arrive in Chinatown.");
		activeScene = chinatown;
		console.log(activeScene.description);
		runScene();
	}

}

// chinatown
chinatown.description = 'Narrow crowded streets, ornamented buildings, ducks hanging in windows, and the sweet smell of cooking.';



// Stock messages
var options = "you can [look, talk, act, leave, status, end game]";
var noAction = "There's no action you can take here.";
var talkFail = "There's no one to talk to here. You're alone."

var alive = true;
var addiction = 6; // how badly do you need drugs, 1 - 10
var money = 500; // how much cash money you have






// Welcome message
console.log("Welcome to JUNKY, a text-based adventure."); 
console.log("- - - - - - - - - - - - - - - - - - - - - ");
console.log("You're a would-be writer, strung out on heroin, down on your luck and running out of chances."); 
console.log("Left L.A. in a trail of debts to see if you can strike some money in San Francisco."); 
console.log("-   +   -   +   -   +   -   +   -   +   - ");
console.log("You wake. It's late. Wonder what time it is... time to hit the street.");

// Load first scene
var activeScene = tenderloin_apartment;

console.log(activeScene.name);
console.log(activeScene.description); 

// start the game engine
runScene();	

// the game engine
function runScene() {

	if (activeScene.decision) {
		activeScene.decision();
	}

  console.log(options);	
  
	var move = readlineSync.question('your move: ');

	console.log(move);

	if (move == "look") { 
		console.log(activeScene.description); 
	}

	if (move == "end game") { 
		console.log("goodbye");
		return;
	}

	if (move == "act") { 
		console.log(noAction); 
	}

	if (move == "talk") { 
		if (activeScene.talk == null) {
			console.log(talkFail); 				
		} else {
			activeScene.talk();
		}
	}

	if (move == "status") { 
		if (addiction > 5) {
			console.log('You feel tense right now.');			
		} else {
			console.log('You feel ok right now.');			
		}
		console.log('Your need for dope rates around ' + addiction + ' and you have ' + money + ' in cash.');
	}

	if (move == "leave") {
		console.log('available scenes:' + activeScene.availableScenes);
		if (activeScene.availableScenes.length > 1) {
			console.log('You can leave to:')
			activeScene.availableScenes.forEach(function(scene){
				console.log(scene.name)
			});
			var destination = readlineSync.question('You leave for: ');	
			activeScene.availableScenes.forEach(function(scene){
				if (destination == scene.name) {
					activeScene = scene;
					console.log(activeScene.name);
					console.log(activeScene.description);					
				}
			});					 				
		} else {
			console.log("You leave " + activeScene.name + " for:");
			activeScene = activeScene.nextScene;
			// activeScene = polk_street;
			console.log(activeScene.name);
			console.log(activeScene.description);
		}
	}

   runScene();

}














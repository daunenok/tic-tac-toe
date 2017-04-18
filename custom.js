$(document).ready(function() {
	var wins = [[0,1,2], [3,4,5], [6,7,8],
				[0,3,6], [1,4,7], [2,5,8],
				[0,4,8], [2,4,6]];
	var currentGame = new Game();
	var playerX = new Player();
	var playerO = new Player();

	$(".play button").on("click", function() {
		currentGame.clearGame();
		currentGame.currentStep = "X";
	});

	$(".item").hover(
		function() {
			var count = $(this).index(".item");
			if (currentGame.currentStep) {
				if (currentGame.cells[count])
					return;
				$(this).text(currentGame.currentStep);	
			}
		}, 
		function() {
			var count = $(this).index(".item");
			if (currentGame.currentStep) {
				if (currentGame.cells[count])
					return;
				$(this).text("");	
			}
		}
	);

	$(".item").on("click", function() {
		var count = $(this).index(".item");
		if (currentGame.currentStep && !currentGame.cells[count]) {
			if (currentGame.currentStep == "X") {
				playerX.addStep(count);
			} else {
				playerO.addStep(count);
			}
			$(this).text(currentGame.currentStep);
			currentGame.cells[count] = currentGame.currentStep;
			if (currentGame.checkEnd()) {
				currentGame.endGame();
			} else {
				currentGame.currentStep = 
					currentGame.currentStep == "X" ? "O" : "X";
			}
		}
	});

	$("#alert button").on("click", function() {
		$("#alert").hide();
		currentGame.clearGame();
	});

	function Game() {
		this.currentStep = 0,
		this.cells = ["", "", "", "", "", "", "", "", ""],

		this.clearGame = function(){
			playerX.steps = [];
			playerO.steps = [];
			this.cells = ["", "", "", "", "", "", "", "", ""];
			$(".item").text("");
		},

		this.checkEnd = function() {
			var result;
			if (this.currentStep == "X") {
				result = playerX.checkStep();
				if (result) this.finish = "Player X won!";
			} else {
				result = playerO.checkStep();
				if (result) this.finish = "Player O won!";
			}
			var cond = 
			(playerX.steps.length + playerO.steps.length == 9);
			if (cond) this.finish = "Draw...";
			return result || cond;
		},

		this.endGame = function() {
			$("#alert").show();
			$("#alert span").text(this.finish);
			this.currentStep = 0;
		}
	}

	function Player() {
		this.steps = [],
		this.addStep = function(step) {
			this.steps.push(step);
		},
		this.checkStep = function() {
			var result;
			for (var i = 0; i < 8; i++) {
				result = true;
				for (var j = 0; j < 3; j++) {
					if (this.steps.indexOf(wins[i][j]) < 0) {
						result = false;
						break;
					}
				}
				if (result) return true;
			}
			return false;
		}
	}
});
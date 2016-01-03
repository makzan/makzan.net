// annonymouse function to put all variables local scope by default.
;(function(){
  var game  = this.cardBattleGame = this.cardBattleGame || {};

  // Main Game Flow
  game.flow = {
    startOver: function() {
      game.startScene.show();
      game.gameScene.hide();
      game.gameOverScene.hide();
    },
    startGame: function() {
      game.startScene.hide();
      game.gameScene.show();
      game.gameOverScene.hide();
    },
    gameOver: function() {
      game.startScene.hide();
      game.gameScene.hide();
      game.gameOverScene.show();
    }
  }

  // Entry Point
  var init = function() {
    console.log("Welcome to Card Battle Game.");

    game.startScene.setup();
    game.gameScene.setup();
    game.gameOverScene.setup();
  }

  // window.onload = init; // use window.onload (or when DOM ready) if the script is not placed at the end of the HTML file.
  init();


})();



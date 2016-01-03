;(function(){
  var game = this.cardBattleGame = this.cardBattleGame || {};

  // Generic Scene object.
  var scene = game.scene = {
    node: document.querySelector('.scene'),
    setup: function(){},
    onShow: function(){}, // hook for child objects to use.
    show: function() {
      this.node.classList.remove('out');
      this.node.classList.add('in');
      this.onShow();
    },
    hide: function() {
      this.node.classList.remove('in');
      this.node.classList.add('out');
    }
  };

  // Start Scene
  var startScene = game.startScene = Object.create(scene);
  startScene.node = document.getElementById('start-scene');
  startScene.setup = function() {
    document.getElementById('start-btn').onclick = function(){
      game.flow.startGame();
      return false;
    };
  };

  // Gameover Scene
  var gameOverScene = game.gameOverScene = Object.create(scene);
  gameOverScene.node = document.getElementById('gameover-scene');
  gameOverScene.setup = function() {
    document.getElementById('back-to-menu-button').onclick = function() {
      game.flow.startOver();
    };
  };
  gameOverScene.onShow = function() {
    if (game.HP.isPlayerDead()) {
      this.node.classList.add('loss');
      this.node.classList.remove('won');
    } else {
      this.node.classList.add('won');
      this.node.classList.remove('loss');
    }
  }

})();
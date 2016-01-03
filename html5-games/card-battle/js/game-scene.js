/* randomize the power value */
;(function() {
  var game = this.cardBattleGame = this.cardBattleGame || {};

  // Cache elements query
  var allPowerElms = document.querySelectorAll('.power');

  game.randomizePower = function() {
    allPowerElms.forEach(function(elm){
      elm.textContent = Math.round(Math.random() * 60) + 40;
    });
  }

})();

// game scene module
;(function(){
  var game = this.cardBattleGame = this.cardBattleGame || {};

  // Card definition for card instance that need power calculation.
  var Card = (function(){
    function Card(node) {
      this.node = node;
    }
    Card.prototype.power = function() {
      return 1 * this.node.querySelector('.power').textContent // node value string to int
    }
    return Card;
  })();

  // cache node querying
  var allPlayerCardElms = document.querySelectorAll('.card.player');
  var allCardElms = document.querySelectorAll('.card');
  var opponentCard = new Card(document.querySelector('.card.opponent'));
  var selectedCard = undefined;

  var gameScene = game.gameScene = Object.create(game.scene);
  gameScene.node = document.getElementById('game-scene');
  gameScene.onShow = function() {
    game.HP.reset();
    this.startGame();
  }
  gameScene.startGame = function() {
    this.restartGame();
  }
  gameScene.restartGame = function() {
    game.randomizePower();

    /* reset the transition state */
    allCardElms.forEach(function(elm){
      elm.classList.remove('in');
      elm.classList.add('out');
    });
    allPlayerCardElms.forEach(function(elm){
      elm.classList.remove('selected');
      elm.classList.add('flipped');
    })

    var animatePlayerCardsIn = function() {
      allPlayerCardElms.forEach(function(elm){
        elm.classList.remove('out');
        elm.classList.add('in');
        elm.classList.add('flipped');
      });
    }
    setTimeout(animatePlayerCardsIn, 800); // delay a while to create a refresh card illusion
  }
  gameScene.setup = function() {
    // Battle animation sequence
    var beginBattleAnimation = function() {
      opponentCard.node.classList.remove('out');
      opponentCard.node.classList.add('in');
      console.log("Power of opponent card: ", opponentCard.power());
      opponentCard.node.onTransitionEnd(function(e) {
        //only execute the attack animation when transition 'in'
        if (!e.target.classList.contains('in')) {
          return;
        }
        var blazeLeft = document.querySelector('.blaze.toward-left');
        blazeLeft.classList.add('attack');
        blazeLeft.onAnimationEnd(function(e){
          e.target.classList.remove('attack');

          opponentCard.node.classList.add('shake');
          game.HP.hurtOpponent(selectedCard.power(), opponentCard.power());
          opponentCard.node.onAnimationEnd(function(e){
            opponentCard.node.classList.remove('shake');

            var blazeRight = document.querySelector('.blaze.toward-right');
            blazeRight.classList.add('attack');
            blazeRight.onAnimationEnd(function(e){
              e.target.classList.remove('attack');

              selectedCard.node.classList.add('shake');
              game.HP.hurtPlayer(opponentCard.power(), selectedCard.power());
              selectedCard.node.onAnimationEnd(function(e){
                selectedCard.node.classList.remove('shake');

                if (game.HP.isSomeoneDead()) {
                  game.flow.gameOver();
                } else {
                  gameScene.restartGame();
                }
              });
            });
          });
        });
      });
    }

    // each player card
    allPlayerCardElms.forEach(function(elm){
      elm.onclick = function(){
        /* select a card */
        selectedCard = new Card(elm);
        elm.classList.remove('flipped');
        elm.classList.add('selected');

        console.log("Power of selected card: ", selectedCard.power());

        /* remove non-selected cards */
        document.querySelectorAll('.flipped').forEach(function(elm){
          elm.classList.remove('in');
          elm.classList.add('out');
        });

        /* battle */
        beginBattleAnimation();
      }
    });
  }
})();
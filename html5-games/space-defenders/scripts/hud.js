var game = this.game || (this.game={});
var createjs = createjs || {};

;(function(game, cjs){

  var addButtons = document.querySelectorAll('.add-button');

  // indicatiors
  var lives = document.getElementById('lives');
  var energies = document.getElementById('energies');
  var waves = document.getElementById('waves');

  for(var i=0, len=addButtons.length; i<len; i++) {
    var button = addButtons[i];
    button.onmousedown = function(e) {
      if (cjs.Ticker.getPaused()) { return; }
      var buildingType = this.dataset.type;

      // have enough energy
      var cost = game[buildingType].cost;
      if (cost && game.energies >= cost) {
        game.energies -= cost;
        var event = new cjs.Event('readyToPlaceBuilding');
        event.buildingType = buildingType;
        game.dispatchEvent(event);
      } else { // no enough energy

      }

    }
  }

  function tick() {
    lives.textContent = game.lives;
    energies.textContent = game.energies;
    waves.textContent = game.waves.nextWave + 1; // logic starts at 0, our display starts at 1
  }

  cjs.Ticker.addEventListener('tick', tick);


}).call(this, game, createjs);
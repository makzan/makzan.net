var game = this.game || (this.game={});

;(function(game){

  game.cash = 1000;
  game.view.refreshCash();

  game.sushiOnHand = [];

  // ingredients amount
  game.amount = [];
  game.amount['rice'] = 10;
  game.amount['octopus'] = 10;
  game.amount['salmon'] = 10;
  game.amount['salmon-roe'] = 10;
  game.amount['seaweed'] = 10;
  game.amount['egg'] = 10;

  game.increaseAmount = function() {
    for(var key in game.amount) {
      if (game.amount.hasOwnProperty(key)) {
        game.amount[key] += 10;
        game.view.refreshAmount(key);
      }
    }
  };

  // customer queues
  game.queues = [];
  game.queues[0] = [];
  game.queues[1] = [];

  game.removeFromQueue = function(index) {
    game.queues[index].shift();
  };

  // receipes
  game.receipes = [];
  game.receipes['sushiSalmonRoe'] = ['rice', 'seaweed', 'seaweed', 'salmon-roe'].sort(); // ensure it is sorted
  game.receipes['sushiOctopus'] = ['rice', 'octopus'].sort();
  game.receipes['sushiSalmon'] = ['rice', 'salmon'].sort();
  game.receipes['sushiEgg'] = ['rice', 'egg', 'seaweed'].sort();


}).call(this, game);
var game = this.game || (this.game={});
var createjs = createjs || {};
var lib = lib || {};

;(function(game, cjs, lib){

  function Customer(number, leftOrRight) {
    cjs.Container.call(this); //super

    this.number = number;
    this.wants = randomWants() ;
    this.hasEaten = false; // has eaten the sushi and leaving?
    this.hasShownUp = false; // queued or has shown in front of the queue?
    this.hasWaitForTicks = 0; // how much time waste in waiting?

    // queue index
    this.queueIndex = 0;
    if (leftOrRight === 'right') this.queueIndex = 1;

    this.on('tick', this.tick);
  }
  Customer.prototype = Object.create(cjs.Container.prototype);
  Customer.prototype.tick = function() {
    this.hasWaitForTicks += 1;
    if (this.hasWaitForTicks === 300) { // turns angry
      this.graphics.gotoAndStop('angry');
    }
    if (this.hasWaitForTicks > 500) { // waited too long
      this.remove();
    }

    if (this.hasEaten) {
      this.remove();
    }
  };

  Customer.prototype.showUp = function() {
    this.graphics = new lib['Customer'+this.number]();
    this.graphics.gotoAndStop('normal'); // normal state at first
    this.graphics.on('click', customerOnClick.bind(this));
    this.addChild(this.graphics);

    // thinking bubble
    var bubble = new lib.Bubble();
    bubble.x = -40;
    bubble.y = -120;
    this.addChild(bubble);

    // set the type
    bubble.sushiType.gotoAndStop(this.wants);

    // scale down if in small screen
    console.log(game.stage.canvas.width);
    if (game.stage.canvas.width <= 320){
      this.scaleX = this.scaleY = 0.6;
    }
    if (game.stage.canvas.height <= 150) {
      bubble.x = -40;
      bubble.y = -50;
      bubble.scaleX = bubble.scaleY = 1.5;
      this.scaleX = this.scaleY = 0.5;
    };

    this.hasShownUp = true;
  };

  Customer.prototype.remove = function() {
    // remove customer
    this.parent.removeChild(this);
    game.removeFromQueue(this.queueIndex);
  };

  game.Customer = Customer;


  // customer's helper functions
  function randomWants() {
    options = ['sushiSalmonRoe', 'sushiOctopus', 'sushiSalmon', 'sushiEgg'];

    var index = Math.floor(Math.random() * options.length);
    return options[index];
  }

  function customerOnClick() {
    console.log(this.wants);

    // check if is what customer wants
    var isEqual = game.helper.arrayIsEqual(game.sushiOnHand, game.receipes[this.wants]);
    if (isEqual) {
      console.log("Yeah");
      game.cash += 120;
      game.view.refreshCash();
      this.hasEaten = true;
      cjs.Sound.play("earn-money");
    } else {
      console.log("NOOOO");
    }
    game.trashSushi();

  }

}).call(this, game, createjs, lib) ;

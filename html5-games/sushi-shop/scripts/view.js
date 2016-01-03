var game = this.game || (this.game={});
var createjs = createjs || {};

;(function(game, cjs){

  game.view = {};

  game.view.init = function() {
    initCustomerView();
    initDOMElements();
    initResizeHandler();
  };

  game.view.clearAllIngredients = function() {
    game.helper.clearChildren(others);
    game.helper.clearChildren(rices);
    game.helper.clearChildren(seaweeds);
  };

  // individual ingredient node.
  var ingredientsNode = document.getElementById('ingredients');
  game.view.refreshAmount = function(type) {
    ingredientsNode.querySelector(".ingredient[data-type="+ type +"]").textContent = game.amount[type];
  };

  var cashNode = document.getElementById('status-bar');
  game.view.refreshCash = function(){
    cashNode.textContent = '$' + game.cash;
  }

  // ------ view's internal logic starts here

  function initCustomerView() {
    // Canvas
    game.canvas = document.getElementById('canvas');

    game.stage = new cjs.Stage(game.canvas);
    cjs.Touch.enable(game.stage, /*single touch=*/ true, /*allow default=*/ true);

    cjs.Ticker.setFPS(60);
    cjs.Ticker.addEventListener('tick', game.stage); // add game.stage to ticker make the stage.update call automatically.

    game.view.queueLeft = new cjs.Container();
    game.stage.addChild(game.view.queueLeft);

    game.view.queueRight = new cjs.Container();
    game.stage.addChild(game.view.queueRight);

  }

  function initDOMElements() {
    var ingredients = document.querySelectorAll('.ingredient');
    for (var i=0, len=ingredients.length; i<len; i++) {
      var element = ingredients[i];
      element.onclick = ingredientOnClick;
    };

    // trash button
    var deleteButton = document.getElementById('delete-sushi-btn');
    deleteButton.onclick = function(){
      game.trashSushi();
      cjs.Sound.play("button");
    };

    // phone call to refill ingredients
    var phoneBtn = document.getElementById('phone');
    phoneBtn.onclick = function() {
      var needCash = 600;
      if (game.cash >= needCash) {
        game.increaseAmount();
        game.cash -= needCash;
        game.view.refreshCash();
        cjs.Sound.play("refill");
      }
    };
  }

  function initResizeHandler() {
    var customerView = document.getElementById('customer-view');

    var getBorderWidths = function(element) {
      var style = getComputedStyle(element);
      var borderWidths = style.borderWidth.split(' ');

      var top, right, bottom, left;
      top = right = bottom = left = parseInt(borderWidths[0]);

      if (borderWidths.length >= 2) {
        right = left = parseInt(borderWidths[1]);
      }
      if (borderWidths.length >= 3) {
        bottom = parseInt(borderWidths[2]);
      }
      if (borderWidths.length >= 4) {
        left = parseInt(borderWidths[3]);
      }

      return {
        top: top,
        right: right,
        bottom: bottom,
        left: left,
      };
    };

    var resizeCanvas = function() {
      var borderWidths = getBorderWidths(customerView);
      game.canvas.width = customerView.offsetWidth - borderWidths.left - borderWidths.right; // border-width of left + right
      game.canvas.height = customerView.offsetHeight - borderWidths.top - borderWidths.bottom; // border-width of top + bottom
    };

    resizeCanvas();
    repositionCustomer();

    window.onresize = function(){
      resizeCanvas();
      repositionCustomer();
    };

    // 0.35 and 0.8 positions shows both queues in better spacing.
    var leftPosition = 0.35;
    var rightPosition = 0.8;
    function repositionCustomer() {
      game.view.queueLeft.x = game.canvas.width * leftPosition;
      game.view.queueLeft.y = game.canvas.height;
      game.view.queueRight.x = game.canvas.width * rightPosition;
      game.view.queueRight.y = game.canvas.height;
    }
  }



  // logic of clicking the ingredients

  // 3 layers in sushi board
  var others = document.getElementById('others');
  var rices = document.getElementById('rices');
  var seaweeds = document.getElementById('seaweeds');

  var addIngredientToScreen = function(type) {
    var isEqualToAnySushi = false;
    var sushiName = '';
    // loop all receipes
    for (var key in game.receipes) {
      if (game.receipes.hasOwnProperty(key)) {
        isEqualToAnySushi = game.helper.arrayIsEqual(game.sushiOnHand, game.receipes[key]);
        sushiName = key;
        if (isEqualToAnySushi) {
          break; // must break the loop to keep the current equal one.
        }
      }
    }

    // UI
    // show ingredients or final sushi image?
    if (isEqualToAnySushi) {
      // show one sushi image instead of individual ingredient.
      game.view.clearAllIngredients();

      var sushi = document.createElement('div');
      sushi.classList.add(sushiName, 'sushi');
      others.appendChild(sushi);
    } else {
      // clone the individual ingredient to sushi board.
      var node = ingredientsNode.querySelector(".ingredient[data-type="+ type +"]").cloneNode();
      if (type === 'rice') {
        rices.appendChild(node);
      } else if (type === 'seaweed') {
        seaweeds.appendChild(node);
      } else {
        others.appendChild(node);
      }
    }
  };

  var ingredientOnClick = function() {
    cjs.Sound.play("button");

    var type = this.dataset.type;

    // reduce amount
    if (game.amount[type] > 0) {
      game.amount[type] -= 1;
      game.view.refreshAmount(type);
    } else {
      return;   // EXIT function if not enough amount.
    }

    // DATA
    game.sushiOnHand.push(type);
    game.sushiOnHand = game.sushiOnHand.sort();

    addIngredientToScreen(type);


  };


}).call(this, game, createjs);
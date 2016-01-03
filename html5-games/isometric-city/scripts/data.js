;(function(game){
  game.BuildingsData = {};
  game.BuildingsData['CoinsGenerator'] = {
    className: 'CoinsGenerator',
    stepsSeconds: [10, 20],
    needCoins: 20,
    needPopulations: 10,
    power: 0
  };
  game.BuildingsData['PowerSupply'] = {
    className: 'PowerSupply',
    stepsSeconds: [5, 10],
    needCoins: 10,
    needPopulations: 0,
    power: 15
  };
  game.BuildingsData['Merchant'] = {
    className: 'Merchant',
    stepsSeconds: [20, 40],
    needCoins: 150,
    needPopulations: 20,
    power: 0
  };

}).call(this, game);

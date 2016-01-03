// game HP module
;(function(){
  var game = this.cardBattleGame = this.cardBattleGame || {};

  var HP = game.HP = {
    playerHP: 100,
    opponentHP: 100,
    playerHPView: document.querySelector('.hp.player'),
    opponentHPView: document.querySelector('.hp.opponent'),
    reset: function() {
      this.playerHP = 100;
      this.opponentHP = 100;
      this.playerHPView.style.width = '210px';
      this.opponentHPView.style.width = '210px';
    },
    isSomeoneDead: function() {
      if (this.playerHP <= 0 || this.opponentHP <= 0) return true;
      return false;
    },
    isPlayerDead: function() {
      if (this.playerHP <= 0) return true;
      return false;
    },
    hurtPlayer: function(attackPower, defensePower) {
      var diff = attackPower - defensePower;
      if (diff > 0) {
        this.playerHP = Math.max(this.playerHP - diff, 0);
        this.playerHPView.style.width = this.playerHP / 100 * 210 + 'px';
      }
    },
    hurtOpponent: function(attackPower, defensePower) {
      var diff = attackPower - defensePower;
      if (diff > 0) {
        this.opponentHP = Math.max(this.opponentHP - diff, 0);
        this.opponentHPView.style.width = this.opponentHP / 100 * 210 + 'px';
      }
    }
  };
})();
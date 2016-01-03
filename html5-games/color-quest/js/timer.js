(function(){
  var game = window.colorQuestGame = window.colorQuestGame || {};

  game.timer = {
      interval: undefined,
      countFrom: 60, // second
      count: this.countFrom,
      progressView: document.getElementById('timer'),
      restart: function() {
        if (this.interval) {
          clearInterval(this.interval);
        }
        this.count = this.countFrom;
        this.interval = setInterval((this.tick).bind(this), 1000);
      },
      stop: function() {      	
  		clearInterval(this.interval);      	
      },
      tick: function() {
        this.count -= 1;
        if (this.count <= 0) {
          this.count = 0;
          clearInterval(this.interval);
          game.flow.gameOver();
        }        


        // update the view
        var progress = this.count / this.countFrom * 100;
        console.log(progress);
        this.progressView.style.width = progress + "%";
      }
    }

})();
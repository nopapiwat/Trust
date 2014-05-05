var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super();
	this.background = new Background();
	this.addChild(this.background);

	this.redEffect = new GameEffect();
	this.addChild(this.redEffect);

	this.setKeyboardEnabled(true);
	this.setMouseEnabled(true);
	this.scheduleUpdate();

	this.ring = new Ring();
	this.addChild(this.ring);
	this.ring.setLimit(800,600);
	this.ring.setPosition(400,300);
	this.ring.scheduleUpdate();

	this.score = 0;
	this.scoreLabel = cc.LabelTTF.create('0','Arial',32);
	this.scoreLabel.setPosition(new cc.Point(700,500));
	this.addChild(this.scoreLabel);
	
	this.combo = 0;
	this.comboLabel = cc.LabelTTF.create('0 Combo','Arial',32);
	this.comboLabel.setPosition(new cc.Point(400,500));
	this.addChild(this.comboLabel);

	this.createLifes();

	this.count = 0;
	this.createRate = 150;
	this.decreaseRate = 5;
        return true;
    },

    createLifes: function(){
    	this.life = 3;
	this.lifes = [];
	for(var i = 1; i <= this.life; i++){
		var lifeImage = new Life();
		lifeImage.setPosition(new cc.Point(i*60,500));
		this.lifes.push(lifeImage);
		this.addChild(lifeImage);
	}
    },

    decreaseLifes: function(){
    	var lifeImage = this.lifes.pop();
	this.removeChild(lifeImage);
	this.life-=1;
    },

    onMouseMoved: function(event){
    	this.ring.handleMouseMoved(event.getLocation());
    },

    manageKey: function(key,value){
	    var tmp;
	    switch(key){
		case cc.KEY.left:
		case cc.KEY.right:
			tmp = "X";
			if (key == cc.KEY.left && value!=0) value = -1;
			break;
		case cc.KEY.up:
		case cc.KEY.down:
			tmp = "Y";
			if (key == cc.KEY.down && value!=0) value = -1;
			break;
		default:
			break;
	    }

	    this.ring.setDirection(tmp,value);

    },

    onKeyDown: function(e){
    	this.manageKey(e,1);
    },

    onKeyUp: function(e){
    	this.manageKey(e,0);
    },

    checkCatching: function(ball){
	if (ball.state == Ball.STATE.MOVE){
		var ballRect = ball.getBoundingBoxToWorld();
		var ringRect = this.ring.getBoundingBoxToWorld();
		if( cc.rectIntersectsRect(ballRect,ringRect) ){
		    if(ball.color == Ball.COLOR.BLUE) {
			    this.score+=ball.getScore();
			    this.score+=this.combo*20;
			    this.combo+=1;
		    }
		    else {
			    this.redEffect.run();
			    this.decreaseLifes();
			    this.combo = 0;
		    }
		    this.removeChild(ball);
		    this.comboLabel.setString(this.combo+" Combo");
   		}
	}
    },	

   checkBallCreation: function(){
	if(this.count%this.createRate==0){
		var ball = new Ball();
		this.addChild(ball);
		ball.setScreen(this);
		this.count=0;
		this.createRate-=Math.round(this.createRate/40*this.createRate/40);
		if (this.createRate < 20) this.createRate = 20;
	}
	this.count+=1;
    },

   gameOver: function(){
  	var conf = confirm("GAME OVER\nYour score : "+this.score+"\nRetry?");
	if(conf) location.reload();
	else this.end();
	return;
   },

   end: function(){
   	this.unscheduleUpdate();	
   },

   update: function(dt){
	this.checkBallCreation();
   	this.ring.setPosition(new cc.Point(this.ring.x,this.ring.y));
	this.scoreLabel.setString(this.score);
	if(this.life <= 0) this.gameOver();

    }

});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});


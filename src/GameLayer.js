var GameLayer = cc.LayerColor.extend({

    ctor: function() {
	this._super();

	this.initComponent();
	this.balls = [];
	this.junk = [];
	this.reset();

	this.setKeyboardEnabled(true);
	this.setMouseEnabled(true);
	this.setTouchEnabled(true);
	this.scheduleUpdate();
        return true;
    },

    reset: function(){
	this.state = GameLayer.STATE.STOP;
	this.delay = 50;
	this.life = 3;
	this.score = 0;
	this.combo = 0;
	this.count = 0;
	this.createRate = 100;
	this.decreaseRate = 5;
	this.createLifes();
	this.ring.setPosition(new cc.Point(400,300));
	while(this.balls.length != 0){
		var ball = this.balls.pop();
		this.removeChild(ball);
		this.junk.push(ball);
	}
    },

    initComponent: function(){
	this.background = new Background();
	this.addChild(this.background);

	this.redEffect = new GameEffect();
	this.addChild(this.redEffect);
	
	this.ring = new Ring();
	this.addChild(this.ring);
	this.ring.setLimit(800,600);
	this.ring.scheduleUpdate();

	this.scoreLabel = cc.LabelTTF.create('0','Arial',32);
	this.scoreLabel.setPosition(new cc.Point(700,500));
	this.addChild(this.scoreLabel);
	
	this.comboLabel = cc.LabelTTF.create('0 Combo','Arial',32);
	this.comboLabel.setPosition(new cc.Point(400,500));
	this.addChild(this.comboLabel);

	this.addScoreLabel = cc.LabelTTF.create('','Arial',20);
	this.addScoreLabel.setPosition(new cc.Point(700,475));
	this.addChild(this.addScoreLabel);

	this.addComboScoreLabel = cc.LabelTTF.create('','Arial',20);
	this.addComboScoreLabel.setPosition(new cc.Point(700,450));
	this.addChild(this.addComboScoreLabel);
    },

    createLifes: function(){
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

    onTouchesMoved: function(pTouch,pEvent){
   	this.ring.handleMouseMoved(pTouch[0].getLocation());
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

    handleBlue: function(ball){
	cc.AudioEngine.getInstance().playEffect('Sounds/blue.mp3');
	var ballScore = ball.getScore();
    	var comboScore = this.combo*20;
    	this.addScoreLabel.setString("+"+ballScore);		    
	if(this.combo >= 1)
		this.addComboScoreLabel.setString("+"+(this.combo+1)+"*20");
    	this.score+=ballScore+comboScore;
	this.combo+=1;
    },

    handleRed: function(){
	cc.AudioEngine.getInstance().playEffect('Sounds/red.mp3');
	this.redEffect.run();
	this.decreaseLifes();
	this.combo = 0;
	this.addScoreLabel.setString("");
	this.addComboScoreLabel.setString("");
    },

    checkMovingBallCatching: function(ball){
	    var ballRect = ball.getBoundingBoxToWorld();
	    var ringRect = this.ring.getBoundingBoxToWorld();
	    if( cc.rectIntersectsRect(ballRect,ringRect) ){
		    if(ball.color == Ball.COLOR.BLUE){
			    this.handleBlue(ball);
		    }
		    else
			    this.handleRed();
		    this.removeChild(ball);
		    this.junk.push(ball);
		    this.comboLabel.setString(this.combo+" Combo");
	    }
	    else
		    this.balls.push(ball);
    },

    checkBallsCatching: function(){
	var oldBalls = this.balls;
	this.balls = [];
	var ballsLength = oldBalls.length;
	for(var i = 0; i < ballsLength; i++){
		var ball = oldBalls.pop();
		if (ball.state == Ball.STATE.MOVE){
			this.checkMovingBallCatching(ball);
		}
		else 
			this.balls.push(ball);
	}
    },

   checkBallCreation: function(){
	if(this.count%this.createRate==0){
		var ball;
		if(this.junk.length == 0)
			ball = new Ball();
		else{
			ball = this.junk.pop();
			ball.reset();
		}
		this.balls.push(ball);
		this.addChild(ball);
		this.count=0;
		this.createRate-=Math.round(this.createRate/40*this.createRate/40);
		if (this.createRate < 20) this.createRate = 20;
	}
	this.count+=1;
    },

   gameOver: function(){
  	var conf = confirm("GAME OVER\nYour score : "+this.score+"\nRetry?");
	if(conf) {
		this.reset();
	}
	else this.end();
	return;
   },

   end: function(){
   	this.unscheduleUpdate();
	location.reload();
   },

   update: function(dt){
	if (this.state == GameLayer.STATE.START){
		this.checkBallCreation();
	}
	else{
		this.delay -= 1;
		console.log(this.delay);
		if (this.delay == 0) this.state = GameLayer.STATE.START;
	}
   	this.ring.setPosition(new cc.Point(this.ring.x,this.ring.y));
	this.checkBallsCatching();
	this.scoreLabel.setString(this.score);
	if(this.life <= 0) this.gameOver();

    }

});

GameLayer.STATE = {
	START: 1,
	STOP: 0
};

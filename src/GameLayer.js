var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
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

	this.life = 3;
	this.lifeLabel = cc.LabelTTF.create('3','Arial',32);
	this.lifeLabel.setPosition(new cc.Point(100,500));
	this.addChild(this.lifeLabel);

	this.count = 0;
        return true;
    },

    /*onMouseMoved: function(event){
	    var pos = event.getPosition();
	    this.ring.setPosition(new cc.Point(pos.x,pos.y));
	    console.log(pos.x+" "+pos.y);
	    return true;
    },*/

    onMouseMoved: function(event){
    	this.ring.handleMouseMoved(event.getLocation());
    },

    manageKey: function(key,bool){
	    var tmp;
	    switch(key){
		case cc.KEY.left:
			tmp = "left";
			break;
		case cc.KEY.right:
			tmp = "right";
			break;
		case cc.KEY.up:
			tmp = "up";
			break;
		case cc.KEY.down:
			tmp = "down";
			break;
		default:
			break;
	    }
	    this.ring.setDirection(tmp,bool);

    },

    onKeyDown: function(e){
    	this.manageKey(e,true);
    },

    onKeyUp: function(e){
    	this.manageKey(e,false);
    },

    checkCatching: function(ball){
	var ballRect = ball.getBoundingBoxToWorld();
	var ringRect = this.ring.getBoundingBoxToWorld();
	if( cc.rectIntersectsRect(ballRect,ringRect) ){
	    if(ball.state == Ball.STATE.BLUE) this.score+=100;
	    else this.life-=1;
	    this.removeChild(ball);
   	}
    },

   checkBallCreation: function(){
	if(this.count%100==0){
		var ball = new Ball();
		this.addChild(ball);
		ball.setScreen(this);
		this.count-=100;
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
	this.lifeLabel.setString(this.life);

	if(this.life == 0) this.gameOver();
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


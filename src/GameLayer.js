var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 0, 0, 0, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
	this.setKeyboardEnabled(true);
	this.scheduleUpdate();

	this.ring = new Ring();
	this.addChild(this.ring);
	this.ring.setLimit(800,600);
	this.ring.scheduleUpdate();

	this.count = 0;
        return true;
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
	    var posBall = ball.getPosition();
	    var posRing = this.ring.getPosition();
    	if(Math.abs(posBall.x-posRing.x)<=50&&Math.abs(posBall.y-posRing.y)<=50)
		this.removeChild(ball);
    },

    update: function(dt){
	if(this.count%100==0){
		var ball = new Ball();
		this.addChild(ball);
		ball.setScreen(this);
	}
   	this.ring.setPosition(new cc.Point(this.ring.x,this.ring.y));
	this.count+=1;
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


var Ball = cc.Sprite.extend({

	ctor: function(x,y){
		this._super();

		this.redAction = this.genAction('Images/red.png');
		this.blueAction = this.genAction('Images/blue.png');

		this.randomPos();
		this.randomDir();
		this.state = Ball.STATE.RED;
		this.action = this.redAction;
		this.runAction(this.action);
		this.velocity = 5;

		this.scheduleUpdate();
	},

    	changeColor: function(){
		this.stopAction(this.action);
		if(this.state == Ball.STATE.RED){
			this.action = this.blueAction;
			this.state = Ball.STATE.BLUE;
		}else{
			this.action = this.redAction;
			this.state = Ball.STATE.RED;
		}
		this.runAction(this.action);
	},

	setScreen: function(screen){
		this.screen = screen;
	},
	
    	genAction: function(file){
		var anim = new cc.Animation.create();
		anim.addSpriteFrameWithFile(file);
		anim.setDelayPerUnit(10.0);
		return cc.RepeatForever.create(cc.Animate.create(anim));
	},

	randomPos: function(){
		this.x = Math.random()*750;
		this.y = parseInt(Math.random())*550;
	},

	randomDir: function(){
		this.dirX = Math.floor(Math.random()*10)%2;
		if(this.dirX==0) this.dirX = -1;
		this.dirY = Math.floor(Math.random()*10)%2;
		if(this.dirY==0) this.dirY = -1;
	},

	move: function(){
		if(this.dirX==-1) this.x-=this.velocity;
		else this.x+=this.velocity;
		if(this.dirY==-1) this.y-=this.velocity;
		else this.y+=this.velocity;
	},

	checkAxisReflect: function(axis,dir,maxLimit){
		if(axis <= 0 || axis >= maxLimit){
			dir*=-1;
			this.changeColor();
			this.velocity+=0.1;
		}
		return dir;
	},

	checkReflect: function(){
		this.dirX = this.checkAxisReflect(this.x,this.dirX,750);	
		this.dirY = this.checkAxisReflect(this.y,this.dirY,550);
	},

	checkScreen: function(){
		this.screen.checkCatching(this);
	},

	update: function(){
		this.move();
		this.checkReflect();
		this.checkScreen();
		this.setPosition(new cc.Point(this.x,this.y));
	}


});

Ball.STATE = {
	RED: 1,
	BLUE: 0
};

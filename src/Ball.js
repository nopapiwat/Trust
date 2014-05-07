var Ball = cc.Sprite.extend({

	ctor: function(x,y){
		this._super();

		this.redAction = this.genAction('Images/red.png');
		this.blueAction = this.genAction('Images/blue.png');

		this.randomPos();
		this.randomDir();
		this.delay = 20;
		this.state = Ball.STATE.STOP;
		this.color = Ball.COLOR.RED;
		this.action = this.redAction;
		this.runAction(this.action);
		this.randomColor();
		this.velocity = 5;
		this.score = 100;

		this.scheduleUpdate();
	},

    	getScore: function(){
		return this.score;
	},

    	changeColor: function(){
		this.stopAction(this.action);
		if(this.color == Ball.COLOR.RED){
			this.action = this.blueAction;
			this.color = Ball.COLOR.BLUE;
		}else{
			this.action = this.redAction;
			this.color = Ball.COLOR.RED;
		}
		this.runAction(this.action);
	},

    	genAction: function(file){
		var anim = new cc.Animation.create();
		anim.addSpriteFrameWithFile(file);
		anim.setDelayPerUnit(10.0);
		return cc.RepeatForever.create(cc.Animate.create(anim));
	},

	randomColor:function(){
		if (Math.round(Math.random())) this.changeColor();
	},

	randomPos: function(){
		var pattern = [Math.random(),Math.round(Math.random())];
		var randomPat = Math.round(Math.random());

		this.x = pattern[randomPat]*720+15;
		this.y = pattern[1-randomPat]*520+15;
	},

	randomDir: function(){
		if(this.x < 115) this.dirX = 1;
		else if(this.x > 635) this.dirX = -1;
		else this.dirX = [-1,1][Math.round(Math.random())];
		if(this.y < 65) this.dirY = 1;
		else if(this.y > 485) this.dirY = -1;
		else this.dirY = [-1,1][Math.round(Math.random())];
	},

	move: function(){
		if(this.dirX==-1) this.x-=this.velocity;
		else this.x+=this.velocity;
		if(this.dirY==-1) this.y-=this.velocity;
		else this.y+=this.velocity;
	},

	checkAxisReflect: function(axis,dir,maxLimit){
		if(axis <= 15 || axis >= maxLimit-15){
			dir*=-1;
			this.changeColor();
			this.velocity+=0.2;
			this.score+=50;
		}
		return dir;
	},

	checkReflect: function(){
		this.dirX = this.checkAxisReflect(this.x,this.dirX,750);	
		this.dirY = this.checkAxisReflect(this.y,this.dirY,550);
	},

	update: function(){
		if(this.delay == 0)
			this.state = Ball.STATE.MOVE;
		if(this.state != Ball.STATE.STOP){
			this.move();
			this.checkReflect();
		}
		this.setPosition(new cc.Point(this.x,this.y));
		this.delay -= 1;
	}


});

Ball.COLOR = {
	RED: 1,
	BLUE: 0
};

Ball.STATE = {
	STOP: 0,
	MOVE: 1
};

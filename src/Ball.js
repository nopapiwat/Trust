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
		this.x = Math.random()*800;
		this.y = Math.random()*600;
	},

	randomDir: function(){
		this.dirX = Math.floor(Math.random()*10)%2;
		if(this.dirX==0) this.dirX = -1;
		this.dirY = Math.floor(Math.random()*10)%2;
		if(this.dirY==0) this.dirY = -1;
	},

	move: function(){
		if(this.dirX==-1) this.x-=10;
		else this.x+=10;
		if(this.dirY==-1) this.y-=10;
		else this.y+=10;
	},

	checkReflect: function(){
		if(this.x<=0 || this.x>=800) {
			this.dirX*=-1;
			this.changeColor();
		}
		if(this.y<=0 || this.y>=600) {
			this.dirY*=-1;
			this.changeColor();
		}
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

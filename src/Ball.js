var Ball = cc.Sprite.extend({

	ctor: function(x,y){
		this._super();
		this.x = 200;
		this.y = 200;

		this.redAction = this.genAction('Images/red.png');
		this.blueAction = this.genAction('Images/blue.png');

		this.state = Ball.STATE.RED;
		this.action = this.redAction;
		this.runAction(this.action);
	},

    	changeColor: function(){
		this.stopAction(this.action);
		if(this.state == Ball.STATE.RED){
			this.action = this.blueAction;
			this.state = Ball.STATE.BLUE;
		}else{
			this.acyion = this.redAction;
			this.state = Ball.STATE.RED;
		}
		this.runAction(this.action);
	},
	
    	genAction: function(file){
		var anim = new cc.Animation.create();
		anim.addSpriteFrameWithFile(file);
		anim.setDelayPerUnit(10.0);
		return cc.RepeatForever.create(cc.Animate.create(anim));
	},
});

Ball.STATE = {
	RED: 1,
	BLUE: 0
};

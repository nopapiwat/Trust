var GameEffect = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile('Effects/GetRed00.png');
		this.setPosition(new cc.Point(400,300));
		this.action = this.genAction();

	},

    	genAction: function(){
		var anim = new cc.Animation.create();
		anim.addSpriteFrameWithFile('Effects/GetRed01.png');
		anim.addSpriteFrameWithFile('Effects/GetRed02.png');
		anim.addSpriteFrameWithFile('Effects/GetRed03.png');
		anim.addSpriteFrameWithFile('Effects/GetRed02.png');
		anim.addSpriteFrameWithFile('Effects/GetRed01.png');
		anim.addSpriteFrameWithFile('Effects/GetRed00.png');
		anim.setDelayPerUnit(0.1);
		return cc.Animate.create(anim);
	},

    	run: function(){
		this.runAction(this.action);
	}

});

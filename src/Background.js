var Background = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile('Images/background.png');
		this.setPosition(new cc.Point(400,300));
	}
});

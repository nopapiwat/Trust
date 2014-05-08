var MainLayer = cc.Layer.extend({
	ctor: function(){
		this._super();
	},

    	init: function(){
		this.bg = cc.Sprite.create('Images/Start.png');
		this.bg.setPosition(new cc.Point(400,300));
		this.addChild(this.bg);

		this.click = new ClickStart();
		this.click.setPosition(new cc.Point(400,100));
		this.addChild(this.click);

		this.setTouchEnabled(true);
	},

    	onTouchesEnded: function(){
		var director = cc.Director.getInstance();
		director.replaceScene(cc.TransitionFade.create(1.5,new GameLayer()));
	}
});

var ClickStart = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile('Images/ClickToStart.png');
	}
    	
});

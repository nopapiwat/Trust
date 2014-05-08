var StartScene = cc.Scene.extend({
	ctor: function(){
		this._super();
		this.layer = new MainLayer();
		this.layer.init();
		this.addChild(this.layer);
		cc.AudioEngine.getInstance().playMusic('Sounds/BG.mp3');
	}
});

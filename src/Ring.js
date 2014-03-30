var Ring = cc.Sprite.extend({
	ctor: function(x,y){
		this._super();
		this.initWithFile('Images/ring.png');

		this.x = 400;
		this.y = 300;
		this.state = Ring.STATE.STOP;
		this.velocity = 1;
		this.limitX = 100;
		this.limitY = 100;

		this.left = false;
		this.up = false;
		this.right = false;
		this.down = false;
	},
    	setLimit: function(x,y){
		this.limitX = x;
		this.limitY = y;
	},

    	setDirection: function(dir,bool){
		switch (dir){
			case "left":
				this.left = bool;
				break;
			case "right":
				this.right = bool;
				break;
			case "up":
				this.up = bool;
				break;
			case "down":
				this.down = bool;
				break;
			default:
				break;
		}
		if(!bool) this.velocity/=2;
	},

	update: function(){
		if(this.left||this.right||this.up||this.down){
			this.stage = Ring.STATE.RUNNING;
			this.velocity+=0.5;
    			if(this.left){
			       	this.x-=this.velocity;
				if(this.x<35) this.x = 35;
			}
			if(this.right) {
				this.x+=this.velocity;
				if(this.x>this.limitX-35) this.x = this.limitX-35;
			}
			if(this.up){
			       	this.y+=this.velocity;
				if(this.y>this.limitY-54) this.y = this.limitY-54;
			}
			if(this.down) {
				this.y-=this.velocity;
				if(this.y<54) this.y = 54;
			}
		}else{
			this.stage = Ring.STATE.STOP;
			this.velocity = 1;
		}
    	}

});

Ring.STATE = {
	STOP: 0,
	RUNNING: 1
}

var Ring = cc.Sprite.extend({
	ctor: function(x,y){
		this._super();
		this.initWithFile('Images/ring.png');
		this.sizeX = 35;
		this.sizeY = 54;

		this.x = 400;
		this.y = 300;
		this.state = Ring.STATE.STOP;
		this.velocity = 20;
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
	},

	isMoving: function(){
		return this.left||this.right||this.up||this.down;	
	},

	checkLimit: function(axis,max,min){
		if(axis>max) return max;
		if(axis<min) return min;
		return axis;
	},

	move: function(){
    		if(this.left){
		       	this.x-=this.velocity;
		}			
		if(this.right) {
			this.x+=this.velocity;	
		}
		if(this.up){			       	
			this.y+=this.velocity;
		}
		if(this.down) {
			this.y-=this.velocity;
		}
		this.x = this.checkLimit(this.x,this.limitX-this.sizeX,this.sizeX);
		this.y = this.checkLimit(this.y,this.limitY-this.sizeY,this.sizeY);
	},

	update: function(){
		if(this.isMoving()){
			this.stage = Ring.STATE.RUNNING;
			this.move();
		}else{
			this.stage = Ring.STATE.STOP;
		}
    	}

});

Ring.STATE = {
	STOP: 0,
	RUNNING: 1
}

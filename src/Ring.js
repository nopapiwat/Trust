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

		this.dirX = 0;
		this.dirY = 0;
	},
    	setLimit: function(x,y){
		this.limitX = x;
		this.limitY = y;
	},

    	setDirection: function(dir,value){
		switch (dir){
			case "X":
				this.dirX = value;
				break;
			case "Y":
				this.dirY = value;
				break;
			default:
				break;
		}
	},

	isMoving: function(){
		return this.dirX || this.dirY;	
	},

	checkLimit: function(axis,max,min){
		if(axis>max) return max;
		if(axis<min) return min;
		return axis;
	},

	move: function(){
    		this.x += this.dirX*this.velocity;
		this.y += this.dirY*this.velocity;
		this.x = this.checkLimit(this.x,this.limitX-this.sizeX,this.sizeX);
		this.y = this.checkLimit(this.y,this.limitY-this.sizeY,this.sizeY);
	},

	handleMouseMoved: function(touchLocation){
		this.stage = Ring.STATE.STOP;
		this.dirX = 0;
		this.dirY = 0;
		this.x = touchLocation.x;
		this.y = touchLocation.y;
		this.move();
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

function port(x,y,name)
{
	this.name="Legoland";
	this.tileX=166;
	this.tileY=231;
	this.sprite=Sprite("dock");
	if(x) {this.tileX=x;}
	if(y) {this.tileY=y;}
	if(name) {this.name=name;}
	this.x=this.tileX*16;
	this.y=this.tileY*16;
	this.draw=function(can,cam)
	{
		/*can.save();
		can.globalAlpha=0.6;
		can.scale(cam.zoom,cam.zoom);*/
		this.sprite.draw(can, this.x-cam.tileX*tileSize,this.y-cam.tileY*tileSize);
		this.sprite.draw(can, this.x+16-cam.tileX*tileSize,this.y-cam.tileY*tileSize);
		//mapDirty=true;
		//can.restore();
	}
};

var Eastwatch=new port();
var Skagos=new port(194,207,"Skagos");


function ship()
{
	this.ports=new Array();
	this.boat=true;
	this.ports.push(Eastwatch);
	this.ports.push(Skagos);
	this.homeport=this.ports[0];
	this.portTrack=1;
	this.bobTrack=-4;
	this.bobflag=false;
	this.tileX=this.homeport.tileX;
	this.tileY=this.homeport.tileY;
	this.hp=100;
	this.sprite=Sprite("smallboat");
	this.alive=true;
	this.x=this.tileX*tileSize
	this.y=this.tileY*tileSize
	this.name="Black Betha";
	this.speed=1;
	this.speedTrack=0;
	this.path = null;
	this.bx = 8;
    this.by = 8;
    this.dx = 0;
    this.dy = 0;
	this.nextMove = null;
    this.nextTile = {x: this.x, y: this.y};
    this.inNextTile = false;
	this.update=function()
	{
		//goto this.ports[this.portTrack]
		if(this.bobFlag)
		{
			this.bobTrack++;
			if(this.bobTrack>60)
			{
				this.bobFlag=false;
			}
		}else if(!this.bobFlag)
		{
			this.bobTrack--;
			if(this.bobTrack<-60)
			{
				this.bobFlag=true;
			}
		}
		this.updateAI();
	};
	this.draw=function(can,cam)
	{
		if(!this.alive) {return;}
		/*can.save();
		can.globalAlpha=0.6;
		can.scale(cam.zoom,cam.zoom);*/
		this.sprite.draw(can, this.x-cam.tileX*tileSize,this.y-cam.tileY*tileSize+this.bobTrack/30);
		//mapDirty=true;
		//can.restore();
	}
	
	  ship.prototype.updateNextMove = function() {
        if( !this.path ) {
            return;
        }
        this.nextMove = this.path.shift();
        if( !this.nextMove ) {
			if(this.team==0){
				var tmpstr=this.name + "reached their destination.";
				bConsoleStr.push(tmpstr);
				bConsoleClr.push("white");
			}else
			{
				//todo give enemy squads new destination now.
			}
            this.path = null; return;
        }
    };
    ship.prototype.isWalking = function() {
        return this.path != null;
    };
    ship.prototype.clearDestination=function(){
        this.path=null; this.dx = this.x; this.dy = this.y; this.nextMove = null;
    };
    ship.prototype.setDestination = function(x, y, map) {
		if(!map.sailable(x,y,this)) {console.log("invalid dest");return;}
        this.clearDestination();
        this.path = map.getPath(this.x, this.y, x, y,this);
        this.dx=x;
        this.dy=y;
    };
	
	ship.prototype.updateAI=function()
	{
	if( !this.nextMove )
	{
		this.updateNextMove();
	}
	if( !this.nextMove ) {
		return;
	}
	var terrain = map.tiles[this.nextTile.x][this.nextTile.y].data;
	var speed = (terrain == 4 ? 2 : 4);
	//if (this.leaderless) {speed=3;} //PROBLEM?
	//if((terrain==4) &&(this.units[0].class==SEEAss.Frog)) {speed=4};

	//speed = speed / Math.pow(2, curMap.zoom-1);
	var stamp = new Date();
	var milli=stamp.getTime();
	//speed=(speed * delta) * (60 / 1000);

	if(milli-this.lastmove>30){
		if( this.nextMove.x > this.x ) {
			this.bx += speed;
			this.encounterCounter++;
		} else if( this.nextMove.x < this.x ) {
			this.bx -= speed;
			this.encounterCounter++;
		}
		if( this.nextMove.y > this.y ) {
			this.by += speed;
			this.encounterCounter++;
		} else if( this.nextMove.y < this.y ) {
			this.by -= speed;
			this.encounterCounter++;
		}
		this.lastmove=stamp.getTime();
	}

	if( !this.inNextTile && ( this.bx <= 0 || this.bx >= 16 || this.by <= 0 || this.by >= 16 )) {
		this.nextTile = {};
		this.nextTile.x = this.nextMove.x;
		this.nextTile.y = this.nextMove.y;
		//           if( this.bx == 0 ) { this.bx = 16 } else if( this.bx == 16 ) { this.bx = 0; } 
		//           if( this.by == 0 ) { this.by = 16 } else if( this.by == 16 ) { this.by = 0; }          
		this.inNextTile = true;

	}
	if(( this.bx >= 24 || this.bx <= -8 ) || ( this.by <= -8 || this.by >= 24 )) {
		this.bx = this.by = 8;
		this.inNextTile = false;
		this.x = this.nextMove.x;
		this.y = this.nextMove.y;
		this.nextTile = {x: this.x, y: this.y};
		this.nextMove = null;

	}
};
};

function watchman()
{
	this.maxHp=100;
	this.hp=100;
	this.warmth=100;
	this.speed=5;
	this.intelligence=5;
	this.perception=5;
	this.fName="Miles";
	this.lName="";
};

var theWatch=[];
theWatch.men=new Array(); //array!
theWatch.gold=1000;
theWatch.horses=6;
theWatch.food=1000;
theWatch.fireWood=1000;

theWatch.calcFoodEaten=function()
{
	return men.length;
};


function generateRandomDude()
{

};
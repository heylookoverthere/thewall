/*function ligthenGradient(ctx,x, y, radius) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    var rnd = 0.05 * Math.sin(1.1 * Date.now() / 1000);
    radius = radius * (1 + rnd);
    var radialGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    radialGradient.addColorStop(0.0, '#BB9');
    radialGradient.addColorStop(0.2 + rnd, '#AA8');
    radialGradient.addColorStop(0.7 + rnd, '#330');
    radialGradient.addColorStop(0.90, '#110');
    radialGradient.addColorStop(1, '#000');
    ctx.fillStyle = radialGradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * 3.14);
    ctx.fill();
    ctx.restore();
}*/

countFPS = (function () {
  var lastLoop = (new Date()).getMilliseconds();
  var count = 1;
  var fps = 0;

  return function () {
    var currentLoop = (new Date()).getMilliseconds();
    if (lastLoop > currentLoop) {
      fps = count;
      count = 1;
    } else {
      count += 1;
    }
    lastLoop = currentLoop;
    return fps;
  };
}());

function settlement()
{
	this.sprite=Sprite("castleblack");
	this.name="Castle Black";
	this.tileX=115;
	this.tileY=229;
	this.x=this.tileX*tileSize;
	this.y=this.tileY*tileSize;
	this.draw=function(can,cam)
	{
		/*can.save();
		can.globalAlpha=0.6;
		can.scale(cam.zoom,cam.zoom);*/
		this.sprite.draw(can, this.x-cam.tileX*tileSize,this.y-cam.tileY*tileSize);
		//mapDirty=true;
		//can.restore();
	}
};

function theTime()
{
	this.minutes=50;
	this.hours=18;
	this.days=0;
	this.years=0;
	this.tick=0;

	theTime.prototype.update=function()
	{
		this.tick++;
		if(this.tick<18)
		{
			return;
		}
		this.tick=0;
		this.minutes++;
		if(this.minutes>59)
		{
			this.minutes=0;
			this.hours++;
			if(this.hours>23)
			{
				this.hours=0;
				this.days++;
				if(this.days>365)
				{
					this.years++;
					this.days=0;
				}
			}
		}
	};
}
var LightLevels=new Array();
LightLevels.push(0.90); //midnight
LightLevels.push(0.80); //1am
LightLevels.push(0.85); //2am
LightLevels.push(0.80); //3am
LightLevels.push(0.60); //4am
LightLevels.push(0.45); //5am
LightLevels.push(0.30); //6am
LightLevels.push(0.10); //7am
LightLevels.push(0.00); //8am
LightLevels.push(0.00); //9am
LightLevels.push(0.00); //10am
LightLevels.push(0.00); //11am
LightLevels.push(0.00); //12pm
LightLevels.push(0.00); //1pm
LightLevels.push(0.00); //2pm
LightLevels.push(0.00); //3pm
LightLevels.push(0.10); //4pm
LightLevels.push(0.20); //5pm
LightLevels.push(0.30); //6pm
LightLevels.push(0.34); //7pm
LightLevels.push(0.50); //8pm
LightLevels.push(0.60); //9pm
LightLevels.push(0.80); //10pm
LightLevels.push(0.85); //11pm



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
var Skagos=new port(196,207,"Skagos");


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
    this.nextTile = {x: this.tileX, y: this.tileY};
    this.inNextTile = false;
	this.update=function(map)
	{
		//goto this.ports[this.portTrack]
		if(this.bobFlag)
		{
			this.bobTrack+=2;
			if(this.bobTrack>60)
			{
				this.bobFlag=false;
			}
		}else if(!this.bobFlag)
		{
			this.bobTrack-=2;
			if(this.bobTrack<-60)
			{
				this.bobFlag=true;
			}
		}
		this.updateAI(map);
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
        this.path=null; this.dx = this.tileX; this.dy = this.tileY; this.nextMove = null;
    };
    ship.prototype.setDestination = function(x, y, map) {
		if(!map.sailable(x,y,this)) {console.log("invalid dest");return;}
        this.clearDestination();
        this.path = map.getPath(this.tileX, this.tileY, x, y,this);
        this.dx=x;
        this.dy=y;
    };
	
	ship.prototype.updateAI=function(map)
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
			if( this.nextMove.x > this.tileX ) {
				this.bx += speed;
				this.encounterCounter++;
			} else if( this.nextMove.x < this.tileX ) {
				this.bx -= speed;
				this.encounterCounter++;
			}
			if( this.nextMove.y > this.tileY ) {
				this.by += speed;
				this.encounterCounter++;
			} else if( this.nextMove.y < this.tileY ) {
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
			this.tileX = this.nextMove.x;
			this.tileY = this.nextMove.y;
			//this.x=this.tileX*16;
			//this.y=this.tileY*16;
			this.nextTile = {x: this.tileX, y: this.tileY};
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

function theWatch(){
	this.men=new Array(); //array!
	this.gold=1000;
	this.horses=6;
	this.food=1000;
	this.fireWood=1000;
	this.wounded=0;
	this.mealsPerDay=3;
	
	theWatch.prototype.update=function()
	{
		
		//eat!
		if((thyme.hours==6) && (thyme.minutes==1)&& (thyme.tick==1))
		{
			this.food-=1*this.men.length;
			if(this.food<1) {console.log("Canibalism!");}
		}
		if((this.mealsPerDay>1)&&(thyme.hours==12) && (thyme.minutes==1)&& (thyme.tick==1))
		{
			this.food-=1*this.men.length;
		}
		if((this.mealsPerDay>2)&&(thyme.hours==18) && (thyme.minutes==1)&& (thyme.tick==1))
		{
			this.food-=1*this.men.length;
		}
		
	};
	
	theWatch.prototype.calcFoodEaten=function()
	{
		return men.length;
	};
}

function generateRandomDude()
{

};
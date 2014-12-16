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
var bees=true;

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

CommIDs=[];
CommIDs.OakWood=0;
CommIDs.IronWood=1;
CommIDs.WeirWood=2;
CommIDs.EbonyWood=3;
CommIDs.SummerWood=4;
CommIDs.Dragonbone=5;
CommIDs.WhaleOil=6;
CommIDs.pigIron=8;
CommIDs.Bronze=7;
CommIDs.Iron=9;
CommIDs.Steel=10;
CommIDs.Silver=11;
CommIDs.Gold=12;
CommIDs.Obsidian=13;
CommIDs.Cloth=14;
CommIDs.Wool=15;
//pelts?
CommIDs.Beef=20;
CommIDs.SaltFish=21;
CommIDs.Onions=22;
CommIDs.Lamprey=23;
CommIDs.FreyPie=24;
CommIDs.LemonCakes=25;
CommIDs.Pork=26;
CommIDs.SaltPork=27;
CommIDs.SaltBeef=28;
CommIDs.Capon=29;
CommIDs.MysteryMeat=30;
CommIDs.Ale=40;
CommIDs.ArborGold=41;
CommIDs.DornishRed=42;
CommIDs.CheapWine=43;
CommIDs.Rum=44;
CommIDs.Horse=50;
CommIDs.SandSteed=51;
CommIDs.Destrier=52; //TODO check that spelling. two more hrose types? animal types?
CommIDs.WidowsBlood=55; // tywin?
CommIDs.TheStrangler=56; //
CommIDs.Nightshade=57; //common
CommIDs.TearsOfLys=58;
CommIDs.BasiliskVenom=59; // madness
CommIDs.MoonTea=60;
CommIDs.SweetSleep=61;
CommIDs.MyrishLense=62;
CommIDs.Leaches=63;
CommIDs.UnicornHorn=64;
CommIDs.GlassPane=65;
CommIDs.BlackDye=66;
//medication, gems, 




function commodity(id,amt)
{
	this.amount=amt;
	this.id=id;
	if(id==CommIDs.SaltBeef)
	{
		this.name="Salt Beef"
		this.cost=2;
		this.description ="Edible.";
		this.unit=" Pounds of ";
	}
	if(id==CommIDs.WeirWood)
	{
		this.name="Weirwood"
		this.cost=10;
		this.description ="Pale white and will never rot. Excellent for making bows.";
		this.unit=" Pieces of ";
	}else if(id==CommIDs.OakWood)
	{
		this.name="Oak wood"
		this.cost=3;
		this.description ="Wood.";
		this.unit=" Pieces of ";
	}else if(id==CommIDs.MysteryMeat)
	{
		this.name="Mystery Meat"
		this.cost=1;
		this.description ="...is that a finger?";
		this.unit=" Pieces of ";
	}else if(id==CommIDs.UnicornHorn)
	{
		this.unit=" Pieces of ";
		this.name="Unicorn Horn"
		this.cost=15;
		this.description ="Includes certificate of authenticity.";
	}
	commodity.prototype.combine=function(cmb)
	{
		this.amount=this.amount+cmb.amount;
		cmb.amount=0;
	};
}

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
	this.resources=new Array();
	this.desiredCommodities=new Array();
	
	
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

var Eastwatch=new port(166,231,"Eastwatch");
Eastwatch.resources.push(new commodity(CommIDs.OakWood,99));
var Skagos=new port(196,207,"Skagos");
Skagos.resources.push(new commodity(CommIDs.WeirWood,99));
Skagos.resources.push(new commodity(CommIDs.MysteryMeat,99));
Skagos.resources.push(new commodity(CommIDs.UnicornHorn,99));


function ship()
{
	this.ports=new Array();
	this.forSale=new Array();
	this.boat=true;
	this.lastmove=0;
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
	this.cargo=new Array();
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
		if(!bees) {return;}
        if( !this.path ) {
			
			if(this.portTrack==0)
			{
				//unload all cargo to watch. 
				console.log(this.name+ " has reached "+this.ports[this.portTrack].name + " and unloaded their cargo.");
				for(var i=0;i<this.cargo.length;i++)
				{
					nightsWatch.insertResource(this.cargo[i]);
					//this.cargo.splice(i,1);
				}
				this.cargo=[];
				//Take items you have for sale if you know you're going to a port that wants them. for now just take them no matter what.
				while(nightsWatch.forSale.length>0)
				{
					this.forSale.push(nightsWatch.forSale.pop());
				}
			}else
			{
				var goods=Math.floor(Math.random()*(this.ports[this.portTrack].resources.length));
				var amt=Math.floor(Math.random()*10)+1;
				var cost=amt*this.ports[this.portTrack].resources[goods].cost;
				console.log(this.name+ " has reached "+this.ports[this.portTrack].name+" and picked up "+amt+" "+this.ports[this.portTrack].resources[goods].name);
				//todo TRADE before using gold!
				//if(this.ports[this.portTrack].desiredComodities) contains anything from this.forSale
				{
					//give them as close to cost worth of sale item without going over cost. spend difference in gold.
				}
				nightsWatch.gold-=cost;
				var zed=new commodity(this.ports[this.portTrack].resources[goods].id,amt)
//				console.log(zed,cost);
				this.cargo.push(zed);
			}
			this.portTrack++;
			if(this.portTrack>this.ports.length-1)
			{
				this.portTrack=0;
			}
			this.setDestination(this.ports[this.portTrack].tileX,this.ports[this.portTrack].tileY,curMap);
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
		if(!map.sailable(x,y)) {console.log("invalid dest");return;}
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
		//var terrain = map.tiles[this.nextTile.x][this.nextTile.y].data;
		var speed = 2;
		//if (this.leaderless) {speed=3;} //PROBLEM?
		//if((terrain==4) &&(this.units[0].class==SEEAss.Frog)) {speed=4};

		//speed = speed / Math.pow(2, curMap.zoom-1);
		var stamp = new Date();
		var milli=stamp.getTime();
		//speed=(speed * delta) * (60 / 1000);

		if(milli-this.lastmove>100){
			if( this.nextMove.x > this.tileX ) {
				this.bx += speed;
				this.x += speed;
			} else if( this.nextMove.x < this.tileX ) {
				this.bx -= speed;
				this.x -= speed;
			}
			if( this.nextMove.y > this.tileY) {
				this.by += speed;
				this.y += speed;
			} else if( this.nextMove.y < this.tileY) {
				this.by -= speed;
				this.y -= speed;
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
			this.x=this.tileX*16;
			this.y=this.tileY*16;
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
	this.stores=new Array();
	this.forSale=new Array();
	this.stores.push(new commodity(CommIDs.SaltBeef,99));
	this.forSale.push(new commodity(CommIDs.OakWood,9));
	
	theWatch.prototype.getFood=function() //go through stores and compute numerical value of food. do one for wood also. 
	{
	
	};
	
	theWatch.prototype.insertResource=function(res)
	{
		//search for existing instance of res.id in stores. add to, or put at end if none found. 
		for(var i=0;i<this.stores.length;i++)
		{
			if(this.stores[i].id==res.id)
			{
				//console.log(this.stores[i].id,res.id);
				this.stores[i].combine(res);
			}
		}
		if(res.amount>0) {
			this.stores.push(res);
		}
	};
	
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
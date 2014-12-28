var bees=false;

//var bConsoleStr=new Array();
var bConsoleClr=new Array();
var bConsoleBox;
var bMenuBox;

function caravan(pt)
{
	this.navigateRivers=false;
	//this.class=shipClass.Small;
	this.ports=new Array();
	this.alive=true;
	this.width=32;
	this.height=32;
	this.lights=new Array();
	this.type=0;
	this.cargoCapacity=1000;
	this.resources=new Array();
	this.crew=new Array();
	var lyle=new dude();
	//lyle.name="aaa";
	//console.log(lyle);
	this.crew.push(lyle);
	this.boat=false;
	this.lastmove=0;
	this.ports.push(pt);
	this.watch=false;
	this.homeport=this.ports[0];
	this.portTrack=-1;
	this.tileX=this.homeport.entranceTileX;
	this.tileY=this.homeport.entranceTileY;
	this.hp=100;
	this.sprites=new Array();
	this.facing=0;
	this.sprites[0]=Sprite("smallboatright");
	this.sprites[1]=Sprite("smallboatup");
	this.sprites[2]=Sprite("smallboat");
	this.sprites[3]=Sprite("smallboatdown");
	this.lastmove=0;
	this.alive=true;
	this.x=this.tileX*tileSize;
	this.y=this.tileY*tileSize;
	this.name="Yoren";
	this.cargo=new Array();
	this.speed=2;//1;
	this.speedTrack=0;
	this.path = null;
	this.bx = 8;
    this.by = 8;
    this.dx = 0;
    this.dy = 0;
	this.nextMove = null;
    this.nextTile = {x: this.tileX, y: this.tileY};
    this.inNextTile = false;
	//this.lights.push(new light(16,18,12,this));
	this.visRange=10;
	this.clearFog=function(map)
	{
		for(var i=this.tileX-this.visRange+2;i<this.tileX+this.visRange;i++)
		{
			for(var j=this.tileY-this.visRange+2;j<this.tileY+this.visRange;j++)
			{
				map.seenMap[i][j]=true;
			}
			
		}
	}
	this.update=function(map)
	{
		this.updateAI(map);
	};
	
	this.draw=function(can,cam)
	{
		if(!this.alive) {return;}
		/*can.save();
		can.globalAlpha=0.6;
		can.scale(cam.zoom,cam.zoom);*/
		this.sprites[this.facing].draw(can, this.x-cam.tileX*tileSize,this.y-cam.tileY*tileSize);
		//mapDirty=true;
		//can.restore();
	}
	
	  caravan.prototype.updateNextMove = function() {
		if(!bees) {return;}
        if( !this.path ) 
		{			
			if(this.portTrack==0)
			{
				//unload all cargo to watch. 
				bConsoleBox.log(this.name+ " has reached "+this.ports[this.portTrack].name + " and unloaded their cargo.");
				if(this.watch)
				{
					for(var i=0;i<this.cargo.length;i++)
					{
						nightsWatch.insertResource(this.cargo[i]);
						//this.cargo.splice(i,1);
					}
				}else
				{
					for(var i=0;i<this.cargo.length;i++)
					{
						this.homeport.insertResource(this.cargo[i]);
						//this.cargo.splice(i,1);
					}
				}
				this.cargo=[];
				//Take items you have for sale if you know you're going to a port that wants them. for now just take them no matter what.
				while(nightsWatch.resources.length>0)
				{
					this.resources.push(nightsWatch.resources.pop());
				}
				
				
			}else if(this.portTrack<0)
			{
				this.portTrack=0; //so you don't get the message
			}else
			{
				if(this.ports[this.portTrack].resources.length>0)
				{
					var goods=Math.floor(Math.random()*(this.ports[this.portTrack].resources.length));
					var amt=Math.floor(Math.random()*10)+1;
					var cost=amt*this.ports[this.portTrack].resources[goods].cost;
					bConsoleBox.log(this.name+ " has reached "+this.ports[this.portTrack].name+" and picked up "+amt+" "+this.ports[this.portTrack].resources[goods].name);
					//todo TRADE before using gold!
					//if(this.ports[this.portTrack].desiredComodities) contains anything from this.resources
					{
						//give them as close to cost worth of sale item without going over cost. spend difference in gold.
					}
					if(this.watch)
					{
						nightsWatch.gold-=cost;
					}
					var zed=new commodity(this.ports[this.portTrack].resources[goods].id,amt)
					this.ports[this.portTrack].resources[goods].amount-=amt;
	//				console.log(zed,cost);
					//this.cargo.push(zed);
					this.insertCargo(zed);
				}else
				{
					bConsoleBox.log(this.name+ " has reached "+this.ports[this.portTrack].name+" but they had nothing to sell");
				}
			}
			var pDest=this.portTrack+1;
			if(pDest>this.ports.length-1)
			{
				pDest=0;
			}
			//this.NEWsetDestination(pDest);
			this.portTrack++;
			if(this.portTrack>this.ports.length-1)
			{
				this.portTrack=0;
			}
			this.setDestination(this.ports[this.portTrack].entranceTileX,this.ports[this.portTrack].entranceTileY,curMap);
			
			
			bConsoleBox.log(this.name+ " is heading to "+this.ports[this.portTrack].name);
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
    caravan.prototype.isWalking = function() {
        return this.path != null;
    };
	caravan.prototype.insertCargo=function(res)
	{
		//search for existing instance of res.id in stores. add to, or put at end if none found. 
		for(var i=0;i<this.cargo.length;i++)
		{
			if(this.cargo[i].id==res.id)
			{
				//console.log(this.stores[i].id,res.id);
				this.cargo[i].combine(res);
			}
		}
		if(res.amount>0) {
			this.cargo.push(res);
		}
	};
	
    caravan.prototype.clearDestination=function(){
        this.path=null; this.dx = this.tileX; this.dy = this.tileY; this.nextMove = null;
    };
    caravan.prototype.setDestination = function(x, y, map) {
		if(!map.walkable(x,y)) {console.log("invalid dest");return;}
        this.clearDestination();
        this.path = map.getPath(this.tileX, this.tileY, x, y,true);
        this.dx=x;
        this.dy=y;
		//console.log(portPaths);
    };
	caravan.prototype.NEWsetDestination = function(destID ) {
		this.clearDestination();
		this.path=new Array();
		for(var i=0;i<ports[this.portTrack].portPaths[destID].length;i++)
		{
			this.path.push(ports[this.portTrack].portPaths[destID][i]);
		}
		
        //this.path = ports[this.portTrack].portPaths[destID];

    };
	caravan.prototype.updateAI=function(map)
	{
		if( !this.nextMove )
		{
			this.updateNextMove();
		}
		if( !this.nextMove ) {
			return;
		}
		//var terrain = map.tiles[this.nextTile.x][this.nextTile.y].data;
		var speed = this.speed;
		//if (this.leaderless) {speed=3;} //PROBLEM?
		//if((terrain==4) &&(this.units[0].class==SEEAss.Frog)) {speed=4};

		//speed = speed / Math.pow(2, curMap.zoom-1);
		var stamp = new Date();
		var milli=stamp.getTime();
		//speed=(speed * delta) * (60 / 1000);

		if(milli-this.lastmove>gameSpeed){
			if( this.nextMove.x > this.tileX ) {
				this.bx += speed;
				this.x += speed;
				this.facing=0;
			} else if( this.nextMove.x < this.tileX ) {
				this.bx -= speed;
				this.x -= speed;
				this.facing=2;
			}
			if( this.nextMove.y > this.tileY) {
				this.by += speed;
				this.y += speed;
				this.facing=3;
			} else if( this.nextMove.y < this.tileY) {
				this.by -= speed;
				this.y -= speed;
				this.facing=1;
			}
			this.lastmove=stamp.getTime();
			if(map.fogOfWar)
			{
				this.clearFog(map);
			}
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


function kraken(x,y)
{
	this.tileX=x||0;
	this.tileY=y||0;
	this.x=this.tileX*tileSize;
	this.y=this.tileY*tileSize;
	this.xOffset=0;
	this.yOffset=0;
	this.sprites=new Array();
	this.sprites.push(Sprite("kraken0"));
	this.sprites.push(Sprite("kraken1"));
	this.sprites.push(Sprite("kraken2"));
	this.sprites.push(Sprite("kraken3"));	
	this.aniTrack=0;
	this.aboveWater=false;
	this.update=function()
	{
		
	};
	
	this.draw=function(can,cam)
	{
		this.sprites[this.aniTrack].draw(can, this.x-cam.tileX*tileSize+1,this.y-cam.tileY*tileSize+4);
	}
};

function dolphin(x,y)
{
	this.tileX=x||0;
	this.tileY=y||0;
	this.x=this.tileX*tileSize;
	this.y=this.tileY*tileSize;
	this.aniTrack=0;
	this.xOffset=0;
	this.yOffset=0;
	this.aboveWater=false;
	this.sprites=new Array();
	this.sprites.push(Sprite("dolph0"));
	this.sprites.push(Sprite("dolph1"));
	this.sprites.push(Sprite("dolph2"));
	this.sprites.push(Sprite("dolph3"));	
	this.update=function()
	{
		
	};
	this.draw=function(can,cam)
	{
		this.sprites[this.aniTrack].draw(can, this.x-cam.tileX*tileSize+1,this.y-cam.tileY*tileSize+4);
	};
};


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

function farm(prnt,x,y)
{
	this.harvestTrack=0;
	this.harvestCount=0;
	this.harvestAmount=3;
	this.tileX=x || 0;
	this.tileY=y || 0;
	this.width=156;
	this.height=156;
	this.x=this.tileX*tileSize;
	this.y=this.tileY*tileSize;
	this.lastmove=0;
	this.size=0; // /3
	this.crop=Math.floor(Math.random()*50); //resource? or convert to resource later?
	this.workers=new Array();
	this.parent=prnt;
	this.sprites=new Array();
	this.sprites.push(Sprite("farm0"));
	this.sprites.push(Sprite("farm1"));
	this.sprites.push(Sprite("farm2"));
	this.sprites.push(Sprite("farm3"));
	this.sprites.push(Sprite("farm4"));
	farm.prototype.employ=function(worker)
	{
		this.workers.push(worker);
	};
	this.getWorkRate=function()//return # value based on number and skill of workers
	{
		return this.workers.length; //for now.
	}
	this.harvest=function()
	{
		this.harvestTrack=0;
		this.harvestCount=0;
		var nelly=this.harvestAmount+Math.floor(Math.random()*10)
		var belly=new commodity(this.crop,nelly);
		this.parent.insertResource(belly);
		bConsoleBox.log("Harvested "+nelly+" "+belly.name+"s");
		//this.parent.addfood?
	}
	farm.prototype.update=function()
	{
		//console.log("pog");
		var stamp = new Date();
		var milli=stamp.getTime();
		//speed=(speed * delta) * (60 / 1000);

		if(milli-this.lastmove>100)
		{
			
			var spd=this.getWorkRate();
			this.harvestCount+=spd;
			if(this.harvestCount>2000)
			{
				this.harvestCount=0;
				this.harvestTrack++;
				if(this.harvestTrack>3)
				{
					this.harvest(); 
				}
			}
			this.lastmove=stamp.getTime();
		}
	};
	farm.prototype.draw=function(can,cam)
	{
		this.sprites[this.harvestTrack].draw(can, this.x-cam.tileX*tileSize+1,this.y-cam.tileY*tileSize+4);
	};
};


function stringifyGraphNode (gn)
{
	return JSON.stringify(gn);
};

function stringifyPath(bath) {
	var tempstring= "";
	for (j=0;j<bath.length; j++){
		tempstring += stringifyGraphNode(bath[j]);
		tempstring += ",";
	}
	console.log( tempstring);
};

function buildGNFromLoadedinfo(tempstring) {
    
    var tempobj = JSON.parse(tempstring);
    //for( var i=0; i<tempobjs.length; i++ ) {
	//var tempobj = tempobjs[i];

	return tempobj;
}

function buildPathFromLoadedinfo(tempstring) {
    
    var tempobj = JSON.parse(tempstring);
    //for( var i=0; i<tempobjs.length; i++ ) {
	//var tempobj = tempobjs[i];
	ning=new appointment();
	ning.name=tempobj.name;
	ning.address=tempobj.address;
	return ning;
}
	
function savePaths(ports) {
	var name="portpaths";
	var totstring="";
	for(var i=0;i<ports.length;i++) //first port
	{
		var botstring="";
		for(var j=0;j<ports.length;j++) //path to second port
		{
			var tar=name.concat(i);
			tar=tar+",";
			var tar=tar.concat(j);
			tar=tar+",";
			console.log(tar);
			//localStorage.setItem(tar,ports[i].portPaths[j].length);
			var mepstring="";
			for(var g=0;g<ports[i].portPaths[j].length;g++) //graph nodes
			{
				var har=tar.concat(g);
				har=har+",";
				var tempstring=stringifyGraphNode(ports[i].portPaths[j][g]);
				mepstring+=",";
				mepstring=mepstring.concat(tempstring);
				
				//localStorage.setItem(har,tempstring);

			}
			botstring=botstring.concat(mepstring);
			botstring+=";";
		}
		totstring=totstring.concat(botstring);
		totstring+=":";
	}
	//console.log(totstring);
	//localStorage.setItem(name,totstring);
}
	
function loadPaths() {
	var name="portpaths";

	for(var i=0;i<39;i++) //first port
	{
		var tar=name.concat(i);
		var amount=39;//localStorage.getItem(tar+"num");
		for(var j=0;j<amount;j++) //path to second port
		{
			var lar=name.concat(i)
			lar=lar+",";
			lar.concat(j);
			var camount = localStorage.getItem(lar+"number");
			for(var g=0;g<camout;g++) //graph nodes
			{
				var har=lar.concat(g);
				har=har+",";
				var tempdata = localStorage.getItem(har);
				buildGNFromLoadedinfo(tempdata);
			}
			
		}
	}

}



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
	this.ships=new Array();
	this.gold=1000;
	this.health=100;
	this.horses=6;
	this.food=0;
	this.fireWood=1000;
	this.starving=false;
	this.wounded=0;
	this.mealsPerDay=3;
	this.stores=new Array();
	this.resources=new Array();
	this.stores.push(new commodity(CommIDs.SaltBeef,41));
	this.stores.push(new commodity(CommIDs.SaltFish,51));
	this.stores.push(new commodity(CommIDs.Capon,3));
	this.stores.push(new commodity(CommIDs.LemonCakes,11));
	
	this.resources.push(new commodity(CommIDs.OakWood,9));
	
	theWatch.prototype.getFood=function() //go through stores and compute numerical value of food. do one for wood also. 
	{
		var funt=0;
		for(var i=0;i<this.stores.length;i++)
		{
			if(this.stores[i].id<55)
			{
				funt+=this.stores[i].amount;
			}
		}
		return funt;
	};
	
	theWatch.prototype.spend=function(amt)
	{
		if(this.gold>amt)
		{
			this.gold-=amt;
			return true;
		}else
		{
			return false;
		}
	};
	
	theWatch.prototype.timeToStarve=function() //go through stores and compute numerical value of food. do one for wood also. 
	{
		var funt=0;
		for(var i=0;i<this.stores.length;i++)
		{
			if(this.stores[i].id<55)
			{
				funt+=this.stores[i].amount;
			}
		}
		return Math.floor(funt/(this.mealsPerDay*this.men.length));
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
	
	theWatch.prototype.logMen=function()//todo break into three lists ranger builder steward
	{
		bConsoleBox.log("Men of the Watch: ("+this.men.length+")");
		for(var i=0;i<this.men.length;i++)
		{
			bConsoleBox.log("  "+this.men[i].name);
		}
	};
	for(var i=0;i<15;i++)
	{
		this.insertResource(new commodity(Math.floor(Math.random()*50),Math.floor(Math.random()*16+1)));
	}
	theWatch.prototype.logShips=function()
	{
		bConsoleBox.log("Ships of the Watch: ("+this.ships.length+")");
		for(var i=0;i<this.ships.length;i++)
		{
			bConsoleBox.log("  "+this.ships[i].name);
			//bConsoleBox.log("  "+this.ships[i].captain.name);
			bConsoleBox.log("    Home: "+this.ships[i].ports[0].name);
			bConsoleBox.log("    Dest: "+this.ships[i].ports[this.ships[i].portTrack].name);
			
			bConsoleBox.log("    Crew: ");
			for(var j=0;j<this.ships[i].crew.length;j++)
			{
				bConsoleBox.log("       "+this.ships[i].crew[j].name);
			}
			
			bConsoleBox.log("     Cargo: ");
			for(var j=0;j<this.ships[i].cargo.length;j++)
			{
				bConsoleBox.log("       "+this.ships[i].cargo[j].amount+" "+this.ships[i].cargo[j].name);
			}
		}
	};
	
	theWatch.prototype.firstFood=function()
	{
		var duf=null;
		for(var i=0;i<this.stores.length;i++)
		{
			if(this.stores[i].id<55)
			{
				return this.stores[i]; //how am I eating this thing. change the amt later I guessg? 
			}
		}
		return duf;
	};
	
	
	theWatch.prototype.haveMeal=function()
	{
		this.hunger=this.men.length;
		while(this.hunger>0)
		{	
			//console.log(this.hunger);
			this.feed();
			if(this.stores.length<1) //has food. NOT ALL ITEMS ARE FOOD
			{
				return false;
			}
			for(var i=0;i<this.stores.length;i++)
			{
				if(this.stores[i].amount<1)
				{
					this.stores.splice(i,1);
				}
			}
			
		}
	};
	
	theWatch.prototype.feed=function()
	{
		var fed=this.firstFood();
		
		var diff=0;
		if(!fed)
		{
			//starvation
			bConsoleBox.log("Your men are starving.");
			this.health-=10;
			this.hunger=0; // but not really. take health? kill dudes?
		}else if(this.hunger<fed.amount)
		{
			fed.amount-=this.hunger;
			this.hunger=0;
		}else
		{
			this.hunger-=fed.amount;
			fed.amount=0;
		}

	};
	
	theWatch.prototype.logStores=function()
	{
		bConsoleBox.log("Your supplies: ("+this.stores.length+")");
		for(var i=0;i<this.stores.length;i++)
		{
			bConsoleBox.log("  "+this.stores[i].amount+" "+this.stores[i].name);
		}
		if(this.stores.length==0)
		{
			bConsoleBox.log("  Nothing");
		}
		bConsoleBox.log("Earmarked for pick up:");
		for(var i=0;i<this.resources.length;i++)
		{
			bConsoleBox.log("  "+this.resources[i].amount+" "+this.resources[i].name);
		}
		if(this.resources.length==0)
		{
			bConsoleBox.log("  Nothing");
		}
	};
	
	theWatch.prototype.update=function()
	{
		
		
		//check stores and remove things you are out of.
		for(var i=0;i<this.stores.length;i++)
		{
			if(this.stores[i].amount<1)
			{
				this.stores.splice(i,1);
			}
		}
		//eat!
		if((thyme.hours==6) && (thyme.minutes==0)&& (thyme.tick==1))
		{
			this.haveMeal()
			//if(this.hunger>0) {console.log("Canibalism!");}
		}
		if((this.mealsPerDay>1)&&(thyme.hours==12) && (thyme.minutes==0)&& (thyme.tick==1))
		{
			this.haveMeal();
			//if(this.hunger>0) {console.log("Canibalism!");}
		}
		if((this.mealsPerDay>2)&&(thyme.hours==18) && (thyme.minutes==0)&& (thyme.tick==1))
		{
			this.haveMeal();
			//if(this.hunger>0) {console.log("Canibalism!");}
		}
		if(this.health<1)
		{
			gameOver="Your men have all starved to death.";
		}
	};
	
	theWatch.prototype.calcFoodEaten=function()
	{
		return men.length;
	};
	
	
	
	theWatch.prototype.sendMan=function(id,post)
	{
		post.push(this.men[i]);
		this.men.splice(i,1);
	};
	
	theWatch.prototype.collectTribute=function()
	{
		//eventually randomize from various castles?
		var gil=Math.floor(Math.random()*170)+60;
		this.gold+=gil;
		var mens=gil=Math.floor(Math.random()*3)+3;
		for(var i=0;i<mens;i++)
		{
			this.men.push(new dude());
		}
		bConsoleBox.log("Happy New Year! ");
		bConsoleBox.log("Recived annual tribute from Winterfell.");
		bConsoleBox.log(mens+" Recruits and "+gil+" Gold");
	};
}

function generateRandomDude()
{

};
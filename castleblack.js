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
var bees=false;

//var bConsoleStr=new Array();
var bConsoleClr=new Array();
var bConsoleBox;
var bMenuBox;

/*bConsoleStr.push("");
bConsoleStr.push("");
bConsoleStr.push("");
bConsoleStr.push("Game Start!");
bConsoleClr.push("white");
bConsoleClr.push("white");
bConsoleClr.push("white");
bConsoleClr.push("white");*/

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
	this.tileX=115+326;
	this.tileY=230;
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

function leapYear(year)
{
	var lr=true;
	if (year%4!=0) {
		return false;
	}else
	{
		if (year%100!=0) 
		{
			return true;
		}else
		{
			if (year%400!=0)
			{
				return false;
			}else{
				return true;
			}
		}
	}
}

function theTime()
{
	this.minutes=50;
	this.hours=0;
	this.days=0;
	this.years=298;
	this.tick=0;

	theTime.prototype.update=function()
	{
		this.tick++;
		if(this.tick<2)
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
				var cxup=363;
				if(leapYear(this.years))
				{
					cxup=364;
				}
				if(this.days>cxup)
				{
					this.years++;
					this.days=0;
					nightsWatch.collectTribute();
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
	port.prototype.computePaths=function(map,orts)
	{
		this.portPaths=new Array();
		for(var i=0;i<orts.length;i++)
		{
			if(orts[i].name==this.name)
			{
				//this.portPaths.push(null);
				this.portPaths.push(map.getPath(this.tileX, this.tileY,orts[i].tileX, orts[i].tileY,true));
				console.log("   same place");
			}else
			{
				console.log("	Computing path between "+this.name+" and "+orts[i].name);
				this.portPaths.push(map.getPath(this.tileX, this.tileY,orts[i].tileX, orts[i].tileY,true));
			}
		}
		
	};
	port.prototype.insertResource=function(res)
	{
		//search for existing instance of res.id in stores. add to, or put at end if none found. 
		for(var i=0;i<this.resources.length;i++)
		{
			if(this.resources[i].id==res.id)
			{
				//console.log(this.stores[i].id,res.id);
				this.resources[i].combine(res);
			}
		}
		if(res.amount>0) {
			this.resources.push(res);
		}
	};
	
};

var Stonedance=new port(787,870,"Stonedance");
Stonedance.resources.push(new commodity(CommIDs.Steel,99));
//Settlments.push(settlePort(Stonedance));

var Stonehelm=new port(706,1140,"Stonehelm");
Stonehelm.resources.push(new commodity(CommIDs.Steel,99));

var TenTowers=new port(212,651,"Ten Towers");
TenTowers.resources.push(new commodity(CommIDs.Steel,99));

var GhastonGrey=new port(806,1300,"Ghaston Grey");
GhastonGrey.resources.push(new commodity(CommIDs.Prisoner,99));

var Greenstone=new port(911,1165,"Greenstone");
Greenstone.resources.push(new commodity(CommIDs.Steel,99));

var Faircastle=new port(90,780,"Faircastle");
Faircastle.resources.push(new commodity(CommIDs.Steel,99));

var WidowsWatch=new port(626,470,"Widow's Watch");
WidowsWatch.resources.push(new commodity(CommIDs.Steel,99));

var Seaguard=new port(236,570,"Seaguard");
Seaguard.resources.push(new commodity(CommIDs.Steel,99));

var FlintsFinger=new port(183,516,"Flint's Finger");
FlintsFinger.resources.push(new commodity(CommIDs.Steel,99));

var Ryamsport=new port(168,1326,"Ryamsport");
Ryamsport.resources.push(new commodity(CommIDs.Steel,99));

var Volantis=new port(1554,1426,"Volantis");
Volantis.resources.push(new commodity(CommIDs.Steel,99));

var Maidenpool=new port(721,772,"Maidenpool");
Maidenpool.resources.push(new commodity(CommIDs.Steel,99));

var Saltpans=new port(667,769,"Saltpans");
Saltpans.resources.push(new commodity(CommIDs.Steel,99));

var BearIsland=new port(298,239,"Bear Island");
BearIsland.resources.push(new commodity(CommIDs.Steel,99));

var Driftmark=new port(760,818,"Driftmark");
Driftmark.resources.push(new commodity(CommIDs.Steel,99));

var Sisterton=new port(545,595,"Sisterton");
Sisterton.resources.push(new commodity(CommIDs.Steel,99));

var Tyrosh=new port(1179,1215,"Tyrosh");
Tyrosh.resources.push(new commodity(CommIDs.Steel,99));

var Myr=new port(1308,1185,"Myr");
Myr.resources.push(new commodity(CommIDs.Steel,99));

var Oldtown=new port(407,1203,"Oldtown");
Oldtown.resources.push(new commodity(CommIDs.Steel,99));

var Sunspear=new port(940,1434,"Sunspear");
Sunspear.resources.push(new commodity(CommIDs.Steel,99));

var Lys=new port(1302,1418,"Lys");
Lys.resources.push(new commodity(CommIDs.Steel,99));

var StormsEnd=new port(788,1015,"Storms End");
StormsEnd.resources.push(new commodity(CommIDs.Steel,99));

var Dragonstone=new port(786,801,"Dragonstone");
Dragonstone.resources.push(new commodity(CommIDs.Steel,99));

var KingsLanding=new port(675,864,"King's Landing");
KingsLanding.resources.push(new commodity(CommIDs.Steel,99));

var Duskendale=new port(693,837,"Duskendale");
Duskendale.resources.push(new commodity(CommIDs.Steel,99));

var Tarth=new port(861,997,"Tarth");
Tarth.resources.push(new commodity(CommIDs.Steel,99));

var TheCrag=new port(144,750,"The Crag");
TheCrag.resources.push(new commodity(CommIDs.Steel,99));

var Lannisport=new port(154,862,"Lannisport");
Lannisport.resources.push(new commodity(CommIDs.Steel,99));

var Pyke=new port(174,679,"Pyke");
Pyke.resources.push(new commodity(CommIDs.Steel,99));

var GreatWyk=new port(127,590,"Great Wyk");
GreatWyk.resources.push(new commodity(CommIDs.Steel,99));

var Morosh=new port(1569,506,"Morosh");
Morosh.resources.push(new commodity(CommIDs.Steel,99));

var Saath=new port(1537,521,"Saath");
Saath.resources.push(new commodity(CommIDs.Steel,99));

var Eastwatch=new port(494,233,"Eastwatch");
Eastwatch.resources.push(new commodity(CommIDs.OakWood,99));
var Skagos=new port(226+326,200,"Skagos");
Skagos.resources.push(new commodity(CommIDs.WeirWood,99));
Skagos.resources.push(new commodity(CommIDs.MysteryMeat,99));
Skagos.resources.push(new commodity(CommIDs.UnicornHorn,99));
Skagos.resources.push(new commodity(CommIDs.Obsidian,99));
var WhiteHarbor=new port(80+326,550,"White Harbor");
WhiteHarbor.resources.push(new commodity(CommIDs.SaltFish,99));
WhiteHarbor.resources.push(new commodity(CommIDs.Capon,99));
WhiteHarbor.resources.push(new commodity(CommIDs.Steel,99));
var Gulltown=new port(455+326,733,"Gulltown");
Gulltown.resources.push(new commodity(CommIDs.SaltFish,99));
var Braavos=new port(1066,564,"Braavos");
Braavos.resources.push(new commodity(CommIDs.SaltFish,99));
var Lorath=new port(1180,552,"Lorath");
Lorath.resources.push(new commodity(CommIDs.SaltFish,99));
var Pentos=new port(1096,873,"Pentos");
Pentos.resources.push(new commodity(CommIDs.SaltFish,99));

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
	this.horses=6;
	this.food=1000;
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
			if((this.stores[i].id>20) && (this.stores[i].id<40))
			{
				funt+=this.stores[i].amount;
			}
		}
		return funt;
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
			if((this.stores[i].id>19) && (this.stores[i].id<40))
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
		if((thyme.hours==6) && (thyme.minutes==1)&& (thyme.tick==1))
		{
			this.haveMeal()
			//if(this.hunger>0) {console.log("Canibalism!");}
		}
		if((this.mealsPerDay>1)&&(thyme.hours==12) && (thyme.minutes==1)&& (thyme.tick==1))
		{
			this.haveMeal();
			//if(this.hunger>0) {console.log("Canibalism!");}
		}
		if((this.mealsPerDay>2)&&(thyme.hours==18) && (thyme.minutes==1)&& (thyme.tick==1))
		{
			this.haveMeal();
			//if(this.hunger>0) {console.log("Canibalism!");}
		}
		
	};
	
	theWatch.prototype.calcFoodEaten=function()
	{
		return men.length;
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
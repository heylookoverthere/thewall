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
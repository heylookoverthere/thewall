var shipClass=[];
shipClass.Fishing=0;
shipClass.Small=1;
shipClass.Longship=3;
shipClass.Drummond=4;
shipClass.OarShip=5;

var portPaths=new Array();

function ship(pt)
{
	this.navigateRivers=false;
	this.class=shipClass.Small;
	this.ports=new Array();
	this.alive=true;
	this.lights=new Array();
	this.type=0;
	this.cargoCapacity=1000;
	this.resources=new Array();
	this.crew=new Array();
	var lyle=new dude();
	//lyle.name="aaa";
	//console.log(lyle);
	this.crew.push(lyle);
	this.boat=true;
	this.lastmove=0;
	this.ports.push(pt);
	this.watch=false;
	this.homeport=this.ports[0];
	this.portTrack=0;
	this.bobTrack=-4;
	this.bobflag=false;
	this.tileX=this.homeport.tileX;
	this.tileY=this.homeport.tileY;
	this.hp=100;
	this.sprites=new Array();
	this.facing=0;
	this.sprites[0]=Sprite("smallboatright");
	this.sprites[1]=Sprite("smallboatup");
	this.sprites[2]=Sprite("smallboat");
	this.sprites[3]=Sprite("smallboatdown");
	
	this.alive=true;
	this.x=this.tileX*tileSize;
	this.y=this.tileY*tileSize;
	this.name="Black Betha";
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
	this.lights.push(new light(16,18,12,this));
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
	
	this.upgrade=function(){
		this.type=2;
		this.cargoCapacity=10000;
		this.speed=5;
		this.sprites[0]=Sprite("largeboatright");
		this.sprites[1]=Sprite("largeboatup");
		this.sprites[2]=Sprite("largeboat");
		this.sprites[3]=Sprite("largeboatdown");
	};
	
	this.draw=function(can,cam)
	{
		if(!this.alive) {return;}
		/*can.save();
		can.globalAlpha=0.6;
		can.scale(cam.zoom,cam.zoom);*/
		this.sprites[this.facing].draw(can, this.x-cam.tileX*tileSize,this.y-cam.tileY*tileSize+this.bobTrack/30);
		//mapDirty=true;
		//can.restore();
	}
	
	  ship.prototype.updateNextMove = function() {
		if(!bees) {return;}
        if( !this.path ) {
			
			
			if(this.portTrack<0)
			{
			
			}else if(this.portTrack==0)
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
			this.portTrack++;
			if(this.portTrack>this.ports.length-1)
			{
				this.portTrack=0;
			}
			this.setDestination(this.ports[this.portTrack].tileX,this.ports[this.portTrack].tileY,curMap);
			var pDest=this.portTrack+1;
			if(pDest>this.ports.length)
			{
				pDest=0;
			}
			//this.NEWsetDestination(this.portTrack,pDest);
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
    ship.prototype.isWalking = function() {
        return this.path != null;
    };
	ship.prototype.insertCargo=function(res)
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
	
    ship.prototype.clearDestination=function(){
        this.path=null; this.dx = this.tileX; this.dy = this.tileY; this.nextMove = null;
    };
    ship.prototype.setDestination = function(x, y, map) {
		if(!map.sailable(x,y)) {console.log("invalid dest");return;}
        this.clearDestination();
        this.path = map.getPath(this.tileX, this.tileY, x, y,true);
        this.dx=x;
        this.dy=y;
		//console.log(portPaths);
    };
	ship.prototype.NEWsetDestination = function(portID, destID ) {
		this.clearDestination();
		//console.log(portPaths);
		//console.log(portID,destID);
        //this.path = portPaths[portID][destID];
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
		var speed = this.speed;
		//if (this.leaderless) {speed=3;} //PROBLEM?
		//if((terrain==4) &&(this.units[0].class==SEEAss.Frog)) {speed=4};

		//speed = speed / Math.pow(2, curMap.zoom-1);
		var stamp = new Date();
		var milli=stamp.getTime();
		//speed=(speed * delta) * (60 / 1000);

		if(milli-this.lastmove>1){
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
//Mouse stuff.
$(document).bind("contextmenu",function(e){
	
	if(true)//(mode==1)
	{
		mX = e.pageX - canvasElement.get(0).offsetLeft;
		mY = e.pageY - canvasElement.get(0).offsetTop;
		lights.push(new light(mX+camera.x,mY+camera.y,80));
		
		for (var p=0;p<4;p++) //why isn't this mapdirtying.
		{
					monsta.startOrbit(40000,mX+camera.x,mY+camera.y,60,true,12);
		}
	}
    return false;
});

function mouseWheel(e){
	var delta = 0;
	if (e.wheelDelta)
	{
			delta = e.wheelDelta/120;
	} else if (event.detail) 
	{ /** Mozilla case. */
			delta = -e.detail/3;
	}
	mX = e.pageX - canvasElement.get(0).offsetLeft;
	mY = e.pageY - canvasElement.get(0).offsetTop;
	//if (delta)
	if((mode==1))
	{ //&& (!isMenu)){
		if(curMap.zoom>3) {curMap.zoom=3;}
		if(curMap.zoom<1) {curMap.zoom=1;}
		if(delta<0)
		{
			curMap.setZoom(camera);
			camera.check();
		}else if(delta>0){
			console.log("yar");
			curMap.minusZoom(camera);
			var blob=[];
			blob.x=Math.floor(mX/16) * Math.pow(2, curMap.zoom-1)+camera.tileX;
			blob.y=Math.floor(mY/16) * Math.pow(2, curMap.zoom-1)+camera.tileY;
			//camera.center(blob);
			camera.check();
		}

		
	}
	if (e.preventDefault)
			e.preventDefault();
	e.returnValue = false;
};

function mouseClick(e) {  //represents the mouse
	e.preventDefault();    
	mX = e.pageX - canvasElement.get(0).offsetLeft;
	mY = e.pageY - canvasElement.get(0).offsetTop;
	var tm=new Date();
	var mili=tm.getTime();
	tx=Math.floor(mX/16) * Math.pow(2, curMap.zoom-1);
	ty=Math.floor(mY/16) * Math.pow(2, curMap.zoom-1);
	
	
		switch (e.which)
		{
			case 1:
				//alert('Left mouse button pressed');
				//console.log(mX+camera.x,mY+camera.y);
				lights.push(new light(mX+camera.x,mY+camera.y,12));
			    break;
			case 2:
			console.log("fuclhole");
				lights.push(new light(mX+camera.x,mY+camera.y,80));
				break;
			case 3:
				//alert('Right mouse button pressed');
				lights.push(new light(mX+camera.x,mY+camera.y,80));
				break;
			default:
				//alert('You have a strange mouse');
		}
};

mouseXY= function(e) {
    if (!e) var e = event;
    mX = e.pageX - canvasElement.get(0).offsetLeft;
    mY = e.pageY - canvasElement.get(0).offsetTop;
    
};

function drawmousetext(can,targ,cam) { //draws unit status info
	if((!targ.alive) || (!targ.deployed)) {return;}
    can.font = "14pt Calibri";
    can.textAlign = "center";
    can.textBaseline = "middle";
    can.fillStyle = "blue";
    if(targ.team==1) {  canvas.fillStyle = "red";}

    tempstr = targ.leader.name+": "+targ.getHP()+ " / " +targ.getMaxHP();
    can.fillText(tempstr, (targ.x-cam.tileX)*16/curMap.zoom+(targ.width/2), (targ.y-cam.tileY)*16/curMap.zoom+targ.height+8);
    
    can.fillStyle = "#5F9EA0";
};

isOver= function(targ,cam){ //is the mouse over the player/object 
    if((mX>(targ.x-cam.tileX)*16/curMap.zoom) && (mX<((targ.x-cam.tileX)*16+targ.width*curMap.zoom)/curMap.zoom) &&(mY>((targ.y-cam.tileY)*16)/curMap.zoom) &&(mY<((targ.y-cam.tileY)*16+targ.height)/curMap.zoom)) {return true;}
    return false;
};
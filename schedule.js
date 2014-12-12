var pate=new Date();
var unSaved=false;
var curDay=0;
var today=0;


var appointments=new Array();
/*for(var i=0;i<365;i++)
{
	appointments[i]=new Array();
}*/
function init()
{
	for(var g=2010;g<2019;g++)
	{
		appointments[g]=new Array();
		for(var i=0;i<12;i++)
		{
			appointments[g][i]=new Array();
			for(var j=0;j<daysInMonth(i,g);j++)
			{
				appointments[g][i][j]=new Array();
				//console.log(appointments[g][i][j]);
			}
		}
	}
}

function dayName(d)
{
	if(d==0)
	{
		return "Sunday";
	}else if(d==1)
	{
		return "Monday";
	}else if(d==2)
	{
		return "Tuesday";
	}else if(d==3)
	{
		return "Wednesday";
	}else if(d==4)
	{
		return "Thursday";
	}else if(d==5)
	{
		return "Friday";
	}else if(d==6)
	{
		return "Saturday";
	}
}

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


function daysInMonth(m,y)
{
	if(m==0) {return 31;}
	if(m==1) 
	{
		if(leapYear(y))
		{
			return 29;
		}else
		{
			return 28;
		}
	}
	if(m==2) {return 31;}
	if(m==3) {return 30;}
	if(m==4) {return 31;}
	if(m==5) {return 30;}
	if(m==6) {return 31;}
	if(m==7) {return 31;}
	if(m==8) {return 30;}
	if(m==9) {return 31;}
	if(m==10) {return 30;}
	if(m==11) {return 31;}
	
}

function orderAppts()
{
	var y=pate.getFullYear();
	var m=pate.getMonth();
	var d=pate.getDate()-1;
	appointments[y][m][d].sort(function(a,b) { return parseFloat(a.time) - parseFloat(b.time) } );
}

function printappts()
{
	
}

var PAUL=0;
var STEVE=1;
var timeSlots=new Array();
timeSlots.push("8-9"); //0
timeSlots.push("9-11"); //1
timeSlots.push("10-12"); //2
timeSlots.push("11-1"); //3
timeSlots.push("12-2"); //4
timeSlots.push("1-3"); //5
timeSlots.push("2-4"); //6
timeSlots.push("3-5");//7
timeSlots.push("4-6");//8
function acustomer()
{
	this.ID=0;
	this.name="";
	this.address="";
	this.phone="";
	this.door="";
	this.machine="";
	this.springs="";
	this.directions="";
	this.note="";
	this.invoices=new Array();
}

function prevDay()
{
	if(unSaved)
	{
		alert("Unsaved changes!");
		return;
	}
	var turDay=pate.getDate()-1;
	if(pate.getDate()<1)
	{
		var turMonth=pate.getMonth()-1;
		
		if(pate.getMonth<1)
		{
			pate.setMonth(11);
			pate.setYear(pate.getFullYear()-1);
		}
		pate.setDate(daysInMonth(turMonth,pate.getfullYear()));
	}
	pate.setDate(turDay);
	loadDay();
	showBook();
}

function nextDay()
{
	if(unSaved)
	{
		alert("Unsaved changes!");
		return;
	}
	var turDay=pate.getDate()+1;
	if(turDay>daysInMonth(turMonth,pate.getFullYear())-1)
	{
		var turMonth=pate.getMonth();
		
		if(pate.getMonth>11)
		{
			pate.setMonth(0);
			pate.setYear(pate.getFullYear());
		}else
		{
			pate.set(turMonth);
		}
		pate.setDate(0);
	}
	pate.setDate(turDay);
	loadDay();
	showBook();
}

function currentDay()
{
	if(unSaved)
	{
		alert("Unsaved changes!");
		return;
	}
	pate=new Date();
	loadDay();
	showBook();
}

function appointment()
{
	this.customer=null;
	this.name="";
	this.address="";
	this.phone="";
	this.tech=PAUL;
	this.done=false;
	this.date=0;
	this.time=0;
	this.problem="";
	this.notes="";
	this.recall=false;
	this.cwg=false;
	
	this.setup=function(cust,thyme,guy,prob,note)
	{
		
	}
	this.getString=function()
	{
		var callwg="";
		if(this.cwg)
		{
			callwg="Call 15 Before";
		}
		if(this.recall)
		{
			callwg+=" Recall";
		}
		var donef="";
		var doneb="";
		if(this.done)
		{
			donef="<strike>";
			doneb="</strike>";
		}
		var strong=donef+this.tech+" "+timeSlots[this.time]+" "+callwg+" "+this.name+" "+this.address+" "+this.phone+" "+this.problem+" "+this.notes+ doneb+"</p>";
		return strong;
	}
	this.stringify=function(){
		var smurf={'name':this.name,'address':this.address,'phone':this.phone,'tech':this.tech,'time':this.time,'notes':this.notes,'problem':this.problem,'date':this.date,'cwg':this.cwg,'recall':this.recall,'done':this.done}
		var tempstring = JSON.stringify(smurf);
		//deal with equipment, attack type, status
		return tempstring;
	}
};

function saveDay()
{
	name=pate.toLocaleDateString();
	var tempstring="";//+appointments[pate.getFullYear()][pate.getMonth()][pate.getDate()-1].length;
	var hen=appointments[pate.getFullYear()][pate.getMonth()][pate.getDate()-1].length;
	localStorage.setItem(name+"amt",hen);
	for(var i=0;i<appointments[pate.getFullYear()][pate.getMonth()][pate.getDate()-1].length;i++)
	{
		tempstring=appointments[pate.getFullYear()][pate.getMonth()][pate.getDate()-1][i].stringify();
		localStorage.setItem(name.concat(i), tempstring);
		
	}
	unSaved=false;
}


function serverSaveDay()
{
	name=pate.toLocaleDateString();;
	var tempstring=""
	var form = $("<form />").attr("method", "POST").attr("action", "http://server.webgame.zebra-associates.org/"+"miles");
	    $("<input />").attr("type", "hidden").attr("amt", appointments[pate.getFullYear()][pate.getMonth()][pate.getDate()-1].length).attr("value", tempstring).appendTo(form);
		form.submit();
	for(var i=0;i<appointments[pate.getFullYear()][pate.getMonth()][pate.getDate()-1].length;i++)
	{
		tempstring=appointments[pate.getFullYear()][pate.getMonth()][pate.getDate()-1][i].stringify();
		var form = $("<form />").attr("method", "POST").attr("action", "http://server.webgame.zebra-associates.org/"+"miles");
	    $("<input />").attr("type", "hidden").attr("name", name.concat(i)).attr("value", tempstring).appendTo(form);
	    form.submit();
		
	}
	
}

loadDayFromServer = function(url,ply) {
		appointments[pate.getFullYear()][pate.getMonth()][pate.getDate()-1]=[];
	    var callback = function(data) {
		var obj = data;

	    }


	    $.getJSON("http://server.webgame.zebra-associates.org/"+"miles"+"?callback=?", callback);
};

function loadDay() {
	name=pate.toLocaleDateString();
	appointments[pate.getFullYear()][pate.getMonth()][pate.getDate()-1]=[];
    var hempstring= localStorage.getItem(name+"amt");
	for(var i=0;i<hempstring;i++)
	{
		var tempstring = localStorage.getItem(name.concat(i));
		buildApptFromLoadedinfo(tempstring)
	}
	showBook();
}

function buildApptFromLoadedinfo(tempstring) {
    
    var tempobj = JSON.parse(tempstring);
    //for( var i=0; i<tempobjs.length; i++ ) {
	//var tempobj = tempobjs[i];
	ning=new appointment();
	ning.name=tempobj.name;
	ning.address=tempobj.address;
	ning.phone=tempobj.phone;
	ning.time=tempobj.time;
	ning.problem=tempobj.problem;
	ning.date=tempobj.date;
	ning.notes=tempobj.notes;
	ning.tech=tempobj.tech;
	ning.cwg=tempobj.cwg;
	ning.recall=tempobj.recall;
	ning.done=tempobj.done;
	appointments[pate.getFullYear()][pate.getMonth()][pate.getDate()-1].push(ning);
    //}
};

function deleteApt()
{
	var n=prompt("Which?");
	appointments[pate.getFullYear()][pate.getMonth()][pate.getDate()-1].splice(n,1);
	showBook();
	unSaved=true;
}

function markDone()
{

	
	var n=prompt("Which?");
	appointments[pate.getFullYear()][pate.getMonth()][pate.getDate()-1][n].done=true;
	showBook();
	unSaved=true;
}

function editAppt()
{
	var n=prompt("Which?");
	document.getElementById("tbName").value=appointments[pate.getFullYear()][pate.getMonth()][pate.getDate()-1][n].name;
	document.getElementById("tbAddress").value=appointments[pate.getFullYear()][pate.getMonth()][pate.getDate()-1][n].address;
	document.getElementById("tbPhone").value=appointments[pate.getFullYear()][pate.getMonth()][pate.getDate()-1][n].phone;
	document.getElementById("timeslot").value=appointments[pate.getFullYear()][pate.getMonth()][pate.getDate()-1][n].time; 
	document.getElementById("tech").value=appointments[pate.getFullYear()][pate.getMonth()][pate.getDate()-1][n].tech;
	document.getElementById("tbProblem").value=appointments[pate.getFullYear()][pate.getMonth()][pate.getDate()-1][n].problem;
	document.getElementById("tbNotes").value=appointments[pate.getFullYear()][pate.getMonth()][pate.getDate()-1][n].notes;
	document.getElementById("recall").checked=appointments[pate.getFullYear()][pate.getMonth()][pate.getDate()-1][n].recall;
	document.getElementById("callfirst").checked=appointments[pate.getFullYear()][pate.getMonth()][pate.getDate()-1][n].cwg;
	appointments[pate.getFullYear()][pate.getMonth()][pate.getDate()-1].splice(n,1);
	showBook();
	unSaved=true;
}

function addApt()
{
	if(pate.getDay()==0)
	{
		alert("No Sunday appointments!");
		return;
	}
	var bob=new appointment();
	bob.name=document.getElementById("tbName").value;
	bob.address=document.getElementById("tbAddress").value;
	bob.phone=document.getElementById("tbPhone").value;
	bob.time=document.getElementById("timeslot").value;
	bob.tech=document.getElementById("tech").value;
	bob.problem=document.getElementById("tbProblem").value;
	bob.notes=document.getElementById("tbNotes").value;
	bob.recall=document.getElementById("recall").checked;
	bob.cwg=document.getElementById("callfirst").checked;

	
	//console.log(bob);
	appointments[pate.getFullYear()][pate.getMonth()][pate.getDate()-1].push(bob);
	document.getElementById("tbName").value="name";
	document.getElementById("tbAddress").value="address";
	document.getElementById("tbPhone").value="phone";
	document.getElementById("timeslot").value=0; //todo set to current time
	document.getElementById("tech").value="Paul";
	document.getElementById("tbProblem").value="problem";
	document.getElementById("tbNotes").value="";
	document.getElementById("recall").checked=false;
	document.getElementById("callfirst").checked=false;
	showBook();
	unSaved=true;
};

function showBook()
{
	document.getElementById("dte").innerHTML = pate.toLocaleDateString() + " "+ dayName(pate.getDay());
	orderAppts();
	var report="";
	for(var i=0;i<appointments[pate.getFullYear()][pate.getMonth()][pate.getDate()-1].length;i++)
	{
		report+=appointments[pate.getFullYear()][pate.getMonth()][pate.getDate()-1][i].getString();
	}
	document.getElementById("slot1").innerHTML = report;
};

init();
loadDay();
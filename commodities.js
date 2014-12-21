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
CommIDs.BearPelt=16;
CommIDs.WolfPelt=17;
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

	if(id==CommIDs.IronWood)
	{
		this.name="Ironwood"
		this.cost=2;
		this.description ="Hard Wood";
		this.unit=" Planks of ";
	}else if(id==CommIDs.EbonyWood)
	{
		this.name="Ebony Wood"
		this.cost=2;
		this.description ="Dark hard wood";
		this.unit=" Planks of ";
	}else if(id==CommIDs.Dragonbone)
	{
		this.name="Dragon bone"
		this.cost=200;
		this.description ="Black bones of a dead dragon.";
		this.unit=" Pieces of ";
	}else if(id==CommIDs.SummerWood)
	{
		this.name="Summerwood"
		this.cost=250;
		this.description ="Rare wood from the Summer Isles. Not normally traded with outsiders.";
		this.unit=" Planks of ";
	}else if(id==CommIDs.PigIorn)
	{
		this.name="Pig iron"
		this.cost=8;
		this.description ="Edible.Cheap iron. ";
	}else if(id==CommIDs.WhaleOil)
	{
		this.name="Whale oil"
		this.cost=12;
		this.description ="For torches and such.";
		this.unit=" Gallons of ";
	}else if(id==CommIDs.Bronze)
	{
		this.name="Bronze ingots"
		this.cost=30;
		this.description ="Bronze!";
		this.unit="";
	}else if(id==CommIDs.Gold)
	{
		this.name="Gold ingots"
		this.cost=80;
		this.description ="Gold.";
		this.unit="";
	}else if(id==CommIDs.Silver)
	{
		this.name="Silver ingots"
		this.cost=50;
		this.description ="Silver";
		this.unit=" Pounds of ";
	}else if(id==CommIDs.Cloth)
	{
		this.name="Cloth"
		this.cost=2;
		this.description ="Cloth";
		this.unit=" Spools of ";
	}else if(id==CommIDs.BearPelt)
	{
		this.name="Bear pelt"
		this.cost=4;
		this.description ="Warm and fuzzy.";
		this.unit="";
	}else if(id==CommIDs.Wool)
	{
		this.name="Wool"
		this.cost=3;
		this.description ="Warmer than cloth";
		this.unit=" Bundles of ";
	}else if(id==CommIDs.Onions)
	{
		this.name="Onions"
		this.cost=2;
		this.description ="Edible.";
		this.unit=" Pounds of ";
	}else if(id==CommIDs.Beef)
	{
		this.name="Beef"
		this.cost=2;
		this.description ="Edible.";
		this.unit=" Pounds of ";
	}else if(id==CommIDs.Lamprey)
	{
		this.name="Lamprey"
		this.cost=2;
		this.description ="Edible, but seriously have you seen one of these things?";
		this.unit=" Pounds of ";
	}else if(id==CommIDs.FreyPie)
	{
		this.name="Frey Pie"
		this.cost=2;
		this.description ="Tastes like vengeance.";
		this.unit=" Slices of ";
	}else if(id==CommIDs.Pork)
	{
		this.name="Pork"
		this.cost=2;
		this.description ="Edible.";
		this.unit=" Pounds of ";
	}else if(id==CommIDs.Ale)
	{
		this.name="Ale"
		this.cost=2;
		this.description ="Good for morale!";
		this.unit=" Gallons of ";
	}else if(id==CommIDs.ArborGold)
	{
		this.name="Arbor Gold"
		this.cost=2;
		this.description ="The fancy stuff.";
		this.unit=" Gallons of ";
	}else if(id==CommIDs.DornishRed)
	{
		this.name="Dornish red"
		this.cost=2;
		this.description ="the fancy stuff.";
		this.unit=" Gallons of ";
	}else if(id==CommIDs.CheapWine)
	{
		this.name="CheapWine"
		this.cost=2;
		this.description ="Drinkable";
		this.unit=" Gallons of ";
	}else if(id==CommIDs.Rum)
	{
		this.name="Black tar rum"
		this.cost=2;
		this.description ="Alcohol from the Summer Isles.";
		this.unit=" Gallons of ";
	}else if(id==CommIDs.Horse)
	{
		this.name="Horse"
		this.cost=20;
		this.description ="Your basic Horse.";
		this.unit="";
	}else if(id==CommIDs.SandSteed)
	{
		this.name="Dornish Sand Steed"
		this.cost=500;
		this.description ="Can run for a day and a night without tireing. Can't handle heavy loads.";
		this.unit="";
	}else if(id==CommIDs.Destrier)
	{
		this.name="Destrier"
		this.cost=2;
		this.description ="A Warhorse";
		this.unit="";
	}else if(id==CommIDs.WidowsBlood)
	{
		this.name="Widow's Blood"
		this.cost=2;
		this.description ="Poison";
		this.unit=" Vials of ";
	}else if(id==CommIDs.theStrangler)
	{
		this.name="The Strangler"
		this.cost=1000;
		this.description ="Rare poison that mimics the symptoms of choking. ";
		this.unit=" Vials of ";
	}else if(id==CommIDs.Nightshade)
	{
		this.name="Nightshade"
		this.cost=500;
		this.description ="Poison";
		this.unit=" Vials of ";
	}else if(id==CommIDs.TearsOfLys)
	{
		this.name="Tears of Lys"
		this.cost=1200;
		this.description ="Rare poison created by the Alchemists of Lys.";
		this.unit=" Vials of ";
	}else if(id==CommIDs.BasiliskVenom)
	{
		this.name="Basilisk venom"
		this.cost=800;
		this.description ="Poison the causes violent madness.";
		this.unit=" Vials of ";
	}else if(id==CommIDs.MoonTea)
	{
		this.name="Moon Tea"
		this.cost=2;
		this.description ="Morning after contreception";
		this.unit=" Vials of ";
	}else if(id==CommIDs.SweetSleep)
	{
		this.name="Sweet sleep"
		this.cost=2;
		this.description ="Sleep aid that kills in large doses.";
		this.unit=" Vials of ";
	}else if(id==CommIDs.Leaches)
	{
		this.name="Leaches"
		this.cost=2;
		this.description ="cures what ails ya!";
		this.unit="";
	}else if(id==CommIDs.GlassPane)
	{
		this.name="Glass pane"
		this.cost=20;
		this.description ="Glass.";
		this.unit=" Panels of ";
	}else if(id==CommIDs.WolfPelt)
	{
		this.name="Wolf pelt"
		this.cost=4;
		this.description ="Warm and fuzzy.";
		this.unit="";
	}else if(id==CommIDs.MyrishLense)
	{
		this.name="Salt Beef"
		this.cost=2;
		this.description ="Edible.";
		this.unit=" Pounds of ";
	}else if(id==CommIDs.BlackDye)
	{
		this.name="Black Dye"
		this.cost=2;
		this.description ="Dye clothes black";
		this.unit=" Gallons of ";
	}else if(id==CommIDs.SaltBeef)
	{
		this.name="Salt Beef"
		this.cost=2;
		this.description ="Edible.";
		this.unit=" Pounds of ";
	}else if(id==CommIDs.LemonCakes)
	{
		this.name="Lemon cakes"
		this.cost=8;
		this.description ="Lemony.";
		this.unit=" Pieces of ";
	}else if(id==CommIDs.WeirWood)
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
	}else if(id==CommIDs.SaltFish)
	{
		this.name="Salt Fish"
		this.cost=2;
		this.description ="Yummy fish.";
		this.unit=" Pieces of ";
	}else if(id==CommIDs.UnicornHorn)
	{
		this.unit=" Pieces of ";
		this.name="Unicorn Horn"
		this.cost=15;
		this.description ="Includes certificate of authenticity.";
	}else if(id==CommIDs.Capon)
	{
		this.unit=" Pieces of ";
		this.name="Capon"
		this.cost=15;
		this.description ="It's a tiny bird.";
	}else if(id==CommIDs.Steel)
	{
		this.unit=" Pieces of ";
		this.name="Steel Ignot";
		this.cost=15;
		this.description ="decent steel";
	}else if(id==CommIDs.Obsidian)
	{
		this.unit=" Pieces of ";
		this.name="Obsidian";
		this.cost=5;
		this.description ="Dragonglass";
	}
	commodity.prototype.combine=function(cmb)
	{
		this.amount=this.amount+cmb.amount;
		cmb.amount=0;
	};
}
let network_kis = null;
let network_objectives = null;
let network_characters = null;
let timerID = null;
let objectivesTimerID = null;
let charactersTimerID = null;
let force = false;
let forceObj = false;

MYOutput={"Overworld": {'child-areas':[{'name': 'OverworldMap','time': {'seconds':0, 'milli':0}}],'time':{'seconds':0,'milli':0}},
"Underworld":{'child-areas':[{'name': 'UndergroundMap','time': {'seconds':0, 'milli':0}}],'time':{'seconds':0,'milli':0}},
"Dungeons":{'child-areas':[],'time':{'seconds':0,'milli':0}},
"Moon":{'child-areas':[{'name': 'MoonSurface','time': {'seconds':0, 'milli':0}}],'time':{'seconds':0,'milli':0}},
"Zeromus":{'child-areas':[],'time':{'seconds':0,'milli':0}},
"Misc":{'child-areas':[],'time':{'seconds':0,'milli':0}},"time":{'seconds':0,'milli':0},
"Version": "221607WEB","Steps":-1,"Fly":-1,"Transitions": 0,"Route":"","RouteTime":"","KIs":[],
"KI Locations":[],"Objectives":[],"metadata":{},"lag frames": {"minutes":0,"seconds":0}
}

let area_frames=Array(512).fill(0);
//let LocTimes=Array(64).fill(0);
//let LocParty=Array(64).fill("");
//let LocationBinary=Array(2).fill(0);
//let KIsToLocMap=Array(16).fill(0);
//let LocToKisMap,Objectives = [],[]
//let LocNames=["","Starting item","Antlion nest","Defending Fabul","Mt. Ordeals","Baron Inn","Baron Castle","Edward in Toroia","Cave Magnes","Tower of Zot","Lower Bab-il boss","Super Cannon","Dwarf Castle/Luca","Sealed Cave","Feymarch chest","Rat Tail trade","Yang's wife (for finding Yang)","Yang's wife (Pan trade)","Feymarch queen","Feymarch king","Odin throne","From the Sylphs","Cave Bahamut","Pale Dim/Murasame altar","Wyvern/Crystal Sword altar","Plague/White spear altar","D.Lunar/Ribbon chest 1","D.Lunar/Ribbon chest 2","Ogopogo/Masamune altar","Tower of Zot trapped chest","Eblan trapped chest 1","Eblan trapped chest 2","Eblan trapped chest 3","Lower Bab-il trapped chest 1","Lower Bab-il trapped chest 2","Lower Bab-il trapped chest 3","Lower Bab-il trapped chest 4","Cave Eblan trapped chest","Upper Bab-il trapped chest","Cave of Summons trapped chest","Sylph Cave trapped chest 1","Sylph Cave trapped chest 2","Sylph Cave trapped chest 3","Sylph Cave trapped chest 4","Sylph Cave trapped chest 5","Sylph Cave trapped chest 6","Sylph Cave trapped chest 7","Giant of Bab-il trapped chest","Lunar Path trapped chest","Lunar Core trapped chest ","Lunar Core trapped chest 2","Lunar Core trapped chest 3","Lunar Core trapped chest 4","Lunar Core trapped chest 5","Lunar Core trapped chest 6","Lunar Core trapped chest 7","Lunar Core trapped chest 8","Lunar Core trapped chest 9","Rydia's Mom","Fallen Golbez (vanilla Crystal location)","E1","E2","Objective completion","E3","E4"]
//let KIsNames=["","Package","Sandruby","Legend Sword","Baron Key","Twinharp","Earth Crystal","Magma Key","Tower Key","Hook","Luca Key","Darkness Crystal","Rat Tail","Adamant","Pan","Spoon","Pink Tail","Crystal"]
let areas=["Baron Town","Mist","Kaipo","Mysidia","Mythril","Troia Town","Agart","Troia Inn","Troia Weapons","Troia Armor","Troia Items","Baron Inn","Baron Equipment","Cid's house","Rosa's house","Rydia's house","Kaipo Inn","Kaipo Cafe","Kaipo Hospital","Mysidia Cafe","Mysidia Inn","Mount Ordeals Mirror Room","House of Wishes","Room of Wishes","Troia Cafe main floor","Troia Cafe upstairs","Troia Dancers' stage","-Glitch world-","Troia Chocobo stable entrance","Troia Chocobo stable downstairs","Astro Tower main hall","Astro Tower Observatory","Agart Inn","Large chocobo forest near Troia","Town water background","Castle floor background","Baron Castle","Damcyan","Fabul","Troia Castle","Eblan","Desert background","Baron Castle Lobby","Baron Castle Outer court","Baron Castle Throne room","Baron Castle West Hall","Baron Castle East Hall","Baron Castle Prison entrance","Baron Castle Prison","Baron Castle Soldiers' quarters","Baron Castle West tower 1F","Baron Castle West tower 2F","Baron Castle Cecil's room","Baron Castle East tower 1F","Baron Castle East tower 2F","Baron Castle East tower 3F","Baron Castle East tower B1","Baron Castle Odin's room","Sewer entrance","Sewer B3","Sewer B1","Sewer Save point room","Sewer B2","Damcyan 1F","Damcyan 2F","Damcyan 3F","Damcyan Treasury entrance","Damcyan Treasury downstairs","Room leading to sewer","Agart Weapons","Agart Armor","Fabul Lobby","Fabul Second floor","Fabul Throne room","Fabul Crystal room","Fabul Equipment store","Fabul Inn","Fabul East tower 1F","Fabul East tower 2F","Fabul King's room","Fabul West tower 1F","Fabul Hostpital","Fabul Yang's room","Forest where you lose Kain","Watery Pass Save point room","Troia Castle Lobby","Troia Castle Clerics' room","Troia Castle Crystal room","Troia Castle Hospital","Troia Castle Room w/ 3 stairs","Troia Castle Hall to treasury","Troia Castle Room w/ random pots","Troia Castle Room w/ rubyring chests","Troia Castle Main treasury","Eblan 1F","Eblan 2F","Eblan Throne room","Eblan West tower 1F","Eblan West tower 2F","Eblan East tower 1F","Eblan East tower 2F","Eblan Basement","Baron Castle Black magic school","Baron Castle White magic school","Desert background","Training room","Waterfall","Castle water background","Misty cave","Mirror room background","Watery Pass background","Watery Pass 1F","Watery Pass 2F","Watery Pass 3F","Watery Pass 4F","Watery Pass 5F","Waterfall entrance","Waterfall 1F","Waterfall 2F","Antlion Cave 1F","Antlion Cave 2F","Antlion Cave Antlion's nest","Antlion Cave Save point room","Antlion Cave Treasure room w/ harp","Black background","Mist background","Mount Hobs West","Mount Hobs Summit","Mount Hobs East","Mount Hobs Save point floor","Mountain background","Watery Pass Room behind waterfall","Mount Ordeals 1F","Mount Ordeals 2F","Mount Ordeals 3F","Mount Ordeals Summit","Mysidia Crystal room","Mysidia Devil's Road","Baron Castle Collapsing hallway","Agart Well","Cave Magnes 1F","Cave Magnes 2F","Cave Magnes Treasure room w/ pit","Cave Magnes 3F","Cave Magnes Treasure room w/ torch","Cave Magnes 4F","Cave Magnes Save point room","Cave Magnes 5F","Cave Magnes Crystal room","Cave Magnes background","Watery Pass campsite","Baron Devil's Road","Tower of Zot 1F","Tower of Zot 2F","Tower of Zot 3F","Pitch black room","Tower of Zot 4F","Tower of Zot 5F","Tower of Zot 6F","Tower of Zot Command center","Adamant Grotto","Cave Magnes Save point room","Tower of Zot Save point room","Cid's Airship - Giant sequence","Twins' Airship - Giant sequence","Edward's Airship - Giant sequence","Tower of Babil Save point room","Tower of Babil B1","Tower of Babil B2","Tower of Babil B3","Tower of Babil B4","Tower of Babil Crystal room","Tower of Babil B5","Scrolling mountains - Cid falling?","Underground tunnel background","Crystal room background","Ending - Cecil's room","Training room Main floor","Training room Upstairs","-Glitch world-","-Glitch world-","Giant of Babil Mouth","Giant of Babil Neck","Giant of Babil Chest","-Glitch world-","Giant of Babil Stomach","Giant of Babil Passage","-Glitch world-","Giant of Babil Lung","Giant of Babil CPU","Giant of Babil background","-Glitch world-","Moving airship with soldiers","Fabul port","Boat sailing","Airship docked","Joined airships","Empty airship","Airship flying over underworld","Cave Eblan entrance","Cave Eblan Settlement","Cave Eblan pass to Babil","Cave Eblan exit","Cave Eblan Inn","Cave Eblan Equipment store","Cave Eblan Save point room","Cave Eblan Hospital","Fabul Chocobo forest","Empty airship","Mount Ordeals Chocobo forest","Baron Chocobo forest","Troia Chocobo forest","Island Chocobo forest","Baron Empty throne room","Empty airship w/ black bg","Empty airship","Empty airship underground","Empty airship w/ black bg","Tower of Wishes - final battle","Airship background","Large dock","-Glitch world-","-Glitch world-","Small dock","Mist Inn","Mist Weapons","Mist Armor","Kaipo Weapons","Kaipo Armor","Mysidia Weapons","Mysidia Armor","Mysidia Item store","Mythril Inn","Mythril Weapons","Mythril Armor","Mythril Items","Baron Items","Ending - Tower of Wishes","Ending - Palom and Leonora","Ending - Eblan throne room","Ending - Leviathan's room","Ending - Damcyan","Ending - Dwarf Castle","Ending - Mount Ordeals","Ending - Astro Tower","Ending - Cecil's room","Ending - Baron throne room","Ending - Fabul throne room","-Glitch world-","-Glitch world-","-Glitch world-","Overworld","Underworld","Moon surface","current map","Location trigger / VFX call","Smithy's house","Tomra","Smithy's house main floor","Smithy's house Smithy's room","Tomra Inn","Tomra Equipment store","Tomra Treasury","Dwarf Castle","Dwarf Castle Lobby","Dwarf Castle Throne room","Dwarf Castle Fat Chocobo room","Dwarf Castle Basement tunnel","Crystal room background","Dwarf Castle Crystal room","Dwarf Castle Equipment room","Dwarf Castle Basement w/ recovery pot","Dwarf Castle East tower 1F","Dwarf Castle Inn","Dwarf Castle Hospital","Dwarf Castle West tower 1F","Tower of Babil Save point","Tower of Babil Icebrand room","Tower of Babil Blizzard room","Tower of Babil Ice shield room","Tower of Babil Ice mail room","Dwarf Castle East tower 3F","Dwarf Castle West tower 3F","Dwarf Castle both towers 2F","Dwarf Castle background","Tower of Babil Floor w/ Lugae - 1","Tower of Babil Floor w/ Ice mail - 1","Tower of Babil Floor w/ Airship - 1","Dwarf Castle Cafe","Tower of Babil 1F","Tower of Babil 2F","Tower of Babil 3F","Tower of Babil 4F","Tower of Babil 5F","Tower of Babil Floor w/ airship - 2","Tower of Babil Floor w/ Ice mail - 2","Tower of Babil Floor w/ Lugae - 2","-Glitch world-","-Glitch world-","-Glitch world-","Lunar whale","Tower of Babil Cannon room","Dwarf tank","Lunar whale","Tower of Babil background","Ending - Palom and Leonora","Tomra Items","Tower of Wishes Top floor after Giant","Castle floor background","Town water background","Cave of Summons 1F","Cave of Summons 2F","Cave of Summons 3F","Sylvan Cave background","Feymarch 1F","Feymarch Treasury","Feymarch 2F","Feymarch House w/ save point","Feymarch Library 1F","Feymarch Library 2F","Feymarch Leviathan's room","Feymarch Weapons","Feymarch Armor","Feymarch Inn","Sealed Cave entrance","Sylvan Cave 1F","Sylvan Cave 2F","Sylvan Cave 3F","Sylvan Cave Treasury","Sylvan Cave Yang's room","Sealed Cave 1F","Sealed Cave Room w/ katana, ether","Sealed Cave 2F","Sealed Cave 3F","Sealed Cave Room w/ katana, ninja hat","Sealed Cave Room w/ ninja star, elixir","Sealed Cave Room w/ Light sword","Sealed Cave 4F","Sealed Cave 5F","Sealed Cave 6F","Sealed Cave Room w/ many boxes","Sealed Cave 7F","Sealed Cave Save point room","Sealed Cave Room w/ Demon Wall","Sealed Cave Empty room","Sealed Cave Crystal room","Bahamut's Cave 1F","Bahamut's Cave 2F","Bahamut's Cave Bahamut's floor","-Glitch world-","-Glitch world-","-Glitch world-","Lunar Palace Lobby","Lunar Palace Crystal room","Lunar background","First lunar passage","Second lunar passage","Hummingway land","Lunar's Lair background","Lunar Subterran 1F","Lunar Subterran 2F","Lunar Subterran 3F","Lunar Subterran 4F","Lunar Subterran 5F","Lunar Subterran 6F","Lunar Subterran 7F","Lunar Core 1F","Lunar Core 2F","Lunar Core 3F","Lunar Core 4F","Lunar Core Zemus' room","Lunar Subterran Room w/elixir","Lunar Subterran Tunnel w/ 2 Cure3s","Lunar Subterran Tunnel w/ Protect ring","Lunar Subterran Tunnel w/ White robe","Lunar Subterran Pinkpuff room","Lunar Subterran Save point near Ragnarok","Lunar Subterran Tunnel w/ Minerva","Lunar Subterran Room w/ Holy lance","Lunar Subterran Save point room","Lunar Subterran Room w/ Ribbons","Lunar Core background","-Glitch world-","-Glitch world-"]
let idToArea=[1,3,4,5,6,7,9,7,7,7,7,1,1,1,1,3,4,4,4,5,5,22,5,5,7,7,7,33,7,7,9,9,9,13,33,33,2,10,11,8,12,33,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,10,10,10,10,10,1,9,9,11,11,11,11,11,11,11,11,11,11,11,11,3,19,8,8,8,8,8,8,8,8,8,12,12,12,12,12,12,12,12,2,2,33,33,19,33,18,33,33,19,19,19,19,19,19,19,19,20,20,20,20,20,33,33,21,21,21,21,33,19,22,22,22,22,5,5,2,9,23,23,23,23,23,23,23,23,23,23,19,1,24,24,24,33,24,24,24,24,25,23,24,33,33,33,25,25,25,25,25,25,25,33,33,33,33,33,33,33,33,29,29,29,33,29,29,33,29,29,29,29,33,33,33,33,33,33,26,25,25,25,25,25,25,25,25,13,33,13,13,13,13,2,33,33,33,33,33,33,33,33,33,33,3,3,3,4,4,5,5,5,6,6,6,6,1,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,14,15,14,14,15,15,15,16,16,16,16,16,33,16,16,16,16,16,16,16,26,26,26,26,26,16,16,16,33,26,26,26,16,26,26,26,26,26,26,26,26,33,33,33,33,26,33,31,33,33,15,5,33,33,17,17,17,33,17,17,17,17,17,17,17,17,17,17,28,27,27,27,27,27,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,30,30,30,33,33,33,30,30,33,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,32,30,30,30,30,30,30,30,30,30,30,33,33,33]
let GroupAreas=["","Baron Town Areas","Baron Castle Areas","Mist Areas","Kaipo Areas","Mysidia Areas","Mythril Areas","Troia Areas","Troia Castle Areas","Agart Areas","Damcyan Areas","Fabul Areas","Eblan Areas","Chocobo Forests",
"Smithy Areas","Tomra Areas","Dwarf Castle Areas","Feymarch Areas","Mist Cave","Watery Pass Areas","Antlion Areas","Hobbs Areas","Ordeals Areas","Cave Magnes Areas","Zot Areas","Hook Stuff","Babil Areas","Sylph Areas",
"Sealed Cave Areas","Giant Areas","Moon Areas","Moon Areas","Zeromus","Misc",];
let GroupIndex=[-1,1,2,3,4,5,6,7,8,9,10,11,12,13,1,2,3,4,0,1,2,3,4,5,6,7,8,9,10,11,12,1,2,0] //)th index for some are the overworld map type areas. 
let areaToLocation=[-1,"Overworld","Overworld","Overworld","Overworld","Overworld","Overworld","Overworld","Overworld","Overworld","Overworld","Overworld","Overworld","Overworld",
"Underground","Underground","Underground","Underground",
"Dungeons","Dungeons","Dungeons","Dungeons","Dungeons","Dungeons","Dungeons","Dungeons","Dungeons","Dungeons","Dungeons","Dungeons","Dungeons",
"Moon","Moon",
"Zeromus"];
areas[-4]="DummyValue",areas[-3]="OverworldMap",areas[-2]="UndergroundMap",areas[-1]="MoonSurface"

//let iToC=["Cecil","Kain","Rydia","Tellah","Edward","Rosa","Yang","Palom","Porom","Cecil","Cid","Rydia","Edge","FuSoYa","Various","Golbez"]
let currentArea=2,currentID=0,Transitions=0,KIBinary=0

let AreaString= ["2"], DetailedString= ["0"], FramesString= ["0"], FramesDetailed = ["0"]
let lastTime=0;

/*
let Baron={'name':"Baron Town Areas", areas:[0,11,12,13,14,68,151,236]}
let BaronCastle={'name':"Baron Castle Areas",areas:[36,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,102,103,138,213]}
let Mist={'name':"Mist Areas",areas:[1,15,83,224,225,226]}
let Kaipo={'name':"Kaipo Areas",areas:[2,16,17,18,227,228]}
let Mysidia={'name':"Mysidia Areas",areas:[3,19,20,22,23,136,137,229,230,231,307]}
let Mythril={'name':"Mythril Areas",areas:[4,232,233,234,235]}
let Troia={'name':"Troia Areas",areas:[5,7,8,9,10,24,25,26,28,29]}
let TroiaCastle={'name':"Troia Castle Areas",areas:[39,85,86,87,88,89,90,91,92,93]}
let Agart={'name':"Agart Areas",areas:[6,30,31,32,69,70,139]}
let Damcyan={'name':"Damcyan Areas",areas:[37,63,64,65,66,67]}
let Fabul={'name':"Fabul Areas",areas:[38,71,72,73,74,75,76,77,78,79,80,81,82]}
let Eblan={'name':"Eblan Areas",areas:[40,94,95,96,97,98,99,100,101]}
let Chocobo={'name':"Chocobo Forests",areas:[33,207,209,210,211,212]}

let Smithy={'name':"Smithy Areas",areas:[256,258,259]}
let Tomra={'name':"Tomra Areas",areas:[257,260,261,262,306]}
let Dwarf={'name':"Dwarf Castle Areas",areas:[263,264,265,266,267,269,270,271,272,273,274,275,281,282,283,288]}
let Feymarch={'name':"Feymarch Areas",areas:[310,311,312,314,315,316,317,318,319,320,321,322,323]}

let MistCave={'name':"Mist Cave",areas:[108]}
let WateryPass={'name':"Watery Pass Areas",areas:[84,106,111,112,113,114,115,116,117,118,131,150]}
let Antlion={'name':"Antlion Areas",areas:[119,120,121,122,123]}
let Hobbs={'name':"Hobbs Areas",areas:[126,127,128,129]}
let Ordeals={'name':"Ordeals Areas",areas:[21,132,133,134,135]}
let CaveMagnes={'name':"Cave Magnes Areas",areas:[140,141,142,143,144,145,146,147,148,149,161]}
let Zot={'name':"Zot Areas",areas:[152,153,154,156,157,158,159,162]}

let HookStuff={'name':"Hook Stuff",areas:[160,166,167,168,169,170,171,172,199,200,201,202,203,204,205,206]}

// Need to check what is happening with 285-287, and 294-296, One of them belongs to hook route I think
let Babil={'name':"Babil Areas",areas:[198,276,277,278,279,280,285,286,287,289,290,291,292,293,294,295,296,301]}
let Sylph={'name':"Sylph Areas",areas:[325,326,327,328,329]}
let SealedCave={'name':"Sealed Cave Areas",areas:[324,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345]}
let Giant={'name':"Giant Areas",areas:[181,182,183,185,186,188,189,190,191]}
let Moon={'name':"Moon Areas",areas:[303,346,347,348,352,353,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,371,372,373,374,375,376,377,378,379,380]}
let Zeromus={'name':"Zeromus",areas:[370]}

let Misc={'name':"Misc",areas:[27,34,35,41,104,105,107,109,110,124,125,130,155,163,164,165,173,174,175,176,177,178,179,180,184,187,192,193,194,195,196,197,208,214,215,216,217,218,219,220,221,222,223,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,268,284,297,298,299,300,302,304,305,308,309,313,349,350,351,354,381,382,383}

let Overworld=["Overworld",-3,Baron,BaronCastle,Mist,Kaipo,Mysidia,Mythril,Troia,TroiaCastle,Agart,Damcyan,Fabul,Eblan,Chocobo]
let Underground=["Underground",-2,Smithy,Tomra,Dwarf,Feymarch]
let MoonArea=["Moon",-1,Moon]
let Dungeons=["Dungeons",-4,MistCave,WateryPass,Antlion,Hobbs,Ordeals,CaveMagnes,Zot,HookStuff,Babil,Sylph,SealedCave,Giant]
*/
let ki_map = {
  0x00: KeyItem.PACKAGE,
  0x01: KeyItem.SANDRUBY,
  0x02: KeyItem.LEGEND,
  0x03: KeyItem.BARON_KEY,
  0x04: KeyItem.TWINHARP,
  0x05: KeyItem.EARTH_CRYSTAL,
  0x06: KeyItem.MAGMA_KEY,
  0x07: KeyItem.TOWER_KEY,
  0x08: KeyItem.HOOK,
  0x09: KeyItem.LUCA_KEY,
  0x0A: KeyItem.DARKNESS_CRYSTAL,
  0x0B: KeyItem.RAT_TAIL,
  0x0C: KeyItem.ADAMANT,
  0x0D: KeyItem.PAN,
  0x0E: KeyItem.SPOON,
  0x0F: KeyItem.PINK_TAIL,
  0x10: KeyItem.CRYSTAL
}

let ki_location_map = {
  0x002E: KeyItemCheck.ADAMANT,
  0x0021: KeyItemCheck.ANTLION,
  0x0025: KeyItemCheck.BARON_KING,
  0x0024: KeyItemCheck.BARON_INN,
  0x0033: KeyItemCheck.BARON_ODIN,
  0x0022: KeyItemCheck.FABUL_DEFEND,
  0x002F: KeyItemCheck.FABUL_SYLPH,
  0x0030: KeyItemCheck.FABUL_PAN,
  0x0027: KeyItemCheck.MAGNES,
  0x0059: KeyItemCheck.MIST,
  0x0023: KeyItemCheck.MT_ORDEALS,
  0x0026: KeyItemCheck.TOROIA,
  0x0028: KeyItemCheck.TOWER_ZOT,
  0x002B: KeyItemCheck.DWARF,
  0x002D: KeyItemCheck.FEY_CHEST,
  0x0031: KeyItemCheck.FEY_ASURA,
  0x0032: KeyItemCheck.FEY_LEVIATHAN,
  0x0029: KeyItemCheck.LOWER_BABIL_BOSS,
  0x002A: KeyItemCheck.LOWER_BABIL_CANNON,
  0x002C: KeyItemCheck.SEALED_CAVE,
  0x0034: KeyItemCheck.SYLPH_CAVE,
  0x0035: KeyItemCheck.BAHAMUT,
  0x0037: KeyItemCheck.MOON_CRYSTAL,
  0x0036: KeyItemCheck.MOON_MURASAME,
  0x003B: KeyItemCheck.MOON_MASAMUNE,
  0x0039: KeyItemCheck.MOON_RIBBON,
  0x003A: KeyItemCheck.MOON_RIBBON,
  0x0038: KeyItemCheck.MOON_WHITE
}

function getConnected() {
  var x = getParameterByName('p');
  if(x ==null){
    network_kis = create_network(console, isReact=false);
    network_kis.onConnect().then(
      () => { console.log("Connected") },
      () => {console.log("Failure") }
    );
  }
  else{
    autotrackingport=x;
    network_kis = create_network_mecha(console, x, isReact=false);
    network_kis.onConnect().then(
      () => { 
              timerID = setInterval( check_for_start, 100);
            },
      () => {console.log("Failure") }
    );
    network_objectives = create_network_mecha(console, x, isReact=false);
    network_objectives.onConnect().then(
      () => { 
              setTimeout(get_objectives_from_metadata, 1000);
              objectiveTimerID = setInterval( keep_updating_objectives, 5000);
            },
      () => {console.log("Failure") }
    );
    network_characters = create_network_mecha(console, x, isReact=false);
    network_characters.onConnect().then(
      () => { 
              charactersTimerID = setInterval( keep_updating_characters, 7000);
            },
      () => {console.log("Failure") }
    );
  }
  
}

function disconnect() {
    if (timerID) {
      clearInterval(timerID);
    }
    if (objectiveTimerID){
      clearInterval(objectiveTimerID);
      clearInterval(characterTimerID);
    }
    network_kis.disconnect();
  }

function check_for_start() {
  network_kis.snes.send(JSON.stringify({
       "Opcode" : "GetAddress",
       "Space" : "SNES",
       "Operands": ["0xF51700", '3']
    })).then(
      (event) => {
       return event.data.arrayBuffer()
     }).then(
    (locdata) => {
      let x = new Uint8Array(locdata);
	  if(! timerStarted){
		if(x[2] != 0){
			timerSecondsElapsed=3000;
			StartTimer();
		}
	  }
	  else{
		  let currentarea=(x[1]<<8)+x[2]
		  let Location = areaToLocation[idToArea[currentarea]];
		  let Group = GroupAreas[idToArea[currentarea]];
		  let myIndex = GroupIndex[idToArea[currentarea]];
		  let myTime=timerSecondsElapsed-lastTime;
		  lastTime=timerSecondsElapsed;
		  switch(x[0]){
			  case 0:
				  currentarea=-3;
				  Location="Overworld";
				  myIndex=0;
				  break;
			  case 1:
				  currentarea=-2;
				  Location="Underground";
				  myIndex=0;
				  break;
			  case 2:
				  currentarea=-1;
				  Location="Moon";
				  myIndex=0;
				  break;
			  default:
				  if(MYOutput[Location]['child-areas'][myIndex] == undefined){
					  MYOutput[Location]['child-areas'][myIndex] = {
						  'name': Group,
						  'time': {'seconds':0, 'milli':0},
						  'child-areas': []
					  };
				  }
				  let child=MYOutput[Location]['child-areas'][myIndex]['child-areas'].findIndex((element) => (element['name']==areas[currentarea]));
				  if(child== -1){
					  MYOutput[Location]['child-areas'][myIndex]['child-areas'].push({
						  'name': areas[currentarea],
						  'time': {'seconds':0, 'milli':0}
					  });
					  child=MYOutput[Location]['child-areas'][myIndex]['child-areas'].findIndex((element) => (element['name']==areas[currentarea]));
				  }
				  MYOutput[Location]['child-areas'][myIndex]['child-areas'][child]['time']['milli']+=myTime;
				  MYOutput[Location]['child-areas'][myIndex]['child-areas'][child]['time']['seconds']=Math.floor(MYOutput[Location]['child-areas'][myIndex]['child-areas'][child]['time']['milli']/1000);
				  break;
				  
		  }
		  MYOutput[Location]['child-areas'][myIndex]['time']['milli']+=myTime;
		  MYOutput[Location]['child-areas'][myIndex]['time']['seconds']=Math.floor(MYOutput[Location]['child-areas'][myIndex]['time']['milli']/1000);
		  MYOutput[Location]['time']['milli']+=myTime;
		  MYOutput[Location]['time']['seconds']=Math.floor(MYOutput[Location]['time']['milli']/1000);
		  MYOutput['time']['milli']+=myTime;
		  MYOutput['time']['seconds']=Math.floor(MYOutput['time']['milli']/1000);
		  if(currentarea != currentArea){
			  currentArea=currentarea;
			  MYOutput['Transitions']+=1;
		  }
		  
	  }
  });
}

function keep_updating_characters(){
  network_characters.snes.send(JSON.stringify({
       "Opcode" : "GetAddress",
       "Space" : "SNES",
       "Operands": ["0xF51000", '140']
    })).then(
      (event) => {
       return event.data.arrayBuffer()
     }).then(
    (partydata) => {
      let x = new Uint8Array(partydata);
      let order = [0,1,2,3,4,5,6,7,8,0,9,2,10,11];
      partymembers = [-1, -1, -1, -1, -1];
      for( let i = 0; i<5;i++){
        if(x[0x40*i]!=0){
          partymembers[i]=order[x[0x40*i+1]&0x0f]
        }
      }
      partymembers.sort()
      partymembers.reverse()
      ApplyChecks();
       return;
   });
}
      
function get_objectives_from_metadata() {
    network_objectives.snes.send(JSON.stringify({
       "Opcode" : "GetAddress",
       "Space" : "SNES",
       "Operands": ["0x1FF000", '400']
    })).then(
      (event) => {
       return event.data.arrayBuffer()
     }).then(
     (metadata) => {
       let x = new Uint8Array(metadata);
       let bytes = x[0] + 256 * x[1];
       let meta = new TextDecoder("utf-8").decode(x.slice(4,bytes+4));
       Objectives = JSON.parse(meta).objectives;
       flags = JSON.parse(meta).flags.toUpperCase();
       SetModes();
       ApplyChecks();
       return;
   });
}

function keep_updating_objectives() {
    if (!Objectives) {
      return;
    }
    let count = Objectives.length;
    network_objectives.snes.send(JSON.stringify({
       "Opcode" : "GetAddress",
       "Space" : "SNES",
       "Operands": ["0xF51500", (0x20+count).toString(16)]
    })).then(
      (event) => {
       return event.data.arrayBuffer()
     }).then(
       (ab) => {
			let ram = new Uint8Array(ab);
			let memory_ki = ram.slice(0,0x20);
			if( !memory_ki.some( n => n!=0 ) && !force){
				force=true;
				return;
			}
			for (let i = 0; i <= 2; i++) {
			  for (let b = 0; b < 8; b++) {
				let index = (i * 8 + b);
				if (index > 0x10) continue;
				let truth = !!(memory_ki[i] & (1 << b));
				set_ki(index, truth);
			  }
			}
			for (let i = 0x14; i <= 0x1B; i++) {
			  for (let b = 0; b < 8; b++) {
				let index = (i * 8 + b) - 0x14*8;
				if (index > (0x5D)) continue;
				let truth = !!(memory_ki[i] & (1 << b));
				set_loc_ki(index + 0x20, truth);
			  }
			}
			force=false;
			ApplyChecks();
			let objectiveFlags=ram.slice(0x20,0x20+count);
			if( !objectiveFlags.some( n => n!=0 ) && !forceObj){
			  forceObj=true;
			  return;
			}
			for (let i=0; i < Objectives.length; i++) {
			  set_objective(i, !!objectiveFlags[i]);
			}
			forceObj=false;
			ApplyChecks();
        },
        (err) => { console.log("bleh" + err) });
  }

function set_objective(index, truth=True) {
  if(!Objectives)
    return;
  let x = objectivenames.indexOf(Objectives[index])
  if (objectives[x] === 0 && truth){
    checkOffObjective(x);
  }
  else if (objectives[x] === 1 && !truth){
    checkOffObjective(x);
  }
}

function set_ki(index, truth=True) {
  if( keyitems[ki_map[index]] == 0 && truth){
    keyitems[ki_map[index]] = 1;
  }
  else if ( keyitems[ki_map[index]] != 0 && !truth){
    keyitems[ki_map[index]] = 0;
  }
}

function set_loc_ki(index, truth=True) {
  if (ki_location_map[index] !== undefined) {
    if (keyitemlocations[ki_location_map[index]] != 2 && truth) {
        SwapKeyItemLocation(ki_location_map[index],false)
    }
    else if (keyitemlocations[ki_location_map[index]] == 2 && !truth){
        SwapKeyItemLocation(ki_location_map[index],false)
    }
  }
}


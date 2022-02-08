startTime,lagcount,treasures=0,0,0
started,Battle,Menu=false,false,false

local socket = require("socket.core")

tcp=socket.tcp()
tcp:connect('127.0.0.1',54321)
tcp:setoption('keepalive',true)

area_battles,area_frames,area_menus,LocTimes,LocParty,LocationBinary,KIsToLocMap,LocToKisMap,BossBattles,BossTime,BossTime,BossParty = {},{},{},{},{},{},{},{},{},{},{}

LocNames={"Starting item","Antlion nest","Defending Fabul","Mt. Ordeals","Baron Inn","Baron Castle","Edward in Toroia","Cave Magnes","Tower of Zot","Lower Bab-il boss","Super Cannon","Dwarf Castle/Luca","Sealed Cave","Feymarch chest","Rat Tail trade","Yang's wife (for finding Yang)","Yang's wife (Pan trade)","Feymarch queen","Feymarch king","Odin throne","From the Sylphs","Cave Bahamut","Pale Dim/Murasame altar","Wyvern/Crystal Sword altar","Plague/White spear altar","D.Lunar/Ribbon chest 1","D.Lunar/Ribbon chest 2","Ogopogo/Masamune altar","Tower of Zot trapped chest","Eblan trapped chest 1","Eblan trapped chest 2","Eblan trapped chest 3","Lower Bab-il trapped chest 1","Lower Bab-il trapped chest 2","Lower Bab-il trapped chest 3","Lower Bab-il trapped chest 4","Cave Eblan trapped chest","Upper Bab-il trapped chest","Cave of Summons trapped chest","Sylph Cave trapped chest 1","Sylph Cave trapped chest 2","Sylph Cave trapped chest 3","Sylph Cave trapped chest 4","Sylph Cave trapped chest 5","Sylph Cave trapped chest 6","Sylph Cave trapped chest 7","Giant of Bab-il trapped chest","Lunar Path trapped chest","Lunar Core trapped chest ","Lunar Core trapped chest 2","Lunar Core trapped chest 3","Lunar Core trapped chest 4","Lunar Core trapped chest 5","Lunar Core trapped chest 6","Lunar Core trapped chest 7","Lunar Core trapped chest 8","Lunar Core trapped chest 9","Rydia's Mom","Fallen Golbez (vanilla Crystal location)","E1","E2","Objective completion","E3","E4"}
LocNames[0]=""
KIsNames={"Package","Sandruby","Legend Sword","Baron Key","Twinharp","Earth Crystal","Magma Key","Tower Key","Hook","Luca Key","Darkness Crystal","Rat Tail","Adamant","Pan","Spoon","Pink Tail","Crystal"}
KIsNames[0]=""
areas={"Baron Town","Mist","Kaipo","Mysidia","Mythril","Troia Town","Agart","Troia Inn","Troia Weapons","Troia Armor","Troia Items","Baron Inn","Baron Equipment","Cid's house","Rosa's house","Rydia's house","Kaipo Inn","Kaipo Cafe","Kaipo Hospital","Mysidia Cafe","Mysidia Inn","Mount Ordeals Mirror Room","House of Wishes","Room of Wishes","Troia Cafe main floor","Troia Cafe upstairs","Troia Dancers' stage","-Glitch world-","Troia Chocobo stable entrance","Troia Chocobo stable downstairs","Astro Tower main hall","Astro Tower Observatory","Agart Inn","Large chocobo forest near Troia","Town water background","Castle floor background","Baron Castle","Damcyan","Fabul","Troia Castle","Eblan","Desert background","Baron Castle Lobby","Baron Castle Outer court","Baron Castle Throne room","Baron Castle West Hall","Baron Castle East Hall","Baron Castle Prison entrance","Baron Castle Prison","Baron Castle Soldiers' quarters","Baron Castle West tower 1F","Baron Castle West tower 2F","Baron Castle Cecil's room","Baron Castle East tower 1F","Baron Castle East tower 2F","Baron Castle East tower 3F","Baron Castle East tower B1","Baron Castle Odin's room","Sewer entrance","Sewer B3","Sewer B1","Sewer Save point room","Sewer B2","Damcyan 1F","Damcyan 2F","Damcyan 3F","Damcyan Treasury entrance","Damcyan Treasury downstairs","Room leading to sewer","Agart Weapons","Agart Armor","Fabul Lobby","Fabul Second floor","Fabul Throne room","Fabul Crystal room","Fabul Equipment store","Fabul Inn","Fabul East tower 1F","Fabul East tower 2F","Fabul King's room","Fabul West tower 1F","Fabul Hostpital","Fabul Yang's room","Forest where you lose Kain","Watery Pass Save point room","Troia Castle Lobby","Troia Castle Clerics' room","Troia Castle Crystal room","Troia Castle Hospital","Troia Castle Room w/ 3 stairs","Troia Castle Hall to treasury","Troia Castle Room w/ random pots","Troia Castle Room w/ rubyring chests","Troia Castle Main treasury","Eblan 1F","Eblan 2F","Eblan Throne room","Eblan West tower 1F","Eblan West tower 2F","Eblan East tower 1F","Eblan East tower 2F","Eblan Basement","Baron Castle Black magic school","Baron Castle White magic school","Desert background","Training room","Waterfall","Castle water background","Misty cave","Mirror room background","Watery Pass background","Watery Pass 1F","Watery Pass 2F","Watery Pass 3F","Watery Pass 4F","Watery Pass 5F","Waterfall entrance","Waterfall 1F","Waterfall 2F","Antlion Cave 1F","Antlion Cave 2F","Antlion Cave Antlion's nest","Antlion Cave Save point room","Antlion Cave Treasure room w/ harp","Black background","Mist background","Mount Hobs West","Mount Hobs Summit","Mount Hobs East","Mount Hobs Save point floor","Mountain background","Watery Pass Room behind waterfall","Mount Ordeals 1F","Mount Ordeals 2F","Mount Ordeals 3F","Mount Ordeals Summit","Mysidia Crystal room","Mysidia Devil's Road","Baron Castle Collapsing hallway","Agart Well","Cave Magnes 1F","Cave Magnes 2F","Cave Magnes Treasure room w/ pit","Cave Magnes 3F","Cave Magnes Treasure room w/ torch","Cave Magnes 4F","Cave Magnes Save point room","Cave Magnes 5F","Cave Magnes Crystal room","Cave Magnes background","Watery Pass campsite","Baron Devil's Road","Tower of Zot 1F","Tower of Zot 2F","Tower of Zot 3F","Pitch black room","Tower of Zot 4F","Tower of Zot 5F","Tower of Zot 6F","Tower of Zot Command center","Adamant Grotto","Cave Magnes Save point room","Tower of Zot Save point room","Cid's Airship - Giant sequence","Twins' Airship - Giant sequence","Edward's Airship - Giant sequence","Tower of Babil Save point room","Tower of Babil B1","Tower of Babil B2","Tower of Babil B3","Tower of Babil B4","Tower of Babil Crystal room","Tower of Babil B5","Scrolling mountains - Cid falling?","Underground tunnel background","Crystal room background","Ending - Cecil's room","Training room Main floor","Training room Upstairs","-Glitch world-","-Glitch world-","Giant of Babil Mouth","Giant of Babil Neck","Giant of Babil Chest","-Glitch world-","Giant of Babil Stomach","Giant of Babil Passage","-Glitch world-","Giant of Babil Lung","Giant of Babil CPU","Giant of Babil background","-Glitch world-","Moving airship with soldiers","Fabul port","Boat sailing","Airship docked","Joined airships","Empty airship","Airship flying over underworld","Cave Eblan entrance","Cave Eblan Settlement","Cave Eblan pass to Babil","Cave Eblan exit","Cave Eblan Inn","Cave Eblan Equipment store","Cave Eblan Save point room","Cave Eblan Hospital","Fabul Chocobo forest","Empty airship","Mount Ordeals Chocobo forest","Baron Chocobo forest","Troia Chocobo forest","Island Chocobo forest","Baron Empty throne room","Empty airship w/ black bg","Empty airship","Empty airship underground","Empty airship w/ black bg","Tower of Wishes - final battle","Airship background","Large dock","-Glitch world-","-Glitch world-","Small dock","Mist Inn","Mist Weapons","Mist Armor","Kaipo Weapons","Kaipo Armor","Mysidia Weapons","Mysidia Armor","Mysidia Item store","Mythril Inn","Mythril Weapons","Mythril Armor","Mythril Items","Baron Items","Ending - Tower of Wishes","Ending - Palom and Leonora","Ending - Eblan throne room","Ending - Leviathan's room","Ending - Damcyan","Ending - Dwarf Castle","Ending - Mount Ordeals","Ending - Astro Tower","Ending - Cecil's room","Ending - Baron throne room","Ending - Fabul throne room","-Glitch world-","-Glitch world-","-Glitch world-","Overworld","Underworld","Moon surface","current map","Location trigger / VFX call","Smithy's house","Tomra","Smithy's house main floor","Smithy's house Smithy's room","Tomra Inn","Tomra Equipment store","Tomra Treasury","Dwarf Castle","Dwarf Castle Lobby","Dwarf Castle Throne room","Dwarf Castle Fat Chocobo room","Dwarf Castle Basement tunnel","Crystal room background","Dwarf Castle Crystal room","Dwarf Castle Equipment room","Dwarf Castle Basement w/ recovery pot","Dwarf Castle East tower 1F","Dwarf Castle Inn","Dwarf Castle Hospital","Dwarf Castle West tower 1F","Tower of Babil Save point","Tower of Babil Icebrand room","Tower of Babil Blizzard room","Tower of Babil Ice shield room","Tower of Babil Ice mail room","Dwarf Castle East tower 3F","Dwarf Castle West tower 3F","Dwarf Castle both towers 2F","Dwarf Castle background","Tower of Babil Floor w/ Lugae - 1","Tower of Babil Floor w/ Ice mail - 1","Tower of Babil Floor w/ Airship - 1","Dwarf Castle Cafe","Tower of Babil 1F","Tower of Babil 2F","Tower of Babil 3F","Tower of Babil 4F","Tower of Babil 5F","Tower of Babil Floor w/ airship - 2","Tower of Babil Floor w/ Ice mail - 2","Tower of Babil Floor w/ Lugae - 2","-Glitch world-","-Glitch world-","-Glitch world-","Lunar whale","Tower of Babil Cannon room","Dwarf tank","Lunar whale","Tower of Babil background","Ending - Palom and Leonora","Tomra Items","Tower of Wishes Top floor after Giant","Castle floor background","Town water background","Cave of Summons 1F","Cave of Summons 2F","Cave of Summons 3F","Sylvan Cave background","Feymarch 1F","Feymarch Treasury","Feymarch 2F","Feymarch House w/ save point","Feymarch Library 1F","Feymarch Library 2F","Feymarch Leviathan's room","Feymarch Weapons","Feymarch Armor","Feymarch Inn","Sealed Cave entrance","Sylvan Cave 1F","Sylvan Cave 2F","Sylvan Cave 3F","Sylvan Cave Treasury","Sylvan Cave Yang's room","Sealed Cave 1F","Sealed Cave Room w/ katana, ether","Sealed Cave 2F","Sealed Cave 3F","Sealed Cave Room w/ katana, ninja hat","Sealed Cave Room w/ ninja star, elixir","Sealed Cave Room w/ Light sword","Sealed Cave 4F","Sealed Cave 5F","Sealed Cave 6F","Sealed Cave Room w/ many boxes","Sealed Cave 7F","Sealed Cave Save point room","Sealed Cave Room w/ Demon Wall","Sealed Cave Empty room","Sealed Cave Crystal room","Bahamut's Cave 1F","Bahamut's Cave 2F","Bahamut's Cave Bahamut's floor","-Glitch world-","-Glitch world-","-Glitch world-","Lunar Palace Lobby","Lunar Palace Crystal room","Lunar background","First lunar passage","Second lunar passage","Hummingway land","Lunar's Lair background","Lunar Subterran 1F","Lunar Subterran 2F","Lunar Subterran 3F","Lunar Subterran 4F","Lunar Subterran 5F","Lunar Subterran 6F","Lunar Subterran 7F","Lunar Core 1F","Lunar Core 2F","Lunar Core 3F","Lunar Core 4F","Lunar Core Zemus' room","Lunar Subterran Room w/elixir","Lunar Subterran Tunnel w/ 2 Cure3s","Lunar Subterran Tunnel w/ Protect ring","Lunar Subterran Tunnel w/ White robe","Lunar Subterran Pinkpuff room","Lunar Subterran Save point near Ragnarok","Lunar Subterran Tunnel w/ Minerva","Lunar Subterran Room w/ Holy lance","Lunar Subterran Save point room","Lunar Subterran Room w/ Ribbons","Lunar Core background","-Glitch world-","-Glitch world-"}
idToArea={3,4,5,6,7,9,7,7,7,7,1,1,1,1,3,4,4,4,5,5,22,5,5,7,7,7,33,7,7,9,9,9,13,33,33,2,10,11,8,12,33,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,10,10,10,10,10,1,9,9,11,11,11,11,11,11,11,11,11,11,11,11,3,19,8,8,8,8,8,8,8,8,8,12,12,12,12,12,12,12,12,2,2,33,33,19,33,18,33,33,19,19,19,19,19,19,19,19,20,20,20,20,20,33,33,21,21,21,21,33,19,22,22,22,22,5,5,2,9,23,23,23,23,23,23,23,23,23,23,19,1,24,24,24,33,24,24,24,24,25,23,24,33,33,33,25,25,25,25,25,25,25,33,33,33,33,33,33,33,33,29,29,29,33,29,29,33,29,29,29,29,33,33,33,33,33,33,26,25,25,25,25,25,25,25,25,13,33,13,13,13,13,2,33,33,33,33,33,33,33,33,33,33,3,3,3,4,4,5,5,5,6,6,6,6,1,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,14,15,14,14,15,15,15,16,16,16,16,16,33,16,16,16,16,16,16,16,26,26,26,26,26,16,16,16,33,26,26,26,16,26,26,26,26,26,26,26,26,33,33,33,33,26,33,31,33,33,15,5,33,33,17,17,17,33,17,17,17,17,17,17,17,17,17,17,28,27,27,27,27,27,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,30,30,30,33,33,33,30,30,33,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,32,30,30,30,30,30,30,30,30,30,30,33,33,33}
idToArea[0]=1
iToC={"Kain","Rydia","Tellah","Edward","Rosa","Yang","Palom","Porom","Cecil","Cid","Rydia","Edge","FuSoYa","Various","Golbez"}
iToC[0]="Cecil"
BossFormations={[224]=1,[432]=2,[430]=3,[228]=4,[423]=5,[434]=6,[231]=7,[256]=8,[509]=9,[222]=10,[433]=11,[431]=12,[438]=14,[250]=15,[229]=16,[242]=17,[426]=18,[429]=19,[425]=20,[232]=21,[226]=22,[227]=23,[246]=24,[225]=25,[223]=26,[428]=27,[237]=28,[506]=29,[507]=30,[510]=31,[427]=32,[234]=33,[239]=34,[508]=35,[439]=36,[479]=37,[394]=38,[200]=39,[194]=40,[348]=41,[349]=41,[350]=41,[351]=41}
FormationIDToBoss={"ANTLION",'ASURA','BAHAMUT','BAIGAN','CALBRENA','CPU','DARKELF','DARKIMP','DLUNAR','DMIST','ELEMENTS','EVILWALL','FABULGAUNTLET','GOLBEZ','GUARD','KAINAZZO','KARATE','KINGQUEEN','LEVIATAN','LUGAE','MAGUS','MILON','MILONZ','MIRRORCECIL','MOMBOMB','OCTOMAMM','ODIN','OFFICER','OGOPOGO','PALEDIM','PLAGUE','RUBICANT','VALVALIS','WATERHAG','WYVERN','ZEROMUS','Egg','Ryus','Dmachine','MacGiant','TrapDoors','Misc'}

currentArea,currentID,Transitions,KIBinary,currentCoords,Steps,TilesFlown = 2,0,0,0,0,0,0
AreaString,DetailedString,FramesString,FramesDetailed = {"2"},{"0"},{"0"},{"0"}

areas[-3],areas[-2],areas[-1],areas[-0]="DummyValue","OverworldMap","UndergroundMap","MoonSurface"

Baron={"Baron Town Areas",0,11,12,13,14,68,151,236}
BaronCastle={"Baron Castle Areas",36,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,102,103,138,213}
Mist={"Mist Areas",1,15,83,224,225,226}
Kaipo={"Kaipo Areas",2,16,17,18,227,228}
Mysidia={"Mysidia Areas",3,19,20,22,23,136,137,229,230,231,307}
Mythril={"Mythril Areas",4,232,233,234,235}
Troia={"Troia Areas",5,7,8,9,10,24,25,26,28,29}
TroiaCastle={"Troia Castle Areas",39,85,86,87,88,89,90,91,92,93}
Agart={"Agart Areas",6,30,31,32,69,70,139}
Damcyan={"Damcyan Areas",37,63,64,65,66,67}
Fabul={"Fabul Areas",38,71,72,73,74,75,76,77,78,79,80,81,82}
Eblan={"Eblan Areas",40,94,95,96,97,98,99,100,101}
Chocobo={"Chocobo Forests",33,207,209,210,211,212}

Smithy={"Smithy Areas",256,258,259}
Tomra={"Tomra Areas",257,260,261,262,306}
Dwarf={"Dwarf Castle Areas",263,264,265,266,267,269,270,271,272,273,274,275,281,282,283,288}
Feymarch={"Feymarch Areas",310,311,312,314,315,316,317,318,319,320,321,322,323}

MistCave={"Mist Cave",108}
WateryPass={"Watery Pass Areas",84,106,111,112,113,114,115,116,117,118,131,150}
Antlion={"Antlion Areas",119,120,121,122,123}
Hobbs={"Hobbs Areas",126,127,128,129}
Ordeals={"Ordeals Areas",21,132,133,134,135}
CaveMagnes={"Cave Magnes Areas",140,141,142,143,144,145,146,147,148,149,161}
Zot={"Zot Areas",152,153,154,156,157,158,159,162}

HookStuff={"Hook Stuff",160,166,167,168,169,170,171,172,199,200,201,202,203,204,205,206}

-- Need to check what is happening with 285-287, and 294-296, One of them belongs to hook route I think
Babil={"Babil Areas",198,276,277,278,279,280,285,286,287,289,290,291,292,293,294,295,296,301}
Sylph={"Sylph Areas",325,326,327,328,329}
SealedCave={"Sealed Cave Areas",324,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345}
Giant={"Giant Areas",181,182,183,185,186,188,189,190,191}
Moon={"Moon Areas",303,346,347,348,352,353,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,371,372,373,374,375,376,377,378,379,380}
Zeromus={"Zeromus",370}

Misc={"Misc",27,34,35,41,104,105,107,109,110,124,125,130,155,163,164,165,173,174,175,176,177,178,179,180,184,187,192,193,194,195,196,197,208,214,215,216,217,218,219,220,221,222,223,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,268,284,297,298,299,300,302,304,305,308,309,313,349,350,351,354,381,382,383}

Overworld={"Overworld",-3,Baron,BaronCastle,Mist,Kaipo,Mysidia,Mythril,Troia,TroiaCastle,Agart,Damcyan,Fabul,Eblan,Chocobo}
Underground={"Underground",-2,Smithy,Tomra,Dwarf,Feymarch}
MoonArea={"Moon",-1,Moon}
Dungeons={"Dungeons",-4,MistCave,WateryPass,Antlion,Hobbs,Ordeals,CaveMagnes,Zot,HookStuff,Babil,Sylph,SealedCave,Giant}

Shops={"Shops",7,8,9,10,12,16,32,69,70,75,76,203,204,225,226,227,228,229,230,231,233,234,235,236,258,261,270,273,306,321,322,323,357}

for i=0, 1 do
	LocationBinary[i]=0
end
for i=0, 16 do
	KIsToLocMap[i]=-1
end
for i=-1, 63 do
	BossBattles[i],BossTime[i],LocTimes[i],LocToKisMap[i],BossParty[i],LocParty[i]=0,0,0,-1,"",""
end

for i=-4, 80000 do
	area_battles[i],area_frames[i],area_menus[i]=0,0,0
end

function compare(x, y)
    return x[1] < y[1]
end

local function printChars()
	local str={}
	local stri=""
	for i=0,4 do 
		local temp=memory.readdword(0x7E1000+0x40*i)
		if(bit.band(temp,0x1f) ~= 0) then
			table.insert(str,{bit.band(bit.rshift(temp,8),0x0f), bit.band(bit.rshift(temp,16),0xff)})
		end
	end
	table.sort(str,compare)
	stri=iToC[str[1][1]] .. ":" .. str[1][2]
	for i = 2,#str do
		stri=stri .. "," .. iToC[str[i][1]] .. ":" .. str[i][2]
	end
	return stri
end

local function checkKIs()
	local LocB,LocNb,KiB,KINb=0;
	local words= {}
	for i=0, 1 do
		words[i]=memory.readdword(0x7E1514 + 4*i)
	end
	for i=0, 1 do
		LocB=words[i]
		LocNb=bit.bnot(LocationBinary[i])
		LocNb=bit.band(LocNb,LocB)
		for j=0,31 do
			if(bit.band(LocNb,bit.lshift(1,j)) ~= 0) then
				LocationBinary[i]=bit.bor(LocationBinary[i],bit.lshift(1,j))
				LocTimes[32*i+j]=emu.framecount()-startTime
				LocParty[32*i+j]=printChars()
				KiB=bit.band(memory.readdword(0x7E1500),0x1FFFF)
				tcp:send(string.format("{\"KI\": %d,\"Loc1\": %d,\"Loc2\": %d}\n",KiB,words[0],words[1]))
				KINb=bit.bnot(KIBinary)
				KINb=bit.band(KINb,KiB)
				for l=0,17 do
					if(bit.band(KINb,bit.lshift(1,l)) ~= 0) then
						KIBinary=bit.bor(KIBinary,bit.lshift(1,l))
						LocToKisMap[32*i+j]=l
						KIsToLocMap[l]=32*i+j
						table.insert(DetailedString, string.format("KI:%d",l))
						table.insert(FramesDetailed, string.format("%d",(emu.framecount()-startTime)/60))
					end
				end
			end
		end
	end
end

function file_exists(name) --https://stackoverflow.com/questions/4990990/check-if-a-file-exists-with-lua
   local f=io.open(name,"r")
   if f~=nil then io.close(f) return true else return false end
end

local function countTreasure()
	local tres,mem=0,0
	for i=0,15 do
		mem=memory.readdword(0x7E12A0+4*i)
		for j=0,31 do
			if(bit.band(mem,bit.lshift(1,j)) ~= 0) then
				tres=tres+1
			end
		end
	end
	return tres
end


local function FormatTime(t)
	return string.format("\"minutes\":%d,\n\"seconds\":%d\n",t/3600,(t%3600)/60)
end
	
local function myframe()
	local menu = memory.readbyte(0x7E0500)
	if(started) then
		local temp = memory.readdword(0x7E1700)
		local area = bit.band(temp,0xFF)
		local mapID = bit.band(temp,0xFF00) + bit.rshift(bit.band(temp,0xFF0000),16)
		local battle = memory.readbyte(0x7E0201)
		temp = memory.readdword(0x7E1704)
		local coords = bit.band(temp,0xFFFF0000)
		local f = bit.band(temp,0xFF)
		
		if area == 0 then
		  mapID = -3
		end
		if area == 1 then
			mapID = -2
		end
		if area == 2 then
			mapID = -1
		end
		area_frames[mapID] = area_frames[mapID] + 1
		if battle ~= 0x85 then
			area_battles[mapID] = area_battles[mapID] + 1
			local formID = memory.readword(0x7e1800)
			if memory.readbyte(0x7e1628) ~= 0 then
				BossBattles[13]=BossBattles[13]+1
			elseif(BossFormations[formID] ~= nil) then
				BossBattles[BossFormations[formID]]=BossBattles[BossFormations[formID]]+1
			else
				BossBattles[42]=BossBattles[42]+1
			end
			if not Battle then
				Battle=true
				if memory.readbyte(0x7e1628) ~= 0 then
					BossParty[13]=printChars()
					BossTime[13]=emu.framecount()-startTime
				elseif(BossFormations[formID] ~= nil) then
					BossParty[BossFormations[formID]]=printChars()
					BossTime[BossFormations[formID]]=emu.framecount()-startTime
				else
					BossParty[42]=printChars()
					BossTime[42]=emu.framecount()-startTime
				end
				table.insert(DetailedString, string.format("B"))
				table.insert(FramesDetailed, string.format("%d",(emu.framecount()-startTime)/60))
			end
		elseif menu == 170 then
			area_menus[mapID] = area_menus[mapID] + 1
			if not Menu then
				Menu=true
				table.insert(DetailedString, string.format("M"))
				table.insert(FramesDetailed, string.format("%d",(emu.framecount()-startTime)/60))
			end
		elseif (coords~=currentCoords)then
			Battle=false
			Menu=false
			currentCoords=coords
			if f>0 then
				TilesFlown=TilesFlown+1
			else
				Steps=Steps+1
			end
			if currentID~=mapID then
				Transitions=Transitions+1
				currentID=mapID
				table.insert(DetailedString, string.format("%d",mapID))
				table.insert(FramesDetailed, string.format("%d",(emu.framecount()-startTime)/60))
				if mapID>=0 and idToArea[mapID]~= currentArea then
					currentArea=idToArea[mapID]
					table.insert(AreaString,string.format("%d",currentArea))
					table.insert(FramesString,string.format("%d",(emu.framecount()-startTime)/60))
				end
			end
		else
			Battle=false
			Menu=false
			checkKIs()
		end
	else
		gui.text(70,6, "paused")
		if not (menu == 170) then
			started=true
			treasures=countTreasure()
			lagcount=emu.lagcount()
			startTime=emu.framecount()
		end
	end
end

local function metaData()
	local numBytes=memory.readdword(0x3FF000)
	local str = ""
	for i=1,numBytes-2 do
		str = str .. string.char(memory.readbyte(0x3FF004+i))
	end
	return string.format("\"metadata\": {%s}",str)
end


local function FormatKILoc()
	io.write(string.format("\"KI Locations\": [\n"))
	for i=0,58 do
		io.write(string.format("{\n\"name\": \"%s\",\n",LocNames[i+1]))
		io.write(string.format("\"KI Obtained\": \"%s\",\n",KIsNames[LocToKisMap[i]+1]))
		io.write(string.format("\"time\": {\n%s},\n",FormatTime(LocTimes[i])))
		io.write(string.format("\"party\": \"%s\"\n},\n",LocParty[i]))
		
	end
	io.write(string.format("{\n\"name\": \"%s\",\n",LocNames[62]))
	io.write(string.format("\"KI Obtained\": \"%s\",\n",KIsNames[LocToKisMap[61]+1]))
	io.write(string.format("\"time\": {\n%s},\n\n",FormatTime(LocTimes[61])))
	io.write(string.format("\"party\": \"%s\"\n},\n",LocParty[61]))
	
	
	io.write(string.format("{\n\"name\": \"%s\",\n", "Seed Complete"))
	io.write(string.format("\"KI Obtained\": \"%s\",\n", "Victory"))
	io.write(string.format("\"time\": {\n%s},\n\n",FormatTime(emu.framecount()-startTime)))
	io.write(string.format("\"party\": \"%s\"\n}\n],\n",printChars()))
end

local function FormatKI()
	io.write(string.format("\"KIs\": [\n"))
	for i=0,15 do
		io.write(string.format("{\n\"name\": \"%s\",\n",KIsNames[i+1]))
		io.write(string.format("\"Location Found\": \"%s\",\n",LocNames[KIsToLocMap[i]+1]))
		io.write(string.format("\"time\": {\n%s}\n},",FormatTime(LocTimes[KIsToLocMap[i]])))
		
	end
	io.write(string.format("{\n\"name\": \"%s\",\n",KIsNames[17]))
	io.write(string.format("\"Location Found\": \"%s\",\n",LocNames[KIsToLocMap[16]+1]))
	io.write(string.format("\"time\": {\n%s}\n}\n],\n",FormatTime(LocTimes[KIsToLocMap[16]])))
end

local function printBoss()
	io.write(string.format("\"Fights\": [\n"))
	for i=1,41 do
		io.write(string.format("{\n\"name\": \"%s\",\n",FormationIDToBoss[i]))
		io.write(string.format("\"party\": \"%s\",\n",BossParty[i]))
		io.write(string.format("\"FightStart\": {\n%s},",FormatTime(BossBattles[i])))
		io.write(string.format("\"time\": {\n%s}\n},",FormatTime(BossBattles[i])))
		
	end
	io.write(string.format("{\n\"name\": \"%s\",\n",FormationIDToBoss[42]))
	io.write(string.format("\"party\": \"%s\",\n",BossParty[42]))
	io.write(string.format("\"FightStart\": {\n%s},",FormatTime(BossBattles[42])))
	io.write(string.format("\"time\": {\n%s}\n}\n],\n",FormatTime(BossBattles[42])))
end

local function ShopTimes(mylist)
	local i,timem,index=2,0,0
	while mylist[i] do
		index=mylist[i]
		timem=timem+area_menus[index]
		i=i+1
	end
	io.write(string.format("\"ShopTime\": {\n%s},\n",FormatTime(timem)))
	return timem
end

local function FormatBottom(mylist)
	local i,timet,timeb,timem,index=2,0,0,0,0
	io.write(string.format("{\n\"name\": \"%s\",\n",mylist[1]))
	io.write(string.format("\"child-areas\": [\n"))
	while mylist[i] do
		index=mylist[i]
		io.write(string.format("{\n\"name\": \"%s\",\n",areas[index+1]))
		io.write(string.format("\"time\": {\n%s},\n",FormatTime(area_frames[index])))
		io.write(string.format("\"menu\": {\n%s},\n",FormatTime(area_menus[index])))
		io.write(string.format("\"battle\": {\n%s}\n}",FormatTime(area_battles[index])))
		timet=timet+area_frames[index]
		timeb=timeb+area_battles[index]
		timem=timem+area_menus[index]
		i=i+1
		if(mylist[i]) then
			io.write(",\n")
		else
			io.write("\n")
		end
	end
	io.write(string.format("],\n\"time\": {\n%s},\n",FormatTime(timet)))
	io.write(string.format("\"menu\": {\n%s},\n",FormatTime(timem)))
	io.write(string.format("\"battle\": {\n%s}\n}\n",FormatTime(timeb)))
	return timet,timeb,timem
end

local function FormatTop(mylist)
	local i,timet,timeb,timem,temp1,temp2,temp3,index=3,0,0,0,0,0,0,0
	io.write(string.format("\"%s\": {\n\"child-areas\":[\n{\n",mylist[1]))
	io.write(string.format("\"name\": \"%s\",\n",areas[mylist[2]+1]))
	io.write(string.format("\"time\": {\n%s},\n",FormatTime(area_frames[mylist[2]])))
	io.write(string.format("\"menu\": {\n%s},\n",FormatTime(area_menus[mylist[2]])))
	io.write(string.format("\"battle\": {\n%s}\n},\n",FormatTime(area_battles[mylist[2]])))
	timet=timet+area_frames[mylist[2]]
	timeb=timeb+area_battles[mylist[2]]
	timem=timem+area_menus[mylist[2]]
	while mylist[i] do
		temp1,temp2,temp3 = FormatBottom(mylist[i])
		timet=timet+temp1
		timeb=timeb+temp2
		timem=timem+temp3
		i=i+1
		if(mylist[i]) then
			io.write(",\n")
		else
			io.write("\n")
		end
	end
	io.write(string.format("\n],\n\"time\": {\n%s},\n",FormatTime(timet)))
	io.write(string.format("\"menu\": {\n%s},\n",FormatTime(timem)))
	io.write(string.format("\"battle\": {\n%s}\n},\n",FormatTime(timeb)))
	return timet,timeb,timem
end


local function myexit()
	if(Exited) then
		return
	else
		i=0
		repeat
			i=i+1
			s=string.format("frames%s.json",i)
		until( not file_exists(s) )
		file = io.open(s, "a")
		local timet,timeb,timem,temp1,temp2,temp3,index=0,0,0,0,0,0,0
		io.output(file)
		io.write("{\n")
		timet,timeb,timem=FormatTop(Overworld)
		temp1,temp2,temp3=FormatTop(Underground)
		timet,timeb,timem=timet+temp1,timeb+temp2,timem+temp3
		temp1,temp2,temp3=FormatTop(Dungeons)
		timet,timeb,timem=timet+temp1,timeb+temp2,timem+temp3
		temp1,temp2,temp3=FormatTop(MoonArea)
		timet,timeb,timem=timet+temp1,timeb+temp2,timem+temp3
		io.write(string.format("\"Zeromus\": "))
		temp1,temp2,temp3=FormatBottom(Zeromus)
		timet,timeb,timem=timet+temp1,timeb+temp2,timem+temp3
		io.write(string.format(",\n\"Misc\": "))
		temp1,temp2,temp3=FormatBottom(Misc)
		timet,timeb,timem=timet+temp1,timeb+temp2,timem+temp3
		lagcount=emu.lagcount()-lagcount
		io.write(string.format(",\n\"time\": {\n%s},\n",FormatTime(timet)))
		io.write(string.format("\"menu\": {\n%s},\n",FormatTime(timem)))
		io.write(string.format("\"battle\": {\n%s},\n",FormatTime(timeb)))
		io.write(string.format("\"Steps\": %d,\n",Steps))
		io.write(string.format("\"Fly\": %d,\n",TilesFlown))
		io.write(string.format("\"Transitions\": %d,\n",Transitions))
		io.write(string.format("\"Route\": \"%s\",\n", table.concat(AreaString, ",")))
		io.write(string.format("\"RouteTime\": \"%s\",\n",table.concat(FramesString, ",")))
		io.write(string.format("\"RouteDetailed\": \"%s\",\n",table.concat(DetailedString, ",")))
		io.write(string.format("\"RouteDetailedTime\": \"%s\",\n",table.concat(FramesDetailed, ",")))
		io.write(string.format("\"Treasures\": %d,\n",countTreasure()-treasures))
		ShopTimes(Shops)
		FormatKI()
		FormatKILoc()
		printBoss()
		io.write(string.format("\"lag frames\": {\n%s},\n",FormatTime(lagcount)))
		io.write(metaData().. "}")
		io.close(file)
		Exited=true
		print("Congrats, your run has been recorded")
		emu.registerbefore(nil)
		emu.registerexit(nil)
		memory.registerexec(0x03F591,1,nil)
	end
end

emu.registerbefore(myframe)
emu.registerexit(myexit)

tcp:send("{" .. metaData() .. "}\n")

memory.registerexec(0x03F591,1,myexit)

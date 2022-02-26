local socket = require("socket.core")

print("Attempting to connect to the AutoTracking Service")
tcp=socket.tcp()
if(tcp:connect('127.0.0.1',54321)) then
	print("Succesfully connected")
else
	print("Connection failed, please start the AutoTracking Service and try again")
end
tcp:setoption('keepalive',true)

function compare(x, y)
    return x[1] < y[1]
end

local function printChars()
	local str={}
	local p=""
	for i=0,4 do 
		local temp=memory.readdword(0x7E1000+0x40*i)
		if(bit.band(temp,0x1f) ~= 0) then
			table.insert(str,{bit.band(bit.rshift(temp,8),0x0f), bit.band(bit.rshift(temp,16),0xff)})
		end
	end
	table.sort(str,compare)
	if(str[1] == nil ) then
		return
	end
	p=str[1][1]
	for i = 2,#str do
		p=p .. "," .. str[i][1]
	end
	tcp:send("{ \"P\": \"" .. p .. "\"}\n")
end

local function checkKIs()
	local lowLOC = memory.readdword(0x7E1514)
	local highLOC = memory.readdword(0x7E1518)
	local KI = bit.band(memory.readdword(0x7E1500),0x1FFFF)
	tcp:send(string.format("{\"KI\": %d,\"Loc1\": %d,\"Loc2\": %d}\n",KI,lowLOC,highLOC))
end

local function myframe()
	if emu.framecount()%300==0 then
		checkKIs()
	elseif (emu.framecount()+150)%300 == 0 then
		printChars()
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

local function myobjective(address,size)
	if(memory.readbyte(address) ~= 0) then
		memory.registerwrite(address,1,nil)
		tcp:send("{\"O\":" .. address-0x7e1520 .. "}\n")
	end
end

emu.registerbefore(myframe)

tcp:send("{" .. metaData() .. "}\n")

memory.registerwrite(0x7e1520,32,myobjective)

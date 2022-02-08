local socket = require("socket.core")

tcp=socket.tcp()
tcp:connect('127.0.0.1',54321)
tcp:setoption('keepalive',true)

local function checkKIs()
	local lowLOC = memory.readdword(0x7E1514)
	local highLOC = memory.readdword(0x7E1518)
	local KI = bit.band(memory.readdword(0x7E1500),0x1FFFF)
	tcp:send(string.format("{\"KI\": %d,\"Loc1\": %d,\"Loc2\": %d}\n",KI,lowLOC,highLOC))
end

local function myframe()
	if(emu.framecount() % 300 == 0) then
		checkKIs()
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

emu.registerbefore(myframe)
tcp:send("{" .. metaData() .. "}\n")
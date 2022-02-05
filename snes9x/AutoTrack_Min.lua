local socket = require("socket")

local server = assert(socket.bind("*", 54321))
local client = server:accept()

local function checkKIs()
	local lowLOC = memory.readdword(0x7E1514)
	local highLOC = memory.readdword(0x7E1518)
	local KI = bit.band(memory.readdword(0x7E1500),0x1FFFF)
	client:send(string.format("{\"KI\": %d,\"Loc1\": %d,\"Loc2\": %d}",KI,lowLOC,highLOC))
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
	return string.format("\"metadata\": {\n%s}\n",str)
end

emu.registerbefore(myframe)
client:send("{" .. metaData() .. "}")
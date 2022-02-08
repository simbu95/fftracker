memory.usememorydomain("CARTROM")

local socket = require("socket.core")

tcp=socket.tcp()
tcp:connect('127.0.0.1',54321)
tcp:setoption('keepalive',true)

local function checkKIs()
	local lowLOC = mainmemory.read_u32_le(0x7E1514)
	local highLOC = mainmemory.read_u32_le(0x7E1518)
	local KI = bit.band(mainmemory.read_u32_le(0x7E1500),0x1FFFF)
	tcp:send(string.format("{\"KI\": %d,\"Loc1\": %d,\"Loc2\": %d}\n",KI,lowLOC,highLOC))
end

local function myframe()
	if(emu.framecount() % 300 == 0) then
		checkKIs()
	end
end

local function metaData()
	local numBytes=memory.read_u32_le(0x1FF000)
	local str = ""
	for i=1,numBytes-2 do
		str = str .. string.char(memory.read_u8(0x1FF004+i))
	end
	return string.format("\"metadata\": {%s}",str)
end

tcp:send("{" .. metaData() .. "}\n")

while not Exited do
	myframe()
	emu.frameadvance()
end

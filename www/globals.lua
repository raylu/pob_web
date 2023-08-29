function unpack(t, i) -- from https://www.lua.org/pil/5.1.html
	i = i or 1
	if t[i] ~= nil then
		return t[i], unpack(t, i + 1)
	end
end

bit = {} -- from https://github.com/lua/lua/blob/master/testes/bitwise.lua
function bit.bnot (a)
	return ~a & 0xFFFFFFFF
end
function bit.band (x, y, z, ...)
	if not z then
		return ((x or -1) & (y or -1)) & 0xFFFFFFFF
	else
		local arg = {...}
		local res = x & y & z
		for i = 1, #arg do res = res & arg[i] end
		return res & 0xFFFFFFFF
	end
end
function bit.bor (x, y, z, ...)
	if not z then
		return ((x or 0) | (y or 0)) & 0xFFFFFFFF
	else
		local arg = {...}
		local res = x | y | z
		for i = 1, #arg do res = res | arg[i] end
		return res & 0xFFFFFFFF
	end
end
function bit.rshift(a, b)
	return ((a & 0xFFFFFFFF) >> b) & 0xFFFFFFFF
end

arg = {}

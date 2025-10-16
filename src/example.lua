--- Greeter "class-like" table documented with LDoc.
--- Since Lua has no native classes, we emulate with a table + metatable.
local Greeter = {}
Greeter.__index = Greeter

--- Constructor
--- @return Greeter
function Greeter:new()
  return setmetatable({}, self)
end

--- Method
function Greeter:greet()
  print("Hello from Lua")
end

-- Plain function
local function hello()
  print("Hello function in Lua")
end

return { Greeter = Greeter, hello = hello }

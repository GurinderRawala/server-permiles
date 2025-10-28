--- Greeter "class-like" table documented with LDoc.
--- Since Lua has no native classes, we emulate with a table + metatable.
local Greeter = {}
Greeter.__index = Greeter

--- Constructor
-- Creates a new Greeter instance.
-- The returned table has Greeter set as its metatable so Greeter methods are available.
-- Create a new Greeter instance.
-- @return A new Greeter instance.
function Greeter:new()
  return setmetatable({}, self)
end

-- Prints a greeting to standard output.
-- Prints a greeting message ("Hello from Lua") to standard output.
function Greeter:greet()
  print("Hello from Lua")
end

-- Prints "Hello function in Lua" to standard output as a simple greeting.
local function hello()
  print("Hello function in Lua")
end

return { Greeter = Greeter, hello = hello }
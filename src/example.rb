# Greeter is a test class with an RDoc-style comment for coverage.
class Greeter
  ##
  # Outputs a greeting message to standard output.
  # The message printed is "Hello from Ruby".
  def greet
    puts "Hello from Ruby"
  end
end

# A plain function (as a module method)
module Utils
  def self.hello
    puts "Hello function in Ruby"
  end
end

# Ruby “interfaces” aren’t native; protocols are duck-typed.
# You can simulate via documentation or abstract modules.
# Below is a documented expectation:
# IGreeter: expects `greet` method.
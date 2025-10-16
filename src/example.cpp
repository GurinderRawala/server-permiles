#include <iostream>

/**
 * IGreeter is an interface-like abstract base class.
 */
class IGreeter {
public:
  virtual ~IGreeter() = default;
  virtual void greet() const = 0;
};

/**
 * Greeter is a concrete class with a doc comment for coverage tests.
 */
class Greeter : public IGreeter {
public:
  void greet() const override { std::cout << "Hello from C++\n"; }
};

void greet() { std::cout << "Free function in C++\n"; }

#include <iostream>

/**
 * IGreeter is an interface-like abstract base class.
 */
class IGreeter {
public:
  /**
 * @brief Ensures derived-class destructors are invoked when deleting through an IGreeter pointer.
 */
virtual ~IGreeter() = default;
  virtual void greet() const = 0;
};

/**
 * Greeter is a concrete class with a doc comment for coverage tests.
 */
class Greeter : public IGreeter {
public:
  /**
 * @brief Prints a greeting message to standard output.
 *
 * Writes "Hello from C++" followed by a newline to std::cout.
 */
void greet() const override { std::cout << "Hello from C++\n"; }
};

/**
 * @brief Prints a greeting message to standard output.
 *
 * Outputs "Free function in C++" followed by a newline to stdout.
 */
void greet() { std::cout << "Free function in C++\n"; }
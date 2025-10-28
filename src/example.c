#include <stdio.h>

/** 
 * MyThing is a class-like struct used to test doc coverage in C.
 * Since C has no classes, we document the struct as our target.
 */
typedef struct MyThing {
  int value;
} MyThing;

/**
 * Prints "Hello from C" followed by a newline to standard output.
 */
void greet(void) {
  printf("Hello from C\n");
}
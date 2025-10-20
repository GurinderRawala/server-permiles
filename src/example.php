<?php
declare(strict_types=1);

/**
 * IGreeter is a PHP interface.
 */
interface IGreeter {
    /**
 * Outputs a greeting message.
 *
 * Implementations should emit a greeting to the output (for example, printing "Hello from PHP" followed by a newline).
 */
public function greet(): void;
}

/**
 * Greeter is a test class with a PHPDoc docblock.
 */
class Greeter implements IGreeter {
    /**
     * Prints a greeting message to standard output.
     */
    public function greet(): void {
        echo "Hello from PHP\n";
    }
}

/**
 * Outputs the greeting "Hello function in PHP" followed by a newline.
 */
function hello(): void {
    echo "Hello function in PHP\n";
}
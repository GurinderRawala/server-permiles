<?php
declare(strict_types=1);

/**
 * IGreeter is a PHP interface.
 */
interface IGreeter {
    public function greet(): void;
}

/**
 * Greeter is a test class with a PHPDoc docblock.
 */
class Greeter implements IGreeter {
    public function greet(): void {
        echo "Hello from PHP\n";
    }
}

// A plain function
function hello(): void {
    echo "Hello function in PHP\n";
}

using System;

/// <summary>
/// IGreeter is a simple interface for doc coverage tests.
/// </summary>
public interface IGreeter {
    /// <summary>
/// Writes a greeting message to the console.
/// <summary>
/// Writes a greeting message to the console.
/// </summary>
/// <remarks>
/// Implementations should output a greeting (for example, "Hello from C#") to standard output.
/// </remarks>
void Greet();
}

/// <summary>
/// Greeter is a test class; this XML doc should be picked up by ast-grep.
/// </summary>
public class Greeter : IGreeter {
    /// <summary>
/// Initializes a new instance of the <see cref="Greeter"/> class.
/// <summary>
/// Initializes a new instance of the Greeter class.
/// </summary>
public Greeter() {}
    /// <summary>
/// Writes a greeting message to the console.
/// <summary>
/// Writes "Hello from C#" to the console.
/// </summary>
public void Greet() => Console.WriteLine("Hello from C#");
}

// Function-equivalent (static method in a utility class)
public static class Utils {
    /// <summary>
/// Prints a static greeting message ("Static hello from C#") to the console.
/// <summary>
/// Writes a static greeting message ("Static hello from C#") to the console.
/// </summary>
public static void Hello() => Console.WriteLine("Static hello from C#");
}
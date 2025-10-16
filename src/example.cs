using System;

/// <summary>
/// IGreeter is a simple interface for doc coverage tests.
/// </summary>
public interface IGreeter {
    void Greet();
}

/// <summary>
/// Greeter is a test class; this XML doc should be picked up by ast-grep.
/// </summary>
public class Greeter : IGreeter {
    public Greeter() {}
    public void Greet() => Console.WriteLine("Hello from C#");
}

// Function-equivalent (static method in a utility class)
public static class Utils {
    public static void Hello() => Console.WriteLine("Static hello from C#");
}

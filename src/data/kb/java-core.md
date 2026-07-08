# Java Core

## Overview

Java is a statically typed, object-oriented, platform-independent programming language created by Sun Microsystems in 1995 and now maintained by Oracle. The JVM (Java Virtual Machine) compiles source code to bytecode, enabling the *write once, run anywhere* promise. Java SE 17 is the current LTS release, bringing records, sealed classes, pattern matching, and text blocks.

## Why Java Exists

The early 1990s saw fragmented runtime environments: C and C++ programs were compiled per platform. Java's solution was an intermediate bytecode layer executed by a JVM specific to each OS. Today Java powers enterprise backends, Android apps, data engineering pipelines, and cloud-native microservices.

## Core Concepts

### Object-Oriented Programming

Java enforces four OOP pillars:

- **Encapsulation** — fields are private; exposed via getters/setters.
- **Inheritance** — `extends` for classes, `implements` for interfaces.
- **Polymorphism** — method overriding (runtime) and overloading (compile-time).
- **Abstraction** — abstract classes and interfaces define contracts.

### The JVM

The JVM has three main sub-systems:

1. **Class Loader** — loads, links, and initialises `.class` files.
2. **Runtime Data Areas** — heap (objects), stack (frames), metaspace (class metadata), PC register, native method stack.
3. **Execution Engine** — interpreter + JIT compiler (HotSpot C1/C2), and the Garbage Collector.

### Garbage Collection

The heap is divided into:

- **Young Generation** (Eden + S0/S1 survivor spaces) — minor GC triggered here.
- **Old Generation** (Tenured) — major GC, more expensive.

Common collectors:
- **G1GC** — default since Java 9, region-based, predictable pause targets.
- **ZGC** — sub-millisecond pauses, scales to multi-terabyte heaps (Java 15+).
- **Shenandoah** — concurrent evacuation, low latency.

## Essential Terminology

| Term | Definition |
|---|---|
| JDK | Java Development Kit — compiler + JRE + tools |
| JRE | Java Runtime Environment — JVM + standard libraries |
| Bytecode | Platform-neutral intermediate representation (`.class`) |
| Autoboxing | Automatic conversion between primitives and wrappers |
| POJO | Plain Old Java Object — no framework dependency |
| SOLID | Five OOP design principles (Single Responsibility, Open/Closed, etc.) |

## Generics

Generics enable type-safe collections and algorithms. Type erasure means generic type information is removed at compile time — a `List<String>` and `List<Integer>` are both `List<Object>` at runtime.

```java
// Bounded type parameter
public <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}
```

Wildcards:
- `?` — unknown type
- `? extends T` — upper bound (covariance, read-only)
- `? super T` — lower bound (contravariance, write-only)

## Collections Framework

Key interfaces and their primary implementations:

| Interface | Ordered? | Duplicates? | Common Impl |
|---|---|---|---|
| `List` | Yes | Yes | `ArrayList`, `LinkedList` |
| `Set` | No | No | `HashSet`, `TreeSet`, `LinkedHashSet` |
| `Map` | No | Keys: No | `HashMap`, `TreeMap`, `LinkedHashMap` |
| `Queue` | FIFO | Yes | `LinkedList`, `PriorityQueue`, `ArrayDeque` |

**HashMap internals**: array of buckets, each bucket is a linked list (Java 7) or a balanced tree (Java 8+ when bucket size > 8). Load factor default 0.75, resize doubles the array.

## Functional Programming (Java 8+)

### Lambda Expressions

```java
// Before Java 8
Comparator<String> c = new Comparator<String>() {
    public int compare(String a, String b) { return a.compareTo(b); }
};

// Lambda
Comparator<String> c = (a, b) -> a.compareTo(b);

// Method reference
Comparator<String> c = String::compareTo;
```

### Streams API

```java
List<String> result = employees.stream()
    .filter(e -> e.getDepartment().equals("Engineering"))
    .sorted(Comparator.comparing(Employee::getSalary).reversed())
    .map(Employee::getName)
    .limit(10)
    .collect(Collectors.toList());
```

Terminal operations: `collect`, `forEach`, `reduce`, `count`, `findFirst`, `anyMatch`.
Intermediate operations (lazy): `filter`, `map`, `flatMap`, `sorted`, `distinct`, `limit`.

### Optional

```java
Optional<User> user = findById(id);
String name = user
    .map(User::getName)
    .orElse("Anonymous");
```

Never return `Optional` from fields or constructors — use it only as a method return type for potentially absent values.

## Concurrency

### Threads

```java
// Runnable
Thread t = new Thread(() -> System.out.println("running"));
t.start();

// ExecutorService
ExecutorService pool = Executors.newFixedThreadPool(4);
pool.submit(() -> doWork());
pool.shutdown();
```

### Synchronization

- `synchronized` keyword — mutex on object monitor.
- `volatile` — guarantees visibility (not atomicity).
- `java.util.concurrent.atomic` — lock-free atomic operations.
- `ReentrantLock` — explicit lock with `tryLock`, timeout, fairness.

### CompletableFuture

```java
CompletableFuture<String> future = CompletableFuture
    .supplyAsync(() -> fetchData())
    .thenApply(data -> transform(data))
    .exceptionally(ex -> "fallback");
```

## Java SE 17 Features

### Records

```java
public record Point(double x, double y) {}

// Compiler generates: constructor, getters, equals, hashCode, toString
Point p = new Point(3.0, 4.0);
System.out.println(p.x()); // 3.0
```

### Sealed Classes

```java
public sealed class Shape permits Circle, Rectangle, Triangle {}
public final class Circle extends Shape { ... }
public final class Rectangle extends Shape { ... }
```

Sealed classes restrict which classes can extend them — enables exhaustive pattern matching.

### Pattern Matching for instanceof

```java
// Old
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.toUpperCase());
}

// Java 16+
if (obj instanceof String s) {
    System.out.println(s.toUpperCase());
}
```

### Text Blocks

```java
String json = """
    {
        "name": "Oussama",
        "role": "Software Engineer"
    }
    """;
```

## Best Practices

- Prefer immutability — use `final`, records, and `Collections.unmodifiableList`.
- Program to interfaces, not implementations (`List` not `ArrayList`).
- Use `try-with-resources` for `AutoCloseable` resources.
- Always override `equals` and `hashCode` together.
- Avoid raw types — always parameterise generics.
- Use `Optional` to make nullable return types explicit.
- Prefer `Executors` over manual thread creation.
- Keep methods short and focused (single responsibility).

## Common Mistakes

- Mutating objects passed to a `HashMap` key after insertion (violates `hashCode` contract).
- Calling `==` on `String` objects instead of `.equals()`.
- Catching `Exception` and swallowing it silently.
- `NullPointerException` from calling methods on `Optional` without `isPresent` check (use `map`/`orElse` instead).
- Thread-unsafe `SimpleDateFormat` — use `DateTimeFormatter` instead.
- Integer overflow when using `int` arithmetic — switch to `long` or `BigInteger`.

## Interview Questions

**Q: What is the difference between `==` and `.equals()`?**
`==` compares object references (memory addresses). `.equals()` compares object content using the defined implementation. For strings, `"abc" == "abc"` may be `true` due to string interning, but this is unreliable — always use `.equals()`.

**Q: Explain the Java memory model.**
The JVM memory model defines how threads interact through memory. Each thread has its own stack, but all threads share the heap. The `volatile` keyword ensures that writes to a variable are immediately visible to other threads. `synchronized` blocks provide mutual exclusion and establish a *happens-before* relationship.

**Q: What is the difference between `ArrayList` and `LinkedList`?**
`ArrayList` is backed by an array — O(1) random access, O(n) insertion/deletion in the middle. `LinkedList` is a doubly-linked list — O(n) random access, O(1) insertion/deletion at known positions. Use `ArrayList` for most scenarios; `LinkedList` when you frequently insert/remove at the head.

**Q: What are the SOLID principles?**
- **S**ingle Responsibility — a class has one reason to change.
- **O**pen/Closed — open for extension, closed for modification.
- **L**iskov Substitution — subtypes must be substitutable for their base type.
- **I**nterface Segregation — prefer many specific interfaces over one general one.
- **D**ependency Inversion — depend on abstractions, not concretions.

**Q: What is the difference between checked and unchecked exceptions?**
Checked exceptions (e.g., `IOException`) must be declared in the method signature or caught. Unchecked exceptions (subclasses of `RuntimeException`) do not require declaration. Use checked exceptions for recoverable conditions, unchecked for programming errors.

**Q: How does `HashMap` handle collisions?**
Java 8+ uses chaining: each bucket holds a linked list. When bucket size exceeds 8 and the table is large enough, it converts to a red-black tree (O(log n) instead of O(n) worst case). It converts back to a list when bucket size drops below 6.

## Cheat Sheet

```
// Primitives
byte(8) | short(16) | int(32) | long(64) | float(32) | double(64) | char(16) | boolean

// String methods
s.length()  s.charAt(i)  s.substring(start,end)  s.indexOf(c)
s.toUpperCase()  s.trim()  s.split(regex)  s.replace(old,new)
String.format("%s has %d items", name, count)

// Collections quick create
List.of(1,2,3)          // immutable
Map.of("k1",1,"k2",2)  // immutable
new ArrayList<>(List.of(1,2,3))  // mutable copy

// Stream pipeline
stream.filter(pred).map(fn).sorted().distinct().limit(n).collect(Collectors.toList())

// Concurrency
synchronized(lock) { ... }
volatile int counter;
AtomicInteger ai = new AtomicInteger(0); ai.incrementAndGet();
```

## Certification Coverage

This document covers the core topics for:

- **Oracle Certified Professional: Java SE 17 Developer (1Z0-829)** — all OCP objectives including modules, records, sealed classes, pattern matching, streams, concurrency, and I/O.

### My Preparation Strategy

I studied for approximately **three months**, combining the following resources:

1. **Selikoff & Boyarsky** — *OCP Oracle Certified Professional Java SE 17 Study Guide* — the most complete exam prep book available.
2. **Enthuware mock exams** — the closest simulation to the real exam difficulty and style.
3. **Personal coding drills** — wrote small programs for every tricky concept (generics wildcards, diamond problem, concurrency).

The hardest topics were: **switch expressions with arrow labels**, **instanceof pattern matching in complex conditions**, **module-info declarations**, and the **concurrency executor API** edge cases.

**Exam tips:**
- Read every answer carefully — the OCP regularly tricks with subtle compile-time vs runtime distinction.
- Know exactly what compiles vs what throws at runtime.
- Time yourself on practice exams — 90 questions in 180 minutes is tight.
- Memorise which methods exist on `Optional` vs `Stream` — they overlap but differ.

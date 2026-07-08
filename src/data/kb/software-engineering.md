# Software Engineering

## Overview

Covers software engineering principles, SDLC methodologies, design patterns, clean code, and testing — based on the HKUST Software Engineering Specialization and HackerRank Certified Software Engineer.

---

## SDLC Models

| Model | Description | Best For |
|---|---|---|
| **Waterfall** | Sequential phases, no going back | Fixed requirements |
| **Agile** | Iterative sprints, adaptive | Evolving requirements |
| **Scrum** | Agile framework with sprints, ceremonies | Product development |
| **Kanban** | Continuous flow, WIP limits | Operations/support |
| **DevOps** | Dev + Ops + CI/CD pipeline | Cloud-native teams |

---

## Design Patterns

### Creational

- **Singleton** — one instance globally (e.g., Logger, Config).
- **Factory Method** — delegate instantiation to subclasses.
- **Builder** — step-by-step construction of complex objects.

### Structural

- **Adapter** — bridge incompatible interfaces.
- **Decorator** — add behaviour without modifying class.
- **Proxy** — control access to an object.

### Behavioural

- **Observer** — subscribe/notify pattern (event systems).
- **Strategy** — swap algorithms at runtime.
- **Command** — encapsulate a request as an object.

---

## SOLID Principles

| Letter | Principle |
|---|---|
| **S** | Single Responsibility — one reason to change |
| **O** | Open/Closed — open for extension, closed for modification |
| **L** | Liskov Substitution — subtypes replaceable for base type |
| **I** | Interface Segregation — prefer specific interfaces |
| **D** | Dependency Inversion — depend on abstractions |

---

## Clean Code

- Meaningful names — `getUserById` not `getU`.
- Small functions — do one thing, do it well.
- No magic numbers — use named constants.
- DRY — Don't Repeat Yourself.
- YAGNI — You Aren't Gonna Need It (no speculative features).
- Comments explain *why*, not *what* (code should be self-explanatory).

---

## Testing

| Type | Scope | Tool |
|---|---|---|
| Unit | Single function/class | JUnit, Vitest, pytest |
| Integration | Multiple components | Spring Boot Test, Testcontainers |
| E2E | Full user flow | Cypress, Playwright |
| Performance | Load and stress | JMeter, Gatling |

**Test pyramid:** Many unit tests → fewer integration tests → fewer E2E tests.

**TDD (Test-Driven Development):**
1. Write a failing test (Red)
2. Write minimum code to pass (Green)
3. Refactor (Refactor)

---

## Version Control & Code Review

- Small, focused commits with descriptive messages.
- Feature branches + Pull Requests for all changes.
- Code review checklist: correctness, readability, security, tests, performance.
- Semantic versioning: `MAJOR.MINOR.PATCH`.

---

## Cheat Sheet

```
SOLID: SRP | OCP | LSP | ISP | DIP
Patterns: Singleton | Factory | Builder | Observer | Strategy | Decorator
Testing: Unit → Integration → E2E (pyramid)
Clean code: Meaningful names | Small functions | DRY | YAGNI
```

# Spring Boot

## Overview

Spring Boot is an opinionated extension of the Spring Framework that eliminates boilerplate configuration through auto-configuration, embedded servers, and starter dependencies. A production-ready REST API can be running in minutes with no XML configuration.

**Current version:** Spring Boot 3.x (requires Java 17+)

---

## Why Spring Boot Exists

The original Spring Framework required extensive XML configuration and manual wiring of components. Spring Boot applies the *convention over configuration* principle: sensible defaults are applied automatically based on what is on the classpath, overridable when needed.

---

## Core Concepts

### Auto-Configuration

Spring Boot scans the classpath and conditionally creates beans. For example, if `spring-data-jpa` and a database driver are present, it configures a `DataSource`, `EntityManagerFactory`, and `TransactionManager` automatically.

```java
@SpringBootApplication  // = @Configuration + @EnableAutoConfiguration + @ComponentScan
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

### Starter Dependencies

Starters are curated dependency bundles:

| Starter | Includes |
|---|---|
| `spring-boot-starter-web` | Spring MVC, Jackson, Tomcat |
| `spring-boot-starter-data-jpa` | Hibernate, Spring Data JPA |
| `spring-boot-starter-security` | Spring Security |
| `spring-boot-starter-test` | JUnit 5, Mockito, AssertJ |
| `spring-boot-starter-actuator` | Health, metrics, info endpoints |

### Application Properties

```yaml
# application.yml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    username: ${DB_USER}
    password: ${DB_PASS}
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
```

---

## Building REST APIs

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public Page<UserDto> list(@PageableDefault(size = 20) Pageable pageable) {
        return userService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> get(@PathVariable Long id) {
        return userService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto create(@Valid @RequestBody CreateUserRequest request) {
        return userService.create(request);
    }
}
```

### Global Exception Handling

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(EntityNotFoundException ex) {
        return ResponseEntity.status(404)
            .body(new ErrorResponse("NOT_FOUND", ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
            .map(e -> e.getField() + ": " + e.getDefaultMessage())
            .collect(Collectors.joining(", "));
        return ResponseEntity.badRequest().body(new ErrorResponse("VALIDATION_ERROR", message));
    }
}
```

---

## Data Layer with Spring Data JPA

```java
@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String name;

    // Auditing
    @CreatedDate
    private Instant createdAt;
}

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.name LIKE %:name%")
    List<User> searchByName(@Param("name") String name);
}
```

---

## Spring Security

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(s -> s.sessionCreationPolicy(STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}
```

---

## Actuator & Observability

Spring Boot Actuator exposes management endpoints:

- `/actuator/health` — liveness and readiness probes.
- `/actuator/metrics` — JVM, HTTP, DB connection pool metrics.
- `/actuator/info` — application build info.
- `/actuator/env` — resolved configuration properties.

Integrate with Micrometer + Prometheus + Grafana for production observability.

---

## Best Practices

- Use constructor injection — not field injection (`@Autowired` on fields).
- Validate all inputs with Bean Validation (`@Valid`, `@NotNull`, `@Size`).
- Never expose JPA entities directly in API responses — use DTOs.
- Use database migrations (Flyway or Liquibase) — never `ddl-auto: create`.
- Externalise all secrets via environment variables or AWS Secrets Manager.
- Write integration tests with `@SpringBootTest` and Testcontainers.

---

## Common Mistakes

- Using `ddl-auto: create-drop` in production — deletes your database on restart.
- Returning raw `List` from controllers with no pagination — causes OOM on large tables.
- Ignoring `LazyInitializationException` by setting `enable_lazy_load_no_trans=true` — use proper fetch strategies.
- Hardcoding credentials in `application.properties`.

---

## Interview Questions

**Q: What is the difference between `@Component`, `@Service`, `@Repository`, and `@Controller`?**  
All are specialisations of `@Component` and trigger component scanning. `@Repository` adds exception translation. `@Service` signals business logic. `@Controller`/`@RestController` mark MVC controllers. Semantically meaningful for readability and AOP.

**Q: How does Spring Boot auto-configuration work?**  
`@EnableAutoConfiguration` imports `AutoConfigurationImportSelector`, which reads `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`. Each listed class uses `@ConditionalOn*` annotations (e.g., `@ConditionalOnClass`, `@ConditionalOnMissingBean`) to decide whether to apply.

**Q: How do you handle transactions in Spring?**  
Add `@Transactional` on service methods. Spring creates a proxy that opens a transaction before the method and commits or rolls back on completion. Default rollback is on `RuntimeException`. Use `rollbackFor = Exception.class` to also rollback on checked exceptions.

---

## Cheat Sheet

```
@SpringBootApplication     Entry point
@RestController            JSON-returning controller
@GetMapping / @PostMapping HTTP method mappings
@PathVariable / @RequestParam / @RequestBody  Parameter binding
@Valid                     Trigger Bean Validation
@Transactional             Wrap in DB transaction
@Value("${prop}")          Inject config value
@ConfigurationProperties   Type-safe config binding
@SpringBootTest            Full-context integration test
@DataJpaTest               JPA slice test
@WebMvcTest                MVC slice test
```

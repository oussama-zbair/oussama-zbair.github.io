# Building Scalable Microservices with Spring Boot and Docker

Microservices architecture has revolutionized how we build and deploy applications. In this comprehensive guide, we'll explore how to create scalable microservices using Spring Boot and Docker, covering everything from basic setup to production deployment strategies.

## Why Microservices Matter

The shift from monolithic to microservices architecture isn't just a trend—it's a fundamental change in how we approach software design. Microservices offer several compelling advantages:

**Scalability**: Scale individual services based on demand rather than scaling the entire application. If your user service is under heavy load but your payment service isn't, you can scale just the user service.

**Technology Diversity**: Different services can use different technologies. Your recommendation engine might use Python and TensorFlow, while your user management service uses Java and Spring Boot.

**Fault Isolation**: When one service fails, it doesn't bring down the entire system. Proper circuit breakers and fallback mechanisms ensure system resilience.

**Team Independence**: Different teams can work on different services independently, enabling faster development cycles and reducing coordination overhead.

## Setting Up Your First Microservice

Let's start by creating a simple user management microservice using Spring Boot:

```java
@SpringBootApplication
@EnableEurekaClient
@EnableJpaRepositories
public class UserServiceApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
    
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

The `@EnableEurekaClient` annotation enables service discovery, which is crucial for microservices communication. Services need to find each other dynamically without hardcoded URLs.

## Designing Your Service Layer

A well-designed service layer is the backbone of any microservice. Here's how to structure your user service:

```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String username;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    // Constructors, getters, setters
}

@Service
@Transactional
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    public User createUser(CreateUserRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new UserAlreadyExistsException("Username already exists");
        }
        
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        
        return userRepository.save(user);
    }
    
    @Cacheable(value = "users", key = "#id")
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
}
```

## Docker Configuration for Microservices

Containerization is essential for microservices deployment. Here's a production-ready Dockerfile:

```dockerfile
# Multi-stage build for optimization
FROM maven:3.8.6-openjdk-17 AS build

WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM openjdk:17-jre-slim

# Create non-root user for security
RUN groupadd -r appuser && useradd -r -g appuser appuser

WORKDIR /app
COPY --from=build /app/target/user-service.jar app.jar

# Change ownership to non-root user
RUN chown -R appuser:appuser /app
USER appuser

EXPOSE 8080

# Use exec form for proper signal handling
ENTRYPOINT ["java", "-jar", "app.jar"]
```

## Service Discovery with Eureka

Service discovery eliminates the need for hardcoded service URLs. Configure Eureka Server:

```yaml
# eureka-server application.yml
server:
  port: 8761

eureka:
  instance:
    hostname: eureka-server
  client:
    register-with-eureka: false
    fetch-registry: false
    service-url:
      defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/
```

For your microservices:

```yaml
# user-service application.yml
server:
  port: 8081

spring:
  application:
    name: user-service
  datasource:
    url: jdbc:postgresql://postgres:5432/userdb
    username: ${DB_USERNAME:user}
    password: ${DB_PASSWORD:password}
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false

eureka:
  client:
    service-url:
      defaultZone: http://eureka-server:8761/eureka
  instance:
    prefer-ip-address: true
    lease-renewal-interval-in-seconds: 30
```

## API Gateway Configuration

An API Gateway serves as the single entry point for all client requests:

```yaml
# api-gateway application.yml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/api/users/**
          filters:
            - StripPrefix=2
            
        - id: order-service
          uri: lb://order-service
          predicates:
            - Path=/api/orders/**
          filters:
            - StripPrefix=2
            
      globalcors:
        cors-configurations:
          '[/**]':
            allowedOrigins: "*"
            allowedMethods: "*"
            allowedHeaders: "*"
```

## Inter-Service Communication

Use Feign clients for type-safe service-to-service communication:

```java
@FeignClient(name = "order-service", fallback = OrderServiceFallback.class)
public interface OrderServiceClient {
    
    @GetMapping("/orders/user/{userId}")
    List<OrderDto> getOrdersByUserId(@PathVariable("userId") Long userId);
    
    @PostMapping("/orders")
    OrderDto createOrder(@RequestBody CreateOrderRequest request);
}

@Component
public class OrderServiceFallback implements OrderServiceClient {
    
    @Override
    public List<OrderDto> getOrdersByUserId(Long userId) {
        // Return empty list or cached data
        return Collections.emptyList();
    }
    
    @Override
    public OrderDto createOrder(CreateOrderRequest request) {
        throw new ServiceUnavailableException("Order service is currently unavailable");
    }
}
```

## Database Per Service Pattern

Each microservice should own its data:

```java
// User Service - User Repository
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}

// Order Service - Order Repository  
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<Order> findByStatusAndCreatedAtBefore(OrderStatus status, LocalDateTime date);
}
```

## Monitoring and Observability

Implement comprehensive monitoring with Spring Boot Actuator and Micrometer:

```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      show-details: always
  metrics:
    export:
      prometheus:
        enabled: true
```

Add distributed tracing:

```java
@Configuration
public class TracingConfiguration {
    
    @Bean
    public Sender sender() {
        return OkHttpSender.create("http://zipkin:9411/api/v2/spans");
    }
    
    @Bean
    public AsyncReporter<Span> spanReporter() {
        return AsyncReporter.create(sender());
    }
    
    @Bean
    public Tracing tracing() {
        return Tracing.newBuilder()
                .localServiceName("user-service")
                .spanReporter(spanReporter())
                .sampler(Sampler.create(1.0f))
                .build();
    }
}
```

## Docker Compose Orchestration

Orchestrate your entire microservices ecosystem:

```yaml
version: '3.8'

services:
  eureka-server:
    build: ./eureka-server
    ports:
      - "8761:8761"
    environment:
      - SPRING_PROFILES_ACTIVE=docker
    networks:
      - microservices-network

  api-gateway:
    build: ./api-gateway
    ports:
      - "8080:8080"
    depends_on:
      - eureka-server
    environment:
      - SPRING_PROFILES_ACTIVE=docker
      - EUREKA_CLIENT_SERVICE_URL_DEFAULTZONE=http://eureka-server:8761/eureka
    networks:
      - microservices-network

  user-service:
    build: ./user-service
    depends_on:
      - eureka-server
      - postgres-user
    environment:
      - SPRING_PROFILES_ACTIVE=docker
      - EUREKA_CLIENT_SERVICE_URL_DEFAULTZONE=http://eureka-server:8761/eureka
      - DB_HOST=postgres-user
    networks:
      - microservices-network

  postgres-user:
    image: postgres:13
    environment:
      - POSTGRES_DB=userdb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres-user-data:/var/lib/postgresql/data
    networks:
      - microservices-network

networks:
  microservices-network:
    driver: bridge

volumes:
  postgres-user-data:
```

## Security Considerations

Implement OAuth2 and JWT for secure communication:

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt
                    .jwtAuthenticationConverter(jwtAuthenticationConverter())
                )
            )
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/actuator/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/users").permitAll()
                .anyRequest().authenticated()
            );
        
        return http.build();
    }
    
    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter authoritiesConverter = 
            new JwtGrantedAuthoritiesConverter();
        authoritiesConverter.setAuthorityPrefix("ROLE_");
        authoritiesConverter.setAuthoritiesClaimName("roles");
        
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(authoritiesConverter);
        return converter;
    }
}
```

## Production Deployment Best Practices

**Health Checks**: Implement proper health checks for container orchestration:

```java
@Component
public class DatabaseHealthIndicator implements HealthIndicator {
    
    private final DataSource dataSource;
    
    @Override
    public Health health() {
        try (Connection connection = dataSource.getConnection()) {
            if (connection.isValid(1)) {
                return Health.up()
                    .withDetail("database", "Available")
                    .build();
            }
        } catch (SQLException e) {
            return Health.down()
                .withDetail("database", "Unavailable")
                .withException(e)
                .build();
        }
        return Health.down().build();
    }
}
```

**Graceful Shutdown**: Handle shutdown signals properly:

```yaml
server:
  shutdown: graceful

spring:
  lifecycle:
    timeout-per-shutdown-phase: 30s
```

**Resource Limits**: Set appropriate resource limits:

```yaml
# docker-compose.yml
user-service:
  deploy:
    resources:
      limits:
        memory: 512M
        cpus: '0.5'
      reservations:
        memory: 256M
        cpus: '0.25'
```

## Conclusion

Building scalable microservices requires careful consideration of architecture, communication patterns, and operational concerns. The combination of Spring Boot and Docker provides a robust foundation, but success depends on proper implementation of service discovery, monitoring, security, and deployment practices.

Key takeaways:
- Design services around business capabilities
- Implement proper service discovery and communication
- Use containerization for consistent deployments
- Monitor everything and plan for failures
- Secure service-to-service communication
- Automate testing and deployment pipelines

The microservices journey is complex, but with the right tools and patterns, you can build systems that scale efficiently and maintain high availability in production environments.
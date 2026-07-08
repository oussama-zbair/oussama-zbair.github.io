---
sidebar_position: 2
---

# Java EE 7

## Overview

Java EE 7 (now Jakarta EE) is the enterprise edition of Java, providing APIs for building distributed, multi-tier, scalable, and secure server-side applications. This document covers the OCP Java EE 7 Application Developer (1Z0-900) exam objectives.

---

## Core Technologies

### Servlets

The foundation of Java web applications — handle HTTP requests and responses.

```java
@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setContentType("application/json");
        resp.getWriter().write("{\"message\": \"Hello World\"}");
    }
}
```

### JPA (Java Persistence API)

ORM standard for mapping Java objects to relational databases.

```java
@Entity
@Table(name = "orders")
@NamedQuery(name = "Order.findAll", query = "SELECT o FROM Order o")
public class Order {
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();
}
```

**Fetch types:**
- `EAGER` — load immediately with the parent (default for `@ManyToOne`, `@OneToOne`).
- `LAZY` — load on first access (default for `@OneToMany`, `@ManyToMany`).

### EJB (Enterprise Java Beans)

```java
@Stateless  // no conversational state between calls
public class OrderService {
    @PersistenceContext
    private EntityManager em;

    @TransactionAttribute(TransactionAttributeType.REQUIRED)  // default
    public Order createOrder(OrderRequest request) {
        Order order = new Order(request);
        em.persist(order);
        return order;
    }
}

@Stateful  // maintains state across calls in a session
public class ShoppingCart {
    private List<Item> items = new ArrayList<>();
    public void addItem(Item item) { items.add(item); }
    @Remove public void checkout() { /* process */ }
}
```

### CDI (Contexts and Dependency Injection)

```java
@ApplicationScoped  // one instance for the app lifetime
public class ConfigService { ... }

@RequestScoped      // one instance per HTTP request
public class UserContext { ... }

@Inject
private ConfigService config;

// Producer method
@Produces @RequestScoped
public EntityManager createEM(EntityManagerFactory emf) {
    return emf.createEntityManager();
}
```

### JAX-RS (REST)

```java
@Path("/api/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    @Inject private ProductService service;

    @GET
    public Response list(@QueryParam("page") @DefaultValue("0") int page) {
        return Response.ok(service.findAll(page)).build();
    }

    @GET @Path("/{id}")
    public Response get(@PathParam("id") Long id) {
        return service.findById(id)
            .map(p -> Response.ok(p).build())
            .orElse(Response.status(404).build());
    }

    @POST
    public Response create(ProductDto dto, @Context UriInfo uriInfo) {
        Product p = service.create(dto);
        URI uri = uriInfo.getAbsolutePathBuilder().path(p.getId().toString()).build();
        return Response.created(uri).entity(p).build();
    }
}
```

### Bean Validation

```java
public class CreateUserRequest {
    @NotBlank
    @Size(min = 2, max = 50)
    private String name;

    @Email @NotNull
    private String email;

    @Min(0) @Max(150)
    private int age;
}
```

---

## Transaction Management

EJB manages transactions via the `@TransactionAttribute` annotation:

| Type | Behaviour |
|---|---|
| `REQUIRED` | Join existing tx or create new (default) |
| `REQUIRES_NEW` | Always create new tx, suspend existing |
| `MANDATORY` | Must have existing tx, else exception |
| `NEVER` | Must NOT have tx, else exception |
| `NOT_SUPPORTED` | Suspend existing tx if present |
| `SUPPORTS` | Run in tx if present, otherwise without |

---

## Security

```java
@DeclareRoles({"USER", "ADMIN"})
@RolesAllowed("ADMIN")
public class AdminService { ... }

// JAX-RS security
@GET @Path("/admin")
@RolesAllowed("ADMIN")
public Response adminEndpoint(@Context SecurityContext sc) {
    String user = sc.getUserPrincipal().getName();
    return Response.ok(user).build();
}
```

---

## Interview Questions

**Q: What is the difference between Stateless and Stateful EJBs?**  
Stateless EJBs hold no client-specific state between calls — the container pools them and assigns any instance to any client. Stateful EJBs maintain conversational state for a single client across multiple method calls (e.g., shopping cart).

**Q: Explain CDI scopes.**  
Scopes define a bean's lifecycle: `@ApplicationScoped` (app lifetime), `@SessionScoped` (HTTP session), `@RequestScoped` (single request), `@ConversationScoped` (programmatically controlled), `@Dependent` (inherits scope of the injecting bean).

**Q: What is the N+1 select problem?**  
When loading a collection lazily in a loop — 1 query for parent entities + N queries for each child collection. Fix with JOIN FETCH in JPQL or `@EntityGraph`.

---

## Cheat Sheet

```
@Stateless / @Stateful / @Singleton  EJB types
@PersistenceContext                   Inject EntityManager
@Inject                               CDI injection
@TransactionAttribute                 TX behaviour
@RolesAllowed / @PermitAll           Security
@Path / @GET / @POST / @PUT / @DELETE JAX-RS
@QueryParam / @PathParam / @FormParam JAX-RS params
@NotNull / @Size / @Email             Bean Validation
```

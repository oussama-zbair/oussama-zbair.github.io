---
sidebar_position: 2
---

# System Design

## Overview

System design covers the principles and patterns for building scalable, reliable, and maintainable distributed systems — a core topic in senior engineering interviews.

---

## Key Concepts

### Scalability

- **Vertical scaling (scale up)** — bigger machine. Simple but has limits.
- **Horizontal scaling (scale out)** — more machines. Requires stateless services.

### CAP Theorem

A distributed system can guarantee at most 2 of 3:
- **Consistency** — every read gets the latest write.
- **Availability** — every request gets a response (not necessarily latest).
- **Partition Tolerance** — system works despite network partitions.

In practice: partition tolerance is required. Choose CP (e.g., HBase) or AP (e.g., Cassandra, DynamoDB).

---

## Load Balancing

Distributes traffic across multiple servers:
- **Round Robin** — sequential distribution.
- **Least Connections** — route to server with fewest active connections.
- **IP Hash** — consistent routing based on client IP (session affinity).
- **Layer 4 (TCP)** — faster, less context.
- **Layer 7 (HTTP)** — routes based on URL, headers, cookies.

---

## Caching

```
Client → CDN → Load Balancer → App Server → Cache (Redis) → Database
```

- **Cache-aside (lazy loading)** — app checks cache first; on miss, loads from DB and populates cache.
- **Write-through** — write to cache and DB simultaneously.
- **Write-behind** — write to cache, async flush to DB.
- **TTL** — time-to-live; expiry for cached entries.
- **Eviction policies** — LRU, LFU, FIFO.

---

## Databases

### SQL vs NoSQL

| | SQL (Relational) | NoSQL |
|---|---|---|
| Schema | Fixed | Flexible |
| Scaling | Vertical (read replicas for reads) | Horizontal |
| ACID | Yes | Often eventual consistency |
| Best for | Complex queries, joins | High throughput, flexible data |

### Database Patterns

- **Read replicas** — offload reads from primary.
- **Sharding** — partition data horizontally across multiple DBs.
- **Connection pooling** — reuse DB connections (HikariCP).
- **Indexing** — B-tree (range queries), Hash (equality), full-text.

---

## Message Queues

Decouple producers from consumers, enable async processing:
- **Kafka** — high-throughput, durable, log-based, replay.
- **RabbitMQ** — flexible routing, lower throughput, message acknowledgement.
- **SQS** — managed, AWS-native, simple.

---

## API Design

- **REST** — stateless, resource-based, HTTP verbs.
- **GraphQL** — client specifies exactly what data it needs.
- **gRPC** — binary protocol (Protobuf), high performance, streaming.

**Rate limiting:** Token bucket, leaky bucket, fixed/sliding window.

---

## High Availability Patterns

- **Circuit Breaker** — stop calling a failing service; fallback response.
- **Retry with backoff** — exponential backoff + jitter.
- **Bulkhead** — isolate failures (thread pool per service).
- **Health checks** — liveness + readiness probes.
- **Multi-region deployment** — active-active or active-passive.

---

## Interview Framework

For any system design question, follow:

1. **Clarify requirements** — functional and non-functional (scale, latency, consistency).
2. **Estimate scale** — DAU, QPS, storage.
3. **High-level design** — components and data flow diagram.
4. **Deep dive** — focus on the hard parts (DB schema, API design, bottlenecks).
5. **Identify tradeoffs** — explain your choices.

---

## Cheat Sheet

```
Scale: Vertical (bigger) | Horizontal (more)
CAP: Consistency | Availability | Partition Tolerance (pick 2)
Cache: Redis | CDN | Cache-aside | Write-through | TTL | LRU
Queue: Kafka | RabbitMQ | SQS
LB: Round Robin | Least Connections | Layer 4/7
HA: Circuit Breaker | Retry + Backoff | Health Checks | Multi-region
DB: Read replicas | Sharding | Connection pool | Indexing
```

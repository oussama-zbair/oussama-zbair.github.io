---
sidebar_position: 1
---

# AWS Certified Cloud Practitioner

## Overview

The AWS Certified Cloud Practitioner (CCP) is the entry-level AWS certification. It validates a broad understanding of AWS cloud concepts, core services, security, architecture, pricing, and support. It is ideal before pursuing associate-level certifications such as AWS Solutions Architect or Developer.

**Exam code:** CLF-C02  
**Format:** 65 questions (multiple choice / multiple response), 90 minutes  
**Passing score:** 700 / 1000

---

## Why Cloud Computing Exists

Traditional on-premises infrastructure required large upfront capital expenditure (CapEx), long provisioning cycles, and teams to manage physical hardware. Cloud computing shifts this model:

- **OpEx over CapEx** — pay for what you use, no upfront hardware costs.
- **Elasticity** — scale up or down in minutes.
- **Global reach** — deploy close to users in any region.
- **Managed services** — AWS handles hardware, hypervisors, and often the OS layer.

---

## AWS Global Infrastructure

| Component | Description |
|---|---|
| **Region** | Geographic cluster of data centers (e.g., `us-east-1`) |
| **Availability Zone (AZ)** | One or more discrete data centers within a Region, connected by low-latency links |
| **Edge Location** | CloudFront PoP used for CDN caching and Route 53 DNS |
| **Local Zone** | Extension of a Region, places compute closer to end users |

AWS has **30+ Regions** and **90+ AZs** worldwide. When choosing a Region, consider: compliance, latency, service availability, and pricing.

---

## Core Service Domains

### Compute

| Service | Purpose |
|---|---|
| **EC2** | Virtual machines (instances) |
| **Lambda** | Serverless functions, event-driven, pay per invocation |
| **ECS / EKS** | Container orchestration (Docker / Kubernetes) |
| **Elastic Beanstalk** | PaaS — deploy code, AWS manages infrastructure |
| **Lightsail** | Simplified VPS for simple workloads |

**EC2 instance types:**
- General purpose: `t3`, `m6i`
- Compute optimised: `c6i`
- Memory optimised: `r6i`
- Storage optimised: `i3`, `d3`
- Accelerated (GPU): `p4`, `g5`

**EC2 purchasing options:**
- **On-Demand** — pay by second, no commitment.
- **Reserved Instances (RI)** — 1 or 3 year commitment, up to 72% savings.
- **Savings Plans** — flexible commitment to compute spend ($/hr), applies to EC2, Lambda, Fargate.
- **Spot Instances** — spare capacity, up to 90% savings, can be interrupted.
- **Dedicated Host** — physical server for compliance requirements.

### Storage

| Service | Type | Use Case |
|---|---|---|
| **S3** | Object | Files, backups, static websites, data lakes |
| **EBS** | Block | Attached volumes for EC2 instances |
| **EFS** | File (NFS) | Shared file system across multiple EC2 instances |
| **S3 Glacier** | Object (archival) | Long-term archival, retrieval hours/minutes |
| **Storage Gateway** | Hybrid | On-premises to AWS storage bridge |

**S3 storage classes:**
- `S3 Standard` — high durability/availability, frequent access
- `S3 Standard-IA` — infrequent access, lower cost, retrieval fee
- `S3 One Zone-IA` — single AZ, 20% cheaper
- `S3 Intelligent-Tiering` — auto-moves objects between tiers
- `S3 Glacier Instant/Flexible/Deep Archive` — long-term archival

### Databases

| Service | Type |
|---|---|
| **RDS** | Managed relational (MySQL, PostgreSQL, Oracle, SQL Server, MariaDB) |
| **Aurora** | AWS-native relational, MySQL/PostgreSQL compatible, 5× faster |
| **DynamoDB** | Serverless NoSQL key-value and document |
| **ElastiCache** | Managed Redis / Memcached in-memory cache |
| **Redshift** | Data warehouse for analytics (OLAP) |
| **DocumentDB** | MongoDB-compatible document database |

### Networking

| Service | Purpose |
|---|---|
| **VPC** | Isolated virtual network with subnets, route tables, gateways |
| **Route 53** | DNS service + health checks + routing policies |
| **CloudFront** | Global CDN, edge caching |
| **ELB** | Elastic Load Balancing — ALB (HTTP/7), NLB (TCP/4), CLB (legacy) |
| **Direct Connect** | Dedicated private connection from on-premises to AWS |
| **VPN** | Encrypted tunnel over public internet to VPC |

**VPC components:**
- **Subnet** — public (internet-accessible) or private.
- **Internet Gateway (IGW)** — enables public subnet internet access.
- **NAT Gateway** — allows private subnets to initiate outbound internet traffic.
- **Security Group** — stateful, instance-level firewall.
- **NACL** — stateless, subnet-level firewall, rules evaluated in order.

---

## Security & Compliance

### Shared Responsibility Model

| AWS Responsibility ("Security **of** the Cloud") | Customer Responsibility ("Security **in** the Cloud") |
|---|---|
| Physical data centers | OS patching on EC2 |
| Hypervisor | Application code |
| Network infrastructure | IAM user management |
| Managed service internals (e.g., RDS engine) | Data encryption at rest / in transit |

### IAM (Identity and Access Management)

- **Users** — individual identities with long-term credentials.
- **Groups** — collection of users; assign policies to groups, not individual users.
- **Roles** — assumed by services, EC2 instances, Lambda functions, or external identities (no long-term credentials).
- **Policies** — JSON documents defining Allow/Deny actions on resources.

**Best practices:**
- Enable MFA on the root account and all human users.
- Apply least privilege — grant only the permissions required.
- Never use root account for daily tasks.
- Use IAM roles for EC2 instances instead of embedding access keys.

### Key Security Services

| Service | Purpose |
|---|---|
| **AWS Shield** | DDoS protection (Standard free, Advanced paid) |
| **WAF** | Web Application Firewall — filter malicious HTTP traffic |
| **GuardDuty** | Threat detection, analyses CloudTrail/VPC Flow Logs |
| **Inspector** | Automated vulnerability scanning for EC2 and containers |
| **Macie** | PII detection in S3 using ML |
| **KMS** | Key Management Service — create and manage encryption keys |
| **CloudTrail** | API call logging — who did what, when, from where |
| **Config** | Continuous compliance monitoring of AWS resource configurations |

---

## Pricing & Billing

### Pricing Models

1. **Pay-as-you-go** — no upfront, pay per use.
2. **Commit and save** — Reserved Instances, Savings Plans.
3. **Volume discounts** — S3 tiered pricing, data transfer discounts.

### Key Billing Tools

| Tool | Purpose |
|---|---|
| **AWS Cost Explorer** | Visualise and forecast spending |
| **AWS Budgets** | Set cost/usage alerts |
| **AWS Pricing Calculator** | Estimate costs before deployment |
| **Cost and Usage Report (CUR)** | Detailed billing data exported to S3 |
| **Trusted Advisor** | Recommendations across cost, performance, security, fault tolerance |

**AWS Free Tier:**
- **Always Free** — e.g., Lambda 1M requests/month, DynamoDB 25 GB.
- **12 months free** — e.g., EC2 t2.micro 750 hrs/month, S3 5 GB.
- **Trials** — short-term free periods for specific services.

---

## Well-Architected Framework

Six pillars:

1. **Operational Excellence** — run and monitor systems, continuous improvement.
2. **Security** — protect information and systems.
3. **Reliability** — recover from failures, scale to meet demand.
4. **Performance Efficiency** — use resources efficiently.
5. **Cost Optimisation** — avoid unnecessary expense.
6. **Sustainability** — minimise environmental impact.

---

## Support Plans

| Plan | Price | Key Features |
|---|---|---|
| **Basic** | Free | Documentation, forums, Trusted Advisor (7 checks) |
| **Developer** | $29/mo | Business hours email support, 1 contact |
| **Business** | $100/mo | 24/7 phone/chat, all Trusted Advisor checks, AWS Health API |
| **Enterprise On-Ramp** | $5,500/mo | Pool of TAMs, concierge support |
| **Enterprise** | $15,000/mo | Dedicated TAM, business-critical response < 15 min |

---

## Best Practices

- Design for failure — assume any component can fail at any time.
- Use multiple AZs for high availability.
- Use managed services over self-managed where possible.
- Enable CloudTrail and GuardDuty in every account from day one.
- Tag all resources for cost allocation and governance.
- Encrypt data at rest (KMS) and in transit (TLS).

---

## Common Mistakes

- Confusing **Security Groups** (stateful) with **NACLs** (stateless).
- Thinking **S3** is a file system — it is object storage, not block or file.
- Placing databases in public subnets — always use private subnets.
- Using root account credentials in applications — use IAM roles.
- Forgetting that **data transfer OUT** from AWS is what costs money (inbound is free).

---

## Interview Questions

**Q: What is the difference between a Region and an Availability Zone?**  
A Region is a geographic area with multiple AZs. An AZ is one or more physical data centers within a Region. AZs are isolated from each other to prevent correlated failures, but connected by low-latency links to allow synchronous replication.

**Q: What is the shared responsibility model?**  
AWS secures the infrastructure (hardware, network, hypervisor, managed service internals). The customer secures their data, applications, OS configuration, IAM policies, and network settings within the cloud.

**Q: When would you use Spot Instances?**  
For fault-tolerant, stateless workloads that can handle interruption: batch processing, data analytics, rendering, CI/CD. Never for databases or any workload that requires guaranteed uptime.

**Q: What is IAM and why are roles preferred over access keys for EC2?**  
IAM manages identities and permissions. Roles are preferred because they use temporary credentials automatically rotated by AWS — no long-lived secrets embedded in code or config files, reducing the risk of credential leakage.

---

## Cheat Sheet

```
Compute:   EC2 | Lambda | ECS | EKS | Beanstalk
Storage:   S3 | EBS | EFS | Glacier
DB:        RDS | Aurora | DynamoDB | ElastiCache | Redshift
Network:   VPC | Route53 | CloudFront | ELB | Direct Connect
Security:  IAM | KMS | Shield | WAF | GuardDuty | CloudTrail
Billing:   Cost Explorer | Budgets | Pricing Calculator | Trusted Advisor

EC2 purchasing: On-Demand | Reserved | Savings Plans | Spot | Dedicated
S3 classes:     Standard | Standard-IA | One Zone-IA | Intelligent-Tiering | Glacier
```

---

## My Preparation Strategy

**Duration:** 6 weeks  
**Exam date:** February 2026

I prepared using:

1. **Stephane Maarek's CCP course** (Udemy) — best video course available, comprehensive and up to date.
2. **AWS official practice exam** — 20 questions from AWS Skill Builder, gives a realistic feel for the question style.
3. **Tutorials Dojo practice tests** — 6 full-length mock exams; harder than the real exam, which builds confidence.
4. **AWS Free Tier hands-on** — launched EC2 instances, configured S3 buckets, set up IAM users and roles, explored CloudWatch.

**Hardest topics:** Shared responsibility model edge cases, S3 storage class selection criteria, support plan features, and the distinction between services that look similar (GuardDuty vs Inspector vs Macie vs Config).

**Exam tips:**
- The CCP tests breadth, not depth — understand what each service does, not its internals.
- Many questions are scenario-based: "A company needs X — which service?".
- When unsure, eliminate clearly wrong answers first.
- Do not overthink — the CCP is intentionally accessible.

---
sidebar_position: 2
---

# Oracle Cloud Infrastructure

## Overview

Oracle Cloud Infrastructure (OCI) is Oracle's second-generation cloud platform, designed for enterprise workloads with a focus on high performance, predictable pricing, and strong security. This document covers the OCI 2024 Certified Associate (1Z0-1085) exam.

---

## OCI Architecture

### Regions & Availability Domains

- **Region** — geographic area with 1–3 Availability Domains (ADs).
- **Availability Domain (AD)** — one or more data centers; independent power/network/cooling.
- **Fault Domain (FD)** — grouping of hardware within an AD to protect against single points of failure.

### Tenancy & Compartments

- **Tenancy** — root compartment automatically created when you sign up.
- **Compartment** — logical container for resources; can be nested; policies are attached here.
- Use compartments to organise by environment (dev/prod), team, or project.

---

## Identity and Access Management (IAM)

| Concept | Description |
|---|---|
| **User** | Human identity |
| **Group** | Collection of users |
| **Dynamic Group** | Group of OCI resources (instances, functions) |
| **Policy** | Allow statements: `Allow group Admins to manage all-resources in tenancy` |
| **Compartment** | Scope for policies |

**Policy syntax:**
```
Allow <subject> to <verb> <resource-type> in <location> [where <condition>]
```

Verbs (least to most permissive): `inspect` → `read` → `use` → `manage`

---

## Compute

| Service | Description |
|---|---|
| **VM Instances** | Virtual machines on shared/dedicated hardware |
| **Bare Metal** | Direct hardware access, no hypervisor overhead |
| **Container Instances** | Serverless containers without Kubernetes |
| **OKE** | Oracle Kubernetes Engine — managed K8s |
| **Functions** | Serverless functions (Fn Project) |

**Instance types:** Standard (E5, E4), Dense I/O, GPU, HPC.

**Instance lifecycle:** `PROVISIONING → RUNNING → STOPPING → STOPPED → TERMINATING`

---

## Storage

| Service | Type | Use Case |
|---|---|---|
| **Block Volume** | Block | Boot volumes and data disks for instances |
| **File Storage** | NFS file system | Shared file access across instances |
| **Object Storage** | Object | Unstructured data, backups, data lakes |
| **Archive Storage** | Object (archival) | Rarely accessed data, lowest cost |

**Object Storage tiers:**
- `Standard` — hot data, instant access.
- `Infrequent Access` — lower cost, minimum 31-day retention.
- `Archive` — cold data, hours to restore.

---

## Networking (VCN)

A **Virtual Cloud Network (VCN)** is the private network in OCI:

- **Subnet** — subdivision of a VCN (Regional or AD-specific); public or private.
- **Internet Gateway (IGW)** — for public subnets to reach the internet.
- **NAT Gateway** — outbound internet for private subnets.
- **Service Gateway** — private access to OCI services without internet.
- **DRG (Dynamic Routing Gateway)** — connects VCN to on-premises via VPN or FastConnect.
- **Local Peering Gateway** — connects two VCNs in the same region.
- **Security List / NSG** — stateful firewall rules.

---

## Database Services

| Service | Type |
|---|---|
| **DB System** | Managed Oracle DB (RAC or single node) |
| **Autonomous Database** | Self-driving Oracle DB (OLTP and DW) |
| **MySQL HeatWave** | Managed MySQL with in-memory analytics |
| **NoSQL Database** | Managed NoSQL for key-value and document |

**Autonomous Database** handles patching, tuning, backups, and scaling automatically.

---

## Security

| Service | Purpose |
|---|---|
| **Vault** | Key management (KMS) and secrets storage |
| **Cloud Guard** | Detects misconfigured resources and threats |
| **Security Zones** | Enforce maximum security posture on compartments |
| **Vulnerability Scanning** | Scan compute instances and container images |
| **WAF** | Web Application Firewall |
| **Bastion** | Managed SSH bastion for private resource access |

---

## Interview Questions

**Q: What is the difference between a Security List and a Network Security Group?**
Security Lists apply rules to all VNICs in a subnet. Network Security Groups (NSGs) apply rules to individual VNICs — more granular. NSGs are preferred for fine-grained control.

**Q: What makes OCI's pricing model different from AWS?**
OCI charges per OCPU (not vCPU), has no egress fees within a region, and offers a more predictable pricing structure. The Always Free tier is more generous than AWS Free Tier.

---

## Cheat Sheet

```
Regions → ADs → Fault Domains
IAM: User → Group → Policy → Compartment
Compute: VM | Bare Metal | Container Instance | OKE | Functions
Storage: Block Volume | File Storage | Object Storage | Archive
Network: VCN | Subnet | IGW | NAT GW | Service GW | DRG
DB: DB System | Autonomous DB | MySQL HeatWave
Security: IAM | Vault | Cloud Guard | WAF | Bastion
```

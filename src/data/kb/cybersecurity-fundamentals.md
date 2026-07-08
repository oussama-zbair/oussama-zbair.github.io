# Cybersecurity Fundamentals

## Overview

Covers the IBM Cybersecurity Fundamentals and Google Foundations of Cybersecurity certifications — core security concepts, threat models, cryptography, and network security.

---

## Core Security Principles

### CIA Triad

| Principle | Meaning |
|---|---|
| **Confidentiality** | Only authorised parties can access data |
| **Integrity** | Data has not been altered without authorisation |
| **Availability** | Systems and data are accessible when needed |

### Authentication vs Authorisation

- **Authentication (AuthN)** — who are you? (passwords, MFA, certificates)
- **Authorisation (AuthZ)** — what can you do? (RBAC, ACLs, policies)

---

## Threat Landscape

| Threat | Description |
|---|---|
| **Phishing** | Social engineering via deceptive email/link |
| **Malware** | Viruses, ransomware, trojans, spyware |
| **SQL Injection** | Malicious SQL in user inputs |
| **XSS** | Inject scripts into web pages viewed by others |
| **MITM** | Intercept communication between two parties |
| **DDoS** | Overwhelm a service with traffic |
| **Zero-day** | Exploit unknown to vendor, no patch available |

---

## Cryptography

- **Symmetric** — same key for encrypt/decrypt (AES). Fast, used for data encryption.
- **Asymmetric** — public/private key pair (RSA, ECC). Used for key exchange, TLS, signatures.
- **Hash** — one-way function (SHA-256). Used for password storage, integrity verification.
- **TLS/SSL** — encrypts data in transit. Uses asymmetric handshake then symmetric session key.

---

## Network Security

- **Firewall** — filters traffic by rules (stateful/stateless).
- **IDS/IPS** — detects/prevents intrusion based on signatures or anomalies.
- **VPN** — encrypted tunnel over public network.
- **DMZ** — buffer zone between public internet and internal network.
- **Zero Trust** — never trust, always verify. Authenticate every request.

---

## OWASP Top 10 (Web)

1. Broken Access Control
2. Cryptographic Failures
3. Injection (SQL, command)
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable Components
7. Authentication Failures
8. Software Integrity Failures
9. Logging/Monitoring Failures
10. Server-Side Request Forgery (SSRF)

---

## Best Practices

- Use MFA everywhere.
- Patch systems and dependencies regularly.
- Principle of least privilege — grant minimum permissions.
- Encrypt data at rest and in transit.
- Log and monitor all access.
- Never store plain-text passwords — use bcrypt or Argon2.

---

## Cheat Sheet

```
CIA: Confidentiality | Integrity | Availability
Crypto: AES (symmetric) | RSA (asymmetric) | SHA-256 (hash) | TLS (transport)
Threats: Phishing | SQLi | XSS | MITM | DDoS | Ransomware
Defence: Firewall | IDS/IPS | VPN | MFA | Least Privilege | Zero Trust
```

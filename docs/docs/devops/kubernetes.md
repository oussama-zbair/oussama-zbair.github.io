---
sidebar_position: 2
---

# Kubernetes & Cloud Native

## Overview

Kubernetes (K8s) is an open-source container orchestration platform originally developed by Google, now maintained by the CNCF. It automates deployment, scaling, self-healing, and management of containerised workloads across a cluster of machines.

---

## Architecture

### Control Plane

| Component | Role |
|---|---|
| `kube-apiserver` | Central API gateway — all kubectl commands go here |
| `etcd` | Distributed key-value store — cluster state |
| `kube-scheduler` | Assigns pods to nodes based on resources and constraints |
| `kube-controller-manager` | Runs controllers (ReplicaSet, Deployment, Node, etc.) |
| `cloud-controller-manager` | Integrates with cloud provider APIs |

### Worker Nodes

| Component | Role |
|---|---|
| `kubelet` | Agent on each node — ensures containers are running |
| `kube-proxy` | Network rules for Service routing |
| Container runtime | Runs containers (containerd, CRI-O) |

---

## Core Objects

### Pod

The smallest deployable unit — one or more containers sharing network and storage.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp
spec:
  containers:
    - name: app
      image: myapp:1.0
      ports:
        - containerPort: 8080
      resources:
        requests:
          cpu: "250m"
          memory: "256Mi"
        limits:
          cpu: "500m"
          memory: "512Mi"
```

### Deployment

Manages ReplicaSets — handles rolling updates and rollbacks.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: app
          image: myapp:1.0
          readinessProbe:
            httpGet:
              path: /actuator/health/readiness
              port: 8080
          livenessProbe:
            httpGet:
              path: /actuator/health/liveness
              port: 8080
```

### Service

Stable network endpoint for pods.

| Type | Use Case |
|---|---|
| `ClusterIP` | Internal only (default) |
| `NodePort` | Exposes on each node's IP + a static port |
| `LoadBalancer` | Cloud provider load balancer |
| `ExternalName` | DNS alias to external service |

### ConfigMap & Secret

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_ENV: production
  LOG_LEVEL: info
---
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  DB_PASSWORD: c2VjcmV0  # base64 encoded
```

### Ingress

Routes external HTTP/S traffic to Services based on hostname/path rules. Requires an Ingress Controller (nginx, Traefik, AWS ALB).

---

## Scaling

```bash
# Manual
kubectl scale deployment myapp --replicas=5

# Horizontal Pod Autoscaler (CPU-based)
kubectl autoscale deployment myapp --cpu-percent=70 --min=2 --max=10
```

---

## Essential kubectl Commands

```bash
# Cluster info
kubectl cluster-info
kubectl get nodes

# Workloads
kubectl get pods -n mynamespace -o wide
kubectl describe pod myapp-xxxx
kubectl logs myapp-xxxx -f --previous
kubectl exec -it myapp-xxxx -- bash

# Apply manifests
kubectl apply -f deployment.yaml
kubectl delete -f deployment.yaml

# Rollout
kubectl rollout status deployment/myapp
kubectl rollout history deployment/myapp
kubectl rollout undo deployment/myapp

# Port forward for debugging
kubectl port-forward svc/myapp 8080:8080
```

---

## Helm

Helm is the package manager for Kubernetes — packages are called *charts*.

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm install my-postgres bitnami/postgresql --set auth.password=secret
helm upgrade my-postgres bitnami/postgresql --set replicaCount=2
helm uninstall my-postgres
helm list
```

---

## Cloud Native Principles

The CNCF defines cloud native as: containers, microservices, immutable infrastructure, declarative APIs, and dynamic orchestration.

**12-Factor App** (key factors for cloud native):
1. Codebase — one codebase per app, many deploys
2. Dependencies — explicitly declare all dependencies
3. Config — store config in environment variables
4. Backing services — treat DB, cache as attached resources
5. Processes — stateless processes, persist state in backing services
6. Port binding — export services via port binding
7. Concurrency — scale out via processes
8. Disposability — fast startup, graceful shutdown

---

## Best Practices

- Always set resource `requests` and `limits` — prevents noisy neighbour issues.
- Use `readinessProbe` and `livenessProbe` — K8s will restart unhealthy containers.
- Never run as root — use `securityContext.runAsNonRoot: true`.
- Use namespaces to isolate environments (dev/staging/prod) within a cluster.
- Store secrets in Vault or use Sealed Secrets — not raw K8s Secrets in git.
- Use `PodDisruptionBudget` to guarantee availability during rolling updates.

---

## Common Mistakes

- Setting CPU limits too low — causes CPU throttling, not OOM kills.
- Missing `readinessProbe` — traffic is sent to pods before they're ready.
- Storing state in containers — data is lost on pod restart without PersistentVolumes.
- Using `latest` image tag — defeats rollback capability.

---

## Interview Questions

**Q: What is the difference between a Deployment and a StatefulSet?**  
Deployments manage stateless pods — pods are interchangeable and can be replaced freely. StatefulSets maintain stable pod identities (stable hostname, ordered deployment/scaling) for stateful apps like databases.

**Q: How does Kubernetes achieve self-healing?**  
The `kube-controller-manager` continuously reconciles desired state (in etcd) with actual state. If a pod crashes, the ReplicaSet controller creates a replacement. Liveness probes trigger container restarts. Node failures cause pods to be rescheduled.

**Q: What is the role of etcd?**  
etcd is a consistent, distributed key-value store that holds all cluster state — pod specs, service definitions, node status, secrets. It is the single source of truth. Loss of etcd = loss of cluster state.

---

## Cheat Sheet

```
kubectl get pods/deployments/services/nodes
kubectl describe pod <name>
kubectl logs <pod> -f
kubectl exec -it <pod> -- bash
kubectl apply -f manifest.yaml
kubectl delete -f manifest.yaml
kubectl scale deployment <name> --replicas=3
kubectl rollout undo deployment/<name>
kubectl port-forward svc/<name> localPort:svcPort
```

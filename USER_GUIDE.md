# Certificate Store – User Guide

## 1. Overview

The Certificate Store application is a full-stack system designed to demonstrate a modern DevOps workflow using containerization, CI/CD pipelines, Kubernetes deployment, and GitOps-based continuous delivery.

The system consists of the following components:

- Angular Frontend
- ASP.NET Backend API
- MCP service
- MongoDB database
- Docker containers
- Kubernetes cluster
- GitHub Actions CI pipeline
- GitHub Container Registry (GHCR)
- ArgoCD GitOps deployment

The application allows managing certificate-related data through a web interface connected to a backend service and a MongoDB database.

---

# 2. System Architecture

The system architecture follows a microservice-oriented approach and is deployed on Kubernetes.

Main components:

Frontend:
Angular web application providing the user interface.

Backend API:
ASP.NET Web API responsible for business logic and communication with the database.

MCP Service:
Auxiliary service responsible for additional processing tasks.

Database:
MongoDB deployed using a Helm chart.

Containerization:
Each service is containerized using Docker.

Deployment Platform:
Kubernetes cluster (Docker Desktop Kubernetes).

Continuous Integration:
GitHub Actions builds and publishes Docker images.

Container Registry:
GitHub Container Registry (GHCR).

Continuous Delivery:
ArgoCD monitors the Git repository and deploys the application automatically using GitOps.

---

# 3. CI/CD Pipeline

The CI/CD workflow is implemented using GitHub Actions and ArgoCD.

## Continuous Integration (CI)

Whenever code is pushed to the main branch:

1. GitHub Actions starts a workflow
2. Backend and MCP projects are built using .NET
3. Frontend is built using Node.js
4. Docker images are created
5. Images are pushed to GitHub Container Registry

Docker images:
ghcr.io/kriszta360/certificate-api
ghcr.io/kriszta360/certificate-frontend
ghcr.io/kriszta360/certificate-mcp


## Continuous Delivery (CD)

ArgoCD continuously monitors the GitHub repository.

When changes are detected in the `k8s` directory:

1. ArgoCD detects the change
2. Kubernetes manifests are applied
3. The cluster is synchronized with the repository state

This follows the **GitOps deployment model**.

---

# 4. Kubernetes Deployment

The application is deployed in Kubernetes using manifest files located in the `k8s` directory.

Main Kubernetes resources:

- Deployments
- Services
- MongoDB Helm deployment

Services deployed in the cluster:
certificate-api
certificate-frontend
certificate-mcp
mongo
mongo-mongodb


Each component runs in its own container and communicates internally inside the Kubernetes cluster.

---

# 5. MongoDB Deployment

MongoDB is deployed using a Helm chart from the Bitnami repository.

Installation command:helm install mongo bitnami/mongodb


The database is automatically configured inside the cluster and used by the backend services.

---

# 6. ArgoCD GitOps Deployment

ArgoCD is used for automated deployment.

Installation:
kubectl create namespace argocd

kubectl apply -n argocd -f
https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml


After installation, the ArgoCD UI can be accessed via port forwarding.

Example:kubectl port-forward svc/argocd-server -n argocd 8080:443


Access URL:https://localhost:8080


ArgoCD monitors the Git repository:https://github.com/Kriszta360/certificate-store


Application configuration:

Repository:
GitHub repository

Path:
`k8s`

Cluster:
in-cluster

Namespace:
default

When synchronized, the system status becomes:
Healthy
Synced


---

# 7. Running Application

Once deployed, the following components run in the Kubernetes cluster:
certificate-api
certificate-frontend
certificate-mcp
mongo
mongo-mongodb


These services communicate internally using Kubernetes networking.

The frontend communicates with the backend API, which in turn interacts with MongoDB.

---

# 8. Summary

This project demonstrates a modern DevOps deployment workflow including:

- Full-stack application development
- Docker containerization
- GitHub Actions CI pipeline
- Container image publishing to GHCR
- Kubernetes deployment
- MongoDB Helm deployment
- ArgoCD GitOps continuous delivery

The system automatically builds, deploys, and synchronizes application state using a GitOps-based workflow.


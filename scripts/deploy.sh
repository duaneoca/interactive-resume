#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# deploy.sh — Manual deploy (bypasses GitHub Actions)
# Useful for quick iterations or if CI isn't set up yet.
#
# Usage:
#   DOMAIN=yourdomain.com ./scripts/deploy.sh
# ─────────────────────────────────────────────────────────────
set -euo pipefail

DOMAIN="${DOMAIN:-YOUR_DOMAIN_HERE}"
REGISTRY="ghcr.io/duaneoca"
TAG="${1:-latest}"

echo "==> Building and pushing images (tag: ${TAG})..."

docker build -t "${REGISTRY}/interactive-resume-frontend:${TAG}" ./frontend
docker build -t "${REGISTRY}/interactive-resume-backend:${TAG}" ./backend

docker push "${REGISTRY}/interactive-resume-frontend:${TAG}"
docker push "${REGISTRY}/interactive-resume-backend:${TAG}"

echo "==> Applying k8s manifests..."
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/cert-issuer.yaml

# Substitute domain placeholder if needed
sed "s/YOUR_DOMAIN_HERE/${DOMAIN}/g" k8s/ingress.yaml | kubectl apply -f -
sed "s/YOUR_DOMAIN_HERE/${DOMAIN}/g" k8s/backend-deployment.yaml | kubectl apply -f -
kubectl apply -f k8s/frontend-deployment.yaml

echo "==> Restarting deployments..."
kubectl rollout restart deployment/frontend -n resume
kubectl rollout restart deployment/backend -n resume

echo "==> Waiting for rollout..."
kubectl rollout status deployment/frontend -n resume --timeout=120s
kubectl rollout status deployment/backend -n resume --timeout=120s

echo ""
echo "  Deploy complete. Pods:"
kubectl get pods -n resume

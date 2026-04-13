#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# provision.sh — Fresh Linode (Ubuntu 22.04) → k3s + ingress + cert-manager
#
# Usage:
#   ssh root@YOUR_LINODE_IP "bash -s" < scripts/provision.sh
#
# After this runs:
#   1. Copy the printed kubeconfig to your local ~/.kube/config
#   2. Base64-encode it and store as the KUBECONFIG_DATA GitHub secret:
#      cat ~/.kube/config | base64 | tr -d '\n'
# ─────────────────────────────────────────────────────────────
set -euo pipefail

INGRESS_NGINX_VERSION="4.11.3"
CERT_MANAGER_VERSION="v1.16.1"

echo "==> [1/7] Updating system packages..."
apt-get update -q && apt-get upgrade -y -q

echo "==> [2/7] Installing k3s..."
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--disable traefik" sh -
# (disabling traefik because we'll use ingress-nginx instead)

echo "==> Waiting for k3s to be ready..."
until kubectl --kubeconfig /etc/rancher/k3s/k3s.yaml get nodes 2>/dev/null \
  | grep -q " Ready"; do
  sleep 3
done
echo "    k3s is ready."

echo "==> [3/7] Configuring kubeconfig..."
mkdir -p /root/.kube
cp /etc/rancher/k3s/k3s.yaml /root/.kube/config
chmod 600 /root/.kube/config
export KUBECONFIG=/root/.kube/config

echo "==> [4/7] Installing Helm..."
curl -fsSL https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

echo "==> [5/7] Installing ingress-nginx..."
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace \
  --version "${INGRESS_NGINX_VERSION}" \
  --set controller.service.type=LoadBalancer \
  --set controller.service.externalTrafficPolicy=Local \
  --wait --timeout 5m

echo "==> [6/7] Installing cert-manager..."
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --version "${CERT_MANAGER_VERSION}" \
  --set installCRDs=true \
  --wait --timeout 5m

echo "==> [7/7] Creating resume namespace..."
kubectl create namespace resume --dry-run=client -o yaml | kubectl apply -f -

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Provisioning complete!"
echo ""
echo "  Next steps:"
echo "  1. Point your domain's A record to this server's IP:"
echo "     $(curl -s ifconfig.me 2>/dev/null || echo '<run: curl ifconfig.me>')"
echo ""
echo "  2. Copy kubeconfig to your local machine:"
echo "     scp root@<server-ip>:/root/.kube/config ~/.kube/config"
echo ""
echo "  3. Store base64-encoded kubeconfig as GitHub secret KUBECONFIG_DATA:"
echo "     cat ~/.kube/config | base64 | tr -d '\\n'"
echo ""
echo "  4. Apply cert-manager ClusterIssuer:"
echo "     kubectl apply -f k8s/cert-issuer.yaml"
echo ""
echo "  5. Create the API key secret:"
echo "     kubectl create secret generic resume-secrets \\"
echo "       --namespace resume \\"
echo "       --from-literal=anthropic-api-key=YOUR_KEY"
echo ""
echo "  6. Push to main — GitHub Actions handles the rest."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

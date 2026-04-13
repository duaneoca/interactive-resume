# interactive-resume

A personal interactive resume website with an AI chat assistant, deployed on k3s (Kubernetes) on Linode with automatic SSL via Let's Encrypt and CI/CD via GitHub Actions.

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Python / FastAPI |
| AI | Anthropic Claude Haiku (via API) |
| Container | Docker (multi-stage builds) |
| Orchestration | k3s (lightweight Kubernetes) |
| Ingress | ingress-nginx |
| TLS | cert-manager + Let's Encrypt |
| Registry | GitHub Container Registry (GHCR) |
| CI/CD | GitHub Actions |
| DNS / Proxy | Cloudflare |

## Project Structure

```
interactive-resume/
├── .github/workflows/deploy.yml   # CI/CD pipeline
├── frontend/                      # React app (served by nginx)
│   ├── src/
│   │   ├── components/            # Resume section components
│   │   ├── data/resume.js         # All resume content (single source of truth)
│   │   └── App.jsx
│   ├── Dockerfile
│   └── nginx.conf
├── backend/                       # FastAPI chat proxy
│   ├── knowledge/resume.md        # AI knowledge base (expand via Q&A)
│   ├── main.py
│   └── Dockerfile
├── k8s/                           # Kubernetes manifests
│   ├── namespace.yaml
│   ├── frontend-deployment.yaml
│   ├── backend-deployment.yaml
│   ├── ingress.yaml
│   ├── cert-issuer.yaml
│   └── secret-template.yaml
└── scripts/
    ├── provision.sh               # Fresh Linode → k3s setup
    └── deploy.sh                  # Manual deploy (bypasses CI)
```

## First-Time Setup

### 1. Provision a Linode

Create a Nanode (1 GB) or shared-CPU instance running Ubuntu 22.04. Then run:

```bash
ssh root@YOUR_LINODE_IP "bash -s" < scripts/provision.sh
```

This installs k3s, ingress-nginx, cert-manager, and creates the `resume` namespace.

### 2. Point your domain at the server

In Cloudflare, create an A record:

```
yourdomain.com  →  YOUR_LINODE_IP
```

Set the proxy status to **DNS only** (grey cloud) initially — switch to proxied after SSL is confirmed working.

### 3. Update the domain placeholder

Replace `YOUR_DOMAIN_HERE` in these files with your actual domain:

- `k8s/ingress.yaml`
- `k8s/backend-deployment.yaml`

### 4. Apply the cert-manager ClusterIssuer

```bash
kubectl apply -f k8s/cert-issuer.yaml
```

### 5. Create the API key secret

```bash
kubectl create secret generic resume-secrets \
  --namespace resume \
  --from-literal=anthropic-api-key=YOUR_ANTHROPIC_KEY
```

### 6. Set GitHub secrets

In your repo → Settings → Secrets and variables → Actions:

| Secret | Value |
|---|---|
| `KUBECONFIG_DATA` | `cat ~/.kube/config \| base64 \| tr -d '\n'` |

The `GITHUB_TOKEN` secret is automatic and handles GHCR authentication.

### 7. Push to main

```bash
git push origin main
```

GitHub Actions builds both Docker images, pushes them to GHCR, and deploys to your cluster.

## Local Development

```bash
# Frontend
cd frontend
npm install
npm run dev          # http://localhost:5173

# Backend (optional — needed only for AI chat)
cd backend
pip install -r requirements.txt
ANTHROPIC_API_KEY=your_key uvicorn main:app --reload
```

The Vite dev server proxies `/api/` to `localhost:8000` automatically.

## Updating Resume Content

Resume data lives in two places:

- `frontend/src/data/resume.js` — structured data for the UI
- `backend/knowledge/resume.md` — narrative knowledge base for the AI

Edit both when you update your resume. The markdown file will grow richer over time through Q&A sessions that add depth and context beyond what the PDF contains.

## Roadmap

- [x] Static web resume with interactive click-to-expand sections
- [x] Infrastructure: Docker, k3s, ingress-nginx, cert-manager, GitHub Actions
- [ ] AI chat backend — wire up FastAPI + Claude Haiku
- [ ] Connect DetailPanel "Ask about this" button to live chat
- [ ] Expand `knowledge/resume.md` through Q&A sessions
- [ ] Floating chat interface (ChatFab → full chat UI)

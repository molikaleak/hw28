# CI/CD Deployment Setup

## Overview
This project has been configured with complete CI/CD pipelines for both frontend and backend deployment.

## Workflows Created

### 1. Frontend CI/CD (.github/workflows/frontend.yml)
- **Trigger**:
  - Push to `main` branch with changes in `frontend/` directory
  - Pull requests to `main` branch
  - Manual trigger via workflow_dispatch
- **Platform**: Vercel (with fallback to build artifacts)
- **Jobs**:
  1. **Build and Test**:
     - Setup Node.js 20
     - Install dependencies
     - Run linting
     - Build project
     - Upload build artifacts
  2. **Deploy to Vercel** (main branch only):
     - Install Vercel CLI
     - Deploy to Vercel production (if VERCEL_TOKEN is set)
  3. **Alternative Deployment** (main branch only):
     - Create deployment package
     - Upload artifacts for manual deployment
- **Features**:
  - CI on pull requests
  - CD on main branch
  - Graceful handling of missing Vercel token
  - Build artifacts for alternative hosting

### 2. Backend CI/CD (.github/workflows/backend.yml)
- **Trigger**: Push to `main` branch with changes in `backend/` directory
- **Platform**: GitHub Container Registry (GHCR) + Render
- **Steps**:
  1. Checkout code
  2. Set up JDK 17
  3. Log in to GHCR
  4. Build and push Docker image using Jib
  5. Build JAR file for Dockerfile compatibility
  6. Deploy to Render (if on main branch)

### 3. Backend CD (Bonus) (.github/workflows/cd-backend.yml)
- **Trigger**: When a new package is published to GHCR
- **Platform**: Render
- **Steps**: Auto-deploy to Render when new image is available

## Docker Configuration

### Backend:
- **Dockerfile**: `backend/Dockerfile` - For building Spring Boot application
- **docker-compose.yml**: `backend/docker-compose.yml` - For local development with PostgreSQL
- **Jib Configuration**: In `pom.xml` for containerization without Dockerfile

### Frontend:
- **Dockerfile**: `frontend/Dockerfile` - For building Next.js application
- **docker-compose.yml**: `frontend/docker-compose.yml` - For local development

## Required Secrets

### For Frontend Deployment:
- `VERCEL_TOKEN`: Vercel authentication token (required for Vercel deployment)
- `VERCEL_ORG_ID`: Vercel organization ID (optional, for team projects)
- `VERCEL_PROJECT_ID`: Vercel project ID (optional)

**Note**: The frontend workflow will still build and test even without Vercel tokens. Deployment to Vercel only occurs if `VERCEL_TOKEN` is set.

### For Backend Deployment:
- `RENDER_SERVICE_ID`: Render service ID
- `RENDER_API_KEY`: Render API key
- `GITHUB_TOKEN`: Automatically provided by GitHub Actions

### Optional (for Railway alternative):
- `RAILWAY_TOKEN`: Railway authentication token

## Database Configuration
The backend is configured to connect to PostgreSQL with environment variables:
- `DATABASE_URL`: JDBC URL for PostgreSQL
- `DATABASE_USERNAME`: Database username
- `DATABASE_PASSWORD`: Database password

## Health Endpoints
- **Frontend**: Public URL from Vercel deployment
- **Backend Health Check**: `GET /api/health` (checks database connectivity)
- **Backend Hello Endpoint**: `GET /api/hello`

## Submission Checklist

### 1. GitHub Repository
- [ ] Repository contains all workflow files in `.github/workflows/`
- [ ] Workflow files: `frontend.yml`, `backend.yml`, `cd-backend.yml`

### 2. Live Frontend URL
- [ ] Vercel deployment URL (requires `VERCEL_TOKEN` secret)
- [ ] Publicly accessible

### 3. Live Backend URL + Endpoints
- [ ] Render/Railway deployment URL
- [ ] `GET /api/health` endpoint working
- [ ] `GET /api/hello` endpoint working
- [ ] Database connectivity verified

### 4. GitHub Actions Workflow Runs
- [ ] Frontend workflow successful run
- [ ] Backend workflow successful run
- [ ] CD workflow (bonus) successful run

## Testing Locally

### Frontend:
```bash
cd frontend
npm run build
npm start
```

### Backend:
```bash
cd backend
./mvnw spring-boot:run
```

### Test Endpoints:
```bash
# Health check
curl http://localhost:8080/api/health

# Hello endpoint
curl http://localhost:8080/api/hello
```

## Notes
- The frontend and backend are deployed independently as per requirements
- Database connectivity is configured but requires a PostgreSQL instance
- The bonus CD workflow triggers on new image pushes to GHCR
- All workflows are configured but require proper secrets to run successfully
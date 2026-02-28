# HW9 CI/CD Deployment Guide

This repository contains a Next.js frontend and a Spring Boot backend, set up with GitHub Actions CI/CD to deploy to Vercel and GitHub Container Registry (GHCR) respectively.

## Project Structure
- `frontend/`: Next.js React application
- `backend/`: Spring Boot Java application
- `.github/workflows/`: GitHub Actions workflows

## Deployment Requirements

### **1. GitHub Repository Setup**
This code must be in a Git repository hosted on GitHub to use GitHub Actions.

### **2. Frontend Deployment (Vercel)**

1. **Create a Vercel Project**:
   - Go to [Vercel](https://vercel.com/) and create an account if needed.
   - Do **NOT** connect via GitHub directly (we are using the CLI flow in Actions).
   - In your local terminal, navigate to the `frontend` directory and run:
     ```bash
     npm install -g vercel
     vercel id
     ```
   - Follow the prompts to link to a Vercel project. This will create a `.vercel/project.json` file.
   - You need the `projectId` and `orgId` from that `.vercel` folder or your Vercel dashboard.

2. **Add GitHub Secrets**:
   - Go to your GitHub repository -> **Settings** -> **Secrets and variables** -> **Actions**.
   - Add the following secrets:
     - `VERCEL_TOKEN`: You can generate this in your Vercel account settings (Tokens).
     - `VERCEL_ORG_ID`: Your Vercel organization ID.
     - `VERCEL_PROJECT_ID`: Your Vercel project ID.

3. **Deploy via GitHub Actions**:
   - The `.github/workflows/frontend.yml` requires these secrets. *Note: As currently written, the workflow uses just VERCEL_TOKEN, assuming project links are pushed. For robust deployments, Vercel often requires `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` as environment variables if the `.vercel` folder isn't committed.*

### **3. Backend Deployment (GHCR + Render/Railway)**

1. **Publish to GitHub Container Registry (GHCR)**:
   - The `.github/workflows/backend.yml` will automatically build and push the Docker image to GHCR whenever changes are pushed to `main`.
   - The image will be accessible at `ghcr.io/YOUR_GITHUB_USERNAME/backend:latest`.

2. **Database Setup (Neon/Render/Railway)**:
   - Create a free PostgreSQL database (e.g., on Neon, Render, or Railway).
   - Get the connection string (JDBC URL), username, and password.

3. **Render/Railway Deployment**:
   - In Render, create a new **Web Service**.
   - Choose **Deploy an existing image from a registry**.
   - Input your GHCR image URL: `ghcr.io/YOUR_GITHUB_USERNAME/backend:latest`
     *(Note: You may need to make the GitHub Package public in your GitHub profile settings under Packages -> backend -> Settings, or provide registry credentials to Render).*
   - **Environment Variables**: Add the following to your Render/Railway service:
     - `DATABASE_URL`: `jdbc:postgresql://your-db-host:5432/your-db-name`
     - `DATABASE_USERNAME`: `your-db-user`
     - `DATABASE_PASSWORD`: `your-db-password`
     - `SERVER_PORT`: `8080` (Spring Boot default port)

## Endpoints

- **Frontend**: `[Your Vercel URL]`
- **Backend Test**: `[Your Render URL]/api/hello`

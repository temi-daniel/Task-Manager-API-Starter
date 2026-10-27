# Task Manager API

A small Node.js + Express REST API to use as the application for a beginner DevOps portfolio project.

## Requirements

- Node.js 20 or newer
- npm
- Git (for version control)

## Run locally

1. Open this folder in VS Code.
2. Open a terminal in the project folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the tests:

   ```bash
   npm test
   ```

5. Start the API:

   ```bash
   npm start
   ```

6. Open `http://localhost:3000` in your browser. Health check: `http://localhost:3000/health`.

Stop the server with `Ctrl+C`.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Show API welcome message and endpoint list |
| GET | `/health` | Health check for later Kubernetes probes |
| GET | `/api/tasks` | List all tasks |
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks/:id` | Get one task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### Example requests

Create a task:

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Docker"}'
```

List tasks:

```bash
curl http://localhost:3000/api/tasks
```

Mark task 1 complete:

```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

Delete task 1:

```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

On Windows PowerShell, `curl` can be an alias. If the examples behave unexpectedly, use `curl.exe` instead.

## Important limitations

- This starter uses in-memory storage, so tasks are erased when the application restarts.
- It has no login/authentication and is intended for learning, not production use.
- Do not add real passwords, API keys, or other secrets to this repository.

## Your DevOps learning path

Do not build everything at once. Use this application as the starting point, then do the DevOps work yourself:

1. Run the API locally and make sure `npm test` passes.
2. Create a GitHub repository and push the source code.
3. Write your own `Dockerfile` and build/run a container.
4. Create a GitHub Actions workflow for tests and Docker image build.
5. Add Trivy image scanning and publish images to Amazon ECR.
6. Deploy to a local Kubernetes cluster using your own manifests.
7. Add Argo CD for GitOps.
8. Add Prometheus and Grafana.
9. Test pod recovery and implement a clearly defined failed-deployment rollback strategy.
10. Move to AWS EKS only after the local workflow works; remember that EKS and supporting resources can cost money.

## Suggested repository structure after you add DevOps files

```text
task-manager-api/
├── src/
│   ├── app.js
│   └── server.js
├── test/
│   └── app.test.js
├── k8s/                 # You will create this
├── argocd/              # You will create this
├── .github/workflows/   # You will create this
├── Dockerfile           # You will create this
├── .dockerignore
├── .gitignore
├── package.json
├── package-lock.json    # Created by npm install
└── README.md
```

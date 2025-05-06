# k6 Load Testing Framework (Docker-based)

A modular load testing environment using [Grafana k6](https://k6.io/), Docker Compose, environment variables, and Docker secrets.

---

## Quick Start

1. Create a `.env` file:

```env
   API_BASE_URL=https://api.example.com
   SCRIPTS_PATH=./scripts
   CONFIG_PATH=./data
   EXPORTS_PATH=./exports
```

2. or copy from template

```bash
cp template.env .env
```

-use relative or absolute path for the testing scripts

-config path is for external configs for k6 to use which get mounted from a configured directory

## Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/your-org/k6-load-tests.git
   cd k6-load-tests

   mkdir -p .secrets
   echo "your_token_secret" > .secrets/TOKEN_SECRET

   docker-compose build

   docker-compose up
   ```

---

## ✅ TODO

- [ ] Implement bulk testing
  - [ ] running scripts from a shell script that can be swapped and changed as needed
- [X] Open k6 dashboard to an accessible port
- [X] Export k6 results to JSON/CSV and mount to `reports/`

---

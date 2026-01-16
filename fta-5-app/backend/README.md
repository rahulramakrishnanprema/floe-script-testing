# Difference API Backend

This repository contains a lightweight FastAPI backend that exposes a single endpoint to calculate the difference between two numbers. The API is designed to be consumed by a frontend application (e.g., React/Vite) and includes CORS support for cross‑origin requests.

## Prerequisites

- Python 3.10 or newer
- `pip` (Python package installer)

## Setup & Installation

1. **Create a virtual environment** (recommended):
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows use `.venv\Scripts\activate`
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## Running the API

You can start the development server with automatic reload using the following command:

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`. You can test the health‑check endpoint:

```bash
curl http://localhost:8000/
```

## API Documentation

FastAPI automatically generates interactive API docs. Once the server is running, visit:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### POST /api/difference

**Request Body** (JSON):
```json
{
  "a": 10,
  "b": 4
}
```

**Response** (JSON):
```json
{
  "difference": 6
}
```

The endpoint returns the absolute difference between the two provided numbers.

## Testing

You can run a quick test using `curl` or any HTTP client:

```bash
curl -X POST http://localhost:8000/api/difference \
     -H "Content-Type: application/json" \
     -d '{"a": 15, "b": 5}'
```

Expected output:
```json
{"difference":10}
```

## Environment Variables

The current implementation does not require any environment variables. If you wish to customize the host or port, you can modify the `uvicorn.run` call in `main.py` or use the `--host` and `--port` command‑line options.

## License

MIT License

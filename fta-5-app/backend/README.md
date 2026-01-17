# Difference API

This repository contains a lightweight **FastAPI** service that exposes two endpoints:

* **POST** `/api/difference` – Computes the difference between the maximum and minimum values in a list of numbers.
* **GET** `/health` – Health‑check endpoint that returns a simple status message.

## Prerequisites

* Python 3.9 or newer
* `pip` (Python package installer)

## Installation

```bash
# Clone the repository (if you haven't already)
# git clone <repository-url>
# cd <repository-directory>

# Create a virtual environment (recommended)
python -m venv .venv
source .venv/bin/activate  # On Windows use `.venv\Scripts\activate`

# Install dependencies
pip install -r backend/requirements.txt
```

## Running the Service

```bash
# From the repository root
uvicorn backend.main:app --host 0.0.0.0 --port 8000
```

The service will be available at `http://localhost:8000`.

## API Usage

### Health Check

```http
GET /health HTTP/1.1
Host: localhost:8000

# Response
{
  "status": "ok"
}
```

### Compute Difference

```http
POST /api/difference HTTP/1.1
Host: localhost:8000
Content-Type: application/json

{
  "numbers": [1.5, 3.2, 7.8, 2.0]
}

# Response
{
  "difference": 6.3
}
```

The request body must contain a JSON object with a single key `numbers` that maps to an array of at least two numeric values.

## Testing the Endpoint (curl example)

```bash
curl -X POST http://localhost:8000/api/difference \
     -H "Content-Type: application/json" \
     -d '{"numbers": [10, 4, 7]}'
```

## License

This project is licensed under the MIT License.

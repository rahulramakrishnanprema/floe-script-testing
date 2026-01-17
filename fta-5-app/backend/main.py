#!/usr/bin/env python3
"""FastAPI application providing a numeric difference API.

This service exposes two endpoints:

1. **POST /api/difference** – Accepts a JSON payload containing a list of numbers and returns the difference between the maximum and minimum values.
2. **GET /health** – Simple health‑check endpoint that returns a JSON object indicating the service is running.

The application uses Pydantic for request validation and FastAPI for routing.
"""

from typing import List

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="Difference API", description="Compute the difference between the max and min of a list of numbers.")


class DifferenceRequest(BaseModel):
    """Request model for the /api/difference endpoint.

    Attributes
    ----------
    numbers : List[float]
        A list of numeric values. The list must contain at least two numbers.
    """

    numbers: List[float] = Field(..., description="List of numbers to compute the difference for.")

    def __post_init__(self) -> None:  # pragma: no cover
        if len(self.numbers) < 2:
            raise ValueError("At least two numbers are required to compute a difference.")


@app.post("/api/difference", summary="Compute numeric difference")
async def compute_difference(request: DifferenceRequest) -> dict:
    """Return the difference between the maximum and minimum values in the provided list.

    Parameters
    ----------
    request : DifferenceRequest
        The validated request payload.

    Returns
    -------
    dict
        JSON object containing the computed difference.
    """
    numbers = request.numbers
    max_val = max(numbers)
    min_val = min(numbers)
    difference = max_val - min_val
    return {"difference": difference}


@app.get("/health", summary="Health check")
async def health_check() -> dict:
    """Simple health‑check endpoint.

    Returns
    -------
    dict
        JSON object indicating the service status.
    """
    return {"status": "ok"}


# If the module is executed directly, start the Uvicorn server.
# This block is optional and can be omitted if the user prefers to run uvicorn manually.
if __name__ == "__main__":  # pragma: no cover
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="Difference API", description="Calculate the difference between two numbers.")

# Allow CORS for all origins (adjust in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DifferenceRequest(BaseModel):
    """Request payload for the /api/difference endpoint."""
    a: float = Field(..., description="First numeric value")
    b: float = Field(..., description="Second numeric value")

class DifferenceResponse(BaseModel):
    """Response payload containing the calculated difference."""
    difference: float

@app.post("/api/difference", response_model=DifferenceResponse, status_code=status.HTTP_200_OK)
async def calculate_difference(req: DifferenceRequest) -> DifferenceResponse:
    """Return the absolute difference between two numbers.

    Parameters
    ----------
    req : DifferenceRequest
        The request body containing two numeric values.

    Returns
    -------
    DifferenceResponse
        The absolute difference between ``a`` and ``b``.
    """
    try:
        diff = abs(req.a - req.b)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error calculating difference: {exc}",
        )
    return DifferenceResponse(difference=diff)

@app.get("/", status_code=status.HTTP_200_OK)
async def read_root() -> dict:
    """Health check endpoint."""
    return {"message": "Difference API is running."}

# If run directly, start the server with uvicorn
if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

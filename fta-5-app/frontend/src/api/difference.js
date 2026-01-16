export async function calculateDifference(a, b) {
  const response = await fetch('/api/difference', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ a, b })
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to calculate difference');
  }
  const data = await response.json();
  return data.difference;
}
import { useState } from 'react';
import DifferenceForm from '../components/DifferenceForm';

export default function Home() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Difference Calculator</h1>
      <DifferenceForm onResult={setResult} />
      {result !== null && (
        <div className="mt-6 p-4 bg-green-100 rounded">
          <p className="text-lg">The difference is: <span className="font-mono">{result}</span></p>
        </div>
      )}
    </div>
  );
}
    import React, { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      setResponse('Error fetching AI response');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>IA Chat App</h1>
      <textarea
        rows={4}
        placeholder="Escribe tu pregunta..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: '100%', padding: '10px' }}
      />
      <button onClick={handleAsk} disabled={loading}>
        {loading ? 'Consultando...' : 'Preguntar'}
      </button>
      <div style={{ marginTop: '2rem' }}>
        <h3>Respuesta:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;

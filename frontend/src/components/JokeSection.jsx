import React, { useState } from 'react';
import { getJoke } from '../services/api';

export default function JokeSection() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetJoke = async () => {
    setLoading(true);
    setError('');
    setJoke('');
    try {
      const res = await getJoke();
      setJoke(res.data.value);
    } catch (err) {
      setError('No se pudo obtener el chiste. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">
      <h2>😂 Chuck Norris Jokes</h2>
      <button className="btn btn-primary" onClick={handleGetJoke} disabled={loading}>
        {loading ? 'Cargando...' : 'Obtener chiste'}
      </button>

      {error && <p className="error">{error}</p>}
      {joke && (
        <div className="joke-box">
          <p>{joke}</p>
        </div>
      )}
    </section>
  );
}

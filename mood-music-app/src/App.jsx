import React, { useState } from 'react';
import './App.css';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyDMryOCHpwvxSmf8FbHuhNrohlYZ_BeJfU"); // 👈 Replace with your actual API key

function App() {
  const [mood, setMood] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!mood.trim()) return;
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `You are a music mood expert. Based on the following mood, give me a list of exactly 5 songs that match it. Do not explain them or include any descriptions. Just list the song names and artists.\n\nMood: ${mood}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setSuggestion(text);
    } catch (error) {
      console.error('Error generating music suggestion:', error);
      setSuggestion('Oops! Something went wrong.');
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>Mood-to-Music Recommender 🎵</h1>
      <input
        type="text"
        placeholder="How are you feeling today?"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Thinking...' : 'Get Playlist Suggestion'}
      </button>
      {suggestion && (
        <div className="suggestion-box">
          <h3>🎧 Your Music Match:</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{suggestion}</p>
        </div>
      )}
    </div>
  );
}

export default App;

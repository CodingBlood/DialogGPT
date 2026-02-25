import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('http://127.0.0.1:8000')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            }).catch((err) => console.error(err));
    }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{data.message}</h1>
    </>
  )
}

export default App

import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState<string>('Loading...')

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setData(data.message))
      .catch((err) => setData('Error: ' + err))
  }, [])

  return (
    <div className="app-container">
      <h1>mda_commerce</h1>
      <p>Frontend: React + TypeScript</p>
      <div className="status-box">
        <p>Backend Status: <strong>{data}</strong></p>
      </div>
    </div>
  )
}

export default App

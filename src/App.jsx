import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomeView from './views/HomeView'
import MapView1 from './views/MapView1'

function App() {
  return (
    <Router>
      <nav className="flex gap-4 justify-center">
        <Link
          to="/"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
        >
          HomeView
        </Link>
        <Link
          to="/MapView1"
          className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition"
        >
          MapView1
        </Link>
      </nav>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/MapView1" element={<MapView1 />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

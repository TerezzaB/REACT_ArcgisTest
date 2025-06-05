import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomeView from './views/HomeView'
import MapView1 from './views/MapView1'
import MapView2 from './views/MapView2'
import MapView3 from './views/MapView3'

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
         <Link
          to="/MapView2"
          className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition"
        >
          MapView2
        </Link>
        <Link
          to="/MapView3"
          className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition"
        >
          MapView3
        </Link>
      </nav>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/MapView1" element={<MapView1 />} />
          <Route path="/MapView2" element={<MapView2 />} />
          <Route path="/MapView3" element={<MapView3 />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

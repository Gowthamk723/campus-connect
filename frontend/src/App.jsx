import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import PostItem from './pages/PostItem'; // 👈 Import the real page

// Placeholders
const Home = () => <div className="p-10 text-white text-center text-xl">🏠 Home Feed (Coming Soon)</div>;
const Register = () => <div className="p-10 text-white text-center text-xl">📝 Register Page (Coming Soon)</div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post" element={<PostItem />} /> {/* 👈 Ensure this is set */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
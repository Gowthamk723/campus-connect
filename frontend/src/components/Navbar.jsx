import { Link } from 'react-router-dom';
import { Camera, LogIn, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
          {/* Mobile Icon */}
          <Menu className="text-slate-400 sm:hidden" /> 
          CampusConnect
        </Link>

        {/* Buttons */}
        <div className="flex items-center gap-6">
          <Link to="/post" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all text-sm font-medium">
            <Camera size={18} />
            <span className="hidden sm:inline">Post Item</span>
          </Link>

          <Link to="/login" className="text-slate-300 hover:text-white flex items-center gap-2 transition-colors">
            <LogIn size={20} />
            <span className="hidden sm:inline">Login</span>
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
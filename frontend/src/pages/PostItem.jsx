import { useState } from 'react';
import { Camera, MapPin, Loader, Sparkles } from 'lucide-react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const PostItem = () => {
  const navigate = useNavigate();
  
  // State for the form
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: 'Lost', // Default
    date: new Date().toISOString().split('T')[0]
  });

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Show preview
    }
  };

  // 🧠 THE AI MAGIC
  const handleAnalyze = async () => {
    if (!image) return alert("Please upload an image first!");
    
    setAnalyzing(true);
    try {
      // Create FormData to send file
      const data = new FormData();
      data.append('file', image);

      // Call your Backend Endpoint (Phase 4)
      const response = await api.post('/analyze', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Auto-fill the description with AI result
      if (response.data.description) {
        setFormData(prev => ({
          ...prev,
          description: response.data.description,
          title: "Found Item: " + response.data.description.split(' ').slice(0, 3).join(' ') + "..."
        }));
      } else {
        alert("AI could not describe the image. Try again.");
      }
      
    } catch (error) {
      console.error("AI Error:", error);
      alert("AI Service is offline (Check Colab!). Using manual entry.");
    } finally {
      setAnalyzing(false);
    }
  };

  // Handle Form Submit (Save to DB - We will build this backend part later)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // For now, we just simulate a success because we haven't built the 'create item' API yet
    setTimeout(() => {
      alert("Item Posted Successfully! (Simulation)");
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <Camera className="text-blue-500" /> Post Lost/Found Item
      </h1>

      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
        
        {/* 1. Image Upload Area */}
        <div className="mb-8 text-center">
          {preview ? (
            <div className="relative inline-block">
              <img src={preview} alt="Preview" className="max-h-64 rounded-lg shadow-lg border-2 border-slate-600" />
              <button 
                onClick={() => {setImage(null); setPreview(null)}}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-slate-600 border-dashed rounded-xl cursor-pointer hover:bg-slate-700/50 transition-all group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Camera className="w-10 h-10 mb-3 text-slate-400 group-hover:text-blue-400 transition-colors" />
                <p className="mb-2 text-sm text-slate-400">Click to upload photo</p>
              </div>
              <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
            </label>
          )}

          {/* AI Button */}
          {image && (
            <button 
              onClick={handleAnalyze}
              disabled={analyzing}
              type="button"
              className={`mt-4 px-6 py-2 rounded-full font-medium flex items-center gap-2 mx-auto transition-all ${
                analyzing ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-900/20'
              }`}
            >
              {analyzing ? <Loader className="animate-spin" size={18}/> : <Sparkles size={18}/>}
              {analyzing ? 'Analyzing Image...' : 'Auto-Generate Description'}
            </button>
          )}
        </div>

        {/* 2. The Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-1">Title</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
              placeholder="e.g. Blue Backpack"
            />
          </div>

          <div>
            <label className="block text-slate-400 text-sm font-medium mb-1">Description (AI Auto-filled)</label>
            <textarea 
              rows="3"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
              placeholder="Describe the item..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-1">Category</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
              >
                <option>Lost</option>
                <option>Found</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-slate-500" size={18} />
                <input 
                  type="text" 
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 pl-10 text-white focus:border-blue-500 outline-none"
                  placeholder="e.g. Library"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all"
          >
            {loading ? 'Posting...' : 'Post Item'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default PostItem;
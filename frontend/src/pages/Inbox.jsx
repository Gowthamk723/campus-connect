import { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { MessageCircle, User } from 'lucide-react';

const Inbox = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await api.get('/messages/conversations');
        setConversations(response.data);
      } catch (error) {
        console.error("Failed to load inbox", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <MessageCircle className="text-blue-500" /> My Messages
      </h1>

      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading chats...</div>
        ) : conversations.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            <p className="mb-2">No messages yet.</p>
            <p className="text-sm">When someone contacts you about an item, they will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-700">
            {conversations.map((email) => (
              <Link 
                key={email}
                to={`/chat/${email}`}
                className="flex items-center gap-4 p-5 hover:bg-slate-700/50 transition-colors"
              >
                <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {email.charAt(0).toUpperCase()}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">{email.split('@')[0]}</h3>
                  <p className="text-slate-400 text-sm">Click to view conversation</p>
                </div>

                <div className="text-blue-400">
                  <MessageCircle size={20} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';

const LiveSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    { text: 'Hello! I am Hamza Your AI assistant. How can I help you today?', sender: 'support' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    try {
      const newMessages = [...messages, { text: message, sender: 'user' }];
      setMessages(newMessages);
      setMessage('');
      setIsLoading(true);
      setError('');

      const response = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        text: data.reply, 
        sender: 'support' 
      }]);
    } catch (err) {
      console.error('Fetch Error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.div
        className={`bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-lg rounded-2xl shadow-2xl ${
          isOpen ? 'w-80 h-[500px] flex flex-col' : 'w-16 h-16'
        } transition-all duration-300 overflow-hidden`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        {/* Fixed Header */}
        <div className="sticky top-0 bg-primary z-10 bg-gradient-to-b from-primary/20 to-primary/5 backdrop-blur-md flex-shrink-0">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            {isOpen ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary-accent/20 rounded-full">
                    <FiMessageSquare className="text-primary-accent" />
                  </div>
                  <h3 className="text-lg font-semibold">Support</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Close chat"
                >
                  <FiX className="text-xl text-white" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsOpen(true)}
                className="w-full h-full flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
                aria-label="Open chat"
              >
                <FiMessageSquare className="text-2xl text-primary-accent" />
              </button>
            )}
          </div>
        </div>

  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex-1 flex flex-col"
      >
        {/* Scrollable messages container with fixed height */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-primary-accent/50
          [&::-webkit-scrollbar-thumb]:rounded-full
          hover:[&::-webkit-scrollbar-thumb]:bg-primary-accent/80">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex mb-[10px] ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-xl p-3 ${
                  msg.sender === 'user'
                    ? 'bg-primary-accent/20'
                    : 'bg-white/5'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <span className="text-xs opacity-50 mt-1 block">
                  {msg.sender === 'support' ? 'AI Assistant' : 'You'} • Now
                </span>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input field */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 flex-shrink-0">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full bg-white/10 text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent disabled:opacity-50 placeholder-white/50"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-label="Type your message"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-primary-accent text-black px-4 py-2 rounded-xl hover:bg-primary-accent/90 transition-colors flex items-center gap-2 disabled:opacity-50"
              aria-label="Send message"
              disabled={isLoading}
            >
              <FiSend />
            </button>
          </div>
        </form>
      </motion.div>
    )}
  </AnimatePresence>
</motion.div>

    </div>
  );
};

export default LiveSupport;
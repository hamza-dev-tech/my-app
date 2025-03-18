"use client";
import { AnimatePresence, motion } from "framer-motion";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { JetBrains_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { db } from "@/firebase"; // Firebase config
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import Link from "next/link";

const jetbrains = JetBrains_Mono({ subsets: ["latin"] });

const ArticlesPage = () => {
  const [newMessage, setNewMessage] = useState("");
  const [pins, setPins] = useState([]);
  const [showPins, setShowPins] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchPins = async () => {
      const querySnapshot = await getDocs(collection(db, "pins"));
      setPins(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPins();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      const querySnapshot = await getDocs(collection(db, "articles"));
      const fetchedArticles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setArticles(fetchedArticles);
    };
    fetchArticles();
  }, []);

  const handleAddPin = async () => {
    if (newMessage.trim()) {
      const newPin = {
        text: newMessage,
        author: "Anonymous",
        likes: 0,
        dislikes: 0,
        date: new Date().toLocaleDateString(),
        isLiked: false,
        isDisliked: false
      };
      const docRef = await addDoc(collection(db, "pins"), newPin);
      setPins([{ id: docRef.id, ...newPin }, ...pins]);
      setNewMessage("");
    }
  };

  const handleLike = async (id, currentLikes, isLiked, isDisliked) => {
    const pinRef = doc(db, "pins", id);
    const updatedLikes = isLiked ? currentLikes - 1 : currentLikes + 1;
    await updateDoc(pinRef, { likes: updatedLikes, isLiked: !isLiked, isDisliked: isLiked ? isDisliked : false });
    setPins(prev => prev.map(pin => (pin.id === id ? { ...pin, likes: updatedLikes, isLiked: !isLiked, isDisliked: isLiked ? isDisliked : false } : pin)));
  };

  const handleDislike = async (id, currentDislikes, isDisliked, isLiked) => {
    const pinRef = doc(db, "pins", id);
    const updatedDislikes = isDisliked ? currentDislikes - 1 : currentDislikes + 1;
    await updateDoc(pinRef, { dislikes: updatedDislikes, isDisliked: !isDisliked, isLiked: isDisliked ? isLiked : false });
    setPins(prev => prev.map(pin => (pin.id === id ? { ...pin, dislikes: updatedDislikes, isDisliked: !isDisliked, isLiked: isDisliked ? isLiked : false } : pin)));
  };

  // Function to generate slug from title
  const generateSlug = (title) => {
    return encodeURIComponent(title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <div className="md:glass-effect rounded-xl p-6 mb-8 border border-primary-accent/20">
          <h2 className={`${jetbrains.className} text-2xl font-bold mb-4 text-primary-accent`}>
            Share Your Thoughts 💭
          </h2>
          <div className="flex gap-4 flex-col">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write something nice..."
              className="flex-1 px-4 py-3 bg-transparent border-b-2 border-primary-accent/30 focus:border-primary-accent focus:outline-none text-primary-foreground"
            />
            <button
              onClick={handleAddPin}
              disabled={!newMessage.trim()}
              className="px-6 py-3 bg-transparent border w-[200px] border-primary-accent hover:bg-accent/90 text-primary-accent font-semibold rounded-lg transition-all disabled:opacity-50"
            >
              Pin It 📌
            </button>
          </div>
          <button
            onClick={() => setShowPins(!showPins)}
            className="mt-4 px-4 py-2 bg-primary-accent hover:bg-primary-accent/90 text-primary font-semibold rounded-lg transition-all"
          >
            {showPins ? "Hide Pins" : "Show Pins"}
          </button>
        </div>
      </div>

      {showPins && (
        <div className="max-w-6xl mx-auto px-4 pb-8">
          <div className="overflow-x-auto pb-4 bg-primary/10 rounded-lg p-4">
            <div className="flex gap-6 w-max min-h-[300px] px-4 snap-x">
              <AnimatePresence>
                {pins.map((pin) => (
                  <motion.div
                    key={pin.id}
                    className="glass-effect w-64 shrink-0 rounded-xl p-6 border border-primary-accent/20 relative snap-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ rotate: "-2deg" }}
                    layout
                  >
                    <p className="text-primary-foreground mb-4">{pin.text}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleLike(pin.id, pin.likes, pin.isLiked, pin.isDisliked)}
                          className={`flex items-center gap-1 ${pin.isLiked ? 'text-accent' : 'text-primary-foreground/60'}`}
                        >
                          <FiThumbsUp /> {pin.likes}
                        </button>
                        <button
                          onClick={() => handleDislike(pin.id, pin.dislikes, pin.isDisliked, pin.isLiked)}
                          className={`flex items-center gap-1 ${pin.isDisliked ? 'text-red-500' : 'text-primary-foreground/60'}`}
                        >
                          <FiThumbsDown /> {pin.dislikes}
                        </button>
                      </div>
                      <span className="text-primary-foreground/40 text-xs">{pin.date}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div key={article.id} className="glass-effect rounded-xl p-6 border border-primary-accent/20 hover:border-primary-accent/40 transition-all shadow-md">
            <h3 className="text-xl font-bold mb-1 text-primary-foreground">{article.title}</h3>
            <p className="text-sm text-primary-foreground/60">{article.date} • {article.readTime}</p>
            <p className="text-primary-foreground/80 mt-3">{article.excerpt}</p>
            <Link href={`/article/${generateSlug(article.title)}`}>
              <button className="mt-4 w-full bg-primary-accent text-primary py-2 rounded-lg font-semibold transition-all hover:bg-primary-accent/90">
                Read Full Article →
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { motion } from "framer-motion";
import TechFlappy from "@/components/TechFlappy";
import "@/app/article/page.css";

const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      try {
        console.log("Fetching article with slug:", slug);

        const articlesRef = collection(db, "articles");
        const q = query(articlesRef, where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setArticle(querySnapshot.docs[0].data());
        } else {
          console.log("No article found for slug:", slug);
          setArticle(null);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading)
    return <p className="text-center text-gray-500 text-lg mt-10">Loading...</p>;

  if (!article)
    return <p className="text-center text-red-500 text-lg mt-10">Article not found.</p>;

  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl xl:bg-white/10 md:shadow-lg md:rounded-lg p-0 md:p-6 "
      >
        <h1 className="text-3xl font-bold text-primary-accent">
          {article.title}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 text-white leading-relaxed"
        >
          <div
            className="formatted-content"
            dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
          />
        </motion.div>
        
        <p className="text-sm text-white/60 text-right mt-8">
          {article.date} • {article.readTime}
        </p>
      </motion.div>
      <TechFlappy />
    </div>
  );
};

// Function to format content with links and code snippets
const formatContent = (text) => {
  if (!text) return "";

  // Convert links into clickable anchor tags
  let formatted = text.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline">$1</a>'
  );

  // Convert Markdown-style code blocks (```js ... ```) into <pre><code> blocks
  formatted = formatted.replace(
    /```([\s\S]*?)```/g,
    '<pre class="code-block"><code>$1</code></pre>'
  );

  return formatted;
};

export default ArticlePage;

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FeedItem {
  id: string;
  name: string;
  location: string;
  action: string;
  amount: string;
  timestamp: number;
}

export default function LiveFeed() {
  const [currentItem, setCurrentItem] = useState<FeedItem | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const fetchNewItem = async () => {
    try {
      const response = await fetch('/api/feed');
      const data: FeedItem = await response.json();

      // Fade out
      setIsVisible(false);

      // Wait for fade out, then update and fade in
      setTimeout(() => {
        setCurrentItem(data);
        setIsVisible(true);
      }, 300);
    } catch (error) {
      console.error('Failed to fetch feed item:', error);
    }
  };

  useEffect(() => {
    // Fetch initial item
    fetchNewItem();

    // Update every 10 seconds
    const interval = setInterval(fetchNewItem, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!currentItem) {
    return (
      <div className="flex items-center gap-2 bg-orange-500/20 border border-orange-400/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full max-w-[140px] min-[400px]:max-w-[220px] sm:max-w-none">
        <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
        <span className="text-orange-300 text-xs sm:text-sm font-semibold">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 bg-orange-500/20 border border-orange-400/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full overflow-hidden max-w-[140px] min-[400px]:max-w-[220px] sm:max-w-none">
      <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse flex-shrink-0"></span>
      <div className="overflow-hidden flex-1 relative">
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="whitespace-nowrap"
            >
              <motion.span
                className="text-orange-300 text-xs sm:text-sm font-semibold inline-block mb-1"
                animate={{
                  x: [0, 0, -300]
                }}
                transition={{
                  x: {
                    times: [0, 0.15, 0.97],
                    duration: 10,
                    ease: "linear"
                  }
                }}
                style={{ willChange: "transform" }}
              >
                <span className="sm:hidden">
                  {currentItem.name} from {currentItem.location} {currentItem.action} {currentItem.amount}
                </span>
                <span className="hidden sm:inline">
                  {currentItem.name} from {currentItem.location} {currentItem.action} {currentItem.amount}
                </span>
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

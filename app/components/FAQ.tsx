"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative bg-gradient-to-br from-slate-800/60 via-purple-900/40 to-slate-900/60 backdrop-blur-xl border border-purple-400/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:border-purple-400/40">
        {/* Premium glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left px-5 py-5 sm:px-7 sm:py-6 flex items-start justify-between gap-4 relative z-10"
          aria-expanded={isOpen}
        >
          <span className="text-white font-semibold text-base sm:text-lg leading-relaxed pr-2 flex-1">
            {question}
          </span>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-shrink-0 mt-1"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 sm:px-7 sm:pb-6 pt-0">
                <div className="border-t border-purple-400/20 pt-4">
                  <motion.p
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="text-gray-300 text-sm sm:text-base leading-relaxed"
                  >
                    {answer}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  const faqs = [
    {
      question: "How long does it take to receive the voucher after completion?",
      answer: "It can take up to 1-2 days maximum. Most participants receive their voucher within 24 hours of completion."
    },
    {
      question: "What do I have to do in order to receive the voucher?",
      answer: "To receive the voucher, you need to complete at least 5 deals. Once you finish all required deals, you'll receive your voucher instantly."
    },
    {
      question: "Where will I receive my voucher?",
      answer: "It will be sent to your email! Make sure to check your inbox and spam folder within 1-2 days of completion."
    }
  ];

  return (
    <div className="w-full max-w-3xl">
      {/* Premium header with gradient text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 sm:mb-10"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
          <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            Frequently Asked Questions
          </span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Everything you need to know about your voucher
        </p>
      </motion.div>

      {/* FAQ Items */}
      <div className="space-y-3 sm:space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

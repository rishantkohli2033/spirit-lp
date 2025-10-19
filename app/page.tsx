"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface FallingItem {
  top: number;
  left: number;
}

interface ConfettiItem extends FallingItem {
  id: number;
  type: "bat" | "pumpkin";
}

export default function Home() {
  const [bats, setBats] = useState<FallingItem[]>([]);
  const [pumpkins, setPumpkins] = useState<FallingItem[]>([]);
  const [confetti, setConfetti] = useState<ConfettiItem[]>([]);

  const batsCount = 6;
  const pumpkinsCount = 3;
  const confettiCount = 20;

  useEffect(() => {
    setBats(
      Array.from({ length: batsCount }).map(() => ({
        top: Math.random() * -200,
        left: Math.random() * 100,
      }))
    );
    setPumpkins(
      Array.from({ length: pumpkinsCount }).map(() => ({
        top: Math.random() * -100,
        left: Math.random() * 100,
      }))
    );
  }, []);

  const triggerConfetti = () => {
    const newConfetti: ConfettiItem[] = Array.from({ length: confettiCount }).map((_, i) => ({
      id: i,
      type: Math.random() > 0.5 ? "bat" : "pumpkin",
      left: Math.random() * 100,
      top: 0,
    }));
    setConfetti(newConfetti);
  };

  const voucherLink = "https://your-link-here.com";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden bg-gradient-to-b from-black to-purple-900">
      {/* Fog overlay */}
      <div className="fog"></div>

      {/* Falling Bats */}
      {bats.map((b, i) => (
        <motion.div
          key={i}
          className="absolute w-12 h-12"
          style={{ top: `${b.top}px`, left: `${b.left}vw` }}
          animate={{ y: ["-50px", "110vh"], rotate: [0, 360] }}
          transition={{ duration: 8 + Math.random() * 4, repeat: Infinity, ease: "linear" }}
        >
          <Image src="/bat.png" alt="bat" width={48} height={48} />
        </motion.div>
      ))}

      {/* Floating Pumpkins */}
      {pumpkins.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-16"
          style={{ bottom: `${p.top}px`, left: `${p.left}vw` }}
          animate={{ y: ["100vh", "-50px"], rotate: [0, 360] }}
          transition={{ duration: 12 + Math.random() * 4, repeat: Infinity, ease: "linear" }}
        >
          <Image src="/pumpkin.png" alt="pumpkin" width={64} height={64} />
        </motion.div>
      ))}

      {/* Centered Content */}
      <div className="flex flex-1 flex-col items-center justify-center w-full max-w-2xl gap-6 z-10">
        <Image
          src="/spirit-halloween-logo.png"
          alt="Spirit Halloween"
          width={300}
          height={140}
        />
        <span className="bg-orange-500 text-black px-4 py-2 rounded-full text-sm sm:text-base font-semibold">
          New feedback program
        </span>
        <h1 className="text-center text-3xl sm:text-5xl md:text-6xl font-extrabold text-orange-400 leading-snug">
          Share your thoughts. Earn $750.
        </h1>
        <p className="text-center text-white text-base sm:text-lg md:text-xl max-w-md leading-relaxed">
          Your opinion about Spirit Halloween matters. Help us improve the shopping experience and receive $750 as our way of saying thanks.
        </p>
        <motion.a
          href={voucherLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={triggerConfetti}
          whileHover={{ scale: 1.05, textShadow: "0 0 12px #FF6F00" }}
          whileTap={{ scale: 0.95 }}
          className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-6 px-12 sm:px-20 rounded-3xl text-xl sm:text-2xl md:text-3xl shadow-xl transition-all w-full sm:w-auto text-center"
        >
          Claim Voucher
        </motion.a>
      </div>

      {/* Confetti Animation */}
      {confetti.map((c) => (
        <motion.div
          key={c.id}
          className="absolute w-10 h-10"
          style={{ left: `${c.left}%`, top: "-50px", zIndex: 60 }}
          initial={{ y: 0, rotate: 0, opacity: 1 }}
          animate={{ y: 500 + Math.random() * 100, rotate: 360, opacity: 0 }}
          transition={{ duration: 2 + Math.random() * 1, ease: "easeOut" }}
        >
          <Image src={c.type === "bat" ? "/bat.png" : "/pumpkin.png"} alt={c.type} width={40} height={40} />
        </motion.div>
      ))}

      {/* Footer */}
      <footer className="text-white text-sm z-10 mb-6 text-center w-full">
        <p>© 2025 Spirit Halloween. All rights reserved.</p>
      </footer>
    </div>
  );
}

import React from 'react';
import { motion } from 'motion/react';

export default function LandingPage({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl w-full pixel-panel p-5 sm:p-8 relative bg-[#fdf6e3]"
    >
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-[#e67e22] drop-shadow-[3px_3px_0_#000]">귀농 생활 시뮬레이터</h1>
      </div>

      <div className="text-center">
        <button 
          onClick={onEnter}
          className="pixel-btn px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl font-bold rounded shadow-[4px_4px_0_rgba(0,0,0,0.3)]"
        >
          인물 소개 보러가기 👥
        </button>
      </div>
    </motion.div>
  );
}

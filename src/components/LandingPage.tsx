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
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-[#e67e22] drop-shadow-[3px_3px_0_#000]">X-타듀 밸리</h1>
      </div>

      <div className="wood-panel p-4 sm:p-6 mb-6 sm:mb-8 text-[#fdf6e3] text-base sm:text-lg leading-relaxed shadow-[8px_8px_0_rgba(0,0,0,0.3)]">
        <p className="mb-4">사랑하는 손주에게,</p>
        <p className="mb-4">
          네가 이 편지를 읽고 있다면, 아마도 도시의 쳇바퀴 도는 삶에 지쳐있을 테지.
          나도 그랬단다. 그래서 모든 것을 내려놓고 이 곳, '샤그 타운'으로 떠났지.
        </p>
        <p className="mb-4">
          마을 사람들과 깊은 관계를 맺고, 너만의 이야기를 만들어가렴.
          선택은 모두 너의 몫이란다.
        </p>
        <p className="text-right">- 할아버지가</p>
      </div>

      <div className="text-center">
        <button 
          onClick={onEnter}
          className="pixel-btn px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl font-bold rounded shadow-[4px_4px_0_rgba(0,0,0,0.3)]"
        >
          마을 지도 보러가기 🗺️
        </button>
      </div>
    </motion.div>
  );
}

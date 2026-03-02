import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NPC } from '../data';
import { X } from 'lucide-react';

export function NPCModal({ npc, onClose }: { npc: NPC; onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="pixel-panel bg-[#fdf6e3] w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="wood-panel p-2 sm:p-3 flex justify-between items-center sticky top-0 z-10">
          <h3 className="text-lg sm:text-xl font-bold text-[#f4d03f] drop-shadow-[2px_2px_0_#000] flex items-center gap-2">
            <span>{npc.symbol}</span> {npc.name} <span className="text-sm sm:text-base opacity-80">({npc.age}/{npc.gender})</span>
          </h3>
          <button onClick={onClose} className="text-white hover:text-red-400">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4 sm:p-6 flex flex-col md:flex-row gap-4 sm:gap-6">
          <div className="w-32 sm:w-48 md:w-1/3 mx-auto md:mx-0 flex-shrink-0">
            <div className="border-4 border-[#3e2723] rounded bg-[#e8dcc4] overflow-hidden shadow-[4px_4px_0_rgba(0,0,0,0.2)] aspect-[2/3] relative">
              <img 
                src={npc.imageUrl} 
                alt={npc.name} 
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <div className="w-full md:w-2/3 space-y-3 sm:space-y-4 text-[#3e2723] text-sm sm:text-base">
            <div className="bg-white/50 p-2 sm:p-3 border-2 border-[#3e2723] rounded">
              <p><strong>💼 직업:</strong> {npc.role}</p>
              <p><strong>🧠 성향:</strong> {npc.personality}</p>
            </div>
            
            <div>
              <h4 className="font-bold text-base sm:text-lg mb-1 border-b-2 border-[#3e2723] pb-1">외형</h4>
              <p className="leading-relaxed">{npc.appearance}</p>
            </div>
            
            <div>
              <h4 className="font-bold text-base sm:text-lg mb-1 border-b-2 border-[#3e2723] pb-1">상세정보</h4>
              <p className="leading-relaxed">{npc.backstory}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function WorldLogicModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="pixel-panel bg-[#fdf6e3] w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="wood-panel p-2 sm:p-3 flex justify-between items-center sticky top-0 z-10">
          <h3 className="text-lg sm:text-xl font-bold text-[#f4d03f] drop-shadow-[2px_2px_0_#000]">
            📖 세계관 가이드
          </h3>
          <button onClick={onClose} className="text-white hover:text-red-400">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 text-[#3e2723] leading-relaxed text-sm sm:text-base">
          
          <section className="bg-white/50 p-3 sm:p-4 border-2 border-[#3e2723] rounded shadow-[4px_4px_0_rgba(0,0,0,0.1)]">
            <h4 className="font-bold text-lg sm:text-xl mb-2 text-[#e67e22]">❤️ 관계 레벨 및 상태</h4>
            <div className="space-y-3 mt-3">
              <div className="flex flex-col sm:flex-row items-start gap-1 sm:gap-3">
                <span className="bg-gray-200 px-2 py-1 rounded font-bold border border-gray-400 text-xs sm:text-sm whitespace-nowrap">Lv.1 안전</span>
                <p className="text-xs sm:text-sm pt-0 sm:pt-1">거래 및 일상 대화만 가능. 사적 공간 출입 불가.</p>
              </div>
              <div className="flex flex-col sm:flex-row items-start gap-1 sm:gap-3">
                <span className="bg-blue-200 px-2 py-1 rounded font-bold border border-blue-400 text-xs sm:text-sm whitespace-nowrap">Lv.2 신뢰</span>
                <p className="text-xs sm:text-sm pt-0 sm:pt-1">사적 공간 출입 가능, 고민 상담, 가벼운 스킨십 허용.</p>
              </div>
              <div className="flex flex-col sm:flex-row items-start gap-1 sm:gap-3">
                <span className="bg-pink-200 px-2 py-1 rounded font-bold border border-pink-400 text-xs sm:text-sm whitespace-nowrap">Lv.3 유혹</span>
                <p className="text-xs sm:text-sm pt-0 sm:pt-1">🔞 트리거 구역.</p>
              </div>
              <div className="flex flex-col sm:flex-row items-start gap-1 sm:gap-3">
                <span className="bg-red-200 px-2 py-1 rounded font-bold border border-red-400 text-xs sm:text-sm whitespace-nowrap">Lv.4 합일</span>
                <p className="text-xs sm:text-sm pt-0 sm:pt-1">🔞 완전 해제. 상시 🔞 롤플레잉 및 전폭적인 지원.</p>
              </div>
            </div>
          </section>

        </div>
      </motion.div>
    </motion.div>
  );
}

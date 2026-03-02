import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { npcs, NPC } from '../data';
import { BookOpen } from 'lucide-react';
import { NPCModal, WorldLogicModal } from './Modals';

const regionsInfo = [
  { title: '거주 구역', desc: '마을 주민 대부분이 거주하는 구역.' },
  { title: '자연 구역', desc: '숲/산/해변 등 자연과 밀접한 곳. 채집활동이나 모험을 할 수 있습니다.' },
  { title: '직업활동 구역', desc: '마을의 기반시설과 직업활동이 가능한 시설들이 모여있는 공간.' },
  { title: '기타', desc: '특수 이벤트 발동 가능 장소. 각자 캐릭터에 맞는 장소임.' }
];

export default function MapPage({ onBack }: { onBack: () => void }) {
  const [selectedNPC, setSelectedNPC] = useState<NPC | null>(null);
  const [showWorldLogic, setShowWorldLogic] = useState(false);

  const specialNPCIds = ['nymph', 'slime_girl', 'mori'];
  const specialNPCs = npcs.filter(npc => specialNPCIds.includes(npc.id));
  const normalNPCs = npcs.filter(npc => !specialNPCIds.includes(npc.id));

  return (
    <div className="w-full max-w-6xl h-[90vh] sm:h-[85vh] flex flex-col relative pixel-panel bg-[#fdf6e3] overflow-hidden shadow-[8px_8px_0_rgba(0,0,0,0.3)] sm:shadow-[12px_12px_0_rgba(0,0,0,0.3)]">
      {/* Header */}
      <div className="wood-panel p-3 sm:p-4 flex justify-between items-center text-[#fdf6e3] z-10 shadow-[0_4px_0_rgba(0,0,0,0.3)]">
        <button onClick={onBack} className="pixel-btn pixel-btn-blue px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-bold flex items-center gap-1">
          &lt; <span className="hidden sm:inline">뒤로</span>
        </button>
        <div className="text-center px-2">
          <h2 className="text-xl sm:text-3xl font-bold text-[#f4d03f] drop-shadow-[2px_2px_0_#000]">샤그 타운 주민 목록</h2>
        </div>
        <button onClick={() => setShowWorldLogic(true)} className="pixel-btn pixel-btn-green px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-bold flex items-center gap-1 sm:gap-2">
          <BookOpen size={14} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">가이드</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 hide-scrollbar bg-[#fceabb]">
        
        {/* Region Info */}
        <div className="mb-6 sm:mb-8 bg-white/60 p-4 border-4 border-[#3e2723] rounded-lg shadow-[4px_4px_0_rgba(0,0,0,0.2)]">
          <h3 className="text-lg sm:text-xl font-bold mb-3 text-[#e67e22] border-b-2 border-[#3e2723] pb-2">🗺️ 구역 안내</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {regionsInfo.map(r => (
              <div key={r.title} className="text-[#3e2723] flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                <span className="font-bold bg-[#f4d03f] px-2 py-1 rounded border border-[#3e2723] text-xs sm:text-sm whitespace-nowrap self-start">{r.title}</span>
                <span className="text-xs sm:text-sm pt-0.5">{r.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* NPCs Split Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Normal NPCs */}
          <div className="flex-1 bg-white/60 p-4 border-4 border-[#3e2723] rounded-lg shadow-[4px_4px_0_rgba(0,0,0,0.2)]">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-[#3498db] border-b-2 border-[#3e2723] pb-2">👥 일반 주민</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-6">
              {normalNPCs.map(renderNPC)}
            </div>
          </div>

          {/* Special NPCs */}
          <div className="lg:w-64 flex-shrink-0 bg-[#3e2723] text-[#fdf6e3] p-4 border-4 border-[#f4d03f] rounded-lg shadow-[4px_4px_0_rgba(0,0,0,0.2)]">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-[#f4d03f] border-b-2 border-[#f4d03f] pb-2">✨ 특별 NPC</h3>
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-6">
              {specialNPCs.map(renderSpecialNPC)}
            </div>
          </div>
        </div>

      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedNPC && (
          <NPCModal npc={selectedNPC} onClose={() => setSelectedNPC(null)} />
        )}
        {showWorldLogic && (
          <WorldLogicModal onClose={() => setShowWorldLogic(false)} />
        )}
      </AnimatePresence>
    </div>
  );

  function renderNPC(npc: NPC, idx: number) {
    return (
      <motion.button
        key={npc.id}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: idx * 0.02 }}
        onClick={() => setSelectedNPC(npc)}
        className="flex flex-col items-center gap-1 sm:gap-2 group"
      >
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#fdf6e3] border-[3px] sm:border-4 border-[#3e2723] rounded-lg flex items-center justify-center text-2xl sm:text-3xl shadow-[3px_3px_0_rgba(0,0,0,0.3)] group-hover:-translate-y-1 transition-transform overflow-hidden relative">
          <span className="absolute z-10 drop-shadow-md">{npc.symbol}</span>
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
        </div>
        <span className="bg-[#fdf6e3] text-[#3e2723] px-1.5 py-0.5 sm:px-2 sm:py-1 border-2 border-[#3e2723] rounded text-[10px] sm:text-xs font-bold shadow-[2px_2px_0_rgba(0,0,0,0.3)] whitespace-nowrap">
          {npc.name}
        </span>
      </motion.button>
    );
  }

  function renderSpecialNPC(npc: NPC, idx: number) {
    return (
      <motion.button
        key={npc.id}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: idx * 0.05 }}
        onClick={() => setSelectedNPC(npc)}
        className="flex flex-col lg:flex-row items-center gap-2 sm:gap-3 group w-full p-2 hover:bg-white/10 rounded transition-colors"
      >
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#2c1e16] border-[3px] sm:border-4 border-[#f4d03f] rounded-lg flex items-center justify-center text-2xl sm:text-3xl shadow-[3px_3px_0_rgba(0,0,0,0.5)] group-hover:-translate-y-1 lg:group-hover:-translate-y-0 lg:group-hover:translate-x-1 transition-transform overflow-hidden relative flex-shrink-0">
          <span className="absolute z-10 drop-shadow-md">{npc.symbol}</span>
          <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors"></div>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <span className="text-[#f4d03f] text-xs sm:text-sm font-bold whitespace-nowrap">
            {npc.name}
          </span>
          <span className="text-xs opacity-70 hidden lg:block">{npc.role}</span>
        </div>
      </motion.button>
    );
  }
}

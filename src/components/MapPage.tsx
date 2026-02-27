import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { npcs, NPC } from '../data';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { NPCModal, WorldLogicModal } from './Modals';

type Region = '마을 중앙' | '해변' | '숲&산' | '농경지' | '스카페 마트' | '광산 & 기타';

const regionMap: Record<Region, { title: string; desc: string; n: Region | null; s: Region | null; w: Region | null; e: Region | null }> = {
  '마을 중앙': {
    title: '마을 중앙',
    desc: '일상, 활기, 이웃 간의 정, 평화, 월간 축제',
    n: '숲&산',
    s: '해변',
    w: '농경지',
    e: '스카페 마트'
  },
  '해변': {
    title: '해변',
    desc: '낭만, 여유, 파도, 예술, 낚시 경쟁',
    n: '마을 중앙',
    s: null,
    w: null,
    e: null
  },
  '숲&산': {
    title: '숲&산',
    desc: '모험, 자연, 희귀 채집, 광산 탐험, 판타지',
    n: '광산 & 기타',
    s: '마을 중앙',
    w: null,
    e: null
  },
  '농경지': {
    title: '농경지',
    desc: '근면, 포근, 소박, 가축 돌보기, 작물 재배',
    n: null,
    s: null,
    w: null,
    e: '마을 중앙'
  },
  '스카페 마트': {
    title: '스카페 마트',
    desc: '자본, 효율, 계산적, 심야 영업, 저가 상품',
    n: null,
    s: null,
    w: '마을 중앙',
    e: null
  },
  '광산 & 기타': {
    title: '광산 & 기타',
    desc: '심층 구역(광산/숲 깊은 곳), 특수 상호작용',
    n: null,
    s: '숲&산',
    w: null,
    e: null
  }
};

export default function MapPage({ onBack }: { onBack: () => void }) {
  const [currentRegion, setCurrentRegion] = useState<Region>('마을 중앙');
  const [selectedNPC, setSelectedNPC] = useState<NPC | null>(null);
  const [showWorldLogic, setShowWorldLogic] = useState(false);

  const regionData = regionMap[currentRegion];
  const regionNPCs = npcs.filter(npc => npc.region === currentRegion);

  return (
    <div className="w-full max-w-5xl h-[90vh] sm:h-[85vh] flex flex-col relative pixel-panel bg-[#fdf6e3] overflow-hidden shadow-[8px_8px_0_rgba(0,0,0,0.3)] sm:shadow-[12px_12px_0_rgba(0,0,0,0.3)]">
      {/* Header */}
      <div className="wood-panel p-3 sm:p-4 flex justify-between items-center text-[#fdf6e3] z-10 shadow-[0_4px_0_rgba(0,0,0,0.3)]">
        <button onClick={onBack} className="pixel-btn pixel-btn-blue px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-bold flex items-center gap-1">
          &lt; <span className="hidden sm:inline">뒤로</span>
        </button>
        <div className="text-center px-2">
          <h2 className="text-xl sm:text-3xl font-bold text-[#f4d03f] drop-shadow-[2px_2px_0_#000]">{regionData.title}</h2>
          <p className="text-[10px] sm:text-base opacity-90 font-bold break-keep">{regionData.desc}</p>
        </div>
        <button onClick={() => setShowWorldLogic(true)} className="pixel-btn pixel-btn-green px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-bold flex items-center gap-1 sm:gap-2">
          <BookOpen size={14} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">가이드</span>
        </button>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative map-bg p-4 sm:p-8 flex items-center justify-center overflow-hidden">
        
        {/* Navigation Arrows */}
        {regionData.n && (
          <button 
            onClick={() => setCurrentRegion(regionData.n as Region)} 
            className="absolute top-2 sm:top-6 left-1/2 -translate-x-1/2 pixel-btn pixel-btn-blue p-2 sm:p-3 rounded-full z-10 animate-bounce shadow-[4px_4px_0_rgba(0,0,0,0.3)]"
          >
            <ArrowUp className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>
        )}
        {regionData.s && (
          <button 
            onClick={() => setCurrentRegion(regionData.s as Region)} 
            className="absolute bottom-2 sm:bottom-6 left-1/2 -translate-x-1/2 pixel-btn pixel-btn-blue p-2 sm:p-3 rounded-full z-10 animate-bounce shadow-[4px_4px_0_rgba(0,0,0,0.3)]"
          >
            <ArrowDown className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>
        )}
        {regionData.w && (
          <button 
            onClick={() => setCurrentRegion(regionData.w as Region)} 
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 pixel-btn pixel-btn-blue p-2 sm:p-3 rounded-full z-10 animate-bounce shadow-[4px_4px_0_rgba(0,0,0,0.3)]"
          >
            <ArrowLeft className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>
        )}
        {regionData.e && (
          <button 
            onClick={() => setCurrentRegion(regionData.e as Region)} 
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 pixel-btn pixel-btn-blue p-2 sm:p-3 rounded-full z-10 animate-bounce shadow-[4px_4px_0_rgba(0,0,0,0.3)]"
          >
            <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>
        )}

        {/* NPCs in Region */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-8 z-0 max-w-3xl w-full px-10 py-12 sm:px-16 sm:py-16 max-h-full overflow-y-auto content-start sm:content-center hide-scrollbar">
          <AnimatePresence mode="popLayout">
            {regionNPCs.map((npc, idx) => (
              <motion.button
                key={npc.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedNPC(npc)}
                className="flex flex-col items-center gap-1 sm:gap-2 group"
              >
                <div className="w-14 h-14 sm:w-20 sm:h-20 bg-[#fdf6e3] border-[3px] sm:border-4 border-[#3e2723] rounded-lg flex items-center justify-center text-2xl sm:text-4xl shadow-[3px_3px_0_rgba(0,0,0,0.3)] sm:shadow-[4px_4px_0_rgba(0,0,0,0.3)] group-hover:-translate-y-1 sm:group-hover:-translate-y-2 transition-transform overflow-hidden relative">
                  <span className="absolute z-10 drop-shadow-md">{npc.symbol}</span>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                <span className="bg-[#fdf6e3] px-1.5 py-0.5 sm:px-2 sm:py-1 border-2 border-[#3e2723] rounded text-[10px] sm:text-sm font-bold shadow-[2px_2px_0_rgba(0,0,0,0.3)] whitespace-nowrap">
                  {npc.name}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
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
}

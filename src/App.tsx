import React, { useState, useEffect, useCallback } from 'react';
import { Calculator, Calendar, Shield, Star } from 'lucide-react';
import { MilitaryServiceCalculator } from './components/military/MilitaryServiceCalculator';
import { LeaveCalculator } from './components/military/LeaveCalculator';

function App() {
  const [activeTab, setActiveTab] = useState<'discharge' | 'leave'>('discharge');
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;
    
    // 스크롤 방향과 거리에 따라 헤더 표시 여부 결정
    if (currentScrollY < 10) {
      setIsHeaderVisible(true);
    } else if (Math.abs(scrollDelta) > 5) { // 최소 스크롤 거리 설정
      setIsHeaderVisible(scrollDelta < 0);
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547483238-2cbf88bc56ad?auto=format&fit=crop&w=2000&q=80')] opacity-5 bg-cover bg-center mix-blend-overlay" />
      
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-slate-800/80 backdrop-blur-lg border-b border-slate-700/50 shadow-lg transform transition-transform duration-300 ease-out will-change-transform ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative p-1.5 sm:p-2 bg-blue-500/10 rounded-lg">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-blue-500" />
                <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%]" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  군집사
                </h1>
                <p className="text-xs text-slate-400">복무 일정 및 휴가 관리</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden sm:flex gap-2">
              <button
                onClick={() => setActiveTab('discharge')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  activeTab === 'discharge'
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-700/50 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <Calendar className="w-4 h-4" />
                전역일 계산기
              </button>
              <button
                onClick={() => setActiveTab('leave')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  activeTab === 'leave'
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-700/50 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <Calculator className="w-4 h-4" />
                휴가 계산기
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className={`relative container mx-auto px-4 pb-24 sm:pb-8 transition-all duration-300 ${
        isHeaderVisible ? 'pt-20 sm:pt-24' : 'pt-4'
      }`}>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 sm:p-6 shadow-xl">
          {activeTab === 'discharge' ? (
            <MilitaryServiceCalculator />
          ) : (
            <LeaveCalculator />
          )}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-slate-800/95 backdrop-blur-lg border-t border-slate-700/50 pb-safe">
        <div className="container mx-auto px-4 py-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveTab('discharge')}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition ${
                activeTab === 'discharge'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-700/50 text-slate-300'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="text-xs font-medium">전역일</span>
            </button>
            <button
              onClick={() => setActiveTab('leave')}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition ${
                activeTab === 'leave'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-700/50 text-slate-300'
              }`}
            >
              <Calculator className="w-5 h-5" />
              <span className="text-xs font-medium">휴가</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default App;
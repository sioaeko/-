import React, { useState } from 'react';
import { Building2, Search, MapPin, Shield, History, Filter } from 'lucide-react';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { UNIT_DATABASE, searchUnits, UnitData } from '../../data/unitDatabase';

export function UnitInfo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<UnitData[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<UnitData | null>(null);
  const [filter, setFilter] = useState<'전체' | '육군' | '해군' | '공군' | '해병'>('전체');

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setSelectedUnit(null);
      return;
    }

    const results = searchUnits(searchTerm)
      .filter(unit => filter === '전체' || unit.type === filter);

    setSearchResults(results);
    setSelectedUnit(results[0] || null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 z-0" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
          <div>
            <h3 className="text-base sm:text-lg font-medium">부대 정보</h3>
            <p className="text-xs sm:text-sm text-slate-400">전군 주요 부대 정보 검색</p>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              label=""
              type="text"
              placeholder="부대 이름, 지역, 특성 등으로 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <button
              onClick={handleSearch}
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition flex items-center justify-center gap-2"
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-sm sm:text-base">검색</span>
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 flex-shrink-0" />
            <div className="flex gap-1.5 sm:gap-2">
              {(['전체', '육군', '해군', '공군', '해병'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm whitespace-nowrap transition ${
                    filter === type
                      ? 'bg-indigo-500 text-white'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="lg:col-span-2 space-y-2 max-h-[300px] sm:max-h-[600px] overflow-y-auto pr-1">
            {searchResults.map((unit) => (
              <button
                key={unit.name}
                onClick={() => setSelectedUnit(unit)}
                className={`w-full text-left p-2.5 sm:p-4 rounded-lg transition ${
                  selectedUnit?.name === unit.name
                    ? 'bg-indigo-500/20 border border-indigo-500/50'
                    : 'bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-medium text-sm sm:text-base">{unit.name}</h4>
                    {unit.nickname && (
                      <p className="text-xs text-slate-400 mt-0.5">
                        {unit.nickname}
                      </p>
                    )}
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50 whitespace-nowrap">
                    {unit.type}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 line-clamp-2">
                  {unit.location}
                </p>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3">
            {selectedUnit && (
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-slate-800/50 backdrop-blur rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {selectedUnit.emblem && (
                      <div className="w-20 h-20 sm:w-32 sm:h-32 mx-auto sm:mx-0 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm p-2 border-2 border-slate-600/50">
                        <img
                          src={selectedUnit.emblem}
                          alt={`${selectedUnit.name} 부대마크`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex-1 text-center sm:text-left">
                      <h4 className="text-lg sm:text-2xl font-bold text-indigo-400">
                        {selectedUnit.name}
                      </h4>
                      {selectedUnit.nickname && (
                        <p className="text-sm text-slate-400 mt-1">
                          {selectedUnit.nickname}
                        </p>
                      )}
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2 sm:mt-3">
                        <span className="text-xs px-2 py-1 rounded-full bg-slate-700/50">
                          {selectedUnit.type}
                        </span>
                        {selectedUnit.yearEstablished && (
                          <span className="text-xs px-2 py-1 rounded-full bg-slate-700/50">
                            {selectedUnit.yearEstablished}년 창설
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 mt-2 sm:mt-3">
                        {selectedUnit.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-slate-800/50 backdrop-blur rounded-lg p-3 sm:p-4">
                    <h5 className="font-medium mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <History className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400" />
                      부대 연혁
                    </h5>
                    <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-300">
                      {selectedUnit.history.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-indigo-400">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-800/50 backdrop-blur rounded-lg p-3 sm:p-4">
                    <h5 className="font-medium mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400" />
                      주요 특성
                    </h5>
                    <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-300">
                      {selectedUnit.specialties.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-indigo-400">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {searchTerm && searchResults.length === 0 && (
          <div className="text-center py-6 sm:py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-slate-800/50 mb-3 sm:mb-4">
              <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
            </div>
            <p className="text-sm sm:text-base text-slate-400">검색 결과가 없습니다.</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-2">다른 검색어로 시도해보세요.</p>
          </div>
        )}

        {!searchTerm && (
          <div className="bg-slate-800/30 rounded-lg p-3 sm:p-4">
            <h4 className="font-medium mb-2 text-sm sm:text-base">검색 도움말</h4>
            <ul className="space-y-1 text-xs sm:text-sm text-slate-300">
              <li>• 부대 이름, 지역, 특성 등 다양한 키워드로 검색이 가능합니다.</li>
              <li>• 상단의 필터를 사용하여 군별로 검색할 수 있습니다.</li>
              <li>• 검색어를 자세히 입력할수록 더 정확한 결과를 얻을 수 있습니다.</li>
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
}
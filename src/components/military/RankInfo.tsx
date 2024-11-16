import React from 'react';
import { Medal } from 'lucide-react';
import { Card } from '../common/Card';
import { RANK_INFO, ServiceType } from './ServiceRanks';

interface RankInfoProps {
  serviceType: ServiceType;
  currentRank: string;
  currentGrade: number;
  promotionDate: Date;
}

export function RankInfo({ serviceType, currentRank, currentGrade, promotionDate }: RankInfoProps) {
  const rankInfo = RANK_INFO[currentRank as keyof typeof RANK_INFO];

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 z-0" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <Medal className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-medium">계급 정보</h3>
        </div>

        {rankInfo && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur rounded-lg p-4">
              <h4 className="font-medium text-purple-400 mb-2">현재 계급</h4>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-bold text-white">{currentRank} {currentGrade}호봉</p>
                  <p className="text-sm text-slate-400">
                    진급일: {promotionDate.toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-lg p-4">
              <h4 className="font-medium text-purple-400 mb-2">계급 설명</h4>
              <p className="text-slate-300">{rankInfo.description}</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-lg p-4">
              <h4 className="font-medium text-purple-400 mb-2">주요 임무</h4>
              <ul className="space-y-1 text-slate-300">
                {rankInfo.responsibilities.map((duty, index) => (
                  <li key={index}>• {duty}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-lg p-4">
              <h4 className="font-medium text-purple-400 mb-2">조언</h4>
              <ul className="space-y-1 text-slate-300">
                {rankInfo.tips.map((tip, index) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
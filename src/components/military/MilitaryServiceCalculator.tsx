import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Medal, ChevronRight } from 'lucide-react';
import { Card } from '../common/Card';
import { Select } from '../common/Select';
import { DatePicker } from '../common/DatePicker';
import { ProgressBar } from '../common/ProgressBar';
import { SERVICE_DURATIONS, RANKS, RANK_PERIODS, GRADE_PERIODS } from './ServiceRanks';
import { SalaryCalculator } from './SalaryCalculator';
import { RankInfo } from './RankInfo';
import { TrainingSchedule } from './TrainingSchedule';
import { UnitInfo } from './UnitInfo';

type TabType = 'overview' | 'rank' | 'salary' | 'training' | 'unit';

export function MilitaryServiceCalculator() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [enlistmentDate, setEnlistmentDate] = useState('');
  const [serviceType, setServiceType] = useState<'army' | 'navy' | 'airforce' | 'social'>('army');
  const [dischargeDate, setDischargeDate] = useState<Date | null>(null);
  const [remainingDays, setRemainingDays] = useState<number | null>(null);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [currentRankInfo, setCurrentRankInfo] = useState<{
    rank: string;
    grade: number;
    promotionDate: Date;
  }>({ rank: '이병', grade: 1, promotionDate: new Date() });
  const [isDischarged, setIsDischarged] = useState(false);

  const tabs: { id: TabType; label: string; icon: typeof Calendar }[] = [
    { id: 'overview', label: '복무현황', icon: Calendar },
    { id: 'rank', label: '계급정보', icon: Medal },
    { id: 'salary', label: '급여정보', icon: Clock },
    { id: 'training', label: '훈련일정', icon: Calendar },
    { id: 'unit', label: '부대정보', icon: Calendar },
  ];

  useEffect(() => {
    if (enlistmentDate) {
      const enlistDate = new Date(enlistmentDate);
      const months = SERVICE_DURATIONS[serviceType];
      const discharge = new Date(enlistDate);
      discharge.setMonth(discharge.getMonth() + months);
      discharge.setDate(discharge.getDate() - 1);
      
      setDischargeDate(discharge);

      // Calculate remaining days and check if discharged
      const today = new Date();
      const remaining = Math.ceil((discharge.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      setRemainingDays(remaining);
      setIsDischarged(remaining <= 0);

      // Calculate progress
      const totalDays = Math.ceil((discharge.getTime() - enlistDate.getTime()) / (1000 * 60 * 60 * 24));
      const passedDays = totalDays - remaining;
      setProgressPercent(Math.min(100, Math.max(0, (passedDays / totalDays) * 100)));

      // Calculate current rank and grade
      const monthsServed = Math.floor((today.getTime() - enlistDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
      let currentRank = '이병';
      let grade = 1;
      let promotionDate = new Date(enlistDate);

      if (isDischarged) {
        currentRank = '민간인';
        grade = 1;
      } else {
        for (let i = RANK_PERIODS[serviceType].length - 1; i >= 0; i--) {
          if (monthsServed >= RANK_PERIODS[serviceType][i]) {
            currentRank = RANKS[serviceType][i];
            const monthsInRank = monthsServed - RANK_PERIODS[serviceType][i];
            const maxGrade = GRADE_PERIODS[currentRank].length;
            grade = Math.min(maxGrade, monthsInRank + 1);
            promotionDate.setMonth(promotionDate.getMonth() + RANK_PERIODS[serviceType][i]);
            break;
          }
        }
      }

      setCurrentRankInfo({ rank: currentRank, grade, promotionDate });
    }
  }, [enlistmentDate, serviceType]);

  const handleEnlistmentDateChange = (date: string) => {
    setEnlistmentDate(date);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <DatePicker
                  label="입대일"
                  value={enlistmentDate}
                  onChange={handleEnlistmentDateChange}
                  min="1950-01-01"
                  max={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                />
                <Select
                  label="복무 유형"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as 'army' | 'navy' | 'airforce' | 'social')}
                >
                  <option value="army">육군 (18개월)</option>
                  <option value="navy">해군 (20개월)</option>
                  <option value="airforce">공군 (21개월)</option>
                  <option value="social">사회복무요원 (21개월)</option>
                </Select>
              </div>

              {dischargeDate && (
                <Card>
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-medium">전역일</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-2xl font-bold text-blue-400">
                      {dischargeDate.toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <ProgressBar
                      progress={progressPercent}
                      label="복무 진행률"
                      realTime={progressPercent.toFixed(3)}
                    />
                  </div>
                </Card>
              )}
            </div>

            {remainingDays !== null && (
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-medium">
                    {isDischarged ? '전역 현황' : '복무 현황'}
                  </h3>
                </div>
                {isDischarged ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-4">
                      <Medal className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-400 mb-2">전역을 축하드립니다! 🎉</h3>
                    <p className="text-slate-300 mb-4">복무를 무사히 마치셨습니다.</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 text-green-400">
                      <Clock className="w-4 h-4" />
                      <span>전역일: {dischargeDate?.toLocaleDateString('ko-KR')}</span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-blue-400">{remainingDays}</div>
                      <div className="text-sm text-slate-400">남은 일수</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-blue-400">
                        {Math.floor(remainingDays / 7)}
                      </div>
                      <div className="text-sm text-slate-400">남은 주</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-blue-400">
                        {Math.floor(remainingDays / 30)}
                      </div>
                      <div className="text-sm text-slate-400">남은 월</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-blue-400">
                        {Math.floor((remainingDays / 365) * 100)}
                      </div>
                      <div className="text-sm text-slate-400">% / 1년</div>
                    </div>
                  </div>
                )}
              </Card>
            )}
          </div>
        );
      case 'rank':
        return (
          <RankInfo
            serviceType={serviceType}
            currentRank={currentRankInfo.rank}
            currentGrade={currentRankInfo.grade}
            promotionDate={currentRankInfo.promotionDate}
          />
        );
      case 'salary':
        return (
          <SalaryCalculator
            serviceType={serviceType}
            currentRank={currentRankInfo.rank}
            currentGrade={currentRankInfo.grade}
          />
        );
      case 'training':
        return !isDischarged && new Date(enlistmentDate) > new Date() ? (
          <TrainingSchedule
            serviceType={serviceType}
            enlistmentDate={enlistmentDate}
          />
        ) : null;
      case 'unit':
        return <UnitInfo />;
      default:
        return null;
    }
  };

  // Mobile tab navigation
  const renderMobileTabNav = () => (
    <div className="sm:hidden overflow-x-auto hide-scrollbar -mx-4 px-4 mb-4">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white'
                : 'bg-slate-700/50 text-slate-300'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // Desktop tab navigation
  const renderDesktopTabNav = () => (
    <div className="hidden sm:flex gap-2 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            activeTab === tab.id
              ? 'bg-blue-500 text-white'
              : 'bg-slate-700/50 hover:bg-slate-700 text-slate-300'
          }`}
        >
          <tab.icon className="w-4 h-4" />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div>
      {renderMobileTabNav()}
      {renderDesktopTabNav()}
      {renderContent()}
    </div>
  );
}
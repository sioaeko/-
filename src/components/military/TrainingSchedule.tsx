import React from 'react';
import { Target } from 'lucide-react';
import { Card } from '../common/Card';
import { ServiceType } from './ServiceRanks';

interface TrainingScheduleProps {
  serviceType: ServiceType;
  enlistmentDate: string;
}

export function TrainingSchedule({ serviceType, enlistmentDate }: TrainingScheduleProps) {
  const trainings = [
    {
      name: '기본군사훈련',
      duration: serviceType === 'airforce' ? '6주' : '5주',
      description: '군인으로서의 기본자세와 전투기술 습득',
    },
    {
      name: '특기병교육',
      duration: '4-8주',
      description: '보직에 따른 전문기술 교육',
    },
    {
      name: '전투력측정',
      duration: '3일',
      description: '체력 및 전투기술 평가',
      recurring: '연 2회',
    },
    {
      name: '집체훈련',
      duration: '1주',
      description: '부대별 전문성 향상 교육',
      recurring: '분기별',
    },
  ];

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 z-0" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-5 h-5 text-orange-400" />
          <h3 className="text-lg font-medium">주요 훈련 일정</h3>
        </div>

        <div className="space-y-4">
          {trainings.map((training, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-orange-400">{training.name}</h4>
                <span className="text-sm bg-slate-700 px-2 py-1 rounded">
                  {training.duration}
                </span>
              </div>
              <p className="text-sm text-slate-300">{training.description}</p>
              {training.recurring && (
                <p className="text-xs text-slate-400 mt-2">
                  실시주기: {training.recurring}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 bg-slate-800/30 rounded-lg p-4">
          <h4 className="font-medium mb-2">훈련 참고사항</h4>
          <ul className="space-y-1 text-sm text-slate-300">
            <li>• 훈련 일정은 부대 사정에 따라 변경될 수 있습니다.</li>
            <li>• 특기교육은 보직에 따라 교육기간이 상이합니다.</li>
            <li>• 전투력측정은 기상상황에 따라 일정이 조정될 수 있습니다.</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
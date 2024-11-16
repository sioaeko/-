import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

export function LeaveCalculator() {
  const [totalLeave, setTotalLeave] = useState<number>(28);
  const [usedLeave, setUsedLeave] = useState<number>(0);
  
  const remainingLeave = Math.max(0, totalLeave - usedLeave);
  const usagePercent = (usedLeave / totalLeave) * 100;

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">총 휴가 일수</label>
            <input
              type="number"
              value={totalLeave}
              onChange={(e) => setTotalLeave(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">사용한 휴가</label>
            <input
              type="number"
              value={usedLeave}
              onChange={(e) => setUsedLeave(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
            />
          </div>
        </div>

        <div className="bg-slate-700/30 rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-medium">휴가 현황</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-400">{remainingLeave}</div>
                <div className="text-sm text-slate-400">남은 휴가</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-400">{usedLeave}</div>
                <div className="text-sm text-slate-400">사용한 휴가</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>휴가 사용률</span>
                <span>{usagePercent.toFixed(1)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-500"
                  style={{ width: \`\${usagePercent}%\` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-700/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-medium">휴가 계획 도움말</h3>
        </div>
        <div className="space-y-2 text-slate-300">
          <p>• 정기휴가는 복무기간에 따라 21일에서 28일까지 주어집니다.</p>
          <p>• 포상휴가는 훈련 및 평가 결과에 따라 추가로 주어질 수 있습니다.</p>
          <p>• 청원휴가는 가족의 경조사 등 특별한 사유가 있을 때 신청할 수 있습니다.</p>
          <p>• 휴가는 부대 상황과 지휘관 승인에 따라 사용이 제한될 수 있습니다.</p>
        </div>
      </div>
    </div>
  );
}
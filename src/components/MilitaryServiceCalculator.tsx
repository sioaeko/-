import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

export function MilitaryServiceCalculator() {
  const [enlistmentDate, setEnlistmentDate] = useState('');
  const [serviceType, setServiceType] = useState('army'); // army, navy, airforce
  const [dischargeDate, setDischargeDate] = useState<Date | null>(null);
  const [remainingDays, setRemainingDays] = useState<number | null>(null);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  const serviceDurations = {
    army: 18,
    navy: 20,
    airforce: 21,
  };

  useEffect(() => {
    if (enlistmentDate) {
      const enlistDate = new Date(enlistmentDate);
      const months = serviceDurations[serviceType as keyof typeof serviceDurations];
      const discharge = new Date(enlistDate);
      discharge.setMonth(discharge.getMonth() + months);
      discharge.setDate(discharge.getDate() - 1);
      
      setDischargeDate(discharge);

      // Calculate remaining days
      const today = new Date();
      const remaining = Math.ceil((discharge.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      setRemainingDays(remaining);

      // Calculate progress
      const totalDays = Math.ceil((discharge.getTime() - enlistDate.getTime()) / (1000 * 60 * 60 * 24));
      const passedDays = totalDays - remaining;
      setProgressPercent(Math.min(100, Math.max(0, (passedDays / totalDays) * 100)));
    }
  }, [enlistmentDate, serviceType]);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">입대일</label>
            <input
              type="date"
              value={enlistmentDate}
              onChange={(e) => setEnlistmentDate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">군종</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
            >
              <option value="army">육군 (18개월)</option>
              <option value="navy">해군 (20개월)</option>
              <option value="airforce">공군 (21개월)</option>
            </select>
          </div>
        </div>

        <div className="bg-slate-700/30 rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-medium">전역일</h3>
          </div>
          {dischargeDate && (
            <>
              <p className="text-2xl font-bold text-blue-400">
                {dischargeDate.toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>복무 진행률</span>
                  <span>{progressPercent.toFixed(1)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: \`\${progressPercent}%\` }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {remainingDays !== null && (
        <div className="bg-slate-700/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-medium">남은 복무일</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-400">{remainingDays}</div>
              <div className="text-sm text-slate-400">일</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-400">
                {Math.floor(remainingDays / 7)}
              </div>
              <div className="text-sm text-slate-400">주</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-400">
                {Math.floor(remainingDays / 30)}
              </div>
              <div className="text-sm text-slate-400">개월</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-400">
                {Math.floor((remainingDays / 365) * 100)}
              </div>
              <div className="text-sm text-slate-400">% / 1년</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
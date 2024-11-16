import React from 'react';
import { DollarSign, Wallet, PiggyBank, Calculator } from 'lucide-react';
import { Card } from '../common/Card';
import { SALARY_BY_RANK_AND_GRADE, ServiceType } from './ServiceRanks';

interface SalaryCalculatorProps {
  serviceType: ServiceType;
  currentRank: string;
  currentGrade: number;
}

export function SalaryCalculator({ serviceType, currentRank, currentGrade }: SalaryCalculatorProps) {
  const salaryKey = `${currentRank}-${currentGrade}` as keyof typeof SALARY_BY_RANK_AND_GRADE;
  const baseSalary = SALARY_BY_RANK_AND_GRADE[salaryKey] || 0;
  const monthlyDeposit = 400000;
  const specialAllowance = serviceType === 'navy' ? 30000 : 0;
  const totalMonthly = baseSalary + specialAllowance;

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=2000&q=80')] opacity-5 bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-blue-500/10" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <DollarSign className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-medium">월급 계산기</h3>
            <p className="text-sm text-slate-400">현재 계급 기준 급여 정보</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/60 backdrop-blur border border-slate-700/50 rounded-xl p-4 relative overflow-hidden group hover:bg-slate-800/80 transition duration-300">
            <div className="absolute right-0 top-0 p-2 text-green-400/20 group-hover:text-green-400/30 transition-colors">
              <Wallet className="w-8 h-8" />
            </div>
            <div className="text-sm text-slate-400">기본급</div>
            <div className="text-xl font-bold text-green-400 mt-1">
              {baseSalary.toLocaleString()}원
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {currentRank} {currentGrade}호봉
            </div>
          </div>
          <div className="bg-slate-800/60 backdrop-blur border border-slate-700/50 rounded-xl p-4 relative overflow-hidden group hover:bg-slate-800/80 transition duration-300">
            <div className="absolute right-0 top-0 p-2 text-blue-400/20 group-hover:text-blue-400/30 transition-colors">
              <Calculator className="w-8 h-8" />
            </div>
            <div className="text-sm text-slate-400">특수근무수당</div>
            <div className="text-xl font-bold text-blue-400 mt-1">
              {specialAllowance.toLocaleString()}원
            </div>
          </div>
          <div className="bg-slate-800/60 backdrop-blur border border-slate-700/50 rounded-xl p-4 relative overflow-hidden group hover:bg-slate-800/80 transition duration-300">
            <div className="absolute right-0 top-0 p-2 text-purple-400/20 group-hover:text-purple-400/30 transition-colors">
              <PiggyBank className="w-8 h-8" />
            </div>
            <div className="text-sm text-slate-400">정기저금</div>
            <div className="text-xl font-bold text-purple-400 mt-1">
              {monthlyDeposit.toLocaleString()}원
            </div>
          </div>
          <div className="bg-slate-800/60 backdrop-blur border border-slate-700/50 rounded-xl p-4 relative overflow-hidden group hover:bg-slate-800/80 transition duration-300">
            <div className="absolute right-0 top-0 p-2 text-emerald-400/20 group-hover:text-emerald-400/30 transition-colors">
              <DollarSign className="w-8 h-8" />
            </div>
            <div className="text-sm text-slate-400">총 지급액</div>
            <div className="text-xl font-bold text-emerald-400 mt-1">
              {totalMonthly.toLocaleString()}원
            </div>
          </div>
        </div>

        <div className="bg-slate-800/30 backdrop-blur rounded-xl p-4 border border-slate-700/50">
          <h4 className="font-medium text-slate-300 mb-3">참고사항</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 text-slate-400">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              기본급은 계급과 호봉에 따라 차등 지급됩니다.
            </li>
            <li className="flex items-center gap-2 text-slate-400">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              정기저금은 전역 시 일시불로 지급됩니다.
            </li>
            <li className="flex items-center gap-2 text-slate-400">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              특수근무수당은 보직과 근무지에 따라 추가될 수 있습니다.
            </li>
            <li className="flex items-center gap-2 text-slate-400">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              급여는 매월 1일에 지급됩니다.
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
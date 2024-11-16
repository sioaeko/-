export interface UnitData {
  name: string;
  type: '육군' | '해군' | '공군' | '해병' | '기타';
  location: string;
  description: string;
  history: string[];
  specialties: string[];
  yearEstablished?: number;
  emblem?: string;
  nickname?: string;
}

export const UNIT_DATABASE: Record<string, UnitData> = {
  // 군단 정보
  '제1군단': {
    name: '제1군단',
    type: '육군',
    location: '경기도 고양시',
    description: '대한민국 육군의 주력 군단으로, 수도권 서부 지역 방어를 담당합니다.',
    history: [
      '1950년 6월 25일 창설',
      '한국전쟁 참전',
      '현재 수도권 서부 전선 방어 임무 수행'
    ],
    specialties: [
      '기계화전투',
      '통합방위작전',
      '도시지역작전',
      '합동작전'
    ],
    yearEstablished: 1950,
    emblem: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/ROKA_1st_Corps_Insignia.svg'
  },

  '수도기계화보병사단': {
    name: '수도기계화보병사단',
    type: '육군',
    location: '경기도 구리시',
    description: '대한민국 육군의 핵심 기계화 전력으로, 수도권 방위를 담당하는 기계화보병사단입니다.',
    history: [
      '1949년 6월 20일 수도사단으로 창설',
      '1973년 기계화보병사단으로 개편',
      '6.25 전쟁 및 베트남전 참전'
    ],
    specialties: [
      '기계화전투',
      '합동작전',
      '도시지역전투',
      '기동전'
    ],
    yearEstablished: 1949,
    emblem: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Capital_Mechanized_Infantry_Division_Emblem.png',
    nickname: '맹호사단'
  },

  '제707특수임무단': {
    name: '제707특수임무단',
    type: '육군',
    location: '비공개',
    description: '대한민국 육군의 대테러 및 특수작전을 전담하는 특수부대입니다.',
    history: [
      '1982년 12월 1일 창설',
      '대테러 작전 전담',
      '특수임무 수행'
    ],
    specialties: [
      '대테러작전',
      '인질구출',
      '특수침투',
      '근접전투'
    ],
    yearEstablished: 1982,
    emblem: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/707th_Special_Mission_Battalion_Emblem.png',
    nickname: '백골단'
  },

  '육군훈련소': {
    name: '육군훈련소',
    type: '육군',
    location: '충청남도 논산시 연무읍',
    description: '대한민국 육군의 신병 교육 기관으로, 육군의 기초군사훈련을 담당하는 기관입니다.',
    history: [
      '1951년 육군제1훈련소로 창설',
      '1991년 현재의 육군훈련소로 명칭 변경',
      '연간 약 10만여 명의 신병 교육 수료'
    ],
    specialties: [
      '기초 군사 훈련',
      '전투 기술 교육',
      '정신 교육',
      '체력 단련'
    ],
    yearEstablished: 1951,
    emblem: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Korea_Army_Training_Center_Emblem.png'
  }
};

export function searchUnits(query: string): UnitData[] {
  if (!query.trim()) return [];
  
  const searchTerms = query.toLowerCase().split(' ');
  
  return Object.values(UNIT_DATABASE).filter(unit => {
    const searchText = [
      unit.name,
      unit.location,
      unit.description,
      unit.type,
      ...(unit.history || []),
      ...(unit.specialties || []),
      unit.nickname || '',
    ].join(' ').toLowerCase();
    
    return searchTerms.every(term => searchText.includes(term));
  });
}
export const campusLinks = [
  {
    id: 'cwnu-notice',
    category: 'portal',
    labelKo: '창원대학교 공지사항',
    labelEn: 'CWNU Notice Board',
    labelZh: 'CWNU Notice Board',
    descriptionKo: '창원대학교 공식 공지사항',
    url: 'https://www.changwon.ac.kr/portal/na/ntt/selectNttList.do?mi=13532&bbsId=2932',
    icon: '📢',
    featured: true
  },
  {
    id: 'wagle',
    category: 'portal',
    labelKo: '와글',
    labelEn: 'Wagle',
    labelZh: 'Wagle',
    descriptionKo: '창원대학교 통합 포털',
    url: 'https://www.changwon.ac.kr/portal/main.do#',
    icon: '🏫',
    featured: true
  },
  {
    id: 'ecampus',
    category: 'study',
    labelKo: 'e캠퍼스',
    labelEn: 'e-Campus',
    labelZh: 'e-Campus',
    descriptionKo: '창원대학교 온라인 강의 시스템',
    url: 'https://ecampus.changwon.ac.kr/login.php?mi=18314',
    icon: '💻',
    featured: true
  },
  {
    id: 'academic-calendar',
    category: 'academic',
    labelKo: '학사일정',
    labelEn: 'Schedule',
    labelZh: 'Schedule',
    descriptionKo: '창원대학교 학사일정',
    url: 'https://www.changwon.ac.kr/haksa/sv/schdulView/schdulCalendarView.do?mi=10980',
    icon: '📅',
    featured: true
  },
  {
    id: 'academic-guide',
    category: 'academic',
    labelKo: '학사안내',
    labelEn: 'Academic',
    labelZh: 'Academic',
    descriptionKo: '창원대학교 학사 안내',
    url: 'https://www.changwon.ac.kr/haksa/main.do',
    icon: '📜',
    featured: true
  },
  {
    id: 'tuition',
    category: 'academic',
    labelKo: '등록안내',
    labelEn: 'Tuition',
    labelZh: 'Tuition',
    descriptionKo: '등록금 및 등록 안내',
    url: 'https://www.changwon.ac.kr/portal/na/ntt/selectNttList.do?mi=18352&bbsId=6253',
    icon: '📋',
    featured: true
  },
  {
    id: 'curriculum',
    category: 'academic',
    labelKo: '교육과정',
    labelEn: 'Curriculum',
    labelZh: 'Curriculum',
    descriptionKo: '학부 교육과정 안내',
    url: 'https://www.changwon.ac.kr/haksa/cm/cntnts/cntntsView.do?mi=18077&cntntsId=6530',
    icon: '📘',
    featured: true
  },
  {
    id: 'course-registration',
    category: 'academic',
    labelKo: '수강신청',
    labelEn: 'Course Reg.',
    labelZh: 'Course Reg.',
    descriptionKo: '학부 수강신청 시스템',
    url: 'https://chains.changwon.ac.kr/nonstop/suup/sugang/hakbu/index.php?mi=18302',
    icon: '📚',
    featured: true
  },
  {
    id: 'dreamcatch',
    category: 'study',
    labelKo: '드림캐치',
    labelEn: 'DreamCatch',
    labelZh: 'DreamCatch',
    descriptionKo: '창원대학교 비교과 및 역량 관리 시스템',
    url: 'https://dreamcatch.changwon.ac.kr/main.do?mi=18316',
    icon: '🧭',
    featured: true
  },
  {
    id: 'edream',
    category: 'study',
    labelKo: '이뤄드림',
    labelEn: 'e-Dream',
    labelZh: 'e-Dream',
    descriptionKo: '창원대학교 이뤄드림 시스템',
    url: 'https://edream.changwon.ac.kr/?mi=18315',
    icon: '🌟',
    featured: true
  },
  {
    id: 'copykiller',
    category: 'study',
    labelKo: '카피킬러',
    labelEn: 'CopyKiller',
    labelZh: 'CopyKiller',
    descriptionKo: '창원대학교 카피킬러 서비스',
    url: 'https://changwongrad.copykiller.com/welcome',
    icon: '📝',
    featured: false
  },
  {
    id: 'food',
    category: 'life',
    labelKo: '학식',
    labelEn: 'Food',
    labelZh: 'Food',
    descriptionKo: '창원대학교 식단 페이지',
    url: 'https://app.changwon.ac.kr/campus/campus_001.do',
    icon: '🍚',
    featured: false
  },
  {
    id: 'library',
    category: 'study',
    labelKo: '도서관',
    labelEn: 'Library',
    labelZh: 'Library',
    descriptionKo: '창원대학교 도서관',
    url: 'https://lib.changwon.ac.kr/',
    icon: '📚',
    featured: false
  },
  {
    id: 'instagram',
    category: 'external',
    labelKo: '인스타그램',
    labelEn: 'Instagram',
    labelZh: 'Instagram',
    descriptionKo: '창원대학교 공식 인스타그램',
    url: 'https://www.instagram.com/cwnu_official/?mi=18361',
    icon: '📸',
    featured: false
  }
];

export const campusLinksById = Object.fromEntries(
  campusLinks.map((link) => [link.id, link])
);

export const campusNoticeLinkIds = ['cwnu-notice', 'wagle'];

export const campusQuickLinkIds = [
  'ecampus',
  'academic-calendar',
  'academic-guide',
  'tuition',
  'curriculum',
  'course-registration',
  'dreamcatch',
  'edream'
];

export const getCampusLinkLabel = (link, lang) => {
  if (lang === 'ko') return link.labelKo;
  if (lang === 'zh') return link.labelZh || link.labelEn;
  return link.labelEn;
};

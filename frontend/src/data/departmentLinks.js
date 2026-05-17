export const selectedDepartmentStorageKey = 'cwnu.selectedDepartmentId';

export const departmentLinks = [
  {
    id: 'computer-engineering',
    collegeId: 'engineering',
    collegeNameKo: '공과대학',
    departmentNameKo: '컴퓨터공학과',
    departmentNameEn: 'Computer Engineering',
    departmentNameZh: 'Computer Engineering',
    links: [
      {
        id: 'homepage',
        labelKo: '학과 홈페이지',
        labelEn: 'Department Homepage',
        labelZh: 'Department Homepage',
        url: '',
        needsVerification: true,
        disabled: true
      },
      {
        id: 'notice',
        labelKo: '학과 공지사항',
        labelEn: 'Department Notice',
        labelZh: 'Department Notice',
        url: '',
        needsVerification: true,
        disabled: true
      }
    ]
  },
  {
    id: 'business-administration',
    collegeId: 'business',
    collegeNameKo: '경영대학',
    departmentNameKo: '경영학과',
    departmentNameEn: 'Business Administration',
    departmentNameZh: 'Business Administration',
    links: [
      {
        id: 'homepage',
        labelKo: '학과 홈페이지',
        labelEn: 'Department Homepage',
        labelZh: 'Department Homepage',
        url: '',
        needsVerification: true,
        disabled: true
      },
      {
        id: 'notice',
        labelKo: '학과 공지사항',
        labelEn: 'Department Notice',
        labelZh: 'Department Notice',
        url: '',
        needsVerification: true,
        disabled: true
      }
    ]
  },
  {
    id: 'nursing',
    collegeId: 'health',
    collegeNameKo: '간호대학',
    departmentNameKo: '간호학과',
    departmentNameEn: 'Nursing',
    departmentNameZh: 'Nursing',
    links: [
      {
        id: 'homepage',
        labelKo: '학과 홈페이지',
        labelEn: 'Department Homepage',
        labelZh: 'Department Homepage',
        url: '',
        needsVerification: true,
        disabled: true
      },
      {
        id: 'notice',
        labelKo: '학과 공지사항',
        labelEn: 'Department Notice',
        labelZh: 'Department Notice',
        url: '',
        needsVerification: true,
        disabled: true
      }
    ]
  }
];

export const defaultDepartmentId = departmentLinks[0]?.id || '';

export const departmentLinksById = Object.fromEntries(
  departmentLinks.map((department) => [department.id, department])
);

export const getDepartmentLabel = (department, lang) => {
  if (lang === 'ko') return department.departmentNameKo;
  if (lang === 'zh') return department.departmentNameZh || department.departmentNameEn;
  return department.departmentNameEn;
};

export const getDepartmentLinkLabel = (link, lang) => {
  if (lang === 'ko') return link.labelKo;
  if (lang === 'zh') return link.labelZh || link.labelEn;
  return link.labelEn;
};

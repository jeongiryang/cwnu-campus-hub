import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage';
import TodoPage from './pages/TodoPage';
import GpaPage from './pages/GpaPage';
import { campusLinksById, getCampusLinkLabel } from './data/campusLinks';

const getMonthDays = (year, monthIndex) => {
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const lastDate = new Date(year, monthIndex + 1, 0).getDate();
  return [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: lastDate }, (_, index) => index + 1)
  ];
};

const formatDateTime = (langCode, is12Hour) => {
  const now = new Date();
  const year = now.getFullYear();
  const monthIndex = now.getMonth();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const dateNum = now.getDate();
  const date = String(dateNum).padStart(2, '0');
  const dayIndex = now.getDay();
  const dayName = langCode === 'ko'
    ? ['일', '월', '화', '수', '목', '금', '토'][dayIndex]
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayIndex];
  
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const ampm = hours >= 12 ? (langCode === 'ko' ? '오후' : 'PM') : (langCode === 'ko' ? '오전' : 'AM');
  const displayHours = is12Hour ? (hours % 12 || 12) : hours;
  
  return {
    year,
    monthIndex,
    dateNum,
    dayIndex,
    dateStr: `${year}. ${month}. ${date}`,
    dayStr: `(${dayName})`,
    dayName,
    isWeekend: dayIndex === 0 || dayIndex === 6,
    ampm: is12Hour ? ampm : '',
    timeStr: `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  };
};

function App() {
  const isOff = false;
  if (isOff) {
    void (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white text-center p-5 z-[9999] relative">
        <span className="text-6xl mb-6 animate-bounce">🚧</span>
        <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter">
          CWNU 포털 <span className="text-blue-500">업데이트 중</span>
        </h1>
        <p className="text-gray-400 font-bold text-lg">
          더 멋진 기능으로 찾아오겠습니다. 조금만 기다려주세요! 😎
        </p>
      </div>
    );
  }

  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('cwnu_dark_mode') === 'true');
  const [lang, setLang] = useState(() => localStorage.getItem('cwnu_lang') || 'ko');
  const [is12Hour, setIs12Hour] = useState(() => localStorage.getItem('cwnu_is12Hour') === 'true');
  const [isDatePanelOpen, setIsDatePanelOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(null);

  useEffect(() => {
    localStorage.setItem('cwnu_is12Hour', is12Hour);
  }, [is12Hour]);

  useEffect(() => {
    localStorage.setItem('cwnu_lang', lang);
  }, [lang]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('cwnu_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('cwnu_dark_mode', 'false');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const updateDateTime = () => {
      const result = formatDateTime(lang, is12Hour);
      setCurrentDateTime(result);
    };

    updateDateTime();
    const timerId = setInterval(updateDateTime, 1000);
    return () => clearInterval(timerId);
  }, [lang, is12Hour]);

  const [timerMode, setTimerMode] = useState('timer'); 
  const [timerTime, setTimerTime] = useState(0);
  const [timerIsRunning, setTimerIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (timerIsRunning) {
      interval = setInterval(() => {
        setTimerTime((prev) => {
          if (timerMode === 'timer') {
            if (prev <= 10) { setTimerIsRunning(false); return 0; }
            return prev - 10;
          } else {
            return prev + 10; 
          }
        });
      }, 10);
    }
    return () => clearInterval(interval);
  }, [timerIsRunning, timerMode]);

  const getMenuClass = (path) => {
    const baseClass = "flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-[11px] md:text-sm transition-all ";
    return baseClass + (location.pathname === path 
      ? "bg-white/20 text-white shadow-inner" 
      : "text-white/70 hover:text-white hover:bg-white/10");
  };

  const t = {
    ko: {
      todo: "TODO",
      gpa: "GPA 계산기",
      tagline: "학생용 캠퍼스 허브",
      today: "오늘",
      calendar: "캘린더",
      academicSchedule: "학사일정",
      openSchedule: "학사일정 열기",
      timeMode: "시간 형식",
      close: "닫기"
    },
    en: {
      todo: "TODO",
      gpa: "GPA Calc",
      tagline: "Student campus hub",
      today: "Today",
      calendar: "Calendar",
      academicSchedule: "Academic Schedule",
      openSchedule: "Open Schedule",
      timeMode: "Time Format",
      close: "Close"
    }
  };
  const currentText = t[lang] || t.ko;
  const academicScheduleLink = campusLinksById['academic-calendar'];
  const calendarDays = currentDateTime ? getMonthDays(currentDateTime.year, currentDateTime.monthIndex) : [];
  const weekdayLabels = lang === 'ko'
    ? ['일', '월', '화', '수', '목', '금', '토']
    : ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-white dark:bg-gray-900 transition-colors font-sans`}>
      <header className="sticky top-0 z-[170] border-b border-white/10 bg-[#002f6c]/95 text-white shadow-lg shadow-blue-950/10 backdrop-blur-xl transition-colors dark:bg-gray-950/95">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-center justify-between gap-3">
            <button type="button" onClick={() => navigate('/')} className="group flex min-w-0 items-center gap-3 text-left">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-sm font-black shadow-inner shadow-white/10 transition group-hover:bg-white/15">CH</span>
              <span className="min-w-0">
                <span className="block truncate text-lg font-black tracking-tight sm:text-xl">CWNU Campus Hub</span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-blue-100/70">{currentText.tagline}</span>
              </span>
            </button>
            <div className="flex items-center gap-2 md:hidden">
              <button onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')} className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-black text-white shadow-sm transition hover:bg-white/20">
                {lang === 'ko' ? 'ENG' : 'KOR'}
              </button>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs shadow-sm transition hover:bg-white/20">{isDarkMode ? '☀️' : '🌙'}</button>
            </div>
          </div>

          <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 md:justify-end">
            {location.pathname !== '/' && (
              <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-black/15 p-1 shadow-inner shadow-black/10">
                <Link to="/todo" className={getMenuClass('/todo')}>📝 <span className="hidden sm:inline">{currentText.todo}</span><span className="sm:hidden text-[10px]">{currentText.todo}</span></Link>
                <Link to="/gpa" className={getMenuClass('/gpa')}>🎓 <span className="hidden sm:inline">{currentText.gpa}</span><span className="sm:hidden text-[10px]">GPA</span></Link>
              </nav>
            )}

            <div className="relative min-w-0">
              {currentDateTime && (
                <button
                  type="button"
                  onClick={() => setIsDatePanelOpen((prev) => !prev)}
                  className="flex min-w-0 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-left shadow-sm transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
                  aria-expanded={isDatePanelOpen}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black text-[#002f6c] shadow-sm">⌁</span>
                  <span className="min-w-0">
                    <span className="block truncate text-[11px] font-black text-blue-100">{currentDateTime.dateStr} {currentDateTime.dayStr}</span>
                    <span className="block truncate font-mono text-sm font-black leading-tight text-white sm:text-base">
                      {currentDateTime.ampm && <span className="mr-1 font-sans text-[10px] opacity-80">{currentDateTime.ampm}</span>}
                      {currentDateTime.timeStr}
                    </span>
                  </span>
                </button>
              )}

              {currentDateTime && isDatePanelOpen && (
                <div className="absolute left-0 top-[calc(100%+0.75rem)] z-[220] w-[min(22rem,calc(100vw-2rem))] rounded-[1.5rem] border border-gray-100 bg-white p-4 text-gray-900 shadow-2xl shadow-blue-950/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white md:left-auto md:right-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.24em] text-blue-600 dark:text-blue-300">{currentText.calendar}</p>
                      <h2 className="mt-1 text-xl font-black">{currentDateTime.dateStr}</h2>
                      <p className={`text-sm font-bold ${currentDateTime.isWeekend ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>{currentText.today} {currentDateTime.dayStr}</p>
                    </div>
                    <button type="button" onClick={() => setIsDatePanelOpen(false)} className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-black text-gray-500 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">{currentText.close}</button>
                  </div>

                  <div className="mt-4 rounded-2xl bg-gray-50 p-3 dark:bg-gray-800/80">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-gray-500 dark:text-gray-400">{currentText.timeMode}</span>
                      <button type="button" onClick={() => setIs12Hour((prev) => !prev)} className="rounded-full bg-white px-3 py-1.5 text-[11px] font-black text-[#002f6c] shadow-sm transition hover:bg-blue-50 dark:bg-gray-900 dark:text-blue-300 dark:hover:bg-gray-700">
                        {is12Hour ? '12H' : '24H'}
                      </button>
                    </div>
                    <div className="mt-3 font-mono text-3xl font-black tracking-tight text-[#002f6c] dark:text-blue-200">
                      {currentDateTime.ampm && <span className="mr-2 font-sans text-xs text-gray-400">{currentDateTime.ampm}</span>}
                      {currentDateTime.timeStr}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-7 gap-1 text-center">
                    {weekdayLabels.map((day, index) => (
                      <span key={`${day}-${index}`} className="py-1 text-[10px] font-black text-gray-400">{day}</span>
                    ))}
                    {calendarDays.map((day, index) => (
                      <span
                        key={`${day || 'blank'}-${index}`}
                        className={`flex aspect-square items-center justify-center rounded-xl text-xs font-black ${
                          day === currentDateTime.dateNum
                            ? 'bg-[#002f6c] text-white shadow-sm dark:bg-blue-500'
                            : day
                              ? 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                              : 'bg-transparent'
                        }`}
                      >
                        {day || ''}
                      </span>
                    ))}
                  </div>

                  {academicScheduleLink && (
                    <a href={academicScheduleLink.url} target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-between rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-black text-[#002f6c] transition hover:border-blue-300 dark:border-blue-800/50 dark:bg-blue-900/20 dark:text-blue-200">
                      <span>{getCampusLinkLabel(academicScheduleLink, lang)}</span>
                      <span className="text-[11px] text-blue-500 dark:text-blue-300">{currentText.openSchedule} ↗</span>
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <button onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')} className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-black text-white shadow-sm transition hover:bg-white/20">
                {lang === 'ko' ? 'ENG' : 'KOR'}
              </button>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs shadow-sm transition hover:bg-white/20">
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<MainPage lang={lang} />} />
          <Route path="/todo" element={<TodoPage lang={lang} timerMode={timerMode} setTimerMode={setTimerMode} timerTime={timerTime} setTimerTime={setTimerTime} timerIsRunning={timerIsRunning} setTimerIsRunning={setTimerIsRunning} />} />
          <Route path="/gpa" element={<GpaPage lang={lang} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

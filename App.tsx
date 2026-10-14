import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Volume2,
  Play,
  RotateCcw,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Search,
  Trophy,
  Layers,
  Timer,
  BookOpen,
  Heart,
  Gauge,
  Sparkles,
  VolumeX
} from 'lucide-react';
import { QUESTIONS_DATA, CATEGORIES, RETO_FINAL_DATA } from './data.ts';
import { playSound, speakSpanish, isSoundMuted, setMasterMute } from './audio.ts';

type AppTab = 'cards' | 'list' | 'challenge' | 'quiz';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('cards');
  const [selectedCategory, setSelectedCategory] = useState<number>(0); // 0 = all
  const [searchQuery, setSearchQuery] = useState('');
  
  // Card mode state - DEFAULT is Spanish ➔ Armenian as requested!
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [primaryLanguage, setPrimaryLanguage] = useState<'es' | 'am'>('es'); // Default is 'es' (Español -> Armenian)
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(0.9);
  const [isMuted, setIsMuted] = useState<boolean>(() => isSoundMuted());

  const toggleMasterMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      setMasterMute(next);
      if (!next) {
        playSound('whistle');
      }
      return next;
    });
  };
  
  // Progress & favorites
  const [learnedIds, setLearnedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('futbol_learned_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('futbol_fav_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // List mode expanded card IDs
  const [expandedListIds, setExpandedListIds] = useState<Record<number, boolean>>({});

  // 5-second challenge state
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isChallengeRevealed, setIsChallengeRevealed] = useState(false);
  const [challengeScore, setChallengeScore] = useState(0);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Quiz state
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);
  const [quizOptions, setQuizOptions] = useState<{ es: string; am: string }[]>([]);
  const [quizCorrectOptionIndex, setQuizCorrectOptionIndex] = useState(0);
  const [isQuizGoalCelebration, setIsQuizGoalCelebration] = useState(false);

  // Save progress
  useEffect(() => {
    try {
      localStorage.setItem('futbol_learned_ids', JSON.stringify(learnedIds));
    } catch {}
  }, [learnedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('futbol_fav_ids', JSON.stringify(favoriteIds));
    } catch {}
  }, [favoriteIds]);

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    return QUESTIONS_DATA.filter((item) => {
      const matchesCategory = selectedCategory === 0 || item.categoryNumber === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;
      const matchesSearch =
        item.questionEs.toLowerCase().includes(q) ||
        item.questionAm.toLowerCase().includes(q) ||
        item.answerEs.toLowerCase().includes(q) ||
        item.answerAm.toLowerCase().includes(q) ||
        item.grammarTag.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const currentCard = filteredQuestions[currentCardIndex] || filteredQuestions[0];

  // Reset card state when moving
  useEffect(() => {
    setIsRevealed(false);
  }, [currentCardIndex, selectedCategory]);

  // Audio helper
  const handleSpeak = async (text: string, id: string) => {
    if (isMuted) {
      setIsMuted(false);
      setMasterMute(false);
    }
    setSpeakingId(id);
    await speakSpanish(text, speechRate);
    setSpeakingId(null);
  };

  // Toggle learned
  const toggleLearned = (id: number) => {
    setLearnedIds((prev) => {
      const exists = prev.includes(id);
      if (!exists) playSound('success');
      return exists ? prev.filter((i) => i !== id) : [...prev, id];
    });
  };

  const toggleFavorite = (id: number) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Next / Prev Card
  const nextCard = () => {
    if (filteredQuestions.length === 0) return;
    setCurrentCardIndex((prev) => (prev + 1) % filteredQuestions.length);
  };

  const prevCard = () => {
    if (filteredQuestions.length === 0) return;
    setCurrentCardIndex((prev) => (prev - 1 + filteredQuestions.length) % filteredQuestions.length);
  };

  // 5-Second Challenge Timer effect
  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            playSound('buzzer');
            setIsTimerRunning(false);
            return 0;
          }
          playSound('tick');
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isTimerRunning, timeLeft]);

  const startChallengeTimer = () => {
    setTimeLeft(5);
    setIsTimerRunning(true);
    setIsChallengeRevealed(false);
    playSound('whistle');
    const currentQ = RETO_FINAL_DATA[challengeIndex];
    if (currentQ) {
      speakSpanish(currentQ.questionEs, speechRate);
    }
  };

  const handleNextChallenge = (scored: boolean) => {
    if (scored) {
      setChallengeScore((prev) => prev + 1);
      playSound('goal');
    }
    if (challengeIndex + 1 < RETO_FINAL_DATA.length) {
      setChallengeIndex((prev) => prev + 1);
      setTimeLeft(5);
      setIsTimerRunning(false);
      setIsChallengeRevealed(false);
    } else {
      setChallengeCompleted(true);
      playSound('goal');
    }
  };

  const restartChallenge = () => {
    setChallengeIndex(0);
    setTimeLeft(5);
    setIsTimerRunning(false);
    setIsChallengeRevealed(false);
    setChallengeScore(0);
    setChallengeCompleted(false);
  };

  // Setup Quiz questions (Spanish question -> choose correct Spanish answer with Armenian subtitle)
  const setupQuizRound = (index: number) => {
    const target = QUESTIONS_DATA[index % QUESTIONS_DATA.length];
    const distractors = QUESTIONS_DATA
      .filter((q) => q.id !== target.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((q) => ({ es: q.answerEs, am: q.answerAm }));
    
    const correctChoice = { es: target.answerEs, am: target.answerAm };
    const allOptions = [...distractors, correctChoice].sort(() => 0.5 - Math.random());
    setQuizOptions(allOptions);
    setQuizCorrectOptionIndex(allOptions.findIndex((o) => o.es === target.answerEs));
    setQuizAnswered(null);
    setIsQuizGoalCelebration(false);
  };

  useEffect(() => {
    if (activeTab === 'quiz') {
      setupQuizRound(quizQuestionIndex);
    }
  }, [activeTab, quizQuestionIndex]);

  const handleQuizSelect = (optionIndex: number) => {
    if (quizAnswered !== null) return;
    setQuizAnswered(optionIndex);
    if (optionIndex === quizCorrectOptionIndex) {
      setQuizScore((prev) => prev + 1);
      playSound('goal');
      setIsQuizGoalCelebration(true);
    } else {
      playSound('buzzer');
    }
  };

  const nextQuizRound = () => {
    setQuizQuestionIndex((prev) => (prev + 1) % QUESTIONS_DATA.length);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Stadium Pitch Ambient Field Graphic */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-slate-950 to-slate-950"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-emerald-500/10 rounded-full"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-emerald-500/10"></div>
      </div>

      {/* Top Navigation Bar: 3 Zones Contract */}
      <header className="relative z-20 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand title */}
          <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
            <span className="text-2xl" role="img" aria-label="football">⚽</span>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-white font-heading">
                Escucha y responde
              </span>
              <span className="text-xs text-emerald-400 font-medium">
                🇪🇸 Español ➔ 🇦🇲 Հայերեն · Nivel A2 (7.º)
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium">
            <button
              onClick={() => setActiveTab('cards')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'cards'
                  ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Քարտեր (Իսպ ➔ Հայ)</span>
            </button>

            <button
              onClick={() => setActiveTab('list')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'list'
                  ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>50 Խոսակցական</span>
            </button>

            <button
              onClick={() => setActiveTab('challenge')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'challenge'
                  ? 'bg-amber-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Timer className="w-4 h-4" />
              <span>5 վրկ Թեստ</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'bg-sky-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Վիկտորինա</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action (Speed, Master Mute & Play) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Speed Rate Control */}
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg text-xs text-slate-300">
              <Gauge className="w-3.5 h-3.5 text-emerald-400" />
              <button
                onClick={() => setSpeechRate((r) => (r === 0.9 ? 0.75 : r === 0.75 ? 1.0 : 0.9))}
                className="hover:text-white font-medium tabular-nums"
                title="Փոխել իսպաներենի արտասանության արագությունը"
              >
                Արագություն: {speechRate}x
              </button>
            </div>

            {/* Master Mute / Unmute Button (Общая кнопка звука) */}
            <button
              onClick={toggleMasterMute}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap shrink-0 border ${
                isMuted
                  ? 'bg-rose-950/70 border-rose-600/70 text-rose-300 hover:bg-rose-900/60'
                  : 'bg-slate-900 border-slate-700 text-slate-200 hover:text-white hover:border-slate-500'
              }`}
              title={isMuted ? 'Միացնել ձայնը (Включить звук)' : 'Անջատել ձայնը (Отключить звук)'}
              aria-label={isMuted ? 'Включить звук' : 'Отключить звук'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                  <span className="hidden sm:inline">Ձայնն անջատված է</span>
                  <span className="sm:hidden">Անջատ</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Ձայնը միացված է</span>
                  <span className="sm:hidden">Ձայն</span>
                </>
              )}
            </button>

            {/* Play Greeting Button */}
            <button
              onClick={() => {
                if (isMuted) {
                  setIsMuted(false);
                  setMasterMute(false);
                }
                playSound('whistle');
                speakSpanish('¡Vamos a jugar al fútbol! ¿Estás listo?', speechRate);
              }}
              className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-sm"
              title="Լսել ողջույնը իսպաներենով"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Լսել</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* Banner Section */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-heading flex items-center gap-2">
              <span>¡Vamos a jugar al fútbol! Լսի՛ր և պատասխանի՛ր</span>
              <span className="text-xs font-normal bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded">
                A2 · 7.º curso
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Իսպաներեն ➔ Հայերեն: Կտտացրո՛ւ իսպաներեն հարցի վրա՝ հայերեն թարգմանությունն ու պատասխանները բացելու համար։
            </p>
          </div>

          {/* Quick Stats & Audio Indicator */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 tabular-nums">
            {isMuted && (
              <button
                onClick={toggleMasterMute}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-950/80 border border-rose-700/80 text-rose-300 hover:bg-rose-900/60 transition-colors animate-pulse"
                title="Կտտացրու ձայնը միացնելու համար (Кликните, чтобы включить звук)"
              >
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                <span>Ձայնն անջատված է · Միացնե՞լ</span>
              </button>
            )}
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Ուսումնասիրված: <strong className="text-white">{learnedIds.length}</strong> / 50</span>
            </div>
            <span className="text-slate-700">·</span>
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Ընտրյալ: <strong className="text-white">{favoriteIds.length}</strong></span>
            </div>
          </div>
        </div>

        {/* TAB 1: FLASHCARDS (SPANISH -> ARMENIAN WITH CLICK TO REVEAL) */}
        {activeTab === 'cards' && (
          <div className="space-y-6">
            {/* Direction Selector & Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <div className="flex items-center gap-2 text-xs font-medium">
                <span className="text-slate-400">Ուղղություն:</span>
                <button
                  onClick={() => setPrimaryLanguage('es')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    primaryLanguage === 'es'
                      ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  🇪🇸 Español ➔ 🇦🇲 Հայերեն (Հիմնական)
                </button>
                <button
                  onClick={() => setPrimaryLanguage('am')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    primaryLanguage === 'am'
                      ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  🇦🇲 Հայերեն ➔ 🇪🇸 Español
                </button>
              </div>

              {/* Category Dropdown */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Բաժին:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(Number(e.target.value));
                    setCurrentCardIndex(0);
                  }}
                  className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value={0}>Բոլոր բաժինները (50)</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.id}. {cat.nameAm} ({cat.count})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Main Interactive Flashcard Stage */}
            {currentCard ? (
              <div className="relative">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden transition-all">
                  {/* Category & Status Bar */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-6 pb-4 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-semibold font-mono">
                        #{currentCard.id}
                      </span>
                      <span>·</span>
                      <span className="text-slate-300 font-medium">
                        {currentCard.categoryNumber}. {currentCard.categoryEs} — {currentCard.categoryAm}
                      </span>
                      <span>·</span>
                      <span className="text-emerald-400 font-mono text-[11px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {currentCard.grammarTag}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleFavorite(currentCard.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          favoriteIds.includes(currentCard.id)
                            ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                            : 'border-slate-800 text-slate-500 hover:text-slate-300'
                        }`}
                        title="Նշել որպես ընտրյալ"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                      <button
                        onClick={() => toggleLearned(currentCard.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          learnedIds.includes(currentCard.id)
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            : 'border-slate-800 text-slate-500 hover:text-slate-300'
                        }`}
                        title="Նշել որպես սովորած"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* CLICKABLE PRIMARY PROMPT CONTAINER */}
                  <div
                    onClick={() => {
                      if (!isRevealed) {
                        setIsRevealed(true);
                        playSound('whistle');
                        if (primaryLanguage === 'es') {
                          speakSpanish(currentCard.answerEs, speechRate);
                        } else {
                          speakSpanish(currentCard.questionEs, speechRate);
                        }
                      }
                    }}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      !isRevealed
                        ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-emerald-500/40 hover:border-emerald-400 shadow-lg shadow-emerald-950/20 group'
                        : 'bg-slate-950/80 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">
                          {primaryLanguage === 'es' ? '🇪🇸' : '🇦🇲'}
                        </span>
                        <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">
                          {primaryLanguage === 'es'
                            ? 'Հարց իսպաներենով (Pregunta en español):'
                            : 'Հարց հայերենով (Հայերեն):'}
                        </span>
                      </div>

                      {/* Listen button for Spanish */}
                      {primaryLanguage === 'es' && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSpeak(currentCard.questionEs, `prompt-${currentCard.id}`);
                          }}
                          className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                          title="Լսել հարցի իսպաներեն արտասանությունը"
                        >
                          <Volume2 className={`w-4 h-4 ${speakingId === `prompt-${currentCard.id}` ? 'animate-bounce text-white' : ''}`} />
                          <span>Լսել</span>
                        </button>
                      )}
                    </div>

                    {/* Spanish Question displayed prominently */}
                    <p className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                      {primaryLanguage === 'es' ? currentCard.questionEs : currentCard.questionAm}
                    </p>

                    {/* Prompt hint under question when not revealed */}
                    {!isRevealed && (
                      <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 font-medium">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-emerald-400" />
                          <span>Կտտացրու այստեղ՝ հայերեն թարգմանությունն ու պատասխանը բացելու համար</span>
                        </span>
                        <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                      </div>
                    )}
                  </div>

                  {/* REVEALED ACCORDION: ARMENIAN TRANSLATION + SPANISH ANSWER + ARMENIAN ANSWER */}
                  {isRevealed && (
                    <div className="mt-6 pt-6 border-t border-slate-800 space-y-5 animate-fadeIn">
                      {/* 1. Armenian Question Translation */}
                      <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl">
                        <span className="text-xs text-slate-400 font-semibold block mb-1">
                          🇦🇲 Հարցի հայերեն թարգմանությունը:
                        </span>
                        <p className="text-lg sm:text-xl font-bold text-slate-100">
                          {currentCard.questionAm}
                        </p>
                      </div>

                      {/* 2. The Answer (Spanish + Armenian) */}
                      <div className="p-5 bg-emerald-950/25 border border-emerald-900/60 rounded-xl">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-2">
                            <div>
                              <span className="text-xs text-emerald-400 font-semibold block mb-1">
                                ⚽ Պատասխան իսպաներենով (Respuesta):
                              </span>
                              <p className="text-lg sm:text-xl font-bold text-white">
                                {currentCard.answerEs}
                              </p>
                            </div>

                            <div className="pt-2 border-t border-emerald-900/40">
                              <span className="text-xs text-slate-400 font-semibold block mb-1">
                                🇦🇲 Պատասխանի հայերեն թարգմանությունը:
                              </span>
                              <p className="text-base text-emerald-200">
                                {currentCard.answerAm}
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleSpeak(currentCard.answerEs, `ans-${currentCard.id}`)}
                            className="p-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-colors shrink-0 shadow-md"
                            title="Լսել պատասխանի իսպաներեն արտասանությունը"
                          >
                            <Volume2 className={`w-5 h-5 ${speakingId === `ans-${currentCard.id}` ? 'animate-bounce' : ''}`} />
                          </button>
                        </div>

                        {/* Grammar / Vocabulary note */}
                        {currentCard.notes && (
                          <div className="mt-3 pt-3 border-t border-emerald-900/40 text-xs text-slate-400 flex items-center gap-2">
                            <span className="text-emerald-400 font-semibold">Բառապաշար / Օգնություն:</span>
                            <span>{currentCard.notes}</span>
                          </div>
                        )}
                      </div>

                      {/* Footer Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <button
                          onClick={() => setIsRevealed(false)}
                          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
                        >
                          <ChevronUp className="w-4 h-4" />
                          <span>Փակել թարգմանությունը</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleLearned(currentCard.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                              learnedIds.includes(currentCard.id)
                                ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{learnedIds.includes(currentCard.id) ? 'Սովորել եմ ✓' : 'Նշել որպես սովորած'}</span>
                          </button>

                          <button
                            onClick={nextCard}
                            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1 transition-colors"
                          >
                            <span>Հաջորդ հարցը</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Navigation Controls */}
                <div className="flex items-center justify-between mt-4 px-1 text-xs text-slate-400">
                  <button
                    onClick={prevCard}
                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Նախորդ</span>
                  </button>

                  <div className="tabular-nums font-mono">
                    Հարց <span className="text-white font-bold">{currentCardIndex + 1}</span> / {filteredQuestions.length}
                  </div>

                  <button
                    onClick={nextCard}
                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 transition-colors"
                  >
                    <span>Հաջորդ</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 text-sm">
                Ոչ մի հարց չի գտնվել ընտրված պայմաններով։
              </div>
            )}
          </div>
        )}

        {/* TAB 2: FULL 50 QUESTIONS DIRECTORY (SPANISH FIRST -> CLICK FOR ARMENIAN & ANSWERS) */}
        {activeTab === 'list' && (
          <div className="space-y-6">
            {/* Search & Bulk Expand Controls */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl space-y-4">
              <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Որոնել իսպաներեն կամ հայերեն բառեր (futbol, gol, portería, վազել, դարպաս)..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                    >
                      Մաքրել
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const allIds: Record<number, boolean> = {};
                      filteredQuestions.forEach((q) => {
                        allIds[q.id] = true;
                      });
                      setExpandedListIds(allIds);
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs whitespace-nowrap"
                  >
                    Բացել բոլորը
                  </button>
                  <button
                    onClick={() => setExpandedListIds({})}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs whitespace-nowrap"
                  >
                    Փակել բոլորը
                  </button>
                </div>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => setSelectedCategory(0)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === 0
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Բոլորը (50)
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-emerald-600 text-white font-semibold'
                        : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {cat.id}. {cat.nameEs} ({cat.nameAm})
                  </button>
                ))}
              </div>
            </div>

            {/* List with Spanish Heading on every row */}
            <div className="space-y-3">
              {filteredQuestions.map((item) => {
                const isOpen = !!expandedListIds[item.id];
                const isLearned = learnedIds.includes(item.id);
                const isFav = favoriteIds.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className={`border rounded-xl transition-all duration-150 overflow-hidden ${
                      isOpen
                        ? 'bg-slate-900 border-emerald-500/50 shadow-md'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Header Row — Spanish First */}
                    <div
                      onClick={() => {
                        setExpandedListIds((prev) => ({
                          ...prev,
                          [item.id]: !prev[item.id],
                        }));
                        if (!isOpen) {
                          speakSpanish(item.questionEs, speechRate);
                        }
                      }}
                      className="p-4 flex items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <span className="font-mono text-xs font-bold text-emerald-400 bg-slate-950 px-2 py-1 rounded shrink-0 border border-slate-800">
                          {item.id}
                        </span>
                        <div className="min-w-0">
                          {/* Spanish Question is Primary! */}
                          <p className="text-sm sm:text-base font-bold text-white leading-snug flex items-center gap-2">
                            <span>🇪🇸 {item.questionEs}</span>
                          </p>
                          {/* Click guide subtitle */}
                          <p className="text-xs text-slate-400 mt-1">
                            {isOpen ? `🇦🇲 ${item.questionAm}` : '👉 Կտտացրու հայերեն թարգմանությունն ու պատասխանը տեսնելու համար'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isLearned && (
                          <span className="hidden sm:inline-flex items-center text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
                            Սովորած
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSpeak(item.questionEs, `list-es-${item.id}`);
                          }}
                          className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-emerald-400"
                          title="Լսել իսպաներեն արտասանությունը"
                        >
                          <Volume2 className={`w-4 h-4 ${speakingId === `list-es-${item.id}` ? 'animate-bounce text-emerald-400' : ''}`} />
                        </button>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-emerald-400' : ''
                          }`}
                        />
                      </div>
                    </div>

                    {/* Expanded details */}
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 border-t border-slate-800/80 bg-slate-950/40 space-y-3">
                        {/* Armenian Question Translation */}
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-0.5">
                            🇦🇲 Հարցի հայերեն թարգմանությունը:
                          </span>
                          <p className="text-sm sm:text-base font-semibold text-white">
                            {item.questionAm}
                          </p>
                        </div>

                        {/* Spanish & Armenian Answer */}
                        <div className="p-3 bg-emerald-950/30 rounded-lg border border-emerald-900/60 flex items-start justify-between gap-3">
                          <div className="space-y-1.5">
                            <div>
                              <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold block mb-0.5">
                                ⚽ Պատասխան իսպաներենով (Respuesta):
                              </span>
                              <p className="text-sm sm:text-base font-bold text-white">
                                {item.answerEs}
                              </p>
                            </div>
                            <div className="pt-1 border-t border-emerald-900/40">
                              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-0.5">
                                🇦🇲 Պատասխանի հայերեն թարգմանությունը:
                              </span>
                              <p className="text-xs sm:text-sm text-emerald-300/90 font-medium">
                                {item.answerAm}
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleSpeak(item.answerEs, `list-ans-${item.id}`)}
                            className="p-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-lg shrink-0"
                            title="Լսել պատասխանը իսպաներենով"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Metadata Footer */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-400">
                          <div className="flex items-center gap-2">
                            <span>Քերականություն: <strong className="text-slate-300">{item.grammarTag}</strong></span>
                            {item.notes && (
                              <>
                                <span>·</span>
                                <span>{item.notes}</span>
                              </>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleFavorite(item.id)}
                              className={`p-1 text-xs hover:text-rose-400 flex items-center gap-1 ${
                                isFav ? 'text-rose-400' : 'text-slate-500'
                              }`}
                            >
                              <Heart className="w-3.5 h-3.5 fill-current" />
                              <span>{isFav ? 'Ընտրված' : 'Ընտրել'}</span>
                            </button>
                            <button
                              onClick={() => toggleLearned(item.id)}
                              className={`p-1 text-xs hover:text-emerald-400 flex items-center gap-1 ${
                                isLearned ? 'text-emerald-400' : 'text-slate-500'
                              }`}
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>{isLearned ? 'Սովորած ✓' : 'Նշել որպես սովորած'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredQuestions.length === 0 && (
                <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 text-sm">
                  Որոնմանը համապատասխանող արդյունքներ չկան։
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: 5-SECOND CHALLENGE (🎯 RETO FINAL — RESPONDE EN 5 SEGUNDOS) */}
        {activeTab === 'challenge' && (
          <div className="max-w-2xl mx-auto space-y-6">
            {!challengeCompleted ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-6 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">🎯 Reto final</span>
                    <span>·</span>
                    <span>Responde en 5 segundos (A2)</span>
                  </div>
                  <div className="tabular-nums font-mono">
                    Հարց <span className="text-white font-bold">{challengeIndex + 1}</span> / {RETO_FINAL_DATA.length}
                  </div>
                </div>

                <p className="text-xs text-slate-400 mb-6">
                  Այս անգամ աշակերտը պետք է պատասխանի ինքնուրույն՝ առանց պատրաստի պատասխանի։ Ունես 5 վայրկյան իսպաներեն արձագանքելու համար։
                </p>

                {/* Spanish Question Prominent */}
                <div className="text-center py-4">
                  <span className="text-xs text-emerald-400 uppercase tracking-wider font-semibold block mb-2">
                    Pregunta {challengeIndex + 1} de 10 · Español
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                    {RETO_FINAL_DATA[challengeIndex].questionEs}
                  </h2>
                  <p className="text-sm text-slate-400 mt-2">
                    (Կտտացրու «Ստուգել պատասխանը»՝ հայերեն թարգմանությունն ու պատասխանը տեսնելու համար)
                  </p>

                  <button
                    onClick={() => speakSpanish(RETO_FINAL_DATA[challengeIndex].questionEs, speechRate)}
                    className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg text-xs"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Լսել հարցը</span>
                  </button>
                </div>

                {/* 5-Second Timer Dial */}
                <div className="my-8 flex flex-col items-center justify-center">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        className="stroke-slate-800 stroke-[8] fill-none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        className={`stroke-[8] fill-none transition-all duration-1000 ${
                          timeLeft <= 2 ? 'stroke-rose-500' : 'stroke-amber-400'
                        }`}
                        strokeDasharray={264}
                        strokeDashoffset={264 - (264 * (timeLeft / 5))}
                        strokeLinecap="round"
                      />
                    </svg>

                    <div className="absolute flex flex-col items-center justify-center">
                      <span className={`text-4xl font-extrabold tabular-nums font-mono ${
                        timeLeft <= 2 ? 'text-rose-400' : 'text-amber-400'
                      }`}>
                        {timeLeft}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">վայրկյան</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    {!isTimerRunning && timeLeft === 5 && (
                      <button
                        onClick={startChallengeTimer}
                        className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center gap-2 shadow-lg shadow-amber-900/20 active:scale-95"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Սկսել 5 վայրկյանը</span>
                      </button>
                    )}

                    {!isTimerRunning && timeLeft < 5 && (
                      <button
                        onClick={startChallengeTimer}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Կրկնել ժամանակը</span>
                      </button>
                    )}

                    {isTimerRunning && (
                      <div className="text-xs text-amber-300 font-medium animate-pulse flex items-center gap-2">
                        <span>⏳ Ժամանակը գնում է... Պատասխանի՛ր իսպաներենով</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Reveal Model Answer Button */}
                {!isChallengeRevealed ? (
                  <div className="text-center pt-4 border-t border-slate-800">
                    <button
                      onClick={() => {
                        setIsChallengeRevealed(true);
                        setIsTimerRunning(false);
                        playSound('whistle');
                        speakSpanish(RETO_FINAL_DATA[challengeIndex].modelAnswerEs, speechRate);
                      }}
                      className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 mx-auto"
                    >
                      <span>Ստուգել (Բացել հայերեն թարգմանությունն ու պատասխանը)</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-slate-800 space-y-4 animate-fadeIn">
                    {/* Armenian Translation */}
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                      <span className="text-xs text-slate-400 font-semibold block mb-0.5">
                        🇦🇲 Հարցի հայերեն թարգմանությունը:
                      </span>
                      <p className="text-base font-bold text-slate-200">
                        {RETO_FINAL_DATA[challengeIndex].questionAm}
                      </p>
                    </div>

                    {/* Model Answer */}
                    <div className="bg-emerald-950/30 border border-emerald-900/60 p-4 rounded-xl">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-xs text-emerald-400 font-semibold block mb-1">
                            ⚽ Օրինակելի պատասխան (Respuesta modelo):
                          </span>
                          <p className="text-lg font-bold text-white">
                            {RETO_FINAL_DATA[challengeIndex].modelAnswerEs}
                          </p>
                          <p className="text-sm text-emerald-300/90 mt-1">
                            {RETO_FINAL_DATA[challengeIndex].modelAnswerAm}
                          </p>
                          <p className="text-xs text-slate-400 mt-2">
                            💡 Հուշում: {RETO_FINAL_DATA[challengeIndex].hint}
                          </p>
                        </div>
                        <button
                          onClick={() => speakSpanish(RETO_FINAL_DATA[challengeIndex].modelAnswerEs, speechRate)}
                          className="p-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg shrink-0"
                          title="Լսել պատասխանը"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Evaluation Buttons */}
                    <div className="flex items-center justify-between gap-3 pt-2">
                      <span className="text-xs text-slate-400">Կարողացա՞ր պատասխանել:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleNextChallenge(false)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
                        >
                          Դեռ ոչ / Կրկնել
                        </button>
                        <button
                          onClick={() => handleNextChallenge(true)}
                          className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5"
                        >
                          <Check className="w-4 h-4" />
                          <span>Ստացվեց (+1)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Finish Screen */
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6 shadow-xl">
                <div className="w-16 h-16 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto text-3xl">
                  🏆
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white font-heading">
                    Շնորհավորո՛ւմ ենք, փուլն ավարտվեց:
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    ¡Buen trabajo! Դու հաջողությամբ ավարտեցիր 5 վայրկյանի էքսպրես մարտահրավերը։
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl max-w-xs mx-auto">
                  <span className="text-xs text-slate-400 block mb-1">Քո արդյունքը</span>
                  <div className="text-3xl font-extrabold text-emerald-400 font-mono">
                    {challengeScore} / {RETO_FINAL_DATA.length}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={restartChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl text-sm transition-colors flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Կրկնել մարտահրավերը</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('cards')}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm"
                  >
                    Վերադառնալ քարտերին
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SOCCER QUIZ (SPANISH QUESTION -> CHOOSE CORRECT RESPONSE) */}
        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-sky-400 font-bold">⚽ Վիկտորինա</span>
                  <span>·</span>
                  <span>Իսպաներեն հարց և պատասխան</span>
                </div>
                <div className="tabular-nums font-mono">
                  Միավորներ: <strong className="text-emerald-400">{quizScore}</strong>
                </div>
              </div>

              {/* Spanish Question */}
              <div className="mb-6">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-2">
                  Լսի՛ր կամ կարդա՛ հարցը և ընտրիր ճիշտ պատասխանը:
                </span>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                      🇪🇸 {QUESTIONS_DATA[quizQuestionIndex % QUESTIONS_DATA.length].questionEs}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      🇦🇲 {QUESTIONS_DATA[quizQuestionIndex % QUESTIONS_DATA.length].questionAm}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => speakSpanish(QUESTIONS_DATA[quizQuestionIndex % QUESTIONS_DATA.length].questionEs, speechRate)}
                    className="p-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-xl shrink-0"
                    title="Լսել հարցը"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Choices */}
              <div className="space-y-3">
                {quizOptions.map((opt, idx) => {
                  const isSelected = quizAnswered === idx;
                  const isCorrect = idx === quizCorrectOptionIndex;
                  let btnStyle = 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-200';
                  
                  if (quizAnswered !== null) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    } else {
                      btnStyle = 'opacity-50 border-slate-800 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizSelect(idx)}
                      disabled={quizAnswered !== null}
                      className={`w-full p-4 rounded-xl border text-left text-sm sm:text-base transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs text-slate-400 w-5 pt-0.5">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        <div>
                          <p className="font-semibold text-white">{opt.es}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{opt.am}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {quizAnswered !== null && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakSpanish(opt.es, speechRate);
                          }}
                          className="p-1 text-slate-400 hover:text-white"
                          title="Լսել տարբերակը"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Next */}
              {quizAnswered !== null && (
                <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
                  <div>
                    {isQuizGoalCelebration ? (
                      <span className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
                        <span>⚽ ¡GOOOL! Ճիշտ է։</span>
                      </span>
                    ) : (
                      <span className="text-rose-400 text-sm flex items-center gap-1.5">
                        <span>Ճիշտ պատասխանը նշված է կանաչով։</span>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={nextQuizRound}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>Հաջորդ հարցը</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span>⚽ Լսի՛ր և պատասխանի՛ր</span>
            <span className="mx-2">·</span>
            <span>Español ➔ Հայերեն</span>
            <span className="mx-2">·</span>
            <span>Nivel A2 (7.º curso)</span>
          </div>
          <div>
            <span>50 կենդանի ֆուտբոլային արտահայտություն և 5 վայրկյանի էքսպրես մարտահրավեր</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

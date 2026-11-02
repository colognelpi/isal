import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, CheckCircle2, XCircle, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { QuizQuestion } from '../config/relationshipData';
import { audioEngine } from '../utils/audioSynth';

interface GameQuizProps {
  questions: QuizQuestion[];
  partnerTwoName: string;
}

export function GameQuiz({ questions, partnerTwoName }: GameQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      audioEngine.playQuizSuccessSfx();
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      audioEngine.playCelebrationSfx();
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  const getScoreVerdict = () => {
    const percentage = Math.round((score / questions.length) * 100);
    if (percentage === 100) {
      return {
        title: "100%! You remember everything.",
        quote: `You didn't miss a single one, ${partnerTwoName}. You remember all the little details that mean the world to me.`
      };
    } else if (percentage >= 70) {
      return {
        title: "So close! You know us so well.",
        quote: `Almost perfect! The little things that matter most, you already know by heart. The rest just gives us an excuse to reminisce together.`
      };
    } else {
      return {
        title: "An excuse to tell you all over again.",
        quote: `Just a sweet excuse for me to hold your hand and tell you all our favorite stories again.`
      };
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#151313]/90 border border-[#8B101D]/30 backdrop-blur-md rounded-2xl p-6 sm:p-10 glow-crimson-subtle relative overflow-hidden">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C51F35] to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#8B101D]/20 pb-5 mb-8">
        <div>
          <span className="text-[11px] font-cinzel uppercase tracking-[0.25em] text-[#C51F35] block">
            ROMANTIC CHALLENGE
          </span>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl text-[#F3EEEE] mt-1">
            How Well Do You Know Us?
          </h2>
        </div>

        {!isCompleted && (
          <div className="text-right">
            <span className="text-xs font-sans-clean tracking-wider text-[#AAA3A3]">
              Question <span className="text-[#F3EEEE] font-semibold">{currentIndex + 1}</span> of{' '}
              {questions.length}
            </span>
            <div className="w-24 sm:w-32 h-1.5 bg-[#080808] rounded-full overflow-hidden mt-1.5 border border-[#8B101D]/30">
              <div
                className="h-full bg-gradient-to-r from-[#8B101D] to-[#C51F35] transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!isCompleted ? (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            {/* Question Text */}
            <h3 className="font-serif-editorial text-xl sm:text-2xl text-[#F3EEEE] leading-snug">
              {currentQ.question}
            </h3>

            {/* Answer Options */}
            <div className="grid grid-cols-1 gap-3.5 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let stateClass =
                  "bg-[#080808]/90 border-[#2A161B] text-[#F3EEEE] hover:border-[#8B101D] hover:bg-[#1C1417] hover:shadow-[0_0_20px_rgba(139,16,29,0.25)]";

                if (isAnswered) {
                  if (isCorrect) {
                    stateClass =
                      "bg-[#8B101D]/30 border-[#C51F35] text-white shadow-[0_0_20px_rgba(197,31,53,0.4)]";
                  } else if (isSelected && !isCorrect) {
                    stateClass = "bg-[#251216]/70 border-red-900/60 text-[#AAA3A3] opacity-75";
                  } else {
                    stateClass = "bg-[#080808]/40 border-[#1c1214] text-[#AAA3A3]/40";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`group w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 cursor-pointer disabled:cursor-default ${stateClass}`}
                  >
                    <span className="w-6 h-6 rounded-full border border-[#8B101D]/60 group-hover:border-[#C51F35] flex items-center justify-center text-xs font-cinzel text-[#AAA3A3] group-hover:text-[#F3EEEE] shrink-0 mt-0.5 transition-colors">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm sm:text-base font-sans-clean font-normal text-[#F3EEEE] flex-1 leading-relaxed group-hover:text-white transition-colors">
                      {opt}
                    </span>

                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-[#C51F35] shrink-0 mt-0.5" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-500/80 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Sweet Comment */}
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 p-4 rounded-xl bg-[#080808]/90 border border-[#8B101D]/40 space-y-3"
              >
                <div className="flex items-center gap-2">
                  {selectedOption === currentQ.correctIndex ? (
                    <span className="text-xs uppercase font-cinzel tracking-wider text-[#C51F35] flex items-center gap-1.5 font-semibold">
                      <Heart className="w-3.5 h-3.5 fill-[#C51F35]" /> Perfect choice!
                    </span>
                  ) : (
                    <span className="text-xs uppercase font-cinzel tracking-wider text-[#AAA3A3]">
                      Sweet guess, but here is my heart's truth:
                    </span>
                  )}
                </div>
                <p className="text-sm font-serif-editorial italic text-[#F3EEEE] leading-relaxed">
                  “{currentQ.sweetComment}”
                </p>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 bg-[#8B101D] hover:bg-[#C51F35] text-[#F3EEEE] rounded-lg font-cinzel text-xs uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_15px_rgba(139,16,29,0.5)]"
                  >
                    {currentIndex + 1 === questions.length ? "View Our Score" : "Next Memory →"}
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-6"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-[#151313] border border-[#8B101D]/60 flex items-center justify-center glow-crimson">
              <Trophy className="w-10 h-10 text-[#C51F35]" />
            </div>

            <div>
              <p className="text-xs uppercase font-cinzel tracking-[0.25em] text-[#C51F35]">
                CHALLENGE COMPLETE
              </p>
              <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#F3EEEE] mt-2">
                {getScoreVerdict().title}
              </h3>
            </div>

            <div className="inline-block px-6 py-2.5 rounded-full bg-[#080808] border border-[#8B101D]/40 text-sm font-sans-clean text-[#F3EEEE] tracking-wider">
              Score: <span className="text-[#C51F35] font-bold text-lg tabular-nums">{score}</span> /{' '}
              {questions.length} Moments Remembered
            </div>

            <p className="max-w-lg mx-auto font-serif-editorial italic text-base sm:text-lg text-[#AAA3A3] leading-relaxed">
              “{getScoreVerdict().quote}”
            </p>

            <div className="pt-4">
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#151313] hover:bg-[#8B101D]/30 border border-[#8B101D]/50 text-[#F3EEEE] rounded-lg font-cinzel text-xs uppercase tracking-widest transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-[#C51F35]" />
                Play Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

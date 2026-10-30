import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { heritageQuizQuestions } from '../data/quizData';

export const HeritageQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = heritageQuizQuestions[currentIndex];

  const handleSelect = (userChoice: boolean) => {
    if (isAnswered) return;
    setSelectedAnswer(userChoice);
    setIsAnswered(true);

    if (userChoice === currentQ.isFact) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < heritageQuizQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCompleted(false);
    setScore(0);
  };

  const getEvaluationTitle = () => {
    const total = heritageQuizQuestions.length;
    const ratio = score / total;
    if (ratio >= 0.8) return { title: 'Mắt Thần Giám Định Di Sản', desc: 'Kiến thức sử học và khả năng phân biệt ngụy thư của bạn vô cùng xuất sắc.' };
    if (ratio >= 0.5) return { title: 'Nhà Nghiên Cứu Tập Sự', desc: 'Bạn có nền tảng tốt nhưng cần chú ý thêm một số chi tiết mỹ thuật tinh tế.' };
    return { title: 'Người Yêu Di Sản Cần Trau Dồi', desc: 'Nhiều cạm bẫy tin giả mạng xã hội đã đánh lừa bạn. Hãy đọc kỹ Sổ tay 5 bước!' };
  };

  return (
    <section id="quiz" className="max-w-7xl mx-auto px-6 py-12 border-t border-stone-200">
      <div className="border-b border-stone-200 pb-5 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-stone-500 mb-1">
          <span>Module 04</span>
          <span aria-hidden="true">·</span>
          <span>Thử Thách Thấu Thị & Thẩm Tra Lịch Sử</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
          Thử Thách "Mắt Thần Di Sản"
        </h2>
        <p className="text-stone-600 text-sm mt-1 max-w-3xl">
          Kiểm tra trực giác và kiến thức của bạn trước các luận điệu thật giả lẫn lộn về cổ vật, 
          di tích lịch sử và văn hóa truyền thống Việt Nam.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {!isCompleted ? (
          <div className="bg-white rounded-xl border border-stone-300 p-6 sm:p-8 shadow-xs space-y-6">
            {/* Quiz Progress */}
            <div className="flex items-center justify-between text-xs text-stone-500 pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2 font-mono">
                <span>Câu hỏi</span>
                <span className="font-bold text-stone-900 tabular-nums">
                  {currentIndex + 1} / {heritageQuizQuestions.length}
                </span>
                <span aria-hidden="true">·</span>
                <span>{currentQ.category}</span>
              </div>
              <div className="font-mono">
                Điểm số: <strong className="text-stone-900 tabular-nums">{score}</strong>
              </div>
            </div>

            {/* Heritage Subject */}
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {currentQ.heritageName}
              </span>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 mt-3 leading-snug">
                "{currentQ.claim}"
              </h3>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button
                type="button"
                disabled={isAnswered}
                onClick={() => handleSelect(true)}
                className={`cursor-pointer p-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  isAnswered
                    ? currentQ.isFact === true
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs'
                      : selectedAnswer === true
                      ? 'bg-red-50 border-red-400 text-red-900'
                      : 'bg-stone-50 border-stone-200 text-stone-400 opacity-60'
                    : 'bg-white hover:bg-stone-50 border-stone-300 text-stone-800 hover:border-emerald-600'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Sự thật lịch sử</span>
              </button>

              <button
                type="button"
                disabled={isAnswered}
                onClick={() => handleSelect(false)}
                className={`cursor-pointer p-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  isAnswered
                    ? currentQ.isFact === false
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs'
                      : selectedAnswer === false
                      ? 'bg-red-50 border-red-400 text-red-900'
                      : 'bg-stone-50 border-stone-200 text-stone-400 opacity-60'
                    : 'bg-white hover:bg-stone-50 border-stone-300 text-stone-800 hover:border-red-600'
                }`}
              >
                <XCircle className="w-4 h-4 text-red-700" />
                <span>Thông tin sai lệch</span>
              </button>
            </div>

            {/* Post-answer feedback */}
            {isAnswered && (
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-3 animate-fadeIn">
                <div className="flex items-center gap-2">
                  {selectedAnswer === currentQ.isFact ? (
                    <span className="text-xs font-bold font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> CHÍNH XÁC
                    </span>
                  ) : (
                    <span className="text-xs font-bold font-mono text-red-800 bg-red-100 px-2 py-0.5 rounded flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> CHƯA CHÍNH XÁC
                    </span>
                  )}
                </div>

                <p className="text-xs text-stone-700 leading-relaxed font-sans">
                  {currentQ.explanation}
                </p>

                <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-mono pt-1 border-t border-stone-200">
                  <BookOpen className="w-3 h-3 text-stone-400" />
                  <span>Nguồn sử liệu: {currentQ.source}</span>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="cursor-pointer px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>{currentIndex + 1 < heritageQuizQuestions.length ? 'Câu tiếp theo' : 'Xem kết quả chung cuộc'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Final Score Card */
          <div className="bg-white rounded-xl border border-stone-300 p-8 shadow-xs text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 mx-auto flex items-center justify-center">
              <Award className="w-8 h-8 text-amber-900" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-stone-500">
                Kết quả thử thách J01
              </span>
              <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                {getEvaluationTitle().title}
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto mt-2 leading-relaxed">
                {getEvaluationTitle().desc}
              </p>
            </div>

            <div className="py-4 px-6 bg-stone-50 rounded-xl border border-stone-200 max-w-xs mx-auto">
              <span className="text-xs text-stone-500 block font-mono">Điểm số của bạn</span>
              <span className="text-4xl font-bold font-mono text-stone-900 tabular-nums">
                {score} / {heritageQuizQuestions.length}
              </span>
            </div>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={handleRestart}
                className="cursor-pointer px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Thực hiện lại thử thách</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

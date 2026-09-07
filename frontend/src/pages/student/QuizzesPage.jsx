import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HelpCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  SparklesIcon,
  AwardIcon,
  XIcon,
  ArrowRightIcon
} from "../../components/Icons";
import { studentQuizzes } from "../../data/studentData";

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState(studentQuizzes);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  const filteredQuizzes = quizzes.filter((q) => {
    if (activeFilter === "passed") return q.status === "Passed";
    if (activeFilter === "available") return q.status === "Available";
    if (activeFilter === "not-started") return q.status === "Not Started";
    return true;
  });

  const handleStartQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizResult(null);
  };

  const handleSelectOption = (qIdx, optIdx) => {
    if (quizResult) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [qIdx]: optIdx
    });
  };

  const handleSubmitQuiz = () => {
    if (!activeQuiz) return;
    const questions = activeQuiz.questions || [];
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) {
        correctCount += 1;
      }
    });

    const calculatedScore = Math.round((correctCount / questions.length) * 100);
    const passed = calculatedScore >= 70;

    const result = {
      score: calculatedScore,
      correctCount,
      totalCount: questions.length,
      passed
    };
    setQuizResult(result);

    setQuizzes((prev) =>
      prev.map((q) => {
        if (q.id === activeQuiz.id) {
          return {
            ...q,
            status: passed ? "Passed" : "Available",
            score: calculatedScore,
            attempts: "1 / 3"
          };
        }
        return q;
      })
    );
  };

  const passedCount = quizzes.filter((q) => q.status === "Passed").length;

  return (
    <div className="student-quizzes-page">
      {/* Page Header */}
      <div className="student-page-header">
        <div>
          <h1>Assessments & Knowledge Checks</h1>
          <p className="student-page-subtitle">
            Test your understanding with rigorous conceptual and coding quizzes. Score 70% or higher to earn module badges.
          </p>
        </div>
        <div className="header-badge-stat">
          <span className="badge-stat-val">{passedCount} / {quizzes.length}</span>
          <span className="badge-stat-lbl">Quizzes Passed</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="learning-filter-bar">
        <div className="learning-tabs">
          <button
            type="button"
            className={`tab-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All Quizzes ({quizzes.length})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeFilter === "available" ? "active" : ""}`}
            onClick={() => setActiveFilter("available")}
          >
            Available ({quizzes.filter((q) => q.status === "Available").length})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeFilter === "passed" ? "active" : ""}`}
            onClick={() => setActiveFilter("passed")}
          >
            Passed ({passedCount})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeFilter === "not-started" ? "active" : ""}`}
            onClick={() => setActiveFilter("not-started")}
          >
            Not Started ({quizzes.filter((q) => q.status === "Not Started").length})
          </button>
        </div>
      </div>

      {/* Quiz Cards Grid */}
      <div className="quizzes-grid">
        {filteredQuizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-card lms-content-card">
            <div className="quiz-card-top">
              <span className="quiz-course-tag">{quiz.courseName}</span>
              <span
                className={`quiz-status-pill ${
                  quiz.status === "Passed"
                    ? "passed"
                    : quiz.status === "Available"
                    ? "available"
                    : "not-started"
                }`}
              >
                {quiz.status === "Passed" ? "Passed ✓" : quiz.status}
              </span>
            </div>

            <h3 className="quiz-card-title">{quiz.title}</h3>

            <div className="quiz-meta-row">
              <div className="quiz-meta-item">
                <HelpCircleIcon size={16} />
                <span>{quiz.questionsCount} Questions</span>
              </div>
              <div className="quiz-meta-item">
                <ClockIcon size={16} />
                <span>{quiz.duration}</span>
              </div>
              <div className="quiz-meta-item">
                <AwardIcon size={16} />
                <span>Attempts: {quiz.attempts}</span>
              </div>
            </div>

            {quiz.score !== null && (
              <div className="quiz-score-banner">
                <span>Best Score</span>
                <span className="quiz-score-highlight">{quiz.score}%</span>
              </div>
            )}

            <div className="quiz-card-footer">
              <button
                type="button"
                className={`btn ${quiz.status === "Passed" ? "btn-secondary" : "btn-primary"} btn-take-quiz`}
                onClick={() => handleStartQuiz(quiz)}
              >
                {quiz.status === "Passed" ? "Retake Quiz" : "Take Assessment"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* INTERACTIVE QUIZ MODAL */}
      {activeQuiz && (
        <div className="modal-overlay">
          <div className="quiz-modal-card">
            {/* Modal Header */}
            <div className="quiz-modal-header">
              <div>
                <span className="quiz-modal-course">{activeQuiz.courseName}</span>
                <h2>{activeQuiz.title}</h2>
              </div>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setActiveQuiz(null)}
                aria-label="Close quiz"
              >
                <XIcon size={20} />
              </button>
            </div>

            {/* Quiz Body */}
            <div className="quiz-modal-body">
              {!quizResult ? (
                <>
                  {/* Progress Indicator */}
                  <div className="quiz-progress-bar-wrap">
                    <div className="quiz-step-info">
                      <span>Question {currentQuestionIndex + 1} of {activeQuiz.questions?.length || 1}</span>
                      <span>Passing Score: 70%</span>
                    </div>
                    <div className="quiz-track">
                      <div
                        className="quiz-track-fill"
                        style={{
                          width: `${(((currentQuestionIndex + 1) / (activeQuiz.questions?.length || 1)) * 100)}%`
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Active Question */}
                  {activeQuiz.questions && activeQuiz.questions[currentQuestionIndex] ? (
                    <div className="quiz-question-box">
                      <h3 className="question-text">
                        {activeQuiz.questions[currentQuestionIndex].question}
                      </h3>

                      <div className="quiz-options-list">
                        {activeQuiz.questions[currentQuestionIndex].options.map((option, optIdx) => {
                          const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                          return (
                            <label
                              key={optIdx}
                              className={`quiz-option-item ${isSelected ? "selected" : ""}`}
                              onClick={() => handleSelectOption(currentQuestionIndex, optIdx)}
                            >
                              <input
                                type="radio"
                                name={`question-${currentQuestionIndex}`}
                                checked={isSelected}
                                onChange={() => handleSelectOption(currentQuestionIndex, optIdx)}
                              />
                              <span className="opt-letter">{String.fromCharCode(65 + optIdx)}</span>
                              <span className="opt-text">{option}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <p>No questions configured for this quiz.</p>
                  )}

                  {/* Question Nav Controls */}
                  <div className="quiz-nav-actions">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      disabled={currentQuestionIndex === 0}
                      onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                    >
                      Previous Question
                    </button>

                    {currentQuestionIndex < (activeQuiz.questions?.length || 1) - 1 ? (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                      >
                        Next Question →
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary btn-submit-quiz"
                        onClick={handleSubmitQuiz}
                      >
                        Submit Assessment
                      </button>
                    )}
                  </div>
                </>
              ) : (
                /* QUIZ RESULT VIEW */
                <div className="quiz-results-screen">
                  <div className={`result-score-circle ${quizResult.passed ? "passed" : "failed"}`}>
                    <span className="result-score-num">{quizResult.score}%</span>
                    <span className="result-score-label">{quizResult.passed ? "Passed" : "Needs Review"}</span>
                  </div>

                  <h3>
                    {quizResult.passed
                      ? "Outstanding Performance! 🎉"
                      : "Good Effort! Keep Practicing 💪"}
                  </h3>
                  <p className="result-feedback-text">
                    {quizResult.passed
                      ? `You answered ${quizResult.correctCount} out of ${quizResult.totalCount} questions correctly and met the mastery requirement.`
                      : `You answered ${quizResult.correctCount} out of ${quizResult.totalCount} questions correctly. You need 70% to pass. Review the lesson modules and try again.`}
                  </p>

                  <div className="result-actions-flex">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => handleStartQuiz(activeQuiz)}
                    >
                      Try Again
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setActiveQuiz(null)}
                    >
                      Return to Quizzes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

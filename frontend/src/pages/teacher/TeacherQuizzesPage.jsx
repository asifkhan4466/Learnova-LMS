import React, { useState } from "react";
import {
  HelpCircleIcon,
  PlusIcon,
  TrashIcon,
  ClockIcon,
  AwardIcon,
  CheckCircleIcon,
  BookOpenIcon
} from "../../components/Icons";
import { teacherQuizzes, teacherCourses } from "../../data/teacherData";

export default function TeacherQuizzesPage() {
  const [quizzes, setQuizzes] = useState(teacherQuizzes);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New Quiz State
  const [newQuiz, setNewQuiz] = useState({
    title: "",
    courseId: "ai-agents-engineering",
    courseName: "Next-Gen AI Agents & LLM Application Engineering",
    duration: "20 mins",
    passingScore: 70,
    questions: [
      {
        id: "q-1",
        question: "What is the primary function of a state checkpointer in LangGraph?",
        options: [
          "It persists intermediate node executions to support rewind and resumption.",
          "It translates Python syntax into C++.",
          "It forces models to answer in JSON format.",
          "It replaces SQLite with Redis."
        ],
        answer: 0
      }
    ]
  });

  const handleOpenCreate = () => {
    setCreateModalOpen(true);
    setSaveSuccess(false);
  };

  const handleAddQuestion = () => {
    const nextQ = {
      id: `q-${Date.now()}`,
      question: "",
      options: ["", "", "", ""],
      answer: 0
    };
    setNewQuiz({
      ...newQuiz,
      questions: [...newQuiz.questions, nextQ]
    });
  };

  const handleRemoveQuestion = (idx) => {
    setNewQuiz({
      ...newQuiz,
      questions: newQuiz.questions.filter((_, i) => i !== idx)
    });
  };

  const handleQuestionTextChange = (qIdx, text) => {
    const updated = [...newQuiz.questions];
    updated[qIdx].question = text;
    setNewQuiz({ ...newQuiz, questions: updated });
  };

  const handleOptionChange = (qIdx, optIdx, val) => {
    const updated = [...newQuiz.questions];
    updated[qIdx].options[optIdx] = val;
    setNewQuiz({ ...newQuiz, questions: updated });
  };

  const handleSetCorrectAnswer = (qIdx, optIdx) => {
    const updated = [...newQuiz.questions];
    updated[qIdx].answer = optIdx;
    setNewQuiz({ ...newQuiz, questions: updated });
  };

  const handleSaveQuiz = (e) => {
    e.preventDefault();
    if (!newQuiz.title) return;

    const matchedCourse = teacherCourses.find((c) => c.id === newQuiz.courseId);
    const created = {
      id: `quiz-${Date.now()}`,
      courseId: newQuiz.courseId,
      courseName: matchedCourse ? matchedCourse.title : "Curriculum",
      title: newQuiz.title,
      questionsCount: newQuiz.questions.length,
      duration: newQuiz.duration,
      passingScore: newQuiz.passingScore,
      averageScore: 0,
      attemptsCount: 0,
      passRate: "New",
      questions: newQuiz.questions
    };

    setQuizzes([created, ...quizzes]);
    setSaveSuccess(true);
    setTimeout(() => {
      setCreateModalOpen(false);
      setSaveSuccess(false);
    }, 1200);
  };

  return (
    <div className="teacher-quizzes-page">
      {/* Page Header */}
      <div className="student-page-header">
        <div>
          <h1>Quiz & Knowledge Check Manager</h1>
          <p className="student-page-subtitle">
            Author multiple-choice assessments, configure passing criteria, and monitor automated evaluation statistics.
          </p>
        </div>
        <div className="header-actions-group">
          <button type="button" className="btn btn-primary" onClick={handleOpenCreate}>
            <PlusIcon size={16} />
            <span>Create New Quiz</span>
          </button>
        </div>
      </div>

      {/* Quiz Catalog Grid */}
      <div className="quizzes-grid">
        {quizzes.map((q) => (
          <div key={q.id} className="quiz-card lms-content-card">
            <div className="quiz-card-top">
              <span className="quiz-course-tag">{q.courseName}</span>
              <span className="quiz-status-pill available">Active Quiz</span>
            </div>

            <h3 className="quiz-card-title">{q.title}</h3>

            <div className="quiz-meta-row">
              <div className="quiz-meta-item">
                <HelpCircleIcon size={16} />
                <span>{q.questionsCount} Questions</span>
              </div>
              <div className="quiz-meta-item">
                <ClockIcon size={16} />
                <span>{q.duration}</span>
              </div>
              <div className="quiz-meta-item">
                <AwardIcon size={16} />
                <span>Passing: {q.passingScore}%</span>
              </div>
            </div>

            <div className="quiz-score-banner">
              <div>
                <span className="text-muted" style={{ fontSize: "11px", display: "block" }}>Cohort Average</span>
                <strong className="text-success">{q.averageScore > 0 ? `${q.averageScore}%` : "No attempts"}</strong>
              </div>
              <div>
                <span className="text-muted" style={{ fontSize: "11px", display: "block" }}>Pass Rate</span>
                <strong>{q.passRate}</strong>
              </div>
              <div>
                <span className="text-muted" style={{ fontSize: "11px", display: "block" }}>Attempts</span>
                <strong>{q.attemptsCount}</strong>
              </div>
            </div>

            <div className="quiz-card-footer">
              <button
                type="button"
                className="btn btn-secondary full-width"
                onClick={() => alert(`Reviewing question telemetry for "${q.title}"`)}
              >
                Inspect Questions ({q.questionsCount})
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE QUIZ MODAL */}
      {createModalOpen && (
        <div className="modal-overlay">
          <div className="cert-modal-dialog" style={{ maxWidth: "820px" }}>
            <div className="quiz-modal-header">
              <div>
                <span className="quiz-modal-course">Assessment Studio</span>
                <h2>Create New Knowledge Check</h2>
              </div>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setCreateModalOpen(false)}
              >
                ✕
              </button>
            </div>

            {saveSuccess ? (
              <div style={{ textAlign: "center", padding: "36px" }}>
                <CheckCircleIcon size={48} className="text-success" style={{ margin: "0 auto 12px" }} />
                <h3>Quiz Created & Activated!</h3>
                <p className="text-muted">Learners enrolled in this curriculum will now have access to this assessment.</p>
              </div>
            ) : (
              <form onSubmit={handleSaveQuiz} className="quiz-modal-body">
                <div className="form-fields-grid">
                  <div className="form-group">
                    <label>Quiz Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Module 4 Quiz: Multi-Agent Consensus"
                      value={newQuiz.title}
                      onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Assign to Curriculum</label>
                    <select
                      value={newQuiz.courseId}
                      onChange={(e) => setNewQuiz({ ...newQuiz, courseId: e.target.value })}
                    >
                      {teacherCourses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-fields-grid" style={{ marginTop: "14px" }}>
                  <div className="form-group">
                    <label>Allotted Duration (Minutes)</label>
                    <input
                      type="text"
                      value={newQuiz.duration}
                      onChange={(e) => setNewQuiz({ ...newQuiz, duration: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Passing Score Percentage (%)</label>
                    <input
                      type="number"
                      min="50"
                      max="100"
                      value={newQuiz.passingScore}
                      onChange={(e) => setNewQuiz({ ...newQuiz, passingScore: parseInt(e.target.value, 10) || 70 })}
                    />
                  </div>
                </div>

                {/* Questions Builder */}
                <div className="questions-builder-section" style={{ marginTop: "24px" }}>
                  <div className="section-title-wrap" style={{ margin: "0 0 16px" }}>
                    <h3>Quiz Questions ({newQuiz.questions.length})</h3>
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={handleAddQuestion}
                    >
                      <PlusIcon size={14} />
                      <span>Add Question</span>
                    </button>
                  </div>

                  {newQuiz.questions.map((q, qIdx) => (
                    <div key={q.id || qIdx} className="question-edit-card lms-content-card" style={{ marginBottom: "16px" }}>
                      <div className="card-header-flex">
                        <strong>Question {qIdx + 1}</strong>
                        {newQuiz.questions.length > 1 && (
                          <button
                            type="button"
                            className="btn-remove-item"
                            onClick={() => handleRemoveQuestion(qIdx)}
                            title="Delete Question"
                          >
                            <TrashIcon size={14} />
                          </button>
                        )}
                      </div>

                      <div className="form-group full-width">
                        <label>Question Prompt *</label>
                        <input
                          type="text"
                          placeholder="e.g. Which algorithm is best suited for sparse vector search?"
                          value={q.question}
                          onChange={(e) => handleQuestionTextChange(qIdx, e.target.value)}
                          required
                        />
                      </div>

                      <div className="options-edit-list" style={{ marginTop: "12px" }}>
                        <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-muted)", display: "block", marginBottom: "8px" }}>
                          Multiple Choice Options (Select radio for correct answer):
                        </span>

                        {q.options.map((opt, optIdx) => (
                          <div key={optIdx} className="option-edit-row">
                            <input
                              type="radio"
                              name={`correct-answer-${qIdx}`}
                              checked={q.answer === optIdx}
                              onChange={() => handleSetCorrectAnswer(qIdx, optIdx)}
                              title="Set as correct answer"
                            />
                            <span className="opt-letter-tag">{String.fromCharCode(65 + optIdx)}</span>
                            <input
                              type="text"
                              placeholder={`Option ${String.fromCharCode(65 + optIdx)} text...`}
                              value={opt}
                              onChange={(e) => handleOptionChange(qIdx, optIdx, e.target.value)}
                              required
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="quiz-nav-actions" style={{ marginTop: "24px" }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setCreateModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Publish Quiz to Curriculum
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  PlayCircleIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowRightIcon,
  BookOpenIcon,
  ClockIcon,
  FileTextIcon,
  UsersIcon,
  SparklesIcon
} from "../../components/Icons";
import { coursesData } from "../../data/coursesData";
import { enrolledCourses } from "../../data/studentData";

export default function StudentCoursePlayerPage() {
  const { courseId } = useParams();

  // Find course or fallback to first course
  const course = coursesData.find((c) => c.id === courseId) || coursesData[0];
  const enrolledInfo = enrolledCourses.find((c) => c.id === course.id);

  // Active module & lesson states
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [expandedModules, setExpandedModules] = useState({ 0: true, 1: true });
  const [completedLessons, setCompletedLessons] = useState({
    "0-0": true,
    "0-1": true,
    "0-2": true,
    "1-0": true
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("overview"); // overview | resources | notes | qa
  const [playbackSpeed, setPlaybackSpeed] = useState("1x");

  const curriculum = course?.curriculum && course.curriculum.length ? course.curriculum : [
    {
      title: "Module 1: Foundations & Architecture",
      lessons: [
        { name: "Lesson 1: Platform Overview & System Concepts", duration: "30 min" },
        { name: "Lesson 2: Core Engineering Principles", duration: "45 min" }
      ]
    }
  ];

  const currentModule = curriculum[activeModuleIdx] || curriculum[0];
  const currentLesson = currentModule?.lessons?.[activeLessonIdx] || currentModule?.lessons?.[0] || { name: "Lesson 1: Introduction", duration: "45 min" };

  const lessonKey = `${activeModuleIdx}-${activeLessonIdx}`;
  const isCurrentCompleted = !!completedLessons[lessonKey];

  const toggleModuleAccordion = (idx) => {
    setExpandedModules((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleSelectLesson = (mIdx, lIdx) => {
    setActiveModuleIdx(mIdx);
    setActiveLessonIdx(lIdx);
    setIsPlaying(true);
  };

  const toggleCompleteCurrent = () => {
    setCompletedLessons((prev) => ({
      ...prev,
      [lessonKey]: !prev[lessonKey]
    }));
  };

  const handleNextLesson = () => {
    if (activeLessonIdx + 1 < (currentModule?.lessons?.length || 0)) {
      setActiveLessonIdx(activeLessonIdx + 1);
    } else if (activeModuleIdx + 1 < curriculum.length) {
      setActiveModuleIdx(activeModuleIdx + 1);
      setActiveLessonIdx(0);
      setExpandedModules((prev) => ({ ...prev, [activeModuleIdx + 1]: true }));
    }
  };

  const handlePrevLesson = () => {
    if (activeLessonIdx > 0) {
      setActiveLessonIdx(activeLessonIdx - 1);
    } else if (activeModuleIdx > 0) {
      const prevM = curriculum[activeModuleIdx - 1];
      setActiveModuleIdx(activeModuleIdx - 1);
      setActiveLessonIdx((prevM?.lessons?.length || 1) - 1);
    }
  };

  // Calculate live completion percentage
  const totalCourseLessons = curriculum.reduce((acc, m) => acc + (m.lessons || []).length, 0);
  const completedCount = Object.keys(completedLessons).filter((k) => completedLessons[k]).length;
  const progressPct = Math.min(100, Math.round((completedCount / (totalCourseLessons || 1)) * 100));

  return (
    <div className="course-player-page">
      {/* Player Header Bar */}
      <div className="player-top-bar">
        <div className="player-top-left">
          <Link to="/student/my-learning" className="player-back-link">
            ← My Learning
          </Link>
          <span className="player-sep">/</span>
          <h1 className="player-course-title">{course.title}</h1>
        </div>

        <div className="player-top-right">
          <div className="player-progress-badge">
            <span>Course Progress: <strong>{progressPct}%</strong></span>
            <div className="player-mini-bar">
              <div className="player-mini-bar-fill" style={{ width: `${progressPct}%` }}></div>
            </div>
          </div>
          <Link to={`/course/${course.id}`} className="btn-view-public-syllabus">
            View Syllabus
          </Link>
        </div>
      </div>

      {/* Player Main Layout (Video & Content + Lessons Sidebar) */}
      <div className="player-main-layout">
        {/* Left Column: Video Screen & Tabbed Information */}
        <div className="player-left-column">
          {/* Custom Interactive Video Screen Placeholder */}
          <div className="video-player-container">
            <div className="video-viewport">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="video-poster-img"
              />
              <div className={`video-controls-overlay ${isPlaying ? "playing" : ""}`}>
                <button
                  type="button"
                  className="btn-video-play-center"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  <PlayCircleIcon size={64} className="play-icon-svg" />
                </button>
                <div className="video-banner-info">
                  <span className="video-module-pill">Module {activeModuleIdx + 1}</span>
                  <h2>{currentLesson.name}</h2>
                </div>
              </div>

              {/* Bottom Video Progress Scrub Bar */}
              <div className="video-scrub-bar-wrap">
                <div className="video-timeline-bar">
                  <div className="video-timeline-fill" style={{ width: isPlaying ? "62%" : "35%" }}></div>
                </div>
                <div className="video-controls-row">
                  <div className="controls-left">
                    <button
                      type="button"
                      className="btn-vid-ctrl"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? "❚❚ Pause" : "▶ Play"}
                    </button>
                    <span className="video-time-counter">
                      {isPlaying ? "18:42" : "12:15"} / {currentLesson.duration}
                    </span>
                  </div>

                  <div className="controls-right">
                    <button
                      type="button"
                      className="btn-vid-speed"
                      onClick={() => {
                        const speeds = ["1x", "1.25x", "1.5x", "2x"];
                        const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                        setPlaybackSpeed(next);
                      }}
                    >
                      Speed: {playbackSpeed}
                    </button>
                    <span className="video-hd-badge">1080p HD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Navigation & Complete Action Bar */}
          <div className="lesson-action-bar">
            <div className="lesson-nav-buttons">
              <button
                type="button"
                className="btn-lesson-nav"
                onClick={handlePrevLesson}
                disabled={activeModuleIdx === 0 && activeLessonIdx === 0}
              >
                ← Previous Lesson
              </button>
              <button
                type="button"
                className="btn-lesson-nav"
                onClick={handleNextLesson}
                disabled={
                  activeModuleIdx === course.curriculum.length - 1 &&
                  activeLessonIdx === currentModule.lessons.length - 1
                }
              >
                Next Lesson →
              </button>
            </div>

            <button
              type="button"
              className={`btn-mark-complete ${isCurrentCompleted ? "completed" : ""}`}
              onClick={toggleCompleteCurrent}
            >
              <CheckCircleIcon size={18} />
              <span>{isCurrentCompleted ? "✓ Completed" : "Mark as Complete"}</span>
            </button>
          </div>

          {/* Content Tabs Below Player */}
          <div className="player-tabs-wrapper">
            <div className="player-tabs-header">
              <button
                type="button"
                className={`player-tab-btn ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                Lesson Overview
              </button>
              <button
                type="button"
                className={`player-tab-btn ${activeTab === "resources" ? "active" : ""}`}
                onClick={() => setActiveTab("resources")}
              >
                Labs & Code Resources (3)
              </button>
              <button
                type="button"
                className={`player-tab-btn ${activeTab === "instructor" ? "active" : ""}`}
                onClick={() => setActiveTab("instructor")}
              >
                Instructor Bio
              </button>
              <button
                type="button"
                className={`player-tab-btn ${activeTab === "qa" ? "active" : ""}`}
                onClick={() => setActiveTab("qa")}
              >
                Student Discussion & Q&A
              </button>
            </div>

            <div className="player-tab-body">
              {activeTab === "overview" && (
                <div className="tab-overview-content">
                  <h3>{currentLesson.name}</h3>
                  <p className="lesson-desc-paragraph">
                    In this lesson, we explore the core architecture of {currentLesson.name}. You will step through concrete source code examples, inspect edge cases in sandbox environments, and practice debugging common pitfalls.
                  </p>
                  <div className="key-takeaways-card">
                    <h4>What you achieve in this lesson:</h4>
                    <ul>
                      <li>Configure and run the exercise sandbox environment</li>
                      <li>Understand production design patterns and asynchronous state flow</li>
                      <li>Run unit test suites against your implementation</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "resources" && (
                <div className="tab-resources-content">
                  <h3>Downloadable Materials & Sandbox</h3>
                  <div className="resources-list">
                    <div className="resource-item">
                      <FileTextIcon size={20} className="res-icon" />
                      <div>
                        <strong>starter-code-repository.zip</strong>
                        <span>Source code files, Docker Compose scripts, and tests (14.2 MB)</span>
                      </div>
                      <button type="button" className="btn-res-download" onClick={() => alert("Downloading demo starter code archive.")}>
                        Download
                      </button>
                    </div>

                    <div className="resource-item">
                      <BookOpenIcon size={20} className="res-icon" />
                      <div>
                        <strong>lesson-lecture-slides-notes.pdf</strong>
                        <span>Full illustrated architectural slides with diagrams (4.8 MB)</span>
                      </div>
                      <button type="button" className="btn-res-download" onClick={() => alert("Downloading lecture notes PDF.")}>
                        Download
                      </button>
                    </div>

                    <div className="resource-item">
                      <SparklesIcon size={20} className="res-icon" />
                      <div>
                        <strong>Interactive Browser Sandbox Session</strong>
                        <span>Live hosted Linux terminal with Node.js and Python pre-configured</span>
                      </div>
                      <button type="button" className="btn-res-download" onClick={() => alert("Sandbox session initialized in test environment.")}>
                        Open Sandbox
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "instructor" && (
                <div className="tab-instructor-content">
                  <div className="instructor-mini-row">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="inst-avatar-large"
                    />
                    <div>
                      <h3>{course.instructor.name}</h3>
                      <p className="inst-title-tag">{course.instructor.title}</p>
                      <p className="inst-inst-tag">{course.instructor.institution}</p>
                    </div>
                  </div>
                  <p className="inst-bio-text">{course.instructor.bio}</p>
                </div>
              )}

              {activeTab === "qa" && (
                <div className="tab-qa-content">
                  <div className="qa-input-box">
                    <h4>Have a question about this lesson?</h4>
                    <textarea placeholder="Ask instructor and peer students a question..." rows="3"></textarea>
                    <button type="button" className="btn-primary-join" onClick={() => alert("Question submitted to instructor office hours.")}>
                      Post Question
                    </button>
                  </div>

                  <div className="qa-thread-list">
                    <div className="qa-item">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" className="qa-avatar" />
                      <div>
                        <div className="qa-header">
                          <strong>David R.</strong>
                          <span>3 days ago</span>
                        </div>
                        <p>How does the state recovery mechanism handle sudden worker node disconnections?</p>
                        <div className="qa-instructor-reply">
                          <strong>Instructor Response ({course.instructor.name}):</strong>
                          <p>Great question! LangGraph checkpointers persist state changes to Redis or Postgres after every node transition, allowing self-healing restart from the last checkpoint.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Course Curriculum & Lessons Drawer */}
        <aside className="player-curriculum-sidebar">
          <div className="curriculum-sidebar-header">
            <h3>Course Curriculum</h3>
            <span className="curriculum-total-count">
              {completedCount} / {totalCourseLessons} Completed
            </span>
          </div>

          <div className="curriculum-modules-accordion">
            {curriculum.map((mod, mIdx) => {
              const isModuleOpen = !!expandedModules[mIdx];
              return (
                <div key={mIdx} className="player-module-block">
                  <button
                    type="button"
                    className="player-module-toggle"
                    onClick={() => toggleModuleAccordion(mIdx)}
                    aria-expanded={isModuleOpen}
                  >
                    <div className="module-title-box">
                      <span className="module-num-pill">M{mIdx + 1}</span>
                      <span className="module-name-text">{mod.title}</span>
                    </div>
                    <span className="module-chevron-icon">
                      {isModuleOpen ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
                    </span>
                  </button>

                  {isModuleOpen && (
                    <div className="player-lessons-list">
                      {mod.lessons.map((lesson, lIdx) => {
                        const isCurrent = activeModuleIdx === mIdx && activeLessonIdx === lIdx;
                        const isDone = !!completedLessons[`${mIdx}-${lIdx}`];

                        return (
                          <button
                            key={lIdx}
                            type="button"
                            className={`player-lesson-row ${isCurrent ? "current" : ""} ${isDone ? "done" : ""}`}
                            onClick={() => handleSelectLesson(mIdx, lIdx)}
                          >
                            <span className="lesson-check-indicator">
                              {isDone ? (
                                <CheckCircleIcon size={16} className="check-done" />
                              ) : (
                                <PlayCircleIcon size={16} className="play-pending" />
                              )}
                            </span>
                            <span className="lesson-row-name">{lesson.name}</span>
                            <span className="lesson-row-time">{lesson.duration}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}

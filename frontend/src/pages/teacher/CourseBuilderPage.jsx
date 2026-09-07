import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  PlusIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CheckCircleIcon,
  PlayCircleIcon,
  FileTextIcon,
  EditIcon,
  BookOpenIcon,
  ClockIcon
} from "../../components/Icons";
import { teacherCourses } from "../../data/teacherData";

export default function CourseBuilderPage() {
  const { courseId } = useParams();
  const matchedCourse = teacherCourses.find((c) => c.id === courseId) || teacherCourses[0];

  const [course, setCourse] = useState(matchedCourse);
  const [modules, setModules] = useState(matchedCourse.modules && matchedCourse.modules.length ? matchedCourse.modules : [
    {
      id: "mod-1",
      title: "Module 1: Foundations of Autonomous Agents & Function Calling",
      lessons: [
        { id: "l-1", title: "Introduction to Agentic Architectures vs Traditional Chains", duration: "18 mins", type: "video", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
        { id: "l-2", title: "Tool Calling Specs & Pydantic Schema Validation", duration: "25 mins", type: "video", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }
      ]
    },
    {
      id: "mod-2",
      title: "Module 2: Advanced Retrieval-Augmented Generation (Hybrid RAG)",
      lessons: [
        { id: "l-3", title: "Chunking Strategies: Semantic vs Recursive Token Splitting", duration: "22 mins", type: "video", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
        { id: "l-4", title: "Hands-on Lab: Hybrid Vector Search Deployment", duration: "45 mins", type: "lab", videoUrl: "" }
      ]
    }
  ]);

  const [newModuleName, setNewModuleName] = useState("");
  const [activeLessonModal, setActiveLessonModal] = useState(null); // { moduleId, lesson: {...} or null }
  const [saveBanner, setSaveBanner] = useState(false);

  // Lesson Form Modal State
  const [lessonForm, setLessonForm] = useState({
    title: "",
    duration: "20 mins",
    type: "video",
    videoUrl: "",
    content: "",
    resourceTitle: ""
  });

  const handleAddModule = () => {
    if (!newModuleName.trim()) return;
    const newMod = {
      id: `mod-${Date.now()}`,
      title: newModuleName.trim(),
      lessons: []
    };
    setModules([...modules, newMod]);
    setNewModuleName("");
  };

  const handleDeleteModule = (modId) => {
    if (confirm("Delete this module and all its lessons?")) {
      setModules(modules.filter((m) => m.id !== modId));
    }
  };

  const handleMoveModule = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= modules.length) return;
    const updated = [...modules];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setModules(updated);
  };

  const handleOpenAddLesson = (moduleId) => {
    setActiveLessonModal({ moduleId, isEdit: false });
    setLessonForm({
      title: "",
      duration: "20 mins",
      type: "video",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      content: "",
      resourceTitle: ""
    });
  };

  const handleSaveLesson = (e) => {
    e.preventDefault();
    if (!lessonForm.title) return;

    setModules((prev) =>
      prev.map((mod) => {
        if (mod.id === activeLessonModal.moduleId) {
          const newLesson = {
            id: `l-${Date.now()}`,
            title: lessonForm.title,
            duration: lessonForm.duration,
            type: lessonForm.type,
            videoUrl: lessonForm.videoUrl,
            content: lessonForm.content
          };
          return {
            ...mod,
            lessons: [...mod.lessons, newLesson]
          };
        }
        return mod;
      })
    );

    setActiveLessonModal(null);
  };

  const handleDeleteLesson = (moduleId, lessonId) => {
    setModules((prev) =>
      prev.map((mod) => {
        if (mod.id === moduleId) {
          return {
            ...mod,
            lessons: mod.lessons.filter((l) => l.id !== lessonId)
          };
        }
        return mod;
      })
    );
  };

  const handleMoveLesson = (moduleId, lessonIndex, direction) => {
    setModules((prev) =>
      prev.map((mod) => {
        if (mod.id === moduleId) {
          const targetIdx = lessonIndex + direction;
          if (targetIdx < 0 || targetIdx >= mod.lessons.length) return mod;
          const updatedLessons = [...mod.lessons];
          const temp = updatedLessons[lessonIndex];
          updatedLessons[lessonIndex] = updatedLessons[targetIdx];
          updatedLessons[targetIdx] = temp;
          return { ...mod, lessons: updatedLessons };
        }
        return mod;
      })
    );
  };

  const handleSaveAll = () => {
    setSaveBanner(true);
    setTimeout(() => setSaveBanner(false), 3000);
  };

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div className="teacher-course-builder-page">
      {/* Top Header */}
      <div className="student-page-header">
        <div>
          <div className="breadcrumbs-tag">
            <Link to="/teacher/courses">← Back to Course Library</Link>
          </div>
          <h1>Course Curriculum Builder</h1>
          <p className="student-page-subtitle">
            Editing: <strong>{course.title}</strong> ({modules.length} Modules • {totalLessons} Lessons)
          </p>
        </div>
        <div className="header-actions-group">
          <Link to={`/student/course/${course.id}`} className="btn btn-secondary">
            Preview Student Experience
          </Link>
          <button type="button" className="btn btn-primary" onClick={handleSaveAll}>
            Save Changes
          </button>
        </div>
      </div>

      {saveBanner && (
        <div className="alert-banner success">
          <CheckCircleIcon size={20} />
          <span>Curriculum syllabus successfully saved and synced to student portal!</span>
        </div>
      )}

      {/* Course Overview Summary Bar */}
      <div className="builder-summary-card lms-content-card">
        <div className="summary-left">
          <img src={course.thumbnail} alt={course.title} className="summary-thumb" />
          <div>
            <h3>{course.title}</h3>
            <div className="summary-badges-row">
              <span className="summary-badge">{course.category}</span>
              <span className="summary-badge">{course.level}</span>
              <span className="summary-badge">${course.price}</span>
              <span className={`status-tag ${course.status}`}>{course.status}</span>
            </div>
          </div>
        </div>
        <div className="summary-right">
          <Link to="/teacher/courses/create" className="btn btn-sm btn-outline">
            Edit Basic Info
          </Link>
        </div>
      </div>

      {/* Module List Container */}
      <div className="builder-modules-stack">
        <div className="modules-header-bar">
          <h2>Modules & Lesson Structure</h2>
          <span className="pill-counter">{modules.length} Modules Declared</span>
        </div>

        {modules.map((mod, modIdx) => (
          <div key={mod.id} className="builder-module-card lms-content-card">
            {/* Module Top Bar */}
            <div className="module-top-row">
              <div className="module-title-group">
                <span className="mod-order-chip">Module {modIdx + 1}</span>
                <h4>{mod.title}</h4>
              </div>

              <div className="module-ctrls-group">
                {/* Reorder Up/Down */}
                <button
                  type="button"
                  className="btn-icon-ctrl"
                  disabled={modIdx === 0}
                  onClick={() => handleMoveModule(modIdx, -1)}
                  title="Move Module Up"
                >
                  <ChevronUpIcon size={16} />
                </button>
                <button
                  type="button"
                  className="btn-icon-ctrl"
                  disabled={modIdx === modules.length - 1}
                  onClick={() => handleMoveModule(modIdx, 1)}
                  title="Move Module Down"
                >
                  <ChevronDownIcon size={16} />
                </button>
                <button
                  type="button"
                  className="btn-icon-ctrl delete"
                  onClick={() => handleDeleteModule(mod.id)}
                  title="Delete Module"
                >
                  <TrashIcon size={16} />
                </button>
              </div>
            </div>

            {/* Lessons List inside Module */}
            <div className="module-lessons-container">
              {mod.lessons.map((lesson, lessonIdx) => (
                <div key={lesson.id} className="builder-lesson-row">
                  <div className="lesson-info-left">
                    <span className="lesson-type-icon">
                      {lesson.type === "video" ? <PlayCircleIcon size={18} /> : <FileTextIcon size={18} />}
                    </span>
                    <span className="lesson-index">Lesson {lessonIdx + 1}:</span>
                    <span className="lesson-name">{lesson.title}</span>
                    <span className="lesson-duration-badge">{lesson.duration}</span>
                  </div>

                  <div className="lesson-actions-right">
                    <button
                      type="button"
                      className="btn-icon-mini"
                      disabled={lessonIdx === 0}
                      onClick={() => handleMoveLesson(mod.id, lessonIdx, -1)}
                      title="Move Lesson Up"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      className="btn-icon-mini"
                      disabled={lessonIdx === mod.lessons.length - 1}
                      onClick={() => handleMoveLesson(mod.id, lessonIdx, 1)}
                      title="Move Lesson Down"
                    >
                      ▼
                    </button>
                    <button
                      type="button"
                      className="btn-icon-mini delete"
                      onClick={() => handleDeleteLesson(mod.id, lesson.id)}
                      title="Delete Lesson"
                    >
                      <TrashIcon size={14} />
                    </button>
                  </div>
                </div>
              ))}

              {mod.lessons.length === 0 && (
                <div className="no-lessons-prompt">
                  No lessons added to this module yet. Click below to add the first lesson.
                </div>
              )}
            </div>

            {/* Add Lesson Action */}
            <div className="module-footer-add">
              <button
                type="button"
                className="btn btn-sm btn-outline-add"
                onClick={() => handleOpenAddLesson(mod.id)}
              >
                <PlusIcon size={14} />
                <span>Add Lesson to Module</span>
              </button>
            </div>
          </div>
        ))}

        {/* Add Module Input Box */}
        <div className="add-module-box lms-content-card">
          <h3>Add New Module</h3>
          <p className="card-subtitle">Create a new milestone section for this course</p>
          <div className="add-module-row">
            <input
              type="text"
              placeholder="e.g. Module 5: Agent Observability & OpenTelemetry Tracing"
              value={newModuleName}
              onChange={(e) => setNewModuleName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleAddModule(); }}
            />
            <button type="button" className="btn btn-primary" onClick={handleAddModule}>
              <PlusIcon size={16} />
              <span>Add Module</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL: ADD / EDIT LESSON */}
      {activeLessonModal && (
        <div className="modal-overlay">
          <div className="quiz-modal-card">
            <div className="quiz-modal-header">
              <div>
                <span className="quiz-modal-course">Lesson Configuration</span>
                <h2>Add Lesson to Module</h2>
              </div>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setActiveLessonModal(null)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveLesson} className="quiz-modal-body">
              <div className="form-group full-width">
                <label>Lesson Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Setting Up LangGraph StateGraph Reducers"
                  value={lessonForm.title}
                  onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-fields-grid" style={{ marginTop: "14px" }}>
                <div className="form-group">
                  <label>Lesson Type</label>
                  <select
                    value={lessonForm.type}
                    onChange={(e) => setLessonForm({ ...lessonForm, type: e.target.value })}
                  >
                    <option value="video">Video Lecture</option>
                    <option value="text">Interactive Reading / Theory</option>
                    <option value="lab">Hands-on Code Lab</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    value={lessonForm.duration}
                    onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })}
                    placeholder="e.g. 25 mins"
                  />
                </div>
              </div>

              {lessonForm.type === "video" && (
                <div className="form-group full-width" style={{ marginTop: "14px" }}>
                  <label>Video Stream URL (MP4 / HLS / YouTube)</label>
                  <input
                    type="text"
                    value={lessonForm.videoUrl}
                    onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })}
                    placeholder="https://...mp4"
                  />
                </div>
              )}

              {lessonForm.type !== "video" && (
                <div className="form-group full-width" style={{ marginTop: "14px" }}>
                  <label>Lesson Content & Code Lab Instructions</label>
                  <textarea
                    rows={4}
                    value={lessonForm.content}
                    onChange={(e) => setLessonForm({ ...lessonForm, content: e.target.value })}
                    placeholder="Provide detailed instructions, snippets, and step-by-step guidance..."
                  />
                </div>
              )}

              <div className="quiz-nav-actions" style={{ marginTop: "20px" }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setActiveLessonModal(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Lesson to Module
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

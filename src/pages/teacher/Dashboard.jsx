import { Link } from "react-router-dom";
import PublicIcon from "../../components/PublicIcon";
import useCourses from "../../utils/useCourses";
import useBatches from "../../utils/useBatches";
import { teacherClasses, teacherBatches, teacherCourses, teacherStudents } from "../../utils/batchStorage";
import "./Dashboard.css";

export default function Dashboard() {
  const catalog = useCourses();
  const state = useBatches();
  const batches = teacherBatches(state);
  const students = teacherStudents(state);
  const classes = teacherClasses(state);
  const courses = teacherCourses(catalog);
  const liveClass = classes.find(item => item.status === "Live") || classes.filter(item => item.status === "Scheduled").sort((a,b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`))[0];
  const stats = [
    ["My Courses", courses.length, "Assigned Courses", "book"],
    ["My Batches", batches.filter(batch => batch.status === "Active").length, "Active Batches", "layers"],
    ["Students", new Set(students.map(student => student.studentId)).size, "Total Students", "users"],
    ["Upcoming Live Classes", classes.filter(item => item.status === "Scheduled").length, "Next Sessions", "play"],
  ];
  return <section className="teacher-dashboard">
    <header className="td-heading"><h1>Teacher Dashboard</h1><p>Manage your courses, batches, students and live classes.</p></header>
    <div className="td-stats">{stats.map(([title,value,label,icon],index) => <article key={title}><span className={`td-icon td-tone-${index}`}><PublicIcon name={icon}/></span><div><p>{title}</p><strong>{value}</strong><small>{label}</small></div></article>)}</div>
    <section className="td-section"><header><div><h2>{liveClass?.status === "Live" ? "Live Class" : "Upcoming Live Class"}</h2><p>Your next scheduled live session.</p></div><Link to="/teacher/live-classes">View All</Link></header>
      {liveClass ? <article className="td-live"><span className="td-icon"><PublicIcon name="play"/></span><div className="td-live-info"><h3>{liveClass.title}</h3><p>{liveClass.course}</p><div className="td-meta"><span><PublicIcon name="users"/>{liveClass.batch}</span><span><PublicIcon name="calendar"/>{liveClass.date}</span><span><PublicIcon name="clock"/>{liveClass.time}</span></div></div><div className="td-live-action"><span className="td-status">{liveClass.status === "Live" ? "Live Now" : "Scheduled"}</span><Link className="td-primary" to="/teacher/live-classes">Go to Class</Link></div></article> : <div className="td-empty">No scheduled classes for your active assigned batches.</div>}
    </section>
    <section className="td-section"><header><div><h2>My Courses</h2><p>Courses currently assigned to you.</p></div><Link to="/teacher/courses">View All</Link></header>
      <div className="td-courses">{courses.slice(0,3).map(course => {
        const assigned = batches.filter(batch => batch.courseId === course.id);
        const roster = students.filter(student => student.courseId === course.id);
        const progress = roster.length ? Math.round(roster.reduce((sum,student) => sum + student.progress,0) / roster.length) : 0;
        const status = assigned.some(batch => batch.status === "Active") ? "Active" : assigned.some(batch => batch.status === "Upcoming") ? "Upcoming" : assigned.length ? "Completed" : course.status;
        return <article key={course.id}><div className="td-course-title"><h3>{course.title}</h3><span className="td-status" data-status={status}>{status}</span></div><p>{assigned.map(batch => batch.name).join(", ") || "No assigned batches"}</p><div className="td-meta"><span><PublicIcon name="users"/>{new Set(roster.map(student => student.studentId)).size} Students</span><span><PublicIcon name="calendar"/>{assigned.length} Assigned Batches</span></div><div className="td-progress-label"><span>Student Progress</span><strong>{progress}%</strong></div><progress value={progress} max="100" aria-label={`${course.title} student progress`}/><Link to="/teacher/courses">View Course</Link></article>;
      })}</div>{!courses.length && <div className="td-empty">No courses assigned yet.</div>}
    </section>
  </section>;
}

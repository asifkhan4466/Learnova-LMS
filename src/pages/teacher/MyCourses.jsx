import { useState } from "react";
import { Link } from "react-router-dom";
import PublicIcon from "../../components/PublicIcon";
import useCourses from "../../utils/useCourses";
import useBatches from "../../utils/useBatches";
import { teacherCourses, teacherBatches, teacherStudents } from "../../utils/batchStorage";
import "./MyCourses.css";
export default function MyCourses() {
  const catalog = useCourses();
  const state = useBatches();
  const batches = teacherBatches(state);
  const roster = teacherStudents(state);
  const [search,setSearch] = useState("");
  const [status,setStatus] = useState("");
  const [category,setCategory] = useState("");
  const courses = teacherCourses(catalog).map(course => {
    const assigned = batches.filter(batch => batch.courseId === course.id);
    const students = roster.filter(student => student.courseId === course.id);
    return {...course, batches:assigned.length, students:new Set(students.map(student=>student.studentId)).size,
      progress:students.length ? Math.round(students.reduce((sum,student)=>sum+student.progress,0)/students.length) : 0,
      batchStatus:assigned.some(batch=>batch.status==="Active") ? "Active" : assigned.some(batch=>batch.status==="Upcoming") ? "Upcoming" : assigned.length ? "Completed" : "Unassigned"};
  });
  const visible = courses.filter(course=>(!status || course.batchStatus===status) && (!category || course.category===category) && `${course.title} ${course.category}`.toLowerCase().includes(search.trim().toLowerCase()));
  return <section className="tmc-page"><header><h1>My Courses</h1><p>View and manage the courses assigned to you.</p></header>
    <div className="tmc-stats">{[[courses.length,"Total Courses","Assigned to you","book"],[courses.filter(course=>course.batchStatus==="Active").length,"Active Courses","Currently running","play"],[new Set(roster.map(student=>student.studentId)).size,"Total Students","Across your batches","users"],[batches.length,"Total Batches","Under these courses","cap"]].map(([value,label,note,icon])=><article key={label}><span className="tmc-icon"><PublicIcon name={icon}/></span><div><strong>{value}</strong><p>{label}</p><small>{note}</small></div></article>)}</div>
    <div className="tmc-filters"><input aria-label="Search courses" placeholder="Search courses by title or category..." value={search} onChange={e=>setSearch(e.target.value)}/><select aria-label="Batch status" value={status} onChange={e=>setStatus(e.target.value)}><option value="">All Status</option>{[...new Set(courses.map(course=>course.batchStatus))].map(value=><option key={value}>{value}</option>)}</select><select aria-label="Course category" value={category} onChange={e=>setCategory(e.target.value)}><option value="">All Categories</option>{[...new Set(courses.map(course=>course.category))].map(value=><option key={value}>{value}</option>)}</select><button onClick={()=>{setSearch("");setStatus("");setCategory("");}}>Clear</button></div>
    <div className="tmc-list">{visible.map(course=><article key={course.id}><img src={course.image || "/Logo.png"} alt=""/><div className="tmc-info"><h2>{course.title}</h2><p>{course.summary || course.description}</p><div className="tmc-tags"><span>{course.category}</span><span>{course.batchStatus}</span>{course.level && <span>{course.level}</span>}</div><small>{course.batches} Batches &nbsp; ? &nbsp; {course.students} Students</small></div><div className="tmc-progress"><small>Student Progress (Avg)</small><div><progress value={course.progress} max="100" aria-label={`${course.title} progress`}/><strong>{course.progress}%</strong></div></div><Link to="/teacher/batches">View Batches</Link></article>)}{!visible.length && <p className="tmc-empty">No matching assigned courses.</p>}</div><footer>Showing {visible.length} of {courses.length} courses</footer>
  </section>;
}

import { useState } from "react";
import { Link } from "react-router-dom";
import useBatches from "../../utils/useBatches";
import { teacherClasses, teacherStudents, teacherId } from "../../utils/batchStorage";
import PublicIcon from "../../components/PublicIcon";
import "./Notifications.css";
const key = `learnova_teacher_notification_reads_${teacherId}`;
export default function Notifications() {
 const state=useBatches();
 const [tab,setTab]=useState("All");
 const [read,setRead]=useState(()=>{try{const saved=JSON.parse(localStorage.getItem(key));return Array.isArray(saved)?saved:[];}catch{return [];}});
 const [error,setError]=useState("");
 const notifications=[...teacherClasses(state).filter(item=>["Live","Scheduled"].includes(item.status)).map(item=>({id:`class:${item.id}:${item.status}`,title:item.status==="Live"?"Live Class Started":"Live Class Scheduled",message:`${item.title} - ${item.course}, ${item.batch}`,time:item.startedAt ? new Date(item.startedAt).toLocaleString() : `${item.date} ${item.time}`,type:"Live Classes",icon:"play",to:"/teacher/live-classes"})),...teacherStudents(state).map(item=>({id:`enrollment:${item.id}`,title:"Approved Student Enrollment",message:`${item.name} - ${item.course}, ${item.batch}`,time:item.enrollmentDate || "",type:"Students",icon:"users",to:"/teacher/students"}))];
 function mark(ids){const next=[...new Set([...read,...ids])];try{localStorage.setItem(key,JSON.stringify(next));setRead(next);setError("");}catch{setError("Read state could not be saved.");}}
 const visible=notifications.filter(item=>tab==="All" || item.type===tab);
 return <section className="tn-page"><header><div><h1>Notifications</h1><p>Stay updated with your assigned students and live classes.</p></div><button disabled={!notifications.some(item=>!read.includes(item.id))} onClick={()=>mark(notifications.map(item=>item.id))}>Mark All as Read</button></header><nav aria-label="Notification category">{["All","Live Classes","Students"].map(value=><button key={value} aria-pressed={tab===value} onClick={()=>setTab(value)}>{value}<span>{notifications.filter(item=>(value==="All"||item.type===value)&&!read.includes(item.id)).length}</span></button>)}</nav>{error&&<p role="alert">{error}</p>}<div className="tn-list">{visible.map(item=><article key={item.id}><span className="tn-icon"><PublicIcon name={item.icon}/></span><div className="tn-info"><h2>{item.title}</h2><p>{item.message}</p></div><small>{item.time}</small>{!read.includes(item.id)&&<span className="tn-dot" aria-label="Unread"/>}<Link to={item.to} onClick={()=>mark([item.id])}>View</Link></article>)}{!visible.length&&<p className="tn-empty">No notifications in this category.</p>}</div></section>;
}

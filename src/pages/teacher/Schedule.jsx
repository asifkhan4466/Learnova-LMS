import { useState } from "react";
import { Link } from "react-router-dom";
import useBatches from "../../utils/useBatches";
import { teacherClasses, teacherBatches } from "../../utils/batchStorage";
import PublicIcon from "../../components/PublicIcon";
import "./Schedule.css";
const dateOf = value => new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value);
const sameDay = (a,b) => a.toDateString() === b.toDateString();
export default function Schedule() {
  const state = useBatches();
  const classes = teacherClasses(state).filter(item=>["Scheduled","Live"].includes(item.status)).sort((a,b)=>dateOf(a.date)-dateOf(b.date));
  const [month,setMonth] = useState(()=>new Date(new Date().getFullYear(),new Date().getMonth(),1));
  const [day,setDay] = useState(null);
  const today = new Date();
  const days = new Date(month.getFullYear(),month.getMonth()+1,0).getDate();
  const selected = day ? classes.filter(item=>sameDay(dateOf(item.date),day)) : classes;
  const daily = classes.filter(item=>sameDay(dateOf(item.date),day || today));
  const stats = [[classes.length,"Scheduled & Live","calendar"],[classes.filter(item=>item.status==="Live").length,"Live Now","play"],[teacherBatches(state).filter(batch=>batch.status==="Active").length,"Active Batches","users"]];
  return <section className="tsh-page"><header className="tsh-heading"><div><h1>Schedule</h1><p>View your teaching schedule and upcoming live lectures.</p></div><Link to="/teacher/live-classes">Schedule Class</Link></header><div className="tsh-stats">{stats.map(([value,label,icon])=><article key={label}><span><PublicIcon name={icon}/></span><div><strong>{value}</strong><p>{label}</p></div></article>)}</div><div className="tsh-grid"><section className="tsh-panel"><header><h2>{day ? day.toLocaleDateString() : "Upcoming Lectures"}</h2><button onClick={()=>setDay(null)}>View All</button></header>{selected.map(item=><article className="tsh-lecture" key={item.id}><div className="tsh-date"><small>{dateOf(item.date).toLocaleDateString(undefined,{month:"short"})}</small><strong>{Number.isNaN(dateOf(item.date).getTime()) ? "-" : dateOf(item.date).getDate()}</strong></div><div className="tsh-info"><h3>{item.title}</h3><p>{item.course} ? {item.batch}</p><small>{item.time} ? {item.duration}</small></div><div className="tsh-action"><span>{item.status}</span><Link to="/teacher/live-classes">View Class</Link></div></article>)}{!selected.length && <p className="tsh-empty">No scheduled classes for this selection.</p>}</section><aside><section className="tsh-panel"><header><button aria-label="Previous month" onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()-1,1))}>&lsaquo;</button><h2>{month.toLocaleDateString(undefined,{month:"long",year:"numeric"})}</h2><button aria-label="Next month" onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()+1,1))}>&rsaquo;</button></header><div className="tsh-calendar">{["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(label=><small key={label}>{label}</small>)}{Array.from({length:month.getDay()},(_,i)=><span key={`blank-${i}`}/>)}{Array.from({length:days},(_,i)=>{const date=new Date(month.getFullYear(),month.getMonth(),i+1);const events=classes.filter(item=>sameDay(dateOf(item.date),date)).length;return <button key={i} aria-label={`${date.toDateString()}, ${events} classes`} aria-pressed={!!day && sameDay(date,day)} aria-current={sameDay(date,today) ? "date" : undefined} onClick={()=>setDay(date)}>{i+1}{events>0 && <span className="tsh-dot"/>}</button>;})}</div></section><section className="tsh-panel"><header><h2>{day ? "Selected Day" : "Today's Schedule"}</h2></header>{daily.map(item=><div className="tsh-today" key={item.id}><small>{item.time}</small><h3>{item.title}</h3><p>{item.batch} ? {item.status}</p></div>)}{!daily.length && <p>No classes on this day.</p>}</section></aside></div></section>;
}

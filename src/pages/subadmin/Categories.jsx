import useCategories, { addCategory, removeCategory } from "../../utils/useCategories";
import { useRef, useState } from "react";
import useCourses from "../../utils/useCourses";
import PublicIcon from "../../components/PublicIcon";
import SubAdminSummary, { SubAdminHeading } from "../../components/SubAdminSummary";
import "./Categories.css";
export default function Categories(){
 const courses=useCourses(), dialog=useRef(null);
 const [search,setSearch]=useState(""),[status,setStatus]=useState(""),[selected,setSelected]=useState("");
 const [name,setName]=useState(""),[message,setMessage]=useState("");
 const categories=useCategories().map(name=>({name,courses:courses.filter(c=>c.category===name)}));
 const visible=categories.filter(c=>c.name.toLowerCase().includes(search.trim().toLowerCase())&&(!status||(c.courses.some(v=>v.status==="Published")?"Active":"Inactive")===status));
 return <section className="sa-page sa-categories"><SubAdminHeading title="Categories" subtitle="Organize and view course categories." icon="database"/>
 <SubAdminSummary items={[["Total Categories",categories.length,"database"],["Active Categories",categories.filter(c=>c.courses.some(v=>v.status==="Published")).length,"check"],["Courses Mapped",courses.length,"book"],["Featured Courses",courses.filter(c=>c.featured).length,"star"]]}/>
 <form className="sa-toolbar" onSubmit={event=>{event.preventDefault();try{addCategory(name);setName("");setMessage("Category added.");}catch(error){setMessage(error.message);}}}><input required aria-label="New category name" placeholder="New category name" value={name} onChange={event=>setName(event.target.value)}/><button className="sa-primary" type="submit">Add Category</button></form>{message&&<p role="status">{message}</p>}
 <div className="sa-toolbar"><input type="search" placeholder="Search categories..." aria-label="Search categories" value={search} onChange={e=>setSearch(e.target.value)}/><select aria-label="Category status" value={status} onChange={e=>setStatus(e.target.value)}><option value="">All Statuses</option><option>Active</option><option>Inactive</option></select></div>
 <div className="sa-category-grid">{visible.map((c,i)=><article className={`sa-panel sa-summary-tone-${i%4}`} key={c.name}><span className="sa-category-icon"><PublicIcon name={c.courses[0]?.visual || "book"}/></span><h2>{c.name}</h2><p>Explore courses and learning materials in {c.name.toLowerCase()}.</p><div className="sa-category-meta"><span>{c.courses.length} Courses</span><span className="sa-status" data-status={c.courses.some(v=>v.status==="Published")?"Active":"Inactive"}>{c.courses.some(v=>v.status==="Published")?"Active":"Inactive"}</span></div><button onClick={()=>{setSelected(c.name);dialog.current.showModal();}} aria-label={`View ${c.name}`}><PublicIcon name="search"/>View Courses</button><button onClick={()=>{try{removeCategory(c.name);setMessage("Category removed.");}catch(error){setMessage(error.message);}}} aria-label={`Remove ${c.name}`}>Remove</button></article>)}</div>{!visible.length&&<p>No matching categories.</p>}
 <p className="sa-muted">Showing {visible.length} of {categories.length} categories</p><dialog ref={dialog}><h2>{selected}</h2><ul>{courses.filter(c=>c.category===selected).map(c=><li key={c.id}>{c.title} &middot; {c.status}</li>)}</ul><form method="dialog"><button>Close</button></form></dialog></section>;
}

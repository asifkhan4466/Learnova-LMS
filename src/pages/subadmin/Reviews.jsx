import { reviews } from "../../data/reviews";
import useCourses from "../../utils/useCourses";
import AdminRecords from "../../components/AdminRecords";
import SubAdminSummary, { SubAdminHeading } from "../../components/SubAdminSummary";
import "./Reviews.css";
const columns=[["name","Student"],["course","Course"],["rating","Rating"],["text","Review"],["status","Status",r=><span className="sa-status" data-status={r.status}>{r.status}</span>]];
export default function Reviews(){
 const courses=useCourses();
 const rows=reviews.map((r,i)=>({...r,id:i,course:courses.find(c=>String(c.id)===String(r.courseId))?.title||"Course unavailable",rating:r.rating||5,status:courses.find(c=>String(c.id)===String(r.courseId))?.status==="Published"?"Published":"Hidden"}));
 return <section className="sa-page sa-record-page"><AdminRecords paginate filters={[["course","Courses"]]} title="Reviews & Ratings" heading={<SubAdminHeading title="Reviews & Ratings" subtitle="Monitor student feedback and course ratings." icon="star"/>} rows={rows} columns={columns}><SubAdminSummary items={[["Total Reviews",rows.length,"users"],["Average Rating",rows.length?(rows.reduce((n,r)=>n+Number(r.rating),0)/rows.length).toFixed(1):"0","star"],["Published",rows.filter(r=>r.status==="Published").length,"check"],["Hidden",rows.filter(r=>r.status==="Hidden").length,"book"]]}/></AdminRecords></section>;
}

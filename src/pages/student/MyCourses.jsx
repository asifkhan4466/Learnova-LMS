import useCourses from "../../utils/useCourses";
import { Link } from "react-router-dom";
import useBatches from "../../utils/useBatches";
import { studentId } from "../../utils/batchStorage";
import "./MyCourses.css";
function MyCourses() {
  const state = useBatches();
  const catalog = useCourses();
  const courses = state.enrollments.filter(item => item.studentId === studentId && item.approved === true && ["Active", "Completed"].includes(item.status) && (!item.paymentStatus || ["Verified", "Approved", "Paid"].includes(item.paymentStatus))).map(enrollment => {
    const course = catalog.find(item => item.id === enrollment.courseId);
    const batch = state.batches.find(item => item.id === enrollment.batchId && item.courseId === enrollment.courseId);
    return { id: enrollment.id, name: course?.title || enrollment.course, teacher: batch?.teacher || course?.instructor || "Not assigned",
      image: course?.image, duration: course?.duration || "Not provided", progress: enrollment.progress ?? (enrollment.status === "Completed" ? 100 : 0),
      status: batch?.status || enrollment.status, batch: batch?.name || "Awaiting assignment" };
  });

  return (
    <div className="my-courses-page">

      <div className="my-courses-header">
        <div>
          <h1>My Courses</h1>
          <p>Manage and continue your enrolled courses.</p>
        </div>

        <div className="course-count">
          {courses.length} Courses
        </div>
      </div>

      <div className="my-courses-grid">{!courses.length && <p>No approved courses yet.</p>}

        {courses.map((course) => (
          <div className="my-course-card" key={course.id}>

            <div className="my-course-image">
              <div><img src={course.image || "/Logo.png"} alt={course.name} /></div>
            </div>

            <div className="my-course-content">

              <div className="my-course-top">
                <span>{course.status}</span>
                <small>{course.batch}</small>
              </div>

              <h2>{course.name}</h2>

              <p className="my-course-teacher">
                Teacher: {course.teacher}
              </p>

              <div className="my-course-details">
                <span>⏱ {course.duration}</span>
                <span>📚 {course.batch}</span>
              </div>

              <div className="my-course-progress">

                <div className="progress-info">
                  <span>Course Progress</span>
                  <span>{course.progress}%</span>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>

              </div>

              <Link className="continue-course-btn" to="/student/live-classes">
                {course.progress === 100
                  ? "View Course"
                  : "Continue Learning"}
              </Link>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default MyCourses;
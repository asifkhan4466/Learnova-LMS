import PublicSectionsEditor from "../../components/PublicSectionsEditor";
import SubAdminSummary, { SubAdminHeading } from "../../components/SubAdminSummary";
import { sections } from "../../utils/publicSections";
import { canManagePublicContent, currentSubAdminId } from "../../utils/adminPermissions";
import usePermissions from "../../utils/usePermissions";
import "./PublicContent.css";

export default function PublicContent() {
  const permissions = usePermissions();
  const allowed = sections.filter(s => canManagePublicContent("subadmin", currentSubAdminId, s.permission, permissions)).length;

  return (
    <section className="sa-page sa-public-content">
      <SubAdminHeading
        title="Public Website"
        subtitle="Manage public website sections allowed by your Admin."
        icon="globe"
      />
      <SubAdminSummary
        items={[
          ["Total Sections", sections.length, "globe"],
          ["Manageable", allowed, "check"],
          ["Restricted", sections.length - allowed, "close"],
          ["Status", allowed > 0 ? "Active" : "Restricted", "spark"],
        ]}
      />
      <PublicSectionsEditor role="subadmin" />
    </section>
  );
}

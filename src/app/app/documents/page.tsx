import Topbar from "@/components/app/Topbar";
import { getActivePatient } from "@/lib/patients";
import DocumentsClient from "./DocumentsClient";

export default async function DocumentsPage() {
  const { documents } = await getActivePatient();
  return (
    <>
      <Topbar
        title="Documents"
        subtitle="Everything CareNova has read, extracted, and threaded into your graph."
        actions={
          <>
            <button className="btn-secondary text-sm !py-2.5 !px-4">Connect a portal</button>
            <button className="btn-primary text-sm !py-2.5 !px-4">+ Upload</button>
          </>
        }
      />
      <DocumentsClient documents={documents} />
    </>
  );
}

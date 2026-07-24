import Topbar from "@/components/app/Topbar";
import { getActivePatient } from "@/lib/patients";
import ChatClient from "./ChatClient";

export default async function ChatPage() {
  const p = await getActivePatient();
  return (
    <>
      <Topbar
        title="Ask CareNova"
        subtitle="Grounded in your own graph. Every answer cites its sources."
      />
      <ChatClient
        patientName={p.patient.name.split(" ")[0]}
        docsCount={p.documents.length + p.labs.length}
        suggestions={p.chatSuggestions}
        patientId={p.id}
      />
    </>
  );
}

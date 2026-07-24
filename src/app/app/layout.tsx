import Sidebar from "@/components/app/Sidebar";
import { getActivePatient, patientList } from "@/lib/patients";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const p = await getActivePatient();
  return (
    <div className="flex flex-1 min-h-screen bg-[color:var(--cream)]">
      <Sidebar activePatient={p.id} patientList={patientList} />
      <div className="flex-1 min-w-0 flex flex-col">{children}</div>
    </div>
  );
}

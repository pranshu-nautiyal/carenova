import Topbar from "@/components/app/Topbar";
import { getActivePatient } from "@/lib/patients";
import GraphClient from "./GraphClient";

export default async function GraphPage() {
  const p = await getActivePatient();
  return (
    <>
      <Topbar
        title="Knowledge Graph"
        subtitle="Every fact CareNova knows about you, and how it connects. Tap a node to explore."
      />
      <GraphClient patient={p} />
    </>
  );
}

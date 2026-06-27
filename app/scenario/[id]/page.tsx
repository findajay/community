import { notFound } from "next/navigation";
import { scenarios, getScenario } from "@/content";
import { ScenarioPractice } from "@/components/ScenarioPractice";

// One static page per scenario for standalone conversation practice.
export function generateStaticParams() {
  return scenarios.map((s) => ({ id: s.id }));
}

export default async function ScenarioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const scenario = getScenario(id);
  if (!scenario) notFound();
  return <ScenarioPractice scenario={scenario} />;
}

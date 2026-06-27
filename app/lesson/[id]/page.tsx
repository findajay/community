import { notFound } from "next/navigation";
import { allLessons, getLesson } from "@/content";
import { LessonPlayer } from "@/components/LessonPlayer";

// Pre-render one static page per lesson (required for `output: export`).
export function generateStaticParams() {
  return allLessons.map((l) => ({ id: l.id }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lesson = getLesson(id);
  if (!lesson) notFound();
  return <LessonPlayer lesson={lesson} />;
}

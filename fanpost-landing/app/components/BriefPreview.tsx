import {
  SoccerBall,
  Ticket,
  CalendarDots,
  EnvelopeSimple,
} from "@phosphor-icons/react/dist/ssr";
import type { PreviewDict } from "@/lib/i18n";

const ICONS = {
  result: SoccerBall,
  ticket: Ticket,
  calendar: CalendarDots,
} as const;

// A real mini-rendering of the product: FanPost's output IS an email,
// so this preview shows an actual brief with sample data (labeled).
export default function BriefPreview({ p }: { p: PreviewDict }) {
  return (
    <div className="brief" aria-label={p.subject}>
      <div className="brief-head">
        <span className="brief-from">
          <EnvelopeSimple size={16} weight="bold" aria-hidden="true" />
          FanPost
        </span>
        <span className="brief-sample">{p.sample}</span>
      </div>
      <p className="brief-subject">{p.subject}</p>
      <ul className="brief-rows">
        {p.rows.map((row) => {
          const Icon = ICONS[row.kind as keyof typeof ICONS] ?? SoccerBall;
          return (
            <li key={row.title}>
              <span className="brief-icon">
                <Icon size={18} weight="duotone" aria-hidden="true" />
              </span>
              <span>
                <span className="brief-row-title">{row.title}</span>
                <span className="brief-row-meta">{row.meta}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

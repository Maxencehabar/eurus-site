interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  center?: boolean;
}

export default function SectionHeader({
  label,
  title,
  description,
  center,
}: SectionHeaderProps) {
  return (
    <div className={center ? "text-center" : ""}>
      <div
        className={`mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent before:h-0.5 before:w-6 before:bg-accent before:content-[''] ${center ? "justify-center" : ""}`}
      >
        {label}
      </div>
      <h2 className="mb-4 text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight">
        {title}
      </h2>
      {description && (
        <p
          className={`mb-14 max-w-xl text-[1.05rem] leading-relaxed text-text-secondary ${center ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

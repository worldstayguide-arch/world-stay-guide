type SectionEyebrowProps = {
  label: string;
  dotClassName?: string;
};

export function SectionEyebrow({
  label,
  dotClassName = 'bg-[#0A5C8E]',
}: SectionEyebrowProps) {
  return (
    <div className="inline-flex items-center gap-2 border border-neutral-300 rounded-full px-4 py-1.5 text-xs font-semibold text-neutral-600 tracking-wide uppercase mb-6 bg-white">
      <span className={`w-2 h-2 rounded-full ${dotClassName}`} />
      {label}
    </div>
  );
}
